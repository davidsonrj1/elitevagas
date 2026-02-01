'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section, Container, Button } from './ui'
import { CheckIcon, ArrowRightIcon } from './Icons'

const benefits = [
  {
    text: 'Economiza horas de busca manual',
    emphasis: 'horas',
  },
  {
    text: 'Evita candidaturas inúteis',
    emphasis: 'inúteis',
  },
  {
    text: 'Descobre vagas que talvez nunca encontraria',
    emphasis: 'nunca',
  },
  {
    text: 'Aumenta suas chances de resposta',
    emphasis: 'chances',
  },
  {
    text: 'Se candidata com estratégia, não no desespero',
    emphasis: 'estratégia',
  },
]

export function BenefitsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  return (
    <Section id="beneficios" className="bg-gradient-to-b from-elite-dark via-[#0a150a] to-elite-dark">
      <Container size="md">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center"
        >
          {/* Section label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-elite-green text-xs sm:text-sm tracking-[0.2em] uppercase mb-6 font-mono"
          >
            Benefícios
          </motion.p>
          
          {/* Main headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 font-display"
          >
            Com Elite Vagas{' '}
            <span className="gradient-text">você</span>:
          </motion.h2>
          
          {/* Benefits list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-5 max-w-xl mx-auto mb-12"
          >
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-4 text-left group"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-elite-green/20 flex items-center justify-center group-hover:bg-elite-green/30 transition-colors">
                  <CheckIcon size={16} className="text-elite-green" />
                </span>
                <p className="text-base sm:text-lg md:text-xl text-white/80">
                  {benefit.text.split(benefit.emphasis).map((part, j, arr) => (
                    <span key={j}>
                      {part}
                      {j < arr.length - 1 && (
                        <span className="text-elite-green font-semibold">{benefit.emphasis}</span>
                      )}
                    </span>
                  ))}
                </p>
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9 }}
            className="flex flex-col items-center gap-3"
          >
            <Button size="lg" className="group">
              <a href="#precos" className="flex items-center gap-2">
                QUERO RECEBER OPORTUNIDADES
                <ArrowRightIcon size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <p className="text-sm text-white/40">
              Sem compromisso. Cancelamento fácil.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}
