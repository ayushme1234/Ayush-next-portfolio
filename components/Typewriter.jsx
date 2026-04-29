'use client'
import { useEffect, useState } from 'react'

/**
 * Typewriter — types out the given text character by character,
 * then keeps the cursor blinking. Loops if `loop` prop is true.
 */
export default function Typewriter({
  text,
  speed = 110,
  startDelay = 200,
  cursorChar = '|',
  loop = false,
  pauseBeforeRestart = 1800,
  className = '',
  cursorClassName = '',
}) {
  const [output, setOutput] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false
    let i = 0
    let typingTimer
    let restartTimer

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
          if (loop) {
            restartTimer = setTimeout(() => {
              i = 0
              setDone(false)
              setOutput('')
              tick()
            }, pauseBeforeRestart)
          }
        }
      }
      tick()
    }, startDelay)

    return () => {
      cancelled = true
      clearTimeout(startDelayTimer)
      clearTimeout(typingTimer)
      clearTimeout(restartTimer)
    }
  }, [text, speed, startDelay, loop, pauseBeforeRestart])

  // Cursor blink
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((s) => !s), 530)
    return () => clearInterval(blink)
  }, [])

  return (
    <span className={className}>
      {output}
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
    </span>
  )
}
