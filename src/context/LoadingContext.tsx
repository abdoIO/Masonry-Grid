import React, { createContext, useContext, useState, useCallback } from 'react'
import { AxiosError } from 'axios'
import styled from 'styled-components'
import { slideIn, animationDurations } from '../components/shared/styles/animations'
import { LoadingFallback } from '../components/shared/loading/LoadingFallback'

const ErrorToast = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #ff4444;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 80vw;
  word-break: break-word;
  animation: ${slideIn} ${animationDurations.slideIn} ease-out;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  flex-shrink: 0;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`

interface LoadingState {
  global: boolean
  api: boolean
}

interface LoadingContextType {
  loading: LoadingState
  error: string | null
  setGlobalLoading: (loading: boolean) => void
  setApiLoading: (loading: boolean) => void
  handleError: (error: unknown) => void
  clearError: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const useLoadingContext = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoadingContext must be used within a LoadingProvider')
  }
  return context
}

interface LoadingProviderProps {
  children: React.ReactNode
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<LoadingState>({ global: false, api: false })
  const [error, setError] = useState<string | null>(null)

  const setGlobalLoading = useCallback((isLoading: boolean) => {
    setLoading((prev) => ({ ...prev, global: isLoading }))
  }, [])

  const setApiLoading = useCallback((isLoading: boolean) => {
    setLoading((prev) => ({ ...prev, api: isLoading }))
  }, [])

  const handleError = useCallback((error: unknown) => {
    if (error instanceof AxiosError) {
      if (!error.response) {
        setError('Network error. Please check your internet connection.')
        return
      }

      switch (error.response.status) {
        case 429:
          setError('Too many requests. Please wait a moment before trying again.')
          break
        case 403:
          setError('Access denied. Please check your API key.')
          break
        case 404:
          setError('The requested resource was not found.')
          break
        case 500:
          setError('Server error. Please try again later.')
          break
        default:
          setError(
            error.response.data?.message ||
              error.response.data?.error ||
              error.message ||
              'An unexpected error occurred',
          )
      }
    } else if (error instanceof Error) {
      setError(error.message)
    } else {
      setError('An unexpected error occurred')
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const value = {
    loading,
    error,
    setGlobalLoading,
    setApiLoading,
    handleError,
    clearError,
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {(loading.global || loading.api) && <LoadingFallback />}
      {error && (
        <ErrorToast>
          <span>{error}</span>
          <CloseButton onClick={clearError}>✕</CloseButton>
        </ErrorToast>
      )}
    </LoadingContext.Provider>
  )
}
