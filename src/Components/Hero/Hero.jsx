import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'

const ArrowIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
    </svg>
)

// Splits text into words that slide up one by one (text itself unchanged)
const Words = ({ text, start = 0 }) =>
    text.split(' ').map((w, i) => (
        <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] pr-[0.04em] align-top">
            <span className="hero-word inline-block" style={{ animationDelay: `${0.2 + (start + i) * 0.12}s` }}>
                {w}
            </span>
        </span>
    ))

const Hero = () => {
    const ref = useRef(null)

    // Mouse position -> CSS variables (-0.5 to 0.5) used for tilt + parallax
    const move = (e) => {
        const r = ref.current.getBoundingClientRect()
        ref.current.style.setProperty('--x', (e.clientX - r.left) / r.width - 0.5)
        ref.current.style.setProperty('--y', (e.clientY - r.top) / r.height - 0.5)
    }
    const reset = () => {
        ref.current.style.setProperty('--x', 0)
        ref.current.style.setProperty('--y', 0)
    }

    return (
        <section className="relative overflow-hidden bg-white">
            {/* ---------- ANIMATION STYLES (tweak speeds here) ---------- */}
            <style>{`
                .hero-word{animation:rise .9s cubic-bezier(.2,.8,.2,1) both}
                .hero-fade{animation:fadeUp .9s ease-out both}
                .hero-wipe{animation:wipe 1.4s .3s cubic-bezier(.7,0,.2,1) both}
                .hero-zoom{animation:zoomOut 2.4s .3s ease-out both}
                .hero-pulse{animation:pulse 5s ease-in-out infinite}
                .hero-float{animation:float 4s ease-in-out infinite}
                .hero-spin{animation:spin 24s linear infinite}
                .hero-blob{animation:drift 14s ease-in-out infinite alternate}
                .hero-sway{animation:sway 5s ease-in-out infinite}
                .hero-shine::after{content:"";position:absolute;inset:0;pointer-events:none;
                    background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.45) 50%,transparent 60%);
                    transform:translateX(-120%);animation:shine 6s 2.8s infinite}
                .hero-in-l{animation:inL .8s cubic-bezier(.2,.8,.2,1) both}
                .hero-in-r{animation:inR .8s cubic-bezier(.2,.8,.2,1) both}

                @media (hover:hover) and (prefers-reduced-motion:no-preference){
                    .hero-tilt{transform:perspective(900px) rotateY(calc(var(--x,0)*10deg)) rotateX(calc(var(--y,0)*-8deg));transition:transform .25s ease-out}
                    .hero-par{translate:calc(var(--x,0)*-28px) calc(var(--y,0)*-28px);transition:translate .25s ease-out}
                }

                @keyframes rise{from{transform:translateY(110%)}}
                @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}}
                @keyframes wipe{from{clip-path:inset(100% 0 0 0)}}
                @keyframes zoomOut{from{transform:scale(1.15)}}
                @keyframes pulse{50%{transform:scale(1.04);opacity:.75}}
                @keyframes float{50%{transform:translateY(-14px)}}
                @keyframes spin{to{transform:rotate(360deg)}}
                @keyframes drift{to{transform:translate(50px,40px) scale(1.15)}}
                @keyframes sway{50%{transform:rotate(3deg) translateY(-4px)}}
                @keyframes shine{40%,100%{transform:translateX(120%)}}
                @keyframes inL{from{opacity:0;transform:translateX(-40px)}}
                @keyframes inR{from{opacity:0;transform:translateX(40px)}}

                @media (prefers-reduced-motion:reduce){
                    *,*::after{animation:none!important;transition:none!important}
                }
            `}</style>

            {/* Decorative background blobs (white + blue) */}
            <div className="hero-blob pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#bfdbfe] opacity-60 blur-3xl" />
            <div className="hero-blob pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#eaf2ff] opacity-90 blur-3xl [animation-duration:18s]" />

            <div className="mx-auto grid min-h-[calc(100vh-120px)] max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-16">

                {/* =========================
                    LEFT CONTENT
                ========================== */}
                <div className="relative z-10 max-w-xl">

                    <p className="hero-fade mb-4 font-serif text-base italic text-[#073b70] sm:text-lg">
                        And yes...
                    </p>

                    <h1 className="font-serif text-5xl font-bold leading-[0.95] tracking-[-0.03em] text-[#073b70] sm:text-6xl lg:text-[74px]">
                        <Words text="Jovial Thrift Hub" />
                        <br />
                        <span className="font-normal italic">
                            <Words text="is coming back." start={3} />
                        </span>
                    </h1>

                    <p className="hero-fade mt-7 max-w-md text-base leading-7 text-[#31506c] sm:text-lg" style={{ animationDelay: '1.1s' }}>
                        So consider this our little warm-up before the comeback.
                    </p>

                    <div className="hero-fade relative mt-8 inline-block" style={{ animationDelay: '1.3s' }}>
                        <div className="absolute inset-0 -skew-x-6 rounded-[45%] bg-[#073b70]" />
                        <p className="relative px-7 py-3 font-serif text-sm font-semibold text-white sm:text-base">
                            Welcome to Denim Diaries. ♡
                        </p>
                    </div>

                    <div className="hero-fade mt-9 flex flex-wrap items-center gap-4" style={{ animationDelay: '1.5s' }}>
                        <NavLink
                            to="/Shop"
                            className="group flex items-center gap-3 rounded-full bg-[#073b70] px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#2563eb] hover:shadow-[0_14px_30px_rgba(37,99,235,0.35)]"
                        >
                            Shop Collection
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                <ArrowIcon />
                            </span>
                        </NavLink>

                        <NavLink
                            to="/NewArrivals"
                            className="rounded-full border border-[#073b70] px-7 py-4 text-sm font-bold uppercase tracking-wider text-[#073b70] transition-all duration-300 hover:-translate-y-1 hover:bg-[#073b70] hover:text-white hover:shadow-[0_14px_30px_rgba(37,99,235,0.35)]"
                        >
                            New Arrivals
                        </NavLink>
                    </div>

                    <div className="hero-fade mt-12 hidden sm:block" style={{ animationDelay: '1.7s' }}>
                        <p className="font-serif text-sm italic text-[#073b70]/60">
                            Timeless pieces. New stories. ♡
                        </p>
                    </div>
                </div>


                {/* =========================
                    RIGHT IMAGE AREA
                ========================== */}
                <div
                    ref={ref}
                    onMouseMove={move}
                    onMouseLeave={reset}
                    className="relative mx-auto h-[500px] w-full max-w-xl sm:h-[580px]"
                >

                    {/* Handwritten text */}
                    <div className="hero-par absolute right-2 top-0 z-20 rotate-[-6deg] sm:right-5">
                        <p className="hero-sway font-serif text-base italic leading-5 text-[#073b70] sm:text-xl sm:leading-6">
                            Good Denim
                            <br />
                            Better Outfits. ♡
                        </p>
                    </div>

                    {/* Image block (positioned) */}
                    <div className="absolute right-0 top-1/2 h-[410px] w-[82%] -translate-y-1/2 sm:h-[490px]">

                        {/* Pulsing blue arch behind the image */}
                        <div className="hero-pulse absolute -inset-4 rounded-[45%_45%_8%_8%] bg-gradient-to-b from-[#dbeafe] to-[#93c5fd]" />

                        {/* 3D tilt wrapper */}
                        <div className="hero-tilt relative h-full w-full">
                            {/* Wipe-in frame + shimmer */}
                            <div className="hero-wipe hero-shine relative h-full w-full overflow-hidden rounded-[45%_45%_8%_8%] bg-[#dceaf2] shadow-[0_25px_60px_rgba(7,59,112,0.2)]">
                                <div className="hero-zoom h-full w-full">
                                    <img
                                        src="/hero/hero1.jpeg"
                                        alt="Jovial Thrift Hub fashion collection"
                                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#073b70]/20 via-transparent to-transparent" />
                            </div>
                        </div>
                    </div>

                    {/* Floating product card (enter -> parallax -> float) */}
                    <div className="hero-par absolute bottom-8 left-0 z-30 sm:bottom-10">
                        <div className="hero-in-l" style={{ animationDelay: '1.7s' }}>
                            <div className="hero-float w-44 overflow-hidden rounded-2xl bg-white shadow-[0_15px_40px_rgba(7,59,112,0.18)] transition-transform duration-300 hover:scale-105 sm:w-52">
                                <div className="h-32 overflow-hidden sm:h-36">
                                    <img src="/hero/hero2.jpeg" alt="Fresh thrift fashion" className="h-full w-full object-cover" />
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
                        </div>
                    </div>

                    {/* Small secondary floating image */}
                    <div className="hero-par absolute bottom-1 right-0 z-20 hidden sm:block">
                        <div className="hero-in-r" style={{ animationDelay: '2s' }}>
                            <div className="hero-float h-28 w-24 overflow-hidden rounded-xl border-4 border-white shadow-lg [animation-duration:5.5s] [animation-direction:reverse]">
                                <img src="/hero/hero3.jpeg" alt="Curated fashion piece" className="h-full w-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Decorative circle (slowly spinning dashed ring) */}
                    <div className="hero-spin absolute bottom-0 left-[35%] h-20 w-20 rounded-full border border-dashed border-[#2563eb]/50 sm:h-28 sm:w-28" />

                    {/* Decorative small dots */}
                    <div className="hero-pulse absolute left-[20%] top-28 h-3 w-3 rounded-full bg-[#2563eb]" />
                    <div className="hero-pulse absolute left-[24%] top-36 h-2 w-2 rounded-full bg-[#2563eb]/40 [animation-delay:1s]" />
                </div>
            </div>


            {/* SLIDER INDICATORS */}
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2">
                <span className="h-2 w-8 rounded-full bg-[#073b70]" />
                <span className="h-2 w-2 rounded-full bg-[#073b70]/25" />
                <span className="h-2 w-2 rounded-full bg-[#073b70]/25" />
            </div>
        </section>
    )
}

export default Hero
