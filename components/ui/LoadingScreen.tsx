'use client'

import { useEffect, useState } from 'react'

export function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (mediaQuery.matches) return

      const hasSeen = sessionStorage.getItem('goldcoast_loader_seen')
      if (!hasSeen) {
        setShowLoader(true)
        const closeTimer = setTimeout(() => {
          setIsClosing(true)
          sessionStorage.setItem('goldcoast_loader_seen', 'true')
          const hideTimer = setTimeout(() => {
            setShowLoader(false)
          }, 800)
          return () => clearTimeout(hideTimer)
        }, 1000)
        return () => clearTimeout(closeTimer)
      }
    }
  }, [])

  return (
    <>
      {children}
      {mounted && showLoader && (
        <div
          className="fixed inset-0 z-[99999] pointer-events-none flex overflow-hidden"
          aria-hidden="true"
        >
          {/* Left Split Curtain */}
          <div
            className="w-1/2 h-full bg-teal flex items-center justify-end pr-2 transition-transform duration-800 ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{
              transform: isClosing ? 'translateX(-100%)' : 'translateX(0)',
              transitionDuration: '800ms',
            }}
          >
            <span className="font-serif text-3xl md:text-5xl font-bold text-sand tracking-tight">
              Gold
            </span>
          </div>

          {/* Right Split Curtain */}
          <div
            className="w-1/2 h-full bg-teal flex items-center justify-start pl-2 transition-transform duration-800 ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{
              transform: isClosing ? 'translateX(100%)' : 'translateX(0)',
              transitionDuration: '800ms',
            }}
          >
            <span className="font-serif text-3xl md:text-5xl font-bold text-clay tracking-tight">
              coast
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default LoadingScreen
