import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const TrashIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 7h16" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M6 7l1 14h10l1-14" />
    <path d="M9 7V4h6v3" />
  </svg>
)

const MinusIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M5 12h14" />
  </svg>
)

const PlusIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
)

const TruckIcon = () => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h11v11H3z" />
    <path d="M14 10h4l3 3v4h-7z" />
    <circle cx="7" cy="19" r="2" />
    <circle cx="18" cy="19" r="2" />
  </svg>
)

const Cart = () => {
  const [items, setItems] = useState([])
  const [coupon, setCoupon] = useState('')

  useEffect(() => {
    const loadCart = () => {
      try {
        const rawData = localStorage.getItem('jovial_cart')
        if (!rawData) {
          setItems([])
          return
        }
        const parsed = JSON.parse(rawData)
        if (Array.isArray(parsed)) {
          setItems(parsed)
        } else {
          setItems([])
        }
      } catch (err) {
        console.error('Failed to parse jovial_cart from localStorage:', err)
        setItems([])
      }
    }

    loadCart()

    window.addEventListener('storage', loadCart)
    window.addEventListener('cartUpdated', loadCart)
    return () => {
      window.removeEventListener('storage', loadCart)
      window.removeEventListener('cartUpdated', loadCart)
    }
  }, [])

  const saveCart = (newItems) => {
    setItems(newItems)
    try {
      localStorage.setItem('jovial_cart', JSON.stringify(newItems))
    } catch (err) {
      console.error('Failed to save cart to localStorage:', err)
    }
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const updateQuantity = (id, size, change) => {
    const updated = items.map((item) => {
      if (item.id === id && String(item.size) === String(size)) {
        const currentQty = Number(item.quantity) || 1
        return {
          ...item,
          quantity: Math.max(1, currentQty + change),
        }
      }
      return item
    })
    saveCart(updated)
  }

  const removeItem = (id, size) => {
    const updated = items.filter(
      (item) => !(item.id === id && String(item.size) === String(size)),
    )
    saveCart(updated)
  }

  const totalItemCount = items.reduce(
    (sum, item) => sum + (Number(item.quantity) || 1),
    0,
  )

  const subtotal = items.reduce(
    (total, item) => total + Number(item.price) * (Number(item.quantity) || 1),
    0,
  )

  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 8

  const total = subtotal + shipping

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#073b70]">

      {/* HEADER */}
      <section className="border-b border-[#073b70]/10 bg-white px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <p className="font-serif text-3xl italic">
            Good finds.
          </p>

          <h1 className="mt-1 font-serif text-5xl font-bold sm:text-6xl">
            Your Cart
          </h1>

          <p className="mt-4 text-sm text-[#31506c]">
            Review your curated finds before continuing.
          </p>

        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
        <div className="flex items-center gap-3 text-xs text-[#31506c]">
          <NavLink to="/" className="hover:text-[#073b70]">
            Home
          </NavLink>

          <span>›</span>

          <span className="font-semibold text-[#073b70]">
            Cart
          </span>
        </div>
      </div>

      {/* CART */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">

        {items.length === 0 ? (
          <div className="rounded-2xl border border-[#073b70]/10 bg-white px-6 py-20 text-center">

            <p className="font-serif text-4xl font-bold">
              Your cart is empty.
            </p>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#31506c]">
              Looks like you haven't found your next favourite piece yet.
            </p>

            <NavLink
              to="/Shop"
              className="mt-7 inline-flex rounded-full bg-[#073b70] px-7 py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#052d56]"
            >
              Continue Shopping →
            </NavLink>

          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

            {/* ITEMS */}
            <div className="rounded-2xl border border-[#073b70]/10 bg-white">

              <div className="flex items-center justify-between border-b border-[#073b70]/10 px-5 py-5 sm:px-7">

                <div>
                  <h2 className="font-serif text-2xl font-bold">
                    Your Items
                  </h2>

                  <p className="mt-1 text-xs text-[#31506c]">
                    {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
                  </p>
                </div>

                <NavLink
                  to="/Shop"
                  className="text-xs font-bold underline underline-offset-4 hover:text-[#052d56]"
                >
                  Continue Shopping
                </NavLink>

              </div>

              <div className="divide-y divide-[#073b70]/10">

                {items.map((item) => {
                  const itemPrice = Number(item.price) || 0
                  const itemQuantity = Number(item.quantity) || 1
                  const itemSubtotal = itemPrice * itemQuantity

                  return (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="flex gap-4 p-5 sm:p-7"
                    >

                      {/* IMAGE */}
                      <div className="h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-[#edf7ff] sm:h-32 sm:w-28">
                        <NavLink to={`/ProductDetails?id=${item.id}`}>
                          <img
                            src={item.image || '/hero/hero1.jpeg'}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </NavLink>
                      </div>

                      {/* DETAILS */}
                      <div className="flex min-w-0 flex-1 flex-col justify-between">

                        <div className="flex justify-between gap-4">

                          <div>
                            <NavLink
                              to={`/ProductDetails?id=${item.id}`}
                              className="font-serif text-lg font-bold hover:underline"
                            >
                              {item.name}
                            </NavLink>

                            <p className="mt-1 text-xs text-[#31506c]">
                              Size: <span className="font-semibold text-[#073b70]">{item.size || 'One Size'}</span>
                            </p>

                            <p className="mt-1 text-xs text-[#31506c]">
                              Unit Price: ${itemPrice.toFixed(2)}
                            </p>
                          </div>

                          <p className="font-bold text-[#0064b8]">
                            ${itemSubtotal.toFixed(2)}
                          </p>

                        </div>

                        <div className="mt-4 flex items-center justify-between">

                          {/* QUANTITY */}
                          <div className="flex items-center rounded-md border border-[#073b70]/15">

                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.size, -1)}
                              className="flex h-8 w-8 items-center justify-center hover:bg-[#edf7ff]"
                              aria-label="Decrease quantity"
                            >
                              <MinusIcon />
                            </button>

                            <span className="flex h-8 min-w-8 items-center justify-center border-x border-[#073b70]/15 text-xs font-semibold">
                              {itemQuantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.size, 1)}
                              className="flex h-8 w-8 items-center justify-center hover:bg-[#edf7ff]"
                              aria-label="Increase quantity"
                            >
                              <PlusIcon />
                            </button>

                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id, item.size)}
                            className="flex items-center gap-2 text-xs text-[#31506c] transition hover:text-red-600"
                          >
                            <TrashIcon />
                            Remove
                          </button>

                        </div>

                      </div>
                    </div>
                  )
                })}

              </div>
            </div>

            {/* SUMMARY */}
            <aside className="h-fit rounded-2xl border border-[#073b70]/10 bg-white p-6 sm:p-7">

              <h2 className="font-serif text-2xl font-bold">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4 border-b border-[#073b70]/10 pb-6">

                <div className="flex justify-between text-sm">
                  <span className="text-[#31506c]">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#31506c]">
                    Shipping
                  </span>

                  <span className="font-semibold">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#31506c]">
                    Estimated Tax
                  </span>

                  <span className="font-semibold">
                    $0.00
                  </span>
                </div>

              </div>

              {/* FREE SHIPPING */}
              <div className="my-5 flex gap-3 rounded-lg bg-[#edf7ff] p-4">

                <TruckIcon />

                <div>
                  <p className="text-xs font-bold">
                    {subtotal >= 50
                      ? 'You qualify for free shipping!'
                      : `Add $${(50 - subtotal).toFixed(2)} more for free shipping.`}
                  </p>

                  <p className="mt-1 text-[10px] text-[#31506c]">
                    Free shipping on orders over $50.
                  </p>
                </div>

              </div>

              {/* COUPON */}
              <div className="border-b border-[#073b70]/10 pb-6">

                <label
                  htmlFor="coupon"
                  className="mb-2 block text-xs font-bold"
                >
                  Have a promo code?
                </label>

                <div className="flex gap-2">

                  <input
                    id="coupon"
                    type="text"
                    value={coupon}
                    onChange={(event) => setCoupon(event.target.value)}
                    placeholder="Enter code"
                    className="min-w-0 flex-1 rounded-md border border-[#073b70]/15 bg-[#f8f5ef] px-3 py-3 text-xs outline-none focus:border-[#073b70]"
                  />

                  <button
                    type="button"
                    className="rounded-md border border-[#073b70] px-4 text-xs font-bold hover:bg-[#edf7ff]"
                  >
                    Apply
                  </button>

                </div>

              </div>

              {/* TOTAL */}
              <div className="flex items-center justify-between py-6">

                <span className="font-serif text-xl font-bold">
                  Total
                </span>

                <span className="font-serif text-2xl font-bold text-[#0064b8]">
                  ${total.toFixed(2)}
                </span>

              </div>

              <NavLink
                to="/Checkout"
                className="flex w-full items-center justify-center rounded-md bg-[#073b70] py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#052d56]"
              >
                Proceed to Checkout →
              </NavLink>

              <p className="mt-4 text-center text-[10px] leading-5 text-[#31506c]">
                Checkout details and order confirmation will be completed
                with our team.
              </p>

            </aside>

          </div>
        )}

      </section>

      {/* TRUST */}
      <section className="border-t border-[#073b70]/10 bg-white px-5 py-12 sm:px-8 lg:px-10">

        <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-3">

          <div className="flex items-center justify-center gap-4 border-b border-[#073b70]/10 px-5 py-5 text-center sm:border-b-0 sm:border-r">
            <span className="text-2xl">♡</span>

            <p className="text-xs leading-5">
              Pre-Loved
              <br />
              With Care
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 border-b border-[#073b70]/10 px-5 py-5 text-center sm:border-b-0 sm:border-r">
            <span className="text-2xl">✓</span>

            <p className="text-xs leading-5">
              Verified
              <br />
              Authenticity
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 px-5 py-5 text-center">
            <span className="text-2xl">↺</span>

            <p className="text-xs leading-5">
              Easy
              <br />
              Returns
            </p>
          </div>

        </div>

      </section>

    </main>
  )
}

export default Cart