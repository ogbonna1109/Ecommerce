import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

const ArrowIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
    </svg>
)

const slides = [
    {
        eyebrow: 'And yes...', title: 'Jovial Thrift Hub', italic: 'is coming back.',
        description: 'So consider this our little warm-up before the comeback.',
        badge: 'Welcome to Denim Diaries. ♡', note: 'Good Denim', note2: 'Better Outfits. ♡',
        image: '/hero/hero1.jpeg', card: '/hero/hero2.jpeg', mini: '/hero/hero3.jpeg',
        cardLabel: 'This week', cardTitle: 'Fresh Drop', primary: 'Shop Collection', secondary: 'New Arrivals'
    },
    {
        eyebrow: 'Denim days...', title: 'Good denim.', italic: 'Better outfits.',
        description: 'From classic fits to modern cuts — find the denim pieces that move with you.',
        badge: 'The Denim Edit. ♡', note: 'Style', note2: 'Has No Season. ♡',
        image: '/hero/hero2.jpeg', card: '/hero/hero3.jpeg', mini: '/hero/hero1.jpeg',
        cardLabel: 'Denim edit', cardTitle: 'Classic. Versatile.', primary: 'Shop Denim', secondary: 'View Collection'
    },
    {
        eyebrow: 'Fresh finds...', title: 'Pieces worth', italic: 'wearing twice.',
        description: 'Curated thrift pieces, easy silhouettes and unexpected finds for your next story.',
        badge: 'Fresh Stories. ♡', note: 'Thrifted', note2: 'Styled Your Way. ♡',
        image: '/hero/hero3.jpeg', card: '/hero/hero1.jpeg', mini: '/hero/hero2.jpeg',
        cardLabel: 'Just in', cardTitle: 'Fresh Finds', primary: 'Explore Finds', secondary: 'New Arrivals'
    }
]

const Words = ({ text, slide }) => text.split(' ').map((word, i) => (
    <span key={`${slide}-${word}-${i}`} className="mr-[.22em] inline-block overflow-hidden pb-[.12em] pr-[.04em] align-top">
        <span className="hero-word inline-block" style={{ animationDelay: `${.08 + i * .08}s` }}>{word}</span>
    </span>
))

