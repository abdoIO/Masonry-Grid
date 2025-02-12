export type ImageSize = 'small' | 'medium' | 'large' | 'original'
export type ImageQuality = 'low' | 'medium' | 'high'

export interface ImageDimensions {
  width: number
  height: number
}

export interface PhotoSource {
  original: string
  large: string
  medium: string
  small: string
}

export interface Photo {
  id: number
  width: number
  height: number
  url: string
  photographer: string
  photographer_url: string
  photographer_id: number
  avg_color: string
  src: PhotoSource
  liked: boolean
  alt: string
  created_at?: string
  description?: string
}

export const IMAGE_DIMENSIONS: Record<Exclude<ImageSize, 'original'>, ImageDimensions> = {
  small: { width: 400, height: 500 },
  medium: { width: 600, height: 800 },
  large: { width: 800, height: 1200 },
}

export const QUALITY_VALUES: Record<ImageQuality, number> = {
  high: 85,
  medium: 75,
  low: 60,
}
