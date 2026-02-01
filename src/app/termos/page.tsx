'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui'
import Link from 'next/link'

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-elite-dark py-12 px-4">
      <div className="noise" />
      
      <Container size="md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link href="/" className="inline-block text-2xl font-bold tracking-tight font-display mb-8">
            ELITE<span className="text-elite-green">VAGAS</span>
          </Link>
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 font-display">
            Termos de Uso
          </h1>
          <p className="text-white/60">
            Última atualização: {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </p>
        </motion.div>
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-10"
        >
          <div className="prose prose-invert prose-green max-w-none space-y-8">
            
            <section>
              <h2 className="text-xl font-semibold text-elite-green mb-4">1. Aceitação dos Termos</h2>
              <p className="text-white/70 leading-relaxed">
                Ao acessar e utilizar a plataforma Elite Vagas, você concorda com estes Termos de Uso. 
                Se você não concordar com qualquer parte destes termos, não utilize nossos serviços. 
                O uso continuado da plataforma após alterações nos termos constitui aceitação das mudanças.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-elite-green mb-4">2. Descrição do Serviço</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                A Elite Vagas é uma plataforma que utiliza inteligência artificial para:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Analisar currículos enviados pelos usuários</li>
                <li>Buscar vagas de emprego em diversas fontes (Gupy, LinkedIn, Indeed, etc.)</li>
                <li>Recomendar as vagas mais compatíveis com o perfil do usuário</li>
                <li>Enviar as vagas selecionadas por e-mail</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                <strong className="text-white">Importante:</strong> Não somos uma agência de empregos e não garantimos 
                contratação. Nosso serviço facilita a busca, mas a candidatura e o processo seletivo 
                são de responsabilidade do usuário e das empresas.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-elite-green mb-4">3. Planos e Pagamentos</h2>
              
              <h3 className="text-lg font-medium text-white mb-2">3.1 Planos Disponíveis:</h3>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li><strong className="text-white">Unitário (R$ 9,90):</strong> 1 busca, 5 vagas curadas, score de compatibilidade</li>
                <li><strong className="text-white">Mensal (R$ 29,90/mês):</strong> Buscas ilimitadas, alertas diários, suporte WhatsApp</li>
                <li><strong className="text-white">Trimestral (R$ 67,90/3 meses):</strong> Tudo do mensal + análise completa de CV + dicas personalizadas</li>
              </ul>
              
              <h3 className="text-lg font-medium text-white mb-2 mt-4">3.2 Pagamento:</h3>
              <p className="text-white/70 leading-relaxed">
                Todos os pagamentos são processados pelo Mercado Pago. Aceitamos Pix, cartão de crédito 
                e boleto. Os preços podem ser alterados sem aviso prévio.
              </p>
              
              <h3 className="text-lg font-medium text-white mb-2 mt-4">3.3 Renovação:</h3>
              <p className="text-white/70 leading-relaxed">
                Os planos Mensal e Trimestral <strong className="text-white">não são renovados automaticamente</strong>. 
                Ao final do período, você precisará contratar novamente se desejar continuar usando.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-elite-green mb-4">4. Política de Reembolso</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Oferecemos <strong className="text-white">garantia de 7 dias</strong> para todos os planos:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Se não ficar satisfeito, solicite o reembolso em até 7 dias após a compra</li>
                <li>O reembolso será integral, sem perguntas</li>
                <li>Para solicitar, entre em contato pelo e-mail ou WhatsApp</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                Após 7 dias, não são aceitos pedidos de reembolso, exceto em casos de cobranças indevidas.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-elite-green mb-4">5. Responsabilidades do Usuário</h2>
              <p className="text-white/70 leading-relaxed mb-4">Ao usar a Elite Vagas, você se compromete a:</p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Fornecer informações verdadeiras no currículo</li>
                <li>Usar o serviço apenas para fins de busca de emprego</li>
                <li>Não compartilhar sua conta com terceiros</li>
                <li>Não tentar burlar, hackear ou prejudicar a plataforma</li>
                <li>Não utilizar o serviço para spam ou atividades ilegais</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-elite-green mb-4">6. Limitações do Serviço</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Reconhecemos algumas limitações do nosso serviço:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Currículos com muito design gráfico (Canva, Zety) podem não ser lidos corretamente</li>
                <li>A qualidade das recomendações depende das informações do currículo</li>
                <li>As vagas são buscadas em fontes públicas e podem não estar mais disponíveis</li>
                <li>Não controlamos os processos seletivos das empresas</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-elite-green mb-4">7. Propriedade Intelectual</h2>
              <p className="text-white/70 leading-relaxed">
                Todo o conteúdo da plataforma (design, código, textos, logos) é propriedade da Elite Vagas 
                e está protegido por leis de direitos autorais. Você não pode copiar, modificar ou 
                distribuir nosso conteúdo sem autorização expressa.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-elite-green mb-4">8. Limitação de Responsabilidade</h2>
              <p className="text-white/70 leading-relaxed">
                A Elite Vagas não se responsabiliza por:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-4">
                <li>Decisões de contratação das empresas</li>
                <li>Veracidade das informações nas vagas divulgadas</li>
                <li>Perdas ou danos decorrentes do uso ou impossibilidade de uso do serviço</li>
                <li>Interrupções temporárias por manutenção ou problemas técnicos</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                Nossa responsabilidade máxima é limitada ao valor pago pelo serviço.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-elite-green mb-4">9. Suspensão e Cancelamento</h2>
              <p className="text-white/70 leading-relaxed">
                Reservamos o direito de suspender ou cancelar contas que:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-4">
                <li>Violem estes Termos de Uso</li>
                <li>Forneçam informações falsas</li>
                <li>Utilizem o serviço de forma abusiva</li>
                <li>Prejudiquem outros usuários ou a plataforma</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-elite-green mb-4">10. Alterações nos Termos</h2>
              <p className="text-white/70 leading-relaxed">
                Podemos modificar estes Termos de Uso a qualquer momento. Alterações significativas 
                serão comunicadas por e-mail ou aviso no site com pelo menos 15 dias de antecedência. 
                O uso continuado após as alterações implica aceitação dos novos termos.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-elite-green mb-4">11. Lei Aplicável e Foro</h2>
              <p className="text-white/70 leading-relaxed">
                Estes Termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa 
                será submetida ao foro da comarca de São Paulo/SP, com exclusão de qualquer outro, 
                por mais privilegiado que seja.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-elite-green mb-4">12. Contato</h2>
              <p className="text-white/70 leading-relaxed">
                Para dúvidas sobre estes Termos de Uso:
              </p>
              <div className="mt-4 p-4 bg-white/5 rounded-lg">
                <p className="text-white/70">
                  <strong className="text-white">Elite Vagas</strong><br />
                  E-mail: <span className="text-elite-green">contato@elitevagas.com.br</span><br />
                  WhatsApp: <span className="text-elite-green">(21) 990268273</span>
                </p>
              </div>
            </section>
            
          </div>
        </motion.div>
        
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link href="/" className="text-white/60 hover:text-elite-green transition-colors">
            ← Voltar para a página inicial
          </Link>
        </motion.div>
      </Container>
    </div>
  )
}