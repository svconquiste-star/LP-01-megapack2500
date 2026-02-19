# 🔍 Validação de Eventos - Meta Pixel com Geolocalização

## 📊 Eventos Esperados ao Clicar em Botão

Quando você clica em um botão de pacote, **2 eventos** devem ser rastreados:

### Evento 1: AddToCart
```javascript
{
  "event": "AddToCart",
  "data": {
    "value": 27.90,           // Preço do pacote
    "currency": "BRL",
    "content_name": "Pacote Básico",
    "content_id": "pkg_basico_2790",
    "content_type": "product",
    "event_id": "550e8400-e29b-41d4-a716-446655440000_1708100001_add_to_cart_sp",
    "city": "São Paulo",
    "state": "SP",
    "country": "Brazil"
  }
}
```

### Evento 2: InitiateCheckout
```javascript
{
  "event": "InitiateCheckout",
  "data": {
    "value": 27.90,           // Preço do pacote
    "currency": "BRL",
    "content_name": "Pacote Básico",
    "content_id": "pkg_basico_2790",
    "content_type": "product",
    "event_id": "550e8400-e29b-41d4-a716-446655440000_1708100002_initiate_checkout_sp",
    "city": "São Paulo",
    "state": "SP",
    "country": "Brazil"
  }
}
```

---

## 🧪 Teste 1: Verificar Meta Pixel Carregado

**No Console do Navegador:**
```javascript
console.log(typeof window.fbq !== 'undefined' ? '✅ Meta Pixel carregado' : '❌ Meta Pixel não carregado');
```

**Resultado esperado:** `✅ Meta Pixel carregado`

---

## 🧪 Teste 2: Verificar Localização

**No Console:**
```javascript
console.log('Localização:', window.clientLocation);
```

**Resultado esperado:**
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

## 🧪 Teste 3: Ativar Logging de Eventos

**No Console:**
```javascript
// Interceptar eventos fbq
const originalFbq = window.fbq;
window.fbq = function(...args) {
  if (args[0] === 'track') {
    console.log(`%c📊 EVENTO: ${args[1]}`, 'color: #5a5af6; font-weight: bold;');
    console.log('Dados:', args[2]);
    console.log('---');
  }
  return originalFbq.apply(this, args);
};
console.log('%c✅ Logging ativado', 'color: green; font-weight: bold;');
```

**Depois clique em um botão de pacote e observe os eventos no console.**

---

## 🧪 Teste 4: Verificar Deduplicação

**No Console:**
```javascript
// Clique 2x rapidamente no mesmo botão
// Resultado esperado: 1º evento enviado, 2º evento bloqueado
```

**Você deve ver:**
```
📊 EVENTO: AddToCart
Dados: {...}
---
📊 EVENTO: InitiateCheckout
Dados: {...}
---
⚠️ Evento duplicado ignorado: 550e8400-e29b-41d4-a716-446655440000_1708100001_add_to_cart_sp
```

---

## 🧪 Teste 5: Verificar localStorage

**No Console:**
```javascript
console.log('Eventos em localStorage:', JSON.parse(localStorage.getItem('meta_pixel_events')));
```

**Resultado esperado:**
```javascript
{
  "550e8400-e29b-41d4-a716-446655440000_1708100001_add_to_cart_sp": 1708100001000,
  "550e8400-e29b-41d4-a716-446655440000_1708100002_initiate_checkout_sp": 1708100002000
}
```

---

## 🎯 Teste 6: Validar Cada Pacote

### Pacote Normal (R$ 19,90)
- **ID:** `pkg_normal_1990`
- **Preço:** `19.90`
- **Clique no botão "Começar Agora"**
- **Verifique:** `content_id` = `pkg_normal_1990`, `value` = `19.90`

### Pacote Básico (R$ 27,90)
- **ID:** `pkg_basico_2790`
- **Preço:** `27.90`
- **Clique no botão "Desbloquear Acesso"**
- **Verifique:** `content_id` = `pkg_basico_2790`, `value` = `27.90`

### Pacote VIP (R$ 37,90)
- **ID:** `pkg_vip_3790`
- **Preço:** `37.90`
- **Clique no botão "Garantir Acesso VIP"**
- **Verifique:** `content_id` = `pkg_vip_3790`, `value` = `37.90`

---

## ✅ Checklist de Validação

Após executar todos os testes, confirme:

- [ ] Meta Pixel está carregado (`window.fbq` existe)
- [ ] Localização foi obtida (city, state, country preenchidos)
- [ ] Clique em botão gera 2 eventos (AddToCart + InitiateCheckout)
- [ ] `event_id` é único para cada evento
- [ ] `event_id` contém: UUID + timestamp + action + city_code
- [ ] Localização (city, state, country) está em todos os eventos
- [ ] Preço está correto para cada pacote
- [ ] Content ID está correto para cada pacote
- [ ] Deduplicação funciona (clique 2x = 1 evento)
- [ ] localStorage armazena os event_ids
- [ ] Eventos são limpos após 1 hora

---

## 🔗 Validação no Meta Ads Manager

1. Acesse: https://business.facebook.com/
2. Vá para: **Events Manager**
3. Selecione seu Pixel (ID: 1223994006324453)
4. Vá para: **Test Events**
5. Clique em um botão na página
6. Você deve ver os eventos aparecerem em tempo real

---

## 🐛 Troubleshooting

### Problema: Meta Pixel não carregado
**Solução:**
- Verifique se o script foi adicionado ao `<head>`
- Abra DevTools → Network e procure por `fbevents.js`
- Aguarde alguns segundos para o script carregar

### Problema: Localização é "Unknown"
**Solução:**
- Verifique a conexão com ipapi.co
- Abra DevTools → Network e procure por `ipapi.co`
- Se houver erro CORS, a localização será "Unknown"

### Problema: Eventos não aparecem no console
**Solução:**
- Verifique se o código de logging foi colado corretamente
- Recarregue a página (F5)
- Verifique se há erros no console (vermelho)

### Problema: Deduplicação não funciona
**Solução:**
- Verifique se localStorage está habilitado
- Abra DevTools → Application → Local Storage
- Confirme que `meta_pixel_events` está sendo salvo

---

## 📞 Próximos Passos

1. ✅ Validar eventos localmente (este documento)
2. 📊 Validar eventos no Meta Ads Manager
3. 🚀 Deploy para produção
4. 📈 Monitorar performance e eventos duplicados
5. 🎯 Configurar conversões e audiences no Meta Ads
