import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/jovial_thrift_full.png'
import { supabase } from '../../lib/supabaseClient'

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </svg>
)

const UserIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c.8-4 3.5-6 8-6s7.2 2 8 6" />
  </svg>
)

const HeartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.8 8.6c0 5.5-8.8 10.2-8.8 10.2S3.2 14.1 3.2 8.6A4.6 4.6 0 0 1 12 6.1a4.6 4.6 0 0 1 8.8 2.5Z" />
  </svg>
)

const CartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6" />
    <circle cx="10" cy="20" r="1" />
    <circle cx="18" cy="20" r="1" />
  </svg>
)

const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </svg>
)

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </svg>
)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/Shop' },
  { name: 'New Arrivals', path: '/NewArrivals' },
  { name: 'Categories', path: '/Categories' },
  { name: 'About', path: '/About' },
  { name: 'Contact', path: '/Contact' },
]

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [announcementText, setAnnouncementText] = useState('Free Shipping on Orders Over $50')

  useEffect(() => {
    const updateCount = () => {
      try {
        const rawData = localStorage.getItem('jovial_cart')
        if (!rawData) {
          setCartCount(0)
          return
        }
        const cart = JSON.parse(rawData)
        if (Array.isArray(cart)) {
          const total = cart.reduce(
            (sum, item) => sum + (Number(item.quantity) || 1),
            0,
          )
          setCartCount(total)
        } else {
          setCartCount(0)
        }
      } catch (err) {
        console.error('Failed to parse jovial_cart:', err)
        setCartCount(0)
      }
    }

    updateCount()
    window.addEventListener('storage', updateCount)
    window.addEventListener('cartUpdated', updateCount)

    const fetchAnnouncement = async () => {
      try {
        const { data, error } = await supabase
          .from('store_settings')
          .select('announcement')
          .limit(1)
          .maybeSingle()
        if (!error && data?.announcement) {
          setAnnouncementText(data.announcement)
        }
      } catch (err) {
        console.warn('NavBar announcement fetch notice:', err)
      }
    }
    fetchAnnouncement()

    return () => {
      window.removeEventListener('storage', updateCount)
      window.removeEventListener('cartUpdated', updateCount)
    }
  }, [])

  return (
    <header className="w-full bg-[#f8f5ef] text-[#073b70]">

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#073b70] px-4 py-2 text-xs text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">

          <p className="tracking-wide">
            {announcementText}
          </p>

          <div className="hidden items-center gap-4 sm:flex">
            <span>Follow Us</span>

            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="transition-opacity hover:opacity-70"
              >
                Instagram
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="transition-opacity hover:opacity-70"
              >
                Facebook
              </a>

              <a
                href="#"
                aria-label="TikTok"
                className="transition-opacity hover:opacity-70"
              >
                TikTok
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="border-b border-[#073b70]/10">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 lg:px-8">

          {/* LOGO */}
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="shrink-0"
          >
            <img
              src={logo}
              alt="Jovial Thrift Hub"
              className="h-16 w-auto object-contain"
            />
          </NavLink>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative py-2 text-sm font-medium transition-colors ${isActive
                    ? 'text-[#073b70]'
                    : 'text-[#31506c] hover:text-[#073b70]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}

                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-[#073b70]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden items-center gap-5 lg:flex">

            <button
              type="button"
              aria-label="Search"
              className="transition-transform hover:scale-110"
            >
              <SearchIcon />
            </button>

            <NavLink
              to="/Profile"
              aria-label="Profile"
              className="transition-transform hover:scale-110"
            >
              <UserIcon />
            </NavLink>

            <button
              type="button"
              aria-label="Wishlist"
              className="transition-transform hover:scale-110"
            >
              <HeartIcon />
            </button>

            <NavLink
              to="/Cart"
              aria-label="Cart"
              className="relative transition-transform hover:scale-110"
            >
              <CartIcon />

              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#073b70] px-1 text-[9px] font-bold text-white">
                {cartCount}
              </span>
            </NavLink>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="border-t border-[#073b70]/10 bg-[#f8f5ef] px-5 py-6 lg:hidden">

            <div className="flex flex-col">

              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `border-b border-[#073b70]/10 py-4 text-sm font-medium ${isActive
                      ? 'text-[#073b70]'
                      : 'text-[#31506c]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="mt-5 flex items-center gap-6">

                <button
                  type="button"
                  aria-label="Search"
                >
                  <SearchIcon />
                </button>

                <NavLink
                  to="/Profile"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Profile"
                >
                  <UserIcon />
                </NavLink>

                <button
                  type="button"
                  aria-label="Wishlist"
                >
                  <HeartIcon />
                </button>

                <NavLink
                  to="/Cart"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Cart"
                  className="relative"
                >
                  <CartIcon />

                  <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#073b70] px-1 text-[9px] font-bold text-white">
                    {cartCount}
                  </span>
                </NavLink>

              </div>

            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default NavBar