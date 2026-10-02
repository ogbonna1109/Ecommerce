import React, { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

const categories = [
  'All',
  'Women',
  'Men',
  'Denim',
  'Dresses',
  'Tops',
  'Bottoms',
  'Bags',
  'Shoes',
  'Accessories',
  'Statement Pieces',
]

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const priceRanges = [
  '$0 – $25',
  '$26 – $50',
  '$51 – $75',
  '$76 – $100',
  '$101+',
]

const conditions = [
  'New with tags',
  'Like new',
  'Good',
  'Fair',
]

const colors = [
  '#073b70',
  '#111111',
  '#a9c5dc',
  '#dedbd4',
  '#d8b98e',
  '#f1dfc4',
  '#f2a6a6',
  '#ed3656',
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

const ChevronDown = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const TruckIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h11v11H3z" />
    <path d="M14 10h4l3 3v4h-7z" />
    <circle cx="7" cy="19" r="2" />
    <circle cx="18" cy="19" r="2" />
  </svg>
)

const LeafIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 4C11 4 5 7 5 14c0 3 2 5 5 5 7 0 10-6 10-15Z" />
    <path d="M4 20c3-5 7-8 12-10" />
  </svg>
)

const ShieldIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3 20 6v5c0 5-3.2 8.5-8 10-4.8-1.5-8-5-8-10V6l8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

const StarIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
  </svg>
)

