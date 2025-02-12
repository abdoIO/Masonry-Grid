import { Photo } from '../types/image'

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
