import React from 'react'
import { NavLink } from 'react-router-dom'

const collections = [
    {
        title: 'Denim Essentials',
        image: '/clothes/DeepBlue.png',
        link: '/Categories',
    },
    {
        title: 'Vintage Bags',
        image: '/bags/lady-bag-design.webp',
        link: '/Categories',
    },
    {
        title: 'Caps & Accessories',
        image: '/hats/face-cap.webp',
        link: '/Categories',
    },
    {
        title: 'Statement Pieces',
        image: '/sportswear/sportwear1.webp',
        link: '/Categories',
    },
]

const FeaturedCollections = () => {
    return (
        <section className="bg-[#f8f5ef] px-5 py-20 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-7xl">

                <div className="mb-10 flex items-end justify-between gap-6">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#073b70]/60">
                            Explore
                        </p>

                        <h2 className="font-serif text-4xl font-bold text-[#073b70] sm:text-5xl">
                            Featured Collections
                        </h2>

                        <p className="mt-3 max-w-lg text-[#31506c]">
                            Curated pieces for every kind of mood.
                        </p>
                    </div>

                    <NavLink
                        to="/Categories"
                        className="hidden text-sm font-bold uppercase tracking-wider text-[#073b70] underline underline-offset-8 sm:block"
                    >
                        Shop All →
                    </NavLink>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {collections.map((collection) => (
                        <NavLink
                            key={collection.title}
                            to={collection.link}
                            className="group relative overflow-hidden rounded-2xl bg-[#dceaf2]"
                        >
                            <div className="aspect-[4/5] overflow-hidden">
                                <img
                                    src={collection.image}
                                    alt={collection.title}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#073b70]/90 to-transparent p-5 pt-16">
                                <h3 className="font-serif text-xl font-bold text-white">
                                    {collection.title}
                                </h3>

                                <span className="mt-2 inline-block text-sm text-white/80">
                                    Explore Collection →
                                </span>
                            </div>
                        </NavLink>
                    ))}
                </div>

                <NavLink
                    to="/Categories"
                    className="mt-8 block text-center text-sm font-bold uppercase tracking-wider text-[#073b70] underline underline-offset-8 sm:hidden"
                >
                    Shop All →
                </NavLink>

            </div>
        </section>
    )
}

export default FeaturedCollections