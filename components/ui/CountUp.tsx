'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  value: string
  duration?: number
  className?: string
  showLoading?: boolean
}

export function CountUp({
  value,
  duration = 1200,
  className = '',
  showLoading = true,
}: CountUpProps) {
  const [displayState, setDisplayState] = useState<'loading' | 'animating' | 'done'>('loading')
  const [displayValue, setDisplayValue] = useState<string>('')
  const elementRef = useRef<HTMLSpanElement>(null)

  // Extract number, prefix, and static suffix (+, K, etc.)
  const match = value.match(/(\d[\d,]*)/)
  const rawNumStr = match ? match[0].replace(/,/g, '') : null
  const targetNumber = rawNumStr ? parseInt(rawNumStr, 10) : 0
  const matchIndex = match ? value.indexOf(match[0]) : -1
  const prefix = matchIndex > 0 ? value.substring(0, matchIndex) : ''
  const suffix = match ? value.substring(matchIndex + match[0].length) : value

  useEffect(() => {
    // Check reduced motion preference for instant fallback
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (mediaQuery.matches) {
        setDisplayState('done')
        setDisplayValue(value)
        return
      }
    }

    const element = elementRef.current
    if (!element) return

    let hasTriggered = false

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggered) {
          hasTriggered = true
          setDisplayState('animating')
          let startTimestamp: number | null = null

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp
            const progress = Math.min((timestamp - startTimestamp) / duration, 1)

            // easeOutExpo: fast start, slow settle
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
            const currentCount = Math.floor(easeProgress * targetNumber)

            setDisplayValue(`${prefix}${currentCount.toLocaleString()}${suffix}`)

            if (progress < 1) {
              window.requestAnimationFrame(step)
            } else {
              setDisplayValue(value)
              setDisplayState('done')
            }
          }

          window.requestAnimationFrame(step)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [value, targetNumber, prefix, suffix, duration])

  return (
    <span ref={elementRef} className={className}>
      {displayState === 'loading' && showLoading ? (
        <span className="font-mono text-sm text-sand/60 tracking-wider animate-pulse">
          Loading...
        </span>
      ) : (
        displayValue || `${prefix}0${suffix}`
      )}
    </span>
  )
}

export default CountUp

