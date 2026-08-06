'use client'

import { useEffect, useRef, useState } from 'react'

interface DevelopingCardProps {
  children: React.ReactNode
  className?: string
}

export function DevelopingCard({ children, className = '' }: DevelopingCardProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (mediaQuery.matches) {
        setIsRevealed(true)
        return
      }
    }

    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-600 ease-out ${className}`}
      style={{
        filter: isRevealed ? 'blur(0px)' : 'blur(8px)',
        opacity: isRevealed ? 1 : 0.3,
        transition: 'filter 0.6s ease-out, opacity 0.6s ease-out, transform 0.3s ease',
      }}
    >
      {children}
    </div>
  )
}

export default DevelopingCard
