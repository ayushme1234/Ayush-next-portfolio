'use client'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import { projects } from '@/data/projects'
import { useUI } from '@/lib/store'
import SplitTextReveal from './SplitTextReveal'

/**
 * GSAP-pinned horizontal scroll showcase.
 * As the user scrolls vertically over this section, the cards translate horizontally.
 * Falls back gracefully on small screens (vertical stack).
 */
export default function ProjectsScroll() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    const onResize = () =>
      setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (isMobile) return
    let ctx
    let cleanup = () => {}

    ;(async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const section = sectionRef.current
        const track = trackRef.current
        if (!section || !track) return

        const totalScroll = track.scrollWidth - window.innerWidth + 100

        gsap.to(track, {
          x: -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${totalScroll}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      }, sectionRef)

      cleanup = () => {
        ctx?.revert()
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    })()

    return () => cleanup()
  }, [isMobile])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="h-scroll-section relative overflow-hidden bg-[#08080a]"
      style={{ minHeight: isMobile ? 'auto' : '100svh' }}
    >
      {/* Header */}
      <div className="container-x px-6 pt-24 md:pt-32">
        <p className="eyebrow">Selected work · 09 projects</p>
        <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.05] tracking-tighter-2 text-ink-50">
          <SplitTextReveal stagger={0.06}>Things I shipped.</SplitTextReveal>
        </h2>
      </div>

      {/* Track */}
      <div
        className={`mt-10 ${
          isMobile
            ? 'flex flex-col gap-6 px-6 pb-24'
            : 'h-scroll-track px-[8vw] pb-12'
        }`}
        ref={trackRef}
        style={!isMobile ? { paddingTop: '4rem' } : undefined}
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i} isMobile={isMobile} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ p, i, isMobile }) {
  const cardRef = useRef(null)

  const onMove = (e) => {
    const el = cardRef.current
    if (!el || isMobile) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1200px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`
  }

  const onLeave = () => {
    const el = cardRef.current
    if (el) el.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <article
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d10] ${
        isMobile ? 'w-full' : 'h-[68vh] w-[55vw] max-w-[760px]'
      }`}
      style={{
        transition:
          'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
        boxShadow: `0 30px 100px -30px ${
          ['#a78bfa', '#ec4899', '#22d3ee', '#fb923c'][i % 4]
        }50`,
      }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#15151a]">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/[0.04] to-white/[0.01]" />
        <img
          src={p.image}
          alt={`${p.title} preview`}
          loading="lazy"
          decoding="async"
          onError={(e) => (e.currentTarget.style.opacity = '0')}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-200 backdrop-blur-md">
          {p.number} / 09
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-200 backdrop-blur-md">
          {p.year}
        </span>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.3) 100%)',
          }}
        />
      </div>

      {/* Info */}
      <div className="p-6 md:p-8">
        <h3 className="font-display text-[clamp(1.25rem,1.8vw,1.75rem)] font-semibold leading-tight tracking-tight text-ink-50">
          {p.title}
        </h3>
        <p className="mt-1 text-[12px] font-mono uppercase tracking-wider text-ink-500">
          {p.subtitle}
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-ink-400 line-clamp-3">
          {p.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] text-ink-400"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2">
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
    </article>
  )
}
