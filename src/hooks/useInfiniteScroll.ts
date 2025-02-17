import { useCallback, useState } from 'react'
import { UseInfiniteScrollProps, UseInfiniteScrollResult } from '../types/components'

export const useInfiniteScroll = ({
  onLoadMore,
  isLoading,
  threshold = 1000,
}: UseInfiniteScrollProps): UseInfiniteScrollResult => {
  const [scrollTop, setScrollTop] = useState(0)

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const container = e.currentTarget
      setScrollTop(container.scrollTop)

      const scrollBottom = container.scrollTop + container.clientHeight
      const scrollThreshold = container.scrollHeight - threshold

      if (scrollBottom >= scrollThreshold && !isLoading) {
        onLoadMore()
      }
    },
    [onLoadMore, isLoading, threshold],
  )

  return {
    scrollTop,
    handleScroll,
  }
}
