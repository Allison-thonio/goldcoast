'use client'

import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!turnstileToken) {
      setError('Please complete verification')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          turnstileToken,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Failed to send message')
        return
      }

      setSuccess(true)
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
      setTurnstileToken('')
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-12">
        <h3 className="prose-heading text-lg mb-2">Thank You!</h3>
        <p className="text-sm text-mangrove mb-6">
          Your message has been received. We'll get back to you soon.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="button-primary"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-ink mb-1">Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-sand-deep rounded text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-sand-deep rounded text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1">Subject</label>
        <input
          type="text"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-3 py-2 border border-sand-deep rounded text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1">Message</label>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 border border-sand-deep rounded text-sm h-32"
        />
      </div>

      <div className="flex justify-center py-2">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
          onSuccess={(token) => setTurnstileToken(token)}
        />
      </div>

      {error && <div className="p-3 bg-red-50 text-red-700 rounded text-sm">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 button-primary disabled:opacity-50 text-sm"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
