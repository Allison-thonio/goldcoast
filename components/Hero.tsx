'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
  }, [])

  const words = title.split(' ')

  return (
    <section className="relative min-h-[85vh] flex items-center justify-start bg-ink pt-32 pb-20 px-4 overflow-hidden border-b border-sand-deep/40">
      {/* ─── Hero Background Image ─── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Mrs. Goldcoast Dickson Remembrance"
          fill
          priority
          className="object-cover object-right md:object-center"
          quality={100}
        />
        {/* Soft dark gradient overlay for text legibility while keeping image crisp */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/40" />
      </div>

      {/* ─── Ambient Glow Backgrounds ─── */}
      <div className="glow-shape glow-shape--strong -top-32 -left-24 w-[550px] h-[550px] opacity-40 mix-blend-screen" />
      <div className="glow-shape -bottom-20 right-10 w-[450px] h-[450px] opacity-30 mix-blend-screen" />

      {/* ─── Hero Left-Aligned Container Grid ─── */}
      <div className="container-goldcoast relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-8 text-left space-y-8 max-w-3xl">
            {/* Tagline / Eyebrow */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase text-paper bg-white/10 border border-white/20 backdrop-blur-md shadow-lg"
              style={{
                animation: prefersReducedMotion ? 'none' : 'fadeIn 0.6s var(--ease-settle)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-sand animate-pulse" />
              {tagline}
            </div>

            {/* Hero Headline */}
            <h1
              className="font-serif font-bold text-paper leading-[1.08] tracking-tight text-left drop-shadow-md"
              style={{ fontSize: 'var(--text-hero)' }}
            >
              {words.map((word, idx) => (
                <span
                  key={idx}
                  style={{
                    display: 'inline-block',
                    marginRight: '0.22em',
                    animation: prefersReducedMotion ? 'none' : 'fadeIn 0.55s var(--ease-settle) both',
                    animationDelay: prefersReducedMotion ? '0ms' : `${150 + idx * 50}ms`,
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p
              className="text-paper/90 leading-relaxed max-w-2xl text-left drop-shadow-sm font-light"
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
                className="button-primary px-8 py-4 rounded-xl shadow-2xl hover:shadow-teal/40 text-base font-semibold"
              >
                {ctaLabel}
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 bg-paper/10 backdrop-blur-md border border-paper/30 text-paper hover:bg-paper hover:text-ink rounded-xl text-base font-semibold transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Decorative Badge & Visual Highlight */}
          <div className="lg:col-span-4 hidden lg:flex justify-end">
            <div className="p-8 rounded-3xl bg-ink/40 border border-white/20 shadow-2xl space-y-6 max-w-sm backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sand text-ink flex items-center justify-center font-serif font-bold text-lg">
                  G
                </div>
                <div>
                  <h4 className="font-serif font-bold text-paper text-base">Goldcoast Dickson</h4>
                  <p className="font-mono text-xs text-paper/70">Legacy of Service</p>
                </div>
              </div>
              <p className="text-xs text-paper/80 leading-relaxed border-t border-white/20 pt-4">
                "Carrying forward community empowerment, healthcare access, and education across Bayelsa and the Niger Delta region."
              </p>
              <div className="flex items-center justify-between text-xs font-mono text-sand/90 pt-2">
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
