// Utilitários para gerenciar cookies e consentimento

export interface UserData {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
}

// Verificar se usuário consentiu com cookies
export function hasCookieConsent(): boolean {
  if (typeof window === 'undefined') return false
  const consent = localStorage.getItem('cookie_consent')
  return consent ? JSON.parse(consent) : false
}

// Obter data do consentimento
export function getCookieConsentDate(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('cookie_consent_date')
}

// Armazenar dados do usuário localmente (apenas com consentimento)
export function storeUserData(userData: UserData): void {
  if (!hasCookieConsent()) {
    console.warn('Consentimento de cookies não foi dado. Dados não serão armazenados.')
    return
  }

  try {
    localStorage.setItem('user_data', JSON.stringify(userData))
    console.log('✅ Dados do usuário armazenados com segurança')
  } catch (error) {
    console.error('Erro ao armazenar dados do usuário:', error)
  }
}

// Recuperar dados do usuário
export function getUserData(): UserData | null {
  if (typeof window === 'undefined') return null
  
  try {
    const data = localStorage.getItem('user_data')
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Erro ao recuperar dados do usuário:', error)
    return null
  }
}

// Hash SHA-256 simples para dados sensíveis
export async function hashData(data: string): Promise<string> {
  try {
    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(data)
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return hashHex
  } catch (error) {
    console.error('Erro ao fazer hash dos dados:', error)
    return ''
  }
}

// Preparar dados do usuário para enviar à Meta (com hash)
export async function prepareUserDataForMeta(userData: UserData): Promise<Record<string, string>> {
  if (!hasCookieConsent()) {
    return {}
  }

  const hashedData: Record<string, string> = {}

  // Hash de email (em minúsculas e sem espaços)
  if (userData.email) {
    const normalizedEmail = userData.email.toLowerCase().trim()
    hashedData.em = await hashData(normalizedEmail)
  }

  // Hash de telefone (apenas números)
  if (userData.phone) {
    const normalizedPhone = userData.phone.replace(/\D/g, '')
    hashedData.ph = await hashData(normalizedPhone)
  }

  // Hash de primeiro nome
  if (userData.firstName) {
    const normalizedFirstName = userData.firstName.toLowerCase().trim()
    hashedData.fn = await hashData(normalizedFirstName)
  }

  // Hash de sobrenome
  if (userData.lastName) {
    const normalizedLastName = userData.lastName.toLowerCase().trim()
    hashedData.ln = await hashData(normalizedLastName)
  }

  // Hash de cidade
  if (userData.city) {
    const normalizedCity = userData.city.toLowerCase().trim()
    hashedData.ct = await hashData(normalizedCity)
  }

  // Hash de estado
  if (userData.state) {
    const normalizedState = userData.state.toLowerCase().trim()
    hashedData.st = await hashData(normalizedState)
  }

  // Hash de CEP
  if (userData.zipCode) {
    const normalizedZip = userData.zipCode.replace(/\D/g, '')
    hashedData.zp = await hashData(normalizedZip)
  }

  // Hash de país
  if (userData.country) {
    const normalizedCountry = userData.country.toLowerCase().trim()
    hashedData.country = await hashData(normalizedCountry)
  }

  return hashedData
}

// Limpar dados do usuário
export function clearUserData(): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem('user_data')
    console.log('✅ Dados do usuário foram removidos')
  } catch (error) {
    console.error('Erro ao limpar dados do usuário:', error)
  }
}

// Revogar consentimento de cookies
export function revokeCookieConsent(): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem('cookie_consent')
    localStorage.removeItem('cookie_consent_date')
    clearUserData()
    
    // Notificar Meta Pixel
    if (window.fbq) {
      window.fbq('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      })
    }
    
    console.log('✅ Consentimento de cookies foi revogado')
  } catch (error) {
    console.error('Erro ao revogar consentimento:', error)
  }
}

// Obter status de consentimento em formato legível
export function getConsentStatus(): {
  hasConsent: boolean
  consentDate: string | null
  daysAgo: number | null
} {
  const hasConsent = hasCookieConsent()
  const consentDate = getCookieConsentDate()
  
  let daysAgo = null
  if (consentDate) {
    const date = new Date(consentDate)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    daysAgo = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  return {
    hasConsent,
    consentDate,
    daysAgo
  }
}

// Declarar tipos para TypeScript
declare global {
  interface Window {
    fbq: any
  }
}
