import { SkeletonItem } from '../types/components'

export const createSkeletonItem = (index: number): SkeletonItem => ({
  id: -1 - index, // Negative IDs for skeletons to avoid conflicts
  width: 1,
  height: 1,
  isSkeleton: true,
  url: '',
  photographer: '',
  photographer_url: '',
  photographer_id: 0,
  avg_color: '#f0f0f0',
  src: {
    original: '',
    large: '',
    medium: '',
    small: '',
  },
  liked: false,
  alt: '',
})
