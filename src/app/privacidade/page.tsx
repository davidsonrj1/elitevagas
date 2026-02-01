'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui'
import Link from 'next/link'

export default function PrivacidadePage() {
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
            Política de Privacidade
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
              <h2 className="text-xl font-semibold text-elite-green mb-4">1. Introdução</h2>
              <p className="text-white/70 leading-relaxed">
                A Elite Vagas ("nós", "nosso" ou "plataforma") está comprometida em proteger sua privacidade. 
                Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas 
                informações pessoais quando você utiliza nosso serviço de busca de vagas com inteligência artificial.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-elite-green mb-4">2. Informações que Coletamos</h2>
              <p className="text-white/70 leading-relaxed mb-4">Coletamos os seguintes tipos de informações:</p>
              
              <h3 className="text-lg font-medium text-white mb-2">2.1 Informações fornecidas por você:</h3>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Endereço de e-mail</li>
                <li>Currículo (CV) em formato PDF ou DOCX</li>
                <li>Dados extraídos do currículo: cargo desejado, habilidades, experiência profissional, formação acadêmica e localização</li>
              </ul>
              
              <h3 className="text-lg font-medium text-white mb-2 mt-4">2.2 Informações coletadas automaticamente:</h3>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Dados de uso e navegação</li>
                <li>Endereço IP e informações do dispositivo</li>
                <li>Dados de transação de pagamento (processados pelo Mercado Pago)</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-elite-green mb-4">3. Como Usamos suas Informações</h2>
              <p className="text-white/70 leading-relaxed mb-4">Utilizamos suas informações para:</p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Analisar seu perfil profissional usando inteligência artificial</li>
                <li>Buscar e recomendar vagas compatíveis com seu perfil</li>
                <li>Enviar as vagas selecionadas para seu e-mail</li>
                <li>Enviar alertas de novas vagas (para planos com essa funcionalidade)</li>
                <li>Processar pagamentos e fornecer suporte ao cliente</li>
                <li>Melhorar nossos serviços e algoritmos de recomendação</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-elite-green mb-4">4. Compartilhamento de Dados</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                <strong className="text-white">Não vendemos seus dados pessoais.</strong> Compartilhamos informações apenas com:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li><strong className="text-white">Mercado Pago:</strong> Para processamento seguro de pagamentos</li>
                <li><strong className="text-white">OpenAI:</strong> Para análise do currículo (dados anonimizados quando possível)</li>
                <li><strong className="text-white">Provedores de e-mail:</strong> Para envio das vagas selecionadas</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-elite-green mb-4">5. Armazenamento e Segurança</h2>
              <p className="text-white/70 leading-relaxed">
                Seus dados são armazenados em servidores seguros com criptografia em repouso e em trânsito. 
                Utilizamos o Supabase como banco de dados, que segue padrões de segurança da indústria. 
                O arquivo do currículo original não é armazenado permanentemente - apenas o texto extraído 
                é mantido para fins de busca de vagas.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-elite-green mb-4">6. Seus Direitos (LGPD)</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou desatualizados</li>
                <li>Solicitar a exclusão dos seus dados</li>
                <li>Revogar o consentimento a qualquer momento</li>
                <li>Solicitar a portabilidade dos dados</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                Para exercer esses direitos, entre em contato pelo e-mail: <span className="text-elite-green">contato@elitevagas.com.br</span>
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-elite-green mb-4">7. Retenção de Dados</h2>
              <p className="text-white/70 leading-relaxed">
                Mantemos seus dados pelo período necessário para fornecer nossos serviços:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-4">
                <li><strong className="text-white">Plano Unitário:</strong> Dados mantidos por 30 dias após a compra</li>
                <li><strong className="text-white">Plano Mensal:</strong> Dados mantidos durante a vigência + 30 dias</li>
                <li><strong className="text-white">Plano Trimestral:</strong> Dados mantidos durante a vigência + 30 dias</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                Você pode solicitar a exclusão antecipada a qualquer momento.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-elite-green mb-4">8. Cookies</h2>
              <p className="text-white/70 leading-relaxed">
                Utilizamos cookies essenciais para o funcionamento do site e cookies analíticos 
                (via Vercel Analytics) para entender como os usuários interagem com nossa plataforma. 
                Você pode desabilitar cookies nas configurações do seu navegador.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-elite-green mb-4">9. Alterações nesta Política</h2>
              <p className="text-white/70 leading-relaxed">
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre 
                mudanças significativas por e-mail ou através de aviso em nosso site. Recomendamos 
                revisar esta página regularmente.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-elite-green mb-4">10. Contato</h2>
              <p className="text-white/70 leading-relaxed">
                Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento dos 
                seus dados, entre em contato:
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