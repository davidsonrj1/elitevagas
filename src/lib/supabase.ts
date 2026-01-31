import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Cliente com service role para operações admin (só usar no servidor)
export const supabaseAdmin = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, serviceRoleKey)
}

// Tipos do banco de dados
export type Plan = 'single' | 'monthly' | 'quarterly'

export interface Lead {
  id: string
  email: string
  cargo_desejado: string
  created_at: string
  free_trial_used: boolean
  ip_address?: string
}

export interface Customer {
  id: string
  email: string
  plan: Plan
  status: 'active' | 'cancelled' | 'expired'
  mercadopago_customer_id?: string
  mercadopago_subscription_id?: string
  searches_count: number
  searches_limit: number | null // null = ilimitado
  created_at: string
  expires_at?: string
}

export interface Search {
  id: string
  customer_id?: string
  lead_id?: string
  email: string
  cargo_desejado: string
  cv_data: any
  vagas_encontradas: number
  created_at: string
}

export interface Payment {
  id: string
  customer_id: string
  mercadopago_payment_id: string
  plan: Plan
  amount: number
  status: 'pending' | 'approved' | 'rejected' | 'refunded'
  created_at: string
}
