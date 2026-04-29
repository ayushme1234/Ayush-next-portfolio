'use client'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SplitTextReveal from './SplitTextReveal'
import ParallaxSection from './ParallaxSection'

const services = [
  {
    n: '01',
    title: 'AI engineering',
    desc: 'Agentic RAG · LangChain · streaming · tool use · locally-hosted Llama.',
  },
  {
    n: '02',
    title: 'Full-stack development',
    desc: 'React · Next.js · FastAPI · Node · Postgres · Vercel.',
  },
  {
    n: '03',
    title: 'Salesforce CRM',
    desc: 'LWC · Apex · Flows · custom objects · production builds.',
  },
]

export default function Services() {
  return (
    <section className="relative px-6 py-12 md:px-10 md:py-16">
      <div className="container-x">
        <ParallaxSection speed={0.3} clamp={50}>
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow !mb-2">Services</p>
              <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-semibold leading-[1.1] tracking-tighter-2 text-ink-50">
                <SplitTextReveal stagger={0.05}>What I do best.</SplitTextReveal>
              </h2>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-ink-500 md:block">
              03 · Capabilities
            </span>
          </div>
        </ParallaxSection>

        <ul className="border-t border-white/10">
          {services.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-50px' }}
              className="group grid cursor-pointer grid-cols-[36px_1fr_auto] items-center gap-3 border-b border-white/10 py-4 transition-colors hover:bg-white/[0.02] md:grid-cols-[60px_1fr_auto] md:gap-5 md:py-5"
            >
              <span className="font-mono text-[10px] text-ink-500 md:text-[11px]">{s.n}</span>
              <div>
                <div className="font-display text-[15px] font-medium tracking-tight text-ink-50 transition-transform duration-500 group-hover:translate-x-1.5 md:text-[20px]">
                  {s.title}
                </div>
                <div className="mt-0.5 text-[12px] text-ink-400 md:text-[13px]">
                  {s.desc}
                </div>
              </div>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-ink-200 transition-all duration-500 group-hover:rotate-45 group-hover:border-ink-50 group-hover:bg-ink-50 group-hover:text-ink-950">
                <ArrowUpRight size={14} />
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
