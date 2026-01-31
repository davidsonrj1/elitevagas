'use client'

import { motion } from 'framer-motion'
import { Button, Section, Container } from './ui'
import { ArrowRightIcon } from './Icons'

export function HeroSection() {
  return (
    <Section className="min-h-screen pt-20" id="hero">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-32 left-[10%] w-24 h-24 sm:w-32 sm:h-32 border border-elite-green/20 rounded-full hidden md:block"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-40 right-[10%] w-32 h-32 sm:w-48 sm:h-48 border border-white/10 rounded-full hidden md:block"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-[20%] w-3 h-3 bg-elite-green/40 rounded-full hidden lg:block"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/3 left-[15%] w-2 h-2 bg-white/20 rounded-full hidden lg:block"
        />
      </div>

      <Container size="lg" className="text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-elite-green text-xs sm:text-sm tracking-[0.3em] uppercase mb-6 font-mono"
        >
          Curadoria Inteligente de Vagas
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-responsive-hero font-extrabold leading-[0.95] mb-8 font-display"
        >
          Pare de caçar
          <br />
          <span className="highlight-underline">vagas.</span>
          <br />
          <span className="gradient-text">Deixe elas</span>
          <br />
          <span className="italic font-normal font-serif">
            te encontrarem.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-white/60 max-w-xl mx-auto mb-12 px-4"
        >
          Nossa IA analisa seu currículo e encontra as vagas perfeitas pra você.{' '}
          <span className="text-white">
            Sem spam. Sem vagas genéricas. Só oportunidades reais.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button size="lg">
            <a href="#precos" className="flex items-center gap-2">
              Quero minhas vagas
              <ArrowRightIcon size={20} />
            </a>
          </Button>

          <Button variant="outline" size="lg">
            <a href="#como-funciona">Como funciona?</a>
          </Button>
        </motion.div>
      </Container>
    </Section>
  )
}
