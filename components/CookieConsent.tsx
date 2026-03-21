'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Verificar se já existe consentimento armazenado
    const storedConsent = localStorage.getItem('cookie_consent')
    if (storedConsent) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', JSON.stringify(true))
    localStorage.setItem('cookie_consent_date', new Date().toISOString())
    setIsVisible(false)
    
    // Notificar Meta Pixel que consentimento foi dado
    if (window.fbq) {
      window.fbq('consent', 'grant', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      })
    }
  }

  const handleReject = () => {
    localStorage.setItem('cookie_consent', JSON.stringify(false))
    localStorage.setItem('cookie_consent_date', new Date().toISOString())
    setIsVisible(false)
    
    // Notificar Meta Pixel que consentimento foi rejeitado
    if (window.fbq) {
      window.fbq('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      })
    }
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1a1a2e] to-[#0f1419] border-t border-[#2a2a3e] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg mb-2">🍪 Cookies e Privacidade</h3>
            <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-0">
              Usamos cookies internos para melhorar sua experiência e compartilhamos dados com a Meta para veicular anúncios relevantes. 
              <a href="/politica-privacidade" className="text-[#5a5af6] hover:text-[#7a7aff] ml-1 underline">
                Saiba mais
              </a>
            </p>
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto flex-col sm:flex-row">
            <button
              onClick={handleReject}
              className="px-4 py-2 rounded-lg font-semibold text-gray-300 hover:text-white border border-[#2a2a3e] hover:border-[#3a3a4e] transition-colors text-sm"
            >
              Rejeitar
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 rounded-lg font-semibold bg-[#5a5af6] text-white hover:bg-[#7a7aff] transition-colors text-sm"
            >
              Aceitar
            </button>
          </div>

          <button
            onClick={handleClose}
            className="absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 p-1 hover:bg-[#2a2a3e] rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  )
}
