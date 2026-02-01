import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Elite Vagas | Curadoria Inteligente de Vagas com IA',
  description:
    'Pare de caçar vagas. Nossa IA analisa seu currículo e encontra as oportunidades perfeitas pra você. Receba 5 vagas curadas no seu email.',
  keywords: ['vagas de emprego', 'curadoria de vagas', 'IA', 'emprego', 'carreira', 'currículo'],
  authors: [{ name: 'Elite Vagas' }],

  openGraph: {
    title: 'Elite Vagas | Curadoria Inteligente de Vagas com IA',
    description: 'Pare de caçar vagas. Deixe elas te encontrarem.',
    url: 'https://elitevagas.com.br',
    siteName: 'Elite Vagas',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://elitevagas.com.br/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Elite Vagas',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Elite Vagas | Curadoria Inteligente de Vagas com IA',
    description: 'Pare de caçar vagas. Deixe elas te encontrarem.',
    images: ['https://elitevagas.com.br/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {/* Preload fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-elite-dark text-white antialiased">
        <div className="noise" />
        {children}
      </body>
    </html>
  )
}
