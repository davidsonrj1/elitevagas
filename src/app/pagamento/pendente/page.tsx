'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button, Container } from '@/components/ui'

export default function PagamentoPendentePage() {
  return (
    <div className="min-h-screen bg-elite-dark flex items-center justify-center px-4">
      <Container size="sm" className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="w-24 h-24 bg-orange-500/20 border-2 border-orange-500 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-500">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4 font-display">
            Pagamento em processamento
          </h1>

          <p className="text-lg text-white/60 mb-8 max-w-md mx-auto">
            Seu pagamento está sendo processado. Assim que for confirmado, você receberá um email.
          </p>

          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Button variant="outline" size="lg">
                Voltar para o início
              </Button>
            </Link>

            <p className="text-sm text-white/40">
              Dúvidas?{' '}
              <a href="mailto:contato@elitevagas.com.br" className="text-elite-green hover:underline">
                Entre em contato
              </a>
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
