'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface HeroProps {
  tagline?: string
  title?: string
  subtitle?: string
  ctaLabel?: string
  ctaLink?: string
}

export default function Hero({
  tagline = 'Registered Foundation · Bayelsa, Nigeria · Est. 2012',
  title = 'Service, carried on from one generation to the next.',
  subtitle = 'Founded by Moses Oruaze Dickson in memory of Goldcoast Dickson. Working across health, education, and youth development in the Niger Delta since 2012.',
  ctaLabel = 'Make a Donation',
  ctaLink = '/donate',
}: HeroProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [wordStates, setWordStates] = useState<boolean[]>([])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
  }, [])

  useEffect(() => {
    const words = title.split(' ')
    const newWordStates = new Array(words.length).fill(false)
    setWordStates(newWordStates)

    if (prefersReducedMotion) {
      setWordStates(new Array(words.length).fill(true))
      return
    }

    let delay = 150
    words.forEach((_, idx) => {
      setTimeout(() => {
        setWordStates((prev) => {
          const next = [...prev]
          next[idx] = true
          return next
        })
      }, delay + idx * 60)
    })
  }, [title, prefersReducedMotion])

  const words = title.split(' ')

  return (
    <section className="relative min-h-[85vh] flex items-center justify-start bg-paper pt-32 pb-20 px-4 overflow-hidden border-b border-sand-deep/40">
      {/* ─── Ambient Glow Backgrounds ─── */}
      <div className="glow-shape glow-shape--strong -top-32 -left-24 w-[550px] h-[550px]" />
      <div className="glow-shape -bottom-20 right-10 w-[450px] h-[450px] opacity-70" />

      {/* ─── Hero Left-Aligned Container Grid ─── */}
      <div className="container-goldcoast relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-8 text-left space-y-8 max-w-3xl">
            {/* Tagline / Eyebrow */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase text-mangrove bg-sand-deep/80 border border-sand-deep"
              style={{
                animation: prefersReducedMotion ? 'none' : 'fadeIn 0.6s var(--ease-settle)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-clay animate-pulse" />
              {tagline}
            </div>

            {/* Hero Headline */}
            <h1
              className="font-serif font-bold text-ink leading-[1.08] tracking-tight text-left"
              style={{ fontSize: 'var(--text-hero)' }}
            >
              {words.map((word, idx) => (
                <span
                  key={idx}
                  style={{
                    display: 'inline-block',
                    marginRight: '0.22em',
                    opacity: wordStates[idx] ? 1 : 0,
                    transform: wordStates[idx] ? 'translateY(0)' : 'translateY(12px)',
                    transition: prefersReducedMotion ? 'none' : `all 0.55s var(--ease-settle)`,
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p
              className="text-mangrove/90 leading-relaxed max-w-2xl text-left"
              style={{
                fontSize: 'var(--text-body-lg)',
                animation: prefersReducedMotion ? 'none' : 'fadeIn 0.8s var(--ease-settle) 0.4s both',
              }}
            >
              {subtitle}
            </p>

            {/* CTAs Left-Aligned */}
            <div
              className="flex items-center gap-4 pt-2 flex-wrap text-left justify-start"
              style={{
                animation: prefersReducedMotion ? 'none' : 'fadeIn 0.8s var(--ease-settle) 0.6s both',
              }}
            >
              <Link
                href={ctaLink || '/donate'}
                className="button-primary px-8 py-4 rounded-xl shadow-lg hover:shadow-teal/20 text-base font-semibold"
              >
                {ctaLabel}
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 bg-transparent border-2 border-teal/80 text-teal hover:bg-teal hover:text-paper rounded-xl text-base font-semibold transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Decorative Badge & Visual Highlight */}
          <div className="lg:col-span-4 hidden lg:flex justify-end">
            <div className="p-8 rounded-3xl bg-sand/60 border border-sand-deep/80 shadow-lg space-y-6 max-w-sm backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal text-paper flex items-center justify-center font-serif font-bold text-lg">
                  G
                </div>
                <div>
                  <h4 className="font-serif font-bold text-ink text-base">Goldcoast Dickson</h4>
                  <p className="font-mono text-xs text-mangrove">Legacy of Service</p>
                </div>
              </div>
              <p className="text-xs text-mangrove leading-relaxed border-t border-sand-deep pt-4">
                "Carrying forward community empowerment, healthcare access, and education across Bayelsa and the Niger Delta region."
              </p>
              <div className="flex items-center justify-between text-xs font-mono text-clay-deep pt-2">
                <span>EST. 2012</span>
                <span>BAYELSA, NIGERIA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
