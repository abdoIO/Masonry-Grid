import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { COLORS, TRANSITIONS, SPACING, BORDER_RADIUS, MAX_CONTENT_WIDTH } from '../../../constants/styles'

export const DetailContainer = styled.div`
  max-width: ${MAX_CONTENT_WIDTH};
  margin: 0 auto;
  padding: ${SPACING.xlarge};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export const DetailImage = styled.img<{ $isLoaded: boolean }>`
  width: 100%;
  height: auto;
  border-radius: ${BORDER_RADIUS.medium};
  margin-bottom: ${SPACING.xlarge};
  transition: opacity ${TRANSITIONS.opacity};
  will-change: opacity;
  object-fit: contain;
  opacity: ${(props) => (props.$isLoaded ? 1 : 0)};
`

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: ${SPACING.xlarge};
`

export const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: ${SPACING.xlarge};
  padding: ${SPACING.small} ${SPACING.large};
  background-color: ${COLORS.background.light};
  border-radius: ${BORDER_RADIUS.small};
  text-decoration: none;
  color: ${COLORS.text.primary};
  transition: background-color ${TRANSITIONS.background};
  will-change: background-color;

  &:hover {
    background-color: ${COLORS.background.lightHover};
  }
`

export const PhotoInfo = styled.div`
  margin-top: ${SPACING.xlarge};
  display: flex;
  flex-direction: column;
  gap: ${SPACING.medium};
`

export const PhotoTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: ${COLORS.text.primary};
`

export const PhotoMetadata = styled.p`
  margin: 0;
  color: ${COLORS.text.secondary};
`

export const ExternalLink = styled.a`
  color: ${COLORS.primary};
  text-decoration: none;
  transition: color ${TRANSITIONS.background};

  &:hover {
    color: ${COLORS.primaryDark};
  }
`
