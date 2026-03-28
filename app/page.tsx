'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Check, Zap, Crown, Star, TrendingUp, Flame, Users, Award, Heart, Lightbulb, Rocket, Shield, Clock, Sparkles, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useMetaPixelTracker } from '@/lib/useMetaPixelTracker'

interface PlanData {
  name: string
  price: string
  pricePerMonth: string
  value: string
  savings: string | null
  features: string[]
  icon: React.ComponentType<any>
  color: string
  cta: string
  ctaColor: string
  popular: boolean
  bonus: string | null
  originalPrice?: string
}

interface PurchaseNotification {
  name: string
  city: string
  plan: string
}

const brazilianNames = [
  'Carlos Silva', 'Ana Santos', 'João Oliveira', 'Maria Costa', 'Pedro Ferreira',
  'Lucas Martins', 'Fernanda Rocha', 'Roberto Alves', 'Juliana Gomes', 'Marcelo Dias',
  'Beatriz Lima', 'Felipe Souza', 'Camila Ribeiro', 'Ricardo Pereira', 'Gabriela Mendes',
  'André Barbosa', 'Isabela Teixeira', 'Gustavo Cardoso', 'Patrícia Monteiro', 'Bruno Costa',
  'Larissa Oliveira', 'Thiago Machado', 'Vanessa Ribeiro', 'Mateus Sousa', 'Leticia Araujo',
  'Rafael Gomes', 'Mariana Freitas', 'Diego Perez', 'Sophia Carvalho', 'Leonardo Nunes',
  'Aline Barbosa', 'Vinícius Rocha', 'Fernanda Almeida', 'Rodrigo Martins', 'Carolina Pinto',
  'Fabio Lopes', 'Juliana Ferreira', 'Cristiano Dias', 'Natalia Costa', 'Sergio Oliveira',
  'Priscila Gomes', 'Henrique Souza', 'Daniela Ribeiro', 'Leandro Campos', 'Alessandra Moura',
  'Tiago Mendes', 'Bruna Rocha', 'Paulo Alves', 'Camila Santos', 'Marcos Ferreira'
]

const brazilianCities = [
  'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre',
  'Salvador', 'Brasília', 'Fortaleza', 'Manaus', 'Recife',
  'Goiânia', 'Belém', 'Maceió', 'Teresina', 'João Pessoa',
  'Natal', 'Aracaju', 'Palmas', 'Rio Branco', 'Boa Vista',
  'Macapá', 'São Luís', 'Cuiabá', 'Campo Grande', 'Vitória',
  'Campinas', 'Santos', 'Sorocaba', 'Ribeirão Preto', 'Piracicaba',
  'Jundiaí', 'Araraquara', 'Bauru', 'Marília', 'Presidente Prudente',
  'Niterói', 'Duque de Caxias', 'São Gonçalo', 'Nova Iguaçu', 'Itaboraí',
  'Contagem', 'Betim', 'Montes Claros', 'Uberaba', 'Uberlândia',
  'Juiz de Fora', 'Divinópolis', 'Poços de Caldas', 'Governador Valadares', 'Ipatinga'
]

const plans = ['Normal', 'Básico', 'VIP']

const generatePurchaseNotifications = (): PurchaseNotification[] => {
  const notifications: PurchaseNotification[] = []
  const usedNameIndices = new Set<number>()
  const usedCityIndices = new Set<number>()

  for (let i = 0; i < 50; i++) {
    let nameIndex = Math.floor(Math.random() * brazilianNames.length)
    while (usedNameIndices.has(nameIndex)) {
      nameIndex = Math.floor(Math.random() * brazilianNames.length)
    }
    usedNameIndices.add(nameIndex)

    let cityIndex = Math.floor(Math.random() * brazilianCities.length)
    while (usedCityIndices.has(cityIndex)) {
      cityIndex = Math.floor(Math.random() * brazilianCities.length)
    }
    usedCityIndices.add(cityIndex)

    const planIndex = Math.floor(Math.random() * plans.length)

    notifications.push({
      name: brazilianNames[nameIndex],
      city: brazilianCities[cityIndex],
      plan: plans[planIndex]
    })
  }

  return notifications
}

const purchaseNotifications: PurchaseNotification[] = generatePurchaseNotifications()

