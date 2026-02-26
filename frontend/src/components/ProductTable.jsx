export default function ProductTable({ products, onEdit, onDelete, loading, wrapperRef }) {
    const getStatusBadge = (status) => (
        <span className={`badge badge--${status}`}>{status}</span>
    )

    const getStockBadge = (qty) => {
        if (qty === 0) return <span className="badge badge--danger">Out of Stock</span>
        if (qty < 10) return <span className="badge badge--warning">Low Stock</span>
        return null
    }

    if (loading) {
        return (
            <div className="table-loading">
                <div className="spinner"></div>
                <p>Loading products...</p>
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className="table-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
                <p>No products found.</p>
            </div>
        )
    }

    return (
        <div className="table-wrapper" ref={wrapperRef}>
            <table className="product-table" id="product-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>SKU</th>
                        <th>Qty</th>
                        <th>Price (฿)</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p, idx) => (
                        <tr key={p.id} className="product-row">
                            <td className="td-num">{idx + 1}</td>
                            <td className="td-name">
                                <strong>{p.name}</strong>
                                {getStockBadge(p.quantity)}
                            </td>
                            <td><span className="category-tag">{p.category}</span></td>
                            <td className="td-sku">{p.sku || '—'}</td>
                            <td className={`td-qty ${p.quantity < 10 ? 'qty-low' : ''}`}>{p.quantity}</td>
                            <td className="td-price">฿{parseFloat(p.price).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</td>
                            <td>{getStatusBadge(p.status)}</td>
                            <td className="td-actions">
                                <button
                                    className="btn-icon btn-icon--edit"
                                    onClick={() => onEdit(p)}
                                    title="Edit product"
                                    id={`edit-btn-${p.id}`}
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                </button>
                                <button
                                    className="btn-icon btn-icon--delete"
                                    onClick={() => onDelete(p)}
                                    title="Delete product"
                                    id={`delete-btn-${p.id}`}
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" />
                                        <path d="M10 11v6M14 11v6M9 6V4h6v2" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
