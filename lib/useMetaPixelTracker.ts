'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  trackAddToCart,
  trackInitiateCheckout,
  trackPurchase,
  trackViewContent,
  getClientCity,
  ClientLocation
} from './metaPixel'

export function useMetaPixelTracker() {
  const [location, setLocation] = useState<ClientLocation | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Obter localização ao montar componente
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const clientLocation = await getClientCity()
        setLocation(clientLocation)
      } catch (error) {
        console.error('Erro ao obter localização:', error)
        setLocation({
          city: 'Unknown',
          state: 'Unknown',
          country: 'Unknown'
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchLocation()
  }, [])

  // Rastrear adição ao carrinho
  const onAddToCart = useCallback((
    packageId: string,
    packageName: string,
    price: number
  ) => {
    trackAddToCart(packageId, packageName, price, location || undefined)
  }, [location])

  // Rastrear início do checkout
  const onInitiateCheckout = useCallback((
    packageId: string,
    packageName: string,
    price: number
  ) => {
    trackInitiateCheckout(packageId, packageName, price, location || undefined)
  }, [location])

  // Rastrear compra
  const onPurchase = useCallback((
    packageId: string,
    packageName: string,
    price: number
  ) => {
    trackPurchase(packageId, packageName, price, location || undefined)
  }, [location])

  // Rastrear visualização de conteúdo
  const onViewContent = useCallback((contentName: string) => {
    trackViewContent(contentName, location || undefined)
  }, [location])

  return {
    location,
    isLoading,
    onAddToCart,
    onInitiateCheckout,
    onPurchase,
    onViewContent
  }
}
