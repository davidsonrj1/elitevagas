'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Container, Card, Button } from '@/components/ui'
import { CheckIcon, SpinnerIcon } from '@/components/Icons'

type PaymentStatus = 'checking' | 'approved' | 'pending' | 'error'

function AguardandoContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const customerId = searchParams.get('customer_id')
  const email = searchParams.get('email')
  
  const [status, setStatus] = useState<PaymentStatus>('checking')
  const [checkCount, setCheckCount] = useState(0)
  const [dots, setDots] = useState('')
  
  // Animação dos pontos
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)
    return () => clearInterval(interval)
  }, [])
  
  // Polling do status do pagamento
  useEffect(() => {
    if (!customerId && !email) {
      setStatus('error')
      return
    }
    
    let isSubscribed = true
    
    const checkPayment = async () => {
      try {
        const params = new URLSearchParams()
        if (customerId) params.append('customer_id', customerId)
        if (email) params.append('email', email)
        
        const response = await fetch(`/api/check-payment?${params.toString()}`)
        const data = await response.json()
        
        if (!isSubscribed) return false
        
        if (data.is_approved) {
          setStatus('approved')
          // Redireciona após 2 segundos
          setTimeout(() => {
            router.push('/pagamento/sucesso')
          }, 2000)
          return true // Para o polling
        }
        
        setCheckCount(prev => prev + 1)
        return false
      } catch (error) {
        console.error('Erro ao verificar pagamento:', error)
        return false
      }
    }
    
    // Verifica imediatamente
    checkPayment()
    
    // Polling a cada 3 segundos por até 5 minutos (100 tentativas)
    const interval = setInterval(async () => {
      const approved = await checkPayment()
      if (approved || checkCount >= 100) {
        clearInterval(interval)
      }
    }, 3000)
    
    return () => {
      isSubscribed = false
      clearInterval(interval)
    }
  }, [customerId, email, router, checkCount])
  
  return (
    <Card className="p-8 text-center">
      {status === 'checking' && (
        <>
          <div className="w-20 h-20 bg-elite-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <SpinnerIcon size={40} className="text-elite-green" />
          </div>
          
          <h1 className="text-2xl font-bold mb-4 font-display">
            Verificando pagamento{dots}
          </h1>
          
          <p className="text-white/60 mb-6">
            Estamos aguardando a confirmação do seu pagamento via Pix.
            <br />
            <strong className="text-white">Não feche esta página.</strong>
          </p>
          
          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <p className="text-sm text-white/40">
              Se você já pagou, aguarde alguns segundos para a confirmação.
              <br />
              Verificações realizadas: {checkCount}
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <p className="text-xs text-white/30">
              O pagamento pode levar até 1 minuto para ser confirmado
            </p>
          </div>
        </>
      )}
      
      {status === 'approved' && (
        <>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="w-20 h-20 bg-elite-green rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckIcon size={40} className="text-white" />
          </motion.div>
          
          <h1 className="text-2xl font-bold mb-4 font-display text-elite-green">
            Pagamento Confirmado!
          </h1>
          
          <p className="text-white/60 mb-6">
            Seu pagamento foi aprovado com sucesso.
            <br />
            Redirecionando...
          </p>
        </>
      )}
      
      {status === 'error' && (
        <>
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">⚠️</span>
          </div>
          
          <h1 className="text-2xl font-bold mb-4 font-display">
            Erro ao verificar
          </h1>
          
          <p className="text-white/60 mb-6">
            Não conseguimos verificar seu pagamento.
            <br />
            Se você já pagou, entre em contato conosco.
          </p>
          
          <Button onClick={() => router.push('/')}>
            Voltar ao início
          </Button>
        </>
      )}
    </Card>
  )
}

function LoadingFallback() {
  return (
    <Card className="p-8 text-center">
      <div className="w-20 h-20 bg-elite-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <SpinnerIcon size={40} className="text-elite-green" />
      </div>
      <h1 className="text-2xl font-bold mb-4 font-display">
        Carregando...
      </h1>
    </Card>
  )
}

export default function AguardandoPage() {
  return (
    <div className="min-h-screen bg-elite-dark py-12 px-4 flex items-center justify-center">
      <div className="noise" />
      
      <Container size="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <AguardandoContent />
          </Suspense>
        </motion.div>
      </Container>
    </div>
  )
}