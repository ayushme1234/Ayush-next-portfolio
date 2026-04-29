'use client'
import { motion } from 'framer-motion'

/**
 * ScrollCue — animated mouse-with-wheel indicator + label.
 * Absolutely positioned at the bottom-center of the hero section.
 */
export default function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.7 }}
      className="pointer-events-none absolute bottom-6 left-0 right-0 z-20 flex justify-center md:bottom-10"
    >
      <div className="flex flex-col items-center gap-2">
        {/* Mouse outline */}
        <div
          className="relative flex h-9 w-6 items-start justify-center rounded-full border-[1.5px] border-white/60 backdrop-blur-sm"
          style={{ boxShadow: '0 0 24px rgba(167, 139, 250, 0.4)' }}
        >
          <motion.span
            className="mt-1.5 block h-1.5 w-[3px] rounded-full bg-white"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/70 md:text-[10px]">
          Scroll to explore
        </span>
      </div>
    </motion.div>
  )
}
