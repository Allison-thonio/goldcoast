'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface HeroProps {
  tagline?: string
  title: string
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

    let delay = 200
    words.forEach((_, idx) => {
      setTimeout(() => {
        setWordStates((prev) => {
          const next = [...prev]
          next[idx] = true
          return next
        })
      }, delay + idx * 80)
    })
  }, [title, prefersReducedMotion])

  const words = title.split(' ')

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-paper py-24 px-4 overflow-hidden">
      {/* Collage Background Images */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left */}
        <div
          className="absolute top-12 left-4 w-24 h-24 md:w-40 md:h-40 bg-gradient-to-br from-sand to-sand-deep rounded opacity-60"
          style={{
            animation: prefersReducedMotion ? 'none' : 'scaleIn 1s ease-out 0.1s both',
          }}
        >
          {/* Placeholder for image - NEEDS REAL DATA */}
        </div>

        {/* Top Right */}
        <div
          className="absolute top-24 right-6 w-28 h-28 md:w-48 md:h-48 bg-gradient-to-br from-teal/20 to-teal/10 rounded opacity-70"
          style={{
            animation: prefersReducedMotion ? 'none' : 'scaleIn 1s ease-out 0.3s both',
          }}
        >
          {/* Placeholder for image - NEEDS REAL DATA */}
        </div>

        {/* Bottom Left */}
        <div
          className="absolute bottom-12 left-2 w-20 h-20 md:w-36 md:h-36 bg-gradient-to-br from-clay/30 to-clay/20 rounded opacity-50"
          style={{
            animation: prefersReducedMotion ? 'none' : 'scaleIn 1s ease-out 0.5s both',
          }}
        >
          {/* Placeholder for image - NEEDS REAL DATA */}
        </div>

        {/* Bottom Right */}
        <div
          className="absolute bottom-6 right-4 w-32 h-32 md:w-52 md:h-52 bg-gradient-to-br from-mangrove/20 to-mangrove/10 rounded opacity-60"
          style={{
            animation: prefersReducedMotion ? 'none' : 'scaleIn 1s ease-out 0.4s both',
          }}
        >
          {/* Placeholder for image - NEEDS REAL DATA */}
        </div>
      </div>

      {/* Content */}
      <div className="container-goldcoast text-center max-w-3xl mx-auto relative z-10">
        {/* Tagline */}
        <p
          className="font-mono text-sm text-mangrove mb-8 leading-relaxed"
          style={{
            animation: prefersReducedMotion ? 'none' : 'fadeIn 0.8s ease-out',
          }}
        >
          {tagline}
        </p>

        {/* Title - Word by Word Reveal */}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-ink mb-8 leading-tight">
          {words.map((word, idx) => (
            <span
              key={idx}
              style={{
                display: 'inline-block',
                marginRight: '0.25em',
                opacity: wordStates[idx] ? 1 : 0,
                transform: wordStates[idx] ? 'translateY(0)' : 'translateY(10px)',
                transition: prefersReducedMotion
                  ? 'none'
                  : 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg text-mangrove mb-12 leading-relaxed"
          style={{
            animation: prefersReducedMotion ? 'none' : 'fadeIn 0.8s ease-out 0.6s both',
          }}
        >
          {subtitle}
        </p>

        {/* CTAs */}
        <div
          className="flex gap-4 justify-center flex-wrap"
          style={{
            animation: prefersReducedMotion ? 'none' : 'fadeIn 0.8s ease-out 0.8s both',
          }}
        >
          <Link
            href={ctaLink || '/donate'}
            className="px-8 py-4 bg-teal text-paper rounded font-medium hover:bg-teal-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            {ctaLabel}
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 bg-transparent border-2 border-teal text-teal rounded font-medium hover:bg-teal hover:text-paper transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            Learn More
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  )
}
