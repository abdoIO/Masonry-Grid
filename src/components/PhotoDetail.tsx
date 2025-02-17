import React, { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useSinglePhoto } from '../hooks/usePhoto'
import { useLoadingContext } from '../context/LoadingContext'
import { useImageLoading } from '../hooks/useImageLoading'
import { ImageError } from './shared/PhotoComponents'
import {
  DetailContainer,
  DetailImage,
  BackButton,
  PhotoInfo,
  PhotoTitle,
  PhotoMetadata,
  ExternalLink,
  ImageContainer,
} from './shared/styles/PhotoDetail.styles'

const PhotoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { photo } = useSinglePhoto(id || '')
  const { loading, error } = useLoadingContext()

  const { isLoaded, hasError, handleLoad, handleError, retry } = useImageLoading(photo?.src.original || '')

  if (error && !photo) {
    return (
      <DetailContainer>
        <BackButton to='/'>← Back to Gallery</BackButton>
        <PhotoInfo>
          <PhotoTitle>Error</PhotoTitle>
          <PhotoMetadata>{error}</PhotoMetadata>
        </PhotoInfo>
      </DetailContainer>
    )
  }

  if (loading.api || !photo) {
    return (
      <DetailContainer>
        <BackButton to='/'>← Back to Gallery</BackButton>
        <PhotoInfo>
          <PhotoTitle>Loading...</PhotoTitle>
        </PhotoInfo>
      </DetailContainer>
    )
  }

  return (
    <DetailContainer>
      <BackButton to='/'>← Back to Gallery</BackButton>
      <ImageContainer>
        <DetailImage
          src={photo.src.original}
          alt={photo.alt || photo.photographer}
          loading='eager'
          onLoad={handleLoad}
          onError={handleError}
          $isLoaded={isLoaded}
        />
        {hasError && <ImageError aspectRatio={photo.height / photo.width} onRetry={retry} />}
      </ImageContainer>
      <PhotoInfo>
        <PhotoTitle>{photo.alt || 'Untitled'}</PhotoTitle>
        <PhotoMetadata>Photographer: {photo.photographer}</PhotoMetadata>
        <PhotoMetadata>
          Dimensions: {photo.width} × {photo.height}
        </PhotoMetadata>
        <ExternalLink href={photo.url} target='_blank' rel='noopener noreferrer'>
          View on Pexels
        </ExternalLink>
      </PhotoInfo>
    </DetailContainer>
  )
}

export default memo(PhotoDetail)
