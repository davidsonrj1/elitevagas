import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { mercadopago, PLANS, PlanId } from '@/lib/mercadopago'

export async function POST(request: NextRequest) {
  try {
    // Pega query params (formato IPN)
    const { searchParams } = new URL(request.url)
    const topicFromQuery = searchParams.get('topic')
    const idFromQuery = searchParams.get('id')
    
    // Pega body (formato Webhook)
    let body: any = {}
    try {
      body = await request.json()
    } catch {
      // Body vazio é ok pro IPN
    }
    
    // Normaliza: aceita tanto IPN quanto Webhook
    const type = body.type || topicFromQuery
    const paymentId = body.data?.id || idFromQuery
    
    console.log('📩 Notificação recebida:', { type, paymentId, source: body.type ? 'webhook' : 'ipn' })
    
    // Só processa notificações de pagamento
    if (type !== 'payment') {
      return NextResponse.json({ received: true })
    }
    
    if (!paymentId) {
      return NextResponse.json({ error: 'Payment ID not found' }, { status: 400 })
    }
    
    const supabase = supabaseAdmin()
    
    // VERIFICA SE JÁ PROCESSOU ESTE PAGAMENTO
    const { data: existingPayment } = await supabase
      .from('payments')
      .select('status')
      .eq('mercadopago_payment_id', String(paymentId))
      .single()
    
    if (existingPayment?.status === 'approved') {
      console.log('⏭️ Pagamento já processado como approved, ignorando duplicata...')
      return NextResponse.json({ received: true, skipped: true })
    }
    
    // Busca detalhes do pagamento no Mercado Pago
    const payment = await mercadopago.payment.get({ id: Number(paymentId) })
    
    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }
    
    console.log('💳 Pagamento encontrado:', { 
      id: paymentId, 
      status: payment.status,
      amount: payment.transaction_amount,
      payerEmail: payment.payer?.email 
    })
    
    const customerId = payment.external_reference
    const status = payment.status
    
    // Mapeia status do MP para nosso status
    const statusMap: Record<string, string> = {
      approved: 'approved',
      pending: 'pending',
      in_process: 'pending',
      rejected: 'rejected',
      refunded: 'refunded',
      cancelled: 'rejected',
    }
    
    const mappedStatus = statusMap[status || ''] || 'pending'
    
    // Registra o pagamento
    await supabase.from('payments').upsert({
      mercadopago_payment_id: String(paymentId),
      customer_id: customerId,
      amount: payment.transaction_amount,
      status: mappedStatus,
      plan: payment.additional_info?.items?.[0]?.id || 'single',
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'mercadopago_payment_id',
    })
    
    // Se pagamento aprovado, ativa o plano e dispara buscas
    if (mappedStatus === 'approved' && customerId) {
      // Determina o plano baseado no valor
      let planId: PlanId = 'single'
      const amount = payment.transaction_amount || 0
      
      if (amount >= 60) {
        planId = 'quarterly'
      } else if (amount >= 25) {
        planId = 'monthly'
      }
      
      const plan = PLANS[planId]
      
      // Calcula data de expiração
      let expiresAt: string | null = null
      if (planId === 'monthly') {
        expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      } else if (planId === 'quarterly') {
        expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
      }
      
      // Busca dados do customer (incluindo CV e EMAIL ORIGINAL)
      const { data: customer } = await supabase
        .from('customers')
        .select('*')
        .eq('id', customerId)
        .single()
      
      // USA O EMAIL DO BANCO (que foi salvo corretamente no checkout)
      const customerEmail = customer?.email
      
      console.log('👤 Customer encontrado:', { 
        id: customerId, 
        emailNoBanco: customerEmail,
        plano: planId
      })
      
      // Atualiza customer - NÃO SOBRESCREVE O EMAIL
      await supabase
        .from('customers')
        .update({
          plan: planId,
          status: 'active',
          searches_limit: plan.searches,
          searches_count: plan.searches === null ? 0 : 1,
          expires_at: expiresAt,
          mercadopago_customer_id: payment.payer?.id ? String(payment.payer.id) : undefined,
          updated_at: new Date().toISOString(),
        })
        .eq('id', customerId)
      
      console.log(`✅ Pagamento aprovado: Customer ${customerId}, Plano ${planId}`)
      
      // Valida se o email é válido
      const isValidEmail = (email: string | undefined): boolean => {
        return !!email && email.includes('@') && email.includes('.')
      }
      
      const cvData = customer?.cv_data
      
      if (isValidEmail(customerEmail) && cvData) {
        const payload = {
          user_id: customerId,
          user_email: customerEmail,
          cv_data: typeof cvData === 'string' ? JSON.parse(cvData) : cvData,
          plan: planId,
        }
        
        // 0. DISPARA EMAIL DE BOAS-VINDAS (instantâneo)
        const n8nWebhookBoasVindas = process.env.N8N_WEBHOOK_BOAS_VINDAS
        if (n8nWebhookBoasVindas) {
          console.log(`📧 Disparando email de boas-vindas para ${customerEmail}`)
          try {
            await fetch(n8nWebhookBoasVindas, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            })
            console.log('✅ Email de boas-vindas disparado')
          } catch (err) {
            console.error('❌ Erro ao disparar boas-vindas:', err)
          }
        }
        
        // 1. DISPARA BUSCA DE VAGAS (todos os planos)
        const n8nWebhookVagas = process.env.N8N_WEBHOOK_BUSCAR_VAGAS
        if (n8nWebhookVagas) {
          console.log(`🔍 Disparando busca de vagas para ${customerEmail}`)
          try {
            await fetch(n8nWebhookVagas, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            })
            console.log('✅ Busca de vagas disparada')
          } catch (err) {
            console.error('❌ Erro ao disparar busca de vagas:', err)
          }
        }
        
        // 2. DISPARA ANÁLISE DE CV (apenas plano trimestral)
        if (planId === 'quarterly') {
          const n8nWebhookAnalise = process.env.N8N_WEBHOOK_ANALISE_CV
          if (n8nWebhookAnalise) {
            console.log(`📊 Disparando análise de CV para ${customerEmail} (plano trimestral)`)
            try {
              await fetch(n8nWebhookAnalise, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
              })
              console.log('✅ Análise de CV disparada')
            } catch (err) {
              console.error('❌ Erro ao disparar análise de CV:', err)
            }
          }
        }
        
        // Registra a busca
        await supabase.from('searches').insert({
          customer_id: customerId,
          email: customerEmail,
          cargo_desejado: (typeof cvData === 'string' ? JSON.parse(cvData) : cvData).cargo_desejado || '',
          cv_data: cvData,
          source: 'payment_approved',
        })
      } else {
        console.warn('⚠️ Não foi possível disparar buscas:', {
          hasEmail: !!customerEmail,
          emailIsValid: isValidEmail(customerEmail),
          hasCvData: !!cvData,
        })
      }
    }
    
    return NextResponse.json({ received: true, status: mappedStatus })
    
  } catch (error: any) {
    console.error('❌ Erro no webhook MP:', error)
    return NextResponse.json({ error: error.message }, { status: 200 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'Elite Vagas Webhook' })
}