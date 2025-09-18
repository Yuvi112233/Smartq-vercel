import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'
import { env } from '@/lib/env'

// Server-side Supabase client with service role key for admin operations
// Only use this on the server side for operations that require elevated permissions
export function createServerClient() {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for server-side operations')
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