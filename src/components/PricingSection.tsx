'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import { Section, Container, Card, Button, Badge } from './ui'
import { CheckIcon } from './Icons'
import { PLANS, PlanId } from '@/lib/mercadopago'

// Logo do Mercado Pago (SVG inline para não depender de arquivo externo)
function MercadoPagoLogo({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 152 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ícone do MP */}
      <path 
        d="M20 4C11.163 4 4 11.163 4 20s7.163 16 16 16 16-7.163 16-16S28.837 4 20 4zm0 28c-6.627 0-12-5.373-12-12S13.373 8 20 8s12 5.373 12 12-5.373 12-12 12z" 
        fill="#00AEEF"
      />
      <path 
        d="M20 12c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm3.5 9.5l-4.5 3v-6l4.5 3z" 
        fill="#00AEEF"
      />
      {/* Texto "mercado pago" */}
      <text x="44" y="24" fill="currentColor" fontSize="14" fontFamily="Arial, sans-serif" fontWeight="500">
        mercado pago
      </text>
    </svg>
  )
}

// Ícone de escudo/segurança
function ShieldIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Ícone de cadeado
function LockIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

// Ícone de garantia/medalha
function GuaranteeIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}

export function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const router = useRouter()
  
  const handleSelectPlan = (planId: PlanId) => {
    router.push(`/checkout/${planId}`)
  }
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
  }
  
  return (
    <Section id="precos" className="bg-gradient-to-b from-elite-dark via-[#0a1a0a] to-elite-dark">
      <Container size="lg">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-elite-green text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-6 font-mono"
          >
            Escolha seu plano
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-display"
          >
            Quanto vale{' '}
            <span 
              className="italic font-normal gradient-text"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              seu tempo?
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl mx-auto"
          >
            Cada dia sem aplicar pra vaga certa é um dia a mais longe do emprego que você merece.
          </motion.p>
        </motion.div>
        
        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {(Object.entries(PLANS) as [PlanId, typeof PLANS[PlanId]][]).map(([planId, plan], i) => (
            <motion.div
              key={planId}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              className={i === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}
            >
              <Card 
                hover 
                highlight={'popular' in plan && plan.popular}
                className="h-full flex flex-col"
              >
                {/* Popular badge */}
                {'popular' in plan && plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="success">MAIS POPULAR</Badge>
                  </div>
                )}
                
                {/* Plan name */}
                <h3 className="text-lg font-medium mb-2 font-display">{plan.name}</h3>
                
                {/* Price */}
                <div className="flex items-baseline justify-center gap-1 mb-6">
                  <span className="text-sm text-white/40">R$</span>
                  <span className="text-3xl sm:text-4xl font-bold">
                    {formatPrice(plan.price)}
                  </span>
                  <span className="text-white/40">
                    {planId === 'single' ? '/único' : planId === 'monthly' ? '/mês' : '/3 meses'}
                  </span>
                </div>
                
                {/* Features */}
                <ul className="space-y-3 text-left mb-8 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/70">
                      <CheckIcon size={16} className="text-elite-green mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA */}
                <Button
                  variant={'popular' in plan && plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                  onClick={() => handleSelectPlan(planId)}
                >
                  Escolher {plan.name}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Trust Badges - Seção de Segurança */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          {/* Container principal dos badges */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8">
            {/* Badges em grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Badge 1: Pagamento Seguro */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-elite-green/10 rounded-full flex items-center justify-center mb-3">
                  <LockIcon className="w-6 h-6 text-elite-green" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">Pagamento Seguro</h4>
                <p className="text-xs text-white/50">Criptografia SSL de ponta a ponta</p>
              </div>
              
              {/* Badge 2: Mercado Pago */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#00AEEF]/10 rounded-full flex items-center justify-center mb-3 overflow-hidden">
                  {/* Logo oficial do Mercado Pago */}
                  <img 
                    src="/images/mercadopago-logo.png" 
                    alt="Mercado Pago" 
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">Mercado Pago</h4>
                <p className="text-xs text-white/50">Plataforma líder em pagamentos</p>
              </div>
              
              {/* Badge 3: Garantia */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-elite-green/10 rounded-full flex items-center justify-center mb-3">
                  <ShieldIcon className="w-6 h-6 text-elite-green" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">Garantia de 7 dias</h4>
                <p className="text-xs text-white/50">Não gostou? Devolvemos seu dinheiro</p>
              </div>
            </div>
            
            {/* Linha divisória */}
            <div className="border-t border-white/10 my-6" />
            
            {/* Rodapé com logo do Mercado Pago e métodos de pagamento */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              {/* Logo Mercado Pago */}
              <div className="flex items-center gap-2">
                <img 
                  src="/images/mercadopago-logo.png" 
                  alt="Mercado Pago" 
                  className="w-8 h-8 object-contain"
                />
                <span className="text-white/70 text-sm font-medium">Mercado Pago</span>
              </div>
              
              {/* Separador */}
              <div className="hidden sm:block w-px h-6 bg-white/20" />
              
              {/* Métodos de pagamento */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/40">Aceita:</span>
                
                {/* Pix */}
                <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M9.5 4.5L12 2l2.5 2.5L12 7 9.5 4.5z" fill="#32BCAD"/>
                    <path d="M4.5 9.5L2 12l2.5 2.5L7 12l-2.5-2.5z" fill="#32BCAD"/>
                    <path d="M14.5 19.5L12 22l-2.5-2.5L12 17l2.5 2.5z" fill="#32BCAD"/>
                    <path d="M19.5 14.5L22 12l-2.5-2.5L17 12l2.5 2.5z" fill="#32BCAD"/>
                    <path d="M12 7l5 5-5 5-5-5 5-5z" stroke="#32BCAD" strokeWidth="1.5"/>
                  </svg>
                  <span className="text-xs text-white/60">Pix</span>
                </div>
                
                {/* Cartão */}
                <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded">
                  <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                    <line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                  <span className="text-xs text-white/60">Cartão</span>
                </div>
                
                {/* Boleto */}
                <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded">
                  <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 5h2v14H3zM7 5h1v14H7zM11 5h2v14h-2zM15 5h1v14h-1zM19 5h2v14h-2z"/>
                  </svg>
                  <span className="text-xs text-white/60">Boleto</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}