import React, { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabaseClient'

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
)

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)

const CATEGORIES = [
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

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size']

const AdminDashboard = () => {
  const [products, setProducts] = useState([])
  const [productSizesMap, setProductSizesMap] = useState({})
  const [ordersCount, setOrdersCount] = useState(0)

  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState({ type: '', message: '' })
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showStockModal, setShowStockModal] = useState(false)

  // Active item in modal
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)

  // Product Form State
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Women',
    image_url: '',
    is_available: true,
  })

  // Size Form State for Stock Modal
  const [sizeForm, setSizeForm] = useState({
    size: 'M',
    stock: 5,
  })

  // Load all products, size mappings, and order statistics
  const fetchData = async () => {
    setLoading(true)
    setFeedback({ type: '', message: '' })

    try {
      // 1. Fetch products
      const { data: prodData, error: prodErr } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (prodErr) throw prodErr

      // 2. Fetch sizes for all products
      const { data: sizesData, error: sizesErr } = await supabase
        .from('product_sizes')
        .select('*')

      if (sizesErr) {
        console.warn('Sizes fetch warning:', sizesErr)
      }

      // Map sizes by product_id
      const map = {}
      if (sizesData) {
        sizesData.forEach((s) => {
          if (!map[s.product_id]) map[s.product_id] = []
          map[s.product_id].push(s)
        })
      }

      // 3. Fetch orders count
      const { count: ordCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })

      setProducts(prodData || [])
      setProductSizesMap(map)
      setOrdersCount(ordCount || 0)
    } catch (err) {
      console.error('Admin data fetch error:', err)
      setFeedback({
        type: 'error',
        message: err.message || 'Failed to load products from database.',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Statistics
  const totalProducts = products.length
  const availableCount = products.filter((p) => p.is_available).length
  const lowStockCount = products.filter((p) => {
    const sizes = productSizesMap[p.id] || []
    if (sizes.length === 0) return false
    const totalStock = sizes.reduce((sum, s) => sum + Number(s.stock), 0)
    return totalStock <= 3
  }).length

  // Handlers for Add Product
  const handleCreateProduct = async (e) => {
    e.preventDefault()
    setModalLoading(true)

    try {
      const payload = {
        name: productForm.name.trim(),
        description: productForm.description.trim(),
        price: Number(productForm.price),
        category: productForm.category,
        image_url: productForm.image_url.trim() || '/hero/hero1.jpeg',
        is_available: productForm.is_available,
      }

      const { data: newProd, error } = await supabase
        .from('products')
        .insert([payload])
        .select()
        .single()

      if (error) throw error

      setFeedback({ type: 'success', message: `Product "${newProd.name}" created successfully!` })
      setShowAddModal(false)
      setProductForm({
        name: '',
        description: '',
        price: '',
        category: 'Women',
        image_url: '',
        is_available: true,
      })

      await fetchData()

      // Prompt to immediately add sizes & stock
      setSelectedProduct(newProd)
      setShowStockModal(true)
    } catch (err) {
      console.error('Create product error:', err)
      setFeedback({ type: 'error', message: err.message || 'Failed to create product.' })
    } finally {
      setModalLoading(false)
    }
  }

  // Handlers for Edit Product
  const handleOpenEdit = (product) => {
    setSelectedProduct(product)
    setProductForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price ? String(product.price) : '',
      category: product.category || 'Women',
      image_url: product.image_url || '',
      is_available: Boolean(product.is_available),
    })
    setShowEditModal(true)
  }

  const handleUpdateProduct = async (e) => {
    e.preventDefault()
    if (!selectedProduct) return
    setModalLoading(true)

    try {
      const payload = {
        name: productForm.name.trim(),
        description: productForm.description.trim(),
        price: Number(productForm.price),
        category: productForm.category,
        image_url: productForm.image_url.trim() || '/hero/hero1.jpeg',
        is_available: productForm.is_available,
      }

      const { error } = await supabase
        .from('products')
        .update(payload)
        .eq('id', selectedProduct.id)

      if (error) throw error

      setFeedback({ type: 'success', message: `Product "${payload.name}" updated successfully!` })
      setShowEditModal(false)
      await fetchData()
    } catch (err) {
      console.error('Update product error:', err)
      setFeedback({ type: 'error', message: err.message || 'Failed to update product.' })
    } finally {
      setModalLoading(false)
    }
  }

  // Toggle availability
  const handleToggleAvailability = async (product) => {
    try {
      const updatedStatus = !product.is_available
      const { error } = await supabase
        .from('products')
        .update({ is_available: updatedStatus })
        .eq('id', product.id)

      if (error) throw error

      setFeedback({
        type: 'success',
        message: `Product "${product.name}" marked as ${updatedStatus ? 'Available' : 'Unavailable'}.`,
      })
      fetchData()
    } catch (err) {
      console.error('Toggle availability error:', err)
      setFeedback({ type: 'error', message: err.message || 'Failed to update status.' })
    }
  }

  // Delete product with confirmation
  const handleDeleteProduct = async (product) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${product.name}"?\nThis will also remove all associated size stock records.`)) {
      return
    }

    try {
      const { error } = await supabase.from('products').delete().eq('id', product.id)
      if (error) throw error

      setFeedback({ type: 'success', message: `Product "${product.name}" deleted.` })
      fetchData()
    } catch (err) {
      console.error('Delete product error:', err)
      setFeedback({ type: 'error', message: err.message || 'Failed to delete product.' })
    }
  }

  // Stock & Size Handlers
  const handleOpenStockModal = (product) => {
    setSelectedProduct(product)
    const existingSizes = productSizesMap[product.id] || []
    // Default size option that hasn't been added yet if any
    const unusedSize = SIZE_OPTIONS.find((s) => !existingSizes.some((es) => es.size === s)) || 'M'
    setSizeForm({ size: unusedSize, stock: 5 })
    setShowStockModal(true)
  }

  const handleAddSizeOption = async (e) => {
    e.preventDefault()
    if (!selectedProduct) return
    setModalLoading(true)

    try {
      const existingSizes = productSizesMap[selectedProduct.id] || []
      const duplicate = existingSizes.find((s) => s.size === sizeForm.size)

      if (duplicate) {
        setFeedback({ type: 'error', message: `Size "${sizeForm.size}" already exists for this product.` })
        setModalLoading(false)
        return
      }

      const { error } = await supabase.from('product_sizes').insert([
        {
          product_id: selectedProduct.id,
          size: sizeForm.size,
          stock: Number(sizeForm.stock),
        },
      ])

      if (error) throw error

      setFeedback({ type: 'success', message: `Added size ${sizeForm.size} with stock ${sizeForm.stock}.` })
      await fetchData()

      // Reset form to next unused size
      const updatedSizes = [...existingSizes, { size: sizeForm.size }]
      const nextUnused = SIZE_OPTIONS.find((s) => !updatedSizes.some((es) => es.size === s)) || 'M'
      setSizeForm({ size: nextUnused, stock: 5 })
    } catch (err) {
      console.error('Add size error:', err)
      setFeedback({ type: 'error', message: err.message || 'Failed to add size.' })
    } finally {
      setModalLoading(false)
    }
  }

  const handleUpdateStockQuantity = async (sizeId, newStock) => {
    try {
      const { error } = await supabase
        .from('product_sizes')
        .update({ stock: Number(newStock) })
        .eq('id', sizeId)

      if (error) throw error
      fetchData()
    } catch (err) {
      console.error('Update stock error:', err)
      setFeedback({ type: 'error', message: err.message || 'Failed to update stock.' })
    }
  }

  const handleRemoveSizeOption = async (sizeId, sizeName) => {
    try {
      const { error } = await supabase.from('product_sizes').delete().eq('id', sizeId)
      if (error) throw error

      setFeedback({ type: 'success', message: `Size ${sizeName} removed.` })
      fetchData()
    } catch (err) {
      console.error('Remove size error:', err)
      setFeedback({ type: 'error', message: err.message || 'Failed to remove size option.' })
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/Admin'
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#073b70] px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* ADMIN HEADER */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#073b70]/10 pb-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#31506c]">
              Jovial Thrift Hub Management
            </p>
            <h1 className="mt-1 font-serif text-4xl font-bold text-[#073b70]">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-xs text-[#31506c]">
              Manage showroom catalog, product listings, and size inventory.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setProductForm({
                  name: '',
                  description: '',
                  price: '',
                  category: 'Women',
                  image_url: '',
                  is_available: true,
                })
                setShowAddModal(true)
              }}
              className="flex items-center gap-2 rounded-xl bg-[#073b70] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#052d56]"
            >
              <PlusIcon />
              Add Product
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-xl border border-[#073b70]/20 bg-white px-4 py-3 text-xs font-semibold text-[#073b70] hover:bg-[#edf7ff]"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* FEEDBACK BANNER */}
        {feedback.message && (
          <div
            className={`mt-6 rounded-xl border p-4 text-xs font-semibold ${
              feedback.type === 'error'
                ? 'border-red-200 bg-red-50 text-red-700'
                : 'border-green-200 bg-green-50 text-green-700'
            }`}
          >
            {feedback.message}
          </div>
        )}

        {/* TOP METRICS SUMMARY */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#073b70]/10 bg-white p-6 shadow-xs">
            <p className="text-xs font-bold uppercase tracking-wider text-[#31506c]">Total Products</p>
            <p className="mt-2 text-3xl font-bold text-[#073b70]">{totalProducts}</p>
          </div>

          <div className="rounded-2xl border border-[#073b70]/10 bg-white p-6 shadow-xs">
            <p className="text-xs font-bold uppercase tracking-wider text-[#31506c]">Available Products</p>
            <p className="mt-2 text-3xl font-bold text-green-600">{availableCount}</p>
          </div>

          <div className="rounded-2xl border border-[#073b70]/10 bg-white p-6 shadow-xs">
            <p className="text-xs font-bold uppercase tracking-wider text-[#31506c]">Low Stock Items</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">{lowStockCount}</p>
          </div>

          <div className="rounded-2xl border border-[#073b70]/10 bg-white p-6 shadow-xs">
            <p className="text-xs font-bold uppercase tracking-wider text-[#31506c]">Customer Orders</p>
            <p className="mt-2 text-3xl font-bold text-[#0064b8]">{ordersCount}</p>
          </div>
        </div>

        {/* PRODUCTS SECTION */}
        <div className="mt-10 rounded-2xl border border-[#073b70]/10 bg-white p-6 sm:p-8 shadow-xs">
          {/* SEARCH & FILTERS */}
          <div className="flex flex-col justify-between gap-4 border-b border-[#073b70]/10 pb-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-serif text-2xl font-bold">Catalog Management</h2>
              <p className="mt-1 text-xs text-[#31506c]">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-w-48 rounded-xl border border-[#073b70]/15 bg-[#f8f5ef] px-4 py-2 text-xs outline-none focus:border-[#073b70]"
              />

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-xl border border-[#073b70]/15 bg-[#f8f5ef] px-3 py-2 text-xs outline-none focus:border-[#073b70]"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* TABLE OF PRODUCTS */}
          {loading ? (
            <div className="py-16 text-center text-[#31506c]">
              <p className="font-serif text-lg italic">Loading product catalog...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-serif text-2xl font-bold text-[#073b70]">No products found.</p>
              <p className="mt-2 text-xs text-[#31506c]">Try adding a new product or changing filters.</p>
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#073b70]/10 text-[10px] uppercase tracking-wider text-[#31506c]">
                    <th className="py-3 px-2">Product</th>
                    <th className="py-3 px-2">Category</th>
                    <th className="py-3 px-2">Price</th>
                    <th className="py-3 px-2">Availability</th>
                    <th className="py-3 px-2">Stock Summary</th>
                    <th className="py-3 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#073b70]/10">
                  {filteredProducts.map((p) => {
                    const sizes = productSizesMap[p.id] || []
                    const totalStock = sizes.reduce((sum, s) => sum + Number(s.stock), 0)

                    return (
                      <tr key={p.id} className="hover:bg-[#f8f5ef]/50">
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image_url || '/hero/hero1.jpeg'}
                              alt={p.name}
                              className="h-12 w-10 rounded-lg object-cover bg-[#edf7ff]"
                            />
                            <div>
                              <p className="font-bold text-sm text-[#073b70]">{p.name}</p>
                              <p className="text-[10px] text-[#31506c] truncate max-w-xs">{p.description || 'No description'}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-2 font-medium">{p.category}</td>

                        <td className="py-4 px-2 font-bold text-[#0064b8]">
                          ${Number(p.price).toFixed(2)}
                        </td>

                        <td className="py-4 px-2">
                          <button
                            type="button"
                            onClick={() => handleToggleAvailability(p)}
                            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase transition ${
                              p.is_available
                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                          >
                            {p.is_available ? 'Available' : 'Sold Out'}
                          </button>
                        </td>

                        <td className="py-4 px-2">
                          {sizes.length === 0 ? (
                            <span className="text-[#31506c] italic">No sizes set</span>
                          ) : (
                            <div>
                              <p className="font-bold text-[#073b70]">{totalStock} total units</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {sizes.map((s) => (
                                  <span
                                    key={s.id}
                                    className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${
                                      s.stock <= 0
                                        ? 'bg-red-100 text-red-600 line-through'
                                        : s.stock <= 3
                                        ? 'bg-amber-100 text-amber-700'
                                        : 'bg-blue-50 text-[#073b70]'
                                    }`}
                                  >
                                    {s.size}: {s.stock}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </td>

                        <td className="py-4 px-2 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleOpenStockModal(p)}
                              className="rounded-lg bg-[#edf7ff] px-3 py-1.5 text-[11px] font-bold text-[#073b70] hover:bg-[#073b70] hover:text-white"
                            >
                              Manage Stock
                            </button>

                            <button
                              type="button"
                              onClick={() => handleOpenEdit(p)}
                              className="p-2 text-[#073b70] hover:bg-[#edf7ff] rounded-lg"
                              title="Edit product"
                            >
                              <EditIcon />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(p)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              title="Delete product"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ADD PRODUCT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#073b70]/10 bg-[#073b70] px-6 py-4 text-white">
              <h3 className="font-serif text-xl font-bold">Add New Product</h3>
              <button type="button" onClick={() => setShowAddModal(false)}>
                <CloseIcon />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#073b70] mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Classic Denim Jacket"
                  className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-2.5 text-xs outline-none focus:border-[#073b70]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#073b70] mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="45.00"
                    className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-2.5 text-xs outline-none focus:border-[#073b70]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#073b70] mb-1">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-3 py-2.5 text-xs outline-none focus:border-[#073b70]"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#073b70] mb-1">Image URL *</label>
                <input
                  type="text"
                  value={productForm.image_url}
                  onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                  placeholder="/hero/hero1.jpeg or https://..."
                  className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-2.5 text-xs outline-none focus:border-[#073b70]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#073b70] mb-1">Description</label>
                <textarea
                  rows="3"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Product description and details..."
                  className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-2.5 text-xs outline-none focus:border-[#073b70] resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_available"
                  checked={productForm.is_available}
                  onChange={(e) => setProductForm({ ...productForm, is_available: e.target.checked })}
                  className="h-4 w-4 accent-[#073b70]"
                />
                <label htmlFor="is_available" className="text-xs font-bold text-[#073b70]">
                  Mark as Available for Customer Orders
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border border-[#073b70]/20 px-5 py-2.5 text-xs font-semibold text-[#073b70]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={modalLoading}
                  className="rounded-lg bg-[#073b70] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-[#052d56] disabled:opacity-60"
                >
                  {modalLoading ? 'Saving...' : 'Create & Set Sizes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {showEditModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#073b70]/10 bg-[#073b70] px-6 py-4 text-white">
              <h3 className="font-serif text-xl font-bold">Edit Product</h3>
              <button type="button" onClick={() => setShowEditModal(false)}>
                <CloseIcon />
              </button>
            </div>

            <form onSubmit={handleUpdateProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#073b70] mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-2.5 text-xs outline-none focus:border-[#073b70]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#073b70] mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-2.5 text-xs outline-none focus:border-[#073b70]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#073b70] mb-1">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-3 py-2.5 text-xs outline-none focus:border-[#073b70]"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#073b70] mb-1">Image URL *</label>
                <input
                  type="text"
                  value={productForm.image_url}
                  onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                  className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-2.5 text-xs outline-none focus:border-[#073b70]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#073b70] mb-1">Description</label>
                <textarea
                  rows="3"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-2.5 text-xs outline-none focus:border-[#073b70] resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="edit_is_available"
                  checked={productForm.is_available}
                  onChange={(e) => setProductForm({ ...productForm, is_available: e.target.checked })}
                  className="h-4 w-4 accent-[#073b70]"
                />
                <label htmlFor="edit_is_available" className="text-xs font-bold text-[#073b70]">
                  Available for Customer Orders
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="rounded-lg border border-[#073b70]/20 px-5 py-2.5 text-xs font-semibold text-[#073b70]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={modalLoading}
                  className="rounded-lg bg-[#073b70] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-[#052d56] disabled:opacity-60"
                >
                  {modalLoading ? 'Saving...' : 'Update Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MANAGE SIZES & STOCK MODAL */}
      {showStockModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#073b70]/10 bg-[#073b70] px-6 py-4 text-white">
              <div>
                <h3 className="font-serif text-xl font-bold">Manage Sizes & Inventory</h3>
                <p className="text-xs opacity-80">{selectedProduct.name}</p>
              </div>
              <button type="button" onClick={() => setShowStockModal(false)}>
                <CloseIcon />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* CURRENT SIZES & STOCK CONTROL */}
              <div>
                <h4 className="font-serif text-base font-bold text-[#073b70] border-b border-[#073b70]/10 pb-2">
                  Configured Product Sizes
                </h4>

                {(!productSizesMap[selectedProduct.id] || productSizesMap[selectedProduct.id].length === 0) ? (
                  <p className="py-4 text-xs italic text-[#31506c]">
                    No size entries configured yet. Add a size option below.
                  </p>
                ) : (
                  <div className="mt-3 space-y-3">
                    {productSizesMap[selectedProduct.id].map((sizeItem) => (
                      <div
                        key={sizeItem.id}
                        className="flex items-center justify-between gap-4 rounded-xl border border-[#073b70]/15 bg-[#f8f5ef] p-3 text-xs"
                      >
                        <span className="font-bold text-sm text-[#073b70] min-w-16">
                          Size {sizeItem.size}
                        </span>

                        <div className="flex items-center gap-2">
                          <label className="text-[#31506c]">Stock:</label>
                          <input
                            type="number"
                            min="0"
                            value={sizeItem.stock}
                            onChange={(e) => handleUpdateStockQuantity(sizeItem.id, e.target.value)}
                            className="w-20 rounded-md border border-[#073b70]/20 bg-white px-2 py-1 text-xs text-center font-bold"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveSizeOption(sizeItem.id, sizeItem.size)}
                          className="text-red-600 hover:underline text-xs font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ADD NEW SIZE FORM */}
              <form onSubmit={handleAddSizeOption} className="rounded-xl border border-[#073b70]/10 bg-[#edf7ff] p-4">
                <h5 className="font-bold text-xs uppercase tracking-wider text-[#073b70] mb-3">Add Size Option</h5>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-[#073b70] mb-1">Size Option</label>
                    <select
                      value={sizeForm.size}
                      onChange={(e) => setSizeForm({ ...sizeForm, size: e.target.value })}
                      className="w-full rounded-md border border-[#073b70]/20 bg-white px-3 py-2 text-xs outline-none"
                    >
                      {SIZE_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-[#073b70] mb-1">Initial Stock</label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={sizeForm.stock}
                      onChange={(e) => setSizeForm({ ...sizeForm, stock: e.target.value })}
                      className="w-full rounded-md border border-[#073b70]/20 bg-white px-3 py-2 text-xs outline-none font-bold"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      disabled={modalLoading}
                      className="w-full rounded-md bg-[#073b70] py-2 text-xs font-bold text-white transition hover:bg-[#052d56]"
                    >
                      + Add Size
                    </button>
                  </div>
                </div>
              </form>

              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowStockModal(false)}
                  className="rounded-lg bg-[#073b70] px-6 py-2.5 text-xs font-bold text-white"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default AdminDashboard