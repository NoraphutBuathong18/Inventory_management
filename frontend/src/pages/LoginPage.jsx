import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({ username: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.username.trim() || !form.password.trim()) {
            setError('Please fill in all fields.')
            return
        }
        setLoading(true)
        try {
            await login(form.username, form.password)
            navigate('/dashboard')
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-bg">
            <div className="login-card">
                <div className="login-logo">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="12" fill="url(#grad)" />
                        <path d="M10 14h20M10 20h20M10 26h12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="30" cy="26" r="5" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2" />
                        <path d="M28 26l1.5 1.5L32 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        <defs>
                            <linearGradient id="grad" x1="0" y1="0" x2="40" y2="40">
                                <stop stopColor="#6366f1" />
                                <stop offset="1" stopColor="#8b5cf6" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <h1 className="login-title">Inventory System</h1>
                <p className="login-subtitle">Sign in to your admin panel</p>

                <form onSubmit={handleSubmit} className="login-form" id="login-form">
                    {error && <div className="login-error" id="login-error">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="username">Username or Email</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="admin"
                            value={form.username}
                            onChange={handleChange}
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                            <input
                                id="password"
                                name="password"
                                type={showPass ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                            />
                            <button type="button" className="show-pass" onClick={() => setShowPass(!showPass)}>
                                {showPass ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    <button id="login-btn" type="submit" className="btn-login" disabled={loading}>
                        {loading ? <span className="spinner-sm"></span> : 'Sign In'}
                    </button>
                </form>

                <p className="login-hint">Default: <strong>admin</strong> / <strong>admin123</strong></p>
            </div>
        </div>
    )
}
