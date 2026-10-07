import React, { useEffect, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

const StarIcon = ({ filled = true }) => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
    >
        <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
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
    const [relatedProducts, setRelatedProducts] = useState([])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [activeImage, setActiveImage] = useState(0)
    const [selectedSize, setSelectedSize] = useState('')
    const [activeTab, setActiveTab] = useState('Description')
    const [wishlist, setWishlist] = useState(false)
    const [addedToCart, setAddedToCart] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) {
                setError('Product not found.')
                setLoading(false)
                return
            }

            setLoading(true)
            setError('')
            setSelectedSize('')

            const { data, error: productError } = await supabase
                .from('products')
                .select('*')
                .eq('id', productId)
                .eq('is_available', true)
                .single()

            if (productError || !data) {
                console.error('Product details error:', productError)
                setError('This product could not be found or is no longer available.')
                setLoading(false)
                return
            }

            setProduct(data)

            const { data: sizeData, error: sizeError } = await supabase
                .from('product_sizes')
                .select('*')
                .eq('product_id', productId)
                .order('size')

            if (sizeError) {
                console.error('Product sizes error:', sizeError)
                setSizes([])
            } else {
                const fetchedSizes = sizeData || []
                setSizes(fetchedSizes)

                const firstAvailable = fetchedSizes.find((item) => item.stock > 0)
                if (firstAvailable) {
                    setSelectedSize(firstAvailable.size)
                }
            }

            let { data: relatedData } = await supabase
                .from('products')
                .select('*')
                .eq('is_available', true)
                .neq('id', productId)
                .eq('category', data.category)
                .order('created_at', { ascending: false })
                .limit(6)

            if (!relatedData || relatedData.length === 0) {
                const { data: fallbackData } = await supabase
                    .from('products')
                    .select('*')
                    .eq('is_available', true)
                    .neq('id', productId)
                    .order('created_at', { ascending: false })
                    .limit(6)
                relatedData = fallbackData || []
            }

            setRelatedProducts(relatedData || [])
            setLoading(false)
            window.scrollTo(0, 0)
        }

        fetchProduct()
    }, [productId])

    const addToCart = () => {
        if (!product) return

        const effectiveSize = sizes.length > 0 ? selectedSize : 'One Size'

        if (sizes.length > 0 && !selectedSize) {
            alert('Please select a size.')
            return
        }

        if (sizes.length > 0) {
            const selectedSizeObj = sizes.find((item) => item.size === selectedSize)
            if (!selectedSizeObj || selectedSizeObj.stock <= 0) {
                alert('The selected size is out of stock.')
                return
            }
        }

        const existingCart = JSON.parse(
            localStorage.getItem('jovial_cart') || '[]',
        )

        const cartItem = {
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image_url,
            size: effectiveSize,
            quantity: 1,
        }

        const existingIndex = existingCart.findIndex(
            (item) =>
                item.id === cartItem.id &&
                item.size === cartItem.size,
        )

        let updatedCart

        if (existingIndex !== -1) {
            updatedCart = [...existingCart]
            updatedCart[existingIndex] = {
                ...updatedCart[existingIndex],
                quantity: updatedCart[existingIndex].quantity + 1,
            }
        } else {
            updatedCart = [...existingCart, cartItem]
        }

        localStorage.setItem('jovial_cart', JSON.stringify(updatedCart))
        window.dispatchEvent(new Event('cartUpdated'))

        setAddedToCart(true)

        setTimeout(() => {
            setAddedToCart(false)
        }, 2000)
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-[#f8f5ef] px-5 py-20 text-center text-[#073b70]">
                <p className="text-lg font-semibold">
                    Loading product details...
                </p>
            </main>
        )
    }

    if (error || !product) {
        return (
            <main className="min-h-screen bg-[#f8f5ef] px-5 py-20 text-center text-[#073b70]">
                <h1 className="font-serif text-3xl font-bold">
                    Product not found
                </h1>

                <p className="mt-3 text-[#31506c]">
                    {error || 'This product is no longer available.'}
                </p>

                <NavLink
                    to="/Shop"
                    className="mt-7 inline-block rounded-lg bg-[#073b70] px-6 py-3 text-sm font-semibold text-white"
                >
                    Back to Shop
                </NavLink>
            </main>
        )
    }

    const image = product.image_url || '/hero/hero1.jpeg'

    const productImages = [
        image,
        image,
        image,
    ]

    const selectedSizeObj = sizes.find((item) => item.size === selectedSize)
    const selectedSizeStock = selectedSizeObj ? selectedSizeObj.stock : 0

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

                    <span>{product.category}</span>

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

                        <div className="flex flex-col gap-3">
                            {productImages.map((item, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setActiveImage(index)}
                                    className={`aspect-[3/4] overflow-hidden rounded-lg border-2 bg-white transition ${activeImage === index
                                            ? 'border-[#073b70]'
                                            : 'border-transparent'
                                        }`}
                                >
                                    <img
                                        src={item}
                                        alt={`${product.name} ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}

                            <button
                                type="button"
                                className="py-1 text-xl"
                                onClick={() =>
                                    setActiveImage(
                                        (activeImage + 1) % productImages.length,
                                    )
                                }
                            >
                                ↓
                            </button>
                        </div>

                        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#e8edf0]">
                            <img
                                src={productImages[activeImage]}
                                alt={product.name}
                                className="h-full w-full object-cover"
                            />

                            <span className="absolute left-4 top-4 rounded-full bg-[#073b70] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                                {product.is_available ? 'Available' : 'Sold Out'}
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
                                Good Finds
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
                                4.8 customer rating
                            </span>
                        </div>

                        {/* Stock */}
                        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                            {sizes.length === 0 ? (
                                <span className="flex items-center gap-2 font-medium text-green-600">
                                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                                    In Stock (One Size)
                                </span>
                            ) : selectedSize ? (
                                selectedSizeStock > 3 ? (
                                    <span className="flex items-center gap-2 font-medium text-green-600">
                                        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                                        {selectedSizeStock} left in stock ({selectedSize})
                                    </span>
                                ) : selectedSizeStock > 0 ? (
                                    <span className="flex items-center gap-2 font-bold text-amber-600">
                                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" />
                                        Low Stock — Only {selectedSizeStock} left! ({selectedSize})
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2 font-medium text-red-500">
                                        <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                                        Sold Out ({selectedSize})
                                    </span>
                                )
                            ) : (
                                <span className="italic text-[#31506c]">
                                    Please select a size to view stock
                                </span>
                            )}

                            <span className="text-[#31506c]/50">|</span>

                            <span>
                                Ships within 1–2 business days
                            </span>
                        </div>

                        <p className="mt-6 max-w-xl text-sm leading-7 text-[#31506c]">
                            {product.description ||
                                'A carefully selected pre-loved piece from Jovial Thrift Hub.'}
                        </p>

                        {/* Details */}
                        <div className="mt-6 space-y-3 border-b border-[#073b70]/10 pb-6 text-sm">
                            <p>
                                <strong>Category:</strong>
                                <span className="ml-3">
                                    {product.category}
                                </span>
                            </p>

                            <p>
                                <strong>Condition:</strong>
                                <span className="ml-3">
                                    Pre-loved
                                </span>
                            </p>

                            <p>
                                <strong>Availability:</strong>
                                <span className="ml-3">
                                    {product.is_available
                                        ? 'Available'
                                        : 'Sold Out'}
                                </span>
                            </p>
                        </div>

                        {/* Sizes */}
                        {sizes.length > 0 && (
                            <div className="mt-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold">
                                        Size: {selectedSize && <span className="font-normal text-[#31506c]">({selectedSize})</span>}
                                    </p>

                                    <button
                                        type="button"
                                        className="text-xs font-medium underline underline-offset-4"
                                    >
                                        ♧ &nbsp; Size Guide
                                    </button>
                                </div>

                                <div className="mt-3 flex flex-wrap gap-3">
                                    {sizes.map((item) => {
                                        const isOutOfStock = item.stock <= 0
                                        const isSelected = selectedSize === item.size

                                        return (
                                            <button
                                                key={item.id || item.size}
                                                type="button"
                                                disabled={isOutOfStock}
                                                onClick={() =>
                                                    !isOutOfStock && setSelectedSize(item.size)
                                                }
                                                className={`min-w-12 rounded-lg border px-4 py-2 text-sm transition ${
                                                    isSelected
                                                        ? 'border-[#073b70] bg-[#073b70] text-white font-bold'
                                                        : isOutOfStock
                                                        ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400 line-through'
                                                        : 'border-[#073b70]/15 bg-white text-[#073b70] hover:border-[#073b70]'
                                                }`}
                                            >
                                                {item.size} {isOutOfStock ? '(Out of stock)' : ''}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="mt-7 grid gap-3">
                            <button
                                type="button"
                                onClick={addToCart}
                                disabled={
                                    sizes.length > 0 &&
                                    (!selectedSize || selectedSizeStock <= 0)
                                }
                                className="flex items-center justify-center gap-3 rounded-lg bg-[#073b70] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#052d56] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <CartIcon />

                                {addedToCart
                                    ? 'Added to Cart ✓'
                                    : sizes.length > 0 && !selectedSize
                                    ? 'Select a Size'
                                    : sizes.length > 0 && selectedSizeStock <= 0
                                    ? 'Out of Stock'
                                    : 'Add to Cart'}
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
                                    Delivery
                                    <br />
                                    Available
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
                                    Quality
                                    <br />
                                    Checked
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
                                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#31506c]">
                                    {product.description ||
                                        'This carefully selected pre-loved piece has been chosen for its style, quality and character.'}
                                </p>
                            )}

                            {activeTab === 'Size & Fit' && (
                                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#31506c]">
                                    {sizes.length > 0
                                        ? 'Available sizes are shown above. Please select the size that best suits you before adding the item to your cart.'
                                        : 'This item is One Size.'}
                                </p>
                            )}

                            {activeTab === 'Shipping' && (
                                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#31506c]">
                                    Orders are carefully prepared and delivery arrangements
                                    are confirmed with you before your order is finalized.
                                </p>
                            )}

                            {activeTab === 'Returns' && (
                                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#31506c]">
                                    Please contact Jovial Thrift Hub before completing your
                                    order if you need clarification about the condition or
                                    fit of a pre-loved item.
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
            {relatedProducts.length > 0 && (
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
                        {relatedProducts.map((item) => (
                            <NavLink
                                key={item.id}
                                to={`/ProductDetails?id=${item.id}`}
                                className="group"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-[#073b70]/10 bg-white">

                                    <img
                                        src={
                                            item.image_url ||
                                            '/hero/hero1.jpeg'
                                        }
                                        alt={item.name}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />

                                    <button
                                        type="button"
                                        onClick={(event) => {
                                            event.preventDefault()
                                            setWishlist(true)
                                        }}
                                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0064b8] shadow-sm"
                                    >
                                        ♡
                                    </button>
                                </div>

                                <h3 className="mt-3 text-sm font-medium">
                                    {item.name}
                                </h3>

                                <p className="mt-1 font-semibold text-[#0064b8]">
                                    ${Number(item.price).toFixed(2)}
                                </p>
                            </NavLink>
                        ))}
                    </div>
                </section>
            )}
        </main>
    )
}

export default ProductDetails