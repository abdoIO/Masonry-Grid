import { useState, useCallback, useEffect, SyntheticEvent } from 'react'
import { useLoadingContext } from '../context/LoadingContext'

interface UseImageLoadingResult {
  isLoaded: boolean
  hasError: boolean
  handleLoad: () => void
  handleError: (event: SyntheticEvent<HTMLImageElement, Event> | Error) => void
  retry: () => void
}

export const useImageLoading = (src: string): UseImageLoadingResult => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const { handleError: handleGlobalError } = useLoadingContext()

  useEffect(() => {
    setIsLoaded(false)
    setHasError(false)
  }, [src])

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
    setHasError(false)
  }, [])

  const handleError = useCallback(
    (errorOrEvent: SyntheticEvent<HTMLImageElement, Event> | Error) => {
      setIsLoaded(false)
      setHasError(true)
      if (errorOrEvent instanceof Error) {
        handleGlobalError(errorOrEvent)
      } else {
        handleGlobalError(new Error(`Failed to load image: ${src}`))
      }
    },
    [handleGlobalError, src],
  )

  const retry = useCallback(() => {
    setIsLoaded(false)
    setHasError(false)
    const img = new Image()
    img.src = src
    img.onload = handleLoad
    img.onerror = () => handleError(new Error(`Failed to load image: ${src}`))
  }, [src, handleLoad, handleError])

  return {
    isLoaded,
    hasError,
    handleLoad,
    handleError,
    retry,
  }
}
