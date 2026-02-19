# 🧪 Guia de Testes - Meta Pixel com Geolocalização

## ✅ Implementação Concluída

Os seguintes arquivos foram criados e modificados:

### Arquivos Criados:
1. ✅ `components/MetaPixel.tsx` - Componente global de inicialização
2. ✅ `lib/metaPixel.ts` - Utilitários e funções de rastreamento
3. ✅ `lib/useMetaPixelTracker.ts` - Hook React para rastreamento

### Arquivos Modificados:
1. ✅ `app/layout.tsx` - Adicionado componente MetaPixel
2. ✅ `app/page.tsx` - Integrado hook e rastreamento de eventos

---

## 🧪 Como Testar os Eventos

### Passo 1: Abrir o Console do Navegador
1. Acesse `http://localhost:3000`
2. Pressione `F12` ou `Ctrl+Shift+I` para abrir o DevTools
3. Vá para a aba **Console**

### Passo 2: Verificar Inicialização do Meta Pixel
Cole o seguinte comando no console:

```javascript
// Verificar se Meta Pixel foi carregado
console.log('fbq carregado:', typeof window.fbq !== 'undefined');
console.log('Localização:', window.clientLocation);
console.log('Eventos armazenados:', JSON.parse(localStorage.getItem('meta_pixel_events') || '{}'));
```

**Resultado esperado:**
```
fbq carregado: true
Localização: {city: "São Paulo", state: "SP", country: "Brazil", latitude: -23.5505, longitude: -46.6333}
Eventos armazenados: {}
```

### Passo 3: Ativar Interceptador de Eventos
Cole no console:

```javascript
// Interceptar eventos para visualizar no console
const originalFbq = window.fbq;
window.fbq = function(...args) {
  if (args[0] === 'track') {
    console.log(`📊 EVENTO RASTREADO: ${args[1]}`, args[2]);
  }
  return originalFbq.apply(this, args);
};
console.log('✅ Interceptador ativado. Clique nos botões para ver os eventos.');
```

### Passo 4: Testar Clique em Botão de Pacote
1. Clique em qualquer botão de pacote (Normal, Básico ou VIP)
2. Observe o console para ver os eventos sendo rastreados

**Eventos esperados:**
```
📊 EVENTO RASTREADO: AddToCart {
  value: 27.90,
  currency: "BRL",
  content_name: "Pacote Básico",
  content_id: "pkg_basico_2790",
  content_type: "product",
  event_id: "550e8400-e29b-41d4-a716-446655440000_1708100001_add_to_cart_sp",
  city: "São Paulo",
  state: "SP",
  country: "Brazil"
}

📊 EVENTO RASTREADO: InitiateCheckout {
  value: 27.90,
  currency: "BRL",
  content_name: "Pacote Básico",
  content_id: "pkg_basico_2790",
  content_type: "product",
  event_id: "550e8400-e29b-41d4-a716-446655440000_1708100002_initiate_checkout_sp",
  city: "São Paulo",
  state: "SP",
  country: "Brazil"
}
```

### Passo 5: Verificar Deduplicação
1. Clique 2x rapidamente no mesmo botão
2. Observe que apenas 1 evento é enviado (o segundo é bloqueado por deduplicação)

**Console esperado:**
```
✅ Evento rastreado: AddToCart {...}
⚠️ Evento duplicado ignorado: 550e8400-e29b-41d4-a716-446655440000_1708100001_add_to_cart_sp
```

### Passo 6: Verificar localStorage
Cole no console:

```javascript
console.log('Eventos em localStorage:', JSON.parse(localStorage.getItem('meta_pixel_events')));
```

**Resultado esperado:**
```
Eventos em localStorage: {
  "550e8400-e29b-41d4-a716-446655440000_1708100001_add_to_cart_sp": 1708100001000,
  "550e8400-e29b-41d4-a716-446655440000_1708100002_initiate_checkout_sp": 1708100002000
}
```

---

## 📊 Eventos Rastreados

### 1. PageView (Automático)
- **Quando:** Ao carregar a página
- **Dados:** Nenhum dado adicional

### 2. ViewContent (Automático)
- **Quando:** Ao carregar a página
- **Dados:** Localização (city, state, country)

### 3. AddToCart (Clique em Botão)
- **Quando:** Ao clicar em qualquer botão de pacote
- **Dados:** Preço, nome do pacote, ID do pacote, localização

### 4. InitiateCheckout (Clique em Botão)
- **Quando:** Ao clicar em qualquer botão de pacote
- **Dados:** Preço, nome do pacote, ID do pacote, localização

---

## 🔐 Sistema de Deduplicação

**Como funciona:**
1. Cada evento recebe um `event_id` único: `{UUID}_{timestamp}_{action}_{city_code}`
2. O `event_id` é armazenado em `localStorage` com timestamp
3. Se o mesmo `event_id` for enviado em menos de 5 segundos, é ignorado
4. Meta Ads também deduplica automaticamente por `event_id`

**Exemplo:**
```
550e8400-e29b-41d4-a716-446655440000_1708100001_add_to_cart_sp
│                                      │             │         │
└─ UUID v4                             └─ Timestamp  └─ Ação   └─ City Code (SP)
```

---

## 🌍 Geolocalização

**Fonte:** ipapi.co (sem autenticação necessária)

**Dados coletados:**
- `city` - Cidade do cliente
- `state` - Estado/Região
- `country` - País
- `latitude` - Latitude (opcional)
- `longitude` - Longitude (opcional)

**Exemplo:**
```javascript
{
  city: "São Paulo",
  state: "SP",
  country: "Brazil",
  latitude: -23.5505,
  longitude: -46.6333
}
```

---

## ✅ Checklist de Validação

- [ ] Meta Pixel carregado (`window.fbq` existe)
- [ ] Localização obtida (`window.clientLocation` preenchido)
- [ ] ViewContent rastreado ao carregar página
- [ ] AddToCart rastreado ao clicar botão
- [ ] InitiateCheckout rastreado ao clicar botão
- [ ] event_id único gerado para cada evento
- [ ] Deduplicação funcionando (clique 2x = 1 evento)
- [ ] localStorage armazenando eventos
- [ ] Localização incluída em todos os eventos
- [ ] Preço e nome do pacote corretos em cada evento

---

## 🐛 Troubleshooting

### Meta Pixel não está carregado
- Verifique se o script foi adicionado ao `<head>`
- Verifique o console para erros de rede
- Aguarde alguns segundos para o script carregar

### Localização não está sendo obtida
- Verifique a conexão com ipapi.co
- Abra o DevTools → Network e procure por `ipapi.co`
- Se houver erro CORS, a localização será "Unknown"

### Eventos não estão sendo rastreados
- Verifique se `window.fbq` existe
- Verifique se o hook `useMetaPixelTracker` está sendo usado
- Verifique o console para mensagens de erro

### Deduplicação não está funcionando
- Verifique se `localStorage` está habilitado
- Verifique se o `event_id` é idêntico
- Aguarde menos de 5 segundos entre cliques

---

## 📝 Próximos Passos

1. Validar eventos no Meta Ads Manager
2. Configurar conversões no Meta Ads
3. Testar em produção
4. Monitorar performance e eventos duplicados
