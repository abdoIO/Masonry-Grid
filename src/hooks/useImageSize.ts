import { useMemo } from 'react'
import { ImageSize } from '../types/image'

export const useImageSize = (columnCount: number = 3): ImageSize => {
  return useMemo(() => {
    const screenWidth = window.innerWidth
    const maxWidth = 1200
    const padding = 32
    const gaps = (columnCount - 1) * 16

    const effectiveWidth = Math.min(screenWidth - padding, maxWidth - padding)
    const columnWidth = Math.floor((effectiveWidth - gaps) / columnCount)

    if (columnWidth <= 500) return 'small'
    if (columnWidth <= 800) return 'medium'
    if (columnWidth <= 1200) return 'large'
    return 'original'
  }, [columnCount])
}
