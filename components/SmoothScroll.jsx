'use client'
import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    let lenis
    let raf
    let cleanup = () => {}

    ;(async () => {
      const Lenis = (await import('lenis')).default

      lenis = new Lenis({
        // lerp gives a more responsive feel than duration — closer to native
        lerp: 0.12,
        smoothWheel: true,
        // Disable on touch — iOS already has buttery native scroll
        smoothTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      })

      const tick = (time) => {
        lenis.raf(time)
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)

      cleanup = () => {
        cancelAnimationFrame(raf)
        lenis?.destroy()
      }
    })()

    return () => cleanup()
  }, [])

  return null
}
