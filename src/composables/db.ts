import type { SupabaseClient } from '@supabase/supabase-js'

export function useTable(client: SupabaseClient) {
  const { userId } = useUserStore()
  async function getCategory() {
    const relationsRes = await client.from('category')
      .select('*')
      .match({
        user_id: userId,
      })
    console.error(relationsRes)
  }

  return {
    getCategory,
  }
}
