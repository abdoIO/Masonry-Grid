import React, { memo } from 'react'
import styled from 'styled-components'

const LoadingContainer = styled.div<{ $isOverlay?: boolean }>`
  ${(props) =>
    props.$isOverlay
      ? `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(2px);
  `
      : ''}
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`

const LoadingText = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 16px;
  font-weight: 500;
`

interface LoadingFallbackProps {
  message?: string
  isOverlay?: boolean
}

export const LoadingFallback = memo<LoadingFallbackProps>(({ message = 'Loading...', isOverlay = true }) => (
  <LoadingContainer $isOverlay={isOverlay}>
    <LoadingText>{message}</LoadingText>
  </LoadingContainer>
))

LoadingFallback.displayName = 'LoadingFallback'
