import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { api } from '@/convex/_generated/api'
import { ConvexHttpClient } from 'convex/browser'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || '')

function verifyPaystackSignature(request: Request, body: string): boolean {
  const signature = request.headers.get('x-paystack-signature')
  if (!signature) return false

  const secret = process.env.PAYSTACK_SECRET_KEY || ''
  const hash = crypto
    .createHmac('sha512', secret)
    .update(body)
    .digest('hex')

  return hash === signature
}

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const body = await request.text()

    // Verify Paystack signature
    if (!verifyPaystackSignature(request as any, body)) {
      console.warn('[Webhook] Invalid signature')
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    const data = JSON.parse(body)

    // Only process successful transfers
    if (data.event !== 'transfer.completed') {
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    const paystackReference = data.data.reference

    // Re-verify via Paystack API
    try {
      const verifyResponse = await fetch(
        `https://api.paystack.co/transaction/verify/${paystackReference}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        }
      )

      const verifyData = (await verifyResponse.json()) as {
        status: boolean
        data?: { status: string; amount: number; reference: string }
      }

      if (!verifyData.status || verifyData.data?.status !== 'success') {
        console.warn('[Webhook] Paystack verification failed')
        return NextResponse.json({ ok: true }, { status: 200 })
      }

      // Update donation status via Convex
      // Note: In production, you'd query Convex to find the matching donation first
      console.log('[Webhook] Payment verified:', paystackReference)

      // Respond immediately to prevent retries
      return NextResponse.json({ ok: true }, { status: 200 })
    } catch (verifyError) {
      console.error('[Webhook] Paystack API error:', verifyError)
      return NextResponse.json({ ok: true }, { status: 200 })
    }
  } catch (error) {
    console.error('[Webhook] Error:', error)
    return NextResponse.json({ ok: true }, { status: 200 })
  }
}
