'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'About', href: '/about' },
  { label: 'Programmes', href: '/programmes' },
  { label: 'Field Notes', href: '/field-notes' },
  { label: 'Donate', href: '/donate' },
  { label: 'Volunteer', href: '/volunteer' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  return (
    <header className="sticky top-0 z-50 bg-teal text-paper border-b border-teal-ink/80 shadow-md transition-all duration-300">
      <nav className="container-goldcoast py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl font-bold text-paper hover:text-sand transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand rounded flex items-center gap-2 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-clay group-hover:scale-125 transition-transform duration-300" />
          Goldcoast
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-7 items-center">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`font-sans text-sm font-medium transition-all duration-200 relative py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand rounded ${
                    isActive ? 'text-sand font-bold' : 'text-paper/85 hover:text-paper'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sand rounded-full transition-all duration-300" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-teal-ink/60 hover:bg-teal-ink text-paper border border-sand/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand z-50"
        >
          {isOpen ? (
            /* Clear 'X' Close icon */
            <svg
              className="w-6 h-6 text-paper"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Hamburger Icon */
            <svg
              className="w-6 h-6 text-paper"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            </svg>
          )}
        </button>
      </nav>

      {/* Fullscreen Mobile Overlay Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-teal-ink/90 backdrop-blur-xl z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
            style={{
              animation: prefersReducedMotion ? 'none' : 'fadeIn 0.3s ease-out',
            }}
          />

          {/* Menu Panel */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none md:hidden"
            style={{
              animation: prefersReducedMotion ? 'none' : 'circleReveal 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            }}
            aria-hidden={!isOpen}
          >
            <div className="pointer-events-auto w-full h-full bg-teal text-paper flex flex-col justify-between p-8 relative">
              {/* Top Row with Brand and Prominent 'X' Close Button */}
              <div className="flex items-center justify-between w-full pt-2">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="font-serif text-2xl font-bold text-paper flex items-center gap-2"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-clay" />
                  Goldcoast
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                  className="w-11 h-11 rounded-full bg-teal-ink/80 flex items-center justify-center text-paper hover:text-sand hover:bg-teal-ink transition-all duration-200 focus-visible:outline-2 focus-visible:outline-sand border border-sand/20 shadow-sm"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="my-auto py-8">
                <ul className="flex flex-col gap-8 text-center">
                  {NAV_ITEMS.map((item, idx) => {
                    const isActive = pathname === item.href
                    return (
                      <li
                        key={item.href}
                        style={{
                          animation: prefersReducedMotion
                            ? 'none'
                            : `navLinkFadeUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${150 + idx * 60}ms both`,
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`font-serif text-3xl font-bold transition-all duration-200 inline-block focus-visible:outline-2 focus-visible:outline-sand rounded px-4 py-1 ${
                            isActive ? 'text-sand scale-105 font-bold' : 'text-paper/90 hover:text-sand'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Footer hint */}
              <div className="text-center pb-4">
                <p className="font-mono text-xs text-sand/70">
                  Press <kbd className="px-1.5 py-0.5 bg-teal-ink rounded border border-sand/20 text-sand font-sans">ESC</kbd> or tap <span className="font-semibold text-sand">✕</span> to close
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes circleReveal {
          from {
            clip-path: circle(0% at top right);
            opacity: 0;
          }
          to {
            clip-path: circle(150% at top right);
            opacity: 1;
          }
        }

        @keyframes navLinkFadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
        }
      `}</style>
    </header>
  )
}


