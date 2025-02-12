import { useMemo, useState, useEffect, useCallback } from 'react'

export const useColumnCount = (debounceMs: number = 250) => {
  const [width, setWidth] = useState(window.innerWidth)

  const handleResize = useCallback(() => {
    let timeoutId: NodeJS.Timeout | null = null

    const debouncedResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth)
        timeoutId = null
      }, debounceMs)
    }

    return debouncedResize
  }, [debounceMs])

  useEffect(() => {
    const resizeListener = handleResize()
    window.addEventListener('resize', resizeListener)
    return () => window.removeEventListener('resize', resizeListener)
  }, [handleResize])

  return useMemo(() => {
    if (width <= 600) return 1
    if (width <= 1024) return 2
    return 3
  }, [width])
}

export const useAboveFold = (columnCount: number, itemHeight: number = 300) => {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight)

  const handleResize = useCallback(() => {
    let timeoutId: NodeJS.Timeout | null = null

    const debouncedResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        setViewportHeight(window.innerHeight)
        timeoutId = null
      }, 250)
    }

    return debouncedResize
  }, [])

  useEffect(() => {
    const resizeListener = handleResize()
    window.addEventListener('resize', resizeListener)
    return () => window.removeEventListener('resize', resizeListener)
  }, [handleResize])

  return useMemo(() => {
    const rowCount = Math.ceil(viewportHeight / itemHeight)
    return rowCount * columnCount
  }, [columnCount, itemHeight, viewportHeight])
}
