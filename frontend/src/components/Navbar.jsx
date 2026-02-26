import { useAuth } from '../context/AuthContext'

export default function Navbar({ onMenuToggle }) {
    const { user, logout } = useAuth()

    return (
        <header className="navbar">
            <button className="menu-toggle" onClick={onMenuToggle} id="menu-toggle-btn" aria-label="Toggle menu">
                <span></span><span></span><span></span>
            </button>
            <div className="navbar-brand">
                <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                    <rect width="40" height="40" rx="10" fill="url(#ng)" />
                    <path d="M10 14h20M10 20h20M10 26h12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="30" cy="26" r="5" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2" />
                    <path d="M28 26l1.5 1.5L32 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <defs>
                        <linearGradient id="ng" x1="0" y1="0" x2="40" y2="40">
                            <stop stopColor="#6366f1" /><stop offset="1" stopColor="#8b5cf6" />
                        </linearGradient>
                    </defs>
                </svg>
                <span>Inventory MS</span>
            </div>
            <div className="navbar-right">
                <div className="user-badge">
                    <div className="user-avatar">{user?.username?.[0]?.toUpperCase() || 'A'}</div>
                    <div className="user-info">
                        <span className="user-name">{user?.username}</span>
                        <span className="user-role">{user?.role}</span>
                    </div>
                </div>
                <button className="btn-logout" onClick={logout} id="logout-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                </button>
            </div>
        </header>
    )
}
