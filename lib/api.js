// API client. Uses same-origin (/api/*) — Next.js routes everything from one deploy.

export async function streamChat(messages, onToken, signal) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
    signal,
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`chat ${res.status}: ${body.slice(0, 200) || 'no body'}`)
  }
  if (!res.body) throw new Error('chat: no stream body')

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let assembled = ''
  let buffer = ''
  let firstTokenSeen = false
  let serverError = null

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
      if (data === '[DONE]') {
        if (!firstTokenSeen && serverError) throw new Error(serverError)
        if (!firstTokenSeen) throw new Error('chat: empty stream')
        return assembled
      }
      try {
        const parsed = JSON.parse(data)
        if (parsed.error) {
          serverError = parsed.error
          continue
        }
        const token = parsed.token ?? parsed.delta ?? ''
        if (token) {
          firstTokenSeen = true
          assembled += token
          onToken(token)
        }
      } catch {
        /* skip */
      }
    }
  }
  if (!firstTokenSeen && serverError) throw new Error(serverError)
  return assembled
}

export async function sendContact(payload) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.error || `contact ${res.status}`)
  return data
}

export async function generateVoice(text) {
  const res = await fetch('/api/voice', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
  if (!res.ok) {
    const err = new Error(`voice ${res.status}`)
    err.status = res.status
    throw err
  }
  return res.blob()
}
