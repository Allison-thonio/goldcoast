'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  /** Extra delay before this element reveals (ms) */
  delay?: number
  /** HTML element to render as */
  as?: 'div' | 'section' | 'article' | 'li'
}

/**
 * Lightweight scroll-triggered reveal wrapper.
 * Uses IntersectionObserver + the global section-reveal CSS class
 * (which reads --ease-settle and --duration-reveal tokens).
 *
 * One-shot: once visible, stays visible. Respects prefers-reduced-motion.
 */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [skipAnimation, setSkipAnimation] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (mediaQuery.matches) {
        setSkipAnimation(true)
        setIsVisible(true)
        return
      }
    }

    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay)
          } else {
            setIsVisible(true)
          }
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [delay])

  if (skipAnimation) {
    return (
      <Tag className={className} ref={elementRef as any}>
        {children}
      </Tag>
    )
  }

  return (
    <Tag
      ref={elementRef as any}
      className={`section-reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

export default ScrollReveal