const Shop = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [category, setCategory] = useState('All')
  const [selectedSizes, setSelectedSizes] = useState([])
  const [priceRange, setPriceRange] = useState('')
  const [selectedConditions, setSelectedConditions] = useState([])
  const [selectedColor, setSelectedColor] = useState(null)
  const [sort, setSort] = useState('newest')
  const [wishlist, setWishlist] = useState([])
  const [mobileFilters, setMobileFilters] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError('')

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase products error:', error)
        setError(error.message || 'Unable to load products.')
        setProducts([])
      } else {
        setProducts(data || [])
      }

      setLoading(false)
    }

    fetchProducts()
  }, [])

  const toggleSize = (size) => {
    setSelectedSizes((current) =>
      current.includes(size)
        ? current.filter((item) => item !== size)
        : [...current, size]
    )
  }

  const toggleCondition = (condition) => {
    setSelectedConditions((current) =>
      current.includes(condition)
        ? current.filter((item) => item !== condition)
        : [...current, condition]
    )
  }

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )
  }

  const clearFilters = () => {
    setCategory('All')
    setSelectedSizes([])
    setPriceRange('')
    setSelectedConditions([])
    setSelectedColor(null)
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (category !== 'All') {
      result = result.filter(
        (product) => product.category === category
      )
    }

    if (priceRange) {
      result = result.filter((product) => {
        const price = Number(product.price)

        if (priceRange === '$0 – $25') {
          return price <= 25
        }

        if (priceRange === '$26 – $50') {
          return price >= 26 && price <= 50
        }

        if (priceRange === '$51 – $75') {
          return price >= 51 && price <= 75
        }

        if (priceRange === '$76 – $100') {
          return price >= 76 && price <= 100
        }

        return price >= 101
      })
    }

    if (sort === 'price-low') {
      result.sort(
        (a, b) => Number(a.price) - Number(b.price)
      )
    }

    if (sort === 'price-high') {
      result.sort(
        (a, b) => Number(b.price) - Number(a.price)
      )
    }

    if (sort === 'name') {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    }

    return result
  }, [products, category, priceRange, sort])

  return (
    <main className="bg-[#f8f5ef] text-[#073b70]">

      {/* SHOP HERO */}
      <section className="relative overflow-hidden border-b border-[#073b70]/10 bg-[#edf0ed]">
        <div className="absolute inset-0">
          <img
            src="/hero/hero1.jpeg"
            alt=""
            className="h-full w-full object-cover opacity-25"
          />

          <div className="absolute inset-0 bg-[#f8f5ef]/70" />
        </div>

        <div className="relative mx-auto flex min-h-[210px] max-w-7xl items-center px-5 py-12 sm:px-8 lg:px-10">
          <div>
            <p className="font-serif text-3xl italic sm:text-4xl">
              Shop Our
            </p>

            <h1 className="font-serif text-5xl font-bold leading-none sm:text-6xl">
              Premium Thrift Collection
            </h1>

            <p className="mt-4 text-base text-[#31506c] sm:text-lg">
              Unique styles. Great quality. Timeless pieces.
            </p>
          </div>

          <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 rotate-[-5deg] lg:block">
            <p className="font-serif text-2xl italic leading-7">
              Good Denim
              <br />
              Better
              <br />
              Outfits ♡
            </p>
          </div>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
        <div className="flex items-center gap-3 text-xs text-[#31506c]">
          <NavLink
            to="/"
            className="hover:text-[#073b70]"
          >
            Home
          </NavLink>

          <span>›</span>

          <span className="font-semibold text-[#073b70]">
            Shop
          </span>
        </div>
      </div>

      {/* MAIN SHOP */}
      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[290px_1fr]">

          {/* FILTERS */}
          <aside
            className={`${mobileFilters ? 'block' : 'hidden'
              } h-fit rounded-lg border border-[#073b70]/10 bg-white p-5 lg:block`}
          >
            <div className="flex items-center justify-between border-b border-[#073b70]/10 pb-3">
              <h2 className="font-serif text-xl font-bold">
                Filters
              </h2>

              <button
                type="button"
                onClick={clearFilters}
                className="text-[10px] font-semibold text-[#0064b8]"
              >
                Clear All
              </button>
            </div>

            {/* CATEGORY */}
            <div className="border-b border-[#073b70]/10 py-5">
              <h3 className="text-sm font-bold">
                Category
              </h3>

              <div className="mt-3 space-y-2">
                {categories.map((item) => (
                  <label
                    key={item}
                    className="flex cursor-pointer items-center gap-2 text-xs text-[#31506c]"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={category === item}
                      onChange={() => setCategory(item)}
                      className="accent-[#073b70]"
                    />

                    {item}
                  </label>
                ))}
              </div>
            </div>

            {/* SIZE */}
            <div className="border-b border-[#073b70]/10 py-5">
              <h3 className="text-sm font-bold">
                Size
              </h3>

              <div className="mt-3 space-y-2">
                {sizes.map((size) => (
                  <label
                    key={size}
                    className="flex cursor-pointer items-center gap-2 text-xs text-[#31506c]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSizes.includes(size)}
                      onChange={() => toggleSize(size)}
                      className="accent-[#073b70]"
                    />

                    {size}
                  </label>
                ))}
              </div>
            </div>

            {/* PRICE */}
            <div className="border-b border-[#073b70]/10 py-5">
              <h3 className="text-sm font-bold">
                Price
              </h3>

              <div className="mt-3 space-y-2">
                {priceRanges.map((range) => (
                  <label
                    key={range}
                    className="flex cursor-pointer items-center gap-2 text-xs text-[#31506c]"
                  >
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === range}
                      onChange={() => setPriceRange(range)}
                      className="accent-[#073b70]"
                    />

                    {range}
                  </label>
                ))}
              </div>
            </div>

            {/* COLOR */}
            <div className="border-b border-[#073b70]/10 py-5">
              <h3 className="text-sm font-bold">
                Color
              </h3>

              <div className="mt-4 flex flex-wrap gap-3">
                {colors.map((color, index) => (
                  <button
                    key={color}
                    type="button"
                    aria-label={`Color ${index + 1}`}
                    onClick={() =>
                      setSelectedColor(
                        selectedColor === color
                          ? null
                          : color
                      )
                    }
                    className={`h-5 w-5 rounded-full border-2 p-0.5 ${selectedColor === color
                      ? 'border-[#073b70]'
                      : 'border-transparent'
                      }`}
                  >
                    <span
                      className="block h-full w-full rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* CONDITION */}
            <div className="py-5">
              <h3 className="text-sm font-bold">
                Condition
              </h3>

              <div className="mt-3 space-y-2">
                {conditions.map((condition) => (
                  <label
                    key={condition}
                    className="flex cursor-pointer items-center gap-2 text-xs text-[#31506c]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedConditions.includes(
                        condition
                      )}
                      onChange={() =>
                        toggleCondition(condition)
                      }
                      className="accent-[#073b70]"
                    />

                    {condition}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileFilters(false)}
              className="mt-2 w-full rounded-md bg-[#073b70] py-3 text-xs font-bold text-white"
            >
              ⚙ Apply Filters
            </button>
          </aside>

          {/* PRODUCTS */}
          <div>

            {/* PRODUCT HEADER */}
            <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="font-serif text-3xl font-bold">
                  All Products
                  <sup className="ml-1 text-xs font-normal text-[#31506c]">
                    ({filteredProducts.length})
                  </sup>
                </h2>

                <p className="mt-1 text-sm text-[#31506c]">
                  Curated thrift finds for every style.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setMobileFilters(!mobileFilters)
                  }
                  className="rounded-md border border-[#073b70]/15 bg-white px-4 py-2 text-xs font-semibold lg:hidden"
                >
                  Filters
                </button>

                <label className="flex items-center gap-2 rounded-md border border-[#073b70]/15 bg-white px-3 py-2 text-xs">
                  <span>Sort by:</span>

                  <select
                    value={sort}
                    onChange={(event) =>
                      setSort(event.target.value)
                    }
                    className="bg-transparent font-semibold outline-none"
                  >
                    <option value="newest">
                      Newest
                    </option>

                    <option value="price-low">
                      Price: Low
                    </option>

                    <option value="price-high">
                      Price: High
                    </option>

                    <option value="name">
                      Name
                    </option>
                  </select>

                  <ChevronDown />
                </label>
              </div>
            </div>

            {/* LOADING */}
            {loading && (
              <div className="rounded-lg border border-[#073b70]/10 bg-white py-16 text-center">
                <p className="font-serif text-xl italic text-[#073b70]">
                  Loading our latest finds...
                </p>

                <p className="mt-2 text-sm text-[#31506c]">
                  Just a moment.
                </p>
              </div>
            )}

            {/* ERROR */}
            {!loading && error && (
              <div className="rounded-lg border border-red-200 bg-white p-8 text-center">
                <p className="font-serif text-xl font-bold text-[#073b70]">
                  Something went wrong.
                </p>

                <p className="mt-2 text-sm text-red-600">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-5 rounded-full bg-[#073b70] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* EMPTY */}
            {!loading &&
              !error &&
              filteredProducts.length === 0 && (
                <div className="rounded-lg border border-[#073b70]/10 bg-white py-16 text-center">
                  <p className="font-serif text-2xl font-bold">
                    No pieces found.
                  </p>

                  <p className="mt-2 text-sm text-[#31506c]">
                    Try changing your filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 rounded-full bg-[#073b70] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

            {/* GRID */}
            {!loading &&
              !error &&
              filteredProducts.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <article
                      key={product.id}
                      className="group overflow-hidden rounded-lg border border-[#073b70]/10 bg-white"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#edf0ed]">

                        <NavLink
                          to={`/ProductDetails?id=${product.id}`}
                        >
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </NavLink>

                        <span className="absolute left-2 top-2 rounded-full bg-[#073b70] px-2.5 py-1 text-[8px] font-bold uppercase text-white">
                          New
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            toggleWishlist(product.id)
                          }
                          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ${wishlist.includes(product.id)
                            ? 'text-red-500'
                            : 'text-[#073b70]'
                            }`}
                          aria-label="Add to wishlist"
                        >
                          <HeartIcon />
                        </button>
                      </div>

                      <NavLink
                        to={`/ProductDetails?id=${product.id}`}
                      >
                        <div className="p-3">
                          <h3 className="text-xs font-medium text-[#073b70] sm:text-sm">
                            {product.name}
                          </h3>

                          <p className="mt-1 text-sm font-bold text-[#0064b8]">
                            ${Number(product.price).toFixed(2)}
                          </p>
                        </div>
                      </NavLink>
                    </article>
                  ))}
                </div>
              )}

            {/* PAGINATION */}
            {!loading &&
              !error &&
              filteredProducts.length > 0 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#073b70]/10 bg-white"
                  >
                    ‹
                  </button>

                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      type="button"
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs ${page === 1
                        ? 'bg-[#073b70] text-white'
                        : 'bg-white text-[#073b70]'
                        }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#073b70]/10 bg-white"
                  >
                    ›
                  </button>
                </div>
              )}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-[#073b70] px-5 py-7 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">

          <div className="flex items-center justify-center gap-4 border-b border-white/15 px-4 py-5 text-center lg:border-b-0 lg:border-r">
            <LeafIcon />

            <p className="text-xs leading-5">
              Pre-Loved
              <br />
              With Care
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 border-b border-white/15 px-4 py-5 text-center lg:border-b-0 lg:border-r">
            <ShieldIcon />

            <p className="text-xs leading-5">
              Verified
              <br />
              Authenticity
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 px-4 py-5 text-center lg:border-r">
            <TruckIcon />

            <p className="text-xs leading-5">
              Secure
              <br />
              Checkout
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 px-4 py-5 text-center">
            <StarIcon />

            <p className="text-xs leading-5">
              Easy
              <br />
              Returns
            </p>
          </div>

        </div>
      </section>

    </main>
  )
}

export default Shop