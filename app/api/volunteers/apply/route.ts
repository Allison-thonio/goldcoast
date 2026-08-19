import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIp } from '@/lib/rateLimit'
import { verifyTurnstile } from '@/lib/verifyTurnstile'
import { api } from '@/convex/_generated/api'
import { ConvexHttpClient } from 'convex/browser'
import { sendEmail } from '@/lib/email'

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

    // Send email alert asynchronously without blocking the user response
    try {
      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #0f766e; margin-bottom: 20px; font-family: Georgia, serif;">New Volunteer Application</h2>
          <p style="margin-bottom: 20px; color: #374151;">A new volunteer has applied through the website. Here are the details:</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6; color: #111827; width: 180px;">Full Name:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #374151;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6; color: #111827;">Email Address:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #374151;">
                <a href="mailto:${data.email}" style="color: #0f766e; text-decoration: none;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6; color: #111827;">Phone Number:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #374151;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6; color: #111827;">Area of Interest:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #374151; text-transform: capitalize;">${data.areaOfInterest}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6; color: #111827;">Availability:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #374151;">${data.availability}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #111827; vertical-align: top; padding-top: 8px;">Experience & Motivation:</td>
              <td style="padding: 8px 0; color: #374151; white-space: pre-wrap; line-height: 1.5;">${data.experience}</td>
            </tr>
          </table>
          <p style="font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 15px; margin-top: 30px;">
            This email was automatically sent from the Goldcoast Developmental Foundation website. You can reply directly to this email to contact the applicant.
          </p>
        </div>
      `

      // Fire and forget or await (awaiting ensures error logging if it fails)
      await sendEmail({
        to: 'info@goldcoast.ng',
        subject: `[Volunteer Application] ${data.name} - ${data.areaOfInterest.toUpperCase()}`,
        html: emailHtml,
        replyTo: data.email,
      })
    } catch (emailErr) {
      console.error('[Volunteer Apply] Failed to send email alert:', emailErr)
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('[Volunteer Apply] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
