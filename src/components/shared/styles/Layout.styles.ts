import styled from 'styled-components'

export const MasonryContainer = styled.div`
  column-count: 3;
  column-gap: 16px;
  padding: 16px;
  max-width: 1200px;
  margin: auto;

  @media (max-width: 1024px) {
    column-count: 2;
  }

  @media (max-width: 600px) {
    column-count: 1;
  }
`

export const LoaderContainer = styled.div`
  height: 20px;
  margin: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
`

export const GridContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  width: 100%;
`

export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #ffffff;
`
