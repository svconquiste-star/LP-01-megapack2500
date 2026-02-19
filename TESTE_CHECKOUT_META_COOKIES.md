# 🧪 Testes: Checkout Payment + Meta Pixel + Cookies

## 🚀 Começar Testes

**Servidor:** http://localhost:3000

---

## ✅ Teste 1: Verificar Links de Checkout

### Passo 1: Inspecionar Código
1. Abra: http://localhost:3000
2. Abra DevTools (F12) → Console
3. Execute:
```javascript
console.log('Links de checkout:');
console.log('Normal:', 'https://lastlink.com/p/C7520AC5D/checkout-payment/');
console.log('Básico:', 'https://lastlink.com/p/C7CF3D279/checkout-payment/');
console.log('VIP:', 'https://lastlink.com/p/CF34F42DC/checkout-payment/');
```

**Resultado esperado:**
- Links aparecem no console
- URLs estão corretas

---

## ✅ Teste 2: Aceitar Cookies e Clicar em Botão

### Passo 1: Aceitar Cookies
1. Banner de cookies aparece na parte inferior
2. Clique em "Aceitar"
3. localStorage.getItem('cookie_consent') === 'true'

### Passo 2: Ativar Logging de Eventos
No console, execute:
```javascript
const originalFbq = window.fbq;
window.fbq = function(...args) {
  if (args[0] === 'track') {
    console.log(`%c📊 ${args[1]}`, 'color: #5a5af6; font-weight: bold;', args[2]);
  }
  return originalFbq.apply(this, args);
};
console.log('%c✅ Logging ativado', 'color: green; font-weight: bold;');
```

### Passo 3: Clicar em Botão de Pacote
1. Clique em "Desbloquear Acesso" (Pacote Básico)
2. Observe os eventos no console:
   - AddToCart
   - InitiateCheckout
   - Purchase

### Passo 4: Verificar Redirecionamento
**Resultado esperado:**
- Eventos rastreados no console
- Redirecionamento para: https://lastlink.com/p/C7CF3D279/checkout-payment/
- URL muda na barra de endereço

---

## ✅ Teste 3: Validar Dados de Localização

### Passo 1: Verificar Localização
No console, execute:
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

### Passo 2: Verificar Dados nos Eventos
Ao clicar em botão, procure pelos eventos:
```
📊 AddToCart {
  value: 27.90,
  currency: "BRL",
  content_name: "Pacote Básico",
  content_id: "pkg_basico_2790",
  event_id: "..._add_to_cart_sp",
  city: "São Paulo",
  state: "SP",
  country: "Brazil"
}
```

**Validar:**
- ✅ city, state, country preenchidos
- ✅ event_id contém city_code (sp)
- ✅ value e currency corretos

---

## ✅ Teste 4: Testar Todos os 3 Pacotes

### Pacote Normal (R$ 19,90)
1. Recarregue a página
2. Clique em "Começar Agora"
3. **Verificar:**
   - Eventos rastreados com value: 19.90
   - content_id: pkg_normal_1990
   - Redirecionamento para: https://lastlink.com/p/C7520AC5D/checkout-payment/

### Pacote Básico (R$ 27,90)
1. Recarregue a página
2. Clique em "Desbloquear Acesso"
3. **Verificar:**
   - Eventos rastreados com value: 27.90
   - content_id: pkg_basico_2790
   - Redirecionamento para: https://lastlink.com/p/C7CF3D279/checkout-payment/

### Pacote VIP (R$ 37,90)
1. Recarregue a página
2. Clique em "Garantir Acesso VIP"
3. **Verificar:**
   - Eventos rastreados com value: 37.90
   - content_id: pkg_vip_3790
   - Redirecionamento para: https://lastlink.com/p/CF34F42DC/checkout-payment/

---

## ✅ Teste 5: Validar Deduplicação

### Passo 1: Clicar 2x Rapidamente
1. Clique em botão de pacote
2. Imediatamente, clique novamente (em menos de 5 segundos)
3. Observe o console

**Resultado esperado:**
```
📊 AddToCart {...}
📊 InitiateCheckout {...}
⚠️ Evento duplicado ignorado: ...
⚠️ Evento duplicado ignorado: ...
```

**Validar:**
- Apenas 1º clique gera eventos
- 2º clique é bloqueado por deduplicação

---

## ✅ Teste 6: Rejeitar Cookies e Clicar

### Passo 1: Limpar e Rejeitar
1. Abra console e execute:
```javascript
localStorage.clear();
location.reload();
```

