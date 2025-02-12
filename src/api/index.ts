import axios, { AxiosError } from 'axios'
import { Photo } from '../types/image'
import {  ApiResponse, PaginatedResponse, API_CONFIG } from '../types/api'

if (!process.env.REACT_APP_PEXELS_API_KEY) {
  throw new Error('Missing REACT_APP_PEXELS_API_KEY environment variable, please add it to your .env file')
}

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: {
    Authorization: process.env.REACT_APP_PEXELS_API_KEY,
  },
})

const handleApiError = (error: unknown): never => {
  if (error instanceof AxiosError) {
    if (!error.response) {
      throw new Error('Network error. Please check your internet connection.')
    }

    switch (error.response.status) {
      case 429:
        throw new Error('Too many requests. Please wait a moment before trying again.')
      case 403:
        throw new Error('Access denied. Please check your API key.')
      case 404:
        throw new Error('The requested resource was not found.')
      case 500:
        throw new Error('Server error. Please try again later.')
      default:
        throw new Error(
          error.response.data?.message ||
            error.response.data?.error ||
            error.message ||
            'An unexpected error occurred'
        )
    }
  }
  throw error
}

export const fetchPhotos = async (query: string, page: number = 1): Promise<PaginatedResponse<Photo[]>> => {
  try {
    const response = await api.get(API_CONFIG.endpoints.search, {
      params: {
        query,
        per_page: API_CONFIG.defaultPerPage,
        page,
      },
    })

    return {
      data: response.data.photos,
      page: response.data.page,
      per_page: response.data.per_page,
      total_results: response.data.total_results,
      next_page: response.data.next_page,
      prev_page: page > 1 ? page - 1 : undefined,
    }
  } catch (error) {
    return handleApiError(error)
  }
}

export const fetchPhotoById = async (id: string): Promise<ApiResponse<Photo>> => {
  try {
    const response = await api.get(`${API_CONFIG.endpoints.photos}/${id}`)
    return { data: response.data }
  } catch (error) {
    return handleApiError(error)
  }
}
