import styled from 'styled-components'

export const ErrorContainer = styled.div<{ $aspectRatio: number }>`
  width: 100%;
  padding-bottom: ${({ $aspectRatio }) => `${$aspectRatio * 100}%`};
  position: relative;
  border-radius: 8px;
  background-color: #fff5f5;
  border: 1px solid #feb2b2;
`

export const ErrorContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  text-align: center;
  color: #e53e3e;
`

export const RetryButton = styled.button`
  margin-top: 8px;
  padding: 8px 16px;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c53030;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #feb2b2;
  }
`
