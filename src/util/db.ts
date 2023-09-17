import type { Category } from '~/types/base'

export function buildTags(data: any[]): Category[] {
  const result: Category[] = []
  data.forEach((item) => {
    const { id, name, parent_id, user_id, comment, order } = item
    result.push({
      id, name, parent_id, user_id, comment, order,
    })
  })
  return result
}
