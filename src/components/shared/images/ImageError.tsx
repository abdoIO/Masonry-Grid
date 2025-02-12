import React from 'react'
import { ErrorContainer, ErrorContent, RetryButton } from '../styles/ImageError.styles'
import { ImageErrorProps } from '../../../types/components'

export const ImageError: React.FC<ImageErrorProps> = ({ aspectRatio, onRetry }) => (
  <ErrorContainer $aspectRatio={aspectRatio}>
    <ErrorContent>
      <span>Failed to load image</span>
      <RetryButton onClick={onRetry} aria-label='Retry loading image'>
        Retry
      </RetryButton>
    </ErrorContent>
  </ErrorContainer>
)
