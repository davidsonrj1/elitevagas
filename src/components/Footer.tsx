'use client'

import { motion } from 'framer-motion'
import { Container } from './ui'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="py-12 px-4 sm:px-6 border-t border-white/10">
      <Container size="lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl font-bold tracking-tight font-display"
          >
            ELITE<span className="text-elite-green">VAGAS</span>
          </motion.div>
          
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-sm text-center"
          >
            © {currentYear} Elite Vagas.
          </motion.p>
          
          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex gap-6 text-sm text-white/40"
          >
            <a href="/termos" className="hover:text-white transition-colors">
              Termos
            </a>
            <a href="/privacidade" className="hover:text-white transition-colors">
              Privacidade
            </a>
            <a href="mailto:contato@elitevagas.com.br" className="hover:text-white transition-colors">
              Contato
            </a>
          </motion.div>
        </div>
      </Container>
    </footer>
  )
}
