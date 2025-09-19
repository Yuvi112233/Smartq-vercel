'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'customer' | 'salon_owner'
  redirectTo?: string
}

export default function ProtectedRoute({
  children,
  requiredRole,
  redirectTo
}: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        const currentPath = window.location.pathname
        router.push(`/auth/login?redirectTo=${encodeURIComponent(currentPath)}`)
        return
      }

      // If role is required and user doesn't have it
      if (requiredRole && user?.user_metadata?.role !== requiredRole) {
        if (redirectTo) {
          router.push(redirectTo)
        } else {
          // Default redirects based on role
          if (user?.user_metadata?.role === 'salon_owner') {
            router.push('/salon/dashboard')
          } else {
            router.push('/dashboard')
          }
        }
        return
      }
    }
  }, [user, loading, isAuthenticated, requiredRole, redirectTo, router])

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render children if not authenticated or wrong role
  if (!isAuthenticated || (requiredRole && user?.user_metadata?.role !== requiredRole)) {
    return null
  }

  return <>{children}</>
}