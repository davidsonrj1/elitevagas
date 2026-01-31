# Elite Vagas 🎯

Curadoria inteligente de vagas com IA.

## Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Payments**: Mercado Pago
- **Automation**: n8n (busca de vagas + envio de email)

## Setup

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```


## Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── api/               # API Routes
│   │   ├── free-trial/    # Endpoint teste grátis
│   │   ├── checkout/      # Criar checkout MP
│   │   └── webhooks/      # Webhooks MP
│   ├── pagamento/         # Páginas de retorno
│   └── page.tsx           # Landing page
├── components/            # Componentes React
├── lib/                   # Utilitários e configs
│   ├── supabase.ts       # Cliente Supabase
│   ├── mercadopago.ts    # Config Mercado Pago
│   └── utils.ts          # Funções auxiliares
└── styles/               # CSS global
```

## Fluxo do Sistema

### Teste Grátis
1. Usuário preenche email + cargo
2. API valida se já usou teste grátis
3. Registra lead no Supabase
4. Chama webhook n8n para buscar vagas
5. n8n envia email com vagas curadas

### Plano Pago
1. Usuário escolhe plano
2. API cria preferência no Mercado Pago
3. Usuário é redirecionado para checkout
4. Após pagamento, MP envia webhook
5. Sistema ativa plano do cliente
6. Cliente pode buscar vagas (limite conforme plano)

## API Endpoints

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/checkout` | POST | Criar checkout MP |
| `/api/webhooks/mercadopago` | POST | Webhook pagamentos |

## Planos

| Plano | Preço | Buscas |
|-------|-------|--------|
| Unitário | R$ 9,90 | 1 |
| Mensal | R$ 29,90 | Ilimitado |
| Trimestral | R$ 67,90 | Ilimitado |

## Licença

Proprietário - Franca Assessoria
