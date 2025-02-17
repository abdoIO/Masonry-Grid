import { useState, useEffect, useCallback, useRef } from 'react'
import { MasonryItem, UseMasonryLayoutProps, MasonryLayoutResult } from '../types/components'

export const useMasonryLayout = ({
  items,
  columnCount,
  containerWidth,
  gap,
  scrollTop,
  viewportHeight,
  overscan = 2,
}: UseMasonryLayoutProps): MasonryLayoutResult => {
  const [layout, setLayout] = useState<MasonryItem[]>([])
  const [totalHeight, setTotalHeight] = useState(0)
  const [visibleItems, setVisibleItems] = useState<MasonryItem[]>([])
  const columnHeights = useRef<number[]>(Array(columnCount).fill(0))
  const columnWidth = (containerWidth - gap * (columnCount - 1)) / columnCount

  const calculateLayout = useCallback(() => {
    const newLayout: MasonryItem[] = []
    columnHeights.current = Array(columnCount).fill(0)

    items.forEach((item) => {
      const shortestColumn = columnHeights.current.reduce(
        (shortest, height, index) => (height < columnHeights.current[shortest] ? index : shortest),
        0,
      )

      const itemHeight = (columnWidth * item.height) / item.width

      const left = shortestColumn * (columnWidth + gap)
      const top = columnHeights.current[shortestColumn]

      newLayout.push({
        id: item.id,
        height: itemHeight,
        width: columnWidth,
        top,
        left,
        columnIndex: shortestColumn,
      })

      columnHeights.current[shortestColumn] += itemHeight + gap
    })

    const maxHeight = Math.max(...columnHeights.current)
    setTotalHeight(maxHeight)
    setLayout(newLayout)
  }, [items, columnCount, columnWidth, gap])

  const updateVisibleItems = useCallback(() => {
    const visibleStart = Math.max(0, scrollTop - viewportHeight * overscan)
    const visibleEnd = scrollTop + viewportHeight * (overscan + 1)

    const visible = layout.filter((item) => item.top < visibleEnd && item.top + item.height > visibleStart)

    setVisibleItems(visible)
  }, [layout, scrollTop, viewportHeight, overscan])

  useEffect(() => {
    calculateLayout()
  }, [calculateLayout])

  useEffect(() => {
    updateVisibleItems()
  }, [updateVisibleItems])

  return {
    layout,
    totalHeight,
    visibleItems,
  }
}
