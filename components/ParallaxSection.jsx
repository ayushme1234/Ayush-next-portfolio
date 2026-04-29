'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * ParallaxSection - children translate vertically as you scroll past.
 * `speed`: positive = slower (rises slowly), negative = faster (drops quickly)
 * `clamp`: bound the parallax range in pixels
 */
export default function ParallaxSection({
  children,
  speed = 0.3,
  clamp = 100,
  className = '',
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [clamp * speed, -clamp * speed])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
