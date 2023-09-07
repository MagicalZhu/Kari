import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'

export interface UseFirebaseAuthOptions {
  client: SupabaseClient
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export function useSupabase() {
  const client = createClient(supabaseUrl, supabaseAnonKey)

  async function LoginWithGithub() {
    const authData = await client.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3333',
      },
    })
    if (authData.error)
      console.error(authData.error)
  }
  async function logout() {
    const { error } = await client.auth.signOut()
    if (error)
      console.error(error)
  }

  async function getSession() {
    const {
      data: { session },
    } = await client.auth.getSession()
    return session
  }

  return {
    client,
    LoginWithGithub,
    logout,
    getSession,
  }
}
