import React from 'react'
import { NavLink } from 'react-router-dom'

const About = () => {
  return (
    <main className="bg-[#f8f5ef] text-[#073b70]">

      {/* HERO */}
      <section className="border-b border-[#073b70]/10 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="font-serif text-3xl italic sm:text-4xl">
            Our Story
          </p>

          <h1 className="mt-2 max-w-3xl font-serif text-5xl font-bold leading-[0.95] sm:text-6xl lg:text-7xl">
            The Heart Behind
            <br />
            <span className="font-normal italic">
              Jovial Thrift Hub
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[#31506c] sm:text-base">
            Style with meaning. Fashion with a second story.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

          {/* TEXT */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#073b70]/50">
              The Jovial Story
            </p>

            <h2 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl">
              Fashion that feels
              <br />
              <span className="font-normal italic">
                good to wear.
              </span>
            </h2>

            <div className="mt-7 space-y-5 text-sm leading-7 text-[#31506c]">
              <p>
                Jovial Thrift Hub was born from a simple belief — that great
                style never goes out of fashion. It just finds new hands.
              </p>

              <p>
                We carefully curate high-quality pre-loved clothing,
                accessories and unique fashion pieces so you can look good,
                feel good and make a positive impact.
              </p>

              <p>
                Every piece that enters our collection is selected with care.
                We look for character, quality and the kind of timeless style
                that deserves another chapter.
              </p>
            </div>

            <div className="mt-8">
              <p className="font-serif text-2xl italic leading-tight">
                Better style.
                <br />
                A brighter tomorrow. ♡
              </p>
            </div>

            <NavLink
              to="/Shop"
              className="mt-8 inline-flex rounded-full bg-[#073b70] px-7 py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:-translate-y-1 hover:bg-[#052d56]"
            >
              Shop Our Story →
            </NavLink>
          </div>

          {/* IMAGE COLLAGE */}
          <div className="relative min-h-[500px]">

            <div className="absolute left-0 top-12 h-[330px] w-[62%] overflow-hidden rounded-2xl bg-[#dceaf2] shadow-lg">
              <img
                src="/hero/hero1.jpeg"
                alt="Jovial Thrift Hub fashion"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute right-0 top-0 h-[230px] w-[43%] overflow-hidden rounded-2xl border-8 border-[#f8f5ef] bg-white shadow-lg">
              <img
                src="/hero/hero2.jpeg"
                alt="Jovial Thrift Hub accessories"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute bottom-0 right-[12%] h-[270px] w-[52%] overflow-hidden rounded-2xl border-8 border-[#f8f5ef] bg-white shadow-lg">
              <img
                src="/hero/hero3.jpeg"
                alt="Jovial Thrift Hub curated collection"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Decorative note */}
            <div className="absolute bottom-12 left-0 rotate-[-6deg]">
              <p className="font-serif text-xl italic leading-6">
                Quality.
                <br />
                Carefully
                <br />
                Curated.
                <br />
                Sustainably ♡
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-y border-[#073b70]/10 bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#073b70]/50">
              What We Believe
            </p>

            <h2 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
              More Than Just Clothes.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#31506c]">
              We're building a community around thoughtful fashion, unique
              finds and the belief that beautiful things deserve another life.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-[#edf7ff] p-7">
              <span className="text-3xl">♡</span>

              <h3 className="mt-5 font-serif text-xl font-bold">
                Pre-Loved With Care
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#31506c]">
                Every item is thoughtfully selected and prepared before it
                reaches you.
              </p>
            </div>

            <div className="rounded-2xl bg-[#edf7ff] p-7">
              <span className="text-3xl">✦</span>

              <h3 className="mt-5 font-serif text-xl font-bold">
                Unique Finds
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#31506c]">
                We love pieces with personality, character and a story of
                their own.
              </p>
            </div>

            <div className="rounded-2xl bg-[#edf7ff] p-7">
              <span className="text-3xl">♻</span>

              <h3 className="mt-5 font-serif text-xl font-bold">
                Sustainable Style
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#31506c]">
                Giving existing fashion a new life means making more
                thoughtful choices.
              </p>
            </div>

            <div className="rounded-2xl bg-[#edf7ff] p-7">
              <span className="text-3xl">♥</span>

              <h3 className="mt-5 font-serif text-xl font-bold">
                Community First
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#31506c]">
                Jovial is about people, personal style and the stories we
                create together.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="bg-[#073b70] px-5 py-20 text-center text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl">

          <p className="font-serif text-3xl italic sm:text-4xl">
            Modern Thrift.
          </p>

          <h2 className="mt-2 font-serif text-4xl font-bold sm:text-5xl lg:text-6xl">
            Timeless Style.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/70">
            Find something you love. Give it a new story. And make it yours.
          </p>

          <NavLink
            to="/Shop"
            className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#073b70] transition hover:-translate-y-1 hover:bg-[#f8f5ef]"
          >
            Explore The Collection →
          </NavLink>

        </div>
      </section>

    </main>
  )
}

export default About