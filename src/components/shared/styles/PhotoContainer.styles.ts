import styled from 'styled-components'

export const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  max-width: 800px;
  margin: auto;
`

export const ImageWrapper = styled.div`
  margin-bottom: 16px;
  break-inside: avoid;
  display: block;
  position: relative;
`

export const ImageContainer = styled.div<{ $aspectRatio: number; $backgroundColor?: string }>`
  position: relative;
  padding-bottom: ${(props) => `${props.$aspectRatio * 100}%`};
  background-color: ${(props) => props.$backgroundColor || '#f0f0f0'};
  display: block;
  border-radius: 8px;
  overflow: hidden;
`

interface StyledImageProps {
  $isLoaded?: boolean
  loading?: 'lazy' | 'eager'
  decoding?: 'async' | 'sync' | 'auto'
  fetchPriority?: 'high' | 'low' | 'auto'
}

export const ImageCard = styled.img.attrs<StyledImageProps>(({ loading, decoding, fetchPriority }) => ({
  loading,
  decoding,
  fetchPriority,
}))<StyledImageProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 8px;
  transition: opacity 0.3s ease-in-out;
  will-change: opacity;
  object-fit: cover;
  opacity: ${(props) => (props.$isLoaded ? 1 : 0)};
  pointer-events: ${(props) => (props.$isLoaded ? 'auto' : 'none')};

  &:hover {
    transform: scale(1.03);
  }
`

export const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 16px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  will-change: background;

  &:hover {
    background-color: #005bb5;
  }
`
