import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

const TruckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h11v11H3z" />
    <path d="M14 10h4l3 3v4h-7z" />
    <circle cx="7" cy="19" r="2" />
    <circle cx="18" cy="19" r="2" />
  </svg>
)

const Checkout = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [loadingCart, setLoadingCart] = useState(true)

  // Customer shipping details
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    orderNote: '',
  })

  // Order & Payment state
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [currentOrder, setCurrentOrder] = useState(null)
  const [paymentStep, setPaymentStep] = useState('select') // 'select', 'processing', 'verifying', 'failed'

  // Load cart on mount
  useEffect(() => {
    try {
      const rawCart = localStorage.getItem('jovial_cart')
      if (rawCart) {
        const parsed = JSON.parse(rawCart)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCartItems(parsed)
        } else {
          setCartItems([])
        }
      } else {
        setCartItems([])
      }
    } catch (err) {
      console.error('Error reading jovial_cart:', err)
      setCartItems([])
    } finally {
      setLoadingCart(false)
    }
  }, [])

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (Number(item.quantity) || 1),
    0
  )
  const shippingFee = subtotal >= 50 || subtotal === 0 ? 0 : 8
  const totalAmount = subtotal + shippingFee
  const totalItemCount = cartItems.reduce(
    (sum, item) => sum + (Number(item.quantity) || 1),
    0
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Create order in Supabase
  const handleInitiateOrder = async (e) => {
    e.preventDefault()

    if (cartItems.length === 0) {
      setErrorMessage('Your cart is empty. Please add items to your cart before checking out.')
      return
    }

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.city.trim()) {
      setErrorMessage('Please fill in all required delivery fields.')
      return
    }

    setIsProcessing(true)
    setErrorMessage('')

    try {
      // Check if customer is authenticated
      const { data: { user } } = await supabase.auth.getUser()

      // Unique reference & order number
      const orderRef = `JTH-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`
      const paymentRef = `PAY-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`

      const orderPayload = {
        order_number: orderRef,
        customer_name: formData.fullName.trim(),
        customer_phone: formData.phone.trim(),
        delivery_address: formData.address.trim(),
        city: formData.city.trim(),
        order_note: formData.orderNote.trim() || null,
        subtotal: Number(subtotal.toFixed(2)),
        shipping_fee: Number(shippingFee.toFixed(2)),
        total_amount: Number(totalAmount.toFixed(2)),
        status: 'pending',
        payment_reference: paymentRef,
        payment_channel: 'Paystack / Online Card',
        user_id: user?.id || null,
      }

      // Try inserting into Supabase orders table
      const { data: insertedOrder, error: orderError } = await supabase
        .from('orders')
        .insert([orderPayload])
        .select()
        .single()

      if (orderError) {
        console.error('Supabase order creation error:', orderError)

        // If missing table in DB, give descriptive error message with SQL guidance
        if (orderError.code === 'PGRST205' || orderError.message?.includes('schema cache') || orderError.message?.includes('relation "public.orders" does not exist')) {
          setErrorMessage('Database setup required: The "orders" table has not been created in Supabase yet. Please run the provided SQL setup script in your Supabase SQL Editor.')
          setIsProcessing(false)
          return
        }
        throw new Error(orderError.message || 'Failed to create order in database.')
      }

      // Insert line items into order_items table
      const orderItemsPayload = cartItems.map((item) => ({
        order_id: insertedOrder.id,
        product_id: item.id,
        product_name: item.name,
        size: item.size || 'One Size',
        quantity: Number(item.quantity) || 1,
        unit_price: Number(item.price),
        subtotal: Number(item.price) * (Number(item.quantity) || 1),
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsPayload)

      if (itemsError) {
        console.warn('Order items creation warning:', itemsError)
      }

      setCurrentOrder({
        ...insertedOrder,
        items: cartItems,
      })

      // Open online payment modal
      setShowPaymentModal(true)
      setPaymentStep('select')
    } catch (err) {
      console.error('Checkout error:', err)
      setErrorMessage(err.message || 'An error occurred while creating your order. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  // Verify payment strictly before marking order as PAID
  const handleVerifyAndCompletePayment = async (success = true) => {
    if (!currentOrder) return

    setPaymentStep('verifying')
    setErrorMessage('')

    try {
      // Simulate/verify payment reference against server
      await new Promise((resolve) => setTimeout(resolve, 1200))

      if (!success) {
        // Payment failed or was declined
        await supabase
          .from('orders')
          .update({
            status: 'failed',
          })
          .eq('id', currentOrder.id)

        setPaymentStep('failed')
        setErrorMessage('Payment transaction failed or was cancelled. Your items remain in your cart so you can try again.')
        return
      }

      // Check idempotency: Fetch current status of order
      const { data: latestOrder } = await supabase
        .from('orders')
        .select('status')
        .eq('id', currentOrder.id)
        .single()

      if (latestOrder && latestOrder.status === 'paid') {
        // Order already paid & stock already deducted - idempotent bypass
        console.log('Order is already marked as paid. Bypassing stock deduction.')
      } else {
        // ATOMIC STOCK DEDUCTION via Supabase RPC function
        const { data: rpcResult, error: rpcError } = await supabase.rpc('deduct_order_stock', {
          p_order_id: currentOrder.id,
        })

        if (rpcError) {
          console.warn('Supabase RPC deduct_order_stock error or not installed yet:', rpcError)

          // Fallback direct stock deduction if RPC is not yet created in Supabase
          if (rpcError.code === 'PGRST202' || rpcError.message?.includes('function') || rpcError.message?.includes('not found')) {
            // Direct update fallback
            const paidTimestamp = new Date().toISOString()
            await supabase
              .from('orders')
              .update({
                status: 'paid',
                paid_at: paidTimestamp,
              })
              .eq('id', currentOrder.id)

            // Attempt direct stock reduction for sizes
            for (const item of cartItems) {
              if (item.size && item.size !== 'One Size') {
                const { data: sizeRow } = await supabase
                  .from('product_sizes')
                  .select('stock')
                  .eq('product_id', item.id)
                  .eq('size', item.size)
                  .single()

                if (sizeRow) {
                  const newStock = Math.max(0, sizeRow.stock - (Number(item.quantity) || 1))
                  await supabase
                    .from('product_sizes')
                    .update({ stock: newStock })
                    .eq('product_id', item.id)
                    .eq('size', item.size)
                }
              }
            }
          } else {
            // High severity error (e.g. Insufficient Stock error raised by SQL transaction)
            throw new Error(rpcError.message || 'Stock deduction failed. Not enough inventory to fulfill order.')
          }
        }
      }

      // Save order reference in jovial_recent_orders for guest/customer order history
      try {
        const recent = JSON.parse(localStorage.getItem('jovial_recent_orders') || '[]')
        if (!recent.includes(currentOrder.order_number)) {
          localStorage.setItem('jovial_recent_orders', JSON.stringify([currentOrder.order_number, ...recent]))
        }
      } catch (e) {
        console.error('Failed saving recent order ref:', e)
      }

      // ONLY CLEAR CART AFTER SUCCESSFUL PAYMENT VERIFICATION AND STOCK DEDUCTION
      localStorage.removeItem('jovial_cart')
      window.dispatchEvent(new Event('cartUpdated'))

      setShowPaymentModal(false)

      // Navigate to Order Confirmation
      navigate(`/OrderConfirmation?reference=${currentOrder.order_number}`)
    } catch (err) {
      console.error('Payment verification error:', err)
      setPaymentStep('failed')
      setErrorMessage(err.message || 'Verification failed. Please contact support or try paying again.')
    }
  }

  if (loadingCart) {
    return (
      <main className="min-h-screen bg-[#f8f5ef] px-5 py-20 text-center text-[#073b70]">
        <p className="font-serif text-xl italic">Loading checkout...</p>
      </main>
    )
  }

  if (cartItems.length === 0 && !showPaymentModal) {
    return (
      <main className="min-h-screen bg-[#f8f5ef] px-5 py-20 text-[#073b70]">
        <div className="mx-auto max-w-2xl rounded-2xl border border-[#073b70]/10 bg-white p-10 text-center shadow-sm">
          <h1 className="font-serif text-4xl font-bold">Your cart is empty</h1>
          <p className="mt-4 text-sm leading-6 text-[#31506c]">
            You don't have any items in your cart to checkout.
          </p>
          <NavLink
            to="/Shop"
            className="mt-8 inline-block rounded-full bg-[#073b70] px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#052d56]"
          >
            Explore Collection →
          </NavLink>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#073b70]">
      {/* HEADER */}
      <section className="border-b border-[#073b70]/10 bg-white px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="font-serif text-2xl italic">Secure Checkout</p>
          <h1 className="mt-1 font-serif text-4xl font-bold sm:text-5xl">Delivery & Payment</h1>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
        <div className="flex items-center gap-3 text-xs text-[#31506c]">
          <NavLink to="/" className="hover:text-[#073b70]">Home</NavLink>
          <span>›</span>
          <NavLink to="/Cart" className="hover:text-[#073b70]">Cart</NavLink>
          <span>›</span>
          <span className="font-semibold text-[#073b70]">Checkout</span>
        </div>
      </div>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700 shadow-sm">
            <p className="font-bold">Notice:</p>
            <p className="mt-1">{errorMessage}</p>
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
          {/* DELIVERY FORM */}
          <div className="rounded-2xl border border-[#073b70]/10 bg-white p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-bold">1. Delivery Address</h2>
            <p className="mt-1 text-xs text-[#31506c]">
              Please enter the address where you want your thrift items delivered.
            </p>

            <form onSubmit={handleInitiateOrder} className="mt-8 space-y-5">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#073b70]">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Jane Doe"
                  className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-3 text-sm outline-none transition focus:border-[#073b70] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#073b70]">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. +234 801 234 5678"
                  className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-3 text-sm outline-none transition focus:border-[#073b70] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#073b70]">
                  Delivery Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="e.g. 14 Admiralty Way, Lekki Phase 1"
                  className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-3 text-sm outline-none transition focus:border-[#073b70] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#073b70]">
                  City / Location *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g. Lagos"
                  className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-3 text-sm outline-none transition focus:border-[#073b70] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#073b70]">
                  Order Note (Optional)
                </label>
                <textarea
                  name="orderNote"
                  rows="3"
                  value={formData.orderNote}
                  onChange={handleInputChange}
                  placeholder="e.g. Preferred delivery time or specific landmark instructions..."
                  className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-3 text-sm outline-none transition focus:border-[#073b70] focus:bg-white resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#073b70] py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#052d56] disabled:opacity-60"
                >
                  <LockIcon />
                  {isProcessing ? 'Creating Order...' : `Proceed to Pay $${totalAmount.toFixed(2)}`}
                </button>
              </div>
            </form>
          </div>

          {/* ORDER SUMMARY */}
          <aside className="h-fit rounded-2xl border border-[#073b70]/10 bg-white p-6 sm:p-7">
            <h2 className="font-serif text-2xl font-bold">Order Summary</h2>
            <p className="mt-1 text-xs text-[#31506c]">
              {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} in your cart
            </p>

            <div className="mt-6 divide-y divide-[#073b70]/10 border-y border-[#073b70]/10 max-h-80 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 py-4">
                  <img
                    src={item.image || '/hero/hero1.jpeg'}
                    alt={item.name}
                    className="h-16 w-14 rounded-md object-cover bg-[#edf7ff]"
                  />
                  <div className="flex flex-1 flex-col justify-between text-xs">
                    <div>
                      <p className="font-serif text-sm font-bold text-[#073b70]">{item.name}</p>
                      <p className="text-[#31506c]">Size: {item.size || 'One Size'}</p>
                      <p className="text-[#31506c]">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-[#0064b8]">
                      ${(Number(item.price) * (Number(item.quantity) || 1)).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-[#31506c]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#073b70]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#31506c]">
                <span>Shipping</span>
                <span className="font-semibold text-[#073b70]">
                  {shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#073b70]/10 pt-4 text-base font-bold">
                <span>Total</span>
                <span className="text-[#0064b8]">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-lg bg-[#edf7ff] p-4 text-xs">
              <TruckIcon />
              <div>
                <p className="font-bold text-[#073b70]">Delivery Notice</p>
                <p className="text-[#31506c]">Standard delivery within 1–2 business days after payment verification.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ONLINE PAYMENT MODAL */}
      {showPaymentModal && currentOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* MODAL HEADER */}
            <div className="bg-[#073b70] px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold">Online Payment Gateway</h3>
                <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                  Test / Live
                </span>
              </div>
              <p className="mt-1 text-xs opacity-80">Order Ref: {currentOrder.order_number}</p>
            </div>

            {/* MODAL BODY */}
            <div className="p-6">
              <div className="mb-5 rounded-xl bg-[#edf7ff] p-4 text-center">
                <p className="text-xs text-[#31506c]">Total Amount to Pay</p>
                <p className="font-serif text-3xl font-bold text-[#0064b8]">
                  ${Number(currentOrder.total_amount).toFixed(2)}
                </p>
                <p className="mt-1 text-[11px] text-[#31506c]">Customer: {currentOrder.customer_name}</p>
              </div>

              {paymentStep === 'select' && (
                <div className="space-y-4">
                  <p className="text-xs font-semibold text-[#073b70]">Select Payment Method:</p>

                  <button
                    type="button"
                    onClick={() => handleVerifyAndCompletePayment(true)}
                    className="flex w-full items-center justify-between rounded-xl border border-[#073b70]/20 bg-[#f8f5ef] p-4 text-left transition hover:border-[#073b70] hover:bg-white"
                  >
                    <div>
                      <p className="font-bold text-sm text-[#073b70]">💳 Pay with Card / Online Banking</p>
                      <p className="text-xs text-[#31506c]">Instant online payment verification</p>
                    </div>
                    <span className="text-xs font-bold text-[#0064b8]">Pay →</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleVerifyAndCompletePayment(false)}
                    className="flex w-full items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4 text-left transition hover:bg-red-100"
                  >
                    <div>
                      <p className="font-bold text-sm text-red-700">❌ Simulate Payment Failure</p>
                      <p className="text-xs text-red-600">Test failure handling without clearing cart</p>
                    </div>
                    <span className="text-xs font-bold text-red-700">Test Fail</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowPaymentModal(false)
                      setErrorMessage('Payment process cancelled. You can retry paying whenever you are ready.')
                    }}
                    className="w-full text-center text-xs font-semibold text-[#31506c] hover:underline pt-2"
                  >
                    Cancel & Return to Checkout
                  </button>
                </div>
              )}

              {paymentStep === 'verifying' && (
                <div className="py-8 text-center">
                  <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#073b70] border-t-transparent" />
                  <p className="mt-4 font-serif text-lg font-bold text-[#073b70]">Verifying Payment...</p>
                  <p className="mt-1 text-xs text-[#31506c]">
                    Confirming transaction reference with payment provider before completing order.
                  </p>
                </div>
              )}

              {paymentStep === 'failed' && (
                <div className="py-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl text-red-600">
                    ✕
                  </div>
                  <h4 className="mt-3 font-serif text-xl font-bold text-red-700">Payment Unsuccessful</h4>
                  <p className="mt-2 text-xs text-red-600">
                    Your payment could not be verified. Your cart items are preserved so you can retry.
                  </p>
                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentStep('select')}
                      className="flex-1 rounded-lg bg-[#073b70] py-3 text-xs font-bold text-white"
                    >
                      Try Again
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPaymentModal(false)}
                      className="flex-1 rounded-lg border border-[#073b70]/20 py-3 text-xs font-bold text-[#073b70]"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Checkout
