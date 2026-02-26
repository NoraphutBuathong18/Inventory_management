import { useState, useEffect } from 'react'

const EMPTY = { name: '', category: '', description: '', quantity: '', price: '', sku: '', status: 'active' }

export default function ProductModal({ isOpen, product, onSave, onClose, categories }) {
    const [form, setForm] = useState(EMPTY)
    const [errors, setErrors] = useState({})
    const [saving, setSaving] = useState(false)
    const isEdit = !!product?.id

    useEffect(() => {
        if (isOpen) {
            setForm(product ? { ...product, quantity: product.quantity?.toString(), price: product.price?.toString() } : EMPTY)
            setErrors({})
        }
    }, [isOpen, product])

    if (!isOpen) return null

    const validate = () => {
        const errs = {}
        if (!form.name.trim()) errs.name = 'Name is required.'
        if (!form.category.trim()) errs.category = 'Category is required.'
        if (form.quantity === '' || isNaN(form.quantity) || parseInt(form.quantity) < 0) errs.quantity = 'Valid quantity required.'
        if (form.price === '' || isNaN(form.price) || parseFloat(form.price) < 0) errs.price = 'Valid price required.'
        return errs
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: '' })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length) { setErrors(errs); return }
        setSaving(true)
        try {
            await onSave({ ...form, quantity: parseInt(form.quantity), price: parseFloat(form.price) })
        } finally {
            setSaving(false)
        }
    }

    const allCategories = [...new Set([...categories, form.category].filter(Boolean))]

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()} id="product-modal">
                <div className="modal-header">
                    <h2>{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <form onSubmit={handleSubmit} className="modal-body" id="product-form">
                    <div className="form-grid">

                        <div className="form-group">
                            <label>Product Name *</label>
                            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Wireless Keyboard" id="input-name" />
                            {errors.name && <span className="field-error">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label>Category *</label>
                            <input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Electronics"
                                list="categories-list" id="input-category" />
                            <datalist id="categories-list">
                                {allCategories.map(c => <option key={c} value={c} />)}
                            </datalist>
                            {errors.category && <span className="field-error">{errors.category}</span>}
                        </div>

                        <div className="form-group">
                            <label>Quantity *</label>
                            <input name="quantity" type="number" min="0" value={form.quantity} onChange={handleChange} placeholder="0" id="input-quantity" />
                            {errors.quantity && <span className="field-error">{errors.quantity}</span>}
                        </div>

                        <div className="form-group">
                            <label>Price (฿) *</label>
                            <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="0.00" id="input-price" />
                            {errors.price && <span className="field-error">{errors.price}</span>}
                        </div>

                        <div className="form-group">
                            <label>SKU</label>
                            <input name="sku" value={form.sku} onChange={handleChange} placeholder="e.g. ELEC-KB-001" id="input-sku" />
                        </div>

                        <div className="form-group">
                            <label>Status</label>
                            <select name="status" value={form.status} onChange={handleChange} id="input-status">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="form-group form-group--full">
                            <label>Description</label>
                            <textarea name="description" value={form.description} onChange={handleChange}
                                placeholder="Product description..." rows={3} id="input-description" />
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={saving} id="save-product-btn">
                            {saving ? <span className="spinner-sm"></span> : (isEdit ? 'Save Changes' : 'Add Product')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
