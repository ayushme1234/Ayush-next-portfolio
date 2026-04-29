export const runtime = 'edge'

const escape = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

export async function POST(req) {
  let body
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const name = String(body?.name || '').trim().slice(0, 80)
  const email = String(body?.email || '').trim().slice(0, 120)
  const message = String(body?.message || '').trim().slice(0, 4000)

  if (
    name.length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    message.length < 10
  ) {
    return Response.json(
      { error: 'Need name, valid email, and message ≥10 chars' },
      { status: 400 }
    )
  }

  const apiKey = process.env.RESEND_API_KEY?.trim()
  const to = process.env.CONTACT_TO_EMAIL?.trim() || 'ayushme1234@gmail.com'
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || 'onboarding@resend.dev'

  if (!apiKey) {
    console.log('[contact] No RESEND_API_KEY — logging:', { name, email, message })
    return Response.json({ success: true, mocked: true })
  }

  const html = `
    <div style="font-family:-apple-system,system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
      <h2 style="color:#0a2650;margin:0 0 16px;font-size:20px;">New portfolio message</h2>
      <p style="color:#555;margin:0 0 8px;"><strong>From:</strong> ${escape(name)} &lt;${escape(email)}&gt;</p>
      <div style="background:#f4f4f5;border-radius:12px;padding:16px;color:#18181b;white-space:pre-wrap;font-size:15px;line-height:1.5;">${escape(message)}</div>
      <p style="color:#999;font-size:12px;margin-top:24px;">From your portfolio site</p>
    </div>
  `

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Portfolio <${from}>`,
        to: [to],
        reply_to: email,
        subject: `New message from ${name}`,
        html,
      }),
    })
    const data = await r.json().catch(() => ({}))
    if (!r.ok) {
      return Response.json(
        { error: data?.message || `Resend ${r.status}` },
        { status: 502 }
      )
    }
    return Response.json({ success: true, id: data?.id })
  } catch (err) {
    return Response.json({ error: err?.message || 'Send failed' }, { status: 500 })
  }
}
