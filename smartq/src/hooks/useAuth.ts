'use client'

import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { authClient, authUtils } from '@/lib/auth'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { session } = await authClient.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = authClient.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    const { user: authUser, error } = await authClient.signIn({ email, password })
    
    if (authUser) {
      setUser(authUser)
    }
    
    setLoading(false)
    return { error }
  }

  const signUp = async (data: any) => {
    setLoading(true)
    const { user: authUser, error } = await authClient.signUp(data)
    
    if (authUser) {
      setUser(authUser)
    }
    
    setLoading(false)
    return { error }
  }

  const signOut = async () => {
    setLoading(true)
    await authClient.signOut()
    setUser(null)
    setLoading(false)
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
    isSalonOwner: authUtils.isSalonOwner(user),
    isCustomer: authUtils.isCustomer(user)
  }
}