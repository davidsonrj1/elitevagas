import { MercadoPagoConfig, Preference, Payment } from 'mercadopago'

// Inicializa o cliente do Mercado Pago
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

export const mercadopago = {
  preference: new Preference(client),
  payment: new Payment(client),
}

// Planos disponíveis
export const PLANS = {
  single: {
    id: 'single',
    name: 'Unitário',
    price: 9.90,
    searches: 1,
    description: '1 busca de vagas curadas',
    features: [
      '1 busca de vagas',
      '5 vagas curadas',
      'Score de compatibilidade',
      'Resumo executivo',
    ],
  },
  monthly: {
    id: 'monthly',
    name: 'Mensal',
    price: 29.90,
    searches: null, // ilimitado
    description: 'Buscas ilimitadas por 30 dias',
    features: [
      'Buscas ilimitadas',
      'Alertas por email',
      'Vagas prioritárias',
      'Suporte WhatsApp',
    ],
    popular: true,
  },
  quarterly: {
    id: 'quarterly',
    name: 'Trimestral',
    price: 67.90,
    searches: null, // ilimitado
    description: 'Buscas ilimitadas por 90 dias',
    features: [
      'Tudo do Mensal',
      '23% de desconto',
      'Análise de CV',
      'Dicas personalizadas',
    ],
  },
} as const

export type PlanId = keyof typeof PLANS

// Cria preferência de pagamento
export async function createPaymentPreference(
  planId: PlanId,
  email: string,
  customerId: string
) {
  const plan = PLANS[planId]
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  
  // URLs de retorno apontam para página de aguardando com customer_id
  const aguardandoUrl = `${baseUrl}/pagamento/aguardando?customer_id=${customerId}&email=${encodeURIComponent(email)}`
  
  const preference = await mercadopago.preference.create({
    body: {
      items: [
        {
          id: planId,
          title: `Elite Vagas - Plano ${plan.name}`,
          description: plan.description,
          quantity: 1,
          unit_price: plan.price,
          currency_id: 'BRL',
        },
      ],
      payer: {
        email: email,
      },
      external_reference: customerId,
      back_urls: {
        // Todas as URLs vão para aguardando - o polling vai verificar o status real
        success: aguardandoUrl,
        failure: `${baseUrl}/pagamento/erro`,
        pending: aguardandoUrl,
      },
      auto_return: 'approved',
      notification_url: `${baseUrl}/api/webhooks/mercadopago`,
      statement_descriptor: 'ELITEVAGAS',
    },
  })
  
  return preference
}