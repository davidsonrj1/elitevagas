'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section, Container, Card, Button } from './ui'
import { DocumentIcon, AiIcon, SparklesIcon, ArrowRightIcon } from './Icons'

const steps = [
  {
    icon: DocumentIcon,
    title: 'Analisa seu currículo',
    description: 'Entende suas habilidades, experiência e o que você realmente busca.',
  },
  {
    icon: AiIcon,
    title: 'Cruza com centenas de vagas',
    description: 'Compara seu perfil com oportunidades reais do mercado em segundos.',
  },
  {
    icon: SparklesIcon,
    title: 'Seleciona as que combinam',
    description: 'Filtra e entrega apenas as vagas com maior compatibilidade com você.',
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
          className="text-center mb-16"
        >
          {/* Section label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-elite-green text-xs sm:text-sm tracking-[0.2em] uppercase mb-6 font-mono"
          >
            A Solução
          </motion.p>
          
          {/* Main headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-display"
          >
            A Elite Vagas faz o{' '}
            <br className="hidden sm:block" />
            <span className="gradient-text">trabalho pesado</span>{' '}
            por você
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-lg text-white/50 max-w-xl mx-auto"
          >
            Nossa IA faz em segundos o que você levaria horas fazendo manualmente.
          </motion.p>
        </motion.div>
        
        {/* How it works - Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="relative"
                >
                  {/* Connecting line (desktop) */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/10 to-transparent" />
                  )}
                  
                  <Card hover className="h-full relative overflow-hidden group">
                    {/* Step number */}
                    <div className="absolute top-4 right-4 text-5xl font-black text-white/[0.03] font-display">
                      0{i + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className="mb-5 relative z-10">
                      <div className="w-14 h-14 bg-elite-green/10 rounded-2xl flex items-center justify-center group-hover:bg-elite-green/20 transition-colors">
                        <Icon 
                          size={28} 
                          className="text-elite-green" 
                        />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-lg sm:text-xl font-bold mb-2 font-display relative z-10">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/50 relative z-10">
                      {step.description}
                    </p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
        
        {/* Result highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="text-center"
        >
          <div className="inline-block bg-gradient-to-r from-elite-green/10 via-elite-green/5 to-elite-green/10 border border-elite-green/20 rounded-2xl p-8 sm:p-10 max-w-2xl mx-auto">
            <p className="text-xl sm:text-2xl md:text-3xl font-medium mb-2">
              Você recebe somente{' '}
              <span className="text-elite-green font-bold">oportunidades relevantes</span>.
            </p>
            <p className="text-base sm:text-lg text-white/50 mb-6">
              Sem estresse. Sem spam. Sem desperdício de tempo.
            </p>
            
            <Button size="lg" className="group">
              <a href="#precos" className="flex items-center gap-2">
                COMEÇAR AGORA
                <ArrowRightIcon size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <p className="text-xs text-white/40 mt-3">
              Demora menos que fazer um café.
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
