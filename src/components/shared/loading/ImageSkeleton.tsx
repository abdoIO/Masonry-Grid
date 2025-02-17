import React from 'react'
import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`

const SkeletonContainer = styled.div<{ $height: number }>`
  width: 100%;
  height: ${(props) => props.$height}px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 8px;
  overflow: hidden;
`

interface ImageSkeletonProps {
  width: number
  height: number
}

export const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ width, height }) => <SkeletonContainer $height={height} />
