import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get('customer_id')
    const email = searchParams.get('email')
    
    if (!customerId && !email) {
      return NextResponse.json({ error: 'customer_id ou email é obrigatório' }, { status: 400 })
    }
    
    const supabase = supabaseAdmin()
    
    // Busca o customer pelo ID ou email
    let query = supabase.from('customers').select('id, email, status, plan')
    
    if (customerId) {
      query = query.eq('id', customerId)
    } else if (email) {
      query = query.eq('email', email.toLowerCase())
    }
    
    const { data: customer, error } = await query.single()
    
    if (error || !customer) {
      return NextResponse.json({ 
        found: false,
        status: 'not_found' 
      })
    }
    
    // Retorna o status
    return NextResponse.json({
      found: true,
      status: customer.status, // 'pending', 'active', 'approved'
      plan: customer.plan,
      is_approved: customer.status === 'active'
    })
    
  } catch (error: any) {
    console.error('Erro ao verificar pagamento:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}