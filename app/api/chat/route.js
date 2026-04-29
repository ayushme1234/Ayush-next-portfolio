// Next.js App Router edge route — streaming chat.
// Auto-detects: GROQ_API_KEY (free, no card) > ANTHROPIC_API_KEY > GEMINI_API_KEY

export const runtime = 'edge'

const SYSTEM_PROMPT = `You are an AI version of Ayush — warm, witty, slightly playful but professional. Answer in first person as Ayush.

# Who you are
- Name: Ayush. Location: Kolkata, India.
- B.Tech ECE 2026 from Netaji Subhash Engineering College (CGPA 7.6/10).
- Currently: Salesforce Domain Intern at Cognizant Technology Solutions (since Jan 2026).
- Past: Embedded/IoT Intern at IC Centre, Jadavpur University (Jun-Jul 2025).
- Email: ayushme1234@gmail.com · Phone: +91 7070015321
- LinkedIn: linkedin.com/in/ayush-8b9623223 · GitHub: github.com/ayushme1234

# Tech you actually use
- AI/LLM: Agentic RAG, LangChain, Llama via Ollama, ChromaDB, prompt engineering
- Frontend: React, Next.js, Three.js, Tailwind, Framer Motion
- Backend: FastAPI, Python, Node.js
- Salesforce: LWC, Apex (Classes/Triggers/SOQL), Flows, SFDX
- Languages: Java, Python, JavaScript, SQL, C, C++

# Real shipped projects
1. AI-Powered Salesforce Assistant (Agentic RAG): React + FastAPI + LangChain + Llama/Ollama. salesforce-ai-assistance.vercel.app
2. QuickRide OS: quickride-psi.vercel.app
3. LWC Geek: lwcgeek.vercel.app
4. Salesforce Admin Mastery: admin-geek.vercel.app
5. Myntra × Salesforce: myntraxsalesforce.vercel.app
6. EventHive (Salesforce LWC + Apex Triggers + Flows)
7. Velocyte: velocyte.vercel.app
8. ES6 Geek: es6geek.vercel.app
9. JS Geek: js-geek.vercel.app

# Voice
- First person, warm, witty. Replies under 150 words. Markdown OK.
- Available for full-time roles starting 2026.
- Pricing → redirect to email/contact.
- Never break character.`

const trim = (v) => (v ? String(v).trim() : '')

function pickProvider() {
  if (trim(process.env.GROQ_API_KEY)) return 'groq'
  if (trim(process.env.ANTHROPIC_API_KEY)) return 'anthropic'
  if (trim(process.env.GEMINI_API_KEY)) return 'gemini'
  return null
}

async function* streamGroq(messages) {
  const model = trim(process.env.GROQ_MODEL) || 'llama-3.3-70b-versatile'
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${trim(process.env.GROQ_API_KEY)}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 600,
      temperature: 0.7,
      stream: true,
    }),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Groq ${res.status} (model: ${model}): ${detail.slice(0, 250)}`)
  }
  yield* readOpenAI(res)
}

async function* streamAnthropic(messages) {
  const model = trim(process.env.ANTHROPIC_MODEL) || 'claude-sonnet-4-5-20250929'
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': trim(process.env.ANTHROPIC_API_KEY),
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages,
      stream: true,
    }),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Anthropic ${res.status}: ${detail.slice(0, 250)}`)
  }
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  while (true) {
    const { value, done } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const events = buffer.split('\n\n')
    buffer = events.pop() || ''
    for (const evt of events) {
      const line = evt.split('\n').find((l) => l.startsWith('data:'))
      if (!line) continue
      const data = line.slice(5).trim()
      if (!data) continue
      try {
        const parsed = JSON.parse(data)
        if (
          parsed.type === 'content_block_delta' &&
          parsed.delta?.type === 'text_delta' &&
          parsed.delta.text
        ) {
          yield parsed.delta.text
        }
      } catch {
        /* skip */
      }
    }
  }
}

async function* streamGemini(messages) {
  const model = trim(process.env.GEMINI_MODEL) || 'gemini-2.5-flash'
  const res = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${trim(process.env.GEMINI_API_KEY)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 600,
        temperature: 0.7,
        stream: true,
      }),
    }
  )
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Gemini ${res.status}: ${detail.slice(0, 250)}`)
  }
  yield* readOpenAI(res)
}

async function* readOpenAI(res) {
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  while (true) {
    const { value, done } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const events = buffer.split('\n\n')
    buffer = events.pop() || ''
    for (const evt of events) {
      const line = evt.split('\n').find((l) => l.startsWith('data:'))
      if (!line) continue
      const data = line.slice(5).trim()
      if (!data || data === '[DONE]') continue
      try {
        const parsed = JSON.parse(data)
        const token = parsed?.choices?.[0]?.delta?.content
        if (token) yield token
      } catch {
        /* skip */
      }
    }
  }
}

// Health check — visit /api/chat in your browser
export async function GET() {
  const provider = pickProvider()
  return Response.json({
    ok: true,
    provider,
    configured: !!provider,
    message: provider
      ? `Chat API live. Provider: ${provider}.`
      : 'No LLM provider configured. Set GROQ_API_KEY (free, no card) in Vercel env vars.',
  })
}

export async function POST(req) {
  const provider = pickProvider()
  if (!provider) {
    return Response.json(
      {
        error:
          'No LLM provider configured. Set GROQ_API_KEY, ANTHROPIC_API_KEY, or GEMINI_API_KEY.',
      },
      { status: 503 }
    )
  }

  let body
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const messages = (body?.messages || [])
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant'))
    .map((m) => ({ role: m.role, content: String(m.content || '').trim() }))
    .filter((m) => m.content.length > 0)
    .slice(-30)

  if (messages.length === 0) {
    return Response.json({ error: 'No messages provided' }, { status: 400 })
  }

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      try {
        const gen =
          provider === 'groq'
            ? streamGroq(messages)
            : provider === 'anthropic'
              ? streamAnthropic(messages)
              : streamGemini(messages)
        let sent = 0
        for await (const token of gen) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ token })}\n\n`)
          )
          sent++
        }
        if (sent === 0) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: `${provider} returned no tokens` })}\n\n`
            )
          )
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      } catch (err) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ error: err?.message || 'Stream error' })}\n\n`
          )
        )
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      } finally {
        controller.close()
      }
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
      'X-Provider': provider,
    },
  })
}
