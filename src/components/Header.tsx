'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from './ui'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-4 transition-all duration-300',
          isScrolled
            ? 'bg-elite-dark/80 backdrop-blur-lg border-b border-white/5'
            : ''
        )}
      >
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl font-bold tracking-tight font-display"
          >
            ELITE<span className="text-elite-green">VAGAS</span>
          </motion.a>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden md:flex items-center gap-8"
          >
            <a
              href="#como-funciona"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Como funciona
            </a>

            <a
              href="#precos"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Preços
            </a>

            <Button variant="outline" size="sm">
              <a href="#precos">Começar Agora</a>
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-elite-dark/95 backdrop-blur-lg md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              <a
                href="#como-funciona"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-medium text-white/80 hover:text-white transition-colors"
              >
                Como funciona
              </a>

              <a
                href="#precos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-medium text-white/80 hover:text-white transition-colors"
              >
                Preços
              </a>

              <Button
                size="lg"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  document
                    .getElementById('precos')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Começar Agora
              </Button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
