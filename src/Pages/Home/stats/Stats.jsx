import React from 'react'

const stats = [
    {
        number: '12K+',
        label: 'Happy Customers',
    },
    {
        number: '3.5K+',
        label: 'Curated Pieces',
    },
    {
        number: '4.9★',
        label: 'Avg Rating',
    },
]

const Stats = () => {
    return (
        <section className="border-y border-[#073b70]/10 bg-white">
            <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-3">

                {stats.map((stat, index) => (
                    <div
                        key={stat.label}
                        className={`flex items-center justify-center gap-4 px-6 py-8 text-center sm:py-10 ${index !== 0 ? 'border-t border-[#073b70]/10 sm:border-l sm:border-t-0' : ''
                            }`}
                    >
                        <span className="font-serif text-3xl font-bold text-[#073b70] sm:text-4xl">
                            {stat.number}
                        </span>

                        <span className="text-sm text-[#31506c]">
                            {stat.label}
                        </span>
                    </div>
                ))}

            </div>
        </section>
    )
}

export default Stats