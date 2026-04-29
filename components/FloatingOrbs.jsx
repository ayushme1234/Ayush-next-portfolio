'use client'
import { motion } from 'framer-motion'

/**
 * Decorative floating orbs - glowing animated circles for empty space.
 * Each orb has its own delay/duration for organic motion.
 */
export default function FloatingOrbs({ orbs }) {
  const defaults = orbs || [
    { color: '#a78bfa', size: 14, x: '12%', y: '22%', duration: 7, delay: 0 },
    { color: '#ec4899', size: 10, x: '88%', y: '18%', duration: 9, delay: 1.2 },
    { color: '#22d3ee', size: 16, x: '8%', y: '78%', duration: 8, delay: 0.6 },
    { color: '#fb923c', size: 8, x: '92%', y: '72%', duration: 10, delay: 2 },
  ]

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {defaults.map((o, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: o.x,
            top: o.y,
            width: o.size,
            height: o.size,
            background: o.color,
            boxShadow: `0 0 ${o.size * 3}px ${o.color}, 0 0 ${o.size * 6}px ${o.color}40`,
          }}
          animate={{
            y: [0, -25, 0, 15, 0],
            x: [0, 10, -8, 5, 0],
            scale: [1, 1.15, 0.95, 1.1, 1],
            opacity: [0.7, 1, 0.6, 0.9, 0.7],
          }}
          transition={{
            duration: o.duration,
            delay: o.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
