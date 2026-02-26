import { useEffect, useState } from 'react'

export default function Toast({ message, type = 'success', onClose }) {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const t = setTimeout(() => {
            setVisible(false)
            setTimeout(onClose, 300)
        }, 3000)
        return () => clearTimeout(t)
    }, [onClose])

    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️',
    }

    return (
        <div className={`toast toast--${type} ${visible ? 'toast--visible' : 'toast--hidden'}`}>
            <span className="toast-icon">{icons[type]}</span>
            <span className="toast-msg">{message}</span>
            <button className="toast-close" onClick={() => { setVisible(false); setTimeout(onClose, 300) }}>✕</button>
        </div>
    )
}
