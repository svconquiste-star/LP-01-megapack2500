# 🎯 Guia Visual de Testes - Meta Pixel

## 📍 Localização do Servidor

```
http://localhost:3000
```

---

## 🔧 Passo 1: Preparar o Ambiente

### 1.1 Abrir a Página
- Acesse: `http://localhost:3000`
- Você verá a página de vendas com 3 pacotes

### 1.2 Abrir o Console do Navegador
- Pressione: `F12` (ou `Ctrl+Shift+I` no Windows)
- Clique na aba: **Console**

---

## 🧪 Passo 2: Teste de Inicialização

### 2.1 Verificar Meta Pixel
Cole no console:
```javascript
console.log('Meta Pixel:', typeof window.fbq !== 'undefined' ? '✅ Carregado' : '❌ Não carregado');
```

**Resultado esperado:** `Meta Pixel: ✅ Carregado`

### 2.2 Verificar Localização
Cole no console:
```javascript
console.log('Localização:', window.clientLocation);
```

**Resultado esperado:**
```
Localização: {
  city: "São Paulo",
  state: "SP",
  country: "Brazil",
  latitude: -23.5505,
  longitude: -46.6333
}
```

---

## 📊 Passo 3: Ativar Logging de Eventos

Cole no console:
```javascript
const originalFbq = window.fbq;
window.fbq = function(...args) {
  if (args[0] === 'track') {
    const eventName = args[1];
    const eventData = args[2];
    console.log('%c' + '='.repeat(60), 'color: #5a5af6;');
    console.log(`%c📊 EVENTO: ${eventName}`, 'color: #5a5af6; font-weight: bold; font-size: 14px;');
    console.log('%c' + '='.repeat(60), 'color: #5a5af6;');
    console.table(eventData);
    console.log('%c' + '='.repeat(60), 'color: #5a5af6;');
  }
  return originalFbq.apply(this, args);
};
console.log('%c✅ LOGGING ATIVADO', 'color: green; font-weight: bold; font-size: 14px;');
console.log('Clique em qualquer botão de pacote para ver os eventos');
```

---

## 🎬 Passo 4: Testar Clique em Botão

### 4.1 Clicar em "Pacote Básico"
1. Procure no navegador o card com título "Pacote Básico"
2. Clique no botão azul "Desbloquear Acesso"

### 4.2 Observar Eventos no Console
Você deve ver 2 eventos:

**Evento 1: AddToCart**
```
════════════════════════════════════════════════════════
📊 EVENTO: AddToCart
════════════════════════════════════════════════════════
value: 27.90
currency: BRL
content_name: Pacote Básico
content_id: pkg_basico_2790
content_type: product
event_id: 550e8400-e29b-41d4-a716-446655440000_1708100001_add_to_cart_sp
city: São Paulo
state: SP
country: Brazil
════════════════════════════════════════════════════════
```

**Evento 2: InitiateCheckout**
```
════════════════════════════════════════════════════════
📊 EVENTO: InitiateCheckout
════════════════════════════════════════════════════════
value: 27.90
currency: BRL
content_name: Pacote Básico
content_id: pkg_basico_2790
content_type: product
event_id: 550e8400-e29b-41d4-a716-446655440000_1708100002_initiate_checkout_sp
city: São Paulo
state: SP
country: Brazil
════════════════════════════════════════════════════════
```

---

## 🔐 Passo 5: Testar Deduplicação

### 5.1 Clicar 2x Rapidamente
1. Clique no botão "Desbloquear Acesso" do Pacote Básico
2. Imediatamente, clique novamente no mesmo botão (em menos de 5 segundos)

### 5.2 Observar Resultado
**Resultado esperado no console:**
```
✅ Evento rastreado: AddToCart {...}
✅ Evento rastreado: InitiateCheckout {...}
⚠️ Evento duplicado ignorado: 550e8400-e29b-41d4-a716-446655440000_1708100001_add_to_cart_sp
⚠️ Evento duplicado ignorado: 550e8400-e29b-41d4-a716-446655440000_1708100002_initiate_checkout_sp
```

**Conclusão:** Apenas os 2 primeiros eventos foram enviados, os 2 segundos foram bloqueados ✅

---

## 📦 Passo 6: Testar Todos os Pacotes

### Pacote Normal (R$ 19,90)
```
Botão: "Começar Agora"
Esperado:
  - content_id: pkg_normal_1990
  - value: 19.90
```

### Pacote Básico (R$ 27,90)
```
Botão: "Desbloquear Acesso"
Esperado:
  - content_id: pkg_basico_2790
  - value: 27.90
```

### Pacote VIP (R$ 37,90)
```
Botão: "Garantir Acesso VIP"
Esperado:
  - content_id: pkg_vip_3790
  - value: 37.90
```

---

## 💾 Passo 7: Verificar localStorage

Cole no console:
```javascript
const events = JSON.parse(localStorage.getItem('meta_pixel_events'));
console.log('Eventos em localStorage:');
console.table(events);
```

**Resultado esperado:**
```
Eventos em localStorage:
550e8400-e29b-41d4-a716-446655440000_1708100001_add_to_cart_sp: 1708100001000
550e8400-e29b-41d4-a716-446655440000_1708100002_initiate_checkout_sp: 1708100002000
```

---

## ✅ Checklist Final

Marque cada item conforme validar:

- [ ] Meta Pixel carregado (`window.fbq` existe)
- [ ] Localização obtida (city, state, country preenchidos)
- [ ] Clique em botão gera 2 eventos (AddToCart + InitiateCheckout)
- [ ] `event_id` é único (contém UUID + timestamp)
- [ ] Localização está em todos os eventos
- [ ] Preço correto para cada pacote:
  - [ ] Normal: 19.90
  - [ ] Básico: 27.90
  - [ ] VIP: 37.90
- [ ] Content ID correto para cada pacote:
  - [ ] Normal: pkg_normal_1990
  - [ ] Básico: pkg_basico_2790
  - [ ] VIP: pkg_vip_3790
- [ ] Deduplicação funciona (clique 2x = 1 evento)
- [ ] localStorage armazena os event_ids
- [ ] Todos os campos obrigatórios preenchidos

---

## 🎉 Sucesso!

Se todos os itens acima estão marcados, a implementação do Meta Pixel com geolocalização está **100% funcional** ✅

---

## 📚 Documentação Adicional

- `RESUMO_IMPLEMENTACAO.md` - Resumo técnico completo
- `VALIDACAO_EVENTOS.md` - Detalhes de validação
- `TESTE_RAPIDO.md` - Teste rápido em 1 minuto
- `TESTE_META_PIXEL.md` - Guia detalhado de testes

---

## 🚀 Próximos Passos

1. ✅ Validar eventos localmente (este documento)
2. 📊 Validar eventos no Meta Ads Manager (https://business.facebook.com/)
3. 🚀 Deploy para produção
4. 📈 Monitorar performance
5. 🎯 Configurar conversões no Meta Ads
