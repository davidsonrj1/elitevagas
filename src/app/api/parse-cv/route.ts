import { NextRequest, NextResponse } from 'next/server'
import mammoth from 'mammoth'

// Função para extrair texto de PDF usando pdf-parse
async function extractPdfText(buffer: Buffer): Promise<string> {
  try {
    // @ts-ignore - dynamic import para evitar problemas no build
    const pdfParse = (await import('pdf-parse')).default
    const data = await pdfParse(buffer)
    return data.text || ''
  } catch (error: any) {
    console.error('❌ Erro ao extrair PDF com pdf-parse:', error.message)
    return ''
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const email = formData.get('email') as string
    
    if (!file) {
      return NextResponse.json({ error: 'Arquivo não enviado' }, { status: 400 })
    }
    
    if (!email) {
      return NextResponse.json({ error: 'Email não informado' }, { status: 400 })
    }
    
    console.log('📄 Arquivo:', file.name, '| Tipo:', file.type, '| Tamanho:', file.size)
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const fileName = file.name.toLowerCase()
    const isDocx = fileName.endsWith('.docx')
    const isPdf = fileName.endsWith('.pdf')
    
    let extractedText = ''
    
    if (isDocx) {
      console.log('📝 Extraindo DOCX com mammoth...')
      try {
        const result = await mammoth.extractRawText({ buffer })
        extractedText = result.value
        console.log('✅ Mammoth extraiu:', extractedText.length, 'caracteres')
      } catch (e: any) {
        console.error('❌ Erro mammoth:', e.message)
      }
    } else if (isPdf) {
      console.log('📑 Extraindo PDF com pdf-parse...')
      extractedText = await extractPdfText(buffer)
      console.log('✅ PDF-parse extraiu:', extractedText.length, 'caracteres')
    }
    
    // Log do texto extraído para debug
    console.log('📝 Texto extraído (preview):', extractedText.substring(0, 500))
    
    // Se não extraiu texto suficiente, retorna fallback
    if (extractedText.length < 50) {
      console.warn('⚠️ Texto insuficiente, retornando fallback')
      return NextResponse.json({
        success: true,
        cv_data: {
          cargo_desejado: 'Profissional de TI',
          senioridade: 'Pleno',
          skills: ['Tecnologia'],
          localidade: 'Brasil',
          modelo_trabalho: 'Qualquer',
          anos_experiencia: 2,
          idiomas: ['Português'],
          formacao: 'Não identificado',
        },
        warning: 'Não foi possível extrair texto do arquivo'
      })
    }
    
    // Limita tamanho
    if (extractedText.length > 8000) {
      extractedText = extractedText.substring(0, 8000)
    }
    
    // Envia para n8n
    const n8nWebhook = process.env.N8N_WEBHOOK_PARSE_CV
    
    if (!n8nWebhook) {
      console.error('❌ N8N_WEBHOOK_PARSE_CV não configurado')
      return NextResponse.json({ 
        error: 'Webhook não configurado. Configure N8N_WEBHOOK_PARSE_CV nas variáveis de ambiente.' 
      }, { status: 500 })
    }
    
    console.log('🚀 Enviando para n8n:', n8nWebhook)
    console.log('📊 Tamanho do texto:', extractedText.length, 'caracteres')
    
    const response = await fetch(n8nWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cv_text: extractedText,
        file_name: file.name,
        email: email,
      }),
    })
    
    // Log detalhado da resposta
    console.log('📡 Status n8n:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Erro n8n:', response.status, errorText)
      throw new Error(`Erro no servidor n8n: ${response.status}`)
    }
    
    // Tenta parsear a resposta
    const responseText = await response.text()
    console.log('📥 Resposta bruta n8n:', responseText.substring(0, 500))
    
    if (!responseText || responseText.trim() === '') {
      console.error('❌ Resposta vazia do n8n')
      throw new Error('O servidor retornou uma resposta vazia')
    }
    
    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error('❌ Erro ao parsear JSON:', parseError)
      console.error('📄 Resposta recebida:', responseText)
      throw new Error('Resposta inválida do servidor (não é JSON)')
    }
    
    console.log('✅ Resposta n8n parseada:', JSON.stringify(data).substring(0, 200))
    
    // Verifica se tem cv_data
    if (!data.cv_data && !data.success) {
      console.warn('⚠️ Resposta sem cv_data, usando resposta completa')
      return NextResponse.json({
        success: true,
        cv_data: data,
      })
    }
    
    return NextResponse.json({
      success: true,
      cv_data: data.cv_data || data,
    })
    
  } catch (error: any) {
    console.error('❌ Erro completo:', error)
    return NextResponse.json({ 
      error: error.message || 'Erro ao processar currículo',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 })
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'