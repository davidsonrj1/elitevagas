'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section, Container, Card } from './ui'
import { DocumentIcon, AiIcon, SparklesIcon } from './Icons'

const steps = [
  {
    number: '01',
    title: 'Envie seu CV',
    description: 'Nossa IA lê e entende suas skills, experiência e o que você realmente quer.',
    icon: DocumentIcon,
  },
  {
    number: '02',
    title: 'IA faz o trabalho',
    description: 'Analisamos centenas de vagas e calculamos compatibilidade real com seu perfil.',
    icon: AiIcon,
  },
  {
    number: '03',
    title: 'Receba curadoria',
    description: 'Top 5 vagas com score de match, resumo executivo e link direto pra aplicar.',
    icon: SparklesIcon,
  },
]

export function SolutionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  return (
    <Section id="como-funciona">
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
            A solução
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display"
          >
            3 minutos. <span className="gradient-text">5 vagas perfeitas.</span>
          </motion.h2>
        </motion.div>
        
        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15 }}
              >
                <Card hover className="h-full relative overflow-hidden group">
                  {/* Step number badge */}
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 bg-elite-green rounded-full flex items-center justify-center text-black font-bold text-xs sm:text-sm font-mono">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="mb-4 sm:mb-6 mt-2">
                    <Icon 
                      size={40} 
                      className="text-elite-green/80 group-hover:text-elite-green transition-colors" 
                    />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-bold mb-2 font-display">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/60">
                    {step.description}
                  </p>
                  
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-elite-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </Card>
              </motion.div>
            )
          })}
        </div>
        
        {/* Connecting line (desktop only) */}
        <div className="hidden md:block relative mt-8">
          <div className="absolute top-1/2 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </Container>
    </Section>
  )
}
