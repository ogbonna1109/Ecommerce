import React from 'react'
import { NavLink } from 'react-router-dom'

const ArrowIcon = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
    </svg>
)

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-[#f8f5ef]">

            {/* Decorative background shape */}
            <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#edf7ff] opacity-70 blur-3xl" />

            <div className="mx-auto grid min-h-[calc(100vh-120px)] max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-16">

                {/* =========================
            LEFT CONTENT
        ========================== */}
                <div className="relative z-10 max-w-xl">

                    {/* Small intro */}
                    <p className="mb-4 font-serif text-base italic text-[#073b70] sm:text-lg">
                        And yes...
                    </p>

                    {/* Main heading */}
                    <h1 className="font-serif text-5xl font-bold leading-[0.95] tracking-[-0.03em] text-[#073b70] sm:text-6xl lg:text-[74px]">

                        Jovial Thrift Hub

                        <br />

                        <span className="font-normal italic">
                            is coming back.
                        </span>

                    </h1>

                    {/* Description */}
                    <p className="mt-7 max-w-md text-base leading-7 text-[#31506c] sm:text-lg">
                        So consider this our little warm-up before the comeback.
                    </p>

                    {/* Navy brush-style badge */}
                    <div className="relative mt-8 inline-block">

                        <div className="absolute inset-0 -skew-x-6 rounded-[45%] bg-[#073b70]" />

                        <p className="relative px-7 py-3 font-serif text-sm font-semibold text-white sm:text-base">
                            Welcome to Denim Diaries. ♡
                        </p>

                    </div>

                    {/* Buttons */}
                    <div className="mt-9 flex flex-wrap items-center gap-4">

                        <NavLink
                            to="/Shop"
                            className="group flex items-center gap-3 rounded-full bg-[#073b70] px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#052d56]"
                        >
                            Shop Collection

                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                <ArrowIcon />
                            </span>
                        </NavLink>

                        <NavLink
                            to="/NewArrivals"
                            className="rounded-full border border-[#073b70] px-7 py-4 text-sm font-bold uppercase tracking-wider text-[#073b70] transition-all duration-300 hover:-translate-y-1 hover:bg-[#073b70] hover:text-white"
                        >
                            New Arrivals
                        </NavLink>

                    </div>

                    {/* Small decorative text */}
                    <div className="mt-12 hidden sm:block">
                        <p className="font-serif text-sm italic text-[#073b70]/60">
                            Timeless pieces. New stories. ♡
                        </p>
                    </div>

                </div>


                {/* =========================
            RIGHT IMAGE AREA
        ========================== */}
                <div className="relative mx-auto h-[500px] w-full max-w-xl sm:h-[580px]">

                    {/* Handwritten text */}
                    <div className="absolute right-2 top-0 z-20 rotate-[-6deg] sm:right-5">

                        <p className="font-serif text-base italic leading-5 text-[#073b70] sm:text-xl sm:leading-6">
                            Good Denim
                            <br />
                            Better Outfits. ♡
                        </p>

                    </div>


                    {/* Main image frame */}
                    <div className="absolute right-0 top-1/2 h-[410px] w-[82%] -translate-y-1/2 overflow-hidden rounded-[45%_45%_8%_8%] bg-[#dceaf2] shadow-[0_25px_60px_rgba(7,59,112,0.15)] sm:h-[490px]">

                        <img
                            src="/hero/hero1.jpeg"
                            alt="Jovial Thrift Hub fashion collection"
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />

                        {/* Image overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#073b70]/20 via-transparent to-transparent" />

                    </div>


                    {/* Floating product card */}
                    <div className="absolute bottom-8 left-0 z-30 w-44 overflow-hidden rounded-2xl bg-white shadow-[0_15px_40px_rgba(7,59,112,0.18)] sm:bottom-10 sm:w-52">

                        <div className="h-32 overflow-hidden sm:h-36">

                            <img
                                src="/hero/hero2.jpeg"
                                alt="Fresh thrift fashion"
                                className="h-full w-full object-cover"
                            />

                        </div>

                        <div className="p-4">

                            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#073b70]/50">
                                This week
                            </p>

                            <h3 className="mt-1 font-serif text-lg font-bold text-[#073b70]">
                                Fresh Drop
                            </h3>

                        </div>

                    </div>


                    {/* Small secondary floating image */}
                    <div className="absolute bottom-1 right-0 z-20 hidden h-28 w-24 overflow-hidden rounded-xl border-4 border-[#f8f5ef] shadow-lg sm:block">

                        <img
                            src="/hero/hero3.jpeg"
                            alt="Curated fashion piece"
                            className="h-full w-full object-cover"
                        />

                    </div>


                    {/* Decorative circle */}
                    <div className="absolute bottom-0 left-[35%] h-20 w-20 rounded-full border border-[#073b70]/20 sm:h-28 sm:w-28" />

                    {/* Decorative small circle */}
                    <div className="absolute left-[20%] top-28 h-3 w-3 rounded-full bg-[#073b70]" />

                    <div className="absolute left-[24%] top-36 h-2 w-2 rounded-full bg-[#073b70]/40" />

                </div>

            </div>


            {/* =========================
          SLIDER INDICATORS
      ========================== */}
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2">

                <span className="h-2 w-8 rounded-full bg-[#073b70]" />

                <span className="h-2 w-2 rounded-full bg-[#073b70]/25" />

                <span className="h-2 w-2 rounded-full bg-[#073b70]/25" />

            </div>

        </section>
    )
}

export default Hero