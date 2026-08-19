import { Resend } from 'resend'

let resend: Resend | null = null

interface SendEmailParams {
  to: string
  subject: string
  html: string
  replyTo?: string
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[Email] RESEND_API_KEY is not set. Skipping email sending.')
    return { success: false, error: 'API key not configured' }
  }

  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }

  try {
    const fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev'
    const { data, error } = await resend.emails.send({
      from: `Goldcoast Foundation <${fromEmail}>`,
      to,
      subject,
      html,
      replyTo: replyTo,
    })

    if (error) {
      console.error('[Email] Resend error:', error)
      return { success: false, error }
    }

    console.log('[Email] Sent successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('[Email] Failed to send:', error)
    return { success: false, error }
  }
}
