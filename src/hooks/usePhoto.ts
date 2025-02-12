import { useState, useEffect, useRef, useCallback } from 'react'
import { fetchPhotos, fetchPhotoById } from '../api'
import { useLoadingContext } from '../context/LoadingContext'
import { Photo } from '../types/image'

export interface UseInfinitePhotosResult {
  photos: Photo[]
  loadMorePhotos: () => void
}

export const useInfinitePhotos = (initialQuery: string): UseInfinitePhotosResult => {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [page, setPage] = useState(1)
  const seenPhotoIds = useRef(new Set<number>())
  const loadingRef = useRef(false)
  const { setApiLoading, handleError } = useLoadingContext()

  const loadPhotos = useCallback(async () => {
    if (loadingRef.current) return
    loadingRef.current = true
    setApiLoading(true)

    try {
      const newPhotos = await fetchPhotos(initialQuery, page)
      const uniqueNewPhotos = newPhotos.data.filter((photo: Photo) => !seenPhotoIds.current.has(photo.id))

      if (uniqueNewPhotos.length > 0) {
        uniqueNewPhotos.forEach((photo: Photo) => seenPhotoIds.current.add(photo.id))
        setPhotos((prev) => [...prev, ...uniqueNewPhotos])
      } else if (newPhotos.data.length === 0) {
        handleError(new Error('No more photos available'))
      }
    } catch (err) {
      handleError(err)
    } finally {
      loadingRef.current = false
      setApiLoading(false)
    }
  }, [page, initialQuery, setApiLoading, handleError])

  useEffect(() => {
    loadPhotos()
  }, [page, loadPhotos])

  const loadMorePhotos = useCallback(() => {
    if (!loadingRef.current) {
      setPage((prev) => prev + 1)
    }
  }, [])

  return { photos, loadMorePhotos }
}

export interface UseSinglePhotoResult {
  photo: Photo | null
}

export const useSinglePhoto = (id: string | undefined): UseSinglePhotoResult => {
  const [photo, setPhoto] = useState<Photo | null>(null)
  const { setApiLoading, handleError } = useLoadingContext()

  useEffect(() => {
    let mounted = true

    const fetchPhoto = async () => {
      if (!id) return
      try {
        setApiLoading(true)
        const data = await fetchPhotoById(id)
        if (mounted) {
          setPhoto(data.data)
        }
      } catch (error) {
        if (mounted) {
          handleError(error)
        }
      } finally {
        if (mounted) {
          setApiLoading(false)
        }
      }
    }

    fetchPhoto()
    return () => {
      mounted = false
    }
  }, [id, setApiLoading, handleError])

  return { photo }
}
