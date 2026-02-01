'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section, Container } from './ui'

export function ObjectionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  return (
    <Section id="diferencial" className="min-h-[80vh]">
      <Container size="md">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center"
        >
          {/* Question */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <p className="text-lg sm:text-xl text-white/50 mb-4">
              "Isso é diferente de um site de vagas comum?"
            </p>
            <div className="inline-block">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black gradient-text font-display"
              >
                Sim.
              </motion.span>
            </div>
          </motion.div>
          
          {/* Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            {/* Others */}
            <div className="flex items-start gap-6 mb-8 text-left">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2 font-mono">
                  Outros sites
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl text-white/60">
                  Mostram <span className="text-white/80 font-medium">milhares</span> de vagas.
                </p>
              </div>
            </div>
            
            {/* Us */}
            <div className="flex items-start gap-6 mb-12 text-left">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-elite-green/20 border border-elite-green/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-elite-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-elite-green text-xs uppercase tracking-wider mb-2 font-mono">
                  Elite Vagas
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl text-white">
                  Mostramos as <span className="text-elite-green font-bold">certas</span> pra você.
                </p>
              </div>
            </div>
            
            {/* Key differentiator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="p-6 sm:p-8 bg-white/[0.02] border border-white/10 rounded-2xl"
            >
              <p className="text-base sm:text-lg md:text-xl text-white/70 mb-3">
                Você não perde tempo filtrando.
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl font-medium">
                Você recebe o que{' '}
                <span className="text-elite-green font-bold">já foi filtrado</span>.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}
