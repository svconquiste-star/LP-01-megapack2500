'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Check, Lock, Zap, Crown, Gift, Star, TrendingUp, Flame, Users, Award, Heart, Lightbulb, Rocket, Shield, Clock, Sparkles, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import Script from 'next/script'

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

export default function VendasPage() {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState('23:59:59')
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showUrgency, setShowUrgency] = useState(true)
  const [conversionAttempts, setConversionAttempts] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const end = new Date()
      end.setHours(23, 59, 59)
      
      if (new Date() > end) {
        end.setDate(end.getDate() + 1)
      }
      
      const endTime = end.getTime()
      const diff = Math.floor((endTime - now) / 1000)
      const hours = Math.floor(diff / 3600)
      const minutes = Math.floor((diff % 3600) / 60)
      const seconds = diff % 60
      
      setTimeLeft(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const plans: PlanData[] = [
    {
      name: 'Pacote Normal',
      price: '19,90',
      pricePerMonth: '∞ (Vitalício)',
      value: 'Perfeito para começar',
      savings: null,
      features: [
        'TEMPLATES N8N (Vitalício)',
        'Acesso permanente',
        'Sem renovação'
      ],
      icon: Lock,
      color: '#ff6b6b',
      cta: 'Começar Agora',
      ctaColor: 'bg-[#2a2a3e] text-white hover:bg-[#3a3a4e]',
      popular: false,
      bonus: null
    },
    {
      name: 'Pacote Básico',
      price: '27,90',
      pricePerMonth: 'R$ 2,33/mês',
      value: 'Melhor custo-benefício',
      savings: 'ECONOMIZE 40%',
      features: [
        'TEMPLATES N8N (Vitalício)',
        'Prompts Midjourney',
        'Templates Typebot',
        'SaaS Softwares'
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
      pricePerMonth: 'R$ 3,16/mês',
      value: 'Acesso completo + Bônus',
      savings: 'ECONOMIZE 50%',
      features: [
        'TEMPLATES N8N (Vitalício)',
        'Pack Prompts Para ChatGPT',
        'Super Fluxos',
        'Templates Typebot',
        'Self-Hosted Softwares',
        'SaaS Softwares',
        'Prompts Midjourney',
        'Ferramentas Gratuitas',
        'Bônus Exclusivos'
      ],
      icon: Crown,
      color: '#ffd700',
      cta: 'Garantir Acesso VIP',
      ctaColor: 'bg-gradient-to-r from-[#ffd700] to-[#ffed4e] text-[#1a1a2e] hover:shadow-lg hover:shadow-[#ffd700]/30',
      popular: true,
      bonus: null
    }
  ]

  const handlePlanClick = (planName: string) => {
    setSelectedPlan(planName)
    setConversionAttempts(prev => prev + 1)
    
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'ViewContent', {
        content_name: planName,
        content_type: 'product',
        value: planName === 'Pacote VIP' ? 37.90 : planName === 'Pacote Básico' ? 27.90 : 19.90,
        currency: 'BRL'
      })
    }
  }

  const handleCheckout = (planName: string) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: planName,
        content_type: 'product',
        value: planName === 'Pacote VIP' ? 37.90 : planName === 'Pacote Básico' ? 27.90 : 19.90,
        currency: 'BRL'
      })
    }
    
    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Purchase', {
          content_name: planName,
          content_type: 'product',
          value: planName === 'Pacote VIP' ? 37.90 : planName === 'Pacote Básico' ? 27.90 : 19.90,
          currency: 'BRL'
        })
      }
    }, 500)
  }

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1223994006324453');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1223994006324453&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

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
          {showUrgency && (
            <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-gradient-to-r from-[#ff6b6b]/20 to-[#ffd700]/20 border border-[#ff6b6b]/50 rounded-xl flex flex-col sm:flex-row items-center gap-2 sm:gap-3 animate-pulse">
              <AlertCircle className="text-[#ff6b6b] flex-shrink-0" size={20} />
              <div className="flex-1 text-center sm:text-left">
                <p className="text-white font-bold text-sm">⏰ Oferta por tempo limitado!</p>
                <p className="text-gray-300 text-xs">Tempo restante: <span className="font-bold text-[#ffd700]">{timeLeft}</span></p>
              </div>
              <button
                onClick={() => setShowUrgency(false)}
                className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
              >
                ✕
              </button>
            </div>
          )}

          {/* Hero Section with Emotional Appeal */}
          <div className="text-center mb-12 sm:mb-20">
            <div className="mb-4 sm:mb-6 inline-block">
              <span className="text-[#ffd700] text-xs sm:text-sm font-bold uppercase tracking-widest">Transforme seu negócio hoje</span>
            </div>
            
            <h2 className="text-white text-4xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 leading-tight">
              Desbloqueie Todo o Potencial do
              <span className="bg-gradient-to-r from-[#ffd700] via-[#ff6b6b] to-[#5a5af6] bg-clip-text text-transparent"> Mega Pack 2500X</span>
            </h2>
            
            <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
              Acesso a <span className="text-[#ffd700] font-bold">2500+ templates premium</span>, prompts de IA avançados e ferramentas que vão <span className="text-[#ff6b6b] font-bold">multiplicar sua produtividade</span> e transformar seus resultados em semanas, não meses.
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
                        <span className="text-white text-4xl sm:text-5xl font-black">R$ {plan.price}</span>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">{plan.pricePerMonth}</p>
                      <p className="text-gray-500 text-xs mt-1">💰 Melhor investimento para seu futuro</p>
                    </div>

                    {/* CTA Button - High Conversion */}
                    <button
                      onClick={() => handleCheckout(plan.name)}
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
                <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">&quot;Transformou completamente meu negócio! Os templates são incríveis e o suporte é excelente. Recuperei meu investimento em 2 semanas!&quot;</p>
                <p className="text-gray-400 text-xs font-bold">João Silva</p>
                <p className="text-gray-500 text-xs mt-1">Economizou 40h/mês</p>
              </div>

              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f1419] border border-[#2a2a3e] rounded-xl p-4 sm:p-6 hover:border-[#ff6b6b] transition-all">
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-[#ffd700]" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">&quot;Melhor investimento que fiz! Economizei horas de trabalho com os templates prontos. Minha produtividade triplicou!&quot;</p>
                <p className="text-gray-400 text-xs font-bold">Maria Santos</p>
                <p className="text-gray-500 text-xs mt-1">Produtividade +300%</p>
              </div>

              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f1419] border border-[#2a2a3e] rounded-xl p-4 sm:p-6 hover:border-[#ffd700] transition-all">
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-[#ffd700]" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">&quot;Acesso vitalício é perfeito! Não preciso me preocupar com renovações. Recomendo para todos os meus colegas!&quot;</p>
                <p className="text-gray-400 text-xs font-bold">Pedro Costa</p>
                <p className="text-gray-500 text-xs mt-1">Recomendou para 15+ pessoas</p>
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
                  <h4 className="text-white font-bold mb-1 sm:mb-2 text-sm sm:text-base">🚀 Transformação Rápida</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Veja resultados em dias, não meses. Comece a usar os templates imediatamente após a compra.</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 sm:h-12 w-10 sm:w-12 rounded-md bg-[#ffd700]/20">
                    <Sparkles className="h-6 w-6 text-[#ffd700]" />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">✨ Qualidade Premium</h4>
                  <p className="text-gray-400 text-sm">Todos os templates foram criados por especialistas e testados em produção real.</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 sm:h-12 w-10 sm:w-12 rounded-md bg-[#ff6b6b]/20">
                    <Heart className="h-5 sm:h-6 w-5 sm:w-6 text-[#ff6b6b]" />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 sm:mb-2 text-sm sm:text-base">❤️ Suporte Dedicado</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Equipe de especialistas pronta para ajudar com dúvidas e orientações personalizadas.</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 sm:h-12 w-10 sm:w-12 rounded-md bg-[#5a5af6]/20">
                    <Shield className="h-5 sm:h-6 w-5 sm:w-6 text-[#5a5af6]" />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 sm:mb-2 text-sm sm:text-base">🛡️ Garantia 100%</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">7 dias de garantia de reembolso total se não ficar satisfeito. Sem perguntas.</p>
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
                  <p className="text-gray-400 text-xs sm:text-sm">Pague uma vez, use para sempre. Sem renovações, sem surpresas, sem limites.</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 sm:h-12 w-10 sm:w-12 rounded-md bg-[#ff6b6b]/20">
                    <TrendingUp className="h-5 sm:h-6 w-5 sm:w-6 text-[#ff6b6b]" />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 sm:mb-2 text-sm sm:text-base">📈 ROI Garantido</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Clientes recuperam seu investimento em média em 2-3 semanas de uso.</p>
                </div>
              </div>
            </div>
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
              onClick={() => handleCheckout('Pacote VIP')}
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
      </div>
    </>
  )
}
