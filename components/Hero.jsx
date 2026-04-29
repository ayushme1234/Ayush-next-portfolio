'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Sparkles,
  Play,
  MessageSquare,
  ArrowDown,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { useUI } from '@/lib/store'
import MagneticButton from './MagneticButton'
import FloatingOrbs from './FloatingOrbs'

export default function Hero() {
  const setChatOpen = useUI((s) => s.setChatOpen)
  const setVoiceOpen = useUI((s) => s.setVoiceOpen)

  const heroRef = useRef(null)
  const layerRef = useRef(null)
  const videoRef = useRef(null)

  const [muted, setMuted] = useState(true)
  const [videoReady, setVideoReady] = useState(false)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const subY = useTransform(scrollYProgress, [0, 1], [0, -350])
  // Subtle background video parallax — slow zoom + darken on scroll
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.4])

  // Mouse parallax
  useEffect(() => {
    const onMove = (e) => {
      if (!layerRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      layerRef.current.style.transform = `translate3d(${x * -10}px, ${y * -8}px, 0)`
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const toggleMute = () => {
    if (!videoRef.current) return
    const next = !muted
    videoRef.current.muted = next
    setMuted(next)
    if (!next) {
      // Try to play with sound (only allowed inside user gesture)
      videoRef.current.play().catch(() => {})
    }
  }

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden px-6 pt-28 pb-12 md:px-10 md:pb-16"
    >
      {/* BACKGROUND VIDEO LAYER */}
      <motion.div
        style={{ scale: videoScale, opacity: videoOpacity }}
        className="absolute inset-0 -z-20 overflow-hidden will-change-transform"
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          src="/videos/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoReady(true)}
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Dark overlay for text contrast — vignette + base dim */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(5,5,7,0.45) 0%, rgba(5,5,7,0.85) 70%, rgba(5,5,7,0.95) 100%)',
          }}
        />
      </motion.div>

      {/* Decorative motion graphics on top of video */}
      <FloatingOrbs />

      {/* Top meta — corner labels, editorial */}
      <div className="container-x flex w-full items-start justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-ink-300 md:text-[11px]">
        <div className="flex flex-col gap-1">
          <span>Portfolio · 2026</span>
          <span className="text-ink-500">Vol. 01</span>
        </div>
        <div className="hidden flex-col items-end gap-1 md:flex">
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Available · 2026
          </span>
          <span className="text-ink-500">Kolkata, IN</span>
        </div>
      </div>

      {/* Sound toggle — bottom-left corner over video */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        onClick={toggleMute}
        aria-label={muted ? 'Unmute background audio' : 'Mute background audio'}
        className="group fixed bottom-6 left-6 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-black/60"
      >
        {muted ? (
          <VolumeX size={14} className="text-ink-300 group-hover:text-ink-50" />
        ) : (
          <Volume2 size={14} className="text-emerald-400" />
        )}
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-300 group-hover:text-ink-50">
          {muted ? 'Sound off' : 'Sound on'}
        </span>
      </motion.button>

      {/* MAIN DISPLAY — guaranteed visible */}
      <motion.div
        style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
        ref={layerRef}
        className="relative z-10 flex flex-1 flex-col items-center justify-center will-change-transform"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-2 block text-center font-mono text-[10px] uppercase tracking-[0.4em] text-ink-300 md:text-[12px]"
        >
          Full-Stack AI Engineer
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-center font-bold leading-[0.82] tracking-[-0.05em] text-ink-50"
          style={{
            fontSize: 'clamp(5.5rem, 22vw, 18rem)',
            fontWeight: 900,
            textShadow: '0 4px 40px rgba(0,0,0,0.5)',
          }}
        >
          Ayush.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-md text-center text-[14px] leading-relaxed text-ink-200 md:max-w-lg md:text-[16px]"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
        >
          Building AI products and Salesforce platforms.
          <br className="hidden md:block" />
          B.Tech ECE 2026 · Currently shipping at{' '}
          <span className="text-ink-50">Cognizant</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton as="a" href="#contact" className="btn-primary">
            Get in touch
            <ArrowRight size={15} />
          </MagneticButton>
          <MagneticButton as="a" href="#work" className="btn-ghost">
            View work
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 flex flex-wrap items-center justify-center gap-2.5"
        >
          <button
            onClick={() => setChatOpen(true)}
            className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-black/30 px-3.5 py-1.5 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-black/50"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-500">
              <Sparkles size={9} className="text-ink-950" />
            </span>
            <span className="text-[12px] font-medium text-ink-100">Ask AI Ayush</span>
          </button>
          <button
            onClick={() => setVoiceOpen(true)}
            className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-black/30 px-3.5 py-1.5 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-black/50"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-400">
              <Play size={8} className="ml-0.5 text-white" fill="currentColor" />
            </span>
            <span className="text-[12px] font-medium text-ink-100">Play my story</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <motion.div
        style={{ y: subY }}
        className="container-x flex w-full items-end justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-ink-300 md:text-[11px]"
      >
        <div className="flex flex-col gap-1">
          <span className="text-ink-500">Designed & built by</span>
          <span>Ayush</span>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="hidden flex-col items-end gap-2 md:flex"
        >
          <span>Scroll</span>
          <ArrowDown size={14} className="animate-bounce text-ink-200" />
        </motion.div>
      </motion.div>
    </section>
  )
}
