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
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
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
