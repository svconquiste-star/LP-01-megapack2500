# ⚡ Teste Rápido - Meta Pixel

## 🚀 Começar Agora

1. **Abra o navegador:**
   ```
   http://localhost:3000
   ```

2. **Abra o Console (F12 → Console)**

3. **Cole este código:**
   ```javascript
   // Ativar logging de eventos
   const originalFbq = window.fbq;
   window.fbq = function(...args) {
     if (args[0] === 'track') {
       console.log(`%c📊 ${args[1]}`, 'color: #5a5af6; font-weight: bold;', args[2]);
     }
     return originalFbq.apply(this, args);
   };
   console.log('%c✅ Logging ativado!', 'color: green; font-weight: bold;');
   console.log('Clique em qualquer botão de pacote para ver os eventos');
   ```

4. **Clique em um botão de pacote**

5. **Veja os eventos no console:**
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

## ✅ O Que Validar

- ✅ `event_id` é único (UUID + timestamp + action + city)
- ✅ `city`, `state`, `country` estão preenchidos
- ✅ `value` e `currency` corretos
- ✅ `content_id` correto para cada pacote
- ✅ Clique 2x = apenas 1 evento (deduplicação)

## 🎯 Pacotes

| Botão | ID | Preço |
|-------|-----|-------|
| Normal | pkg_normal_1990 | 19.90 |
| Básico | pkg_basico_2790 | 27.90 |
| VIP | pkg_vip_3790 | 37.90 |

## 📚 Documentação Completa

Veja `RESUMO_IMPLEMENTACAO.md` para mais detalhes.
