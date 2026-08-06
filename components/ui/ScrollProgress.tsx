'use client'

import { useEffect, useRef, useState } from 'react'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)
    }

    let animationFrameId: number

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight

      let progress = 0
      if (docHeight > 0) {
        progress = Math.min(Math.max(scrollTop / docHeight, 0), 1)
      }

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`
      }

      animationFrameId = requestAnimationFrame(updateScrollProgress)
    }

    updateScrollProgress()

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  if (prefersReducedMotion) return null

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none bg-sand/30">
      <div
        ref={barRef}
        className="h-full bg-clay origin-left transition-transform duration-75 ease-out shadow-[0_0_8px_rgba(190,90,46,0.5)]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}

export default ScrollProgress
