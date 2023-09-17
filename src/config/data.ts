import type { TreeOption } from 'naive-ui'

const TagsData: TreeOption[] = [
  {
    label: '0',
    key: '0',
    children: [
      {
        label: '0-0',
        key: '0-0',
        children: [
          { label: '0-0-0', key: '0-0-0' },
          { label: '0-0-1', key: '0-0-1' },
        ],
      },
      {
        label: '0-1',
        key: '0-1',
        children: [
          { label: '0-1-0', key: '0-1-0' },
          { label: '0-1-1', key: '0-1-1' },
        ],
      },
    ],
  },
  {
    label: '1',
    key: '1',
    children: [
      {
        label: '1-0',
        key: '1-0',
        children: [
          { label: '1-0-0', key: '1-0-0' },
          { label: '1-0-1', key: '1-0-1' },
        ],
      },
      {
        label: '1-1',
        key: '1-1',
        children: [
          { label: '1-1-0', key: '1-1-0' },
          { label: '1-1-1', key: '1-1-1' },
        ],
      },
    ],
  },
]

const songs = [
  {
    label: 'Drive My Car',
    value: 'song1',
    type: 'success',
  },
  {
    label: 'Norwegian Wood',
    value: 'song2',
    type: 'success',
  },
  {
    label: 'You Won\'t See',
    value: 'song3',
    type: 'success',
  },
  {
    label: 'Nowhere Man',
    value: 'song4',
    type: 'warning',
  },
  {
    label: 'Think For Yourself',
    value: 'song5',
    type: 'error',
  },
]

export const MockData = {
  TagsData,
  songs,
}
