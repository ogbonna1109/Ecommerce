import React, { useState, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

const CrownIcon = ({ className = 'w-5 h-3.5 sm:w-6 sm:h-4 text-white' }) => (
  <svg
    className={className}
    viewBox="0 0 24 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M2 13.5h20v2H2v-2zm1-2.5l2.5-7 4.5 4.5 4-7 4 7 4.5-4.5 2.5 7H3z" />
    <circle cx="2" cy="3.5" r="1.3" />
    <circle cx="12" cy="1.5" r="1.5" />
    <circle cx="22" cy="3.5" r="1.3" />
    <circle cx="7.5" cy="8" r="0.9" />
    <circle cx="16.5" cy="8" r="0.9" />
  </svg>
)

const SearchIcon = () => (
  <svg
    width="19"
    height="19"
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
    width="19"
    height="19"
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
    width="19"
    height="19"
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
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </svg>
)

const CloseIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
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
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  // Auto-close mobile drawer on route change
  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  // Track window scroll for transparent to frosted glass transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Sync cart count
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

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/Shop?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header
      className={`w-full transition-all duration-300 ${
        isHome
          ? `fixed top-0 left-0 right-0 z-50 ${
              isScrolled
                ? 'bg-[#040914]/92 backdrop-blur-md border-b border-white/10 shadow-2xl py-0'
                : 'bg-transparent border-b border-transparent py-1 sm:py-2'
            }`
          : 'sticky top-0 z-50 bg-[#040914] text-white border-b border-white/10 shadow-lg'
      }`}
    >
      {/* OPTIONAL ANNOUNCEMENT BAR (only on non-home pages) */}
      {!isHome && (
        <div className="bg-[#0b1b36] border-b border-white/5 px-4 py-1.5 text-xs text-white/90">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <p className="tracking-wide text-[11px] sm:text-xs text-[#9bb7d4] truncate">
              {announcementText}
            </p>
            <div className="hidden items-center gap-4 sm:flex text-[11px] text-white/70 shrink-0">
              <span>Follow Us</span>
              <div className="flex items-center gap-3">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">TikTok</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN NAVIGATION BAR */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="flex h-18 sm:h-22 lg:h-24 items-center justify-between">
          {/* BRAND LOGO */}
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="shrink-0 flex flex-col items-center select-none group text-center"
            aria-label="Jovias Showroom Home"
          >
            <CrownIcon className="w-5 h-3.5 sm:w-6 sm:h-4 text-white mb-0.5 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-serif text-xl sm:text-2xl lg:text-[25px] font-bold tracking-tight text-white leading-none">
              Jovias
            </span>
            <span className="text-[7.5px] sm:text-[9px] font-semibold tracking-[0.3em] text-white/90 uppercase mt-0.5">
              SHOWROOM
            </span>
            <span className="hidden xs:inline-block text-[6.5px] sm:text-[8px] font-normal tracking-wide text-white/70 mt-0.5">
              Modern Style. Timeless You.
            </span>
          </NavLink>

          {/* DESKTOP NAVIGATION LINKS */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isLinkActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path)

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className="relative py-2 text-sm font-medium transition-colors duration-200"
                >
                  <span
                    className={`${
                      isLinkActive
                        ? 'text-[#1d68ff] font-semibold'
                        : 'text-white/85 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </span>

                  {isLinkActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full bg-[#1d68ff] shadow-[0_0_8px_rgba(29,104,255,0.8)]" />
                  )}
                </NavLink>
              )
            })}
          </div>

          {/* RIGHT ACTION ICONS */}
          <div className="flex items-center gap-2.5 sm:gap-4 md:gap-5 text-white">
            {/* Search Button */}
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 hover:text-[#1d68ff] transition-colors duration-200 cursor-pointer"
            >
              <SearchIcon />
            </button>

            {/* Wishlist Button */}
            <NavLink
              to="/Shop"
              aria-label="Wishlist"
              className="w-9 h-9 sm:w-10 sm:h-10 hidden sm:flex items-center justify-center rounded-full hover:bg-white/10 hover:text-[#1d68ff] transition-colors duration-200"
            >
              <HeartIcon />
            </NavLink>

            {/* User Profile */}
            <NavLink
              to="/Profile"
              aria-label="Profile"
              className="w-9 h-9 sm:w-10 sm:h-10 hidden sm:flex items-center justify-center rounded-full hover:bg-white/10 hover:text-[#1d68ff] transition-colors duration-200"
            >
              <UserIcon />
            </NavLink>

            {/* Cart with Blue Badge */}
            <NavLink
              to="/Cart"
              aria-label="Cart"
              className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 hover:text-[#1d68ff] transition-colors duration-200"
            >
              <CartIcon />
              <span className="absolute top-1 right-0.5 sm:right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#1d68ff] px-1 text-[9px] font-bold text-white shadow-[0_0_8px_rgba(29,104,255,0.7)]">
                {cartCount}
              </span>
            </NavLink>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 flex lg:hidden items-center justify-center rounded-full hover:bg-white/10 text-white hover:text-[#1d68ff] transition-colors"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* SEARCH BAR POPDOWN */}
        {searchOpen && (
          <form
            onSubmit={handleSearchSubmit}
            className="pb-4 pt-1 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 animate-fadeIn"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection, vintage denim, varsity..."
                autoFocus
                className="w-full bg-[#0a162b] border border-white/20 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#1d68ff] focus:ring-1 focus:ring-[#1d68ff]"
              />
            </div>
            <div className="flex items-center gap-2 justify-end">
              <button
                type="submit"
                className="rounded-full bg-[#1d68ff] hover:bg-[#1557db] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-all cursor-pointer"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-white/60 hover:text-white text-xs px-3 py-2 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* MOBILE MENU DRAWER (With max-height and smooth scrolling for high-zoom & small screens) */}
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#040914]/98 backdrop-blur-2xl px-4 py-5 lg:hidden rounded-b-2xl shadow-2xl max-h-[calc(100svh-5rem)] overflow-y-auto">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isLinkActive =
                  link.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(link.path)

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                      isLinkActive
                        ? 'bg-[#1d68ff]/15 text-[#1d68ff] font-semibold'
                        : 'text-white/80 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isLinkActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1d68ff]" />
                    )}
                  </NavLink>
                )
              })}

              <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-around text-white">
                <NavLink
                  to="/Profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-xs text-white/80 hover:text-white py-2 px-3"
                >
                  <UserIcon />
                  <span>Account</span>
                </NavLink>

                <NavLink
                  to="/Shop"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-xs text-white/80 hover:text-white py-2 px-3"
                >
                  <HeartIcon />
                  <span>Wishlist</span>
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