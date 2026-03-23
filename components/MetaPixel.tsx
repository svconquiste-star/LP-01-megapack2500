'use client'

import { useEffect } from 'react'
import { hasCookieConsent, prepareUserDataForMeta } from '@/lib/cookieUtils'

const PIXEL_ID = '1223994006324453'

export default function MetaPixel() {
  useEffect(() => {
    // 1. Inicializar fbq antes de carregar o script
    window.fbq = window.fbq || function() {
      window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments)
    }
    window.fbq.push = window.fbq.push || function() {
      window.fbq.queue.push(arguments)
    }
    window.fbq.queue = window.fbq.queue || []
    window.fbq.loaded = true
    window.fbq.version = '2.0'

    // 2. Carregar script do Meta Pixel
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    script.onload = () => {
      initializePixel()
    }
    document.head.appendChild(script)

    // Fallback se o script não carregar em tempo
    setTimeout(() => {
      if (window.fbq && !window.fbq.initialized) {
        initializePixel()
      }
    }, 2000)
  }, [])

  return null
}

function initializePixel() {
  if (window.fbq.initialized) return

  // 1. Configurar consentimento de cookies
  const hasConsent = hasCookieConsent()
  if (hasConsent) {
    window.fbq('consent', 'grant', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted'
    })
  } else {
    window.fbq('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied'
    })
  }

  // 2. Inicializar Pixel com ID
  window.fbq('init', PIXEL_ID)
  window.fbq.initialized = true

  // 3. Rastrear PageView
  window.fbq('track', 'PageView', {
    event_id: generateEventId('pageview')
  })

  // 4. Obter geolocalização e rastrear
  getClientLocationAndTrack()

  // 5. Se houver consentimento, enviar dados do usuário
  if (hasConsent) {
    sendUserDataToMeta()
  }

  console.log('✅ Meta Pixel inicializado com sucesso (ID: ' + PIXEL_ID + ')')
}

async function getClientLocationAndTrack() {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    
    // Armazenar localização no window para usar em outros eventos
    window.clientLocation = {
      city: data.city || 'Unknown',
      state: data.region || 'Unknown',
      country: data.country_name || 'Unknown',
      latitude: data.latitude,
      longitude: data.longitude
    }

    // Rastrear ViewContent com localização
    window.fbq('track', 'ViewContent', {
      content_type: 'page',
      event_id: generateEventId('view_content'),
      city: window.clientLocation.city,
      state: window.clientLocation.state,
      country: window.clientLocation.country
    })
  } catch (error) {
    console.error('Erro ao obter geolocalização:', error)
    window.clientLocation = {
      city: 'Unknown',
      state: 'Unknown',
      country: 'Unknown'
    }
  }
}

async function sendUserDataToMeta() {
  try {
    const userData = localStorage.getItem('user_data')
    if (userData) {
      const parsedData = JSON.parse(userData)
      const hashedData = await prepareUserDataForMeta(parsedData)
      
      if (Object.keys(hashedData).length > 0) {
        window.fbq('setUserData', hashedData)
        console.log('✅ Dados do usuário enviados para Meta Pixel')
      }
    }
  } catch (error) {
    console.error('Erro ao enviar dados do usuário para Meta:', error)
  }
}

function generateEventId(action: string): string {
  const uuid = crypto.randomUUID()
  const timestamp = Math.floor(Date.now() / 1000)
  return `${uuid}_${timestamp}_${action}` 
}

// Declarar tipos para TypeScript
declare global {
  interface Window {
    fbq: any
    clientLocation: {
      city: string
      state: string
      country: string
      latitude?: number
      longitude?: number
    }
  }
}
