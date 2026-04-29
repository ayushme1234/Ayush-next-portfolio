'use client'
import { useEffect, useState } from 'react'

/**
 * Typewriter — types out the given text character by character.
 * Cursor blinks DURING typing, then disappears once typing is done.
 */
export default function Typewriter({
  text,
  speed = 110,
  startDelay = 200,
  cursorChar = '|',
  className = '',
  cursorClassName = '',
}) {
  const [output, setOutput] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [done, setDone] = useState(false)

  // Type out the text
  useEffect(() => {
    let cancelled = false
    let i = 0
    let typingTimer

    const startDelayTimer = setTimeout(() => {
      if (cancelled) return

      const tick = () => {
        if (cancelled) return
        if (i <= text.length) {
          setOutput(text.slice(0, i))
          i++
          typingTimer = setTimeout(tick, speed)
        } else {
          setDone(true)
        }
      }
      tick()
    }, startDelay)

    return () => {
      cancelled = true
      clearTimeout(startDelayTimer)
      clearTimeout(typingTimer)
    }
  }, [text, speed, startDelay])

  // Cursor blink — only while typing is in progress
  useEffect(() => {
    if (done) return
    const blink = setInterval(() => setShowCursor((s) => !s), 530)
    return () => clearInterval(blink)
  }, [done])

  return (
    <span className={className}>
      {output}
      {!done && (
        <span
          aria-hidden="true"
          className={`${cursorClassName} ${
            showCursor ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            display: 'inline-block',
            width: '0.06em',
            marginLeft: '0.04em',
            transition: 'opacity 0.05s ease',
          }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  )
}
