import React, { memo, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { ImageWrapper, ImageCard, ImageContainer } from '../styles/PhotoContainer.styles'
import { useImageSize } from '../../../hooks/useImageSize'
import { useImageLoading } from '../../../hooks/useImageLoading'
import { getOptimizedImageUrl } from '../../../utils/imageOptimization'
import { areLazyPropsEqual } from '../../../utils/propComparison'
import { ImageError } from './ImageError'
import { LazyImageProps } from '../../../types/components'

export const LazyImage = memo<LazyImageProps>(({ photo, columnCount }) => {
  const imageSize = useImageSize(columnCount)
  const aspectRatio = photo.height / photo.width

  const imageSrc = useMemo(() => {
    const baseUrl = photo.src.original
    return getOptimizedImageUrl(baseUrl, imageSize, 'medium')
  }, [photo.src.original, imageSize])

  const { isLoaded, hasError, handleLoad, handleError, retry } = useImageLoading(imageSrc)

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px 0px',
  })

  return (
    <ImageWrapper>
      <Link ref={ref} to={`/photo/${photo.id}`}>
        {inView && (
          <ImageContainer $aspectRatio={aspectRatio} $backgroundColor={photo.avg_color}>
            <ImageCard
              loading='lazy'
              decoding='async'
              src={imageSrc}
              alt={photo.photographer}
              onLoad={handleLoad}
              onError={handleError}
              aria-label={`Photo by ${photo.photographer}`}
              $isLoaded={isLoaded}
            />
            {hasError && <ImageError aspectRatio={aspectRatio} onRetry={retry} />}
          </ImageContainer>
        )}
      </Link>
    </ImageWrapper>
  )
}, areLazyPropsEqual)

LazyImage.displayName = 'LazyImage'
