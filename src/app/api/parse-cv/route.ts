import { NextRequest, NextResponse } from 'next/server'
import mammoth from 'mammoth'

// Tipos de erro com mensagens amigáveis
const ERRORS = {
  NO_FILE: {
    code: 'NO_FILE',
    message: 'Nenhum arquivo foi enviado',
    userMessage: 'Por favor, selecione um arquivo de currículo para continuar.',
  },
  NO_EMAIL: {
    code: 'NO_EMAIL',
    message: 'Email não informado',
    userMessage: 'Por favor, informe seu email para receber as vagas.',
  },
  INVALID_FORMAT: {
    code: 'INVALID_FORMAT',
    message: 'Formato de arquivo não suportado',
    userMessage: 'Formato não suportado. Envie seu currículo em PDF ou DOCX.',
  },
  FILE_TOO_SMALL: {
    code: 'FILE_TOO_SMALL',
    message: 'Arquivo muito pequeno',
    userMessage: 'O arquivo parece estar vazio ou corrompido. Tente enviar novamente.',
  },
  FILE_TOO_LARGE: {
    code: 'FILE_TOO_LARGE',
    message: 'Arquivo muito grande',
    userMessage: 'O arquivo é muito grande. O tamanho máximo é 10MB.',
  },
  PDF_NOT_READABLE: {
    code: 'PDF_NOT_READABLE',
    message: 'Não foi possível ler o PDF',
    userMessage: 'Não conseguimos ler seu PDF. Pode ser uma imagem escaneada. Tente salvar como PDF de texto ou envie um DOCX.',
  },
  DOCX_CORRUPTED: {
    code: 'DOCX_CORRUPTED',
    message: 'Arquivo DOCX corrompido',
    userMessage: 'O arquivo DOCX parece estar corrompido. Tente abrir no Word, salvar novamente e reenviar.',
  },
  TEXT_TOO_SHORT: {
    code: 'TEXT_TOO_SHORT',
    message: 'Texto extraído insuficiente',
    userMessage: 'Conseguimos extrair muito pouco texto do seu currículo. Verifique se o arquivo contém texto selecionável (não é uma imagem). Se for um PDF escaneado, tente converter para DOCX.',
  },
  WEBHOOK_NOT_CONFIGURED: {
    code: 'WEBHOOK_NOT_CONFIGURED',
    message: 'Serviço de análise não configurado',
    userMessage: 'Nosso serviço de análise está temporariamente indisponível. Tente novamente em alguns minutos.',
  },
  AI_ANALYSIS_FAILED: {
    code: 'AI_ANALYSIS_FAILED',
    message: 'Erro na análise do currículo',
    userMessage: 'Não conseguimos analisar seu currículo. Verifique se ele contém informações como nome, experiência ou objetivo profissional.',
  },
  AI_TIMEOUT: {
    code: 'AI_TIMEOUT',
    message: 'Timeout na análise',
    userMessage: 'A análise demorou mais que o esperado. Por favor, tente novamente.',
  },
  AI_INVALID_RESPONSE: {
    code: 'AI_INVALID_RESPONSE',
    message: 'Resposta inválida da IA',
    userMessage: 'Houve um problema ao processar seu currículo. Tente novamente ou envie em outro formato.',
  },
  NETWORK_ERROR: {
    code: 'NETWORK_ERROR',
    message: 'Erro de conexão',
    userMessage: 'Erro de conexão com nosso servidor. Verifique sua internet e tente novamente.',
  },
  UNKNOWN_ERROR: {
    code: 'UNKNOWN_ERROR',
    message: 'Erro desconhecido',
    userMessage: 'Ocorreu um erro inesperado. Por favor, tente novamente ou entre em contato pelo WhatsApp.',
  },
}

// Função para retornar erro padronizado
function errorResponse(error: typeof ERRORS[keyof typeof ERRORS], details?: string, status = 400) {
  console.error(`❌ [${error.code}] ${error.message}${details ? `: ${details}` : ''}`)
  return NextResponse.json({
    success: false,
    error: {
      code: error.code,
      message: error.userMessage,
      details: process.env.NODE_ENV === 'development' ? details : undefined,
    }
  }, { status })
}

// Função para extrair texto de PDF usando pdf-parse
async function extractPdfText(buffer: Buffer): Promise<{ text: string; error?: string }> {
  try {
    // @ts-ignore - dynamic import para evitar problemas no build
    const pdfParse = (await import('pdf-parse')).default
    const data = await pdfParse(buffer)
    
    if (!data.text || data.text.trim().length === 0) {
      return { text: '', error: 'PDF sem texto extraível' }
    }
    
    return { text: data.text }
  } catch (error: any) {
    console.error('❌ Erro ao extrair PDF:', error.message)
    return { text: '', error: error.message }
  }
}

