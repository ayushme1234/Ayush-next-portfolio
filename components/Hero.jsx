'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Play, Volume2, MessageSquare } from 'lucide-react'
import { useUI } from '@/lib/store'
import MagneticButton from './MagneticButton'
import SplitTextReveal from './SplitTextReveal'
import dynamic from 'next/dynamic'

const HeroCharacter = dynamic(() => import('./HeroCharacter'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-ink-400 text-sm">
      Loading…
    </div>
  ),
})

export default function Hero() {
  const setChatOpen = useUI((s) => s.setChatOpen)
  const setVoiceOpen = useUI((s) => s.setVoiceOpen)

  // Mouse parallax — refs for layers at different depths
  const heroRef = useRef(null)
  const layerNameRef = useRef(null)
  const layerSubRef = useRef(null)
  const layerEyebrowRef = useRef(null)
  const layerSceneRef = useRef(null)
  const layerBlobRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2 // -1..1
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      // Each layer parallaxes at a different depth
      if (layerNameRef.current) {
        layerNameRef.current.style.transform = `translate3d(${x * -8}px, ${y * -6}px, 0)`
      }
      if (layerSubRef.current) {
        layerSubRef.current.style.transform = `translate3d(${x * -14}px, ${y * -10}px, 0)`
      }
      if (layerEyebrowRef.current) {
        layerEyebrowRef.current.style.transform = `translate3d(${x * -22}px, ${y * -16}px, 0)`
      }
      if (layerSceneRef.current) {
        layerSceneRef.current.style.transform = `translate3d(${x * 18}px, ${y * 14}px, 0)`
      }
      if (layerBlobRef.current) {
        layerBlobRef.current.style.transform = `translate3d(${x * -30}px, ${y * -22}px, 0)`
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16"
    >
      {/* Hero-local moving blob (extra parallax over the global aurora) */}
      <div
        ref={layerBlobRef}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(167,139,250,0.20) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Status pill */}
      <div ref={layerEyebrowRef} className="will-change-transform">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 backdrop-blur-md"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-200">
            Available for full-time · 2026
          </span>
        </motion.div>
      </div>

      {/* Main display */}
      <div ref={layerNameRef} className="relative z-10 will-change-transform">
        <h1 className="font-display text-center font-semibold leading-[0.92] tracking-tightest">
          <span className="block text-[clamp(0.875rem,1.4vw,1rem)] font-medium uppercase tracking-[0.3em] text-ink-400 mb-5">
            <SplitTextReveal stagger={0.04} delay={0.05}>
              Hi, I'm
            </SplitTextReveal>
          </span>
          <span
            className="gradient-text block text-[clamp(4.5rem,17vw,13rem)] font-bold"
            style={{ fontWeight: 800 }}
          >
            <SplitTextReveal stagger={0.05} delay={0.15} type="char">
              Ayush.
            </SplitTextReveal>
          </span>
        </h1>
      </div>

      {/* Role + tagline */}
      <div ref={layerSubRef} className="relative z-10 mt-6 will-change-transform">
        <p className="text-center text-[clamp(1.25rem,3vw,2rem)] font-medium leading-tight tracking-tight text-ink-100">
          <SplitTextReveal stagger={0.05} delay={0.55}>
            Full-Stack AI Engineer
          </SplitTextReveal>
        </p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-ink-400 md:text-[17px]"
        >
          I build agentic RAG systems, polished React frontends, and Salesforce
          platforms that ship. B.Tech ECE 2026, currently at{' '}
          <span className="text-ink-100">Cognizant</span>.
        </motion.p>
      </div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <MagneticButton as="a" href="#contact" className="btn-primary">
          Get in touch
          <ArrowRight size={16} />
        </MagneticButton>
        <MagneticButton as="a" href="#work" className="btn-ghost">
          View work
        </MagneticButton>
      </motion.div>

      {/* Feature pills */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mt-5 flex flex-wrap items-center justify-center gap-3"
      >
        <MagneticButton
          as="button"
          onClick={() => setChatOpen(true)}
          className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.08]"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-500">
            <Sparkles size={10} className="text-ink-950" />
          </span>
          <span className="text-[13px] font-medium text-ink-100">Ask AI Ayush</span>
          <MessageSquare size={12} className="text-ink-400" />
        </MagneticButton>
        <MagneticButton
          as="button"
          onClick={() => setVoiceOpen(true)}
          className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.08]"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-400">
            <Play size={9} className="ml-0.5 text-white" fill="currentColor" />
          </span>
          <span className="text-[13px] font-medium text-ink-100">Play my story</span>
          <span className="flex items-end gap-[2px]">
            {[0.4, 0.7, 0.5, 0.9, 0.6].map((h, i) => (
              <span
                key={i}
                className="w-[2px] rounded-full bg-gradient-to-t from-cyan-400 to-purple-400"
                style={{
                  height: `${h * 11}px`,
                  animation: `pulseDot 1.${i + 1}s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </span>
        </MagneticButton>
      </motion.div>

      {/* 3D Character */}
      <div
        ref={layerSceneRef}
        className="relative z-10 mt-12 h-[320px] w-full max-w-[460px] will-change-transform md:h-[380px] md:max-w-[520px]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full"
        >
          <HeroCharacter />
        </motion.div>
      </div>

      {/* Tech ribbon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500"
      >
        {['React', 'Next.js', 'Three.js', 'LangChain', 'Salesforce', 'FastAPI'].map(
          (t) => (
            <span key={t} className="flex items-center gap-2">
              <span className="h-px w-3 bg-ink-700" />
              {t}
            </span>
          )
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-500">
          Scroll
        </span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  )
}
