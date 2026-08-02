import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIp } from '@/lib/rateLimit'
import { verifyTurnstile } from '@/lib/verifyTurnstile'
import { api } from '@/convex/_generated/api'
import { ConvexHttpClient } from 'convex/browser'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || '')

const schema = z.object({
  amount: z.number().positive('Amount must be positive'),
  currency: z.enum(['NGN', 'USD']),
  programmeId: z.string().optional(),
  method: z.enum(['card', 'bank', 'crypto']),
  donorName: z.string().min(2),
  donorEmail: z.string().email(),
  turnstileToken: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    // Check origin
    const origin = request.headers.get('origin')
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.NEXT_PUBLIC_APP_URL,
    ]
    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Rate limiting
    const ip = getClientIp(request)
    const rateLimitKey = `donation:intent:${ip}`
    const { success: isAllowed } = await rateLimit(rateLimitKey, 5, 600)
    if (!isAllowed) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    // Parse and validate
    const body = await request.json()
    const { data, error } = schema.safeParse(body)

    if (error) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    // Verify Turnstile
    const turnstileValid = await verifyTurnstile(data.turnstileToken)
    if (!turnstileValid) {
      return NextResponse.json(
        { error: 'Bot verification failed' },
        { status: 400 }
      )
    }

    // Create donation intent via Convex
    const result = await convex.mutation(api.donations.createDonationIntent, {
      amount: data.amount,
      currency: data.currency,
      programmeId: data.programmeId as any,
      method: data.method,
      donorName: data.donorName,
      donorEmail: data.donorEmail,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('[Donation Intent] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
