import 'server-only'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'
import { env } from '@/lib/env'

// Server-side Supabase client with user auth context for regular server operations
// Uses anon key with user session - respects RLS policies
export function createServerClient() {
  return createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

// Helper to get a client with user context from cookies (for SSR/API routes)
export function createServerClientWithAuth(supabaseAccessToken?: string) {
  const client = createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      global: {
        headers: supabaseAccessToken ? {
          Authorization: `Bearer ${supabaseAccessToken}`
        } : {}
      }
    }
  )
  
  return client
}

// INTERNAL USE ONLY: Service role client for OTP, notifications, and system operations
// This bypasses RLS - use ONLY for trusted internal operations
export function createServiceRoleClient() {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for service role operations')
  }
  
  return createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}