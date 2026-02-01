'use client'

import { motion } from 'framer-motion'
import { Button, Section, Container } from './ui'
import { ArrowRightIcon, ClockIcon } from './Icons'

export function HeroSection() {
  return (
    <Section className="min-h-screen pt-20" id="hero">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-32 left-[8%] w-32 h-32 border border-elite-green/10 rounded-full hidden md:block"
        />
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-32 right-[8%] w-48 h-48 border border-white/5 rounded-full hidden md:block"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-[15%] w-2 h-2 bg-elite-green/30 rounded-full hidden lg:block"
        />
      </div>

      <Container size="lg" className="text-center relative z-10">
        {/* Pre-headline - pattern interrupt */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-elite-green text-xs sm:text-sm tracking-[0.25em] uppercase mb-6 font-mono"
        >
          Busca de Emprego com Inteligência Artificial
        </motion.p>

        {/* Main Headline - Pattern Interrupt */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-responsive-hero font-extrabold leading-[0.95] mb-4 font-display"
        >
          <span className="text-white/90">Pare de procurar emprego.</span>
          <br />
          <span className="gradient-text">Deixe o emprego</span>
          <br />
          <span className="italic font-normal font-serif text-white">
            encontrar você.
          </span>
        </motion.h1>

        {/* Sub-headline - Promise */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-4 px-4"
        >
          Encontre seu próximo emprego{' '}
          <span className="text-white font-semibold">em até 3 minutos</span>{' '}
          com nossa Inteligência Artificial.
        </motion.p>

        {/* Clarification - How it works */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-10 px-4"
        >
          Ela analisa seu currículo e entrega oportunidades alinhadas direto no seu e-mail.
          <br className="hidden sm:block" />
          <span className="text-white/60">Sem spam. Sem perda de tempo. Só vagas que combinam com você.</span>
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col items-center gap-3"
        >
          <Button size="lg" className="group">
            <a href="#precos" className="flex items-center gap-2">
              QUERO MINHAS VAGAS AGORA
              <ArrowRightIcon size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          
          {/* Micro-commitment */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-2 text-sm text-white/40"
          >
            <ClockIcon size={14} />
            Leva menos de 3 minutos.
          </motion.p>
        </motion.div>

        {/* Social proof snippet */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-gradient-to-br from-elite-green/40 to-elite-green/20 border-2 border-elite-dark"
                />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-white/60">
              <span className="text-white font-medium">+500</span> profissionais já usam
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
