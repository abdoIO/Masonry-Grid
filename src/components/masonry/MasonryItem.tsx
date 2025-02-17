import React, { memo } from 'react'
import { MasonryItem as StyledMasonryItem } from '../shared/styles/MasonryGrid.styles'
import { EagerImage } from '../shared/PhotoComponents'
import { Photo } from '../../types/image'

interface MasonryItemProps {
  photo: Photo
  columnCount: number
  index: number
  position: {
    top: number
    left: number
    width: number
    height: number
  }
}

export const MasonryItem = memo<MasonryItemProps>(({ photo, columnCount, index, position }) => {
  return (
    <StyledMasonryItem
      key={photo.id}
      $top={position.top}
      $left={position.left}
      $width={position.width}
      $height={position.height}
    >
      <EagerImage photo={photo} columnCount={columnCount} index={index} />
    </StyledMasonryItem>
  )
})
