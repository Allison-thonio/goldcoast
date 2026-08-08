'use client'

import { useEffect, useState } from 'react'

interface StampBadgeProps {
  status: 'confirmed' | 'pending' | 'submitted' | string
  label?: string
  className?: string
}

export function StampBadge({ status, label, className = '' }: StampBadgeProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)
    }
  }, [])

  const isConfirmed = status.toLowerCase().includes('confirmed')
  const text = label || (isConfirmed ? 'CONFIRMED' : 'SUBMITTED — PENDING VERIFICATION')

  return (
    <div
      className={`inline-block font-mono text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded border-2 select-none ${
        isConfirmed
          ? 'bg-teal/10 text-teal border-teal'
          : 'bg-clay/10 text-clay border-clay'
      } ${className}`}
      style={{
        transform: 'rotate(-3deg)',
        boxShadow: isConfirmed
          ? '0 0 12px rgba(15, 44, 89, 0.25)'
          : '0 0 12px rgba(212, 175, 55, 0.25)',
        animation: prefersReducedMotion
          ? 'none'
          : 'stampIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      }}
    >
      {text}

      <style>{`
        @keyframes stampIn {
          0% {
            opacity: 0;
            transform: scale(1.4) rotate(-8deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(-3deg);
          }
        }
      `}</style>
    </div>
  )
}

export default StampBadge
