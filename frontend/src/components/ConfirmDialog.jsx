export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }) {
    if (!isOpen) return null
    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="confirm-dialog" onClick={(e) => e.stopPropagation()} id="confirm-dialog">
                <div className="confirm-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                    </svg>
                </div>
                <h3 className="confirm-title">{title}</h3>
                <p className="confirm-message">{message}</p>
                <div className="confirm-actions">
                    <button className="btn btn-ghost" onClick={onCancel} id="confirm-cancel-btn">Cancel</button>
                    <button className="btn btn-danger" onClick={onConfirm} id="confirm-delete-btn">Delete</button>
                </div>
            </div>
        </div>
    )
}