2. Banner aparece novamente
3. Clique em "Rejeitar"

### Passo 2: Ativar Logging
```javascript
const originalFbq = window.fbq;
window.fbq = function(...args) {
  if (args[0] === 'track') {
    console.log(`%c📊 ${args[1]}`, 'color: #5a5af6; font-weight: bold;', args[2]);
  }
  return originalFbq.apply(this, args);
};
```

### Passo 3: Clicar em Botão
1. Clique em "Desbloquear Acesso"
2. Observe os eventos

**Resultado esperado:**
- Eventos ainda são rastreados (AddToCart, InitiateCheckout)
- Mas dados de usuário NÃO são enviados para Meta
- Redirecionamento ainda funciona

---

## ✅ Teste 7: Validar localStorage

### Passo 1: Verificar Consentimento
```javascript
console.log('Consentimento:', localStorage.getItem('cookie_consent'));
console.log('Data:', localStorage.getItem('cookie_consent_date'));
console.log('Eventos Meta:', JSON.parse(localStorage.getItem('meta_pixel_events') || '{}'));
```

**Resultado esperado:**
```
Consentimento: true
Data: 2026-02-19T19:26:00.000Z
Eventos Meta: {
  "550e8400-e29b-41d4-a716-446655440000_1708100001_add_to_cart_sp": 1708100001000,
  "550e8400-e29b-41d4-a716-446655440000_1708100002_initiate_checkout_sp": 1708100002000
}
```

---

## ✅ Teste 8: Validar Conformidade LGPD

### Checklist LGPD
- [x] Consentimento explícito obrigatório (banner)
- [x] Dados armazenados localmente (localStorage)
- [x] Dados hasheados antes de enviar para Meta
- [x] Usuário pode rejeitar (botão Rejeitar)
- [x] Usuário pode revogar (revokeCookieConsent)
- [x] Política de privacidade mencionada (link no banner)

### Teste de Revogação
```javascript
import { revokeCookieConsent } from '/lib/cookieUtils.ts';

revokeCookieConsent();

// Verificar
console.log('Consentimento após revogação:', localStorage.getItem('cookie_consent'));
console.log('Dados após revogação:', localStorage.getItem('user_data'));
```

**Resultado esperado:**
- Consentimento removido
- Dados do usuário removidos
- localStorage limpo

---

## 📊 Fluxo Completo de Teste

```
1. Abrir página
   ↓
2. Banner de cookies aparece
   ↓
3. Aceitar cookies
   ↓
4. Ativar logging de eventos
   ↓
5. Clicar em botão de pacote
   ↓
6. Verificar eventos no console:
   - AddToCart (com localização)
   - InitiateCheckout (com localização)
   - Purchase
   ↓
7. Verificar redirecionamento para Lastlink
   ↓
8. Verificar localStorage:
   - cookie_consent = true
   - meta_pixel_events preenchido
   ↓
9. Testar deduplicação (clicar 2x)
   ↓
10. Testar sem consentimento (rejeitar)
   ↓
11. Testar revogação
   ↓
12. ✅ TUDO OK!
```

---

## 🎯 Validação de Eventos

### Evento AddToCart
```javascript
{
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
```

### Evento InitiateCheckout
```javascript
{
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

### Evento Purchase
```javascript
{
  value: 27.90,
  currency: "BRL",
  content_name: "Pacote Básico",
  content_id: "pkg_basico_2790",
  content_type: "product"
}
```

---

## ✅ Checklist Final

- [ ] Links de checkout adicionados aos 3 pacotes
- [ ] Eventos rastreados ANTES do redirecionamento
- [ ] Redirecionamento funciona para cada pacote
- [ ] Dados de localização inclusos em eventos
- [ ] Event ID único para cada evento
- [ ] Deduplicação funciona (clique 2x = 1 evento)
- [ ] Consentimento de cookies respeitado
- [ ] Dados hasheados antes de enviar para Meta
- [ ] localStorage armazenando consentimento e eventos
- [ ] Revogação de consentimento funciona
- [ ] Conformidade LGPD validada

---

## 🎉 Testes Concluídos

Quando todos os itens acima estão marcados, o fluxo completo de **Checkout Payment + Meta Pixel + Cookies** está **100% funcional** e pronto para produção.

---

## 📞 Próximos Passos

1. ✅ Validar eventos localmente (este documento)
2. 📊 Validar eventos no Meta Ads Manager
3. 🚀 Deploy para produção
4. 📈 Monitorar conversões e ROI
5. 🎯 Otimizar campanhas com dados compartilhados
