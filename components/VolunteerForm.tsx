'use client'

import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'

export default function VolunteerForm() {
  const [formStep, setFormStep] = useState<'areas' | 'form' | 'success'>('areas')
  const [selectedArea, setSelectedArea] = useState<string>('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [availability, setAvailability] = useState('')
  const [experience, setExperience] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const areas = [
    { id: 'health', title: 'Health Outreach', description: 'Community health programmes and outreach' },
    { id: 'education', title: 'Education/Literacy', description: 'Educational support and literacy programmes' },
    { id: 'youth', title: 'Youth Mentorship', description: 'Mentorship and career guidance' },
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
    return (
      <section className="py-20 px-4">
        <div className="container-goldcoast">
          <h2 className="prose-heading text-2xl mb-12 text-center">Areas of Interest</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
            {areas.map((area) => (
              <button
                key={area.id}
                onClick={() => {
                  setSelectedArea(area.id)
                  setFormStep('form')
                }}
                className="p-6 border-2 border-sand-deep rounded hover:border-clay hover:shadow-lg transition-all text-left group"
              >
                <h3 className="prose-heading text-lg mb-2 group-hover:text-clay transition-colors">
                  {area.title}
                </h3>
                <p className="text-sm text-mangrove">{area.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    )
  }

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
          <h2 className="prose-heading text-2xl mb-8">Volunteer Application</h2>

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
