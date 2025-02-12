import React from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import { useSinglePhoto } from '../hooks/usePhoto'
import { useLoadingContext } from '../context/LoadingContext'
import { LoadingFallback } from './shared/loading/LoadingFallback'

const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`

const DetailImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
`

const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: #f0f0f0;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }
`

const PhotoInfo = styled.div`
  margin-top: 20px;
`

const PhotoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { photo } = useSinglePhoto(id || '')
  const { loading, error } = useLoadingContext()

  if (error) {
    return <LoadingFallback message={error} />
  }

  if (loading.api || !photo) {
    return <LoadingFallback message='Loading photo details...' />
  }

  return (
    <DetailContainer>
      <BackButton to='/'>← Back to Gallery</BackButton>
      <DetailImage src={photo.src.original} alt={photo.photographer} loading='eager' />
      <PhotoInfo>
        <h2>Photographer: {photo.photographer}</h2>
        <p>
          Original size: {photo.width} x {photo.height}
        </p>
        <a href={photo.url} target='_blank' rel='noopener noreferrer'>
          View on Pexels
        </a>
      </PhotoInfo>
    </DetailContainer>
  )
}

export default PhotoDetail
