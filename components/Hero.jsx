'use client'
import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Sparkles, Play } from 'lucide-react'
import { useUI } from '@/lib/store'
import MagneticButton from './MagneticButton'
import FloatingOrbs from './FloatingOrbs'
import Typewriter from './Typewriter'
import ScrollCue from './ScrollCue'

export default function Hero() {
  const setChatOpen = useUI((s) => s.setChatOpen)
  const setVoiceOpen = useUI((s) => s.setVoiceOpen)

  const heroRef = useRef(null)
  const layerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Title: scale up + fade out as you scroll
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -150])
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Background image: slow zoom + dim as you scroll
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const bgBrightness = useTransform(scrollYProgress, [0, 1], [1, 0.4])

  const subY = useTransform(scrollYProgress, [0, 1], [0, -250])

  // Mouse parallax for image (smooth via spring)
  const mxRaw = useSpring(0, { damping: 30, stiffness: 80 })
  const myRaw = useSpring(0, { damping: 30, stiffness: 80 })
  const bgX = useTransform(mxRaw, [-1, 1], [25, -25])
  const bgYMouse = useTransform(myRaw, [-1, 1], [15, -15])

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      mxRaw.set(x)
      myRaw.set(y)
      if (layerRef.current) {
        layerRef.current.style.transform = `translate3d(${x * -8}px, ${y * -6}px, 0)`
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mxRaw, myRaw])

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative isolate flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-[#050507] px-6 pt-24 pb-12 md:px-10 md:pb-16"
    >
      {/* ───── BACKGROUND IMAGE LAYER ───── */}
      <motion.div
        style={{
          scale: bgScale,
          y: bgY,
          x: bgX,
          filter: useTransform(bgBrightness, (b) => `brightness(${b})`),
        }}
        className="absolute inset-0 z-0 will-change-transform"
        aria-hidden="true"
      >
        <motion.div style={{ y: bgYMouse }} className="absolute inset-0">
          <img
            src="/images/hero-bg.png"
            alt=""
            className="h-full w-full object-cover"
            style={{
              objectPosition: 'center 30%',
              filter: 'saturate(1.1) contrast(1.05)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* ───── DIM OVERLAYS ───── */}
      {/* Base dim — covers the whole image so text is readable everywhere */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: 'rgba(5, 5, 7, 0.55)' }}
        aria-hidden="true"
      />
      {/* Soft top fade so the nav has contrast */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-48"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,5,7,0.9) 0%, rgba(5,5,7,0.5) 60%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      {/* Stronger bottom fade for text + CTAs */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-2/3"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(5,5,7,0.6) 40%, rgba(5,5,7,0.95) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ───── DECORATIVE ORBS ───── */}
      <div className="relative z-[2]">
        <FloatingOrbs />
      </div>

      {/* ───── TOP META ───── */}
      <div className="container-x relative z-10 flex w-full items-start justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/80 md:text-[11px]">
        <div className="flex flex-col gap-1">
          <span>Portfolio · 2026</span>
          <span className="text-white/50">Vol. 01</span>
        </div>
        <div className="hidden flex-col items-end gap-1 md:flex">
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Available · 2026
          </span>
          <span className="text-white/50">Kolkata, IN</span>
        </div>
      </div>

      {/* ───── MAIN DISPLAY ───── */}
      <motion.div
        style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
        ref={layerRef}
        className="relative z-10 flex flex-1 flex-col items-center justify-center will-change-transform"
      >
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3 block text-center font-mono text-[10px] uppercase tracking-[0.4em] text-white/80 md:text-[12px]"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
        >
          Full-Stack AI Engineer
        </motion.span>

        {/* TYPEWRITER NAME — much smaller now */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-center font-bold leading-[0.95] tracking-[-0.04em] text-white"
          style={{
            fontSize: 'clamp(3rem, 9vw, 7rem)',
            fontWeight: 800,
            textShadow: '0 4px 40px rgba(0,0,0,0.8), 0 2px 16px rgba(0,0,0,0.6)',
            minHeight: '1.1em',
          }}
        >
          <Typewriter
            text="Ayush."
            speed={160}
            startDelay={400}
            cursorClassName="text-purple-300"
          />
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-md text-center text-[14px] leading-relaxed text-white/85 md:max-w-lg md:text-[16px]"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.85)' }}
        >
          Building AI products and Salesforce platforms.
          <br className="hidden md:block" />
          B.Tech ECE 2026 · Currently shipping at{' '}
          <span className="text-white">Cognizant</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton as="a" href="#contact" className="btn-primary">
            Get in touch
            <ArrowRight size={15} />
          </MagneticButton>
          <MagneticButton as="a" href="#work" className="btn-ghost">
            View work
          </MagneticButton>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.95, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 flex flex-wrap items-center justify-center gap-2.5"
        >
          <button
            onClick={() => setChatOpen(true)}
            className="group flex items-center gap-2.5 rounded-full border border-white/20 bg-black/50 px-3.5 py-1.5 backdrop-blur-md transition-colors hover:border-white/40 hover:bg-black/70"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-500">
              <Sparkles size={9} className="text-ink-950" />
            </span>
            <span className="text-[12px] font-medium text-white">Ask AI Ayush</span>
          </button>
          <button
            onClick={() => setVoiceOpen(true)}
            className="group flex items-center gap-2.5 rounded-full border border-white/20 bg-black/50 px-3.5 py-1.5 backdrop-blur-md transition-colors hover:border-white/40 hover:bg-black/70"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-400">
              <Play size={8} className="ml-0.5 text-white" fill="currentColor" />
            </span>
            <span className="text-[12px] font-medium text-white">Play my story</span>
          </button>
        </motion.div>
      </motion.div>

      {/* ───── BOTTOM META ───── */}
      <motion.div
        style={{ y: subY }}
        className="container-x relative z-10 flex w-full items-end justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/70 md:text-[11px]"
      >
        <div className="flex flex-col gap-1">
          <span className="text-white/50">Designed & built by</span>
          <span>Ayush</span>
        </div>
      </motion.div>

      {/* Animated scroll indicator — centered bottom */}
      <ScrollCue />
    </section>
  )
}
