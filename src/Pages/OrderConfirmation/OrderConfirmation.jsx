import React, { useEffect, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

const CheckCircleIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" className="text-green-500 fill-green-50" />
    <path d="m9 12 2 2 4-4" className="text-green-600" />
  </svg>
)

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams()
  const orderRef = searchParams.get('reference') || searchParams.get('orderId')

  const [order, setOrder] = useState(null)
  const [orderItems, setOrderItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderRef) {
        setError('No order reference provided.')
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')

      try {
        // Query order by order_number or payment_reference or id
        const { data: fetchedOrder, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .or(`order_number.eq.${orderRef},payment_reference.eq.${orderRef},id.eq.${orderRef}`)
          .single()

        if (orderError || !fetchedOrder) {
          console.error('Order fetch error:', orderError)
          setError('Order not found or could not be retrieved.')
          setLoading(false)
          return
        }

        setOrder(fetchedOrder)

        // Fetch associated order items
        const { data: itemsData, error: itemsError } = await supabase
          .from('order_items')
          .select('*, products(image_url)')
          .eq('order_id', fetchedOrder.id)

        if (itemsError) {
          console.warn('Order items fetch warning:', itemsError)
          setOrderItems([])
        } else {
          setOrderItems(itemsData || [])
        }
      } catch (err) {
        console.error('Confirmation fetch exception:', err)
        setError('An error occurred while retrieving order confirmation details.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [orderRef])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8f5ef] px-5 py-20 text-center text-[#073b70]">
        <p className="font-serif text-xl italic">Retrieving order details...</p>
      </main>
    )
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-[#f8f5ef] px-5 py-20 text-center text-[#073b70]">
        <div className="mx-auto max-w-lg rounded-2xl border border-[#073b70]/10 bg-white p-10 shadow-sm">
          <h1 className="font-serif text-3xl font-bold">Order Details Unavailable</h1>
          <p className="mt-3 text-sm text-[#31506c]">{error || 'Unable to locate order confirmation.'}</p>
          <NavLink
            to="/Shop"
            className="mt-8 inline-block rounded-full bg-[#073b70] px-8 py-4 text-xs font-bold uppercase tracking-wider text-white"
          >
            Return to Shop
          </NavLink>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#073b70]">
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <div className="overflow-hidden rounded-3xl border border-[#073b70]/10 bg-white shadow-sm">
          {/* SUCCESS HEADER */}
          <div className="border-b border-[#073b70]/10 bg-[#edf7ff] p-8 text-center sm:p-12">
            <div className="mx-auto flex justify-center">
              <CheckCircleIcon />
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[#0064b8]">
              Payment Verified & Paid
            </p>
            <h1 className="mt-2 font-serif text-4xl font-bold leading-tight sm:text-5xl">
              Thank You For Your Order!
            </h1>
            <p className="mt-3 text-sm text-[#31506c]">
              We've received your order and payment. Your curated thrift finds are being prepared!
            </p>
            <div className="mt-6 inline-block rounded-xl bg-white px-5 py-3 shadow-xs">
              <p className="text-xs text-[#31506c]">Order Reference Number</p>
              <p className="font-serif text-lg font-bold text-[#073b70]">{order.order_number}</p>
            </div>
          </div>

          {/* ORDER DETAILS GRID */}
          <div className="p-8 sm:p-12">
            <div className="grid gap-8 sm:grid-cols-2">
              {/* CUSTOMER & DELIVERY INFO */}
              <div>
                <h2 className="font-serif text-xl font-bold border-b border-[#073b70]/10 pb-3">
                  Delivery Details
                </h2>
                <div className="mt-4 space-y-2 text-sm text-[#31506c]">
                  <p><strong className="text-[#073b70]">Customer:</strong> {order.customer_name}</p>
                  <p><strong className="text-[#073b70]">Phone:</strong> {order.customer_phone}</p>
                  <p><strong className="text-[#073b70]">Address:</strong> {order.delivery_address}</p>
                  <p><strong className="text-[#073b70]">City:</strong> {order.city}</p>
                  {order.order_note && (
                    <p><strong className="text-[#073b70]">Note:</strong> {order.order_note}</p>
                  )}
                </div>
              </div>

              {/* PAYMENT INFO */}
              <div>
                <h2 className="font-serif text-xl font-bold border-b border-[#073b70]/10 pb-3">
                  Payment Details
                </h2>
                <div className="mt-4 space-y-2 text-sm text-[#31506c]">
                  <p>
                    <strong className="text-[#073b70]">Status:</strong>{' '}
                    <span className="inline-block rounded-full bg-green-100 px-3 py-0.5 text-xs font-bold text-green-700 uppercase">
                      {order.status}
                    </span>
                  </p>
                  <p><strong className="text-[#073b70]">Payment Ref:</strong> {order.payment_reference || 'N/A'}</p>
                  <p><strong className="text-[#073b70]">Payment Method:</strong> {order.payment_channel || 'Online'}</p>
                  <p><strong className="text-[#073b70]">Date:</strong> {order.paid_at ? new Date(order.paid_at).toLocaleString() : new Date(order.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* ITEMS SUMMARY */}
            <div className="mt-10">
              <h2 className="font-serif text-xl font-bold border-b border-[#073b70]/10 pb-3">
                Items Ordered
              </h2>
              <div className="mt-4 divide-y divide-[#073b70]/10">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-4 text-sm">
                    <div className="flex items-center gap-4">
                      {item.products?.image_url && (
                        <img
                          src={item.products.image_url}
                          alt={item.product_name}
                          className="h-14 w-12 rounded-lg object-cover bg-[#edf7ff]"
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
            </div>

            {/* TOTAL BREAKDOWN */}
            <div className="mt-8 rounded-2xl bg-[#f8f5ef] p-6 text-sm">
              <div className="flex justify-between text-[#31506c]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#073b70]">${Number(order.subtotal).toFixed(2)}</span>
              </div>
              <div className="mt-2 flex justify-between text-[#31506c]">
                <span>Shipping</span>
                <span className="font-semibold text-[#073b70]">
                  {Number(order.shipping_fee) === 0 ? 'Free' : `$${Number(order.shipping_fee).toFixed(2)}`}
                </span>
              </div>
              <div className="mt-4 flex justify-between border-t border-[#073b70]/10 pt-4 font-serif text-xl font-bold text-[#073b70]">
                <span>Total Paid</span>
                <span className="text-[#0064b8]">${Number(order.total_amount).toFixed(2)}</span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-10 text-center">
              <NavLink
                to="/Shop"
                className="inline-flex rounded-full bg-[#073b70] px-10 py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#052d56]"
              >
                Continue Shopping →
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default OrderConfirmation
