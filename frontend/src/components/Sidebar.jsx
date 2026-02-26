export default function Sidebar({ isOpen }) {
    const navItems = [
        {
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                </svg>
            ), label: 'Dashboard', active: true,
        },
    ]

    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <span>Main Menu</span>
            </div>
            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <div key={item.label} className={`sidebar-item ${item.active ? 'active' : ''}`}>
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                ))}
            </nav>
            <div className="sidebar-footer">
                <div className="sidebar-version">v1.0.0</div>
            </div>
        </aside>
    )
}
