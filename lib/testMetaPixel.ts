// Script de teste para validar eventos do Meta Pixel
// Execute no console do navegador para testar

export function testMetaPixelEvents() {
  console.log('🧪 Iniciando testes do Meta Pixel...')
  
  // Verificar se fbq está carregado
  if (!window.fbq) {
    console.error('❌ Meta Pixel não está carregado')
    return
  }
  
  console.log('✅ Meta Pixel carregado')
  
  // Verificar localização
  if (window.clientLocation) {
    console.log('✅ Localização obtida:', window.clientLocation)
  } else {
    console.warn('⚠️ Localização ainda não foi obtida')
  }
  
  // Verificar localStorage
  const storedEvents = localStorage.getItem('meta_pixel_events')
  console.log('📦 Eventos armazenados em localStorage:', storedEvents ? JSON.parse(storedEvents) : 'Nenhum evento armazenado')
  
  // Interceptar chamadas fbq para log
  const originalFbq = window.fbq
  window.fbq = function(...args: any[]) {
    if (args[0] === 'track') {
      console.log(`📊 Evento rastreado: ${args[1]}`, args[2])
    }
    return originalFbq.apply(this, args)
  }
  
  console.log('✅ Interceptador de eventos ativado')
  console.log('💡 Dica: Clique nos botões de pacotes para ver os eventos sendo rastreados')
}

// Executar teste automaticamente
if (typeof window !== 'undefined') {
  (window as any).testMetaPixelEvents = testMetaPixelEvents
}
