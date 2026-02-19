# 🎯 README - Testes do Meta Pixel

## 🚀 Comece Aqui

Seu servidor está rodando em: **http://localhost:3000**

---

## ⚡ Teste em 30 Segundos

1. Abra: http://localhost:3000
2. Pressione: `F12` (abrir DevTools)
3. Clique na aba: **Console**
4. Cole este código:

```javascript
const originalFbq = window.fbq;
window.fbq = function(...args) {
  if (args[0] === 'track') {
    console.log(`%c📊 ${args[1]}`, 'color: #5a5af6; font-weight: bold;', args[2]);
  }
  return originalFbq.apply(this, args);
};
console.log('%c✅ Logging ativado!', 'color: green; font-weight: bold;');
```

5. Clique em qualquer botão de pacote
6. Veja os eventos no console

---

## 📖 Documentação Disponível

| Arquivo | Descrição |
|---------|-----------|
| **GUIA_TESTES_VISUAL.md** | 📍 Guia passo a passo com screenshots |
| **VALIDACAO_EVENTOS.md** | 🔍 Detalhes técnicos de validação |
| **RESUMO_IMPLEMENTACAO.md** | 📋 Resumo completo da implementação |
| **TESTE_RAPIDO.md** | ⚡ Teste rápido em 1 minuto |
| **IMPLEMENTACAO_CONCLUIDA.md** | ✅ Status final da implementação |

---

## 🎯 O Que Você Deve Ver

Quando clicar em um botão, 2 eventos devem aparecer no console:

### Evento 1: AddToCart
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

### Evento 2: InitiateCheckout
```
📊 InitiateCheckout {
  value: 27.90,
  currency: "BRL",
  content_name: "Pacote Básico",
  content_id: "pkg_basico_2790",
  event_id: "..._initiate_checkout_sp",
  city: "São Paulo",
  state: "SP",
  country: "Brazil"
}
```

---

## ✅ Validação Rápida

Após clicar em um botão, verifique:

- ✅ 2 eventos aparecem no console
- ✅ `event_id` é único (contém UUID + timestamp)
- ✅ `city`, `state`, `country` estão preenchidos
- ✅ `value` está correto (19.90, 27.90 ou 37.90)
- ✅ `content_id` está correto para cada pacote

---

## 🔐 Teste de Deduplicação

1. Clique em um botão
2. Imediatamente, clique novamente no mesmo botão
3. Resultado esperado: Apenas 1 evento é enviado, o 2º é bloqueado

---

## 📦 Pacotes

| Botão | Preço | ID |
|-------|-------|-----|
| Começar Agora | R$ 19,90 | pkg_normal_1990 |
| Desbloquear Acesso | R$ 27,90 | pkg_basico_2790 |
| Garantir Acesso VIP | R$ 37,90 | pkg_vip_3790 |

---

## 🌍 Localização

Sua localização será obtida automaticamente via ipapi.co:
```javascript
window.clientLocation = {
  city: "São Paulo",
  state: "SP",
  country: "Brazil",
  latitude: -23.5505,
  longitude: -46.6333
}
```

---

## 🐛 Problemas?

**Meta Pixel não carregado?**
- Verifique: `console.log(typeof window.fbq)`
- Deve retornar: `"function"`

**Localização é "Unknown"?**
- Verifique a conexão com ipapi.co
- Abra DevTools → Network → procure por "ipapi.co"

**Eventos não aparecem?**
- Recarregue a página (F5)
- Verifique se há erros em vermelho no console

---

## 📊 Próximos Passos

1. ✅ Testar eventos localmente (este arquivo)
2. 📊 Validar no Meta Ads Manager
3. 🚀 Deploy para produção
4. 📈 Monitorar performance

---

## 💡 Dica

Para uma validação mais completa, veja **GUIA_TESTES_VISUAL.md** que tem instruções passo a passo com todos os detalhes.

---

**Status:** ✅ Implementação Concluída e Testada  
**Servidor:** http://localhost:3000 (Rodando)  
**Pixel ID:** 1223994006324453
