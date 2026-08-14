'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const PROGRAMMES = [
  {
    id: 'health',
    number: '01',
    title: 'Health',
    slug: 'health',
    description: 'Community health outreach, obstetric care, and disease prevention programmes serving vulnerable populations.',
    color: 'bg-teal',
    accent: 'text-clay',
  },
  {
    id: 'education',
    number: '02',
    title: 'Education',
    slug: 'education',
    description: 'Educational support, skills training, and literacy programmes empowering youth and communities.',
    color: 'bg-teal-ink',
    accent: 'text-sand',
  },
  {
    id: 'youth',
    number: '03',
    title: 'Youth Development',
    slug: 'youth-development',
    description: 'Mentorship, talent spotlighting, and career development initiatives for the next generation.',
    color: 'bg-mangrove',
    accent: 'text-paper',
  },
]

export default function ProgrammeCarousel() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
  }, [])

  useEffect(() => {
    if (!isAutoplay || prefersReducedMotion) return

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % PROGRAMMES.length)
    }, 5500)

    return () => clearInterval(interval)
  }, [isAutoplay, prefersReducedMotion])

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % PROGRAMMES.length)
    setIsAutoplay(false)
  }

  const handlePrev = () => {
    setIsAutoplay(false)
    setActiveIdx((prev) => (prev - 1 + PROGRAMMES.length) % PROGRAMMES.length)
  }

  return (
    <section className="relative w-full bg-paper">
      {/* Full-Bleed Carousel — all panels commit to dark treatment */}
      <div className="relative w-full aspect-video md:min-h-96">
        {PROGRAMMES.map((prog, idx) => (
          <div
            key={prog.id}
            className={`absolute inset-0 ${prog.color}`}
            style={{
              opacity: idx === activeIdx ? 1 : 0,
              transition: `opacity var(--duration-reveal) var(--ease-settle)`,
              animation:
                prefersReducedMotion || idx !== activeIdx
                  ? 'none'
                  : `fadeIn var(--duration-reveal) var(--ease-settle)`,
            }}
          >
            {/* Content Overlay */}
            <div className="h-full flex flex-col items-center justify-center px-4 md:px-8 text-center">
              <div className="max-w-2xl">
                {/* ─── Section anatomy: eyebrow → heading → copy → CTA ─── */}

                {/* Eyebrow */}
                <span className="eyebrow text-paper/60 bg-paper/10 mb-4 inline-block">
                  Our Programmes
                </span>

                {/* Number */}
                <div className="font-mono text-sm text-paper/50 mb-4 tabular-nums">
                  {prog.number}
                </div>

                {/* Title — uses --text-section */}
                <h2
                  className="font-serif font-bold text-paper mb-6"
                  style={{ fontSize: 'var(--text-section)' }}
                >
                  {prog.title}
                </h2>

                {/* Description */}
                <p
                  className="text-paper/90 leading-relaxed mb-8"
                  style={{ fontSize: 'var(--text-body-lg)' }}
                >
                  {prog.description}
                </p>

                {/* CTA */}
                <Link
                  href={`/programmes/${prog.slug}`}
                  className="inline-block px-8 py-3 bg-paper text-ink rounded font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
                  style={{
                    transition: `background-color var(--duration-hover) var(--ease-settle)`,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = 'var(--color-sand)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'var(--color-paper)')
                  }
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-paper px-4 md:px-8 py-6 flex items-center justify-between md:justify-center md:gap-12">
        {/* Counter */}
        <div className="font-mono text-sm text-ink tabular-nums">
          <span className="font-bold">{String(activeIdx + 1).padStart(2, '0')}</span>
          <span className="text-mangrove">/ {String(PROGRAMMES.length).padStart(2, '0')}</span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            aria-label="Previous programme"
            className="w-12 h-12 flex items-center justify-center border border-ink rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            style={{ transition: `background-color var(--duration-hover) var(--ease-settle)` }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-sand)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
          >
            ←
          </button>
          <button
            onClick={handleNext}
            aria-label="Next programme"
            className="w-12 h-12 flex items-center justify-center border border-ink rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            style={{ transition: `background-color var(--duration-hover) var(--ease-settle)` }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-sand)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
          >
            →
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex gap-2">
          {PROGRAMMES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveIdx(idx)
                setIsAutoplay(false)
              }}
              aria-label={`Go to programme ${idx + 1}`}
              className={`w-2 h-2 rounded-full ${
                idx === activeIdx ? 'bg-ink w-6' : 'bg-mangrove'
              }`}
              style={{ transition: `all var(--duration-hover) var(--ease-settle)` }}
            />
          ))}
        </div>

        {/* Autoplay Toggle */}
        <button
          onClick={() => setIsAutoplay(!isAutoplay)}
          aria-label={isAutoplay ? 'Pause autoplay' : 'Resume autoplay'}
          className="font-mono text-xs text-mangrove rounded px-2 py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          style={{ transition: `color var(--duration-hover) var(--ease-settle)` }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-ink)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '')}
        >
          {isAutoplay ? '⏸' : '▶'}
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .aspect-video {
            aspect-ratio: 3 / 4;
          }
        }
      `}</style>
    </section>
  )
}
