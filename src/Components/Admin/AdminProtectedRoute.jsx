import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

const AdminProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const checkAdmin = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()

            if (!user) {
                setLoading(false)
                return
            }

            const { data: admin, error } = await supabase
                .from('admin_users')
                .select('id')
                .eq('id', user.id)
                .maybeSingle()

            if (!error && admin) {
                setIsAdmin(true)
            }

            setLoading(false)
        }

        checkAdmin()
    }, [])

    if (loading) {
        return (
            <main className="min-h-screen bg-[#f8f5ef] flex items-center justify-center">
                <p className="text-[#073b70] font-semibold">
                    Checking access...
                </p>
            </main>
        )
    }

    if (!isAdmin) {
        return <Navigate to="/Admin" replace />
    }

    return children
}

export default AdminProtectedRoute