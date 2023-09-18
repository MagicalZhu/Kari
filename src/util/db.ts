import type { SelectOption, TreeOption } from 'naive-ui'
import * as Enumerable from 'linq-es2015'
import type { Category } from '~/types/base'

export function takeTags(tags: any[]): Category[] {
  const result: Category[] = []
  tags.forEach((item) => {
    const { id, name, parent_id, user_id, comment, order } = item
    result.push({
      id, name, parent_id, user_id, comment, order,
    })
  })
  return result
}

export function displayTags(tags: Category[], level: number = 2): TreeOption[] {
  const result: TreeOption[] = Enumerable.from(tags)
    .Where(item => item.parent_id === null)
    .GroupJoin(
      tags,
      (item1) => { return item1.id },
      (item2) => { return item2.parent_id },
      (item1, item2) => {
        return {
          label: item1.name,
          key: item1.id,
          children: Enumerable.from(item2)
            .Select((c) => {
              return { key: c.id, label: c.name }
            }).ToArray(),
        }
      },
    ).ToArray()
  return result
}

export function getParentLevelOptions(tags: Category[]): SelectOption[] {
  const result: SelectOption[] = []
  tags.forEach((item) => {
    const { id, name, parent_id } = item
    if (!parent_id)
      result.push({ label: name, value: id, type: 'warning' })
  })
  return result
}

export function getChildrenLevelOptions(tags: Category[], parentId: number): SelectOption[] {
  const result: SelectOption[] = []
  tags.forEach((item) => {
    const { id, name, parent_id } = item
    if (parent_id && parent_id === parentId)
      result.push({ label: name, value: id, type: 'warning' })
  })
  return result
}
