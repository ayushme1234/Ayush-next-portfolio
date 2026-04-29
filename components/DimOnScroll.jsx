'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * DimOnScroll — wraps a section. The section's opacity dips as it
 * enters the viewport from below and as it exits at the top, brightens
 * when fully in view. Component-wise scroll dimming.
 */
export default function DimOnScroll({ children, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // dim → bright → dim across the scroll range
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.35, 1, 1, 0.35]
  )
  const scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.97, 1, 1, 0.97]
  )

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className={`will-change-[opacity,transform] ${className}`}
    >
      {children}
    </motion.div>
  )
}
