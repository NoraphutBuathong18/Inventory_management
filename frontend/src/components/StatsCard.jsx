export default function StatsCard({ title, value, subtitle, icon, color }) {
    return (
        <div className={`stats-card stats-card--${color}`}>
            <div className="stats-card__icon">{icon}</div>
            <div className="stats-card__body">
                <p className="stats-card__title">{title}</p>
                <h3 className="stats-card__value">{value}</h3>
                {subtitle && <p className="stats-card__subtitle">{subtitle}</p>}
            </div>
        </div>
    )
}
