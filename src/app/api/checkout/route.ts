import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { createPaymentPreference, PLANS, PlanId } from '@/lib/mercadopago'
import { generateId } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { planId, email, cvData } = body
    
    // DEBUG: Log do que chegou no checkout
    console.log('🛒 Checkout recebido:', { 
      planId, 
      email, 
      emailType: typeof email,
      cvDataKeys: Object.keys(cvData || {}) 
    })
    
    // Valida o plano
    if (!planId || !PLANS[planId as PlanId]) {
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      )
    }
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      )
    }
    
    if (!cvData) {
      return NextResponse.json(
        { error: 'Dados do currículo são obrigatórios' },
        { status: 400 }
      )
    }
    
    const supabase = supabaseAdmin()
    
    // Cria ou busca customer
    let customerId: string
    
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()
    
    console.log('👤 Customer existente:', existingCustomer?.id || 'não encontrado')
    
    if (existingCustomer) {
      // Atualiza customer existente com os novos dados do CV
      await supabase
        .from('customers')
        .update({
          plan: planId,
          status: 'pending',
          cv_data: cvData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingCustomer.id)
      
      customerId = existingCustomer.id
      console.log('✏️ Customer atualizado:', customerId)
    } else {
      // Cria novo customer
      const { data: newCustomer, error } = await supabase
        .from('customers')
        .insert({
          email: email.toLowerCase(),
          plan: planId,
          status: 'pending',
          searches_count: 0,
          searches_limit: PLANS[planId as PlanId].searches,
          cv_data: cvData,
        })
        .select('id')
        .single()
      
      if (error) throw error
      customerId = newCustomer.id
      console.log('🆕 Novo customer criado:', customerId, 'com email:', email.toLowerCase())
    }
    
    // Também salva como lead para ter histórico
    await supabase
      .from('leads')
      .upsert({
        email: email.toLowerCase(),
        cargo_desejado: cvData.cargo_desejado,
        source: 'checkout',
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'email',
      })
    
    // Cria preferência de pagamento no Mercado Pago
    const preference = await createPaymentPreference(
      planId as PlanId,
      email,
      customerId
    )
    
    console.log('💳 Preferência MP criada:', preference.id)
    
    return NextResponse.json({
      success: true,
      checkoutUrl: preference.init_point,
      preferenceId: preference.id,
    })
    
  } catch (error: any) {
    console.error('❌ Erro no checkout:', error)
    return NextResponse.json(
      { error: 'Erro ao criar checkout. Tente novamente.' },
      { status: 500 }
    )
  }
}