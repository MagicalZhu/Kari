import type { SupabaseClient } from '@supabase/supabase-js'

export function useTable(client: SupabaseClient) {
  const { userId } = useUserStore()
  async function getCategory(): Promise<any[] | null> {
    const relationsRes = await client.from('category')
      .select('*')
      .match({
        user_id: userId,
      })
    console.error(relationsRes)
    return relationsRes.data
  }

  return {
    getCategory,
  }
}