export default function VendasPage() {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState('23:59:59')
  const [currentNotification, setCurrentNotification] = useState<PurchaseNotification | null>(null)
  const { onViewContent } = useMetaPixelTracker()

  useEffect(() => {
    // Rastrear visualização da página
    onViewContent('Página de Vendas - Pacotes')

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const end = new Date()
      end.setDate(end.getDate() + 1)
      end.setHours(23, 59, 59)
      
      const endTime = end.getTime()
      const diff = Math.floor((endTime - now) / 1000)
      const hours = Math.max(0, Math.floor(diff / 3600))
      const minutes = Math.max(0, Math.floor((diff % 3600) / 60))
      const seconds = Math.max(0, diff % 60)
      
      setTimeLeft(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)
    }, 1000)

    return () => clearInterval(timer)
  }, [onViewContent])

  useEffect(() => {
    const delay = setTimeout(() => {
      const notificationTimer = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * purchaseNotifications.length)
        setCurrentNotification(purchaseNotifications[randomIndex])

        const dismissTimer = setTimeout(() => {
          setCurrentNotification(null)
        }, 4000)

        return () => {
          clearTimeout(dismissTimer)
        }
      }, 45000)

      return () => {
        clearInterval(notificationTimer)
      }
    }, 3000)

    return () => {
      clearTimeout(delay)
    }
  }, [])

  const checkoutLinks: Record<string, string> = {
    'Pacote Normal': 'https://lastlink.com/p/C5DA81BED/checkout-payment/',
    'Pacote Básico': 'https://lastlink.com/p/C60A08A9C/checkout-payment/',
    'Pacote VIP': 'https://lastlink.com/p/CF34F42DC/checkout-payment/'
  }

  const plans: PlanData[] = [
    {
      name: 'Pacote Normal',
      price: '19,90',
      pricePerMonth: '',
      value: 'Comece a automatizar hoje',
      savings: 'ECONOMIZE 43%',
      originalPrice: '35,00',
      features: [
        '2500+ Templates N8N (Vitalício)',
        'Automação básica em minutos',
        'Sem renovação - pague uma vez'
      ],
      icon: Sparkles,
      color: '#ff6b6b',
      cta: 'Começar Agora',
      ctaColor: 'bg-[#2a2a3e] text-white hover:bg-[#3a3a4e]',
      popular: false,
      bonus: null
    },
    {
      name: 'Pacote Básico',
      price: '27,90',
      pricePerMonth: '',
      value: 'Melhor custo-benefício para crescimento',
      savings: 'ECONOMIZE 53%',
      originalPrice: '59,90',
      features: [
        '2500+ Templates N8N + Prompts IA',
        'Automação + Geração de Conteúdo',
        'Chatbots e Fluxos Avançados',
        'Ferramentas SaaS Integradas'
      ],
      icon: Zap,
      color: '#5a5af6',
      cta: 'Desbloquear Acesso',
      ctaColor: 'bg-[#5a5af6] text-white hover:bg-[#7a7aff]',
      popular: false,
      bonus: null
    },
    {
      name: 'Pacote VIP',
      price: '37,90',
      pricePerMonth: '',
      value: 'Solução completa para dominar automação',
      savings: 'ECONOMIZE 63%',
      originalPrice: '102,90',
      features: [
        'Tudo do Pacote Básico +',
        'Super Fluxos Avançados',
        'Self-Hosted Softwares',
        'Bônus Exclusivos + Suporte'
      ],
      icon: Crown,
      color: '#ffd700',
      cta: 'Garantir Acesso VIP',
      ctaColor: 'bg-gradient-to-r from-[#ffd700] to-[#ffed4e] text-[#1a1a2e] hover:shadow-lg hover:shadow-[#ffd700]/30',
      popular: true,
      bonus: null
    }
  ]

  const getProductValue = (planName: string): number => {
    return planName === 'Pacote VIP' ? 37.90 : planName === 'Pacote Básico' ? 27.90 : 19.90
  }

  const getProductId = (planName: string): string => {
    return planName.toLowerCase().replace(/\s+/g, '-')
  }

  const generateEventId = (): string => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const handlePlanClick = (planName: string) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      const value = getProductValue(planName)
      const prodId = getProductId(planName)
      
      // ViewContent - Visualização do plano
      (window as any).fbq('track', 'ViewContent', {
        content_name: planName,
        content_type: 'product',
        content_id: prodId,
        value: value,
        currency: 'BRL',
        event_id: generateEventId()
      })
    }
  }

  const handleAddToCart = (planName: string) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      const value = getProductValue(planName)
      const prodId = getProductId(planName)
      
      // AddToCart - Adicionar ao carrinho
      (window as any).fbq('track', 'AddToCart', {
        content_name: planName,
        content_type: 'product',
        content_id: prodId,
        value: value,
        currency: 'BRL',
        event_id: generateEventId()
      })
    }
  }

  const handleInitiateCheckout = (planName: string) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      const value = getProductValue(planName)
      const prodId = getProductId(planName)
      
      // InitiateCheckout - Iniciar checkout
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: planName,
        content_type: 'product',
        content_id: prodId,
        value: value,
        currency: 'BRL',
        event_id: generateEventId()
      })
    }
  }

  const handleAddPaymentInfo = (planName: string) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      const value = getProductValue(planName)
      const prodId = getProductId(planName)
      
      // AddPaymentInfo - Adicionar informações de pagamento
      (window as any).fbq('track', 'AddPaymentInfo', {
        content_name: planName,
        content_type: 'product',
        content_id: prodId,
        value: value,
        currency: 'BRL',
        event_id: generateEventId()
      })
    }
  }

  const handleCheckout = (planName: string) => {
    // Disparar AddToCart e InitiateCheckout antes de redirecionar
    handleAddToCart(planName)
    handleInitiateCheckout(planName)
    
    // Redirecionar para checkout
    const checkoutUrl = checkoutLinks[planName]
    if (checkoutUrl) {
      setTimeout(() => {
        window.location.href = checkoutUrl
      }, 100)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#1a1a2e] to-[#0f0f0f]">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#1a1a2e] to-[#0f0f0f] border-b border-[#2a2a3e] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-[#2a2a3e] rounded-lg transition-colors flex-shrink-0"
            >
              <ArrowLeft className="text-gray-400" size={20} />
            </button>
            <h1 className="text-white text-lg sm:text-2xl font-bold text-center flex-1">Adquirir Acesso</h1>
            <div className="w-10 flex-shrink-0"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Urgency Banner */}
          <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-gradient-to-r from-[#ff6b6b]/20 to-[#ffd700]/20 border border-[#ff6b6b]/50 rounded-xl flex flex-col sm:flex-row items-center gap-2 sm:gap-3 animate-pulse">
            <AlertCircle className="text-[#ff6b6b] flex-shrink-0" size={20} />
            <div className="flex-1 text-center sm:text-left">
              <p className="text-white font-bold text-sm">⏰ Oferta por tempo limitado!</p>
              <p className="text-gray-300 text-xs">Tempo restante: <span className="font-bold text-[#ffd700]">{timeLeft}</span></p>
            </div>
          </div>

          {/* Hero Section with Emotional Appeal */}
          <div className="text-center mb-12 sm:mb-20">
            <div className="mb-4 sm:mb-6 inline-block">
              <span className="text-[#ffd700] text-xs sm:text-sm font-bold uppercase tracking-widest">⚡ Solução Completa para Automação</span>
            </div>
            
            <h2 className="text-white text-4xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 leading-tight">
              Economize <span className="text-[#ffd700]">100+ horas por mês</span> com
              <span className="bg-gradient-to-r from-[#ffd700] via-[#ff6b6b] to-[#5a5af6] bg-clip-text text-transparent"> Automação Inteligente</span>
            </h2>
            
            <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
              Cansado de trabalhar manualmente? Acesso a <span className="text-[#ffd700] font-bold">2500+ templates prontos</span>, prompts de IA que funcionam e ferramentas que <span className="text-[#ff6b6b] font-bold">multiplicam seus resultados</span> enquanto você dorme. Implementação em minutos, resultados em dias.
            </p>

            <div className="flex flex-col gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
              <div className="flex items-center justify-center gap-2 text-green-400">
                <Check size={18} />
                <span className="font-semibold text-sm sm:text-base">Acesso Vitalício</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-green-400">
                <Check size={18} />
                <span className="font-semibold text-sm sm:text-base">Sem Renovação</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-green-400">
                <Check size={18} />
                <span className="font-semibold text-sm sm:text-base">Garantia 7 Dias</span>
              </div>
            </div>
          </div>

          {/* Social Proof - Trust Signals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-24">
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f1419] border border-[#2a2a3e] rounded-lg p-6 sm:p-8 text-center hover:border-[#5a5af6] transition-all">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="bg-[#5a5af6]/20 p-3 sm:p-4 rounded-full">
                  <Users className="text-[#5a5af6]" size={28} />
                </div>
              </div>
              <p className="text-white font-black text-3xl sm:text-4xl mb-2">2,500+</p>
              <p className="text-gray-400 text-xs sm:text-sm font-semibold">Clientes Satisfeitos</p>
              <p className="text-gray-500 text-xs mt-2">Pessoas transformando seus negócios</p>
            </div>

            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f1419] border border-[#2a2a3e] rounded-lg p-6 sm:p-8 text-center hover:border-[#ffd700] transition-all">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="bg-[#ffd700]/20 p-3 sm:p-4 rounded-full">
                  <Award className="text-[#ffd700]" size={28} />
                </div>
              </div>
              <p className="text-white font-black text-3xl sm:text-4xl mb-2">98%</p>
              <p className="text-gray-400 text-xs sm:text-sm font-semibold">Taxa de Satisfação</p>
              <p className="text-gray-500 text-xs mt-2">Clientes que recomendam</p>
            </div>

            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f1419] border border-[#2a2a3e] rounded-lg p-6 sm:p-8 text-center hover:border-[#ff6b6b] transition-all">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="bg-[#ff6b6b]/20 p-3 sm:p-4 rounded-full">
                  <Star className="text-[#ff6b6b]" size={28} />
                </div>
              </div>
              <p className="text-white font-black text-3xl sm:text-4xl mb-2">4.9/5</p>
              <p className="text-gray-400 text-xs sm:text-sm font-semibold">Avaliação Média</p>
              <p className="text-gray-500 text-xs mt-2">Baseado em 1.200+ avaliações</p>
            </div>
          </div>

          {/* Plans Grid - Optimized for Conversion */}
          <div className="mb-16 sm:mb-24">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-white text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Escolha seu Plano Perfeito</h3>
              <p className="text-gray-400 text-base sm:text-lg px-2">Todos os planos incluem acesso vitalício a TEMPLATES N8N</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
              {plans.map((plan) => {
                const Icon = plan.icon
                return (
                  <div
                    key={plan.name}
                    className={`relative rounded-2xl border-2 p-4 sm:p-6 md:p-8 transition-all duration-300 ${
                      plan.popular
                        ? `border-[#ffd700] bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f1419] ring-2 ring-[#ffd700]/50 transform md:scale-110 md:-translate-y-8 shadow-2xl shadow-[#ffd700]/20 hover:shadow-2xl hover:shadow-[#ffd700]/40`
                        : `border-[#2a2a3e] bg-[#1a1a2e] hover:border-[#3a3a4e] hover:bg-[#1f1f33] hover:shadow-lg`
                    }`}
                    onClick={() => handlePlanClick(plan.name)}
                  >
                    {/* Popular Badge */}
                    {plan.popular && (
                      <div className="absolute -top-4 sm:-top-5 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-[#ffd700] to-[#ffed4e] px-4 sm:px-6 py-1.5 sm:py-2 rounded-full flex items-center gap-2 shadow-lg shadow-[#ffd700]/30">
                          <Flame size={16} className="text-[#1a1a2e]" fill="currentColor" />
                          <span className="text-[#1a1a2e] font-bold text-xs sm:text-sm">MAIS POPULAR</span>
                        </div>
                      </div>
                    )}

                    {/* Savings Badge */}
                    {plan.savings && (
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                        <span className="inline-block px-2 sm:px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                          {plan.savings}
                        </span>
                      </div>
                    )}

                    {/* Guarantee Badge */}
                    <div className="absolute top-12 sm:top-14 left-3 sm:left-4">
                      <div className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full">
                        <Shield size={14} />
                        <span>Garantia 7 Dias</span>
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="mb-4 sm:mb-6 text-center">
                      <div
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mx-auto"
                        style={{
                          backgroundColor: `${plan.color}20`,
                          border: `2px solid ${plan.color}40`
                        }}
                      >
                        <Icon size={28} style={{ color: plan.color }} />
                      </div>
                    </div>

                    {/* Plan Name */}
                    <h3 className="text-white text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-center">{plan.name}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 text-center">{plan.value}</p>

                    {/* Price - Emotional Appeal */}
                    <div className="mb-4 sm:mb-6 text-center">
                      <div className="flex items-baseline gap-2 justify-center">
                        {plan.originalPrice && (
                          <span className="text-gray-500 text-lg sm:text-2xl line-through">R$ {plan.originalPrice}</span>
                        )}
                        <span className="text-white text-4xl sm:text-5xl font-black">R$ {plan.price}</span>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">{plan.pricePerMonth}</p>
                      <p className="text-gray-500 text-xs mt-1">💰 Melhor investimento para seu futuro</p>
                    </div>

                    {/* CTA Button - High Conversion */}
                    <button
                      onClick={() => {
                        // Rastrear eventos Meta Pixel conforme padrões Meta
                        handleAddToCart(plan.name)
                        handleAddPaymentInfo(plan.name)
                        handleCheckout(plan.name)
                      }}
                      className={`w-full py-3 sm:py-4 rounded-lg font-bold mb-6 sm:mb-8 transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base ${plan.ctaColor}`}
                    >
                      {plan.cta}
                    </button>

                    {/* Features List */}
                    <div className="space-y-2 sm:space-y-3">
                      <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
                        ✓ Incluso neste plano:
                      </p>
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 sm:gap-3">
                          <Check
                            size={16}
                            className="text-green-400 flex-shrink-0 mt-0.5"
                            style={{ color: plan.color }}
                          />
                          <span className="text-gray-300 text-xs sm:text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f1419] border border-[#2a2a3e] rounded-2xl p-4 sm:p-6 md:p-8 mb-16 sm:mb-24 overflow-x-auto">
            <h3 className="text-white text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Comparação Completa de Pacotes</h3>
            
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#2a2a3e]">
                  <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-gray-400 font-semibold">Recurso</th>
                  <th className="text-center py-3 sm:py-4 px-2 sm:px-4 text-gray-400 font-semibold">Normal</th>
                  <th className="text-center py-3 sm:py-4 px-2 sm:px-4 text-gray-400 font-semibold">Básico</th>
                  <th className="text-center py-3 sm:py-4 px-2 sm:px-4 text-[#ffd700] font-bold">VIP ⭐</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#2a2a3e] hover:bg-[#2a2a3e]/50">
                  <td className="py-2 sm:py-4 px-2 sm:px-4 text-gray-300 font-semibold">TEMPLATES N8N</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4"><Check size={16} className="text-green-400 mx-auto" /></td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4"><Check size={16} className="text-green-400 mx-auto" /></td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4"><Check size={16} className="text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-[#2a2a3e] hover:bg-[#2a2a3e]/50">
                  <td className="py-2 sm:py-4 px-2 sm:px-4 text-gray-300 text-xs sm:text-base">Prompts Midjourney</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4 text-gray-500">-</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4"><Check size={16} className="text-green-400 mx-auto" /></td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4"><Check size={16} className="text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-[#2a2a3e] hover:bg-[#2a2a3e]/50">
                  <td className="py-2 sm:py-4 px-2 sm:px-4 text-gray-300 text-xs sm:text-base">Templates Typebot</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4 text-gray-500">-</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4"><Check size={16} className="text-green-400 mx-auto" /></td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4"><Check size={16} className="text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-[#2a2a3e] hover:bg-[#2a2a3e]/50">
                  <td className="py-2 sm:py-4 px-2 sm:px-4 text-gray-300 text-xs sm:text-base">SaaS Softwares</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4 text-gray-500">-</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4"><Check size={16} className="text-green-400 mx-auto" /></td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4"><Check size={16} className="text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-[#2a2a3e] hover:bg-[#2a2a3e]/50">
                  <td className="py-2 sm:py-4 px-2 sm:px-4 text-gray-300 text-xs sm:text-base">Pack Prompts ChatGPT</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4 text-gray-500">-</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4 text-gray-500">-</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4"><Check size={16} className="text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-[#2a2a3e] hover:bg-[#2a2a3e]/50">
                  <td className="py-2 sm:py-4 px-2 sm:px-4 text-gray-300 text-xs sm:text-base">Super Fluxos</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4 text-gray-500">-</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4 text-gray-500">-</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4"><Check size={16} className="text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-[#2a2a3e] hover:bg-[#2a2a3e]/50">
                  <td className="py-2 sm:py-4 px-2 sm:px-4 text-gray-300 text-xs sm:text-base">Self-Hosted Softwares</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4 text-gray-500">-</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4 text-gray-500">-</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4"><Check size={16} className="text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-[#2a2a3e] hover:bg-[#2a2a3e]/50">
                  <td className="py-2 sm:py-4 px-2 sm:px-4 text-gray-300 text-xs sm:text-base">Ferramentas Gratuitas</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4 text-gray-500">-</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4 text-gray-500">-</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4"><Check size={16} className="text-green-400 mx-auto" /></td>
                </tr>
                <tr className="hover:bg-[#2a2a3e]/50">
                  <td className="py-2 sm:py-4 px-2 sm:px-4 text-gray-300 font-semibold text-xs sm:text-base">Bônus Exclusivos</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4 text-gray-500">-</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4 text-gray-500">-</td>
                  <td className="text-center py-2 sm:py-4 px-2 sm:px-4"><Check size={16} className="text-green-400 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Testimonials - Social Proof */}
          <div className="mb-16 sm:mb-24">
            <h3 className="text-white text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Histórias de Sucesso de Nossos Clientes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f1419] border border-[#2a2a3e] rounded-xl p-4 sm:p-6 hover:border-[#5a5af6] transition-all">
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-[#ffd700]" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">&quot;Transformou completamente meu negócio! Os templates N8N economizaram 40h/mês de desenvolvimento. Recuperei meu investimento em 2 semanas!&quot;</p>
                <p className="text-gray-400 text-xs font-bold">João Silva</p>
                <p className="text-gray-500 text-xs">CEO, Agência Digital Silva</p>
                <p className="text-gray-500 text-xs mt-1">São Paulo, SP</p>
              </div>

              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f1419] border border-[#2a2a3e] rounded-xl p-4 sm:p-6 hover:border-[#ff6b6b] transition-all">
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-[#ffd700]" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">&quot;Os prompts de IA e templates Typebot aumentaram minhas conversões em 156%. Melhor investimento que fiz em automação!&quot;</p>
                <p className="text-gray-400 text-xs font-bold">Maria Santos</p>
                <p className="text-gray-500 text-xs">Especialista em Marketing Digital</p>
                <p className="text-gray-500 text-xs mt-1">Rio de Janeiro, RJ</p>
              </div>

              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f1419] border border-[#2a2a3e] rounded-xl p-4 sm:p-6 hover:border-[#ffd700] transition-all">
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-[#ffd700]" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">&quot;Acesso vitalício é perfeito para agências! Todos os meus clientes usam os templates. ROI garantido!&quot;</p>
                <p className="text-gray-400 text-xs font-bold">Pedro Costa</p>
                <p className="text-gray-500 text-xs">Diretor de Operações, TechFlow</p>
                <p className="text-gray-500 text-xs mt-1">Belo Horizonte, MG</p>
              </div>
            </div>
          </div>

          {/* Benefits Section - Emotional Triggers */}
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f1419] border border-[#2a2a3e] rounded-2xl p-4 sm:p-6 md:p-8 mb-16 sm:mb-24">
            <h3 className="text-white text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Por Que Escolher o Mega Pack 2500X?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 sm:h-12 w-10 sm:w-12 rounded-md bg-[#5a5af6]/20">
                    <Rocket className="h-5 sm:h-6 w-5 sm:w-6 text-[#5a5af6]" />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 sm:mb-2 text-sm sm:text-base">🚀 Economize 100+ Horas/Mês</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Automatize tarefas repetitivas e recupere tempo para o que realmente importa. Resultados em dias, não meses.</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 sm:h-12 w-10 sm:w-12 rounded-md bg-[#ffd700]/20">
                    <Sparkles className="h-6 w-6 text-[#ffd700]" />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 sm:mb-2 text-sm sm:text-base">✨ 2500+ Templates Prontos</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Não reinvente a roda. Use templates testados em produção real por centenas de profissionais.</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 sm:h-12 w-10 sm:w-12 rounded-md bg-[#ff6b6b]/20">
                    <Heart className="h-5 sm:h-6 w-5 sm:w-6 text-[#ff6b6b]" />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 sm:mb-2 text-sm sm:text-base">❤️ Suporte Especializado</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Equipe de especialistas pronta para ajudar com implementação e otimização dos seus fluxos.</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 sm:h-12 w-10 sm:w-12 rounded-md bg-[#5a5af6]/20">
                    <Shield className="h-5 sm:h-6 w-5 sm:w-6 text-[#5a5af6]" />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 sm:mb-2 text-sm sm:text-base">🛡️ Garantia 7 Dias 100%</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Teste sem risco. Se não gostar, reembolso total. Sem perguntas, sem burocracia.</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 sm:h-12 w-10 sm:w-12 rounded-md bg-[#ffd700]/20">
                    <Clock className="h-5 sm:h-6 w-5 sm:w-6 text-[#ffd700]" />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 sm:mb-2 text-sm sm:text-base">⏱️ Acesso Vitalício</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Pague uma vez, use para sempre. Sem renovações, sem surpresas, sem limites de uso.</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 sm:h-12 w-10 sm:w-12 rounded-md bg-[#ff6b6b]/20">
                    <TrendingUp className="h-5 sm:h-6 w-5 sm:w-6 text-[#ff6b6b]" />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 sm:mb-2 text-sm sm:text-base">📈 ROI em 2-3 Semanas</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Clientes recuperam investimento rapidamente. Alguns veem resultados em dias.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof - Image Gallery */}
          <div className="mb-16 sm:mb-24">
            <h3 className="text-white text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Veja os Resultados em Ação</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                { webp: '/img/01.webp', png: '/img/01.png', alt: 'Resultado 1 - Templates N8N em ação' },
                { webp: '/img/02.webp', png: '/img/02.png', alt: 'Resultado 2 - Automação de fluxos' },
                { webp: '/img/03.webp', png: '/img/03.png', alt: 'Resultado 3 - Dashboard de análise' },
                { webp: '/img/04.webp', png: '/img/04.png', alt: 'Resultado 4 - Integração de sistemas' },
                { webp: '/img/05.webp', png: '/img/05.png', alt: 'Resultado 5 - Otimização de processos' }
              ].map((image, index) => (
                <div key={index} className="relative group overflow-hidden rounded-xl border border-[#2a2a3e] hover:border-[#5a5af6] transition-all">
                  <div className="relative w-full aspect-video bg-[#1a1a2e]">
                    <picture>
                      <source srcSet={image.webp} type="image/webp" />
                      <img
                        src={image.png}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </picture>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-sm font-semibold">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-xs sm:text-sm mt-6 text-center">
              ✨ Estes são exemplos reais de como nossos templates transformam negócios
            </p>
          </div>

          {/* FAQ Section */}
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f1419] border border-[#2a2a3e] rounded-2xl p-4 sm:p-6 md:p-8 mb-16 sm:mb-24">
            <h3 className="text-white text-2xl sm:text-3xl font-bold mb-6 sm:mb-12 text-center">Perguntas Frequentes</h3>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="border-b border-[#2a2a3e] pb-4 sm:pb-6">
                <h4 className="text-white font-bold mb-1 sm:mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <Lightbulb size={16} className="text-[#ffd700] flex-shrink-0" />
                  Qual a diferença entre os pacotes?
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  O Pacote Normal oferece acesso vitalício apenas a TEMPLATES N8N. O Básico inclui 4 categorias extras por 1 ano. O VIP inclui todas as 8 categorias + bônus exclusivos por 1 ano. Todos incluem TEMPLATES N8N com acesso vitalício.
                </p>
              </div>

              <div className="border-b border-[#2a2a3e] pb-4 sm:pb-6">
                <h4 className="text-white font-bold mb-1 sm:mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <Lightbulb size={16} className="text-[#ffd700] flex-shrink-0" />
                  O TEMPLATES N8N tem acesso vitalício?
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Sim! Em todos os pacotes, TEMPLATES N8N tem acesso vitalício. Os outros recursos têm acesso por 1 ano (exceto no Pacote Normal que é apenas TEMPLATES N8N).
                </p>
              </div>

              <div className="border-b border-[#2a2a3e] pb-4 sm:pb-6">
                <h4 className="text-white font-bold mb-1 sm:mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <Lightbulb size={16} className="text-[#ffd700] flex-shrink-0" />
                  Como funciona o pagamento?
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Aceitamos cartão de crédito, débito e transferência bancária. O pagamento é processado de forma segura através de nossa plataforma de pagamento certificada.
                </p>
              </div>

              <div className="border-b border-[#2a2a3e] pb-4 sm:pb-6">
                <h4 className="text-white font-bold mb-1 sm:mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <Lightbulb size={16} className="text-[#ffd700] flex-shrink-0" />
                  Como recebo acesso após a compra?
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Após a confirmação do pagamento, seu acesso será ativado imediatamente. Você receberá um email de confirmação com os detalhes de acesso em até 5 minutos.
                </p>
              </div>

              <div className="border-b border-[#2a2a3e] pb-4 sm:pb-6">
                <h4 className="text-white font-bold mb-1 sm:mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <Lightbulb size={16} className="text-[#ffd700] flex-shrink-0" />
                  Há garantia de reembolso?
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Oferecemos garantia de 7 dias de reembolso total se você não ficar satisfeito com o serviço. Sem perguntas, sem complicações.
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold mb-1 sm:mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <Lightbulb size={16} className="text-[#ffd700] flex-shrink-0" />
                  O que acontece após 1 ano no Pacote Básico/VIP?
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Após 1 ano, você mantém acesso vitalício a TEMPLATES N8N. Para continuar com acesso às outras categorias, você pode renovar seu pacote com desconto especial.
                </p>
              </div>
            </div>
          </div>

          {/* Final CTA Section */}
          <div className="bg-gradient-to-r from-[#5a5af6]/20 via-[#ffd700]/20 to-[#ff6b6b]/20 border border-[#ffd700]/50 rounded-2xl p-6 sm:p-8 md:p-12 text-center mb-12 sm:mb-16">
            <h3 className="text-white text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Pronto para Transformar seu Negócio?</h3>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-8 px-2">
              Junte-se a 2.500+ clientes que já estão multiplicando sua produtividade e resultados com o Mega Pack 2500X.
            </p>
            <p className="text-[#ffd700] font-bold text-sm sm:text-base md:text-lg mb-6 sm:mb-8 px-2">
              ⏰ Oferta válida por: <span className="text-white">{timeLeft}</span>
            </p>
            <button
              onClick={() => {
                // Disparar eventos Meta Pixel conforme padrões
                handleAddToCart('Pacote VIP')
                handleAddPaymentInfo('Pacote VIP')
                handleCheckout('Pacote VIP')
              }}
              className="bg-gradient-to-r from-[#ffd700] to-[#ffed4e] text-[#1a1a2e] font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg hover:shadow-lg hover:shadow-[#ffd700]/30 transition-all transform hover:scale-105 active:scale-95 text-sm sm:text-base md:text-lg w-full sm:w-auto"
            >
              Garantir Acesso VIP Agora
            </button>
          </div>

          {/* Support Section */}
          <div className="text-center pb-8 sm:pb-12">
            <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
              Tem dúvidas? Entre em contato com nosso suporte
            </p>
            <a
              href="mailto:suporte@megapack2500x.com"
              className="text-[#7a7aff] hover:text-[#9a9aff] font-bold transition-colors text-sm sm:text-base"
            >
              suporte@megapack2500x.com
            </a>
          </div>
        </div>

        {/* Purchase Notification - Social Proof */}
        {currentNotification && (
          <div className="fixed bottom-4 left-4 z-40 animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="bg-gradient-to-r from-[#1a1a2e] to-[#0f1419] border border-[#5a5af6] rounded-lg p-3 sm:p-4 shadow-lg shadow-[#5a5af6]/30 max-w-xs">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#5a5af6]/20">
                    <Check size={16} className="text-[#5a5af6]" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-xs sm:text-sm">
                    {currentNotification.name}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {currentNotification.city} comprou o Pacote {currentNotification.plan}
                  </p>
                  <p className="text-[#5a5af6] text-xs mt-1 font-semibold">
                    ✓ Acesso confirmado
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
