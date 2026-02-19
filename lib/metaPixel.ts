// Tipos
export interface ClientLocation {
  city: string
  state: string
  country: string
  latitude?: number
  longitude?: number
}

export interface MetaPixelEvent {
  value?: number
  currency?: string
  content_name?: string
  content_id?: string
  content_type?: string
  event_id: string
  city?: string
  state?: string
  country?: string
  [key: string]: any
}

// Gerar UUID v4
export function generateEventId(action: string, city?: string): string {
  const uuid = crypto.randomUUID()
  const timestamp = Math.floor(Date.now() / 1000)
  const cityCode = city ? city.substring(0, 2).toLowerCase() : 'xx'
  return `${uuid}_${timestamp}_${action}_${cityCode}` 
}

// Obter localização do cliente
export async function getClientCity(): Promise<ClientLocation> {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    return {
      city: data.city || 'Unknown',
      state: data.region || 'Unknown',
      country: data.country_name || 'Unknown',
      latitude: data.latitude,
      longitude: data.longitude
    }
  } catch (error) {
    console.error('Erro ao obter geolocalização:', error)
    return {
      city: 'Unknown',
      state: 'Unknown',
      country: 'Unknown'
    }
  }
}

// Validar deduplicação (localStorage)
export function isDuplicateEvent(eventId: string): boolean {
  const recentEvents = JSON.parse(localStorage.getItem('meta_pixel_events') || '{}')
  const lastEventTime = recentEvents[eventId]
  
  if (!lastEventTime) {
    return false
  }
  
  // Se foi enviado há menos de 5 segundos, é duplicado
  const timeDiff = Date.now() - lastEventTime
  return timeDiff < 5000
}

// Registrar evento como enviado
export function registerEventAsSent(eventId: string): void {
  const recentEvents = JSON.parse(localStorage.getItem('meta_pixel_events') || '{}')
  recentEvents[eventId] = Date.now()
  
  // Limpar eventos antigos (mais de 1 hora)
  const oneHourAgo = Date.now() - (60 * 60 * 1000)
  Object.keys(recentEvents).forEach(key => {
    if (recentEvents[key] < oneHourAgo) {
      delete recentEvents[key]
    }
  })
  
  localStorage.setItem('meta_pixel_events', JSON.stringify(recentEvents))
}

// Rastrear evento genérico
export function trackEvent(eventName: string, eventData: MetaPixelEvent): void {
  if (!window.fbq) {
    console.warn('Meta Pixel não inicializado')
    return
  }

  // Validar deduplicação
  if (isDuplicateEvent(eventData.event_id)) {
    console.warn(`Evento duplicado ignorado: ${eventData.event_id}`)
    return
  }

  // Registrar como enviado
  registerEventAsSent(eventData.event_id)

  // Enviar para Meta
  window.fbq('track', eventName, eventData)
  console.log(`✅ Evento rastreado: ${eventName}`, eventData)
}

// Rastrear AddToCart (Adição ao Carrinho)
export function trackAddToCart(
  packageId: string,
  packageName: string,
  price: number,
  location?: ClientLocation
): void {
  const eventId = generateEventId('add_to_cart', location?.city)
  
  trackEvent('AddToCart', {
    value: price,
    currency: 'BRL',
    content_name: packageName,
    content_id: packageId,
    content_type: 'product',
    event_id: eventId,
    city: location?.city || 'Unknown',
    state: location?.state || 'Unknown',
    country: location?.country || 'Unknown'
  })
}

// Rastrear InitiateCheckout (Início do Checkout)
export function trackInitiateCheckout(
  packageId: string,
  packageName: string,
  price: number,
  location?: ClientLocation
): void {
  const eventId = generateEventId('initiate_checkout', location?.city)
  
  trackEvent('InitiateCheckout', {
    value: price,
    currency: 'BRL',
    content_name: packageName,
    content_id: packageId,
    content_type: 'product',
    event_id: eventId,
    city: location?.city || 'Unknown',
    state: location?.state || 'Unknown',
    country: location?.country || 'Unknown'
  })
}

// Rastrear Purchase (Compra Confirmada)
export function trackPurchase(
  packageId: string,
  packageName: string,
  price: number,
  location?: ClientLocation
): void {
  const eventId = generateEventId('purchase', location?.city)
  
  trackEvent('Purchase', {
    value: price,
    currency: 'BRL',
    content_name: packageName,
    content_id: packageId,
    content_type: 'product',
    event_id: eventId,
    city: location?.city || 'Unknown',
    state: location?.state || 'Unknown',
    country: location?.country || 'Unknown'
  })
}

// Rastrear ViewContent (Visualização de Conteúdo)
export function trackViewContent(
  contentName: string,
  location?: ClientLocation
): void {
  const eventId = generateEventId('view_content', location?.city)
  
  trackEvent('ViewContent', {
    content_name: contentName,
    content_type: 'page',
    event_id: eventId,
    city: location?.city || 'Unknown',
    state: location?.state || 'Unknown',
    country: location?.country || 'Unknown'
  })
}

// Enviar dados do usuário para Meta (com consentimento)
export async function sendUserDataToMeta(userData: any): Promise<void> {
  if (!window.fbq) {
    console.warn('Meta Pixel não inicializado')
    return
  }

  try {
    // Importar função de preparação de dados
    const { prepareUserDataForMeta, hasCookieConsent } = await import('./cookieUtils')
    
    if (!hasCookieConsent()) {
      console.warn('Consentimento de cookies não foi dado')
      return
    }

    const hashedData = await prepareUserDataForMeta(userData)
    
    if (Object.keys(hashedData).length > 0) {
      window.fbq('init', '1223994006324453', hashedData)
      console.log('✅ Dados do usuário enviados para Meta Pixel com segurança')
    }
  } catch (error) {
    console.error('Erro ao enviar dados do usuário para Meta:', error)
  }
}

// Declarar tipos para TypeScript
declare global {
  interface Window {
    fbq: any
  }
}