const Hero = () => {
    const [active, setActive] = useState(0)
    const [paused, setPaused] = useState(false)
    const [direction, setDirection] = useState(1)
    const ref = useRef(null)
    const touchStart = useRef(null)
    const slide = slides[active]

    const go = (nextIndex, dir = 1) => {
        setDirection(dir)
        setActive(nextIndex)
    }
    const next = () => {
        setDirection(1)
        setActive(prevActive => (prevActive + 1) % slides.length)
    }
    const prev = () => {
        setDirection(-1)
        setActive(prevActive => (prevActive - 1 + slides.length) % slides.length)
    }

    useEffect(() => {
        if (paused) return
        const timer = setInterval(() => {
            setDirection(1)
            setActive(prevActive => (prevActive + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [paused])

    const move = (e) => {
        if (!ref.current) return
        const r = ref.current.getBoundingClientRect()
        ref.current.style.setProperty('--x', (e.clientX - r.left) / r.width - .5)
        ref.current.style.setProperty('--y', (e.clientY - r.top) / r.height - .5)
    }
    const reset = () => {
        if (!ref.current) return
        ref.current.style.setProperty('--x', 0)
        ref.current.style.setProperty('--y', 0)
    }

    const touchDown = e => { touchStart.current = e.touches[0].clientX }
    const touchUp = e => {
        if (touchStart.current == null) return
        const distance = e.changedTouches[0].clientX - touchStart.current
        if (Math.abs(distance) > 50) distance < 0 ? next() : prev()
        touchStart.current = null
    }

    return (
        <section
            className="hero-slider relative overflow-hidden bg-[#fbfaf7]"
            aria-label="Jovial Thrift Hub featured collections"
            onTouchStart={touchDown} onTouchEnd={touchUp}
        >
            <style>{`
        .hero-slider{--navy:#073b70;--x:0;--y:0}
        .hero-word{animation:heroWord .75s cubic-bezier(.2,.8,.2,1) both}
        .hero-copy{animation:heroCopy .75s cubic-bezier(.2,.8,.2,1) both}
        .hero-image{animation:heroImage .95s cubic-bezier(.16,.72,.18,1) both}
        .hero-image img{animation:heroBreath 7s ease-in-out .8s infinite}
        .hero-card-left{animation:cardLeft .8s cubic-bezier(.2,.8,.2,1) .35s both}
        .hero-card-right{animation:cardRight .8s cubic-bezier(.2,.8,.2,1) .5s both}
        .hero-float{animation:float 4.8s ease-in-out 1.1s infinite}
        .hero-float-reverse{animation:floatReverse 5.6s ease-in-out 1.1s infinite}
        .hero-ring{animation:ring 22s linear infinite}
        .hero-blob{animation:blob 15s ease-in-out infinite alternate}
        .hero-progress{animation:progress 5s linear both}
        .hero-main-tilt{transform:perspective(1100px) rotateY(calc(var(--x)*4deg)) rotateX(calc(var(--y)*-3deg));transition:transform .35s cubic-bezier(.2,.8,.2,1)}
        .hero-near{transform:translate(calc(var(--x)*-13px),calc(var(--y)*-13px));transition:transform .35s ease-out}
        .hero-far{transform:translate(calc(var(--x)*8px),calc(var(--y)*8px));transition:transform .35s ease-out}
        .hero-next{animation-name:imageNext}.hero-prev{animation-name:imagePrev}
        @keyframes heroWord{from{opacity:0;transform:translateY(110%)}to{opacity:1;transform:none}}
        @keyframes heroCopy{from{opacity:0;transform:translateX(-28px) translateY(10px)}to{opacity:1;transform:none}}
        @keyframes imageNext{from{opacity:0;transform:translateX(60px) scale(.95)}to{opacity:1;transform:none}}
        @keyframes imagePrev{from{opacity:0;transform:translateX(-60px) scale(.95)}to{opacity:1;transform:none}}
        @keyframes heroBreath{0%,100%{transform:scale(1)}50%{transform:scale(1.025)}}
        @keyframes cardLeft{from{opacity:0;transform:translate(-35px,22px) rotate(-5deg)}to{opacity:1;transform:none}}
        @keyframes cardRight{from{opacity:0;transform:translate(35px,20px) rotate(5deg)}to{opacity:1;transform:none}}
        @keyframes float{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-8px) rotate(.8deg)}}
        @keyframes floatReverse{0%,100%{transform:translateY(0) rotate(1deg)}50%{transform:translateY(7px) rotate(-1deg)}}
        @keyframes ring{to{transform:rotate(360deg)}}
        @keyframes blob{to{transform:translate(45px,25px) scale(1.12)}}
        @keyframes progress{from{width:0}to{width:100%}}
        @media (prefers-reduced-motion:reduce){.hero-slider *,.hero-slider *::before,.hero-slider *::after{animation:none!important;transition:none!important}}
      `}</style>

            <div className="hero-blob pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#dbeafe] opacity-70 blur-3xl" />
            <div className="hero-blob pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#edf4ff] opacity-90 blur-3xl" />

            <div className="relative z-10 mx-auto grid min-h-[calc(100vh-120px)] max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-10 lg:py-14">
                <div key={`copy-${active}`} className="relative z-20 max-w-xl">
                    <p className="hero-copy mb-4 font-serif text-base italic text-[#073b70] sm:text-lg" style={{ animationDelay: '.05s' }}>{slide.eyebrow}</p>
                    <h1 className="font-serif text-5xl font-bold leading-[.94] tracking-[-.035em] text-[#073b70] sm:text-6xl lg:text-[72px]">
                        <Words text={slide.title} slide={active} /><br />
                        <span className="font-normal italic"><Words text={slide.italic} slide={`i${active}`} /></span>
                    </h1>
                    <p className="hero-copy mt-7 max-w-md text-base leading-7 text-[#31506c] sm:text-lg" style={{ animationDelay: '.42s' }}>{slide.description}</p>
                    <div className="hero-copy relative mt-8 inline-block" style={{ animationDelay: '.55s' }}>
                        <div className="absolute inset-0 -skew-x-6 rounded-[45%] bg-[#073b70]" />
                        <p className="relative px-7 py-3 font-serif text-sm font-semibold text-white sm:text-base">{slide.badge}</p>
                    </div>
                    <div className="hero-copy mt-9 flex flex-wrap items-center gap-4" style={{ animationDelay: '.68s' }}>
                        <NavLink to="/Shop" className="group flex items-center gap-3 rounded-full bg-[#073b70] px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#2563eb] hover:shadow-[0_14px_30px_rgba(37,99,235,.28)]">
                            {slide.primary}<span className="transition-transform duration-300 group-hover:translate-x-1"><ArrowIcon /></span>
                        </NavLink>
                        <NavLink to="/NewArrivals" className="rounded-full border border-[#073b70] px-7 py-4 text-sm font-bold uppercase tracking-wider text-[#073b70] transition-all duration-300 hover:-translate-y-1 hover:bg-[#073b70] hover:text-white">{slide.secondary}</NavLink>
                    </div>
                    <p className="hero-copy mt-12 hidden font-serif text-sm italic text-[#073b70]/60 sm:block" style={{ animationDelay: '.82s' }}>Timeless pieces. New stories. ♡</p>
                </div>

                <div ref={ref} onMouseMove={move} onMouseLeave={reset} className="relative mx-auto h-[480px] w-full max-w-xl sm:h-[570px]">
                    <div className="hero-far absolute right-2 top-0 z-30 rotate-[-6deg] sm:right-5">
                        <p key={`note-${active}`} className="hero-copy font-serif text-base italic leading-5 text-[#073b70] sm:text-xl sm:leading-6">{slide.note}<br />{slide.note2}</p>
                    </div>

                    <div className="absolute right-0 top-1/2 h-[390px] w-[82%] -translate-y-1/2 sm:h-[490px]">
                        <div className="hero-far absolute -inset-4 rounded-[45%_45%_9%_9%] bg-gradient-to-b from-[#dbeafe] to-[#93c5fd] opacity-90" />
                        <div className="hero-ring absolute -bottom-10 left-[28%] z-0 h-28 w-28 rounded-full border border-dashed border-[#2563eb]/35" />
                        <div className="hero-main-tilt relative z-10 h-full w-full">
                            <div key={`${active}-${direction}`} className={`hero-image hero-${direction === 1 ? 'next' : 'prev'} relative h-full w-full overflow-hidden rounded-[45%_45%_8%_8%] bg-[#dceaf2] shadow-[0_25px_65px_rgba(7,59,112,.17)]`}>
                                <img src={slide.image} alt={`${slide.title} ${slide.italic}`} className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]" />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#073b70]/20 via-transparent to-transparent" />
                            </div>
                        </div>
                    </div>

                    <div className="hero-near absolute bottom-8 left-0 z-30 sm:bottom-10">
                        <div key={`left-${active}`} className="hero-card-left">
                            <div className="hero-float w-44 overflow-hidden rounded-2xl bg-white shadow-[0_18px_45px_rgba(7,59,112,.18)] transition-transform duration-300 hover:scale-[1.04] sm:w-52">
                                <div className="h-32 overflow-hidden sm:h-36"><img src={slide.card} alt={slide.cardTitle} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" /></div>
                                <div className="p-4"><p className="text-[9px] font-semibold uppercase tracking-[.2em] text-[#073b70]/50">{slide.cardLabel}</p><h3 className="mt-1 font-serif text-lg font-bold text-[#073b70]">{slide.cardTitle}</h3></div>
                            </div>
                        </div>
                    </div>

                    <div className="hero-near absolute bottom-1 right-0 z-30 hidden sm:block">
                        <div key={`right-${active}`} className="hero-card-right">
                            <div className="hero-float-reverse h-28 w-24 overflow-hidden rounded-xl border-4 border-white bg-white shadow-[0_12px_30px_rgba(7,59,112,.18)] transition-transform duration-300 hover:scale-105">
                                <img src={slide.mini} alt="Curated fashion piece" className="h-full w-full object-cover" />
                            </div>
                        </div>
                    </div>

                    <div className="hero-far absolute left-[20%] top-28 z-20 h-3 w-3 rounded-full bg-[#2563eb]" />
                    <div className="hero-far absolute left-[24%] top-36 z-20 h-2 w-2 rounded-full bg-[#2563eb]/35" />
                </div>
            </div>

            <div
                className="absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <button type="button" onClick={prev} aria-label="Previous slide" className="hidden h-9 w-9 items-center justify-center rounded-full border border-[#073b70]/15 bg-white/70 text-[#073b70] backdrop-blur sm:flex">←</button>
                <div className="flex items-center gap-3 rounded-full border border-[#073b70]/10 bg-white/70 px-3 py-2 backdrop-blur" role="tablist" aria-label="Hero slides">
                    {slides.map((item, index) => {
                        const activeDot = index === active
                        return <button key={item.title} type="button" role="tab" aria-selected={activeDot} aria-label={`Go to slide ${index + 1}`} onClick={() => go(index, index > active ? 1 : -1)} className="relative h-2 overflow-hidden rounded-full bg-[#073b70]/15 transition-all duration-500" style={{ width: activeDot ? 42 : 8 }}>{activeDot && !paused && <span className="hero-progress absolute inset-y-0 left-0 rounded-full bg-[#073b70]" />}{activeDot && paused && <span className="absolute inset-0 rounded-full bg-[#073b70]" />}</button>
                    })}
                </div>
                <button type="button" onClick={next} aria-label="Next slide" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#073b70]/15 bg-white/70 text-[#073b70] backdrop-blur">→</button>
            </div>

            <div className="absolute bottom-6 right-6 z-40 hidden font-serif text-xs italic text-[#073b70]/50 sm:block">{String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</div>
        </section>
    )
}

export default Hero
