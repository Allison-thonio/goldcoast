import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIp } from '@/lib/rateLimit'
import { verifyTurnstile } from '@/lib/verifyTurnstile'
import { api } from '@/convex/_generated/api'
import { ConvexHttpClient } from 'convex/browser'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || 'https://placeholder.convex.cloud')

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  areaOfInterest: z.enum(['health', 'education', 'youth']),
  availability: z.string().min(5),
  experience: z.string().min(10),
  turnstileToken: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin')
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.NEXT_PUBLIC_APP_URL,
    ]
    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const ip = getClientIp(request)
    const rateLimitKey = `volunteer:apply:${ip}`
    const { success: isAllowed } = await rateLimit(rateLimitKey, 3, 600)
    if (!isAllowed) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const body = await request.json()
    const { data, error } = schema.safeParse(body)

    if (error) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }

    const turnstileValid = await verifyTurnstile(data.turnstileToken)
    if (!turnstileValid) {
      return NextResponse.json(
        { error: 'Bot verification failed' },
        { status: 400 }
      )
    }

    const result = await convex.mutation(
      api.volunteers.submitVolunteerApplication,
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        areaOfInterest: data.areaOfInterest,
        availability: data.availability,
        experience: data.experience,
      }
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error('[Volunteer Apply] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
