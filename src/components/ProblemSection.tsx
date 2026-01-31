'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section, Container } from './ui'

const chaosCards = [
  'Vaga Urgente!!!',
  'Home Office R$1500',
  'CLT + Benefícios',
  'PJ Remoto',
  'Estágio TI',
  'Dev Pleno',
  'Freelancer',
  'Trainee',
]

export function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  return (
    <Section id="problema" className="bg-gradient-to-b from-elite-dark via-[#1a0a0a] to-elite-dark">
      <Container size="md" className="text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Big number */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 sm:mb-8 text-red-500/80 font-display"
          >
            847
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl text-white/80 mb-4"
          >
            vagas abertas agora só no LinkedIn Brasil.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 sm:mb-12 px-4"
          >
            Quantas você tem tempo de analisar? Quantas são realmente pra você?
            <span className="text-red-400"> Quantas são spam de recrutador?</span>
          </motion.p>
          
          {/* Chaos cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="relative h-24 sm:h-32 md:h-40 overflow-hidden my-8 sm:my-12"
          >
            <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 px-4">
              {chaosCards.map((text, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: [0, Math.random() * 10 - 5, 0],
                    rotate: [0, Math.random() * 6 - 3, 0],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/5 border border-white/10 rounded text-[10px] sm:text-xs md:text-sm text-white/40 whitespace-nowrap"
                >
                  {text}
                </motion.span>
              ))}
            </div>
          </motion.div>
          
          {/* Quote */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mt-8 px-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            "Tô <span className="italic text-red-400">exausto</span> de buscar emprego."
          </motion.p>
        </motion.div>
      </Container>
    </Section>
  )
}
