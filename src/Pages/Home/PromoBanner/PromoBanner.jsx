import React from 'react'
import { NavLink } from 'react-router-dom'

const PromoBanner = () => {
    return (
        <section className="bg-[#f8f5ef] px-5 py-16 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#073b70]">
                <div className="grid items-center lg:grid-cols-2">

                    {/* Content */}
                    <div className="px-7 py-12 sm:px-12 sm:py-16 lg:px-16">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                            Our Philosophy
                        </p>

                        <h2 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
                            Quality Finds.
                            <br />
                            <span className="font-normal italic">
                                Real Stories.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-md text-base leading-7 text-white/75">
                            Every piece has a story. We carefully curate timeless
                            pre-loved fashion so you can give beautiful pieces a
                            whole new chapter.
                        </p>

                        <NavLink
                            to="/Shop"
                            className="mt-8 inline-flex rounded-full bg-white px-7 py-4 text-sm font-bold uppercase tracking-wider text-[#073b70] transition duration-300 hover:-translate-y-1 hover:bg-[#f8f5ef]"
                        >
                            Shop Now →
                        </NavLink>
                    </div>

                    {/* Image */}
                    <div className="relative min-h-[320px] lg:min-h-[420px]">
                        <img
                            src="/hero/hero3.jpeg"
                            alt="Jovial Thrift Hub curated fashion"
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-[#073b70]/20" />

                        <div className="absolute bottom-6 right-6 rounded-full bg-white/90 px-5 py-3 backdrop-blur-sm">
                            <p className="font-serif text-sm italic text-[#073b70]">
                                Timeless Pieces.
                                <br />
                                New Stories. ♡
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default PromoBanner