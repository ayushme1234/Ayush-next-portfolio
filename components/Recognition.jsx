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
    title: 'DSA problems solved',
    desc: 'Across LeetCode, HackerRank, GeeksforGeeks. Daily algorithmic grind.',
    glow: '#a78bfa',
  },
  {
    icon: Trophy,
    big: 'SIH',
    title: 'Smart India Hackathon',
    desc: 'Internal college round qualifier. Team-led problem-solving on national-scale challenges.',
    glow: '#ec4899',
  },
  {
    icon: BookOpen,
    big: 'Top 5',
    title: 'Through school career',
    desc: 'Consistent academic top-five rank from class 5 through 12.',
    glow: '#22d3ee',
  },
  {
    icon: Award,
    counter: 9,
    suffix: '+',
    title: 'Live products shipped',
    desc: 'From agentic RAG systems to Salesforce platforms — all deployed and reachable.',
    glow: '#fb923c',
  },
]

export default function Recognition() {
  return (
    <section className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="container-x">
        <ParallaxSection speed={0.3} clamp={60}>
          <div className="mb-12 max-w-3xl">
            <p className="eyebrow !mb-2">Recognition</p>
            <h2 className="font-display text-[clamp(1.75rem,4.5vw,3rem)] font-semibold leading-[1.05] tracking-tighter-2 text-ink-50">
              <SplitTextReveal stagger={0.05}>What I'm proud of.</SplitTextReveal>
            </h2>
          </div>
        </ParallaxSection>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-50px' }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-7 backdrop-blur-md transition-all duration-500 hover:border-white/20 md:p-9"
            >
              {/* Hover glow that follows the card's accent color */}
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle, ${it.glow}40 0%, transparent 70%)`,
                  filter: 'blur(40px)',
                }}
              />

              {/* Icon */}
              <div
                className="relative mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-ink-300 transition-all duration-500"
                style={{
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
                }}
              >
                <it.icon size={18} className="relative z-10" />
                <div
                  className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${it.glow} 0%, ${it.glow}80 100%)`,
                  }}
                />
              </div>

              {/* Big number / label */}
              <div className="relative font-display text-[clamp(2.5rem,6vw,4rem)] font-bold leading-none tracking-tighter-2 text-ink-50">
                {it.counter !== undefined ? (
                  <AnimatedCounter value={it.counter} suffix={it.suffix || ''} duration={1.6} />
                ) : (
                  it.big
                )}
              </div>

              {/* Subtitle */}
              <h3 className="relative mt-3 font-display text-[16px] font-medium tracking-tight text-ink-100 md:text-[18px]">
                {it.title}
              </h3>
              <p className="relative mt-2 max-w-md text-[13px] leading-relaxed text-ink-400 md:text-[14px]">
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
