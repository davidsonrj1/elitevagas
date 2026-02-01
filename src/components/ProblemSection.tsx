'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section, Container } from './ui'

const painPoints = [
  'Abrindo sites de vagas que não têm nada a ver com você',
  'Lendo descrições intermináveis pra descobrir que não é o que busca',
  'Enviando currículo no automático, sem estratégia',
  'E nunca recebendo uma resposta sequer',
]

export function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  return (
    <Section id="problema" className="bg-gradient-to-b from-elite-dark via-[#1a0808] to-elite-dark">
      <Container size="md" className="text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-red-400/80 text-xs sm:text-sm tracking-[0.2em] uppercase mb-6 font-mono"
          >
            O problema
          </motion.p>

          {/* Main headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 font-display"
          >
            Você já{' '}
            <span className="text-red-400">perdeu horas</span>:
          </motion.h2>
          
          {/* Pain points list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-4 mb-12 max-w-xl mx-auto"
          >
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-start gap-4 text-left"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
                <p className="text-base sm:text-lg md:text-xl text-white/70">
                  {point}
                </p>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-12"
          />
          
          {/* Reframe - The real problem */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9 }}
            className="space-y-3"
          >
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium font-serif">
              O problema{' '}
              <span className="italic text-red-400">não é você</span>.
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl text-white/60">
              É o método.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}
