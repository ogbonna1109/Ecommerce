import React, { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'

const products = [
  {
    id: 1,
    name: 'Blue Midi Dress',
    price: 32,
    category: 'Dresses',
    image: '/hero/hero1.jpeg',
  },
  {
    id: 2,
    name: 'Classic Handbag',
    price: 48,
    category: 'Bags',
    image: '/hero/hero2.jpeg',
  },
  {
    id: 3,
    name: 'Leather Bag',
    price: 55,
    category: 'Bags',
    image: '/hero/hero3.jpeg',
  },
  {
    id: 4,
    name: 'Vintage Cap',
    price: 18,
    category: 'Accessories',
    image: '/hero/hero2.jpeg',
  },
  {
    id: 5,
    name: 'Denim Jacket',
    price: 42,
    category: 'Outerwear',
    image: '/hero/hero1.jpeg',
  },
  {
    id: 6,
    name: 'Striped Shirt',
    price: 24,
    category: 'Tops',
    image: '/hero/hero2.jpeg',
  },
  {
    id: 7,
    name: 'Sneakers',
    price: 36,
    category: 'Shoes',
    image: '/hero/hero3.jpeg',
  },
  {
    id: 8,
    name: 'Sunglasses',
    price: 22,
    category: 'Accessories',
    image: '/hero/hero3.jpeg',
  },
]

const categories = [
  'All',
  'Dresses',
  'Tops',
  'Outerwear',
  'Bags',
  'Shoes',
  'Accessories',
]

const HeartIcon = () => (
  <svg
    width="19"
    height="19"
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

const NewArrivals = () => {
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('newest')
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

    if (category !== 'All') {
      result = result.filter(
        (product) => product.category === category,
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
  }, [category, sort])

  return (
    <main className="bg-[#f8f5ef] text-[#073b70]">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#073b70]/10 bg-[#edf0ed]">
        <div className="absolute inset-0">
          <img
            src="/hero/hero3.jpeg"
            alt=""
            className="h-full w-full object-cover opacity-25"
          />

          <div className="absolute inset-0 bg-[#f8f5ef]/75" />
        </div>

        <div className="relative mx-auto grid min-h-[270px] max-w-7xl items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:px-10">

          <div>
            <p className="font-serif text-3xl italic sm:text-4xl">
              Fresh Finds
            </p>

            <h1 className="font-serif text-5xl font-bold leading-none sm:text-6xl lg:text-7xl">
              New Arrivals
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-6 text-[#31506c] sm:text-base">
              The latest pre-loved pieces, handpicked for you.
            </p>
          </div>

          <div className="relative hidden h-48 overflow-hidden rounded-2xl lg:block">
            <img
              src="/hero/hero1.jpeg"
              alt="New arrivals collection"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-[#073b70]/10" />
          </div>

          <div className="absolute bottom-5 right-6 rotate-[-5deg] lg:right-10">
            <p className="font-serif text-xl italic leading-6">
              Timeless
              <br />
              Pieces.
              <br />
              New Stories. ♡
            </p>
          </div>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
        <div className="flex items-center gap-3 text-xs text-[#31506c]">
          <NavLink to="/" className="hover:text-[#073b70]">
            Home
          </NavLink>

          <span>›</span>

          <span className="font-semibold text-[#073b70]">
            New Arrivals
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">
              Freshly Added
            </h2>

            <p className="mt-2 text-sm text-[#31506c]">
              Discover the newest pieces in our collection.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-md border border-[#073b70]/15 bg-white px-4 py-2.5 text-xs font-medium outline-none"
            >
              <option value="newest">Sort by: Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-9 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-xs font-semibold transition ${category === item
                ? 'border-[#073b70] bg-[#073b70] text-white'
                : 'border-[#073b70]/15 bg-white text-[#31506c] hover:border-[#073b70]'
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">

          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-[#073b70]/10 bg-white">

                <NavLink to="/ProductDetails">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </NavLink>

                {/* NEW */}
                <span className="absolute left-3 top-3 rounded-full bg-[#073b70] px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white">
                  New
                </span>

                {/* Wishlist */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={`Add ${product.name} to wishlist`}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#073b70] shadow-sm transition hover:scale-105"
                >
                  <HeartIcon />
                </button>
              </div>

              <NavLink to="/ProductDetails">
                <div className="pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#073b70]/50">
                    {product.category}
                  </p>

                  <h3 className="mt-1 font-serif text-lg font-bold">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-sm font-bold text-[#0064b8]">
                    ${product.price}
                  </p>
                </div>
              </NavLink>
            </article>
          ))}

        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="border-y border-[#073b70]/10 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 text-center sm:flex-row sm:text-left">

          <div>
            <p className="font-serif text-2xl italic sm:text-3xl">
              Every piece has a past.
            </p>

            <h2 className="mt-1 font-serif text-3xl font-bold sm:text-4xl">
              Give it a new story.
            </h2>
          </div>

          <NavLink
            to="/Shop"
            className="rounded-full bg-[#073b70] px-7 py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:-translate-y-1 hover:bg-[#052d56]"
          >
            Explore All Pieces →
          </NavLink>

        </div>
      </section>

    </main>
  )
}

export default NewArrivals