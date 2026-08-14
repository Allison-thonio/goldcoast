'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'About', href: '/about' },
  { label: 'Programmes', href: '/programmes' },
  { label: 'Field Notes', href: '/field-notes' },
  { label: 'Volunteer', href: '/volunteer' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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
      if (e.key === 'Escape' && isOpen) setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? 'py-3 bg-teal-ink/85 backdrop-blur-xl border-b border-sand/15 shadow-2xl'
          : 'py-6 bg-gradient-to-b from-teal-ink/80 via-teal-ink/40 to-transparent'
      }`}
    >
      <nav className="container-goldcoast flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-paper focus-visible:outline-none"
        >
          <span className="relative flex h-3.5 w-3.5 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-clay opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-clay"></span>
          </span>
          <span className="font-serif text-2xl font-bold tracking-tight text-paper group-hover:text-sand transition-colors duration-300">
            Goldcoast
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-teal-ink/60 border border-sand/15 backdrop-blur-md px-4 py-1.5 rounded-full shadow-inner">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-sand bg-sand/10 font-semibold shadow-sm'
                    : 'text-paper/80 hover:text-paper hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-clay" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/donate"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-xs uppercase tracking-widest font-mono font-bold text-teal-ink bg-clay hover:bg-clay-deep hover:text-paper rounded-full transition-all duration-300 shadow-md hover:shadow-clay/20 active:scale-95"
          >
            Support Us
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-teal-ink/80 text-paper border border-sand/20 backdrop-blur-md transition-all active:scale-90"
          >
            {isOpen ? (
              <svg className="w-5 h-5 text-sand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-paper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Navigation Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-teal-ink/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:hidden animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between pt-2">
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
              className="w-10 h-10 rounded-full bg-teal-ink border border-sand/20 flex items-center justify-center text-sand"
            >
              ✕
            </button>
          </div>

          <div className="my-auto space-y-6 text-center">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href
              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-serif text-3xl transition-colors ${
                      isActive ? 'text-sand font-bold' : 'text-paper/85 hover:text-sand'
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              )
            })}
            <div className="pt-6">
              <Link
                href="/donate"
                onClick={() => setIsOpen(false)}
                className="inline-block w-full max-w-xs py-3 text-sm font-mono uppercase tracking-widest font-bold text-teal-ink bg-clay hover:bg-clay-deep rounded-full shadow-lg"
              >
                Support Our Work
              </Link>
            </div>
          </div>

          <div className="text-center text-xs font-mono text-sand/60 pb-2">
            Goldcoast Developmental Foundation
          </div>
        </div>
      )}
    </header>
  )
}
