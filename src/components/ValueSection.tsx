'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section, Container } from './ui'

export function ValueSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  return (
    <Section id="valor" className="min-h-[70vh] bg-gradient-to-b from-elite-dark via-[#0f0a15] to-elite-dark">
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
            Pense nisso
          </motion.p>
          
          {/* Main question */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-display"
          >
            Quanto vale o{' '}
            <span className="italic font-serif gradient-text">seu tempo</span>?
          </motion.h2>
          
          {/* Pain statement */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12"
          >
            Cada dia aplicando em vagas erradas é um dia a mais
            <br className="hidden sm:block" />
            <span className="text-white/80"> longe do emprego que você merece.</span>
          </motion.p>
          
          {/* Value proposition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-elite-green/5 blur-3xl rounded-full" />
            <div className="relative bg-white/[0.02] border border-elite-green/20 rounded-3xl p-8 sm:p-12 max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                {/* Input */}
                <div className="text-center">
                  <p className="text-sm text-white/40 uppercase tracking-wider mb-2 font-mono">
                    Você investe
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-white">
                    minutos
                  </p>
                </div>
                
                {/* Arrow */}
                <div className="hidden sm:block">
                  <svg className="w-12 h-8 text-elite-green" fill="none" viewBox="0 0 48 32">
                    <path
                      d="M0 16h40M32 8l8 8-8 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="sm:hidden">
                  <svg className="w-8 h-12 text-elite-green" fill="none" viewBox="0 0 32 48">
                    <path
                      d="M16 0v40M8 32l8 8 8-8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                
                {/* Output */}
                <div className="text-center">
                  <p className="text-sm text-white/40 uppercase tracking-wider mb-2 font-mono">
                    E recebe
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold gradient-text">
                    oportunidades
                  </p>
                  <p className="text-elite-green font-medium">alinhadas</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}
