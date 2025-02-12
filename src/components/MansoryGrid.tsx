import React, { memo, useMemo } from 'react'
import styled from 'styled-components'
import { useInfinitePhotos } from '../hooks/usePhoto'
import { EagerImage, LazyImage } from './shared/PhotoComponents'
import { useLoadingContext } from '../context/LoadingContext'
import { MasonryContainer, LoaderContainer } from './shared/styles/Layout.styles'
import { useColumnCount, useAboveFold } from '../hooks/useLayout'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { Photo } from '../types/image'
import { LoadingFallback } from './shared/loading/LoadingFallback'

const LoadingText = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
`

const MasonryGrid: React.FC = () => {
  const { photos, loadMorePhotos } = useInfinitePhotos('nature')
  const { loading, error } = useLoadingContext()
  const columnCount = useColumnCount()
  const aboveFoldCount = useAboveFold(columnCount)

  const { ref: loaderRef } = useInfiniteScroll({
    onLoadMore: loadMorePhotos,
    isLoading: loading.api,
    hasError: !!error,
  })

  const renderPhotos = useMemo(() => {
    return photos.map((photo: Photo, index: number) =>
      index < aboveFoldCount ? (
        <EagerImage key={photo.id} photo={photo} columnCount={columnCount} index={index} />
      ) : (
        <LazyImage key={photo.id} photo={photo} columnCount={columnCount} />
      ),
    )
  }, [photos, aboveFoldCount, columnCount])

  if (error && photos.length === 0) {
    return <LoadingFallback message={error} />
  }

  if (loading.global && photos.length === 0) {
    return <LoadingFallback message='Loading images...' />
  }

  return (
    <MasonryContainer>
      {renderPhotos}
      <LoaderContainer ref={loaderRef}>
        {loading.api && <LoadingText>Loading more images...</LoadingText>}
      </LoaderContainer>
    </MasonryContainer>
  )
}

export default memo(MasonryGrid)
