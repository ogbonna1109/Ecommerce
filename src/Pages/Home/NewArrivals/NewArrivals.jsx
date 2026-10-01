import React from 'react'
import { NavLink } from 'react-router-dom'

const products = [
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
        name: 'Leather Bag',
        price: '$55',
        image: '/hero/hero3.jpeg',
    },
    {
        name: 'Vintage Cap',
        price: '$18',
        image: '/hero/hero2.jpeg',
    },
    {
        name: 'Denim Jacket',
        price: '$42',
        image: '/hero/hero1.jpeg',
    },
    {
        name: 'Sneakers',
        price: '$36',
        image: '/hero/hero3.jpeg',
    },
]

const NewArrivals = () => {
    return (
        <section className="bg-white px-5 py-20 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mb-10 flex items-end justify-between gap-6">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#073b70]/60">
                            Just In
                        </p>

                        <h2 className="font-serif text-4xl font-bold text-[#073b70] sm:text-5xl">
                            New Arrivals
                        </h2>

                        <p className="mt-3 text-[#31506c]">
                            Freshly curated pieces waiting for a new story.
                        </p>
                    </div>

                    <NavLink
                        to="/NewArrivals"
                        className="hidden text-sm font-bold uppercase tracking-wider text-[#073b70] underline underline-offset-8 sm:block"
                    >
                        View All →
                    </NavLink>
                </div>

                {/* Products */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
                    {products.map((product) => (
                        <article key={product.name} className="group">

                            {/* Image */}
                            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#edf7ff]">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />

                                <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#073b70] shadow-sm">
                                    New
                                </span>
                            </div>

                            {/* Details */}
                            <div className="pt-4">
                                <h3 className="font-serif text-base font-bold text-[#073b70]">
                                    {product.name}
                                </h3>

                                <p className="mt-1 text-sm font-semibold text-[#31506c]">
                                    {product.price}
                                </p>
                            </div>

                        </article>
                    ))}
                </div>

                {/* Mobile link */}
                <NavLink
                    to="/NewArrivals"
                    className="mt-10 block text-center text-sm font-bold uppercase tracking-wider text-[#073b70] underline underline-offset-8 sm:hidden"
                >
                    View All →
                </NavLink>

            </div>
        </section>
    )
}

export default NewArrivals