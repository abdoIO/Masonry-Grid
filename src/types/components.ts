import { Photo } from './image'

export interface SkeletonItem extends Omit<Photo, 'id'> {
  id: number
  isSkeleton: true
}

export interface BaseImageProps {
  photo: Photo
  columnCount: number
}

export interface EagerImageProps extends BaseImageProps {
  index: number
}

export interface LazyImageProps extends BaseImageProps {
  index?: never
}

export interface ImageErrorProps {
  aspectRatio: number
  onRetry: () => void
}

export interface LoadingFallbackProps {
  message?: string
}

export interface MasonryItem {
  id: number
  height: number
  width: number
  top: number
  left: number
  columnIndex: number
}

export interface UseMasonryLayoutProps {
  items: Photo[]
  columnCount: number
  containerWidth: number
  gap: number
  scrollTop: number
  viewportHeight: number
  overscan?: number
}

export interface MasonryLayoutResult {
  layout: MasonryItem[]
  totalHeight: number
  visibleItems: MasonryItem[]
}

export interface UseInfiniteScrollProps {
  onLoadMore: () => void
  isLoading: boolean
  threshold?: number
}

export interface UseInfiniteScrollResult {
  scrollTop: number
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void
}
