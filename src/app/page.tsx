'use client'

import { useEffect, useState } from 'react'
import {
  Header,
  HeroSection,
  ProblemSection,
  SolutionSection,
  BenefitsSection,
  ObjectionSection,
  ValueSection,
  ClosingSection,
  PricingSection,
  Footer,
  ProgressBar,
} from '@/components'

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setScrollProgress(progress)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <>
      <ProgressBar progress={scrollProgress} />
      <Header />
      
      <main>
        {/* 1. HERO - Pattern interrupt + Promise */}
        <HeroSection />
        
        {/* 2. DOR - Agitate the problem */}
        <ProblemSection />
        
        {/* 3. SOLUÇÃO - Present the solution */}
        <SolutionSection />
        
        {/* 4. BENEFÍCIOS - Stack the benefits */}
        <BenefitsSection />
        
        {/* 5. QUEBRA DE OBJEÇÃO - Handle objections */}
        <ObjectionSection />
        
        {/* 6. VALOR/TEMPO - Reframe value */}
        <ValueSection />
        
        {/* 7. PREÇOS - Pricing section */}
        <PricingSection />
        
        {/* 8. FECHAMENTO - Final CTA */}
        <ClosingSection />
      </main>
      
      <Footer />
    </>
  )
}
