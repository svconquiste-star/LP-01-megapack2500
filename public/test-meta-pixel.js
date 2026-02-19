// Script de teste interativo para Meta Pixel
// Cole este código no console do navegador para testar

window.testMetaPixel = {
  // Verificar status geral
  checkStatus: function() {
    console.clear();
    console.log('%c🧪 STATUS DO META PIXEL', 'color: #ffd700; font-size: 16px; font-weight: bold;');
    console.log('');
    
    const fbqLoaded = typeof window.fbq !== 'undefined';
    const locationObtained = window.clientLocation && window.clientLocation.city !== 'Unknown';
    const eventsStored = localStorage.getItem('meta_pixel_events');
    
    console.log('%c✅ Meta Pixel Carregado:', fbqLoaded ? 'color: green;' : 'color: red;', fbqLoaded);
    console.log('%c✅ Localização Obtida:', locationObtained ? 'color: green;' : 'color: orange;', locationObtained);
    console.log('%c✅ Eventos Armazenados:', 'color: blue;', eventsStored ? JSON.parse(eventsStored) : 'Nenhum');
    
    if (window.clientLocation) {
      console.log('%cLocalização:', 'color: blue; font-weight: bold;', window.clientLocation);
    }
    
    console.log('');
    console.log('%c💡 Comandos disponíveis:', 'color: #5a5af6; font-weight: bold;');
    console.log('  - testMetaPixel.enableLogging()  : Ativar log de eventos');
    console.log('  - testMetaPixel.disableLogging() : Desativar log de eventos');
    console.log('  - testMetaPixel.clearEvents()    : Limpar eventos armazenados');
    console.log('  - testMetaPixel.simulateClick()  : Simular clique em botão');
  },
  
  // Ativar logging de eventos
  enableLogging: function() {
    if (window.fbq && !window._fbqLoggingEnabled) {
      const originalFbq = window.fbq;
      window.fbq = function(...args) {
        if (args[0] === 'track') {
          const eventName = args[1];
          const eventData = args[2] || {};
          
          console.log('%c📊 EVENTO RASTREADO', 'color: #5a5af6; font-weight: bold;');
          console.log(`%cNome: ${eventName}`, 'color: #5a5af6;');
          console.log('%cDados:', 'color: #5a5af6;', eventData);
          console.log('');
        }
        return originalFbq.apply(this, args);
      };
      window._fbqLoggingEnabled = true;
      console.log('%c✅ Logging de eventos ativado', 'color: green; font-weight: bold;');
      console.log('Clique nos botões de pacotes para ver os eventos sendo rastreados');
    }
  },
  
  // Desativar logging
  disableLogging: function() {
    if (window._fbqLoggingEnabled) {
      location.reload();
    }
  },
  
  // Limpar eventos armazenados
  clearEvents: function() {
    localStorage.removeItem('meta_pixel_events');
    console.log('%c✅ Eventos armazenados foram limpos', 'color: green; font-weight: bold;');
  },
  
  // Simular clique em botão
  simulateClick: function(packageName = 'Pacote Básico') {
    console.log(`%c🎯 Simulando clique em: ${packageName}`, 'color: #ffd700; font-weight: bold;');
    
    const packageMap = {
      'Pacote Normal': { id: 'pkg_normal_1990', price: 19.90 },
      'Pacote Básico': { id: 'pkg_basico_2790', price: 27.90 },
      'Pacote VIP': { id: 'pkg_vip_3790', price: 37.90 }
    };
    
    const pkg = packageMap[packageName];
    if (!pkg) {
      console.error('❌ Pacote não encontrado. Use: "Pacote Normal", "Pacote Básico" ou "Pacote VIP"');
      return;
    }
    
    // Simular eventos
    if (window.fbq) {
      window.fbq('track', 'AddToCart', {
        value: pkg.price,
        currency: 'BRL',
        content_name: packageName,
        content_id: pkg.id,
        content_type: 'product',
        event_id: `test_${Date.now()}_add_to_cart`,
        city: window.clientLocation?.city || 'Unknown',
        state: window.clientLocation?.state || 'Unknown',
        country: window.clientLocation?.country || 'Unknown'
      });
      
      window.fbq('track', 'InitiateCheckout', {
        value: pkg.price,
        currency: 'BRL',
        content_name: packageName,
        content_id: pkg.id,
        content_type: 'product',
        event_id: `test_${Date.now()}_initiate_checkout`,
        city: window.clientLocation?.city || 'Unknown',
        state: window.clientLocation?.state || 'Unknown',
        country: window.clientLocation?.country || 'Unknown'
      });
    }
  },
  
  // Verificar deduplicação
  testDeduplication: function() {
    console.log('%c🔐 TESTE DE DEDUPLICAÇÃO', 'color: #ff6b6b; font-weight: bold;');
    console.log('Clicando 2x no mesmo botão em menos de 5 segundos...');
    console.log('');
    
    this.simulateClick('Pacote Básico');
    console.log('1º clique enviado');
    
    setTimeout(() => {
      this.simulateClick('Pacote Básico');
      console.log('2º clique enviado (deve ser bloqueado por deduplicação)');
    }, 1000);
  },
  
  // Mostrar eventos armazenados
  showStoredEvents: function() {
    const events = JSON.parse(localStorage.getItem('meta_pixel_events') || '{}');
    console.log('%c📦 EVENTOS ARMAZENADOS EM LOCALSTORAGE', 'color: #5a5af6; font-weight: bold;');
    console.table(events);
  }
};

// Executar verificação de status automaticamente
console.log('%c🚀 Meta Pixel Test Suite Carregado', 'color: #ffd700; font-size: 14px; font-weight: bold;');
console.log('Digite: testMetaPixel.checkStatus() para começar');
