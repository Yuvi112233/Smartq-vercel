import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'
import { env, validateEnvironment } from '@/lib/env'

// Validate environment variables on client creation
if (typeof window !== 'undefined') {
  validateEnvironment()
}

export const supabase = createClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Client-side auth helpers
export const auth = supabase.auth
export const db = supabase
export const storage = supabase.storage
export const realtime = supabase.realtime