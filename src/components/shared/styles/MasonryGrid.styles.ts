import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
`

export const MasonryWrapper = styled.div<{ $height: number }>`
  position: relative;
  width: 100%;
  height: ${(props) => props.$height}px;
`

export const MasonryItem = styled.div<{
  $top: number
  $left: number
  $width: number
  $height: number
}>`
  position: absolute;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
    z-index: 1;
  }
`

export const ErrorContainer = styled.div`
  padding: 20px;
  text-align: center;
  color: #ff4444;
`
