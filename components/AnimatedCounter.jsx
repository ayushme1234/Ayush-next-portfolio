'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

/**
 * Counts up from 0 to `value` when scrolled into view.
 * Supports prefix ("$") and suffix ("+", "%", " sec").
 */
export default function AnimatedCounter({
  value,
  duration = 1.6,
  suffix = '',
  prefix = '',
  className = '',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const mv = useMotionValue(0)
  const rounded = useTransform(mv, (n) => `${prefix}${Math.round(n)}${suffix}`)
  const [display, setDisplay] = useState(`${prefix}0${suffix}`)

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v))
    return () => unsub()
  }, [rounded])

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
      })
      return controls.stop
    }
  }, [inView, mv, value, duration])

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  )
}
