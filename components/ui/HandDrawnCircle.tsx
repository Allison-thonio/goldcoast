'use client'

import { useEffect, useState } from 'react'

interface HandDrawnCircleProps {
  isSelected: boolean
  className?: string
}

export function HandDrawnCircle({ isSelected, className = '' }: HandDrawnCircleProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)
    }
  }, [])

  if (!isSelected) return null

  return (
    <svg
      className={`absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] pointer-events-none z-10 ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d="M 8,50 C 8,20 22,8 50,8 C 78,8 92,20 92,50 C 92,80 78,92 50,92 C 22,92 8,80 8,50 C 8,36 18,12 46,9"
        fill="none"
        stroke="#BE5A2E"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="320"
        style={{
          strokeDashoffset: prefersReducedMotion ? 0 : 320,
          animation: prefersReducedMotion
            ? 'none'
            : 'drawHandCircle 0.5s ease-out forwards',
        }}
      />
      <style>{`
        @keyframes drawHandCircle {
          from {
            stroke-dashoffset: 320;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </svg>
  )
}

export default HandDrawnCircle
