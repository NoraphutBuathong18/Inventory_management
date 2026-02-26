import { useState, useEffect, useCallback, useRef } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import StatsCard from '../components/StatsCard'
import ProductTable from '../components/ProductTable'
import ProductModal from '../components/ProductModal'
import ConfirmDialog from '../components/ConfirmDialog'
import SearchBar from '../components/SearchBar'
import Toast from '../components/Toast'
import { productAPI } from '../services/api'

export default function DashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [stats, setStats] = useState({ totalProducts: 0, totalValue: 0, lowStockCount: 0, totalCategories: 0 })
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 })
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')
    const tableWrapperRef = useRef(null)

    const [modalOpen, setModalOpen] = useState(false)
    const [editProduct, setEditProduct] = useState(null)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [deleteTarget, setDeleteTarget] = useState(null)
    const [toasts, setToasts] = useState([])

    const addToast = (message, type = 'success') => {
        const id = Date.now()
        setToasts((prev) => [...prev, { id, message, type }])
    }

    const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id))

    const fetchProducts = useCallback(async (page = 1) => {
        setLoading(true)
        try {
            const res = await productAPI.getAll({ search, category: categoryFilter, page, limit: 50, sort: 'created_at', order: 'DESC' })
            setProducts(res.data.data)
            setPagination(res.data.pagination)
            setCategories(res.data.categories)
        } catch {
            addToast('Failed to load products.', 'error')
        } finally {
            setLoading(false)
        }
    }, [search, categoryFilter])

    const fetchStats = useCallback(async () => {
        try {
            const res = await productAPI.getStats()
            setStats(res.data)
        } catch { }
    }, [])

    useEffect(() => {
        fetchProducts(1)
        fetchStats()
    }, [fetchProducts, fetchStats])

    const handleSave = async (formData) => {
        try {
            if (editProduct?.id) {
                await productAPI.update(editProduct.id, formData)
                addToast('Product updated successfully!')
            } else {
                await productAPI.create(formData)
                addToast('Product added successfully!')
            }
            setModalOpen(false)
            setEditProduct(null)
            await fetchProducts(1)
            fetchStats()
            // Scroll table back to top so new/updated product is visible
            if (tableWrapperRef.current) tableWrapperRef.current.scrollTop = 0
        } catch (err) {
            addToast(err.response?.data?.message || 'Failed to save product.', 'error')
            throw err
        }
    }

    const handleEdit = (product) => {
        setEditProduct(product)
        setModalOpen(true)
    }

    const handleDeleteClick = (product) => {
        setDeleteTarget(product)
        setConfirmOpen(true)
    }

    const handleDeleteConfirm = async () => {
        try {
            await productAPI.delete(deleteTarget.id)
            addToast(`"${deleteTarget.name}" deleted.`)
            setConfirmOpen(false)
            setDeleteTarget(null)
            fetchProducts(pagination.page)
            fetchStats()
        } catch {
            addToast('Failed to delete product.', 'error')
        }
    }

    const formatCurrency = (v) => '฿' + parseFloat(v).toLocaleString('th-TH', { minimumFractionDigits: 2 })

    return (
        <div className="app-layout">
            <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
            <div className="app-body">
                <Sidebar isOpen={sidebarOpen} />
                {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

                <main className="main-content">
                    <div className="page-header">
                        <div>
                            <h1 className="page-title">Dashboard</h1>
                            <p className="page-subtitle">Manage your inventory products</p>
                        </div>
                        <button className="btn btn-primary" onClick={() => { setEditProduct(null); setModalOpen(true) }} id="add-product-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Add Product
                        </button>
                    </div>

                    {/* Stats Row */}
                    <div className="stats-grid">
                        <StatsCard title="Total Products" value={stats.totalProducts}
                            subtitle="All items in inventory" color="blue"
                            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>}
                        />
                        <StatsCard title="Total Value" value={formatCurrency(stats.totalValue)}
                            subtitle="Combined inventory value" color="green"
                            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>}
                        />
                        <StatsCard title="Categories" value={stats.totalCategories}
                            subtitle="Product categories" color="purple"
                            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>}
                        />
                        <StatsCard title="Low Stock" value={stats.lowStockCount}
                            subtitle="Items below 10 units" color="orange"
                            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>}
                        />
                    </div>

                    {/* Search + Filter */}
                    <div className="table-card">
                        <div className="table-card__header">
                            <SearchBar
                                search={search} onSearchChange={(v) => { setSearch(v) }}
                                category={categoryFilter} onCategoryChange={(v) => { setCategoryFilter(v) }}
                                categories={categories}
                            />
                            <span className="result-count">{pagination.total} product{pagination.total !== 1 ? 's' : ''}</span>
                        </div>

                        <ProductTable products={products} loading={loading} onEdit={handleEdit} onDelete={handleDeleteClick} wrapperRef={tableWrapperRef} />

                        {/* Pagination */}
                        {pagination.totalPages >= 1 && (
                            <div className="pagination">
                                <button className="btn btn-ghost btn-sm"
                                    disabled={pagination.page <= 1}
                                    onClick={() => fetchProducts(pagination.page - 1)}>← Prev</button>
                                <span className="pagination-info">Page {pagination.page} of {pagination.totalPages}</span>
                                <button className="btn btn-ghost btn-sm"
                                    disabled={pagination.page >= pagination.totalPages}
                                    onClick={() => fetchProducts(pagination.page + 1)}>Next →</button>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            <ProductModal
                isOpen={modalOpen}
                product={editProduct}
                categories={categories}
                onSave={handleSave}
                onClose={() => { setModalOpen(false); setEditProduct(null) }}
            />

            <ConfirmDialog
                isOpen={confirmOpen}
                title="Delete Product"
                message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
                onConfirm={handleDeleteConfirm}
                onCancel={() => { setConfirmOpen(false); setDeleteTarget(null) }}
            />

            {/* Toast Stack */}
            <div className="toast-container">
                {toasts.map((t) => (
                    <Toast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />
                ))}
            </div>
        </div>
    )
}
