import React, { useRef, memo } from 'react'
import { useInfinitePhotos } from '../hooks/usePhoto'
import { useLoadingContext } from '../context/LoadingContext'
import { useMasonryLayout } from '../hooks/useMasonryLayout'
import { useColumnCount } from '../hooks/useLayout'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { useContainerWidth } from '../hooks/useContainerWidth'
import { useItemsWithSkeletons } from '../hooks/useItemsWithSkeletons'
import { MasonryItem } from './masonry/MasonryItem'
import { MasonrySkeleton } from './masonry/MasonrySkeleton'
import { Container, MasonryWrapper, ErrorContainer } from './shared/styles/MasonryGrid.styles'
import { GRID_GAP, GRID_OVERSCAN } from '../constants/layout'

const MasonryGrid: React.FC = () => {
  const { photos, loadMorePhotos } = useInfinitePhotos('nature')
  const { loading, error } = useLoadingContext()
  const containerRef = useRef<HTMLDivElement>(null)
  const columnCount = useColumnCount()
  const containerWidth = useContainerWidth(containerRef)

  const { scrollTop, handleScroll } = useInfiniteScroll({
    onLoadMore: loadMorePhotos,
    isLoading: loading.api,
  })

  const items = useItemsWithSkeletons({
    photos,
    isGlobalLoading: loading.global,
    isApiLoading: loading.api,
    columnCount,
  })

  const { visibleItems, totalHeight } = useMasonryLayout({
    items,
    columnCount,
    containerWidth,
    gap: GRID_GAP,
    scrollTop,
    viewportHeight: containerRef.current?.offsetHeight || window.innerHeight,
    overscan: GRID_OVERSCAN,
  })

  if (error && photos.length === 0) {
    return (
      <Container>
        <ErrorContainer>{error}</ErrorContainer>
      </Container>
    )
  }

  return (
    <Container ref={containerRef} onScroll={handleScroll}>
      <MasonryWrapper $height={totalHeight}>
        {visibleItems.map((item) => {
          const photo = photos.find((p) => p.id === item.id)
          const position = {
            top: item.top,
            left: item.left,
            width: item.width,
            height: item.height,
          }

          if (!photo && item.id < 0) {
            return <MasonrySkeleton key={`skeleton-${item.top}-${item.left}`} position={position} />
          }

          if (!photo) return null

          return (
            <MasonryItem
              key={item.id}
              photo={photo}
              columnCount={columnCount}
              index={photos.indexOf(photo)}
              position={position}
            />
          )
        })}
      </MasonryWrapper>
    </Container>
  )
}

export default memo(MasonryGrid)
