import React from 'react'

const AdminDashboard = () => {
    return (
        <main className="min-h-screen bg-[#f8f5ef] px-6 py-10">
            <div className="mx-auto max-w-7xl">

                <div className="mb-10">
                    <p className="text-sm uppercase tracking-[0.25em] text-[#31506c]">
                        Jovial Thrift Hub
                    </p>

                    <h1 className="mt-2 text-4xl font-bold text-[#073b70]">
                        Admin Dashboard
                    </h1>

                    <p className="mt-2 text-[#31506c]">
                        Manage your products, inventory and showroom.
                    </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-2xl border border-[#d9e3ea] bg-white p-6">
                        <p className="text-sm text-[#31506c]">Products</p>
                        <p className="mt-2 text-3xl font-bold text-[#073b70]">0</p>
                    </div>

                    <div className="rounded-2xl border border-[#d9e3ea] bg-white p-6">
                        <p className="text-sm text-[#31506c]">Available</p>
                        <p className="mt-2 text-3xl font-bold text-[#073b70]">0</p>
                    </div>

                    <div className="rounded-2xl border border-[#d9e3ea] bg-white p-6">
                        <p className="text-sm text-[#31506c]">Low Stock</p>
                        <p className="mt-2 text-3xl font-bold text-[#073b70]">0</p>
                    </div>

                    <div className="rounded-2xl border border-[#d9e3ea] bg-white p-6">
                        <p className="text-sm text-[#31506c]">Orders</p>
                        <p className="mt-2 text-3xl font-bold text-[#073b70]">0</p>
                    </div>

                </div>

            </div>
        </main>
    )
}

export default AdminDashboard