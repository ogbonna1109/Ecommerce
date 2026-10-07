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

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6" />
    <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
  </svg>
)

const LayoutDashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </svg>
)

const ShoppingBagIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)

const OrdersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
)

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

const AlertTriangleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
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

const ORDER_STATUS_OPTIONS = [
  'Pending',
  'Paid',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
]

const AdminDashboard = ({ initialTab = 'overview' }) => {
  // Navigation Tab State: 'overview' | 'products' | 'orders' | 'settings'
  const [activeTab, setActiveTab] = useState(initialTab)
  const [adminEmail, setAdminEmail] = useState('')

  useEffect(() => {
    const getAdminIdentity = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) {
        setAdminEmail(user.email)
      }
    }
    getAdminIdentity()
  }, [])

  // Sync activeTab when initialTab prop changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab)
    }
  }, [initialTab])

  // Products State
  const [products, setProducts] = useState([])
  const [productSizesMap, setProductSizesMap] = useState({})
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  // Orders State
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [ordersError, setOrdersError] = useState('')
  const [orderSearchQuery, setOrderSearchQuery] = useState('')
  const [orderStatusFilter, setOrderStatusFilter] = useState('All')

  // Store Settings State
  const [storeSettings, setStoreSettings] = useState({
    store_name: 'Jovial Thrift Hub',
    tagline: 'Curated Vintage & Pre-Loved Fashion',
    whatsapp_number: '+2348000000000',
    email: 'contact@jovialthrifthub.com',
    delivery_info: 'Standard nationwide delivery within 2-5 business days.',
    delivery_fee: '15.00',
    minimum_order_amount: '0.00',
    is_store_open: true,
    announcement: 'Free Shipping on Orders Over $50',
    instagram_url: 'https://instagram.com',
    facebook_url: 'https://facebook.com',
    twitter_url: 'https://x.com',
  })
  const [settingsId, setSettingsId] = useState(null)
  const [loadingSettings, setLoadingSettings] = useState(true)
  const [savingSettings, setSavingSettings] = useState(false)

  // Selected Order Modal State
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedOrderItems, setSelectedOrderItems] = useState([])
  const [loadingOrderItems, setLoadingOrderItems] = useState(false)
  const [updatingOrderStatus, setUpdatingOrderStatus] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)

  // Feedback State
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  // Product Modals State
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showStockModal, setShowStockModal] = useState(false)
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

  // Size Form State
  const [sizeForm, setSizeForm] = useState({
    size: 'M',
    stock: 5,
  })

  // Fetch Products & Sizes
  const fetchProductsData = async () => {
    setLoadingProducts(true)
    try {
      const { data: prodData, error: prodErr } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (prodErr) throw prodErr

      const { data: sizesData, error: sizesErr } = await supabase
        .from('product_sizes')
        .select('*')

      if (sizesErr) {
        console.warn('Sizes fetch warning:', sizesErr)
      }

      const map = {}
      if (sizesData) {
        sizesData.forEach((s) => {
          if (!map[s.product_id]) map[s.product_id] = []
          map[s.product_id].push(s)
        })
      }

      setProducts(prodData || [])
      setProductSizesMap(map)
    } catch (err) {
      console.error('Products fetch error:', err)
      setFeedback({
        type: 'error',
        message: err.message || 'Failed to load products.',
      })
    } finally {
      setLoadingProducts(false)
    }
  }

  // Fetch Customer Orders
  const fetchOrdersData = async () => {
    setLoadingOrders(true)
    setOrdersError('')
    try {
      const { data: ordsData, error: ordsErr } = await supabase
        .from('orders')
        .select('*, order_items(id, quantity)')
        .order('created_at', { ascending: false })

      if (ordsErr) {
        console.error('Orders fetch error:', ordsErr)
        setOrdersError(ordsErr.message || 'Could not fetch orders from Supabase.')
        setOrders([])
      } else {
        setOrders(ordsData || [])
      }
    } catch (err) {
      console.error('Fetch orders exception:', err)
      setOrdersError('An unexpected error occurred while loading customer orders.')
    } finally {
      setLoadingOrders(false)
    }
  }

  // Fetch Store Settings
  const fetchStoreSettings = async () => {
    setLoadingSettings(true)
    try {
      const { data, error } = await supabase
        .from('store_settings')
        .select('*')
        .limit(1)
        .maybeSingle()

      if (error) {
        console.warn('Store settings query notice:', error)
      } else if (data) {
        setSettingsId(data.id)
        setStoreSettings({
          store_name: data.store_name || 'Jovial Thrift Hub',
          tagline: data.tagline || 'Curated Vintage & Pre-Loved Fashion',
          whatsapp_number: data.whatsapp_number || '+2348000000000',
          email: data.email || 'contact@jovialthrifthub.com',
          delivery_info: data.delivery_info || 'Standard nationwide delivery within 2-5 business days.',
          delivery_fee: data.delivery_fee !== undefined && data.delivery_fee !== null ? String(data.delivery_fee) : '15.00',
          minimum_order_amount: data.minimum_order_amount !== undefined && data.minimum_order_amount !== null ? String(data.minimum_order_amount) : '0.00',
          is_store_open: data.is_store_open !== false,
          announcement: data.announcement || 'Free Shipping on Orders Over $50',
          instagram_url: data.instagram_url || '',
          facebook_url: data.facebook_url || '',
          twitter_url: data.twitter_url || '',
        })
      }
    } catch (err) {
      console.error('Fetch settings exception:', err)
    } finally {
      setLoadingSettings(false)
    }
  }

  // Save Store Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault()
    setSavingSettings(true)
    setFeedback({ type: '', message: '' })

    try {
      const payload = {
        store_name: storeSettings.store_name.trim(),
        tagline: storeSettings.tagline.trim(),
        whatsapp_number: storeSettings.whatsapp_number.trim(),
        email: storeSettings.email.trim(),
        delivery_info: storeSettings.delivery_info.trim(),
        delivery_fee: Number(storeSettings.delivery_fee) || 0,
        minimum_order_amount: Number(storeSettings.minimum_order_amount) || 0,
        is_store_open: Boolean(storeSettings.is_store_open),
        announcement: storeSettings.announcement.trim(),
        instagram_url: storeSettings.instagram_url.trim(),
        facebook_url: storeSettings.facebook_url.trim(),
        twitter_url: storeSettings.twitter_url.trim(),
        updated_at: new Date().toISOString(),
      }

      let saveErr = null
      if (settingsId) {
        const { error } = await supabase
          .from('store_settings')
          .update(payload)
          .eq('id', settingsId)
        saveErr = error
      } else {
        const { data: inserted, error } = await supabase
          .from('store_settings')
          .insert([payload])
          .select()
          .single()
        if (inserted) setSettingsId(inserted.id)
        saveErr = error
      }

      if (saveErr) {
        if (saveErr.code === 'PGRST205' || saveErr.message?.includes('does not exist')) {
          throw new Error('Database setup required: Please run the provided SQL script to create the "store_settings" table in Supabase SQL Editor.')
        }
        throw saveErr
      }

      setFeedback({
        type: 'success',
        message: 'Store settings saved successfully! Checkout & store availability updated.',
      })
    } catch (err) {
      console.error('Save settings error:', err)
      setFeedback({
        type: 'error',
        message: err.message || 'Failed to save store settings.',
      })
    } finally {
      setSavingSettings(false)
    }
  }

  // Refresh All Dashboard Data
  const refreshAllData = async () => {
    await Promise.all([fetchProductsData(), fetchOrdersData(), fetchStoreSettings()])
  }

  // Load all data on mount
  useEffect(() => {
    refreshAllData()
  }, [])

  // Filtered Products for Products Tab
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Filtered Orders for Orders Tab
  const filteredOrders = orders.filter((o) => {
    const q = orderSearchQuery.trim().toLowerCase()
    const matchesSearch =
      !q ||
      (o.order_number || '').toLowerCase().includes(q) ||
      (o.customer_name || '').toLowerCase().includes(q) ||
      (o.customer_phone || '').toLowerCase().includes(q) ||
      (o.payment_reference || '').toLowerCase().includes(q)

    const orderStatus = (o.status || 'Pending').toLowerCase()
    const filter = orderStatusFilter.toLowerCase()

    let matchesStatus = false
    if (orderStatusFilter === 'All') {
      matchesStatus = true
    } else if (filter === 'paid') {
      matchesStatus = orderStatus === 'paid' || Boolean(o.paid_at)
    } else {
      matchesStatus = orderStatus === filter
    }

    return matchesSearch && matchesStatus
  })

  // --- STATISTICAL COMPUTATIONS ---
  const totalProducts = products.length
  const availableProductsCount = products.filter((p) => p.is_available).length
  const totalOrdersCount = orders.length

  const paidOrdersList = orders.filter(
    (o) => Boolean(o.paid_at) || (o.status || '').toLowerCase() === 'paid'
  )
  const paidOrdersCount = paidOrdersList.length

  const pendingOrdersCount = orders.filter(
    (o) => (o.status || '').toLowerCase() === 'pending'
  ).length

  const totalRevenue = paidOrdersList.reduce(
    (sum, o) => sum + (Number(o.total_amount) || 0),
    0
  )

  const revenueByMonth = paidOrdersList.reduce((acc, order) => {
    const dateObj = new Date(order.paid_at || order.created_at)
    if (isNaN(dateObj.getTime())) return acc
    const monthKey = dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    acc[monthKey] = (acc[monthKey] || 0) + (Number(order.total_amount) || 0)
    return acc
  }, {})

  const sortedMonths = Object.keys(revenueByMonth).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime()
  })

  const lowStockItems = []
  products.forEach((product) => {
    const sizes = productSizesMap[product.id] || []
    sizes.forEach((sizeItem) => {
      if (Number(sizeItem.stock) <= 3) {
        lowStockItems.push({
          productId: product.id,
          productName: product.name,
          productImage: product.image_url,
          category: product.category,
          size: sizeItem.size,
          stock: sizeItem.stock,
          productRef: product,
        })
      }
    })
  })
  const lowStockCount = lowStockItems.length
  const recentOrders = orders.slice(0, 6)

  // Product CRUD Handlers
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

      await fetchProductsData()
      setSelectedProduct(newProd)
      setShowStockModal(true)
    } catch (err) {
      console.error('Create product error:', err)
      setFeedback({ type: 'error', message: err.message || 'Failed to create product.' })
    } finally {
      setModalLoading(false)
    }
  }

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
      await fetchProductsData()
    } catch (err) {
      console.error('Update product error:', err)
      setFeedback({ type: 'error', message: err.message || 'Failed to update product.' })
    } finally {
      setModalLoading(false)
    }
  }

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
      fetchProductsData()
    } catch (err) {
      console.error('Toggle availability error:', err)
      setFeedback({ type: 'error', message: err.message || 'Failed to update status.' })
    }
  }

  const handleDeleteProduct = async (product) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${product.name}"?`)) {
      return
    }

    try {
      const { error } = await supabase.from('products').delete().eq('id', product.id)
      if (error) throw error

      setFeedback({ type: 'success', message: `Product "${product.name}" deleted.` })
      fetchProductsData()
    } catch (err) {
      console.error('Delete product error:', err)
      setFeedback({ type: 'error', message: err.message || 'Failed to delete product.' })
    }
  }

  // Stock Handlers
  const handleOpenStockModal = (product) => {
    setSelectedProduct(product)
    const existingSizes = productSizesMap[product.id] || []
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
        setFeedback({ type: 'error', message: `Size "${sizeForm.size}" already exists.` })
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
      await fetchProductsData()

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
      fetchProductsData()
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
      fetchProductsData()
    } catch (err) {
      console.error('Remove size error:', err)
      setFeedback({ type: 'error', message: err.message || 'Failed to remove size option.' })
    }
  }

  // Order Details Modal Handlers
  const handleOpenOrderDetails = async (order) => {
    setSelectedOrder(order)
    setShowOrderModal(true)
    setLoadingOrderItems(true)
    setSelectedOrderItems([])

    try {
      const { data, error } = await supabase
        .from('order_items')
        .select('*, products(image_url)')
        .eq('order_id', order.id)

      if (error) {
        console.error('Error fetching order items:', error)
      } else {
        setSelectedOrderItems(data || [])
      }
    } catch (err) {
      console.error('Fetch order items exception:', err)
    } finally {
      setLoadingOrderItems(false)
    }
  }

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    setUpdatingOrderStatus(true)
    setFeedback({ type: '', message: '' })

    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)

      if (error) throw error

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      )

      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) => ({ ...prev, status: newStatus }))
      }

      setFeedback({
        type: 'success',
        message: `Order #${selectedOrder?.order_number || orderId} status updated to "${newStatus}". Stock was not altered.`,
      })
    } catch (err) {
      console.error('Update status error:', err)
      setFeedback({
        type: 'error',
        message: err.message || 'Failed to update order status.',
      })
    } finally {
      setUpdatingOrderStatus(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/Admin'
  }

  // Badge Render Helpers
  const renderOrderStatusBadge = (status) => {
    const s = (status || 'pending').toLowerCase()
    switch (s) {
      case 'paid':
        return (
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
            Paid
          </span>
        )
      case 'processing':
        return (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold text-blue-800 uppercase tracking-wider">
            Processing
          </span>
        )
      case 'shipped':
        return (
          <span className="rounded-full bg-purple-100 px-3 py-1 text-[10px] font-bold text-purple-800 uppercase tracking-wider">
            Shipped
          </span>
        )
      case 'delivered':
        return (
          <span className="rounded-full bg-teal-100 px-3 py-1 text-[10px] font-bold text-teal-800 uppercase tracking-wider">
            Delivered
          </span>
        )
      case 'cancelled':
      case 'failed':
        return (
          <span className="rounded-full bg-red-100 px-3 py-1 text-[10px] font-bold text-red-800 uppercase tracking-wider">
            {status}
          </span>
        )
      case 'pending':
      default:
        return (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold text-amber-800 uppercase tracking-wider">
            Pending
          </span>
        )
    }
  }

  const renderPaymentStatusBadge = (order) => {
    const isPaid = Boolean(order.paid_at) || (order.status || '').toLowerCase() === 'paid'
    if (isPaid) {
      return (
        <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-bold text-green-700 uppercase tracking-wider">
          PAID
        </span>
      )
    }
    return (
      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 uppercase tracking-wider">
        UNPAID
      </span>
    )
  }

  const isLoadingOverall = loadingProducts || loadingOrders || loadingSettings

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
              Store performance overview, catalog statistics, customer orders, and store settings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* SECTION SWITCH TABS */}
            <div className="flex rounded-xl bg-white border border-[#073b70]/15 p-1 shadow-xs">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition ${
                  activeTab === 'overview'
                    ? 'bg-[#073b70] text-white shadow-xs'
                    : 'text-[#073b70] hover:bg-[#edf7ff]'
                }`}
              >
                <LayoutDashboardIcon />
                Overview
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('products')}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition ${
                  activeTab === 'products'
                    ? 'bg-[#073b70] text-white shadow-xs'
                    : 'text-[#073b70] hover:bg-[#edf7ff]'
                }`}
              >
                <ShoppingBagIcon />
                Products ({totalProducts})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition ${
                  activeTab === 'orders'
                    ? 'bg-[#073b70] text-white shadow-xs'
                    : 'text-[#073b70] hover:bg-[#edf7ff]'
                }`}
              >
                <OrdersIcon />
                Orders ({totalOrdersCount})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition ${
                  activeTab === 'settings'
                    ? 'bg-[#073b70] text-white shadow-xs'
                    : 'text-[#073b70] hover:bg-[#edf7ff]'
                }`}
              >
                <SettingsIcon />
                Settings
              </button>
            </div>

            <button
              type="button"
              onClick={refreshAllData}
              disabled={isLoadingOverall}
              className="flex items-center gap-2 rounded-xl border border-[#073b70]/20 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#073b70] hover:bg-[#edf7ff] disabled:opacity-50"
              title="Refresh store data"
            >
              <RefreshIcon />
              Refresh
            </button>

            {adminEmail && (
              <div className="hidden sm:flex flex-col items-end border-l border-[#073b70]/10 pl-3">
                <span className="text-[11px] font-bold text-[#073b70] truncate max-w-[160px]">
                  {adminEmail}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full mt-0.5">
                  Admin User
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-700 hover:bg-red-100 transition"
              title="Sign out of Admin Dashboard"
            >
              Logout
            </button>
          </div>
        </div>

        {/* FEEDBACK BANNER */}
        {feedback.message && (
          <div
            className={`mt-6 rounded-xl border p-4 text-xs font-semibold flex items-center justify-between ${
              feedback.type === 'error'
                ? 'border-red-200 bg-red-50 text-red-700'
                : 'border-green-200 bg-green-50 text-green-700'
            }`}
          >
            <span>{feedback.message}</span>
            <button
              type="button"
              onClick={() => setFeedback({ type: '', message: '' })}
              className="text-xs font-bold underline ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* LOADING INDICATOR */}
        {isLoadingOverall && (
          <div className="mt-6 rounded-xl border border-[#073b70]/10 bg-white p-4 text-center text-xs text-[#31506c] animate-pulse">
            Loading database metrics & settings from Supabase...
          </div>
        )}

        {/* TAB 1: OVERVIEW SCREEN */}
        {activeTab === 'overview' && (
          <div className="mt-8 space-y-8">
            
            {/* 7 DASHBOARD STATISTIC CARDS */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
              <div className="rounded-2xl border border-[#073b70]/10 bg-white p-5 shadow-xs flex flex-col justify-between">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#31506c]">Total Products</p>
                <p className="mt-2 text-2xl font-bold text-[#073b70]">{totalProducts}</p>
                <p className="mt-1 text-[10px] text-[#31506c]">Catalog items</p>
              </div>

              <div className="rounded-2xl border border-[#073b70]/10 bg-white p-5 shadow-xs flex flex-col justify-between">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#31506c]">Available</p>
                <p className="mt-2 text-2xl font-bold text-green-600">{availableProductsCount}</p>
                <p className="mt-1 text-[10px] text-[#31506c]">Active for checkout</p>
              </div>

              <div className="rounded-2xl border border-[#073b70]/10 bg-white p-5 shadow-xs flex flex-col justify-between">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#31506c]">Total Orders</p>
                <p className="mt-2 text-2xl font-bold text-[#073b70]">{totalOrdersCount}</p>
                <p className="mt-1 text-[10px] text-[#31506c]">Customer checkouts</p>
              </div>

              <div className="rounded-2xl border border-[#073b70]/10 bg-white p-5 shadow-xs flex flex-col justify-between">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#31506c]">Paid Orders</p>
                <p className="mt-2 text-2xl font-bold text-emerald-600">{paidOrdersCount}</p>
                <p className="mt-1 text-[10px] text-[#31506c]">Verified payments</p>
              </div>

              <div className="rounded-2xl border border-[#073b70]/10 bg-white p-5 shadow-xs flex flex-col justify-between">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#31506c]">Pending Orders</p>
                <p className="mt-2 text-2xl font-bold text-amber-600">{pendingOrdersCount}</p>
                <p className="mt-1 text-[10px] text-[#31506c]">Needs processing</p>
              </div>

              <div className="rounded-2xl border border-[#073b70]/10 bg-white p-5 shadow-xs flex flex-col justify-between">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#31506c]">Low Stock</p>
                <p className="mt-2 text-2xl font-bold text-red-600">{lowStockCount}</p>
                <p className="mt-1 text-[10px] text-[#31506c]">Sizes stock ≤ 3</p>
              </div>

              <div className="rounded-2xl border border-[#073b70]/10 bg-[#073b70] p-5 text-white shadow-md flex flex-col justify-between col-span-full xl:col-span-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#edf7ff]">Total Revenue</p>
                <p className="mt-2 text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</p>
                <p className="mt-1 text-[10px] text-[#edf7ff]">From paid orders</p>
              </div>
            </div>

            {/* MAIN DASHBOARD CONTENT GRID */}
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-8">
                {/* REVENUE BY MONTH */}
                <div className="rounded-2xl border border-[#073b70]/10 bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#073b70]/10 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <TrendingUpIcon />
                        <h3 className="font-serif text-xl font-bold">Revenue Overview</h3>
                      </div>
                      <p className="text-xs text-[#31506c] mt-0.5">
                        Earnings calculated strictly from verified paid customer orders
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#31506c]">Gross Revenue</p>
                      <p className="text-xl font-bold text-[#0064b8]">${totalRevenue.toFixed(2)}</p>
                    </div>
                  </div>

                  {sortedMonths.length === 0 ? (
                    <div className="py-8 text-center text-xs italic text-[#31506c]">
                      No verified revenue recorded yet. Paid customer checkouts will automatically populate revenue statistics.
                    </div>
                  ) : (
                    <div className="mt-5 space-y-3">
                      {sortedMonths.map((month) => {
                        const monthAmt = revenueByMonth[month]
                        const pct = totalRevenue > 0 ? (monthAmt / totalRevenue) * 100 : 0

                        return (
                          <div key={month} className="space-y-1">
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-[#073b70]">{month}</span>
                              <span className="font-mono font-bold text-[#0064b8]">
                                ${monthAmt.toFixed(2)}
                              </span>
                            </div>
                            <div className="h-2.5 w-full rounded-full bg-[#edf7ff]">
                              <div
                                className="h-2.5 rounded-full bg-[#073b70] transition-all duration-500"
                                style={{ width: `${Math.max(5, Math.min(100, pct))}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* RECENT ORDERS TABLE */}
                <div className="rounded-2xl border border-[#073b70]/10 bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#073b70]/10 pb-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold">Recent Orders</h3>
                      <p className="text-xs text-[#31506c] mt-0.5">
                        Latest customer purchases placed on Jovial Thrift Hub
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('orders')}
                      className="rounded-xl bg-[#edf7ff] px-4 py-2 text-xs font-bold text-[#073b70] hover:bg-[#073b70] hover:text-white transition"
                    >
                      View All Orders →
                    </button>
                  </div>

                  {recentOrders.length === 0 ? (
                    <div className="py-12 text-center text-xs italic text-[#31506c]">
                      No orders placed yet. Customer orders will appear here automatically.
                    </div>
                  ) : (
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#073b70]/10 text-[10px] uppercase tracking-wider text-[#31506c]">
                            <th className="py-3 px-2">Order Ref</th>
                            <th className="py-3 px-2">Customer</th>
                            <th className="py-3 px-2">Date</th>
                            <th className="py-3 px-2">Total</th>
                            <th className="py-3 px-2">Payment</th>
                            <th className="py-3 px-2">Status</th>
                            <th className="py-3 px-2 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#073b70]/10">
                          {recentOrders.map((o) => {
                            const dateStr = o.created_at
                              ? new Date(o.created_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                })
                              : 'N/A'

                            return (
                              <tr key={o.id} className="hover:bg-[#f8f5ef]/50">
                                <td className="py-3.5 px-2 font-mono font-bold text-[#073b70]">
                                  {o.order_number || o.id.slice(0, 8)}
                                </td>

                                <td className="py-3.5 px-2 font-semibold text-[#073b70]">
                                  {o.customer_name || 'Guest'}
                                </td>

                                <td className="py-3.5 px-2 text-[#31506c] whitespace-nowrap">
                                  {dateStr}
                                </td>

                                <td className="py-3.5 px-2 font-bold text-[#0064b8]">
                                  ${Number(o.total_amount || 0).toFixed(2)}
                                </td>

                                <td className="py-3.5 px-2">
                                  {renderPaymentStatusBadge(o)}
                                </td>

                                <td className="py-3.5 px-2">
                                  {renderOrderStatusBadge(o.status)}
                                </td>

                                <td className="py-3.5 px-2 text-right">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenOrderDetails(o)}
                                    className="p-1.5 text-[#073b70] hover:bg-[#edf7ff] rounded-lg"
                                    title="View order details"
                                  >
                                    <EyeIcon />
                                  </button>
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

              {/* RIGHT COLUMN: LOW STOCK ALERTS */}
              <div className="space-y-8">
                <div className="rounded-2xl border border-[#073b70]/10 bg-white p-6 shadow-xs h-fit">
                  <div className="flex items-center justify-between border-b border-[#073b70]/10 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                        <AlertTriangleIcon />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-bold">Low Stock Alert</h3>
                        <p className="text-[11px] text-[#31506c]">Stock quantity ≤ 3 units</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('products')}
                      className="text-xs font-bold text-[#073b70] hover:underline"
                    >
                      Manage Stock
                    </button>
                  </div>

                  {lowStockItems.length === 0 ? (
                    <div className="py-10 text-center text-xs italic text-green-700 bg-green-50 rounded-xl mt-4 border border-green-200 p-4">
                      ✓ All product sizes have healthy inventory levels!
                    </div>
                  ) : (
                    <div className="mt-4 space-y-3">
                      {lowStockItems.slice(0, 8).map((item, idx) => (
                        <div
                          key={`${item.productId}-${item.size}-${idx}`}
                          className="flex items-center justify-between gap-3 rounded-xl border border-[#073b70]/10 bg-[#f8f5ef] p-3 text-xs"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={item.productImage || '/hero/hero1.jpeg'}
                              alt={item.productName}
                              className="h-10 w-9 rounded-md object-cover bg-[#edf7ff] shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-bold text-[#073b70] truncate">{item.productName}</p>
                              <p className="text-[10px] text-[#31506c]">
                                Size: <span className="font-semibold">{item.size}</span>
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span
                              className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold ${
                                item.stock <= 0
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {item.stock <= 0 ? 'Out of stock' : `${item.stock} left`}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveTab('products')
                                handleOpenStockModal(item.productRef)
                              }}
                              className="block mt-1 text-[10px] font-bold text-[#073b70] hover:underline text-right w-full"
                            >
                              Restock →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT TAB */}
        {activeTab === 'products' && (
          <div className="mt-8 rounded-2xl border border-[#073b70]/10 bg-white p-6 sm:p-8 shadow-xs">
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
                  className="flex items-center gap-2 rounded-xl bg-[#073b70] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#052d56]"
                >
                  <PlusIcon />
                  Add Product
                </button>
              </div>
            </div>

            {loadingProducts ? (
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
                                <p className="text-[10px] text-[#31506c] truncate max-w-xs">
                                  {p.description || 'No description'}
                                </p>
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
        )}

        {/* TAB 3: CUSTOMER ORDERS MANAGEMENT TAB */}
        {activeTab === 'orders' && (
          <div className="mt-8 rounded-2xl border border-[#073b70]/10 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col justify-between gap-4 border-b border-[#073b70]/10 pb-6 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-serif text-2xl font-bold">Orders Management</h2>
                <p className="mt-1 text-xs text-[#31506c]">
                  Showing {filteredOrders.length} of {orders.length} customer orders
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <input
                  type="text"
                  placeholder="Search ref #, name, phone..."
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  className="min-w-64 rounded-xl border border-[#073b70]/15 bg-[#f8f5ef] px-4 py-2 text-xs outline-none focus:border-[#073b70]"
                />

                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="rounded-xl border border-[#073b70]/15 bg-[#f8f5ef] px-3 py-2 text-xs outline-none focus:border-[#073b70]"
                >
                  <option value="All">All Statuses</option>
                  {ORDER_STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {ordersError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
                {ordersError}
              </div>
            )}

            {loadingOrders ? (
              <div className="py-16 text-center text-[#31506c]">
                <p className="font-serif text-lg italic">Loading customer orders...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-serif text-2xl font-bold text-[#073b70]">No customer orders found.</p>
                <p className="mt-2 text-xs text-[#31506c]">
                  {orderSearchQuery || orderStatusFilter !== 'All'
                    ? 'Try clearing your search or status filter.'
                    : 'Customer orders will appear here once checkout orders are placed.'}
                </p>
              </div>
            ) : (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#073b70]/10 text-[10px] uppercase tracking-wider text-[#31506c]">
                      <th className="py-3 px-3">Order Ref</th>
                      <th className="py-3 px-3">Customer</th>
                      <th className="py-3 px-3">Phone</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Items</th>
                      <th className="py-3 px-3">Total</th>
                      <th className="py-3 px-3">Payment</th>
                      <th className="py-3 px-3">Order Status</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#073b70]/10">
                    {filteredOrders.map((o) => {
                      const itemCount =
                        o.order_items && Array.isArray(o.order_items)
                          ? o.order_items.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0)
                          : 1
                      const dateStr = o.created_at
                        ? new Date(o.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : 'N/A'

                      return (
                        <tr key={o.id} className="hover:bg-[#f8f5ef]/50">
                          <td className="py-4 px-3 font-mono font-bold text-[#073b70]">
                            {o.order_number || o.id.slice(0, 8)}
                          </td>

                          <td className="py-4 px-3 font-semibold text-[#073b70]">
                            {o.customer_name || 'Guest Customer'}
                          </td>

                          <td className="py-4 px-3 text-[#31506c]">
                            {o.customer_phone || 'N/A'}
                          </td>

                          <td className="py-4 px-3 text-[#31506c] whitespace-nowrap">
                            {dateStr}
                          </td>

                          <td className="py-4 px-3 font-bold text-[#073b70]">
                            {itemCount} {itemCount === 1 ? 'item' : 'items'}
                          </td>

                          <td className="py-4 px-3 font-bold text-[#0064b8]">
                            ${Number(o.total_amount || 0).toFixed(2)}
                          </td>

                          <td className="py-4 px-3">
                            {renderPaymentStatusBadge(o)}
                          </td>

                          <td className="py-4 px-3">
                            {renderOrderStatusBadge(o.status)}
                          </td>

                          <td className="py-4 px-3 text-right">
                            <button
                              type="button"
                              onClick={() => handleOpenOrderDetails(o)}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-[#073b70] px-3 py-1.5 text-[11px] font-bold text-white transition hover:bg-[#052d56]"
                            >
                              <EyeIcon />
                              View Order
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: STORE SETTINGS MANAGEMENT TAB */}
        {activeTab === 'settings' && (
          <div className="mt-8 rounded-2xl border border-[#073b70]/10 bg-white p-6 sm:p-8 shadow-xs">
            <div className="border-b border-[#073b70]/10 pb-6">
              <h2 className="font-serif text-2xl font-bold">Store Settings</h2>
              <p className="mt-1 text-xs text-[#31506c]">
                Manage store branding, contact information, delivery fees, checkout rules, and store availability.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="mt-6 space-y-8">
              
              {/* SECTION 1: STORE AVAILABILITY & ANNOUNCEMENT */}
              <div className="rounded-xl border border-[#073b70]/10 bg-[#edf7ff] p-5 space-y-4">
                <h3 className="font-serif text-base font-bold text-[#073b70] flex items-center justify-between">
                  <span>Store Status & Global Announcement</span>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase ${storeSettings.is_store_open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {storeSettings.is_store_open ? '● Store Open' : '● Store Closed'}
                  </span>
                </h3>

                <div className="grid gap-4 sm:grid-cols-2 items-center">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="is_store_open_toggle"
                      checked={storeSettings.is_store_open}
                      onChange={(e) => setStoreSettings({ ...storeSettings, is_store_open: e.target.checked })}
                      className="h-5 w-5 accent-[#073b70] cursor-pointer"
                    />
                    <label htmlFor="is_store_open_toggle" className="text-xs font-bold text-[#073b70] cursor-pointer">
                      Store Open for Customer Orders
                      <span className="block text-[11px] font-normal text-[#31506c]">
                        Uncheck to temporarily pause checkout. Customers can still browse products.
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#073b70] mb-1">
                      Top Bar Announcement Text
                    </label>
                    <input
                      type="text"
                      value={storeSettings.announcement}
                      onChange={(e) => setStoreSettings({ ...storeSettings, announcement: e.target.value })}
                      placeholder="e.g. Free shipping on orders over $50!"
                      className="w-full rounded-lg border border-[#073b70]/20 bg-white px-4 py-2 text-xs outline-none focus:border-[#073b70]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: STORE BRANDING */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#073b70] border-b border-[#073b70]/10 pb-2">
                  Store Information & Branding
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#073b70] mb-1">Store Name *</label>
                    <input
                      type="text"
                      required
                      value={storeSettings.store_name}
                      onChange={(e) => setStoreSettings({ ...storeSettings, store_name: e.target.value })}
                      className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-2.5 text-xs outline-none focus:border-[#073b70]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#073b70] mb-1">Tagline</label>
                    <input
                      type="text"
                      value={storeSettings.tagline}
                      onChange={(e) => setStoreSettings({ ...storeSettings, tagline: e.target.value })}
                      className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-2.5 text-xs outline-none focus:border-[#073b70]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: CONTACT INFORMATION */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#073b70] border-b border-[#073b70]/10 pb-2">
                  Contact Information
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#073b70] mb-1">WhatsApp / Contact Phone *</label>
                    <input
                      type="text"
                      required
                      value={storeSettings.whatsapp_number}
                      onChange={(e) => setStoreSettings({ ...storeSettings, whatsapp_number: e.target.value })}
                      placeholder="+2348000000000"
                      className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-2.5 text-xs outline-none focus:border-[#073b70]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#073b70] mb-1">Store Email Address *</label>
                    <input
                      type="email"
                      required
                      value={storeSettings.email}
                      onChange={(e) => setStoreSettings({ ...storeSettings, email: e.target.value })}
                      placeholder="contact@jovialthrifthub.com"
                      className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-2.5 text-xs outline-none focus:border-[#073b70]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: DELIVERY & CHECKOUT RULES */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#073b70] border-b border-[#073b70]/10 pb-2">
                  Delivery & Checkout Rules
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#073b70] mb-1">
                      Default Delivery Fee ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      value={storeSettings.delivery_fee}
                      onChange={(e) => setStoreSettings({ ...storeSettings, delivery_fee: e.target.value })}
                      className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-2.5 text-xs font-bold outline-none focus:border-[#073b70]"
                    />
                    <p className="text-[10px] text-[#31506c] mt-1">
                      This fee is automatically applied during customer checkout.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#073b70] mb-1">
                      Minimum Order Amount ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={storeSettings.minimum_order_amount}
                      onChange={(e) => setStoreSettings({ ...storeSettings, minimum_order_amount: e.target.value })}
                      className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-2.5 text-xs font-bold outline-none focus:border-[#073b70]"
                    />
                    <p className="text-[10px] text-[#31506c] mt-1">
                      Set to 0 to disable minimum order restriction.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#073b70] mb-1">Delivery Information Text</label>
                  <textarea
                    rows="3"
                    value={storeSettings.delivery_info}
                    onChange={(e) => setStoreSettings({ ...storeSettings, delivery_info: e.target.value })}
                    placeholder="Delivery timeline and instructions..."
                    className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-2.5 text-xs outline-none focus:border-[#073b70] resize-none"
                  />
                </div>
              </div>

              {/* SECTION 5: SOCIAL LINKS */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#073b70] border-b border-[#073b70]/10 pb-2">
                  Social Media Handles
                </h3>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#073b70] mb-1">Instagram URL</label>
                    <input
                      type="url"
                      value={storeSettings.instagram_url}
                      onChange={(e) => setStoreSettings({ ...storeSettings, instagram_url: e.target.value })}
                      placeholder="https://instagram.com/..."
                      className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-2.5 text-xs outline-none focus:border-[#073b70]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#073b70] mb-1">Facebook URL</label>
                    <input
                      type="url"
                      value={storeSettings.facebook_url}
                      onChange={(e) => setStoreSettings({ ...storeSettings, facebook_url: e.target.value })}
                      placeholder="https://facebook.com/..."
                      className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-2.5 text-xs outline-none focus:border-[#073b70]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#073b70] mb-1">Twitter / X URL</label>
                    <input
                      type="url"
                      value={storeSettings.twitter_url}
                      onChange={(e) => setStoreSettings({ ...storeSettings, twitter_url: e.target.value })}
                      placeholder="https://x.com/..."
                      className="w-full rounded-lg border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-2.5 text-xs outline-none focus:border-[#073b70]"
                    />
                  </div>
                </div>
              </div>

              {/* SAVE BUTTON */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="rounded-xl bg-[#073b70] px-8 py-3 text-xs font-bold text-white transition hover:bg-[#052d56] disabled:opacity-60 shadow-md"
                >
                  {savingSettings ? 'Saving Settings...' : 'Save Settings'}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>

      {/* ORDER DETAILS & STATUS MANAGEMENT MODAL */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-[#073b70]/10 bg-[#073b70] px-6 py-4 text-white shrink-0">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#edf7ff]">Order Details</p>
                <h3 className="font-serif text-xl font-bold font-mono">
                  {selectedOrder.order_number || selectedOrder.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowOrderModal(false)}
                className="text-white hover:opacity-80"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="rounded-xl border border-[#073b70]/15 bg-[#edf7ff] p-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#31506c]">Payment Verification</p>
                  <div className="mt-1 flex items-center gap-2">
                    {renderPaymentStatusBadge(selectedOrder)}
                    {selectedOrder.payment_reference && (
                      <span className="text-xs font-mono text-[#31506c]">
                        Ref: {selectedOrder.payment_reference}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#073b70] mb-1">
                      Update Order Status:
                    </label>
                    <select
                      value={selectedOrder.status || 'Pending'}
                      disabled={updatingOrderStatus}
                      onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, e.target.value)}
                      className="rounded-lg border border-[#073b70]/30 bg-white px-3 py-1.5 text-xs font-bold text-[#073b70] outline-none focus:ring-2 focus:ring-[#073b70]"
                    >
                      {ORDER_STATUS_OPTIONS.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                  {updatingOrderStatus && (
                    <span className="text-xs font-semibold text-[#073b70] animate-pulse">
                      Updating...
                    </span>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[#073b70]/10 bg-[#f8f5ef] p-4 space-y-2">
                  <h4 className="font-serif text-sm font-bold text-[#073b70] border-b border-[#073b70]/10 pb-1">
                    Customer Details
                  </h4>
                  <p className="text-xs">
                    <span className="font-bold text-[#073b70]">Full Name: </span>
                    {selectedOrder.customer_name || 'Guest'}
                  </p>
                  <p className="text-xs">
                    <span className="font-bold text-[#073b70]">Phone Number: </span>
                    {selectedOrder.customer_phone || 'N/A'}
                  </p>
                  <p className="text-xs">
                    <span className="font-bold text-[#073b70]">Delivery Address: </span>
                    {selectedOrder.delivery_address || 'N/A'}
                  </p>
                  <p className="text-xs">
                    <span className="font-bold text-[#073b70]">City: </span>
                    {selectedOrder.city || 'N/A'}
                  </p>
                  <p className="text-xs text-[#31506c]">
                    <span className="font-bold text-[#073b70]">Customer Note: </span>
                    {selectedOrder.order_note || 'None'}
                  </p>
                </div>

                <div className="rounded-xl border border-[#073b70]/10 bg-[#f8f5ef] p-4 space-y-2">
                  <h4 className="font-serif text-sm font-bold text-[#073b70] border-b border-[#073b70]/10 pb-1">
                    Order Details
                  </h4>
                  <p className="text-xs">
                    <span className="font-bold text-[#073b70]">Reference Number: </span>
                    <span className="font-mono">{selectedOrder.order_number || selectedOrder.id}</span>
                  </p>
                  <p className="text-xs">
                    <span className="font-bold text-[#073b70]">Order Date: </span>
                    {selectedOrder.created_at
                      ? new Date(selectedOrder.created_at).toLocaleString()
                      : 'N/A'}
                  </p>
                  <p className="text-xs">
                    <span className="font-bold text-[#073b70]">Payment Reference: </span>
                    <span className="font-mono text-[11px]">
                      {selectedOrder.payment_reference || 'N/A'}
                    </span>
                  </p>
                  <p className="text-xs">
                    <span className="font-bold text-[#073b70]">Payment Channel: </span>
                    {selectedOrder.payment_channel || 'Online Transfer / Paystack'}
                  </p>
                  <p className="text-xs">
                    <span className="font-bold text-[#073b70]">Payment Time: </span>
                    {selectedOrder.paid_at
                      ? new Date(selectedOrder.paid_at).toLocaleString()
                      : 'Pending Verification'}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-base font-bold text-[#073b70] mb-3">
                  Purchased Items
                </h4>

                {loadingOrderItems ? (
                  <p className="py-6 text-center text-xs italic text-[#31506c]">
                    Loading ordered products...
                  </p>
                ) : selectedOrderItems.length === 0 ? (
                  <p className="py-4 text-xs italic text-[#31506c]">
                    No product details found for this order.
                  </p>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-[#073b70]/10">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#edf7ff]">
                        <tr className="border-b border-[#073b70]/10 text-[10px] uppercase tracking-wider text-[#31506c]">
                          <th className="py-2.5 px-3">Item</th>
                          <th className="py-2.5 px-3">Size</th>
                          <th className="py-2.5 px-3">Qty</th>
                          <th className="py-2.5 px-3">Unit Price</th>
                          <th className="py-2.5 px-3 text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#073b70]/10 bg-white">
                        {selectedOrderItems.map((item) => (
                          <tr key={item.id}>
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.products?.image_url || '/hero/hero1.jpeg'}
                                  alt={item.product_name}
                                  className="h-10 w-9 rounded-md object-cover bg-[#edf7ff]"
                                />
                                <span className="font-bold text-[#073b70]">
                                  {item.product_name}
                                </span>
                              </div>
                            </td>

                            <td className="py-3 px-3">
                              <span className="rounded bg-[#f8f5ef] px-2 py-0.5 font-semibold text-[#073b70]">
                                {item.size || 'One Size'}
                              </span>
                            </td>

                            <td className="py-3 px-3 font-bold text-[#073b70]">
                              {item.quantity}
                            </td>

                            <td className="py-3 px-3 text-[#31506c]">
                              ${Number(item.unit_price).toFixed(2)}
                            </td>

                            <td className="py-3 px-3 text-right font-bold text-[#0064b8]">
                              ${Number(item.subtotal || item.unit_price * item.quantity).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <div className="w-full max-w-xs rounded-xl border border-[#073b70]/10 bg-[#f8f5ef] p-4 space-y-2 text-xs">
                  <div className="flex justify-between text-[#31506c]">
                    <span>Items Subtotal</span>
                    <span className="font-semibold">${Number(selectedOrder.subtotal || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#31506c]">
                    <span>Delivery Fee</span>
                    <span className="font-semibold">${Number(selectedOrder.shipping_fee || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#073b70]/15 pt-2 text-sm font-bold text-[#073b70]">
                    <span>Total Amount</span>
                    <span className="text-[#0064b8]">${Number(selectedOrder.total_amount || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#073b70]/10 bg-white p-4 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setShowOrderModal(false)}
                className="rounded-lg bg-[#073b70] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#052d56]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

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