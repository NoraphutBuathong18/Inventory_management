export default function SearchBar({ search, onSearchChange, category, onCategoryChange, categories }) {
    return (
        <div className="search-bar" id="search-bar">
            <div className="search-input-wrap">
                <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="search-input"
                />
                {search && (
                    <button className="search-clear" onClick={() => onSearchChange('')}>✕</button>
                )}
            </div>

            <select
                id="category-filter"
                className="category-select"
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
        </div>
    )
}
