'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#1a1a2e] to-[#0f0f0f]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#1a1a2e] to-[#0f0f0f] border-b border-[#2a2a3e] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-[#2a2a3e] rounded-lg transition-colors flex-shrink-0"
          >
            <ArrowLeft className="text-gray-400" size={20} />
          </button>
          <h1 className="text-white text-lg sm:text-2xl font-bold">Política de Privacidade</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-white text-2xl sm:text-3xl font-bold mb-6">Política de Privacidade</h2>

          <div className="space-y-8 text-gray-300">
            <section>
              <h3 className="text-white text-xl font-bold mb-4">1. Introdução</h3>
              <p className="mb-4">
                A sua privacidade é importante para nós. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você utiliza nossos serviços.
              </p>
            </section>

            <section>
              <h3 className="text-white text-xl font-bold mb-4">2. Informações que Coletamos</h3>
              <p className="mb-4">Coletamos informações que você nos fornece diretamente, incluindo:</p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Nome e endereço de email</li>
                <li>Informações de pagamento (processadas por terceiros)</li>
                <li>Dados de uso e interação com nossos serviços</li>
                <li>Informações de localização (com seu consentimento)</li>
              </ul>
            </section>

            <section>
              <h3 className="text-white text-xl font-bold mb-4">3. Como Usamos Suas Informações</h3>
              <p className="mb-4">Usamos as informações coletadas para:</p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Fornecer, manter e melhorar nossos serviços</li>
                <li>Processar transações e enviar confirmações</li>
                <li>Enviar comunicações de marketing (com consentimento)</li>
                <li>Rastrear conversões e otimizar campanhas de publicidade</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section>
              <h3 className="text-white text-xl font-bold mb-4">4. Compartilhamento de Informações</h3>
              <p className="mb-4">
                Não vendemos suas informações pessoais. Podemos compartilhar informações com:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Provedores de serviços (pagamento, hospedagem, análise)</li>
                <li>Meta Platforms para rastreamento de conversões</li>
                <li>Autoridades legais quando obrigado por lei</li>
              </ul>
            </section>

            <section>
              <h3 className="text-white text-xl font-bold mb-4">5. Cookies e Rastreamento</h3>
              <p className="mb-4">
                Usamos cookies e tecnologias similares para melhorar sua experiência. Você pode controlar as preferências de cookies através do banner de consentimento em nosso site.
              </p>
            </section>

            <section>
              <h3 className="text-white text-xl font-bold mb-4">6. Meta Pixel</h3>
              <p className="mb-4">
                Utilizamos o Meta Pixel para rastrear conversões e otimizar campanhas de publicidade. Seus dados são processados conforme a Política de Privacidade da Meta e os Termos das Ferramentas da Meta para Empresas.
              </p>
            </section>

            <section>
              <h3 className="text-white text-xl font-bold mb-4">7. Segurança de Dados</h3>
              <p className="mb-4">
                Implementamos medidas técnicas, físicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração ou divulgação.
              </p>
            </section>

            <section>
              <h3 className="text-white text-xl font-bold mb-4">8. Seus Direitos</h3>
              <p className="mb-4">
                Você tem o direito de acessar, corrigir ou solicitar a exclusão de suas informações pessoais. Para exercer esses direitos, entre em contato conosco.
              </p>
            </section>

            <section>
              <h3 className="text-white text-xl font-bold mb-4">9. Conformidade LGPD e GDPR</h3>
              <p className="mb-4">
                Estamos em conformidade com a Lei Geral de Proteção de Dados (LGPD) e o Regulamento Geral sobre a Proteção de Dados (GDPR). Processamos dados pessoais apenas com base legal apropriada e com consentimento quando necessário.
              </p>
            </section>

            <section>
              <h3 className="text-white text-xl font-bold mb-4">10. Contato</h3>
              <p className="mb-4">
                Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco em:
              </p>
              <p className="text-[#7a7aff] font-semibold">
                suporte@megapack2500x.com
              </p>
            </section>

            <section className="pt-8 border-t border-[#2a2a3e]">
              <p className="text-gray-500 text-sm">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
