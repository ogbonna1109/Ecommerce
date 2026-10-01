import React, { useState } from 'react'

const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
  </svg>
)

const LocationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" />
  </svg>
)

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log('Contact form:', form)

    setForm({
      name: '',
      email: '',
      message: '',
    })
  }

  return (
    <main className="bg-[#f8f5ef] text-[#073b70]">

      {/* HERO */}
      <section className="border-b border-[#073b70]/10 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <p className="font-serif text-3xl italic sm:text-4xl">
            We'd love to hear from you.
          </p>

          <h1 className="mt-2 font-serif text-5xl font-bold leading-none sm:text-6xl lg:text-7xl">
            Get in Touch
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[#31506c] sm:text-base">
            Have a question about an item, your order, sizing or anything
            else? Send us a message and we'll get back to you.
          </p>

        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

          {/* CONTACT INFO */}
          <div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#073b70]/50">
              Contact Us
            </p>

            <h2 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl">
              Good Style.
              <br />
              <span className="font-normal italic">
                Good People. ♡
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#31506c]">
              We're here to help. Reach out through any of the channels below
              and our team will be happy to assist.
            </p>

            <div className="mt-9 space-y-6">

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#edf7ff]">
                  <MailIcon />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#073b70]/55">
                    Email
                  </p>

                  <p className="mt-1 text-sm">
                    hello@jovialthrifthub.com
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#edf7ff]">
                  <PhoneIcon />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#073b70]/55">
                    Phone
                  </p>

                  <p className="mt-1 text-sm">
                    +234 801 234 5678
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#edf7ff]">
                  <LocationIcon />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#073b70]/55">
                    Location
                  </p>

                  <p className="mt-1 text-sm">
                    123 Thrift Lane
                    <br />
                    Nigeria
                  </p>
                </div>
              </div>

            </div>

            {/* SOCIAL */}
            <div className="mt-10 border-t border-[#073b70]/10 pt-7">

              <p className="text-xs font-bold uppercase tracking-wider text-[#073b70]/55">
                Follow Us
              </p>

              <div className="mt-4 flex gap-3">

                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#073b70]/15 bg-white transition hover:bg-[#073b70] hover:text-white"
                >
                  <InstagramIcon />
                </a>

                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#073b70]/15 bg-white text-xs font-bold transition hover:bg-[#073b70] hover:text-white"
                >
                  f
                </a>

                <a
                  href="#"
                  aria-label="TikTok"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#073b70]/15 bg-white text-xs font-bold transition hover:bg-[#073b70] hover:text-white"
                >
                  ♪
                </a>

              </div>

            </div>

          </div>

          {/* FORM */}
          <div className="relative overflow-hidden rounded-3xl bg-white p-7 shadow-sm sm:p-10">

            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full border border-[#073b70]/10" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full border border-[#073b70]/10" />

            <div className="relative">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#073b70]/50">
                Send a Message
              </p>

              <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
                Let's talk.
              </h2>

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                {/* NAME */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-bold"
                  >
                    Name*
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full rounded-md border border-[#073b70]/15 bg-[#f8f5ef] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#31506c]/45 focus:border-[#073b70]"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-bold"
                  >
                    Email*
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-md border border-[#073b70]/15 bg-[#f8f5ef] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#31506c]/45 focus:border-[#073b70]"
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-bold"
                  >
                    Message*
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows="6"
                    required
                    className="w-full resize-none rounded-md border border-[#073b70]/15 bg-[#f8f5ef] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#31506c]/45 focus:border-[#073b70]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-[#073b70] py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#052d56]"
                >
                  Send Message
                </button>

              </form>

            </div>
          </div>

        </div>
      </section>

      {/* FAQ / HELP */}
      <section className="border-y border-[#073b70]/10 bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#073b70]/50">
              Need Help?
            </p>

            <h2 className="mt-3 font-serif text-4xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">

            <details className="group rounded-xl border border-[#073b70]/10 bg-[#f8f5ef] p-5">
              <summary className="cursor-pointer list-none font-serif text-lg font-bold">
                How do I place an order?
              </summary>

              <p className="mt-3 text-sm leading-6 text-[#31506c]">
                Browse our collection, choose your preferred item and size,
                add it to your cart and continue to checkout.
              </p>
            </details>

            <details className="group rounded-xl border border-[#073b70]/10 bg-[#f8f5ef] p-5">
              <summary className="cursor-pointer list-none font-serif text-lg font-bold">
                Are your items pre-loved?
              </summary>

              <p className="mt-3 text-sm leading-6 text-[#31506c]">
                Yes. Our collection focuses on carefully selected pre-loved
                pieces and unique thrift finds.
              </p>
            </details>

            <details className="group rounded-xl border border-[#073b70]/10 bg-[#f8f5ef] p-5">
              <summary className="cursor-pointer list-none font-serif text-lg font-bold">
                How long does delivery take?
              </summary>

              <p className="mt-3 text-sm leading-6 text-[#31506c]">
                Delivery timing depends on your location and the item ordered.
                We'll provide the relevant details when confirming your order.
              </p>
            </details>

            <details className="group rounded-xl border border-[#073b70]/10 bg-[#f8f5ef] p-5">
              <summary className="cursor-pointer list-none font-serif text-lg font-bold">
                Can I return an item?
              </summary>

              <p className="mt-3 text-sm leading-6 text-[#31506c]">
                Return eligibility depends on the item's condition and our
                return policy. Contact us if you need help with a return.
              </p>
            </details>

          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="bg-[#073b70] px-5 py-16 text-center text-white sm:px-8">
        <p className="font-serif text-3xl italic">
          Good style starts with
        </p>

        <h2 className="mt-2 font-serif text-4xl font-bold sm:text-5xl">
          Good people. ♡
        </h2>
      </section>

    </main>
  )
}

export default Contact