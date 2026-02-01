'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import { Section, Container, Card, Button, Badge } from './ui'
import { CheckIcon } from './Icons'
import { PLANS, PlanId } from '@/lib/mercadopago'

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
        
        {/* Money back guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-white/40 mt-8"
        >
          Pagamento 100% seguro via Mercado Pago. Satisfação garantida ou seu dinheiro de volta.
        </motion.p>
      </Container>
    </Section>
  )
}
