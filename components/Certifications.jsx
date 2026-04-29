'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Award, ExternalLink, Brain, Layers, Code2, Cloud } from 'lucide-react'
import SplitTextReveal from './SplitTextReveal'
import ParallaxSection from './ParallaxSection'

const certs = [
  {
    name: 'AI Engineer Certification',
    issuer: 'One Roadmap',
    icon: Brain,
    accent: '#a78bfa',
    year: '2025',
    detail: 'Agentic systems · LLM ops · production AI',
  },
  {
    name: 'Full Stack Developer',
    issuer: 'Certified Track',
    icon: Layers,
    accent: '#ec4899',
    year: '2024',
    detail: 'React · Node · APIs · databases',
  },
  {
    name: 'Python Certification',
    issuer: 'Programming Track',
    icon: Code2,
    accent: '#22d3ee',
    year: '2024',
    detail: 'OOP · data structures · scripting',
  },
  {
    name: 'Salesforce Developer Fundamentals',
    issuer: 'Trailhead · 2024 — Present',
    icon: Cloud,
    accent: '#0a84ff',
    year: 'Active',
    detail: 'Apex · LWC · Flows · Security · SOQL',
  },
]

export default function Certifications() {
  return (
    <section className="relative px-6 py-12 md:px-10 md:py-16">
      <div className="container-x">
        <ParallaxSection speed={0.3} clamp={50}>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow !mb-2">Credentials</p>
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-tighter-2 text-ink-50">
                <SplitTextReveal stagger={0.05}>
                  Verified by certifications.
                </SplitTextReveal>
              </h2>
              <p className="mt-2 max-w-md text-[13px] leading-relaxed text-ink-400">
                Continuous learning across AI, full-stack, Python, and the Salesforce ecosystem.
              </p>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-ink-500 md:block">
              {certs.length} · Certifications
            </span>
          </div>
        </ParallaxSection>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {certs.map((c, i) => (
            <CertCard key={c.name} c={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CertCard({ c, i }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.5'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [60, 0])
  const rotate = useTransform(scrollYProgress, [0, 1], [i % 2 === 0 ? -2.5 : 2.5, 0])

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, y, rotate }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 backdrop-blur-md transition-[border-color] duration-500 hover:border-white/20"
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-30 transition-opacity duration-500 group-hover:opacity-70"
        style={{
          background: `radial-gradient(circle, ${c.accent}50 0%, transparent 70%)`,
          filter: 'blur(25px)',
        }}
      />

      <c.icon
        size={130}
        className="pointer-events-none absolute -right-4 -bottom-4 opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.08]"
        style={{ color: c.accent }}
        strokeWidth={1.2}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
          style={{
            background: `${c.accent}15`,
            borderColor: `${c.accent}40`,
          }}
        >
          <c.icon size={18} style={{ color: c.accent }} />
        </div>
        <span
          className="rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider"
          style={{
            color: c.accent,
            borderColor: `${c.accent}40`,
            background: `${c.accent}10`,
          }}
        >
          {c.year}
        </span>
      </div>

      <h3 className="relative mt-5 font-display text-[15px] font-semibold leading-tight tracking-tight text-ink-50">
        {c.name}
      </h3>
      <p className="relative mt-1 font-mono text-[10px] uppercase tracking-wider text-ink-500">
        {c.issuer}
      </p>
      <p className="relative mt-3 text-[12px] leading-relaxed text-ink-400">
        {c.detail}
      </p>

      <div className="relative mt-4 flex items-center gap-1.5 text-[11px] font-medium text-ink-300 transition-colors group-hover:text-ink-50">
        <Award size={12} />
        <span>Verified credential</span>
        <ExternalLink size={11} className="ml-auto opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${c.accent} 50%, transparent 100%)`,
        }}
      />
    </motion.div>
  )
}
