import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/jovial_thrift_full.png'

const Footer = () => {
  return (
    <footer className="bg-[#073b70] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <NavLink to="/" className="inline-block">
              <div className="rounded-xl bg-[#f8f5ef] px-4 py-2">
                <img
                  src={logo}
                  alt="Jovial Thrift Hub"
                  className="h-14 w-auto object-contain"
                />
              </div>
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