// Função para extrair texto de DOCX usando mammoth
async function extractDocxText(buffer: Buffer): Promise<{ text: string; error?: string }> {
  try {
    const result = await mammoth.extractRawText({ buffer })
    
    if (!result.value || result.value.trim().length === 0) {
      return { text: '', error: 'DOCX sem texto' }
    }
    
    return { text: result.value }
  } catch (error: any) {
    console.error('❌ Erro ao extrair DOCX:', error.message)
    return { text: '', error: error.message }
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Validação do FormData
    let formData: FormData
    try {
      formData = await request.formData()
    } catch (e) {
      return errorResponse(ERRORS.NETWORK_ERROR, 'Falha ao processar upload')
    }
    
    const file = formData.get('file') as File | null
    const email = formData.get('email') as string | null
    
    // 2. Validação do arquivo
    if (!file) {
      return errorResponse(ERRORS.NO_FILE)
    }
    
    if (!email || !email.includes('@')) {
      return errorResponse(ERRORS.NO_EMAIL)
    }
    
    // 3. Validação do formato
    const fileName = file.name.toLowerCase()
    const isDocx = fileName.endsWith('.docx')
    const isPdf = fileName.endsWith('.pdf')
    
    if (!isDocx && !isPdf) {
      return errorResponse(ERRORS.INVALID_FORMAT, `Formato recebido: ${fileName.split('.').pop()}`)
    }
    
    // 4. Validação do tamanho
    if (file.size < 100) {
      return errorResponse(ERRORS.FILE_TOO_SMALL, `Tamanho: ${file.size} bytes`)
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB
      return errorResponse(ERRORS.FILE_TOO_LARGE, `Tamanho: ${(file.size / 1024 / 1024).toFixed(2)}MB`)
    }
    
    console.log('📄 Processando:', file.name, '| Tipo:', file.type, '| Tamanho:', file.size)
    
    // 5. Extração do buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // 6. Extração do texto
    let extractedText = ''
    let extractionError = ''
    
    if (isDocx) {
      console.log('📝 Extraindo DOCX...')
      const result = await extractDocxText(buffer)
      extractedText = result.text
      extractionError = result.error || ''
      
      if (extractionError && !extractedText) {
        return errorResponse(ERRORS.DOCX_CORRUPTED, extractionError)
      }
    } else if (isPdf) {
      console.log('📑 Extraindo PDF...')
      const result = await extractPdfText(buffer)
      extractedText = result.text
      extractionError = result.error || ''
      
      if (extractionError && !extractedText) {
        return errorResponse(ERRORS.PDF_NOT_READABLE, extractionError)
      }
    }
    
    console.log('📊 Texto extraído:', extractedText.length, 'caracteres')
    
    // 7. Validação do texto extraído
    if (extractedText.length < 50) {
      console.warn('⚠️ Texto muito curto:', extractedText.substring(0, 100))
      
      if (isPdf) {
        return errorResponse(ERRORS.PDF_NOT_READABLE, `Apenas ${extractedText.length} caracteres extraídos`)
      } else {
        return errorResponse(ERRORS.TEXT_TOO_SHORT, `Apenas ${extractedText.length} caracteres extraídos`)
      }
    }
    
    // 8. Limita tamanho para a API
    if (extractedText.length > 8000) {
      extractedText = extractedText.substring(0, 8000)
      console.log('✂️ Texto truncado para 8000 caracteres')
    }
    
    // 9. Verificação do webhook
    const n8nWebhook = process.env.N8N_WEBHOOK_PARSE_CV
    
    if (!n8nWebhook) {
      return errorResponse(ERRORS.WEBHOOK_NOT_CONFIGURED, 'N8N_WEBHOOK_PARSE_CV não definido', 503)
    }
    
    // 10. Envio para n8n
    console.log('🚀 Enviando para análise...')
    
    let response: Response
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 30000) // 30s timeout
      
      response = await fetch(n8nWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cv_text: extractedText,
          file_name: file.name,
          email: email,
        }),
        signal: controller.signal,
      })
      
      clearTimeout(timeout)
    } catch (fetchError: any) {
      if (fetchError.name === 'AbortError') {
        return errorResponse(ERRORS.AI_TIMEOUT, 'Timeout após 30 segundos', 504)
      }
      return errorResponse(ERRORS.NETWORK_ERROR, fetchError.message, 502)
    }
    
    // 11. Validação da resposta do n8n
    if (!response.ok) {
      return errorResponse(ERRORS.AI_ANALYSIS_FAILED, `Status: ${response.status}`, 502)
    }
    
    // 12. Parse da resposta
    let data: any
    try {
      const responseText = await response.text()
      
      if (!responseText || responseText.trim() === '') {
        return errorResponse(ERRORS.AI_INVALID_RESPONSE, 'Resposta vazia do servidor')
      }
      
      data = JSON.parse(responseText)
    } catch (parseError: any) {
      return errorResponse(ERRORS.AI_INVALID_RESPONSE, `Parse error: ${parseError.message}`)
    }
    
    // 13. Validação dos dados retornados
    const cvData = data.cv_data || data
    
    if (!cvData || typeof cvData !== 'object') {
      return errorResponse(ERRORS.AI_INVALID_RESPONSE, 'cv_data não encontrado na resposta')
    }
    
    // Verifica se tem pelo menos cargo_desejado
    if (!cvData.cargo_desejado) {
      return errorResponse(ERRORS.AI_ANALYSIS_FAILED, 'Não foi possível identificar o cargo desejado')
    }
    
    console.log('✅ Análise concluída:', cvData.cargo_desejado)
    
    // 14. Retorno de sucesso
    return NextResponse.json({
      success: true,
      cv_data: cvData,
    })
    
  } catch (error: any) {
    console.error('❌ Erro não tratado:', error)
    return errorResponse(ERRORS.UNKNOWN_ERROR, error.message, 500)
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'