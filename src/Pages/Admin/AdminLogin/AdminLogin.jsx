import React, { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabaseClient'

const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    // Forgot password state
    const [showForgotPassword, setShowForgotPassword] = useState(false)
    const [resetEmail, setResetEmail] = useState('')
    const [resetLoading, setResetLoading] = useState(false)
    const [resetMessage, setResetMessage] = useState('')

    // If already authenticated as admin, auto-redirect to Dashboard
    useEffect(() => {
        const checkExistingSession = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data: admin } = await supabase
                    .from('admin_users')
                    .select('id')
                    .eq('id', user.id)
                    .maybeSingle()

                if (admin) {
                    window.location.href = '/Admin/Dashboard'
                }
            }
        }
        checkExistingSession()
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()

        setLoading(true)
        setError('')
        setSuccessMessage('')

        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password,
            })

            if (authError) {
                setError(authError.message || 'Invalid email or password.')
                setLoading(false)
                return
            }

            if (!data?.user) {
                setError('Authentication failed. Please try again.')
                setLoading(false)
                return
            }

            // Verify if user is listed in admin_users table
            const { data: admin, error: adminError } = await supabase
                .from('admin_users')
                .select('id, email')
                .eq('id', data.user.id)
                .maybeSingle()

            if (adminError || !admin) {
                // Reject & sign out non-admin users immediately
                await supabase.auth.signOut()
                setError('Access Denied: This account does not have store administrator privileges.')
                setLoading(false)
                return
            }

            setSuccessMessage('Admin authentication verified! Redirecting to dashboard...')
            window.location.href = '/Admin/Dashboard'
        } catch (err) {
            console.error('Login exception:', err)
            setError(err.message || 'An unexpected error occurred during login.')
            setLoading(false)
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()
        setResetLoading(true)
        setResetMessage('')
        setError('')

        try {
            const { error: resetErr } = await supabase.auth.resetPasswordForEmail(
                resetEmail.trim(),
                {
                    redirectTo: `${window.location.origin}/Admin`,
                }
            )

            if (resetErr) throw resetErr

            setResetMessage('Password reset email sent! Please check your email inbox for instructions.')
        } catch (err) {
            console.error('Reset password error:', err)
            setResetMessage(`Error: ${err.message || 'Failed to send password reset email.'}`)
        } finally {
            setResetLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-[#f8f5ef] flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#31506c] mb-3">
                        Jovial Thrift Hub Management
                    </p>

                    <h1 className="font-serif text-4xl font-bold text-[#073b70]">
                        Admin Login
                    </h1>

                    <p className="mt-2 text-xs text-[#31506c]">
                        Sign in to access store controls, orders, products, and settings.
                    </p>
                </div>

                <div className="bg-white border border-[#073b70]/15 rounded-2xl p-7 shadow-sm">

                    {!showForgotPassword ? (
                        <form onSubmit={handleLogin} className="space-y-5">

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#073b70] mb-2">
                                    Admin Email
                                </label>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@jovialthrifthub.com"
                                    required
                                    className="w-full rounded-xl border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-3 text-xs outline-none focus:border-[#073b70] focus:bg-white"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#073b70]">
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setResetEmail(email)
                                            setShowForgotPassword(true)
                                        }}
                                        className="text-[11px] text-[#073b70] font-semibold hover:underline"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter admin password"
                                    required
                                    className="w-full rounded-xl border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-3 text-xs outline-none focus:border-[#073b70] focus:bg-white"
                                />
                            </div>

                            {error && (
                                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs font-semibold text-red-600">
                                    {error}
                                </div>
                            )}

                            {successMessage && (
                                <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-xs font-semibold text-green-700">
                                    {successMessage}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-[#073b70] px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#052d56] disabled:opacity-60 shadow-xs"
                            >
                                {loading ? 'Signing in...' : 'Sign In to Dashboard'}
                            </button>

                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword} className="space-y-5">
                            <div className="flex justify-between items-center border-b border-[#073b70]/10 pb-3">
                                <h3 className="font-serif text-lg font-bold text-[#073b70]">Reset Admin Password</h3>
                                <button
                                    type="button"
                                    onClick={() => setShowForgotPassword(false)}
                                    className="text-xs text-[#31506c] hover:underline font-semibold"
                                >
                                    Back to Login
                                </button>
                            </div>

                            <p className="text-xs text-[#31506c]">
                                Enter your admin email address below to receive a password reset link via Supabase Auth.
                            </p>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#073b70] mb-2">
                                    Admin Email
                                </label>

                                <input
                                    type="email"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                    placeholder="admin@jovialthrifthub.com"
                                    required
                                    className="w-full rounded-xl border border-[#073b70]/20 bg-[#f8f5ef] px-4 py-3 text-xs outline-none focus:border-[#073b70] focus:bg-white"
                                />
                            </div>

                            {resetMessage && (
                                <div className={`rounded-xl px-4 py-3 text-xs font-semibold ${resetMessage.startsWith('Error') ? 'bg-red-50 border border-red-200 text-red-600' : 'bg-green-50 border border-green-200 text-green-700'}`}>
                                    {resetMessage}
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowForgotPassword(false)}
                                    className="w-1/2 rounded-xl border border-[#073b70]/20 py-3 text-xs font-semibold text-[#073b70]"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={resetLoading}
                                    className="w-1/2 rounded-xl bg-[#073b70] py-3 text-xs font-bold text-white hover:bg-[#052d56] disabled:opacity-60"
                                >
                                    {resetLoading ? 'Sending...' : 'Send Reset Link'}
                                </button>
                            </div>
                        </form>
                    )}

                </div>

            </div>
        </main>
    )
}

export default AdminLogin