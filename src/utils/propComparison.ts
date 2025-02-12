import { BaseImageProps, EagerImageProps, LazyImageProps } from '../types/components'

export const areBasePropsEqual = (prevProps: BaseImageProps, nextProps: BaseImageProps): boolean => {
  return (
    prevProps.photo.id === nextProps.photo.id &&
    prevProps.columnCount === nextProps.columnCount &&
    prevProps.photo.src.original === nextProps.photo.src.original
  )
}

export const areEagerPropsEqual = (prevProps: EagerImageProps, nextProps: EagerImageProps): boolean => {
  return areBasePropsEqual(prevProps, nextProps) && prevProps.index === nextProps.index
}

export const areLazyPropsEqual = (prevProps: LazyImageProps, nextProps: LazyImageProps): boolean => {
  return areBasePropsEqual(prevProps, nextProps)
}
