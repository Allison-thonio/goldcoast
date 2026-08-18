'use client'

import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import { CircularCarousel, CarouselItem } from '@/components/ui/circular-carousel'

export default function VolunteerForm() {
  const [formStep, setFormStep] = useState<'areas' | 'form' | 'success'>('areas')
  const [selectedArea, setSelectedArea] = useState<string>('health')
  const [activeCarouselIdx, setActiveCarouselIdx] = useState<number>(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [availability, setAvailability] = useState('')
  const [experience, setExperience] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const volunteerAreas: CarouselItem[] = [
    {
      id: 'health',
      title: 'Healthcare Outreach',
      description: 'Join volunteer medical teams, nurse clinics, free drug dispensaries, and maternal screening drives across the Niger Delta.',
      tag: '01 • Health',
    },
    {
      id: 'education',
      title: 'Girl-Child Education',
      description: 'Support educational tutoring, distribution of school supplies, books, and literacy mentorship for vulnerable girls.',
      tag: '02 • Education',
    },
    {
      id: 'youth',
      title: 'Youth & Skills Mentorship',
      description: 'Mentor youth in vocational skills, fashion academies, digital technology, and creative enterprise development.',
      tag: '03 • Youth Dev',
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!turnstileToken) {
      setError('Please complete the verification')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/volunteers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          areaOfInterest: selectedArea,
          availability,
          experience,
          turnstileToken,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to submit application')
        return
      }

      setFormStep('success')
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (formStep === 'areas') {
    const activeItem = volunteerAreas[activeCarouselIdx] || volunteerAreas[0]

    return (
      <section className="py-16 px-4 bg-paper border-b border-sand-deep/40">
        <div className="container-goldcoast max-w-4xl mx-auto text-center">
          <span className="eyebrow text-teal-ink bg-sand/80 mb-3 inline-block">
            Volunteer Tracks
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-3">
            Choose Your Area of Service
          </h2>
          <p className="text-mangrove max-w-xl mx-auto mb-10 text-base md:text-lg">
            Select one of our three core impact initiatives to begin your volunteer journey.
          </p>

          <div className="bg-sand/30 border border-sand-deep/40 rounded-3xl p-6 md:p-10 shadow-sm mb-8">
            <CircularCarousel
              items={volunteerAreas}
              activeIndex={activeCarouselIdx}
              onActiveChange={(idx) => {
                setActiveCarouselIdx(idx)
                setSelectedArea(volunteerAreas[idx].id)
              }}
              onSelect={(item, idx) => {
                setActiveCarouselIdx(idx)
                setSelectedArea(item.id)
                setFormStep('form')
              }}
            />

            <div className="mt-8 pt-6 border-t border-sand-deep/40 flex flex-col items-center">
              <button
                onClick={() => {
                  setSelectedArea(activeItem.id)
                  setFormStep('form')
                }}
                className="button-primary px-8 py-3.5 text-base font-semibold shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
              >
                Apply for {activeItem.title} →
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const selectedTrack = volunteerAreas.find((a) => a.id === selectedArea) || volunteerAreas[0]

  if (formStep === 'form') {
    return (
      <section className="py-20 px-4 bg-sand">
        <div className="container-goldcoast max-w-2xl mx-auto">
          <button
            onClick={() => setFormStep('areas')}
            className="text-clay text-sm font-mono mb-6 hover:underline"
          >
            ← Back
          </button>
          <h2 className="prose-heading text-2xl md:text-3xl mb-2">Volunteer Application</h2>
          {selectedTrack && (
            <div className="inline-block bg-teal-ink text-sand px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-6">
              Track: {selectedTrack.title}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-sand-deep rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-sand-deep rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">Phone *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-sand-deep rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">Availability *</label>
              <textarea
                required
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                placeholder="e.g., Weekends, 2 days per week, part-time"
                className="w-full px-4 py-2 border border-sand-deep rounded h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">Relevant Experience *</label>
              <textarea
                required
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Tell us about your experience in this area"
                className="w-full px-4 py-2 border border-sand-deep rounded h-24"
              />
            </div>

            <div className="flex justify-center">
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                onSuccess={(token) => setTurnstileToken(token)}
              />
            </div>

            {error && <div className="p-4 bg-red-50 text-red-700 rounded text-sm">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 button-primary disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-sand">
      <div className="container-goldcoast max-w-2xl mx-auto text-center">
        <div className="bg-paper p-8 rounded border-2 border-teal">
          <h2 className="prose-heading text-2xl mb-4">Thank You!</h2>
          <p className="text-mangrove mb-6">
            Your volunteer application has been received. We'll review it and contact you shortly with next steps.
          </p>
          <button
            onClick={() => {
              setFormStep('areas')
              setName('')
              setEmail('')
              setPhone('')
              setAvailability('')
              setExperience('')
              setTurnstileToken('')
            }}
            className="button-primary inline-block"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    </section>
  )
}
