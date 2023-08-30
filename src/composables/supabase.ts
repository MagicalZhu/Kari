import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'

const { setLoginData } = useSupabaseStore()

export interface UseFirebaseAuthOptions {
  client: SupabaseClient
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export function useSupabase() {
  const client = createClient(supabaseUrl, supabaseAnonKey)

  async function signInWithGitHub() {
    const authData = await client.auth.signInWithOAuth({
      provider: 'github',
    })
    setLoginData(authData)
    if (authData.error)
      console.error(authData.error)
  }
  async function signout() {
    const { error } = await client.auth.signOut()
    if (error)
      console.error(error)
  }

  return {
    client,
    signInWithGitHub,
    signout,
  }
}
