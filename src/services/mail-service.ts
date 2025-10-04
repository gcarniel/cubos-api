import { env } from '@/env.js'
import { Resend } from 'resend'

interface SendEmailProps {
  to: string
  subject: string
  text?: string
  html?: string
}

export async function sendEmail({ to, subject, text, html }: SendEmailProps) {
  const resend = new Resend(env.RESEND_API_KEY)

  try {
    const payload = {
      from: env.MAIL_FROM,
      to,
      subject,
      text,
      html,
    }

    const payloadValid = JSON.parse(JSON.stringify(payload))

    const { error } = await resend.emails.send(payloadValid)

    if (error) console.error({ error })
  } catch (error) {
    console.error(error)
  }
}
