import React, { useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()

        setLoading(true)
        setError('')

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        const { data: admin, error: adminError } = await supabase
            .from('admin_users')
            .select('id, email')
            .eq('id', data.user.id)
            .single()

        if (adminError || !admin) {
            await supabase.auth.signOut()
            setError('You do not have admin access.')
            setLoading(false)
            return
        }

        window.location.href = '/Admin'
    }

    return (
        <main className="min-h-screen bg-[#f8f5ef] flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <p className="text-sm uppercase tracking-[0.25em] text-[#31506c] mb-3">
                        Jovial Thrift Hub
                    </p>

                    <h1 className="text-4xl font-bold text-[#073b70]">
                        Admin Login
                    </h1>

                    <p className="mt-3 text-[#31506c]">
                        Sign in to manage your showroom.
                    </p>
                </div>

                <div className="bg-white border border-[#d9e3ea] rounded-2xl p-7 shadow-sm">

                    <form onSubmit={handleLogin} className="space-y-5">

                        <div>
                            <label className="block text-sm font-semibold text-[#073b70] mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                required
                                className="w-full rounded-xl border border-[#d9e3ea] px-4 py-3 outline-none focus:border-[#073b70]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#073b70] mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                className="w-full rounded-xl border border-[#d9e3ea] px-4 py-3 outline-none focus:border-[#073b70]"
                            />
                        </div>

                        {error && (
                            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-[#073b70] px-5 py-3.5 font-semibold text-white transition hover:bg-[#052d56] disabled:opacity-60"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>

                    </form>

                </div>

            </div>
        </main>
    )
}

export default AdminLogin