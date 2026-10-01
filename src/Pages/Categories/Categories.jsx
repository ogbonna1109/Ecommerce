import React from 'react'
import { NavLink } from 'react-router-dom'

const categories = [
  {
    name: 'Women',
    description: 'Everyday pieces with personality.',
    image: '/hero/hero1.jpeg',
  },
  {
    name: 'Men',
    description: 'Classic finds and effortless style.',
    image: '/hero/hero2.jpeg',
  },
  {
    name: 'Denim',
    description: 'Timeless denim for every wardrobe.',
    image: '/hero/hero3.jpeg',
  },
  {
    name: 'Dresses',
    description: 'Easy silhouettes and statement looks.',
    image: '/hero/hero1.jpeg',
  },
  {
    name: 'Tops',
    description: 'From everyday basics to unique finds.',
    image: '/hero/hero2.jpeg',
  },
  {
    name: 'Bottoms',
    description: 'Jeans, skirts and everything in between.',
    image: '/hero/hero3.jpeg',
  },
  {
    name: 'Bags',
    description: 'Vintage bags and everyday favourites.',
    image: '/hero/hero2.jpeg',
  },
  {
    name: 'Shoes',
    description: 'Unique footwear for every outfit.',
    image: '/hero/hero3.jpeg',
  },
  {
    name: 'Accessories',
    description: 'The little details that complete the look.',
    image: '/hero/hero1.jpeg',
  },
  {
    name: 'Statement Pieces',
    description: 'For when ordinary just will not do.',
    image: '/hero/hero3.jpeg',
  },
]

const Categories = () => {
  return (
    <main className="bg-[#f8f5ef] text-[#073b70]">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#073b70]/10 bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">

          <div>
            <p className="font-serif text-3xl italic sm:text-4xl">
              Find your style.
            </p>

            <h1 className="mt-2 font-serif text-5xl font-bold leading-[0.95] sm:text-6xl lg:text-7xl">
              Shop by
              <br />
              <span className="font-normal italic">
                Category.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-[#31506c] sm:text-base">
              Explore our carefully curated collections and discover
              pre-loved pieces that feel like they were made for you.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <NavLink
                to="/Shop"
                className="rounded-full bg-[#073b70] px-7 py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:-translate-y-1 hover:bg-[#052d56]"
              >
                Shop All Pieces →
              </NavLink>

              <NavLink
                to="/NewArrivals"
                className="rounded-full border border-[#073b70] px-7 py-4 text-xs font-bold uppercase tracking-wider text-[#073b70] transition hover:bg-[#073b70] hover:text-white"
              >
                New Arrivals
              </NavLink>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="relative mx-auto h-[360px] w-full max-w-lg sm:h-[430px]">

            <div className="absolute right-0 top-0 h-[82%] w-[72%] overflow-hidden rounded-[45%_45%_12%_12%] bg-[#dceaf2] shadow-xl">
              <img
                src="/hero/hero1.jpeg"
                alt="Jovial Thrift Hub collection"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute bottom-0 left-0 h-44 w-40 overflow-hidden rounded-2xl border-8 border-[#f8f5ef] bg-white shadow-lg sm:h-52 sm:w-48">
              <img
                src="/hero/hero2.jpeg"
                alt="Curated thrift fashion"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute bottom-10 right-0 rotate-[-6deg]">
              <p className="font-serif text-xl italic leading-6">
                Good Finds.
                <br />
                Great Stories. ♡
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8 lg:px-10">
        <div className="flex items-center gap-3 text-xs text-[#31506c]">
          <NavLink
            to="/"
            className="hover:text-[#073b70]"
          >
            Home
          </NavLink>

          <span>›</span>

          <span className="font-semibold text-[#073b70]">
            Categories
          </span>
        </div>
      </div>

      {/* CATEGORY INTRO */}
      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8 lg:px-10">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#073b70]/50">
              Explore Collections
            </p>

            <h2 className="mt-2 font-serif text-4xl font-bold sm:text-5xl">
              What are you looking for?
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-[#31506c]">
            From everyday essentials to one-of-a-kind statement pieces,
            discover your next favourite find.
          </p>

        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category, index) => (
            <NavLink
              key={category.name}
              to="/Shop"
              className={`group relative overflow-hidden rounded-2xl bg-[#dceaf2] ${index === 0 || index === 5
                ? 'sm:row-span-2'
                : ''
                }`}
            >

              <div
                className={`overflow-hidden ${index === 0 || index === 5
                  ? 'aspect-[4/5] sm:h-full'
                  : 'aspect-[4/3]'
                  }`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#073b70]/90 via-[#073b70]/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6">

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                  Explore
                </p>

                <h3 className="mt-1 font-serif text-2xl font-bold text-white sm:text-3xl">
                  {category.name}
                </h3>

                <p className="mt-2 max-w-xs text-xs leading-5 text-white/75">
                  {category.description}
                </p>

                <span className="mt-4 inline-block text-[10px] font-bold uppercase tracking-wider text-white">
                  Shop Collection →
                </span>

              </div>

            </NavLink>
          ))}

        </div>
      </section>

      {/* STATEMENT */}
      <section className="border-y border-[#073b70]/10 bg-white px-5 py-16 text-center sm:px-8 lg:px-10">

        <div className="mx-auto max-w-3xl">

          <p className="font-serif text-3xl italic sm:text-4xl">
            Every category has
          </p>

          <h2 className="mt-1 font-serif text-4xl font-bold sm:text-5xl">
            a story waiting for you.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#31506c]">
            Take your time. Browse around. Your next favourite piece might
            already have a story — it just needs you to continue it.
          </p>

          <NavLink
            to="/Shop"
            className="mt-7 inline-flex rounded-full bg-[#073b70] px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:-translate-y-1 hover:bg-[#052d56]"
          >
            Explore Everything →
          </NavLink>

        </div>

      </section>

    </main>
  )
}

export default Categories