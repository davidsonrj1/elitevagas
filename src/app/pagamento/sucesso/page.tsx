'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckIcon, ArrowRightIcon, SpinnerIcon } from '@/components/Icons'
import { Button, Container } from '@/components/ui'

export default function PagamentoSucessoPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-elite-dark flex items-center justify-center px-4">
      <Container size="sm" className="text-center">
        {isLoading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12">
            <SpinnerIcon size={48} className="mx-auto mb-6 text-elite-green" />
            <p className="text-white/60">Confirmando seu pagamento...</p>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="w-24 h-24 bg-elite-green rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckIcon size={48} className="text-black" />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl font-bold mb-4 font-display">
              Pagamento <span className="gradient-text">confirmado!</span>
            </h1>

            <p className="text-lg text-white/60 mb-8 max-w-md mx-auto">
              Seu plano está ativo.
            </p>

            <div className="space-y-4">
              <Link href="/#cta" className="inline-block">
                <Button size="lg">
                  <span className="flex items-center gap-2">
                    Buscar vagas agora
                    <ArrowRightIcon size={20} />
                  </span>
                </Button>
              </Link>

              <p className="text-sm text-white/40">
                Você receberá um email de confirmação em instantes.
              </p>
            </div>
          </motion.div>
        )}
      </Container>
    </div>
  )
}
