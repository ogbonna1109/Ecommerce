import React, { useEffect, useMemo, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

const fallbackImages = [
    '/hero/hero1.jpeg',
    '/hero/hero2.jpeg',
    '/hero/hero3.jpeg',
]

const relatedProducts = [
    { name: 'Classic Handbag', price: '$48', image: '/hero/hero2.jpeg' },
    { name: 'Vintage Jacket', price: '$42', image: '/hero/hero1.jpeg' },
    { name: 'Leather Bag', price: '$55', image: '/hero/hero3.jpeg' },
    { name: 'Sneakers', price: '$36', image: '/hero/hero2.jpeg' },
    { name: 'Denim Skirt', price: '$24', image: '/hero/hero1.jpeg' },
    { name: 'Sunglasses', price: '$22', image: '/hero/hero3.jpeg' },
]

const StarIcon = ({ filled = true }) => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
    >
        <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    </svg>
)

const HeartIcon = () => (
    <svg
        width="21"
        height="21"
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

const CartIcon = () => (
    <svg
        width="21"
        height="21"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6" />
        <circle cx="10" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
    </svg>
)

const TruckIcon = () => (
    <svg
        width="28"
        height="28"
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

const ShieldIcon = () => (
    <svg
        width="28"
        height="28"
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

const ReturnIcon = () => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M4 7v5h5" />
        <path d="M20 17v-5h-5" />
        <path d="M6 12a6 6 0 0 1 10.5-4L20 12" />
        <path d="M18 12a6 6 0 0 1-10.5 4L4 12" />
    </svg>
)

const ProductDetails = () => {
    const [searchParams] = useSearchParams()

    const productId = searchParams.get('id')

    const [product, setProduct] = useState(null)
    const [sizes, setSizes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [activeImage, setActiveImage] = useState(0)
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedColor, setSelectedColor] = useState(0)
    const [activeTab, setActiveTab] = useState('Description')
    const [wishlist, setWishlist] = useState(false)

    const colors = ['#075eb5', '#202020', '#ded8ce']

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) {
                setError('No product was selected.')
                setLoading(false)
                return
            }

            setLoading(true)
            setError('')

            const { data: productData, error: productError } = await supabase
                .from('products')
                .select('*')
                .eq('id', productId)
                .eq('is_available', true)
                .single()

            if (productError) {
                console.error('Supabase product error:', productError)
                setError(productError.message || 'Unable to load this product.')
                setProduct(null)
                setLoading(false)
                return
            }

            setProduct(productData)

            const { data: sizeData, error: sizeError } = await supabase
                .from('product_sizes')
                .select('*')
                .eq('product_id', productId)
                .order('size', { ascending: true })

            if (sizeError) {
                console.error('Supabase product sizes error:', sizeError)
                setSizes([])
            } else {
                setSizes(sizeData || [])
            }

            setLoading(false)
        }

        fetchProduct()
    }, [productId])

    useEffect(() => {
        setActiveImage(0)
        setSelectedSize('')
        setWishlist(false)
    }, [productId])

    const productImages = useMemo(() => {
        if (!product?.image_url) {
            return fallbackImages
        }

        return [
            product.image_url,
            product.image_url,
            product.image_url,
        ]
    }, [product])

    const availableSizes = useMemo(() => {
        return sizes.filter((item) => item.stock > 0)
    }, [sizes])

    const totalStock = useMemo(() => {
        return sizes.reduce((total, item) => total + Number(item.stock || 0), 0)
    }, [sizes])

    const isInStock = totalStock > 0 || sizes.length === 0

    const handleAddToCart = () => {
        if (sizes.length > 0 && !selectedSize) {
            alert('Please select a size first.')
            return
        }

        const cartItem = {
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image_url,
            size: selectedSize || 'One Size',
            quantity: 1,
        }

        console.log('Add to cart:', cartItem)

        alert(`${product.name} has been added to your cart.`)
    }

    if (loading) {
        return (
            <main className="min-h-[70vh] bg-[#f8f5ef] px-5 py-20 text-center text-[#073b70]">
                <div className="mx-auto max-w-xl">
                    <p className="font-serif text-2xl font-bold">
                        Loading product...
                    </p>
                    <p className="mt-3 text-sm text-[#31506c]">
                        Please wait while we fetch the product details.
                    </p>
                </div>
            </main>
        )
    }

    if (error || !product) {
        return (
            <main className="min-h-[70vh] bg-[#f8f5ef] px-5 py-20 text-center text-[#073b70]">
                <div className="mx-auto max-w-xl rounded-xl border border-red-200 bg-white p-10">
                    <h1 className="font-serif text-3xl font-bold">
                        Something went wrong.
                    </h1>

                    <p className="mt-4 text-red-600">
                        {error || 'Product not found.'}
                    </p>

                    <NavLink
                        to="/Shop"
                        className="mt-7 inline-flex rounded-lg bg-[#073b70] px-6 py-3 text-sm font-bold text-white hover:bg-[#052d56]"
                    >
                        Back to Shop
                    </NavLink>
                </div>
            </main>
        )
    }

    return (
        <main className="bg-[#f8f5ef] text-[#073b70]">

            {/* Breadcrumb */}
            <div className="mx-auto max-w-7xl px-5 pb-5 pt-7 sm:px-8 lg:px-10">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#31506c]">
                    <NavLink to="/" className="hover:text-[#073b70]">
                        Home
                    </NavLink>

                    <span>›</span>

                    <NavLink to="/Shop" className="hover:text-[#073b70]">
                        Shop
                    </NavLink>

                    <span>›</span>

                    <span className="text-[#073b70]">
                        {product.name}
                    </span>
                </div>
            </div>

            {/* Product */}
            <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10">
                <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">

                    {/* Images */}
                    <div className="grid grid-cols-[64px_1fr] gap-4 sm:grid-cols-[78px_1fr]">

                        {/* Thumbnails */}
                        <div className="flex flex-col gap-3">
                            {productImages.map((image, index) => (
                                <button
                                    key={`${image}-${index}`}
                                    type="button"
                                    onClick={() => setActiveImage(index)}
                                    className={`aspect-[3/4] overflow-hidden rounded-lg border-2 bg-white transition ${activeImage === index
                                        ? 'border-[#073b70]'
                                        : 'border-transparent'
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.name} ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}

                            <button
                                type="button"
                                className="py-1 text-xl text-[#073b70]"
                                onClick={() =>
                                    setActiveImage(
                                        (activeImage + 1) % productImages.length,
                                    )
                                }
                            >
                                ↓
                            </button>
                        </div>

                        {/* Main Image */}
                        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#e8edf0]">
                            <img
                                src={productImages[activeImage]}
                                alt={product.name}
                                className="h-full w-full object-cover"
                            />

                            <span className="absolute left-4 top-4 rounded-full bg-[#073b70] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                                New
                            </span>

                            <button
                                type="button"
                                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl shadow-md"
                                onClick={() =>
                                    setActiveImage(
                                        (activeImage - 1 + productImages.length) %
                                        productImages.length,
                                    )
                                }
                            >
                                ‹
                            </button>

                            <button
                                type="button"
                                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl shadow-md"
                                onClick={() =>
                                    setActiveImage(
                                        (activeImage + 1) % productImages.length,
                                    )
                                }
                            >
                                ›
                            </button>
                        </div>
                    </div>

                    {/* Product Information */}
                    <div className="relative">

                        <div className="absolute -right-1 -top-12 hidden rotate-[-6deg] lg:block">
                            <p className="font-serif text-xl italic leading-6 text-[#073b70]">
                                Good Denim
                                <br />
                                Better Outfits ♡
                            </p>
                        </div>

                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0064b8]">
                            Jovial Thrift Hub
                        </p>

                        <h1 className="mt-2 font-serif text-4xl font-bold leading-tight sm:text-5xl">
                            {product.name}
                        </h1>

                        <div className="mt-3 flex flex-wrap items-center gap-4">
                            <span className="font-serif text-3xl font-bold">
                                ${Number(product.price).toFixed(2)}
                            </span>

                            <span className="text-lg text-[#31506c]/60 line-through">
                                ${(Number(product.price) * 1.5).toFixed(2)}
                            </span>

                            <span className="rounded-full bg-[#073b70] px-3 py-1 text-xs font-bold text-white">
                                New
                            </span>
                        </div>

                        {/* Rating */}
                        <div className="mt-5 flex items-center gap-3">
                            <div className="flex text-[#075eb5]">
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon filled={false} />
                            </div>

                            <span className="text-sm text-[#0064b8]">
                                4.8 (124 reviews)
                            </span>
                        </div>

                        {/* Stock */}
                        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                            <span
                                className={`flex items-center gap-2 ${isInStock
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                    }`}
                            >
                                <span
                                    className={`h-2.5 w-2.5 rounded-full ${isInStock
                                        ? 'bg-green-500'
                                        : 'bg-red-500'
                                        }`}
                                />

                                {isInStock ? 'In Stock' : 'Out of Stock'}
                            </span>

                            <span className="text-[#31506c]/50">|</span>

                            <span>Ships within 1–2 business days</span>
                        </div>

                        <p className="mt-6 max-w-xl text-sm leading-7 text-[#31506c]">
                            {product.description ||
                                'A unique pre-loved fashion find, carefully selected by Jovial Thrift Hub.'}
                        </p>

                        {/* Details */}
                        <div className="mt-6 space-y-3 border-b border-[#073b70]/10 pb-6 text-sm">
                            <p>
                                <strong>⚙</strong>
                                <span className="ml-3">
                                    Category: {product.category}
                                </span>
                            </p>

                            <p>
                                <strong>♙</strong>
                                <span className="ml-3">
                                    Fit: Carefully selected pre-loved piece
                                </span>
                            </p>

                            <p>
                                <strong>♧</strong>
                                <span className="ml-3">
                                    Condition: Very good (pre-loved)
                                </span>
                            </p>

                            <p>
                                <strong>▣</strong>
                                <span className="ml-3">
                                    Brand: Unbranded
                                </span>
                            </p>
                        </div>

                        {/* Color */}
                        <div className="mt-5">
                            <p className="text-sm font-semibold">
                                Color:{' '}
                                <span className="font-normal">Blue</span>
                            </p>

                            <div className="mt-3 flex gap-3">
                                {colors.map((color, index) => (
                                    <button
                                        key={color}
                                        type="button"
                                        aria-label={`Color ${index + 1}`}
                                        onClick={() => setSelectedColor(index)}
                                        className={`h-8 w-8 rounded-full border-2 p-1 ${selectedColor === index
                                            ? 'border-[#073b70]'
                                            : 'border-transparent'
                                            }`}
                                    >
                                        <span
                                            className="block h-full w-full rounded-full border border-black/10"
                                            style={{
                                                backgroundColor: color,
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className="mt-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold">
                                    Size:
                                </p>

                                <button
                                    type="button"
                                    className="text-xs font-medium underline underline-offset-4"
                                >
                                    ♧ &nbsp; Size Guide
                                </button>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-3">
                                {sizes.length === 0 ? (
                                    <button
                                        type="button"
                                        onClick={() => setSelectedSize('One Size')}
                                        className={`min-w-12 rounded-lg border px-4 py-2 text-sm transition ${selectedSize === 'One Size'
                                            ? 'border-[#073b70] bg-[#073b70] text-white'
                                            : 'border-[#073b70]/15 bg-white hover:border-[#073b70]'
                                            }`}
                                    >
                                        One Size
                                    </button>
                                ) : availableSizes.length === 0 ? (
                                    <p className="text-sm text-red-600">
                                        All sizes are currently out of stock.
                                    </p>
                                ) : (
                                    availableSizes.map((size) => (
                                        <button
                                            key={size.id}
                                            type="button"
                                            onClick={() =>
                                                setSelectedSize(size.size)
                                            }
                                            className={`min-w-12 rounded-lg border px-4 py-2 text-sm transition ${selectedSize === size.size
                                                ? 'border-[#073b70] bg-[#073b70] text-white'
                                                : 'border-[#073b70]/15 bg-white hover:border-[#073b70]'
                                                }`}
                                        >
                                            {size.size}
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-7 grid gap-3">
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                disabled={!isInStock}
                                className="flex items-center justify-center gap-3 rounded-lg bg-[#073b70] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#052d56] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <CartIcon />
                                {isInStock ? 'Add to Cart' : 'Out of Stock'}
                            </button>

                            <button
                                type="button"
                                onClick={() => setWishlist(!wishlist)}
                                className="flex items-center justify-center gap-3 rounded-lg border border-[#073b70] bg-white px-6 py-4 text-sm font-semibold transition hover:bg-[#edf7ff]"
                            >
                                <HeartIcon />
                                {wishlist
                                    ? 'Added to Wishlist'
                                    : 'Add to Wishlist'}
                            </button>
                        </div>

                        {/* Benefits */}
                        <div className="mt-7 grid grid-cols-3 border-t border-[#073b70]/10 pt-6">
                            <div className="flex flex-col items-center gap-2 border-r border-[#073b70]/10 text-center">
                                <TruckIcon />

                                <p className="text-[10px] leading-4">
                                    Free Shipping
                                    <br />
                                    on orders over $50
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-2 border-r border-[#073b70]/10 text-center">
                                <ShieldIcon />

                                <p className="text-[10px] leading-4">
                                    Secure
                                    <br />
                                    Checkout
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-2 text-center">
                                <ReturnIcon />

                                <p className="text-[10px] leading-4">
                                    Easy
                                    <br />
                                    Returns
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Tabs */}
            <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10">
                <div className="overflow-hidden rounded-xl border border-[#073b70]/10 bg-white">

                    <div className="flex overflow-x-auto border-b border-[#073b70]/10">
                        {[
                            'Description',
                            'Size & Fit',
                            'Shipping',
                            'Returns',
                            'Reviews (124)',
                        ].map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveTab(tab)}
                                className={`whitespace-nowrap px-5 py-5 text-xs font-semibold sm:px-7 ${activeTab === tab
                                    ? 'border-b-2 border-[#073b70] text-[#073b70]'
                                    : 'text-[#31506c] hover:text-[#073b70]'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="grid gap-10 px-6 py-8 sm:px-8 lg:grid-cols-[1fr_360px] lg:px-10">
                        <div>
                            <h2 className="font-serif text-2xl font-bold">
                                {activeTab}
                            </h2>

                            {activeTab === 'Description' && (
                                <>
                                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[#31506c]">
                                        {product.description ||
                                            'This carefully selected pre-loved piece is part of the Jovial Thrift Hub collection.'}
                                    </p>

                                    <h3 className="mt-7 font-serif text-lg font-bold">
                                        Key Features
                                    </h3>

                                    <ul className="mt-3 space-y-2 text-sm text-[#31506c]">
                                        <li>✓ Carefully curated pre-loved piece</li>
                                        <li>✓ Unique thrift find</li>
                                        <li>✓ Quality checked</li>
                                        <li>✓ Limited availability</li>
                                        <li>✓ Sustainable fashion choice</li>
                                    </ul>
                                </>
                            )}

                            {activeTab === 'Size & Fit' && (
                                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#31506c]">
                                    Available sizes are shown above based on
                                    current stock. Because these are curated
                                    thrift pieces, availability may be limited.
                                </p>
                            )}

                            {activeTab === 'Shipping' && (
                                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#31506c]">
                                    Orders are carefully prepared and shipped
                                    within 1–2 business days. Delivery times
                                    may vary depending on your location.
                                </p>
                            )}

                            {activeTab === 'Returns' && (
                                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#31506c]">
                                    Eligible items can be returned according to
                                    our returns policy. Items should remain in
                                    their original condition.
                                </p>
                            )}

                            {activeTab === 'Reviews (124)' && (
                                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#31506c]">
                                    Customers have rated this piece 4.8 out of
                                    5 based on 124 reviews.
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                            <div className="rounded-xl bg-[#edf7ff] p-5">
                                <p className="text-2xl">♧</p>

                                <h3 className="mt-2 font-serif font-bold">
                                    Pre-Loved
                                    <br />
                                    High Quality
                                </h3>
                            </div>

                            <div className="rounded-xl bg-[#edf7ff] p-5">
                                <p className="text-2xl">♻</p>

                                <h3 className="mt-2 font-serif font-bold">
                                    Sustainable
                                    <br />
                                    Fashion
                                </h3>
                            </div>

                            <div className="rounded-xl bg-[#edf7ff] p-5">
                                <p className="text-2xl">♡</p>

                                <h3 className="mt-2 font-serif font-bold">
                                    Unique
                                    <br />
                                    Finds
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="font-serif text-2xl font-bold sm:text-3xl">
                        You May Also Like
                    </h2>

                    <NavLink
                        to="/Shop"
                        className="text-xs font-semibold text-[#0064b8] sm:text-sm"
                    >
                        View All →
                    </NavLink>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {relatedProducts.map((relatedProduct) => (
                        <article
                            key={relatedProduct.name}
                            className="group"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-[#073b70]/10 bg-white">
                                <img
                                    src={relatedProduct.image}
                                    alt={relatedProduct.name}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />

                                <button
                                    type="button"
                                    aria-label={`Add ${relatedProduct.name} to wishlist`}
                                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0064b8] shadow-sm"
                                >
                                    ♡
                                </button>
                            </div>

                            <h3 className="mt-3 text-sm font-medium">
                                {relatedProduct.name}
                            </h3>

                            <p className="mt-1 font-semibold text-[#0064b8]">
                                {relatedProduct.price}
                            </p>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default ProductDetails