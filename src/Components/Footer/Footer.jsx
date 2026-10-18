import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#073b70] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <NavLink to="/" className="inline-flex flex-col items-start group select-none">
              <svg className="w-6 h-4 text-white mb-1 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 16" fill="currentColor">
                <path d="M2 13.5h20v2H2v-2zm1-2.5l2.5-7 4.5 4.5 4-7 4 7 4.5-4.5 2.5 7H3z" />
                <circle cx="2" cy="3.5" r="1.3" />
                <circle cx="12" cy="1.5" r="1.5" />
                <circle cx="22" cy="3.5" r="1.3" />
              </svg>
              <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
                Jovias
              </span>
              <span className="text-[9px] font-semibold tracking-[0.34em] text-white/90 uppercase mt-0.5">
                SHOWROOM
              </span>
              <span className="text-[8px] font-normal tracking-wide text-white/60 mt-0.5">
                Modern Style. Timeless You.
              </span>
            </NavLink>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/70">
              Curated pre-loved fashion for people who believe great style
              deserves a second story.
            </p>

            <p className="mt-5 font-serif text-lg italic text-white">
              Timeless pieces. New stories. ♡
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold">
              Quick Links
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-white/70">
              <NavLink
                to="/"
                className="transition hover:text-white"
              >
                Home
              </NavLink>

              <NavLink
                to="/Shop"
                className="transition hover:text-white"
              >
                Shop
              </NavLink>

              <NavLink
                to="/NewArrivals"
                className="transition hover:text-white"
              >
                New Arrivals
              </NavLink>

              <NavLink
                to="/Categories"
                className="transition hover:text-white"
              >
                Categories
              </NavLink>

              <NavLink
                to="/About"
                className="transition hover:text-white"
              >
                About Us
              </NavLink>

              <NavLink
                to="/Contact"
                className="transition hover:text-white"
              >
                Contact
              </NavLink>
            </div>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-serif text-lg font-bold">
              Need Help?
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-white/70">
              <a href="#" className="transition hover:text-white">
                Size Guide
              </a>

              <a href="#" className="transition hover:text-white">
                Delivery Information
              </a>

              <a href="#" className="transition hover:text-white">
                Returns & Exchanges
              </a>

              <a href="#" className="transition hover:text-white">
                FAQs
              </a>

              <NavLink
                to="/Contact"
                className="transition hover:text-white"
              >
                Get in Touch
              </NavLink>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/15 pt-7">
          <div className="flex flex-col gap-5 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © {new Date().getFullYear()} Jovial Thrift Hub. All rights reserved.
            </p>

            <div className="flex items-center gap-5">
              <a
                href="#"
                aria-label="Instagram"
                className="transition hover:text-white"
              >
                Instagram
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="transition hover:text-white"
              >
                Facebook
              </a>

              <a
                href="#"
                aria-label="TikTok"
                className="transition hover:text-white"
              >
                TikTok
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer