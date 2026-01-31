'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button, Container } from '@/components/ui'

export default function PagamentoErroPage() {
  return (
    <div className="min-h-screen bg-elite-dark flex items-center justify-center px-4">
      <Container size="sm" className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-12"
        >
          {/* Ícone de erro */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="w-24 h-24 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-red-500"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4 font-display">
            Ops! Algo deu errado
          </h1>

          <p className="text-lg text-white/60 mb-8 max-w-md mx-auto">
            Não conseguimos processar seu pagamento. Verifique os dados do cartão
            ou tente outro método de pagamento.
          </p>

          <div className="space-y-4">
            <Link href="/#precos" className="inline-block">
              <Button size="lg">
                Tentar novamente
              </Button>
            </Link>

            <p className="text-sm text-white/40">
              Precisa de ajuda?{' '}
              <a
                href="mailto:contato@elitevagas.com.br"
                className="text-elite-green hover:underline"
              >
                Entre em contato
              </a>
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
