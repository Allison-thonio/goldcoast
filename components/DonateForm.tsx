'use client'

import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import Link from 'next/link'
import Image from 'next/image'
import { HandDrawnCircle } from '@/components/ui/HandDrawnCircle'

export default function DonateForm() {
  const [step, setStep] = useState<'amount' | 'details'>('amount')
  const [amount, setAmount] = useState<number>(10000)
  const [programme, setProgramme] = useState<string>('all')
  const [donorName, setDonorName] = useState<string>('')
  const [donorEmail, setDonorEmail] = useState<string>('')
  const [method, setMethod] = useState<'bank' | 'crypto'>('bank')
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [donationRef, setDonationRef] = useState<string>('')

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

      if (data.donationId) {
        setDonationRef(data.donationId)
      }
      setStep('details')
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper py-12 px-4">
      <div className="container-goldcoast max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* ─── Left: Form Column ─── */}
        <div className="lg:col-span-7">
        <h1 className="prose-heading text-4xl mb-4 text-center lg:text-left">Make a Donation</h1>
        <p className="text-center lg:text-left text-mangrove mb-12">
          Every contribution supports our health, education, and youth development programmes.
        </p>

        {/* Step 1: Amount & Details */}
        {step === 'amount' ? (
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
              {loading ? 'Processing...' : 'Continue to Payment Instructions'}
            </button>
          </div>
        ) : (
          /* Step 2: Confirmation & Instructions */
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-6 bg-teal-ink text-paper rounded-2xl border border-sand/20 text-center space-y-3 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-clay text-teal-ink flex items-center justify-center font-bold text-xl mx-auto">
                ✓
              </div>
              <h2 className="prose-heading text-2xl text-paper">Thank You, {donorName}!</h2>
              <p className="text-sand text-sm">
                Your donation pledge of <strong className="text-paper font-mono">₦{amount.toLocaleString()}</strong> has been recorded.
              </p>
              {donationRef && (
                <div className="text-xs font-mono bg-black/20 text-sand/80 py-1.5 px-3 rounded-md inline-block">
                  Reference: {donationRef}
                </div>
              )}
            </div>

            <div className="p-6 bg-sand rounded-2xl border border-sand-deep space-y-4">
              <h3 className="prose-heading text-lg">Bank Transfer Details</h3>
              <p className="text-sm text-mangrove">
                Please make a direct transfer of <strong>₦{amount.toLocaleString()}</strong> to our official foundation bank account:
              </p>
              <div className="font-mono text-sm bg-paper p-5 rounded-xl border border-sand-deep space-y-2 shadow-sm">
                <div className="flex justify-between items-center py-1 border-b border-sand/50">
                  <span className="text-mangrove">Bank Name</span>
                  <strong className="text-ink">United Bank for Africa (UBA)</strong>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-sand/50">
                  <span className="text-mangrove">Account Number</span>
                  <strong className="text-ink text-base tracking-wider">1017079610</strong>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-mangrove">Account Name</span>
                  <strong className="text-ink">Goldcoast Developmental Foundation</strong>
                </div>
              </div>
              <p className="text-xs text-mangrove">
                After transferring, please share your confirmation receipt via the{' '}
                <Link href="/contact" className="text-clay font-semibold hover:underline">
                  contact form
                </Link>{' '}
                so we can acknowledge your gift.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                href="/contact"
                className="flex-1 py-3 text-center button-primary text-sm"
              >
                Send Transfer Receipt
              </Link>
              <button
                onClick={() => {
                  setStep('amount')
                  setDonationRef('')
                }}
                className="flex-1 py-3 text-center border border-sand-deep bg-sand/60 hover:bg-sand rounded text-sm text-ink transition-colors"
              >
                Make Another Donation
              </button>
            </div>
          </div>
        )}

        {/* Bank Transfer Info Box (Static footer info on amount step) */}
        {step === 'amount' && (
          <div className="mt-12 p-6 bg-sand rounded border border-sand-deep">
            <h3 className="prose-heading text-lg mb-4">Direct Bank Transfer</h3>
            <p className="text-sm text-mangrove mb-4">
              You can also send directly to our official bank account anytime:
            </p>
            <div className="font-mono text-sm bg-paper p-4 rounded mb-4">
              <div>Bank: <strong>United Bank for Africa (UBA)</strong></div>
              <div>Account Number: <strong>1017079610</strong></div>
              <div>Account Name: <strong>Goldcoast Developmental Foundation</strong></div>
            </div>
            <p className="text-xs text-mangrove">
              Please send your receipt via the <Link href="/contact" className="text-clay hover:underline">contact form</Link> for verification and acknowledgment.
            </p>
          </div>
        )}
        </div>

        {/* ─── Right: Award Image Sidebar ─── */}
        <div className="hidden lg:block lg:col-span-5 sticky top-28">
          <div className="rounded-3xl overflow-hidden border border-sand-deep shadow-xl bg-sand">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/award.jpg"
                alt="Humanitarian Service Award presented to Gold Coast Foundation by South South Media Week, 2019"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 0vw, 40vw"
              />
            </div>
            <div className="p-5 text-center space-y-1">
              <p className="font-serif font-bold text-ink text-sm">Humanitarian Service Award</p>
              <p className="font-mono text-xs text-mangrove">South South Media Week · 2019</p>
            </div>
          </div>
        </div>

        </div>
      </div>
    </div>
  )
}
