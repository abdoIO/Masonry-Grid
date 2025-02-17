import React, { memo } from 'react'
import { MasonryItem } from '../shared/styles/MasonryGrid.styles'
import { ImageSkeleton } from '../shared/loading/ImageSkeleton'

interface MasonrySkeletonProps {
  position: {
    top: number
    left: number
    width: number
    height: number
  }
}

export const MasonrySkeleton = memo<MasonrySkeletonProps>(({ position }) => {
  return (
    <MasonryItem $top={position.top} $left={position.left} $width={position.width} $height={position.height}>
      <ImageSkeleton width={position.width} height={position.height} />
    </MasonryItem>
  )
})
