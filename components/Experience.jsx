'use client'
import { motion } from 'framer-motion'
import SplitTextReveal from './SplitTextReveal'
import ParallaxSection from './ParallaxSection'

const experience = [
  {
    range: 'Jan 2026 — Present',
    role: 'Salesforce Domain Intern',
    org: 'Cognizant Technology Solutions',
    desc: 'Production work on enterprise Salesforce platforms — CRM customisations, Apex class development, and workflow automation in a live client environment. Cross-functional collaboration with client-facing communication and sprint-based agile delivery.',
    tags: ['Apex', 'LWC', 'Flows', 'Agile'],
  },
  {
    range: 'Jun 2025 — Jul 2025',
    role: 'Embedded Systems & IoT Intern',
    org: 'IC Centre, Jadavpur University',
    desc: 'Analysed real-time sensor data streams to identify patterns and improve responsiveness in IoT prototypes. Designed biometric data acquisition workflows with low-latency Wi-Fi/Bluetooth transmission pipelines.',
    tags: ['Embedded', 'IoT', 'Sensors'],
  },
  {
    range: '2024 — Present',
    role: 'Independent Builder',
    org: 'Self-directed projects',
    desc: 'Built and shipped 9+ live products spanning agentic RAG, e-commerce, ed-tech, and Salesforce — all deployed end-to-end on Vercel.',
    tags: ['LangChain', 'React', 'Salesforce'],
  },
  {
    range: '2022 — 2026',
    role: 'B.Tech ECE',
    org: 'Netaji Subhash Engineering College',
    desc: 'CGPA 7.5 / 10 (till 7th sem). SIH internal qualifier — contributed to Alumni Network Portal. 200+ DSA problems on LeetCode, GeeksforGeeks, HackerRank.',
    tags: ['ECE', 'DSA', 'Hackathons'],
  },
]

export default function Experience() {
  return (
    <section className="relative px-6 py-12 md:px-10 md:py-16">
      <div className="container-x">
        <ParallaxSection speed={0.3} clamp={50}>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow !mb-2">Journey</p>
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-tighter-2 text-ink-50">
                <SplitTextReveal stagger={0.05}>How I got here.</SplitTextReveal>
              </h2>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-ink-500 md:block">
              {experience.length} · Roles
            </span>
          </div>
        </ParallaxSection>

        <ol className="relative">
          <span
            aria-hidden="true"
            className="absolute left-3 top-3 bottom-3 w-px bg-gradient-to-b from-white/15 via-white/10 to-transparent md:left-[140px]"
          />

          {experience.map((e, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-40px' }}
              className="relative grid grid-cols-[28px_1fr] items-start gap-4 border-b border-white/[0.06] py-6 last:border-b-0 md:grid-cols-[140px_28px_1fr] md:gap-6 md:py-7"
            >
              <div className="hidden font-mono text-[11px] uppercase tracking-wider text-ink-500 md:block">
                {e.range}
              </div>

              <div className="relative pt-1">
                <span className="block h-2.5 w-2.5 translate-x-[5px] rounded-full bg-gradient-to-br from-purple-400 to-pink-500 ring-4 ring-[#050507]" />
              </div>

              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-ink-500 md:hidden">
                  {e.range}
                </div>
                <h3 className="font-display text-[16px] font-medium tracking-tight text-ink-50 md:text-[19px]">
                  {e.role}
                </h3>
                <div className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-ink-400">
                  {e.org}
                </div>
                <p className="mt-2.5 max-w-2xl text-[13px] leading-relaxed text-ink-400 md:text-[14px]">
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
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
