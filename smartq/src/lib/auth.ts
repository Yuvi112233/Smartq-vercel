import { supabase } from '@/lib/supabase/client'
import type { User, AuthError } from '@supabase/supabase-js'

export interface SignUpData {
    email: string
    password: string
    name: string
    phone?: string
    role: 'customer' | 'salon_owner'
}

export interface SignInData {
    email: string
    password: string
}

export interface AuthResponse {
    user: User | null
    error: AuthError | null
}

// Client-side authentication functions
export const authClient = {
    // Sign up new user
    async signUp(data: SignUpData): Promise<AuthResponse> {
        const { data: authData, error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    name: data.name,
                    phone: data.phone,
                    role: data.role,
                }
            }
        })

        if (error) {
            return { user: null, error }
        }

        // Profile creation will be handled by database triggers or separate API call
        // For now, user metadata contains the profile information

        return { user: authData.user, error: null }
    },

    // Sign in existing user
    async signIn(data: SignInData): Promise<AuthResponse> {
        const { data: authData, error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        })

        return { user: authData.user, error }
    },

    // Sign out user
    async signOut(): Promise<{ error: AuthError | null }> {
        const { error } = await supabase.auth.signOut()
        return { error }
    },

    // Get current user
    async getUser(): Promise<{ user: User | null; error: AuthError | null }> {
        const { data, error } = await supabase.auth.getUser()
        return { user: data.user, error }
    },

    // Get current session
    async getSession() {
        const { data, error } = await supabase.auth.getSession()
        return { session: data.session, error }
    },

    // Reset password
    async resetPassword(email: string): Promise<{ error: AuthError | null }> {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
        })
        return { error }
    },

    // Update password
    async updatePassword(password: string): Promise<{ error: AuthError | null }> {
        const { error } = await supabase.auth.updateUser({ password })
        return { error }
    },

    // Listen to auth state changes
    onAuthStateChange(callback: (event: string, session: any) => void) {
        return supabase.auth.onAuthStateChange(callback)
    }
}

// Note: Server-side auth functions are in separate API routes to avoid client/server conflicts

// Utility functions
export const authUtils = {
    // Check if user has specific role
    hasRole(user: User | null, role: string): boolean {
        return user?.user_metadata?.role === role
    },

    // Get user profile data
    getUserProfile(user: User | null) {
        return {
            id: user?.id,
            email: user?.email,
            name: user?.user_metadata?.name,
            phone: user?.user_metadata?.phone,
            role: user?.user_metadata?.role,
        }
    },

    // Check if user is salon owner
    isSalonOwner(user: User | null): boolean {
        return this.hasRole(user, 'salon_owner')
    },

    // Check if user is customer
    isCustomer(user: User | null): boolean {
        return this.hasRole(user, 'customer')
    }
}