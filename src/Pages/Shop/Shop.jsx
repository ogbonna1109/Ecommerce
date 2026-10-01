import React, { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'

const products = [
  {
    id: 1,
    name: 'Blue Midi Dress',
    price: 32,
    category: 'Dresses',
    image: '/hero/hero1.jpeg',
    condition: 'Very Good',
  },
  {
    id: 2,
    name: 'Classic Handbag',
    price: 48,
    category: 'Bags',
    image: '/hero/hero2.jpeg',
    condition: 'Excellent',
  },
  {
    id: 3,
    name: 'Leather Bag',
    price: 55,
    category: 'Bags',
    image: '/hero/hero3.jpeg',
    condition: 'Very Good',
  },
  {
    id: 4,
    name: 'Vintage Cap',
    price: 18,
    category: 'Accessories',
    image: '/hero/hero2.jpeg',
    condition: 'Excellent',
  },
  {
    id: 5,
    name: 'Denim Jacket',
    price: 42,
    category: 'Denim',
    image: '/hero/hero1.jpeg',
    condition: 'Very Good',
  },
  {
    id: 6,
    name: 'Sneakers',
    price: 36,
    category: 'Shoes',
    image: '/hero/hero3.jpeg',
    condition: 'Excellent',
  },
  {
    id: 7,
    name: 'Denim Skirt',
    price: 24,
    category: 'Denim',
    image: '/hero/hero1.jpeg',
    condition: 'Good',
  },
  {
    id: 8,
    name: 'Sunglasses',
    price: 22,
    category: 'Accessories',
    image: '/hero/hero2.jpeg',
    condition: 'Excellent',
  },
]

const categories = [
  'All',
  'Dresses',
  'Denim',
  'Bags',
  'Shoes',
  'Accessories',
]

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

const HeartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.8 8.6c0 5.5-8.8 10.2-8.8 10.2S3.2 14.1 3.2 8.6A4.6 4.6 0 0 1 12 6.1a4.6 4.6 0 0 1 8.8 2.5Z" />
  </svg>
)

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')
  const [wishlist, setWishlist] = useState([])

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (activeCategory !== 'All') {
      result = result.filter(
        (product) => product.category === activeCategory,
      )
    }

    if (search.trim()) {
      const query = search.toLowerCase()

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
    }

    if (sort === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    }

    if (sort === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    }

    if (sort === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [activeCategory, search, sort])

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#073b70]">

      {/* Header */}
      <section className="border-b border-[#073b70]/10 bg-white px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#073b70]/55">
                Jovial Thrift Hub
              </p>

              <h1 className="mt-2 font-serif text-5xl font-bold sm:text-6xl">
                Shop
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-[#31506c]">
                Discover carefully curated pre-loved pieces waiting for
                their next story.
              </p>
            </div>

            <p className="font-serif text-xl italic">
              Good Denim.
              <br />
              Better Outfits. ♡
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-20 border-b border-[#073b70]/10 bg-[#f8f5ef]/95 px-5 py-4 backdrop-blur sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-xs font-semibold transition ${activeCategory === category
                  ? 'border-[#073b70] bg-[#073b70] text-white'
                  : 'border-[#073b70]/15 bg-white text-[#31506c] hover:border-[#073b70]'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex gap-3">

            {/* Search */}
            <div className="flex flex-1 items-center gap-2 rounded-full border border-[#073b70]/15 bg-white px-4 py-2.5 sm:w-64 sm:flex-none">
              <SearchIcon />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search pieces..."
                className="min-w-0 flex-1 bg-transparent text-xs text-[#073b70] outline-none placeholder:text-[#31506c]/50"
              />
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-full border border-[#073b70]/15 bg-white px-4 py-2.5 text-xs text-[#073b70] outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">

        <div className="mb-7 flex items-center justify-between">
          <p className="text-sm text-[#31506c]">
            Showing{' '}
            <span className="font-semibold text-[#073b70]">
              {filteredProducts.length}
            </span>{' '}
            pieces
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">

            {filteredProducts.map((product) => (
              <article key={product.id} className="group">

                <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-[#073b70]/10 bg-white">

                  <NavLink to="/ProductDetails">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </NavLink>

                  {/* New Badge */}
                  {product.id <= 4 && (
                    <span className="absolute left-3 top-3 rounded-full bg-[#073b70] px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white">
                      New
                    </span>
                  )}

                  {/* Wishlist */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={`Wishlist ${product.name}`}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-105"
                  >
                    <span
                      className={
                        wishlist.includes(product.id)
                          ? 'text-[#073b70]'
                          : 'text-[#31506c]'
                      }
                    >
                      <HeartIcon />
                    </span>
                  </button>
                </div>

                <NavLink to="/ProductDetails">
                  <div className="pt-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#073b70]/50">
                      {product.category}
                    </p>

                    <h2 className="mt-1 font-serif text-lg font-bold text-[#073b70]">
                      {product.name}
                    </h2>

                    <div className="mt-2 flex items-center justify-between">
                      <p className="font-semibold text-[#0064b8]">
                        ${product.price}
                      </p>

                      <p className="text-[10px] text-[#31506c]/60">
                        {product.condition}
                      </p>
                    </div>
                  </div>
                </NavLink>

              </article>
            ))}

          </div>
        ) : (
          <div className="rounded-2xl border border-[#073b70]/10 bg-white px-6 py-20 text-center">
            <p className="font-serif text-2xl font-bold">
              No pieces found.
            </p>

            <p className="mt-2 text-sm text-[#31506c]">
              Try another search or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch('')
                setActiveCategory('All')
              }}
              className="mt-6 rounded-full bg-[#073b70] px-6 py-3 text-xs font-bold text-white"
            >
              Clear Filters
            </button>
          </div>
        )}

      </section>
    </main>
  )
}

export default Shop