'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/ui/Button'
import { authUtils } from '@/lib/auth'

export default function AuthStatus() {
  const { user, isAuthenticated, signOut } = useAuth()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    setLoading(true)
    await signOut()
    router.push('/')
    setLoading(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-4">
        <Link href="/auth/login">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </Link>
        <Link href="/auth/signup">
          <Button size="sm">
            Sign Up
          </Button>
        </Link>
      </div>
    )
  }

  const userProfile = authUtils.getUserProfile(user)

  return (
    <div className="flex items-center space-x-4">
      <div className="text-sm text-gray-700">
        <span className="font-medium">{userProfile.name || userProfile.email}</span>
        {userProfile.role && (
          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {userProfile.role === 'salon_owner' ? 'Salon Owner' : 'Customer'}
          </span>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        {userProfile.role === 'salon_owner' ? (
          <Link href="/salon/dashboard">
            <Button variant="outline" size="sm">
              Dashboard
            </Button>
          </Link>
        ) : (
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              Dashboard
            </Button>
          </Link>
        )}
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSignOut}
          loading={loading}
        >
          Sign Out
        </Button>
      </div>
    </div>
  )
}