import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'

export interface UseFirebaseAuthOptions {
  client: SupabaseClient
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export function useSupabase() {
  const client = createClient(supabaseUrl, supabaseAnonKey)
  return {
    client,
  }
}
