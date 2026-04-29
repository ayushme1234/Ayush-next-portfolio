'use client'
import { motion } from 'framer-motion'

/**
 * Section divider — animated gradient line that pulses subtly.
 * Optional `label` for editorial dividers like Apple/Nike pages.
 */
export default function GlowDivider({ label }) {
  return (
    <div className="relative flex items-center justify-center px-6 py-16 md:py-20">
      <div className="container-x flex w-full items-center gap-6">
        <div className="relative h-px flex-1 overflow-hidden bg-white/[0.06]">
          <motion.div
            className="absolute inset-y-0 w-1/3"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.6) 30%, rgba(236,72,153,0.6) 70%, transparent 100%)',
            }}
            initial={{ x: '-100%' }}
            whileInView={{ x: '300%' }}
            viewport={{ once: false, margin: '-30%' }}
            transition={{ duration: 2.4, ease: 'easeInOut' }}
          />
        </div>
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-500">
            {label}
          </span>
        )}
        <div className="relative h-px flex-1 overflow-hidden bg-white/[0.06]">
          <motion.div
            className="absolute inset-y-0 w-1/3"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.6) 30%, rgba(251,146,60,0.6) 70%, transparent 100%)',
            }}
            initial={{ x: '-100%' }}
            whileInView={{ x: '300%' }}
            viewport={{ once: false, margin: '-30%' }}
            transition={{ duration: 2.4, ease: 'easeInOut', delay: 0.2 }}
          />
        </div>
      </div>
    </div>
  )
}
