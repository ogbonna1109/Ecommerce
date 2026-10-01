import React from 'react'

const trustItems = [
    {
        icon: '♡',
        title: 'Pre-Loved With Care',
        description: 'Every piece is carefully selected and prepared.',
    },
    {
        icon: '✓',
        title: 'Verified Authenticity',
        description: 'Quality and authenticity checked before listing.',
    },
    {
        icon: '▣',
        title: 'Secure Checkout',
        description: 'Shop confidently with a simple, secure process.',
    },
    {
        icon: '↺',
        title: 'Easy Returns',
        description: 'A straightforward return experience when eligible.',
    },
]

const TrustSection = () => {
    return (
        <section className="border-y border-[#073b70]/10 bg-white px-5 py-14 sm:px-8 lg:px-10">
            <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

                {trustItems.map((item, index) => (
                    <div
                        key={item.title}
                        className={`px-6 py-5 text-center ${index !== 0
                            ? 'border-t border-[#073b70]/10 sm:border-l sm:border-t-0'
                            : ''
                            }`}
                    >
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#edf7ff] font-serif text-xl text-[#073b70]">
                            {item.icon}
                        </div>

                        <h3 className="mt-4 font-serif text-lg font-bold text-[#073b70]">
                            {item.title}
                        </h3>

                        <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#31506c]">
                            {item.description}
                        </p>
                    </div>
                ))}

            </div>
        </section>
    )
}

export default TrustSection