export interface ApiError {
  message: string
  status?: number
  code?: string
}

export interface ApiResponse<T> {
  data: T
  error?: ApiError
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  page: number
  per_page: number
  total_results: number
  next_page?: number
  prev_page?: number
}

export const API_CONFIG = {
  baseURL: 'https://api.pexels.com/v1/',
  defaultPerPage: 30,
  endpoints: {
    search: 'search',
    photos: 'photos',
  },
} as const
