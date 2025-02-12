import { useCallback } from 'react'
import { useInView } from 'react-intersection-observer'

interface UseInfiniteScrollOptions {
  onLoadMore: () => void
  isLoading: boolean
  hasError: boolean
  rootMargin?: string
  threshold?: number
  delay?: number
}

export const useInfiniteScroll = ({
  onLoadMore,
  isLoading,
  hasError,
  rootMargin = '500px',
  threshold = 0,
  delay = 100,
}: UseInfiniteScrollOptions) => {
  const handleInView = useCallback(
    (inView: boolean) => {
      if (inView && !isLoading && !hasError) {
        onLoadMore()
      }
    },
    [isLoading, hasError, onLoadMore],
  )

  const { ref } = useInView({
    threshold,
    rootMargin,
    delay,
    onChange: handleInView,
  })

  return { ref }
}
