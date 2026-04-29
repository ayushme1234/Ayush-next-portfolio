'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import { projects } from '@/data/projects'
import SplitTextReveal from './SplitTextReveal'

/**
 * ProjectsStack — playing-card scroll effect.
 * Each project card pins at a slightly offset top position. As the next card
 * scrolls up over it, the previous card scales down + drops slightly,
 * creating a stacked deck-of-cards visual.
 */
export default function ProjectsStack() {
  return (
    <section
      id="work"
      className="relative bg-[#08080a] px-6 pb-32 md:px-10"
    >
      {/* Header */}
      <div className="container-x pt-24 md:pt-32">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow !mb-2">Selected work</p>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tighter-2 text-ink-50">
              <SplitTextReveal stagger={0.06}>Things I shipped.</SplitTextReveal>
            </h2>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-ink-500 md:block">
            09 · Projects
          </span>
        </div>
      </div>

      {/* Card stack */}
      <div className="container-x relative mt-16">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i} total={projects.length} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ p, i, total }) {
  const ref = useRef(null)

  // Track each card's scroll progress through its own scroll range
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Scale-down the card as the next one covers it
  // Cards earlier in the deck end up smaller (deeper in the stack)
  const targetScale = 1 - (total - i) * 0.025
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  // Slight Y drift down as it gets covered (parallax under the next card)
  const y = useTransform(scrollYProgress, [0, 1], [0, 30])

  // Stacking top offset — each card pins slightly lower so the stack is visible
  const topOffset = 90 + i * 14

  // Accent color cycles through the brand palette
  const accents = ['#a78bfa', '#ec4899', '#22d3ee', '#fb923c', '#f43f5e']
  const accent = accents[i % accents.length]

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        // Each card needs its own scroll distance — that's what creates the
        // "deal" effect as you scroll past it.
        height: '90vh',
        // Stack ordering — earlier cards lower, later cards on top
        zIndex: i + 1,
      }}
    >
      <div
        className="sticky w-full"
        style={{ top: `${topOffset}px` }}
      >
        <motion.article
          style={{ scale, y }}
          className="card-deal mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d10] shadow-2xl"
          initial={{ opacity: 0, y: 60, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.05,
          }}
          viewport={{ once: true, margin: '-15%' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr]">
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#15151a] md:aspect-auto">
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/[0.04] to-white/[0.01]" />
              <img
                src={p.image}
                alt={`${p.title} preview`}
                loading="lazy"
                decoding="async"
                onError={(e) => (e.currentTarget.style.opacity = '0')}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute left-5 top-5 rounded-full bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-200 backdrop-blur-md">
                {p.number} / 09
              </span>
              <span
                className="absolute right-5 top-5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-white backdrop-blur-md"
                style={{
                  background: `${accent}26`,
                  border: `1px solid ${accent}66`,
                }}
              >
                {p.year}
              </span>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between p-6 md:p-9">
              <div>
                <p
                  className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em]"
                  style={{ color: accent }}
                >
                  {p.subtitle}
                </p>
                <h3 className="font-display text-[clamp(1.4rem,2.4vw,2rem)] font-semibold leading-[1.1] tracking-tight text-ink-50">
                  {p.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-400 md:text-[15px]">
                  {p.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] text-ink-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full bg-ink-50 px-4 py-2 text-[12px] font-medium text-ink-950 transition-all hover:bg-white"
                  >
                    Visit live
                    <ArrowUpRight size={12} />
                  </a>
                )}
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-[12px] font-medium text-ink-200 transition-all hover:bg-white/[0.06]"
                  >
                    <Github size={12} />
                    Repo
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Accent edge stripe — feels like a card edge */}
          <div
            className="absolute inset-x-0 bottom-0 h-[3px] opacity-70"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${accent} 50%, transparent 100%)`,
            }}
          />
        </motion.article>
      </div>
    </div>
  )
}
