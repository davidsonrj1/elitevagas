'use client'

import { useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Input, Container, Card } from '@/components/ui'
import { 
  DocumentIcon, 
  CheckIcon, 
  SpinnerIcon, 
  ArrowRightIcon,
  ArrowDownIcon 
} from '@/components/Icons'
import { PLANS, PlanId } from '@/lib/mercadopago'
import { isValidEmail } from '@/lib/utils'

type Step = 'upload' | 'preview' | 'processing'

interface CvData {
  cargo_desejado: string
  senioridade: string
  skills: string[]
  localidade: string
  modelo_trabalho: string
  anos_experiencia: number
  idiomas: string[]
  formacao: string
}

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const planId = params.plan as PlanId
  
  // Valida se o plano existe
  const plan = PLANS[planId]
  if (!plan) {
    return (
      <div className="min-h-screen bg-elite-dark flex items-center justify-center px-4">
        <Container size="sm" className="text-center">
          <h1 className="text-2xl font-bold mb-4">Plano não encontrado</h1>
          <Button onClick={() => router.push('/#precos')}>
            Ver planos disponíveis
          </Button>
        </Container>
      </div>
    )
  }
  
  const [step, setStep] = useState<Step>('upload')
  const [email, setEmail] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [cvData, setCvData] = useState<CvData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [dragActive, setDragActive] = useState(false)
  
  // Formata preço
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
  }
  
  // Handle file drop
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }, [])
  
  const handleFileSelect = (selectedFile: File) => {
    setError('')
    
    // Valida tipo do arquivo
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ]
    
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Formato inválido. Envie um arquivo PDF ou DOCX.')
      return
    }
    
    // Valida tamanho (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('Arquivo muito grande. Máximo 5MB.')
      return
    }
    
    setFile(selectedFile)
  }
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }
  
  // Processa o CV
  const handleAnalyzeCv = async () => {
    if (!file) {
      setError('Selecione seu currículo.')
      return
    }
    
    if (!email || !isValidEmail(email)) {
      setError('Informe um email válido.')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      // Cria FormData para enviar o arquivo
      const formData = new FormData()
      formData.append('file', file)
      formData.append('email', email)
      
      // Chama API para processar o CV
      const response = await fetch('/api/parse-cv', {
        method: 'POST',
        body: formData,
      })
      
      const data = await response.json()
      
      // Trata o novo formato de erro
      if (!response.ok || data.success === false) {
        // Pega a mensagem de erro do novo formato
        const errorMessage = data.error?.message || data.error || 'Erro ao processar CV'
        throw new Error(errorMessage)
      }
      
      setCvData(data.cv_data)
      setStep('preview')
      
    } catch (err: any) {
      console.error('Erro:', err)
      setError(err.message || 'Erro ao processar currículo. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }
  
  // Vai para o pagamento
  const handleCheckout = async () => {
    if (!cvData) return
    
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          email,
          cvData,
        }),
      })
      
      const data = await response.json()
      
      if (data.checkoutUrl) {
        // Redireciona pro Mercado Pago
        window.location.href = data.checkoutUrl
      } else {
        throw new Error(data.error || 'Erro ao criar checkout')
      }
      
    } catch (err: any) {
      console.error('Erro:', err)
      setError(err.message || 'Erro ao processar. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-elite-dark py-12 px-4">
      {/* Noise overlay */}
      <div className="noise" />
      
      <Container size="sm">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <a href="/" className="inline-block text-2xl font-bold tracking-tight font-display mb-6">
            ELITE<span className="text-elite-green">VAGAS</span>
          </a>
          
          {/* Plan badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-elite-green/10 border border-elite-green/20 rounded-full">
            <span className="text-sm text-white/60">Plano</span>
            <span className="text-sm font-semibold text-elite-green">{plan.name}</span>
            <span className="text-sm text-white/40">•</span>
            <span className="text-sm font-bold">R$ {formatPrice(plan.price)}</span>
          </div>
        </motion.div>
        
        {/* Progress steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          {['upload', 'preview', 'pagamento'].map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${(step === 'upload' && i === 0) || (step === 'preview' && i <= 1) || (step === 'processing' && i <= 1)
                  ? 'bg-elite-green text-black'
                  : 'bg-white/10 text-white/40'
                }
              `}>
                {i + 1}
              </div>
              {i < 2 && (
                <div className={`w-12 h-px mx-2 ${
                  (step === 'preview' && i === 0) || (step === 'processing')
                    ? 'bg-elite-green'
                    : 'bg-white/10'
                }`} />
              )}
            </div>
          ))}
        </motion.div>
        
        <AnimatePresence mode="wait">
          {/* Step 1: Upload CV */}
          {step === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="p-6 sm:p-8">
                <h1 className="text-2xl font-bold mb-2 font-display text-center">
                  Envie seu currículo
                </h1>
                <p className="text-white/60 text-center mb-8">
                  Nossa IA vai analisar seu perfil para encontrar as melhores vagas
                </p>
                
                {/* Email input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Seu email
                  </label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                {/* File upload area */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Currículo (PDF ou DOCX)
                  </label>
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`
                      relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
                      ${dragActive 
                        ? 'border-elite-green bg-elite-green/10' 
                        : file 
                          ? 'border-elite-green/50 bg-elite-green/5'
                          : 'border-white/20 hover:border-white/40'
                      }
                    `}
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileInput}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    
                    {file ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-elite-green/20 rounded-full flex items-center justify-center">
                          <CheckIcon size={24} className="text-elite-green" />
                        </div>
                        <div>
                          <p className="font-medium text-elite-green">{file.name}</p>
                          <p className="text-sm text-white/40">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            setFile(null)
                          }}
                          className="text-sm text-white/40 hover:text-white underline"
                        >
                          Trocar arquivo
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                          <DocumentIcon size={24} className="text-white/60" />
                        </div>
                        <div>
                          <p className="font-medium">
                            Arraste seu CV aqui ou <span className="text-elite-green">clique para selecionar</span>
                          </p>
                          <p className="text-sm text-white/40 mt-1">
                            PDF ou DOCX até 5MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Dica de ajuda */}
                  <div className="mt-4 p-3 bg-white/5 rounded-lg">
                    <p className="text-xs text-white/50">
                      💡 <strong>Dica:</strong> Seu currículo deve conter texto selecionável. 
                      PDFs escaneados (imagens) podem não funcionar. 
                      Se tiver problemas, tente salvar como DOCX.
                    </p>
                  </div>
                </div>
                
                {/* Error message - MELHORADO */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl mb-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="text-red-400">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-red-400 font-medium text-sm">{error}</p>
                        <p className="text-red-400/60 text-xs mt-1">
                          Se o problema persistir, entre em contato pelo WhatsApp.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Submit button */}
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleAnalyzeCv}
                  isLoading={isLoading}
                  disabled={!file || !email}
                >
                  {isLoading ? 'Analisando currículo...' : 'Analisar meu perfil'}
                </Button>
                
                <p className="text-xs text-white/30 text-center mt-4">
                  Seus dados estão seguros e não serão compartilhados
                </p>
              </Card>
            </motion.div>
          )}
          
          {/* Step 2: Preview */}
          {step === 'preview' && cvData && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-elite-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckIcon size={32} className="text-elite-green" />
                  </div>
                  <h1 className="text-2xl font-bold mb-2 font-display">
                    Perfil analisado!
                  </h1>
                  <p className="text-white/60">
                    Confira se entendemos corretamente seu perfil
                  </p>
                </div>
                
                {/* CV Data Preview */}
                <div className="bg-white/5 rounded-xl p-6 mb-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-white/40">Cargo desejado</p>
                      <p className="text-lg font-semibold text-elite-green">
                        {cvData.cargo_desejado}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/40">Senioridade</p>
                      <p className="font-medium">{cvData.senioridade}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-sm text-white/40 mb-2">Skills principais</p>
                    <div className="flex flex-wrap gap-2">
                      {cvData.skills.slice(0, 6).map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/10 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                      {cvData.skills.length > 6 && (
                        <span className="px-3 py-1 text-white/40 text-sm">
                          +{cvData.skills.length - 6} mais
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-white/40">Localidade</p>
                      <p className="font-medium">{cvData.localidade || 'Brasil'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-white/40">Modelo</p>
                      <p className="font-medium">{cvData.modelo_trabalho || 'Qualquer'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-white/40">Experiência</p>
                      <p className="font-medium">{cvData.anos_experiencia} anos</p>
                    </div>
                    <div>
                      <p className="text-sm text-white/40">Idiomas</p>
                      <p className="font-medium">{cvData.idiomas?.join(', ') || 'Português'}</p>
                    </div>
                  </div>
                </div>
                
                {/* What will happen */}
                <div className="bg-elite-green/10 border border-elite-green/20 rounded-xl p-4 mb-6">
                  <p className="text-sm text-center">
                    Após o pagamento, vamos buscar as <strong className="text-elite-green">5 melhores vagas</strong> compatíveis com seu perfil e enviar para <strong className="text-elite-green">{email}</strong>
                  </p>
                </div>
                
                {/* Error message - MELHORADO */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl mb-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="text-red-400">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-red-400 font-medium text-sm">{error}</p>
                        <p className="text-red-400/60 text-xs mt-1">
                          Se o problema persistir, entre em contato pelo WhatsApp.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setStep('upload')
                      setCvData(null)
                    }}
                  >
                    Voltar
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleCheckout}
                    isLoading={isLoading}
                  >
                    Pagar R$ {formatPrice(plan.price)}
                    <ArrowRightIcon size={18} className="ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Security badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-6 mt-8 text-xs text-white/30"
        >
          <div className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Pagamento Seguro</span>
          </div>
          <div className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Dados Protegidos</span>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}