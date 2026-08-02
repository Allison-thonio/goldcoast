'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  value: string
  duration?: number
  className?: string
}

export function CountUp({ value, duration = 1600, className = '' }: CountUpProps) {
  const [displayValue, setDisplayValue] = useState<string>('')
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

  // Extract number and surrounding text
  const match = value.match(/(\d[\d,]*)/)
  const rawNumStr = match ? match[0].replace(/,/g, '') : null
  const targetNumber = rawNumStr ? parseInt(rawNumStr, 10) : 0
  const matchIndex = match ? value.indexOf(match[0]) : -1
  const prefix = matchIndex > 0 ? value.substring(0, matchIndex) : ''
  const suffix = match ? value.substring(matchIndex + match[0].length) : value

  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (mediaQuery.matches) {
        setDisplayValue(value)
        setHasAnimated(true)
        return
      }
    }

    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let startTimestamp: number | null = null

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp
            const progress = Math.min((timestamp - startTimestamp) / duration, 1)
            // Ease out cubic curve for natural decelerating count
            const easeProgress = 1 - Math.pow(1 - progress, 3)
            const currentCount = Math.floor(easeProgress * targetNumber)

            setDisplayValue(`${prefix}${currentCount.toLocaleString()}${suffix}`)

            if (progress < 1) {
              window.requestAnimationFrame(step)
            } else {
              setDisplayValue(value)
            }
          }

          window.requestAnimationFrame(step)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [value, targetNumber, prefix, suffix, duration, hasAnimated])

  return (
    <span ref={elementRef} className={className}>
      {hasAnimated ? displayValue : `${prefix}0${suffix}`}
    </span>
  )
}
export default CountUp
