import { useMemo } from 'react'
import { Photo } from '../types/image'
import { createSkeletonItem } from '../utils/skeleton'
import { SKELETON_COUNT_MULTIPLIER } from '../constants/layout'

interface UseItemsWithSkeletonsProps {
  photos: Photo[]
  isGlobalLoading: boolean
  isApiLoading: boolean
  columnCount: number
}

export const useItemsWithSkeletons = ({
  photos,
  isGlobalLoading,
  isApiLoading,
  columnCount,
}: UseItemsWithSkeletonsProps) => {
  return useMemo(() => {
    if (isGlobalLoading && photos.length === 0) {
      return Array(columnCount * SKELETON_COUNT_MULTIPLIER)
        .fill(null)
        .map((_, i) => createSkeletonItem(i))
    }

    if (isApiLoading) {
      return [
        ...photos,
        ...Array(columnCount)
          .fill(null)
          .map((_, i) => createSkeletonItem(i)),
      ]
    }

    return photos
  }, [photos, isGlobalLoading, isApiLoading, columnCount])
}
