import { keyframes } from 'styled-components'

export const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

export const animationDurations = {
  slideIn: '0.4s',
} as const
