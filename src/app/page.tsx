'use client'

import { useEffect, useState } from 'react'
import {
  Header,
  HeroSection,
  ProblemSection,
  SolutionSection,
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
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <PricingSection />
      </main>
      
      <Footer />
    </>
  )
}
