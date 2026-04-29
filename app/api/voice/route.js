export const runtime = 'edge'

export async function POST(req) {
  const apiKey = process.env.ELEVENLABS_API_KEY?.trim()
  if (!apiKey) {
    return Response.json(
      {
        error:
          'ELEVENLABS_API_KEY not set — frontend will use Web Speech fallback.',
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

  const text = String(body?.text || '').trim().slice(0, 2000)
  if (text.length < 1) {
    return Response.json({ error: 'No text' }, { status: 400 })
  }

  const voiceId =
    process.env.ELEVENLABS_VOICE_ID?.trim() || '21m00Tcm4TlvDq8ikWAM'

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_turbo_v2_5',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.3,
          use_speaker_boost: true,
        },
      }),
    }
  )

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    return Response.json(
      { error: `ElevenLabs ${res.status}: ${detail.slice(0, 200)}` },
      { status: res.status }
    )
  }

  return new Response(res.body, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
