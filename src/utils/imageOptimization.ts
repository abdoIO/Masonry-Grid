import { ImageSize, ImageQuality, IMAGE_DIMENSIONS, QUALITY_VALUES } from '../types/image'

export const getOptimizedImageUrl = (url: string, size: ImageSize, quality: ImageQuality = 'high'): string => {
  const baseUrl = url.split('?')[0]
  const params = new URLSearchParams()

  params.append('auto', 'compress')
  params.append('cs', 'tinysrgb')
  params.append('fit', 'crop')
  params.append('q', QUALITY_VALUES[quality].toString())

  if (size !== 'original') {
    const dimensions = IMAGE_DIMENSIONS[size]
    params.append('w', dimensions.width.toString())
    params.append('h', dimensions.height.toString())
  }

  return `${baseUrl}?${params.toString()}`
}
