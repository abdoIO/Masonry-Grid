import React, { memo, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ImageWrapper, ImageCard, ImageContainer } from '../styles/PhotoContainer.styles'
import { useImageSize } from '../../../hooks/useImageSize'
import { useImageLoading } from '../../../hooks/useImageLoading'
import { getOptimizedImageUrl } from '../../../utils/imageOptimization'
import { areEagerPropsEqual } from '../../../utils/propComparison'
import { ImageError } from './ImageError'
import { EagerImageProps } from '../../../types/components'

export const EagerImage = memo<EagerImageProps>(({ photo, columnCount, index }) => {
  const imageSize = useImageSize(columnCount)
  const aspectRatio = photo.height / photo.width

  const imageSrc = useMemo(() => {
    const baseUrl = photo.src.original
    return getOptimizedImageUrl(baseUrl, imageSize, 'high')
  }, [photo.src.original, imageSize])

  const { isLoaded, hasError, handleLoad, handleError, retry } = useImageLoading(imageSrc)

  return (
    <ImageWrapper>
      <Link to={`/photo/${photo.id}`}>
        <ImageContainer $aspectRatio={aspectRatio} $backgroundColor={photo.avg_color}>
          <ImageCard
            src={imageSrc}
            alt={photo.photographer}
            onLoad={handleLoad}
            onError={handleError}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            decoding='async'
            loading='eager'
            aria-label={`Photo by ${photo.photographer}`}
            $isLoaded={isLoaded}
          />
          {hasError && <ImageError aspectRatio={aspectRatio} onRetry={retry} />}
        </ImageContainer>
      </Link>
    </ImageWrapper>
  )
}, areEagerPropsEqual)

EagerImage.displayName = 'EagerImage'
