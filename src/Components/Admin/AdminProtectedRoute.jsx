import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

const AdminProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        let isMounted = true

        const checkAdminAccess = async (sessionUser) => {
            if (!sessionUser) {
                if (isMounted) {
                    setIsAdmin(false)
                    setLoading(false)
                }
                return
            }

            try {
                const { data: admin, error } = await supabase
                    .from('admin_users')
                    .select('id')
                    .eq('id', sessionUser.id)
                    .maybeSingle()

                if (isMounted) {
                    if (!error && admin) {
                        setIsAdmin(true)
                    } else {
                        // User is authenticated in Supabase but not in admin_users table
                        setIsAdmin(false)
                        await supabase.auth.signOut()
                    }
                    setLoading(false)
                }
            } catch (err) {
                console.error('Error checking admin user record:', err)
                if (isMounted) {
                    setIsAdmin(false)
                    setLoading(false)
                }
            }
        }

        // Initial session check
        supabase.auth.getUser().then(({ data: { user } }) => {
            checkAdminAccess(user)
        })

        // Listen for Auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
                if (isMounted) {
                    setIsAdmin(false)
                    setLoading(false)
                }
            } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
                checkAdminAccess(session?.user)
            }
        })

        return () => {
            isMounted = false
            subscription.unsubscribe()
        }
    }, [])

    if (loading) {
        return (
            <main className="min-h-screen bg-[#f8f5ef] flex items-center justify-center">
                <div className="text-center p-6 bg-white rounded-2xl border border-[#073b70]/10 shadow-sm max-w-sm">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#073b70] border-t-transparent mb-3"></div>
                    <p className="text-[#073b70] font-bold text-sm">
                        Verifying Admin Authorization...
                    </p>
                    <p className="text-xs text-[#31506c] mt-1">
                        Securing Jovial Thrift Hub session
                    </p>
                </div>
            </main>
        )
    }

    if (!isAdmin) {
        return <Navigate to="/Admin" replace />
    }

    return children
}

export default AdminProtectedRoute