'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section, Container, Button } from './ui'
import { ArrowRightIcon, ClockIcon } from './Icons'

export function ClosingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  return (
    <Section id="comecar" className="min-h-[90vh]">
      <Container size="md">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center"
        >
          {/* Urgency statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <p className="text-elite-green text-xs sm:text-sm tracking-[0.2em] uppercase mb-6 font-mono">
              Comece agora
            </p>
            <p className="text-lg sm:text-xl md:text-2xl text-white/60 max-w-xl mx-auto">
              Quanto antes você começa,
              <br />
              <span className="text-white">antes começa a receber oportunidades reais.</span>
            </p>
          </motion.div>
          
          {/* Mindset shift */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4">
              Emprego não é{' '}
              <span className="text-white/40 italic font-serif">sorte</span>.
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display">
              É{' '}
              <span className="gradient-text">posicionamento</span>.
            </h3>
          </motion.div>
          
          {/* Final value statement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="p-8 sm:p-10 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-3xl">
              <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-medium mb-2 font-serif">
                Seu currículo não precisa ser perfeito.
              </p>
              <p className="text-lg sm:text-xl md:text-2xl text-white/60">
                Ele só precisa chegar nas{' '}
                <span className="text-elite-green font-semibold">vagas certas</span>.
              </p>
            </div>
          </motion.div>
          
          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="flex flex-col items-center gap-4"
          >
            <Button size="lg" className="group text-lg px-10 py-5">
              <a href="#precos" className="flex items-center gap-3">
                QUERO MINHAS VAGAS AGORA
                <ArrowRightIcon size={24} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <p className="flex items-center gap-2 text-sm text-white/40">
              <ClockIcon size={14} />
              Leva menos de 3 minutos.
            </p>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            className="mt-16 flex flex-wrap justify-center gap-6 text-xs text-white/30"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Pagamento seguro
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Garantia de 7 dias
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancele quando quiser
            </span>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}
