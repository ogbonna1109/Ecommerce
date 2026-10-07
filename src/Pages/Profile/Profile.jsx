import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </svg>
)

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Orders')
  const [user, setUser] = useState(null)

  // Orders state
  const [userOrders, setUserOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [ordersError, setOrdersError] = useState('')

  // Lookup state
  const [searchRef, setSearchRef] = useState('')
  const [searching, setSearching] = useState(false)

  // Selected order details modal
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedOrderItems, setSelectedOrderItems] = useState([])
  const [loadingItems, setLoadingItems] = useState(false)

  const tabs = [
    'Orders',
    'Profile',
    'Saved Items',
    'Addresses',
    'Settings',
  ]

  const savedItems = [
    { name: 'Blue Midi Dress', price: '$32', image: '/hero/hero1.jpeg' },
    { name: 'Classic Handbag', price: '$48', image: '/hero/hero2.jpeg' },
    { name: 'Vintage Cap', price: '$18', image: '/hero/hero3.jpeg' },
    { name: 'Sneakers', price: '$36', image: '/hero/hero2.jpeg' },
  ]

  // Fetch orders from Supabase
  const fetchOrders = async () => {
    setLoadingOrders(true)
    setOrdersError('')

    try {
      // Check authenticated user
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (currentUser) {
        setUser(currentUser)
      }

      // Read recent guest orders placed on this device
      let localRefs = []
      try {
        localRefs = JSON.parse(localStorage.getItem('jovial_recent_orders') || '[]')
      } catch (e) {
        localRefs = []
      }

      let query = supabase.from('orders').select('*').order('created_at', { ascending: false })

      if (currentUser && localRefs.length > 0) {
        query = query.or(`user_id.eq.${currentUser.id},order_number.in.(${localRefs.map((r) => `"${r}"`).join(',')})`)
      } else if (currentUser) {
        query = query.eq('user_id', currentUser.id)
      } else if (localRefs.length > 0) {
        query = query.in('order_number', localRefs)
      } else {
        // No user and no local references
        setUserOrders([])
        setLoadingOrders(false)
        return
      }

      const { data, error } = await query

      if (error) {
        console.error('Supabase orders fetch error:', error)
        if (error.code === 'PGRST205' || error.message?.includes('schema cache')) {
          setOrdersError('Order history requires table creation. Please ensure the "orders" table is created in Supabase SQL Editor.')
        } else {
          setOrdersError('Could not load order history. Please try searching by order reference.')
        }
        setUserOrders([])
      } else {
        setUserOrders(data || [])
      }
    } catch (err) {
      console.error('Fetch orders error:', err)
      setOrdersError('Failed to fetch order history.')
    } finally {
      setLoadingOrders(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  // Lookup order by reference or phone
  const handleLookupOrder = async (e) => {
    e.preventDefault()
    const queryTerm = searchRef.trim()
    if (!queryTerm) return

    setSearching(true)
    setOrdersError('')

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .or(`order_number.ilike.%${queryTerm}%,customer_phone.ilike.%${queryTerm}%,payment_reference.ilike.%${queryTerm}%`)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Lookup error:', error)
        setOrdersError('Search failed. Please check the order reference number.')
      } else if (!data || data.length === 0) {
        setOrdersError(`No orders found matching "${queryTerm}".`)
      } else {
        setUserOrders(data)
      }
    } catch (err) {
      console.error('Lookup exception:', err)
      setOrdersError('An error occurred while searching.')
    } finally {
      setSearching(false)
    }
  }

  // View order modal
  const handleViewOrderDetails = async (order) => {
    setSelectedOrder(order)
    setLoadingItems(true)
    setSelectedOrderItems([])

    try {
      const { data, error } = await supabase
        .from('order_items')
        .select('*, products(image_url)')
        .eq('order_id', order.id)

      if (error) {
        console.error('Error fetching order items:', error)
      } else {
        setSelectedOrderItems(data || [])
      }
    } catch (err) {
      console.error('Fetch order items exception:', err)
    } finally {
      setLoadingItems(false)
    }
  }

  const getStatusBadge = (status) => {
    const s = (status || 'pending').toLowerCase()
    if (s === 'paid' || s === 'delivered') {
      return <span className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-bold text-green-700 uppercase">Paid / Delivered</span>
    }
    if (s === 'shipped' || s === 'processing') {
      return <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold text-blue-700 uppercase">{status}</span>
    }
    if (s === 'failed' || s === 'cancelled') {
      return <span className="rounded-full bg-red-100 px-3 py-1 text-[10px] font-bold text-red-700 uppercase">{status}</span>
    }
    return <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold text-amber-700 uppercase">Pending</span>
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#073b70]">
      {/* HEADER */}
      <section className="border-b border-[#073b70]/10 bg-white px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="font-serif text-3xl italic">Welcome back.</p>
          <h1 className="mt-1 font-serif text-5xl font-bold sm:text-6xl">My Account</h1>
          <p className="mt-4 text-sm text-[#31506c]">
            Manage your profile, orders, saved pieces and account settings.
          </p>
        </div>
      </section>

      {/* ACCOUNT MAIN */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="grid gap-7 lg:grid-cols-[230px_1fr]">
          {/* SIDEBAR */}
          <aside className="h-fit rounded-2xl border border-[#073b70]/10 bg-white p-3">
            <div className="mb-3 border-b border-[#073b70]/10 px-4 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#073b70] font-serif text-lg font-bold text-white">
                  {user?.email ? user.email[0].toUpperCase() : 'J'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-serif font-bold text-sm">
                    {user?.email ? user.email.split('@')[0] : 'Valued Customer'}
                  </p>
                  <p className="truncate text-[10px] text-[#31506c]">
                    {user?.email || 'Guest Session'}
                  </p>
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`w-full rounded-lg px-4 py-3 text-left text-xs font-semibold transition ${
                    activeTab === tab
                      ? 'bg-[#edf7ff] text-[#073b70]'
                      : 'text-[#31506c] hover:bg-[#f8f5ef]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </aside>

          {/* CONTENT AREA */}
          <div className="min-w-0">
            {/* ORDERS TAB */}
            {activeTab === 'Orders' && (
              <div className="rounded-2xl border border-[#073b70]/10 bg-white p-6 sm:p-8">
                <div className="flex flex-col justify-between gap-4 border-b border-[#073b70]/10 pb-6 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#073b70]/50">
                      Account
                    </p>
                    <h2 className="mt-1 font-serif text-3xl font-bold">My Orders</h2>
                  </div>

                  {/* ORDER SEARCH LOOKUP */}
                  <form onSubmit={handleLookupOrder} className="flex gap-2 sm:max-w-xs w-full">
                    <input
                      type="text"
                      placeholder="Lookup Ref or Phone..."
                      value={searchRef}
                      onChange={(e) => setSearchRef(e.target.value)}
                      className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-3 py-2 text-xs outline-none focus:border-[#073b70]"
                    />
                    <button
                      type="submit"
                      disabled={searching}
                      className="flex items-center gap-1 shrink-0 rounded-lg bg-[#073b70] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#052d56]"
                    >
                      <SearchIcon />
                      {searching ? '...' : 'Find'}
                    </button>
                  </form>
                </div>

                {ordersError && (
                  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700">
                    <p className="font-bold">{ordersError}</p>
                    <button
                      type="button"
                      onClick={fetchOrders}
                      className="mt-2 text-xs font-bold underline text-[#073b70]"
                    >
                      Reset & Reload Orders
                    </button>
                  </div>
                )}

                {loadingOrders ? (
                  <div className="py-16 text-center text-[#31506c]">
                    <p className="font-serif text-lg italic">Loading your orders...</p>
                  </div>
                ) : userOrders.length === 0 ? (
                  <div className="py-16 text-center">
                    <p className="font-serif text-3xl font-bold text-[#073b70]">No orders yet.</p>
                    <p className="mt-3 text-sm text-[#31506c]">
                      When you purchase curated thrift items, your orders will appear here.
                    </p>
                    <NavLink
                      to="/Shop"
                      className="mt-6 inline-block rounded-full bg-[#073b70] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#052d56]"
                    >
                      Start Shopping →
                    </NavLink>
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    {userOrders.map((order) => (
                      <div
                        key={order.id}
                        onClick={() => handleViewOrderDetails(order)}
                        className="group flex flex-col justify-between gap-4 rounded-xl border border-[#073b70]/10 bg-[#f8f5ef] p-5 transition hover:border-[#073b70] hover:bg-white cursor-pointer sm:flex-row sm:items-center"
                      >
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-serif text-base font-bold text-[#073b70]">
                              {order.order_number}
                            </span>
                            {getStatusBadge(order.status)}
                          </div>
                          <p className="mt-1 text-xs text-[#31506c]">
                            Placed on {new Date(order.created_at).toLocaleDateString()}
                          </p>
                          <p className="mt-0.5 text-xs text-[#31506c]">
                            Customer: {order.customer_name} ({order.customer_phone})
                          </p>
                        </div>

                        <div className="flex items-center justify-between sm:flex-col sm:items-end">
                          <p className="font-serif text-lg font-bold text-[#0064b8]">
                            ${Number(order.total_amount).toFixed(2)}
                          </p>
                          <span className="text-xs font-bold text-[#073b70] group-hover:underline">
                            View Order Details →
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PROFILE DETAILS TAB */}
            {activeTab === 'Profile' && (
              <div className="rounded-2xl border border-[#073b70]/10 bg-white p-6 sm:p-8">
                <div className="border-b border-[#073b70]/10 pb-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#073b70]/50">
                    Profile Details
                  </p>
                  <h2 className="mt-1 font-serif text-3xl font-bold">Your Information</h2>
                </div>

                <div className="mt-7 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#073b70]/50">
                      Account Email
                    </p>
                    <p className="mt-1 text-sm font-semibold">{user?.email || 'Guest Customer'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#073b70]/50">
                      Session Type
                    </p>
                    <p className="mt-1 text-sm font-semibold">{user ? 'Authenticated Member' : 'Guest Shopping Session'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#073b70]/50">
                      Total Orders
                    </p>
                    <p className="mt-1 text-sm font-semibold">{userOrders.length} orders recorded</p>
                  </div>
                </div>
              </div>
            )}

            {/* SAVED ITEMS TAB */}
            {activeTab === 'Saved Items' && (
              <div className="rounded-2xl border border-[#073b70]/10 bg-white p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#073b70]/50">
                  Wishlist
                </p>
                <h2 className="mt-1 font-serif text-3xl font-bold">Saved Items</h2>

                <div className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-4">
                  {savedItems.map((item) => (
                    <NavLink key={item.name} to="/Shop" className="group">
                      <div className="aspect-square overflow-hidden rounded-xl bg-[#edf7ff]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="mt-3 font-serif text-sm font-bold">{item.name}</h3>
                      <p className="mt-1 text-xs font-bold text-[#0064b8]">{item.price}</p>
                    </NavLink>
                  ))}
                </div>
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'Addresses' && (
              <div className="rounded-2xl border border-[#073b70]/10 bg-white p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#073b70]/50">Delivery</p>
                <h2 className="mt-1 font-serif text-3xl font-bold">Delivery Information</h2>

                <p className="mt-4 text-sm leading-6 text-[#31506c]">
                  Your delivery address and phone details are provided at checkout for each order. Recent delivery details will appear under order details in the My Orders tab.
                </p>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'Settings' && (
              <div className="rounded-2xl border border-[#073b70]/10 bg-white p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#073b70]/50">Preferences</p>
                <h2 className="mt-1 font-serif text-3xl font-bold">Settings</h2>

                <div className="mt-6 space-y-4">
                  <label className="flex items-center justify-between gap-5 rounded-xl border border-[#073b70]/10 p-4">
                    <div>
                      <p className="text-sm font-semibold">Order Notifications</p>
                      <p className="text-xs text-[#31506c]">Receive updates on order status and delivery</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#073b70]" />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#073b70]/10 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#0064b8]">
                  Order Details
                </p>
                <h3 className="font-serif text-2xl font-bold text-[#073b70]">
                  {selectedOrder.order_number}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f8f5ef] text-[#073b70] hover:bg-[#edf7ff]"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="mt-6 space-y-6 text-sm text-[#31506c]">
              <div className="grid gap-4 sm:grid-cols-2 rounded-xl bg-[#f8f5ef] p-4">
                <div>
                  <p className="text-xs font-bold uppercase text-[#073b70]">Order Summary</p>
                  <p className="mt-1">Date: {new Date(selectedOrder.created_at).toLocaleString()}</p>
                  <p>Status: <span className="font-bold text-[#073b70] uppercase">{selectedOrder.status}</span></p>
                  <p>Payment Ref: {selectedOrder.payment_reference || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-[#073b70]">Delivery To</p>
                  <p className="mt-1 font-semibold text-[#073b70]">{selectedOrder.customer_name}</p>
                  <p>{selectedOrder.customer_phone}</p>
                  <p>{selectedOrder.delivery_address}, {selectedOrder.city}</p>
                </div>
              </div>

              {/* ITEMS LIST */}
              <div>
                <h4 className="font-serif text-lg font-bold text-[#073b70] border-b border-[#073b70]/10 pb-2">
                  Line Items
                </h4>

                {loadingItems ? (
                  <p className="py-6 text-center italic">Loading line items...</p>
                ) : selectedOrderItems.length === 0 ? (
                  <p className="py-4 text-xs italic">Line items detail not found.</p>
                ) : (
                  <div className="divide-y divide-[#073b70]/10">
                    {selectedOrderItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          {item.products?.image_url && (
                            <img
                              src={item.products.image_url}
                              alt={item.product_name}
                              className="h-12 w-10 rounded-md object-cover bg-[#edf7ff]"
                            />
                          )}
                          <div>
                            <p className="font-bold text-[#073b70]">{item.product_name}</p>
                            <p className="text-xs text-[#31506c]">Size: {item.size} | Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-bold text-[#0064b8]">
                          ${Number(item.subtotal).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* TOTAL BREAKDOWN */}
              <div className="rounded-xl border border-[#073b70]/10 p-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#073b70]">${Number(selectedOrder.subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-[#073b70]">${Number(selectedOrder.shipping_fee).toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-[#073b70]/10 pt-2 font-serif text-lg font-bold text-[#073b70]">
                  <span>Total Paid</span>
                  <span className="text-[#0064b8]">${Number(selectedOrder.total_amount).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg bg-[#073b70] px-6 py-2.5 text-xs font-bold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Profile