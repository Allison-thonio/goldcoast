'use client'

import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import Link from 'next/link'
import { HandDrawnCircle } from '@/components/ui/HandDrawnCircle'

export default function DonateForm() {
  const [step, setStep] = useState<'amount' | 'details' | 'method'>('amount')
  const [amount, setAmount] = useState<number>(10000)
  const [programme, setProgramme] = useState<string>('all')
  const [donorName, setDonorName] = useState<string>('')
  const [donorEmail, setDonorEmail] = useState<string>('')
  const [method, setMethod] = useState<'card' | 'bank' | 'crypto'>('card')
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const presets = [5000, 10000, 25000, 50000, 100000]

  const handleDonate = async () => {
    if (!turnstileToken) {
      setError('Please complete the verification')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/donations/intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'NGN',
          programmeId: programme === 'all' ? undefined : programme,
          method,
          donorName,
          donorEmail,
          turnstileToken,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to process donation')
        return
      }

      if (method === 'card') {
        // Initialize Paystack
        const script = document.createElement('script')
        script.src = 'https://js.paystack.co/v1/inline.js'
        script.async = true
        document.body.appendChild(script)

        script.onload = () => {
          const handler = (window as any).PaystackPop.setup({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
            email: donorEmail,
            amount: amount * 100,
            ref: data.donationId,
            onClose: () => setError('Payment window closed'),
            onSuccess: () => {
              setStep('details')
              // In production, verify payment via API
            },
          })
          handler.openIframe()
        }
      } else {
        setStep('details')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper py-12 px-4">
      <div className="container-goldcoast max-w-2xl mx-auto">
        <h1 className="prose-heading text-4xl mb-4 text-center">Make a Donation</h1>
        <p className="text-center text-mangrove mb-12">
          Every contribution supports our health, education, and youth development programmes.
        </p>

        {/* Step 1: Amount */}
        {step === 'amount' && (
          <div className="space-y-8">
            {/* Programme */}
            <div>
              <label className="block text-sm font-medium text-ink mb-4">Select Programme</label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 'all', label: 'All Programmes' },
                  { value: 'health', label: 'Health' },
                  { value: 'education', label: 'Education' },
                  { value: 'youth', label: 'Youth Development' },
                ].map((opt) => {
                  const isSelected = programme === opt.value
                  return (
                    <label key={opt.value} className="relative flex items-center gap-3 cursor-pointer p-3 border rounded border-sand-deep bg-sand/30 hover:bg-sand transition-all">
                      <HandDrawnCircle isSelected={isSelected} />
                      <input
                        type="radio"
                        name="programme"
                        value={opt.value}
                        checked={isSelected}
                        onChange={(e) => setProgramme(e.target.value)}
                        className="rounded accent-clay"
                      />
                      <span className={`text-sm font-medium ${isSelected ? 'text-clay font-semibold' : 'text-ink'}`}>{opt.label}</span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Amount Presets */}
            <div>
              <label className="block text-sm font-medium text-ink mb-4">Amount (₦)</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                {presets.map((preset) => {
                  const isSelected = amount === preset
                  return (
                    <div key={preset} className="relative">
                      <HandDrawnCircle isSelected={isSelected} />
                      <button
                        type="button"
                        onClick={() => setAmount(preset)}
                        className={`w-full py-3 px-3 rounded font-mono text-sm transition-all ${
                          isSelected
                            ? 'bg-clay text-paper border-2 border-clay font-bold'
                            : 'bg-sand border-2 border-sand-deep text-ink hover:border-clay'
                        }`}
                      >
                        ₦{preset.toLocaleString()}
                      </button>
                    </div>
                  )
                })}
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-4 py-2 border border-sand-deep rounded text-sm"
                placeholder="Custom amount"
              />
            </div>

            {/* Donor Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Full Name</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-4 py-2 border border-sand-deep rounded text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Email</label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-sand-deep rounded text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-ink mb-4">Payment Method</label>
              <div className="space-y-3">
                {[
                  { value: 'card', label: 'Card (Visa, Mastercard)' },
                  { value: 'bank', label: 'Bank Transfer' },
                  { value: 'crypto', label: 'Cryptocurrency' },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-3 cursor-pointer p-4 border border-sand-deep rounded hover:bg-sand transition-colors">
                    <input
                      type="radio"
                      name="method"
                      value={opt.value}
                      checked={method === opt.value as any}
                      onChange={(e) => setMethod(e.target.value as any)}
                      className="rounded"
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Turnstile */}
            <div className="flex justify-center">
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                onSuccess={(token) => setTurnstileToken(token)}
              />
            </div>

            {error && <div className="p-4 bg-red-50 text-red-700 rounded text-sm">{error}</div>}

            <button
              onClick={handleDonate}
              disabled={!donorName || !donorEmail || !turnstileToken || loading}
              className="w-full py-3 button-primary disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Continue'}
            </button>
          </div>
        )}

        {/* Bank Transfer Info */}
        <div className="mt-12 p-6 bg-sand rounded border border-sand-deep">
          <h3 className="prose-heading text-lg mb-4">Bank Transfer</h3>
          <p className="text-sm text-mangrove mb-4">
            Send directly to:
          </p>
          <div className="font-mono text-sm bg-paper p-4 rounded mb-4">
            <div>UBA Account: <strong>1017079610</strong></div>
            <div>Name: <strong>Goldcoast Developmental Foundation</strong></div>
          </div>
          <p className="text-xs text-mangrove">
            Please send your receipt via the <Link href="/contact" className="text-clay hover:underline">contact form</Link> for verification and acknowledgment.
          </p>
        </div>
      </div>
    </div>
  )
}
