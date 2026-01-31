'use client'

import { forwardRef, ButtonHTMLAttributes, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { SpinnerIcon } from './Icons'

// Button Component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-elite-green/50 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-elite-green text-black hover:bg-elite-green-light glow-hover',
      secondary: 'bg-white/10 text-white hover:bg-white/20',
      outline: 'border border-white/20 text-white hover:border-white/40 hover:bg-white/5',
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }
    
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <SpinnerIcon size={20} className="mr-2" />
            <span>Carregando...</span>
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)
Button.displayName = 'Button'

// Input Component
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            'w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-white/30 transition-colors focus:border-elite-green',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

// Card Component
interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  highlight?: boolean
}

export function Card({ children, className, hover = false, highlight = false }: CardProps) {
  return (
    <div
      className={cn(
        'relative p-6 sm:p-8 rounded-2xl border backdrop-blur-sm',
        highlight 
          ? 'border-elite-green bg-elite-green/10' 
          : 'border-white/10 bg-white/5',
        hover && 'card-hover',
        className
      )}
    >
      {children}
    </div>
  )
}

// Badge Component
interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-white/10 text-white',
    success: 'bg-elite-green text-black',
    warning: 'bg-orange-500 text-black',
  }
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

// Section Container
interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-20 relative',
        className
      )}
    >
      {children}
    </section>
  )
}

// Container
interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Container({ children, className, size = 'lg' }: ContainerProps) {
  const sizes = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-5xl',
    xl: 'max-w-7xl',
  }
  
  return (
    <div className={cn('w-full mx-auto', sizes[size], className)}>
      {children}
    </div>
  )
}

// Progress Bar
interface ProgressBarProps {
  progress: number
  className?: string
}

export function ProgressBar({ progress, className }: ProgressBarProps) {
  return (
    <div className={cn('fixed top-0 left-0 right-0 h-1 z-50', className)}>
      <div
        className="h-full bg-gradient-to-r from-elite-green via-elite-green-light to-elite-green transition-transform duration-100 origin-left"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
