'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import SplitTextReveal from './SplitTextReveal'
import ParallaxSection from './ParallaxSection'

const experience = [
  {
    range: 'Jan 2026 — Present',
    role: 'Salesforce Domain Intern',
    org: 'Cognizant Technology Solutions',
    desc: 'Production work on enterprise Salesforce platforms — Apex, LWC, Flows, custom objects. Real client deliveries, FLS-compliant architecture.',
    tags: ['Apex', 'LWC', 'Flows', 'SFDX'],
    accent: '#a78bfa',
  },
  {
    range: 'Jun 2025 — Jul 2025',
    role: 'Embedded / IoT Intern',
    org: 'IC Centre, Jadavpur University',
    desc: 'Embedded systems, sensor integration, microcontroller programming, and IoT prototypes.',
    tags: ['Embedded C', 'IoT', 'Microcontrollers'],
    accent: '#22d3ee',
  },
  {
    range: '2024 — Present',
    role: 'Independent Builder',
    org: 'Self-directed projects',
    desc: 'Built 9+ shipped products spanning agentic RAG, e-commerce, ed-tech, and CRM — all live on the web.',
    tags: ['LangChain', 'React', 'Salesforce'],
    accent: '#ec4899',
  },
  {
    range: '2022 — 2026',
    role: 'B.Tech ECE',
    org: 'Netaji Subhash Engineering College',
    desc: 'CGPA 7.6 / 10. Active contributor to coding club, hackathons, and DSA grind. SIH internal qualifier. 200+ DSA problems solved.',
    tags: ['Algorithms', 'Hackathons', 'DSA'],
    accent: '#fb923c',
  },
]

export default function Experience() {
  const sectionRef = useRef(null)

  // Drive the timeline line fill from scroll position
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 60%', 'end 80%'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      ref={sectionRef}
      className="relative px-6 py-24 md:px-10 md:py-32"
    >
      <div className="container-x">
        <ParallaxSection speed={0.3} clamp={50}>
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow !mb-2">Journey</p>
              <h2 className="font-display text-[clamp(1.75rem,4.5vw,3rem)] font-semibold leading-[1.05] tracking-tighter-2 text-ink-50">
                <SplitTextReveal stagger={0.05}>How I got here.</SplitTextReveal>
              </h2>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-ink-500 md:block">
              {experience.length} · Roles
            </span>
          </div>
        </ParallaxSection>

        {/* Timeline */}
        <ol className="relative">
          {/* Background line — full height, dim */}
          <span
            aria-hidden="true"
            className="absolute left-[5px] top-3 bottom-3 w-px bg-white/[0.08] md:left-[145px]"
          />

          {/* Animated foreground line — fills as you scroll */}
          <motion.span
            aria-hidden="true"
            style={{ height: lineHeight }}
            className="absolute left-[5px] top-3 w-px bg-gradient-to-b from-purple-400 via-pink-400 to-orange-400 md:left-[145px]"
          />

          {experience.map((e, i) => (
            <ExperienceItem key={i} e={e} i={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}

function ExperienceItem({ e, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: i * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative grid grid-cols-[28px_1fr] items-start gap-4 border-b border-white/[0.06] py-7 last:border-b-0 md:grid-cols-[140px_28px_1fr] md:gap-6"
    >
      {/* Date — left column on desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
        className="hidden font-mono text-[11px] uppercase tracking-wider text-ink-500 md:block"
      >
        {e.range}
      </motion.div>

      {/* Animated dot */}
      <div className="relative pt-1">
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{
            type: 'spring',
            damping: 14,
            stiffness: 200,
            delay: i * 0.1 + 0.3,
          }}
          className="block h-3 w-3 translate-x-[3px] rounded-full ring-4 ring-[#050507]"
          style={{
            background: `radial-gradient(circle, ${e.accent} 0%, ${e.accent}aa 100%)`,
            boxShadow: `0 0 18px ${e.accent}80`,
          }}
        />
        {/* Pulsing halo */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-1 block h-3 w-3 translate-x-[3px] animate-ping rounded-full opacity-40"
          style={{ background: e.accent, animationDuration: '2.5s' }}
        />
      </div>

      {/* Body */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: i * 0.1 + 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-ink-500 md:hidden">
          {e.range}
        </div>
        <h3
          className="font-display text-[18px] font-medium tracking-tight text-ink-50 md:text-[22px]"
          style={{
            backgroundImage: `linear-gradient(90deg, ${e.accent}, transparent 60%)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '0% 1px',
            backgroundPosition: '0 100%',
          }}
        >
          {e.role}
        </h3>
        <div
          className="mt-0.5 font-mono text-[11px] uppercase tracking-wider"
          style={{ color: e.accent }}
        >
          {e.org}
        </div>
        <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-400">
          {e.desc}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {e.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] text-ink-400"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.li>
  )
}
