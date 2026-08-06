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
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-md border-b border-sand-deep transition-all duration-300">
      <nav className="container-goldcoast py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl font-bold text-ink hover:text-clay transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay rounded flex items-center gap-2 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-clay group-hover:scale-125 transition-transform duration-300" />
          Goldcoast
        </Link>

        {/* Desktop Navigation - Readable labels instead of plain numbers */}
        <ul className="hidden md:flex gap-7 items-center">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`font-sans text-sm font-medium transition-all duration-200 relative py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay rounded ${
                    isActive ? 'text-clay font-semibold' : 'text-ink/80 hover:text-clay'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-clay rounded-full transition-all duration-300" />
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
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-sand/50 hover:bg-sand transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay z-50"
        >
          {isOpen ? (
            /* Clear 'X' Close icon */
            <svg
              className="w-6 h-6 text-ink"
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
              className="w-6 h-6 text-ink"
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
            className="fixed inset-0 bg-paper/90 backdrop-blur-lg z-40 md:hidden"
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
            <div className="pointer-events-auto w-full h-full bg-paper flex flex-col justify-between p-8 relative">
              {/* Top Row with Brand and Prominent 'X' Close Button */}
              <div className="flex items-center justify-between w-full pt-2">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="font-serif text-2xl font-bold text-ink"
                >
                  Goldcoast
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                  className="w-11 h-11 rounded-full bg-sand flex items-center justify-center text-ink hover:text-clay hover:bg-sand-deep transition-all duration-200 focus-visible:outline-2 focus-visible:outline-clay border border-sand-deep/60 shadow-sm"
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
                          className={`font-serif text-3xl font-bold transition-all duration-200 inline-block focus-visible:outline-2 focus-visible:outline-clay rounded px-4 py-1 ${
                            isActive ? 'text-clay scale-105' : 'text-ink hover:text-clay'
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
                <p className="font-mono text-xs text-mangrove/80">
                  Press <kbd className="px-1.5 py-0.5 bg-sand rounded border text-ink font-sans">ESC</kbd> or tap <span className="font-semibold text-clay">✕</span> to close
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

