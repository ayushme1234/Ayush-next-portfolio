'use client'
import { motion } from 'framer-motion'
import { Trophy, Code2, BookOpen, Award } from 'lucide-react'
import SplitTextReveal from './SplitTextReveal'
import ParallaxSection from './ParallaxSection'
import AnimatedCounter from './AnimatedCounter'

const items = [
  {
    icon: Code2,
    counter: 200,
    suffix: '+',
    title: 'DSA problems',
    desc: 'Across LeetCode, HackerRank, GeeksforGeeks.',
    glow: '#a78bfa',
  },
  {
    icon: Trophy,
    big: 'SIH',
    title: 'Hackathon qualifier',
    desc: 'Internal college round qualifier.',
    glow: '#ec4899',
  },
  {
    icon: BookOpen,
    big: 'Top 5',
    title: 'School career',
    desc: 'Top-five rank from class 5 through 12.',
    glow: '#22d3ee',
  },
  {
    icon: Award,
    counter: 9,
    suffix: '+',
    title: 'Live products',
    desc: 'Agentic RAG to Salesforce platforms.',
    glow: '#fb923c',
  },
]

export default function Recognition() {
  return (
    <section className="relative px-6 py-20 md:px-10 md:py-24">
      <div className="container-x">
        <ParallaxSection speed={0.3} clamp={50}>
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow !mb-2">Recognition</p>
              <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-semibold leading-[1.1] tracking-tighter-2 text-ink-50">
                <SplitTextReveal stagger={0.05}>What I'm proud of.</SplitTextReveal>
              </h2>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-ink-500 md:block">
              04 · Highlights
            </span>
          </div>
        </ParallaxSection>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-50px' }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 backdrop-blur-md transition-all duration-500 hover:border-white/20 md:p-5"
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle, ${it.glow}40 0%, transparent 70%)`,
                  filter: 'blur(25px)',
                }}
              />

              {/* Icon */}
              <div
                className="relative mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-ink-300 transition-all duration-500"
              >
                <it.icon size={14} className="relative z-10" />
                <div
                  className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${it.glow} 0%, ${it.glow}80 100%)`,
                  }}
                />
              </div>

              {/* Big number / label */}
              <div className="relative font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold leading-none tracking-tighter-2 text-ink-50">
                {it.counter !== undefined ? (
                  <AnimatedCounter value={it.counter} suffix={it.suffix || ''} duration={1.4} />
                ) : (
                  it.big
                )}
              </div>

              {/* Subtitle */}
              <h3 className="relative mt-2 font-display text-[13px] font-medium tracking-tight text-ink-100 md:text-[14px]">
                {it.title}
              </h3>
              <p className="relative mt-1 text-[11px] leading-relaxed text-ink-400 md:text-[12px]">
                {it.desc}
              </p>

              {/* Accent edge stripe on hover */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${it.glow} 50%, transparent 100%)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
