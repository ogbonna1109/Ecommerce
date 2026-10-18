import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import heroBg from '../../assets/Blue Varsity Duo Against Modern Architecture.png'

const slides = [
  {
    eyebrow: 'PREMIUM FASHION COLLECTION',
    titleMain: 'Style That',
    titleAccent: 'Speaks You',
    description:
      'Discover timeless fashion pieces that fit your lifestyle. Quality, comfort and style — all in one place.',
    primaryBtn: { text: 'Shop Now', link: '/Shop' },
    secondaryBtn: { text: 'Explore New Arrivals', link: '/NewArrivals' },
    badgeScript: {
      line1: 'Premium',
      line2: '— Looks',
      line3: 'Everyday',
    },
    image: heroBg,
  },
  {
    eyebrow: 'CURATED STREETWEAR EDIT',
    titleMain: 'Urban Edge',
    titleAccent: 'Refined Mood',
    description:
      'Elevate your wardrobe with contemporary streetwear essentials crafted for comfort, durability, and timeless confidence.',
    primaryBtn: { text: 'Explore Streetwear', link: '/Shop' },
    secondaryBtn: { text: 'View Lookbook', link: '/NewArrivals' },
    badgeScript: {
      line1: 'Signature',
      line2: '— Clean',
      line3: 'Aesthetic',
    },
    image: heroBg,
  },
  {
    eyebrow: 'AUTHENTIC DENIM STORIES',
    titleMain: 'Denim That',
    titleAccent: 'Defines You',
    description:
      'Hand-selected vintage denim and classic silhouettes reimagined for bold everyday styling and modern statements.',
    primaryBtn: { text: 'Shop Denim', link: '/Shop' },
    secondaryBtn: { text: 'Fresh Drops', link: '/NewArrivals' },
    badgeScript: {
      line1: 'Iconic',
      line2: '— Fits',
      line3: 'Everyday',
    },
    image: heroBg,
  },
  {
    eyebrow: 'EXCLUSIVE NEW ARRIVALS',
    titleMain: 'Bold Cuts',
    titleAccent: 'New Horizons',
    description:
      'Limited edition varsity pieces and signature showroom staples engineered to make an effortless impression.',
    primaryBtn: { text: 'Shop Collection', link: '/Shop' },
    secondaryBtn: { text: 'Discover More', link: '/Categories' },
    badgeScript: {
      line1: 'Timeless',
      line2: '— Vibe',
      line3: 'Showroom',
    },
    image: heroBg,
  },
]

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [animating, setAnimating] = useState(false)
  const touchStartX = useRef(null)

  const currentSlide = slides[activeIndex]

  const goToSlide = (idx) => {
    if (animating || idx === activeIndex) return
    setAnimating(true)
    setActiveIndex(idx)
    setTimeout(() => setAnimating(false), 500)
  }

  const nextSlide = () => {
    goToSlide((activeIndex + 1) % slides.length)
  }

  const prevSlide = () => {
    goToSlide((activeIndex - 1 + slides.length) % slides.length)
  }

  // Auto advance slides every 6 seconds unless hovered
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isPaused])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(diff) > 40) {
      if (diff > 0) prevSlide()
      else nextSlide()
    }
    touchStartX.current = null
  }

  return (
    <section
      aria-label="Jovias Showroom Hero Collection"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-[100svh] bg-[#050c18] text-white overflow-hidden flex flex-col justify-center"
    >
      {/* BACKGROUND IMAGE LAYER */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentSlide.image}
          alt="Jovias Showroom - Modern Style. Timeless You."
          className="w-full h-full object-cover object-[75%_center] sm:object-[68%_center] md:object-[62%_center] lg:object-[58%_center] xl:object-center select-none transition-transform duration-1000 ease-out"
          draggable="false"
        />

        {/* GRADIENT OVERLAYS */}
        {/* Mobile Full Dark Tint & Vertical Gradient for maximum text legibility on phones */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#040914]/95 via-[#050e1f]/85 to-[#040914]/95 sm:hidden" />

        {/* Desktop / Tablet Horizontal Gradient */}
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-[#040914] via-[#050e1f]/95 via-35% md:via-[#061226]/85 md:via-50% lg:via-[#061226]/60 lg:via-55% to-transparent" />

        {/* Top Vignette (for navbar contrast) */}
        <div className="absolute top-0 inset-x-0 h-36 sm:h-44 bg-gradient-to-b from-[#040914]/95 via-[#040914]/40 to-transparent pointer-events-none" />

        {/* Bottom Vignette (smooth blend to stats section) */}
        <div className="absolute bottom-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-t from-[#040914]/95 via-[#040914]/30 to-transparent pointer-events-none" />

        {/* Ambient radial blue glow behind headline */}
        <div
          className="absolute left-[10%] top-[45%] -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full pointer-events-none opacity-40 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(29, 104, 255, 0.35) 0%, rgba(7, 59, 112, 0.15) 50%, transparent 70%)',
          }}
        />
      </div>

      {/* CROWN + "J" MONOGRAM WATERMARK IN TOP RIGHT ARCH (Visible on desktop) */}
      <div
        className="absolute right-8 sm:right-16 md:right-24 lg:right-32 top-24 sm:top-28 lg:top-32 pointer-events-none select-none z-10 hidden md:block opacity-25 lg:opacity-30 transition-opacity duration-700"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center text-[#072d61] drop-shadow-sm">
          <svg className="w-14 h-9 lg:w-16 lg:h-10 mb-1" viewBox="0 0 24 16" fill="currentColor">
            <path d="M2 13.5h20v2H2v-2zm1-2.5l2.5-7 4.5 4.5 4-7 4 7 4.5-4.5 2.5 7H3z" />
            <circle cx="2" cy="3.5" r="1.3" />
            <circle cx="12" cy="1.5" r="1.5" />
            <circle cx="22" cy="3.5" r="1.3" />
          </svg>
          <span className="font-serif text-6xl lg:text-7xl font-bold leading-none tracking-tight">
            J
          </span>
        </div>
      </div>

      {/* RIGHT SIDE SCRIPT TEXT OVERLAY: "Premium — Looks Everyday" (Visible on desktop/large screens) */}
      <div
        className="absolute right-8 md:right-14 lg:right-20 xl:right-28 top-[48%] sm:top-[50%] -translate-y-1/2 pointer-events-none select-none z-20 text-left hidden md:block"
        aria-hidden="true"
      >
        <div className="font-script text-white text-3xl sm:text-4xl md:text-[40px] lg:text-[46px] leading-[1.05] tracking-wide -rotate-6 drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)] font-medium">
          <span className="block text-white/95">{currentSlide.badgeScript.line1}</span>
          <span className="block text-white/95 -ml-1 sm:-ml-2">
            {currentSlide.badgeScript.line2}
          </span>
          <span className="block text-white/95">{currentSlide.badgeScript.line3}</span>
        </div>
      </div>

      {/* SIDE CAROUSEL ARROWS (Hidden on mobile phones to avoid obscuring text, available on tablets & desktop) */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-black/40 hover:bg-black/65 border border-white/20 backdrop-blur-md items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1d68ff]"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-black/40 hover:bg-black/65 border border-white/20 backdrop-blur-md items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1d68ff]"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* MAIN HERO CONTENT (LEFT ALIGNED) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-14 pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 flex flex-col justify-center">
        <div className="max-w-xl lg:max-w-2xl">
          {/* EYEBROW WITH BLUE ACCENT LINE */}
          <div className="flex items-center gap-2.5 sm:gap-4 mb-3 sm:mb-5">
            <span className="text-[10px] sm:text-xs md:text-[13px] font-bold tracking-[0.2em] sm:tracking-[0.25em] text-white/90 uppercase font-sans">
              {currentSlide.eyebrow}
            </span>
            <span className="h-[2px] w-8 sm:w-14 bg-[#1d68ff] rounded-full inline-block shrink-0" />
          </div>

          {/* MAIN HEADLINE (Responsive typography: scales cleanly on small phones & zoom) */}
          <h1 className="font-serif text-[38px] xs:text-5xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[88px] font-bold leading-[1.04] tracking-[-0.025em] text-white break-words">
            <span className="block drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
              {currentSlide.titleMain}
            </span>
            <span className="block italic text-[#1d68ff] drop-shadow-[0_4px_30px_rgba(29,104,255,0.45)]">
              {currentSlide.titleAccent}
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-4 sm:mt-6 max-w-lg text-sm sm:text-base md:text-[17px] text-[#b4c8df] leading-relaxed font-sans font-normal">
            {currentSlide.description}
          </p>

          {/* ACTION BUTTONS (Stack nicely on narrow mobile, side-by-side on larger) */}
          <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            {/* Primary Pill Button: "Shop Now →" */}
            <NavLink
              to={currentSlide.primaryBtn.link}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#1d68ff] hover:bg-[#1557db] px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-[0_10px_25px_rgba(29,104,255,0.35)] hover:shadow-[0_14px_32px_rgba(29,104,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer"
            >
              <span>{currentSlide.primaryBtn.text}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 font-bold">
                →
              </span>
            </NavLink>

            {/* Secondary Ghost Button: "Explore New Arrivals" */}
            <NavLink
              to={currentSlide.secondaryBtn.link}
              className="inline-flex items-center justify-center rounded-full border border-white/40 hover:border-white bg-black/25 hover:bg-white/10 px-6 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer"
            >
              {currentSlide.secondaryBtn.text}
            </NavLink>
          </div>

          {/* SLIDE PAGINATION DOTS (BOTTOM LEFT) */}
          <div
            className="mt-8 sm:mt-11 flex items-center gap-2 sm:gap-2.5"
            role="tablist"
            aria-label="Featured Collections"
          >
            {slides.map((_, idx) => {
              const isActive = idx === activeIndex
              return (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => goToSlide(idx)}
                  className={`transition-all duration-300 cursor-pointer rounded-full h-2 focus:outline-none focus:ring-2 focus:ring-[#1d68ff] ${
                    isActive
                      ? 'w-7 sm:w-8 bg-[#1d68ff] shadow-[0_0_12px_rgba(29,104,255,0.8)]'
                      : 'w-2 bg-white/40 hover:bg-white/80'
                  }`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
