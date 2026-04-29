'use client'
import { memo, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Sparkles,
  Cloud,
  Layout,
  Server,
  Code2,
  Cpu,
  Wrench,
  Database,
} from 'lucide-react'
import SplitTextReveal from './SplitTextReveal'
import ParallaxSection from './ParallaxSection'

/**
 * Pictorial bento Skills — varied card sizes, big background icons,
 * color-coded tech dots, glassmorphism, hover glow.
 */
const groups = [
  {
    title: 'AI & LLM Engineering',
    sub: 'Agentic systems · RAG pipelines · tool-calling',
    icon: Sparkles,
    accent: '#a78bfa',
    items: [
      'RAG Pipelines',
      'LangChain AgentExecutor',
      'Tool Calling & Orchestration',
      'Prompt Engineering',
      'ChromaDB',
      'Llama (Ollama)',
      'Agentic AI',
    ],
    span: 'lg:col-span-7',
    featured: true,
  },
  {
    title: 'Languages',
    sub: 'Daily fluency',
    icon: Code2,
    accent: '#22d3ee',
    items: ['Java', 'Python', 'JavaScript', 'SQL', 'C', 'C++'],
    span: 'lg:col-span-5',
  },
  {
    title: 'Salesforce CRM',
    sub: 'Production builds · LWC · Apex · Flows',
    icon: Cloud,
    accent: '#0a84ff',
    items: [
      'LWC',
      'Apex (Classes, Triggers)',
      'SOQL / SOSL',
      'Screen Flow',
      'Record-Triggered Flow',
      'SFDX / Salesforce CLI',
      'Custom Objects',
      'OWD & Sharing',
      'Profiles & Permission Sets',
    ],
    span: 'lg:col-span-7',
    featured: true,
  },
  {
    title: 'Frontend',
    sub: 'Polished, motion-rich UIs',
    icon: Layout,
    accent: '#ec4899',
    items: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'Chart.js'],
    span: 'lg:col-span-5',
  },
  {
    title: 'Backend & Cloud',
    sub: 'APIs · deployments · CI',
    icon: Server,
    accent: '#fb923c',
    items: [
      'FastAPI',
      'Node.js',
      'REST APIs',
      'Vercel',
      'Railway',
      'Git / GitHub',
      'CI/CD',
    ],
    span: 'lg:col-span-8',
  },
  {
    title: 'CS Fundamentals',
    sub: '200+ DSA problems',
    icon: Cpu,
    accent: '#10b981',
    items: ['DSA', 'OOP', 'DBMS', 'Networks'],
    span: 'lg:col-span-4',
  },
]

export default function Skills() {
  return (
    <section className="relative px-6 py-12 md:px-10 md:py-16">
      <div className="container-x">
        <ParallaxSection speed={0.3} clamp={50}>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow !mb-2">Toolkit</p>
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-tighter-2 text-ink-50">
                <SplitTextReveal stagger={0.05}>
                  Things I work with daily.
                </SplitTextReveal>
              </h2>
              <p className="mt-2 max-w-md text-[13px] leading-relaxed text-ink-400">
                40+ tools across AI, frontend, backend, and Salesforce — picked for shipping speed and production reliability.
              </p>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-ink-500 md:block">
              06 · Disciplines
            </span>
          </div>
        </ParallaxSection>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-12">
          {groups.map((g, i) => (
            <SkillCard key={g.title} group={g} index={i} />
          ))}
        </div>

        {/* Bottom row — tools strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-50px' }}
          className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl md:gap-3 md:p-5"
        >
          <div className="flex shrink-0 items-center gap-2">
            <Wrench size={14} className="text-ink-400" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
              Daily tools
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              'VS Code',
              'Postman',
              'Jupyter',
              'Ollama',
              'Salesforce Dev Console',
              'Figma',
              'GitHub Desktop',
              'Vercel CLI',
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-0.5 text-[11px] text-ink-300 transition-colors hover:border-white/20 hover:text-ink-50"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const SkillCard = memo(function SkillCard({ group: g, index }) {
  const Icon = g.icon
  const ref = useRef(null)

  // Scroll-driven entrance — card scales/translates as it enters viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.45'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [60, 0])
  // Slight rotation alternates per card index — playing-card feel
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? -2.5 : 2.5, 0]
  )

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, y, rotate }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 backdrop-blur-md transition-[border-color,box-shadow] duration-500 hover:border-white/20 md:p-6 ${g.span}`}
    >
      {/* Hover glow that fills card from accent corner */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30 transition-opacity duration-500 group-hover:opacity-70"
        style={{
          background: `radial-gradient(circle, ${g.accent}50 0%, transparent 70%)`,
          filter: 'blur(35px)',
        }}
      />

      {/* Big decorative icon — floating background */}
      <Icon
        size={g.featured ? 180 : 130}
        className="pointer-events-none absolute -right-6 -bottom-6 opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.08]"
        style={{ color: g.accent }}
        strokeWidth={1.2}
      />

      {/* Header */}
      <div className="relative flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
          style={{
            background: `${g.accent}15`,
            borderColor: `${g.accent}40`,
          }}
        >
          <Icon size={18} style={{ color: g.accent }} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-[16px] font-semibold tracking-tight text-ink-50 md:text-[18px]">
            {g.title}
          </h3>
          <p className="mt-0.5 text-[11px] leading-tight text-ink-400 md:text-[12px]">
            {g.sub}
          </p>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-500">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Tech dots list */}
      <ul
        className={`relative mt-5 grid gap-1.5 ${
          g.featured ? 'grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {g.items.map((it) => (
          <li
            key={it}
            className="flex items-center gap-2 text-[12px] text-ink-200 transition-colors group-hover:text-ink-50 md:text-[13px]"
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{
                background: g.accent,
                boxShadow: `0 0 6px ${g.accent}`,
              }}
            />
            <span className="truncate">{it}</span>
          </li>
        ))}
      </ul>

      {/* Bottom accent edge stripe — appears on hover */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${g.accent} 50%, transparent 100%)`,
        }}
      />
    </motion.div>
  )
})
