import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Profile')

  const tabs = [
    'Profile',
    'Orders',
    'Saved Items',
    'Addresses',
    'Settings',
  ]

  const orders = [
    {
      id: '#JV00426',
      date: 'Apr 11, 2025',
      total: '$105',
      status: 'Delivered',
      image: '/hero/hero1.jpeg',
    },
    {
      id: '#JV00418',
      date: 'Mar 29, 2025',
      total: '$64',
      status: 'Delivered',
      image: '/hero/hero2.jpeg',
    },
    {
      id: '#JV00391',
      date: 'Feb 14, 2025',
      total: '$124',
      status: 'Delivered',
      image: '/hero/hero3.jpeg',
    },
  ]

  const savedItems = [
    {
      name: 'Blue Midi Dress',
      price: '$32',
      image: '/hero/hero1.jpeg',
    },
    {
      name: 'Classic Handbag',
      price: '$48',
      image: '/hero/hero2.jpeg',
    },
    {
      name: 'Vintage Cap',
      price: '$18',
      image: '/hero/hero3.jpeg',
    },
    {
      name: 'Sneakers',
      price: '$36',
      image: '/hero/hero2.jpeg',
    },
  ]

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#073b70]">

      {/* HEADER */}
      <section className="border-b border-[#073b70]/10 bg-white px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <p className="font-serif text-3xl italic">
            Welcome back.
          </p>

          <h1 className="mt-1 font-serif text-5xl font-bold sm:text-6xl">
            My Account
          </h1>

          <p className="mt-4 text-sm text-[#31506c]">
            Manage your profile, orders, saved pieces and account settings.
          </p>

        </div>
      </section>

      {/* ACCOUNT */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

        <div className="grid gap-7 lg:grid-cols-[230px_1fr]">

          {/* SIDEBAR */}
          <aside className="h-fit rounded-2xl border border-[#073b70]/10 bg-white p-3">

            <div className="mb-3 border-b border-[#073b70]/10 px-4 py-5">
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#073b70] font-serif text-lg font-bold text-white">
                  S
                </div>

                <div>
                  <p className="font-serif font-bold">
                    Sarah Johnson
                  </p>

                  <p className="text-[10px] text-[#31506c]">
                    sarah@example.com
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
                  className={`w-full rounded-lg px-4 py-3 text-left text-xs font-semibold transition ${activeTab === tab
                    ? 'bg-[#edf7ff] text-[#073b70]'
                    : 'text-[#31506c] hover:bg-[#f8f5ef]'
                    }`}
                >
                  {tab}
                </button>
              ))}

              <button
                type="button"
                className="mt-3 w-full border-t border-[#073b70]/10 px-4 pt-4 text-left text-xs font-semibold text-[#31506c] hover:text-red-600"
              >
                Log Out
              </button>

            </nav>

          </aside>

          {/* CONTENT */}
          <div className="min-w-0">

            {/* PROFILE */}
            {activeTab === 'Profile' && (
              <div className="space-y-7">

                <div className="rounded-2xl border border-[#073b70]/10 bg-white p-6 sm:p-8">

                  <div className="flex flex-col justify-between gap-5 border-b border-[#073b70]/10 pb-6 sm:flex-row sm:items-center">

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#073b70]/50">
                        Profile Details
                      </p>

                      <h2 className="mt-2 font-serif text-3xl font-bold">
                        Your Information
                      </h2>
                    </div>

                    <button
                      type="button"
                      className="rounded-md bg-[#073b70] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white"
                    >
                      Edit Profile
                    </button>

                  </div>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#073b70]/50">
                        Full Name
                      </p>

                      <p className="mt-2 text-sm">
                        Sarah Johnson
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#073b70]/50">
                        Email
                      </p>

                      <p className="mt-2 text-sm">
                        sarah.johnson@example.com
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#073b70]/50">
                        Phone
                      </p>

                      <p className="mt-2 text-sm">
                        +234 801 234 5678
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#073b70]/50">
                        Member Since
                      </p>

                      <p className="mt-2 text-sm">
                        January 2025
                      </p>
                    </div>

                  </div>

                </div>

                {/* RECENT ORDERS */}
                <div className="rounded-2xl border border-[#073b70]/10 bg-white p-6 sm:p-8">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#073b70]/50">
                        Recent Orders
                      </p>

                      <h2 className="mt-2 font-serif text-2xl font-bold">
                        Your Orders
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('Orders')}
                      className="text-xs font-bold underline underline-offset-4"
                    >
                      View All →
                    </button>

                  </div>

                  <div className="mt-6 space-y-4">

                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center gap-4 rounded-xl bg-[#f8f5ef] p-3"
                      >

                        <div className="h-16 w-14 overflow-hidden rounded-lg bg-white">
                          <img
                            src={order.image}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">

                          <p className="text-xs font-bold">
                            {order.id}
                          </p>

                          <p className="mt-1 text-[10px] text-[#31506c]">
                            {order.date}
                          </p>

                        </div>

                        <div className="hidden text-right sm:block">
                          <p className="text-xs font-bold">
                            {order.total}
                          </p>

                          <span className="mt-1 inline-block rounded-full bg-[#e4f5e9] px-2 py-1 text-[9px] font-semibold text-green-700">
                            {order.status}
                          </span>
                        </div>

                      </div>
                    ))}

                  </div>

                </div>

                {/* SAVED ITEMS */}
                <div className="rounded-2xl border border-[#073b70]/10 bg-white p-6 sm:p-8">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#073b70]/50">
                        Wishlist
                      </p>

                      <h2 className="mt-2 font-serif text-2xl font-bold">
                        Saved Items
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('Saved Items')}
                      className="text-xs font-bold underline underline-offset-4"
                    >
                      View All →
                    </button>

                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">

                    {savedItems.map((item) => (
                      <NavLink
                        key={item.name}
                        to="/Shop"
                        className="group"
                      >
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-[#edf7ff]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>

                        <p className="mt-2 text-xs font-semibold">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs font-bold text-[#0064b8]">
                          {item.price}
                        </p>
                      </NavLink>
                    ))}

                  </div>

                </div>

              </div>
            )}

            {/* ORDERS */}
            {activeTab === 'Orders' && (
              <div className="rounded-2xl border border-[#073b70]/10 bg-white p-6 sm:p-8">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#073b70]/50">
                  Account
                </p>

                <h2 className="mt-2 font-serif text-3xl font-bold">
                  Order History
                </h2>

                <div className="mt-7 space-y-4">

                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col gap-4 rounded-xl border border-[#073b70]/10 p-4 sm:flex-row sm:items-center"
                    >

                      <img
                        src={order.image}
                        alt=""
                        className="h-20 w-20 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <p className="font-serif font-bold">
                          {order.id}
                        </p>

                        <p className="mt-1 text-xs text-[#31506c]">
                          Ordered {order.date}
                        </p>
                      </div>

                      <div>
                        <p className="font-bold">
                          {order.total}
                        </p>

                        <span className="text-xs text-green-700">
                          {order.status}
                        </span>
                      </div>

                    </div>
                  ))}

                </div>

              </div>
            )}

            {/* SAVED ITEMS */}
            {activeTab === 'Saved Items' && (
              <div className="rounded-2xl border border-[#073b70]/10 bg-white p-6 sm:p-8">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#073b70]/50">
                  Wishlist
                </p>

                <h2 className="mt-2 font-serif text-3xl font-bold">
                  Saved Items
                </h2>

                <div className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">

                  {savedItems.map((item) => (
                    <NavLink
                      key={item.name}
                      to="/Shop"
                      className="group"
                    >
                      <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#edf7ff]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>

                      <h3 className="mt-3 font-serif font-bold">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm font-bold text-[#0064b8]">
                        {item.price}
                      </p>
                    </NavLink>
                  ))}

                </div>

              </div>
            )}

            {/* ADDRESSES */}
            {activeTab === 'Addresses' && (
              <div className="rounded-2xl border border-[#073b70]/10 bg-white p-6 sm:p-8">

                <div className="flex items-center justify-between gap-4">

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#073b70]/50">
                      Delivery
                    </p>

                    <h2 className="mt-2 font-serif text-3xl font-bold">
                      Saved Addresses
                    </h2>
                  </div>

                  <button
                    type="button"
                    className="rounded-md bg-[#073b70] px-4 py-3 text-xs font-bold text-white"
                  >
                    + Add Address
                  </button>

                </div>

                <div className="mt-7 rounded-xl border border-[#073b70]/10 bg-[#f8f5ef] p-5">

                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold">
                      Default Address
                    </p>

                    <span className="rounded-full bg-[#edf7ff] px-3 py-1 text-[9px] font-bold">
                      Default
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-[#31506c]">
                    Sarah Johnson
                    <br />
                    123 Thrift Lane
                    <br />
                    Abuja, Nigeria
                    <br />
                    +234 801 234 5678
                  </p>

                  <button
                    type="button"
                    className="mt-5 text-xs font-bold underline underline-offset-4"
                  >
                    Edit Address
                  </button>

                </div>

              </div>
            )}

            {/* SETTINGS */}
            {activeTab === 'Settings' && (
              <div className="rounded-2xl border border-[#073b70]/10 bg-white p-6 sm:p-8">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#073b70]/50">
                  Account
                </p>

                <h2 className="mt-2 font-serif text-3xl font-bold">
                  Settings
                </h2>

                <div className="mt-7 divide-y divide-[#073b70]/10">

                  <label className="flex items-center justify-between gap-5 py-5">
                    <div>
                      <p className="text-sm font-semibold">
                        Email Notifications
                      </p>

                      <p className="mt-1 text-xs text-[#31506c]">
                        Receive updates about new arrivals and special offers.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 accent-[#073b70]"
                    />
                  </label>

                  <label className="flex items-center justify-between gap-5 py-5">
                    <div>
                      <p className="text-sm font-semibold">
                        Order Updates
                      </p>

                      <p className="mt-1 text-xs text-[#31506c]">
                        Get notified when your order status changes.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 accent-[#073b70]"
                    />
                  </label>

                </div>

              </div>
            )}

          </div>

        </div>

      </section>

    </main>
  )
}

export default Profile