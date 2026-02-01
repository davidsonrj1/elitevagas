'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckIcon, ArrowRightIcon, SpinnerIcon } from '@/components/Icons'
import { Button, Container } from '@/components/ui'

interface PlanInfo {
  name: string
  emoji: string
  benefits: string[]
  nextSteps: {
    title: string
    description: string
    time: string
  }[]
}

const PLAN_INFO: Record<string, PlanInfo> = {
  single: {
    name: 'Unitário',
    emoji: '🎯',
    benefits: [
      '5 vagas personalizadas',
      'Score de compatibilidade',
      'Resumo executivo de cada vaga',
      'Links diretos para aplicar'
    ],
    nextSteps: [
      { title: 'Pagamento confirmado', description: 'Seu pagamento foi processado com sucesso', time: 'Agora' },
      { title: 'Analisando seu perfil', description: 'Nossa IA está buscando vagas compatíveis', time: '~1 min' },
      { title: 'Vagas no seu email', description: 'Você receberá 5 vagas personalizadas', time: '~3 min' },
    ]
  },
  monthly: {
    name: 'Mensal',
    emoji: '⭐',
    benefits: [
      '5 vagas personalizadas agora',
      'Alertas diários por 30 dias',
      'Vagas prioritárias destacadas',
      'Suporte via WhatsApp'
    ],
    nextSteps: [
      { title: 'Pagamento confirmado', description: 'Seu plano mensal está ativo', time: 'Agora' },
      { title: 'Primeiras vagas a caminho', description: 'Nossa IA está buscando vagas compatíveis', time: '~3 min' },
      { title: 'Alertas diários ativados', description: 'Todo dia às 8h você recebe novas vagas', time: 'A partir de amanhã' },
    ]
  },
  quarterly: {
    name: 'Trimestral',
    emoji: '👑',
    benefits: [
      '5 vagas personalizadas agora',
      'Alertas diários por 90 dias',
      'Análise completa do seu CV',
      'Dicas personalizadas de carreira',
      'Suporte prioritário'
    ],
    nextSteps: [
      { title: 'Pagamento confirmado', description: 'Seu plano trimestral está ativo', time: 'Agora' },
      { title: 'Vagas + Análise de CV', description: 'Estamos preparando tudo pra você', time: '~5 min' },
      { title: 'Alertas diários ativados', description: 'Todo dia às 8h você recebe novas vagas', time: 'A partir de amanhã' },
    ]
  }
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [allComplete, setAllComplete] = useState(false)
  
  const planId = searchParams.get('plan') || 'single'
  const plan = PLAN_INFO[planId] || PLAN_INFO.single

  useEffect(() => {
    // Timer 1: Remove loading inicial
    const timer1 = setTimeout(() => setIsLoading(false), 2000)
    
    // Timer 2: Avança para step 1
    const timer2 = setTimeout(() => setCurrentStep(1), 4000)
    
    // Timer 3: Avança para step 2
    const timer3 = setTimeout(() => setCurrentStep(2), 8000)
    
    // Timer 4: Marca tudo como completo após 12 segundos
    const timer4 = setTimeout(() => setAllComplete(true), 12000)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [])

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="py-12 text-center"
      >
        <SpinnerIcon size={48} className="mx-auto mb-6 text-elite-green" />
        <p className="text-white/60">Confirmando seu pagamento...</p>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header com checkmark */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="w-20 h-20 bg-gradient-to-br from-elite-green to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-elite-green/30"
        >
          <CheckIcon size={40} className="text-black" />
        </motion.div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-2 font-display">
          Pagamento <span className="gradient-text">confirmado!</span>
        </h1>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-elite-green/10 border border-elite-green/20 rounded-full">
          <span className="text-lg">{plan.emoji}</span>
          <span className="font-semibold text-elite-green">Plano {plan.name}</span>
        </div>
      </div>

      {/* Timeline de próximos passos */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
        <h2 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">
          O que está acontecendo:
        </h2>
        
        <div className="space-y-4">
          {plan.nextSteps.map((step, index) => {
            const isCompleted = allComplete || index <= currentStep
            const isCurrent = !allComplete && index === currentStep
            const isLast = index === plan.nextSteps.length - 1
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex gap-4 ${isCompleted ? '' : 'opacity-50'}`}
              >
                {/* Indicador */}
                <div className="flex flex-col items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                    ${isCompleted 
                      ? 'bg-elite-green text-black' 
                      : 'bg-white/10 text-white/40'
                    }
                  `}>
                    {isCompleted ? (
                      <CheckIcon size={16} />
                    ) : (
                      <span className="text-sm font-bold">{index + 1}</span>
                    )}
                  </div>
                  {!isLast && (
                    <div className={`w-0.5 h-8 mt-1 ${isCompleted ? 'bg-elite-green/50' : 'bg-white/10'}`} />
                  )}
                </div>
                
                {/* Conteúdo */}
                <div className="flex-1 pb-2">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium ${isCompleted ? 'text-white' : 'text-white/60'}`}>
                      {step.title}
                    </h3>
                    <span className={`text-xs ${isCompleted ? 'text-elite-green' : 'text-white/40'}`}>
                      {allComplete && isLast ? '✓ Enviado!' : step.time}
                    </span>
                  </div>
                  <p className="text-sm text-white/50 mt-1">{step.description}</p>
                  
                  {/* Mostra "Processando..." apenas se é o step atual E não está tudo completo */}
                  {isCurrent && !allComplete && (
                    <div className="flex items-center gap-2 mt-2">
                      <SpinnerIcon size={14} className="text-elite-green" />
                      <span className="text-xs text-elite-green">Processando...</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Mensagem de sucesso quando tudo completar */}
      {allComplete && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-elite-green/20 border border-elite-green/30 rounded-xl p-4 mb-6"
        >
          <p className="text-sm text-elite-green text-center font-medium">
            ✅ Tudo pronto! Confira seu email em instantes.
          </p>
        </motion.div>
      )}

      {/* Benefícios do plano */}
      <div className="bg-elite-green/10 border border-elite-green/20 rounded-2xl p-6 mb-6">
        <h2 className="text-sm font-medium text-elite-green uppercase tracking-wider mb-3">
          {plan.emoji} Seu plano inclui:
        </h2>
        <ul className="space-y-2">
          {plan.benefits.map((benefit, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-2 text-sm text-white/80"
            >
              <CheckIcon size={14} className="text-elite-green flex-shrink-0" />
              {benefit}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Aviso importante */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
        <p className="text-sm text-amber-200/90 text-center">
          📧 <strong>Importante:</strong> Verifique sua caixa de entrada (e spam) nos próximos minutos!
        </p>
      </div>

      {/* CTAs */}
      <div className="space-y-3">
        <a 
          href="https://wa.me/5521990268273?text=Oi!%20Acabei%20de%20assinar%20o%20Elite%20Vagas!"
          className="block"
        >
          <Button variant="outline" size="lg" className="w-full">
            <span className="flex items-center justify-center gap-2">
              💬 Dúvidas? Fale no WhatsApp
            </span>
          </Button>
        </a>
        
        <Link href="/" className="block">
          <Button variant="outline" size="lg" className="w-full opacity-60 hover:opacity-100">
            <span className="flex items-center justify-center gap-2">
              Voltar para o site
              <ArrowRightIcon size={16} />
            </span>
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-white/30 mt-8">
        Pagamento processado com segurança via Mercado Pago
      </p>
    </motion.div>
  )
}

export default function PagamentoSucessoPage() {
  return (
    <div className="min-h-screen bg-elite-dark py-8 px-4">
      <Container size="sm">
        <Suspense fallback={
          <div className="py-12 text-center">
            <SpinnerIcon size={48} className="mx-auto mb-6 text-elite-green" />
            <p className="text-white/60">Carregando...</p>
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </Container>
    </div>
  )
}