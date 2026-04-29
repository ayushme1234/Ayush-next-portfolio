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
    desc: 'LWC · Apex · Flows · Admin · custom objects · production builds.',
  },
]

export default function Services() {

  return (
    <section className="section relative">
      <div className="container-x">
        <ParallaxSection speed={0.4} clamp={80}>
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">Services</p>
            <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold leading-[1.05] tracking-tighter-2 text-ink-50">
              <SplitTextReveal stagger={0.06}>What I do best.</SplitTextReveal>
            </h2>
          </div>
        </ParallaxSection>

        <ul className="border-t border-white/10">
          {services.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-80px' }}
              className="group grid cursor-pointer grid-cols-[40px_1fr_auto] items-center gap-4 border-b border-white/10 py-7 transition-colors hover:bg-white/[0.02] md:grid-cols-[80px_1fr_auto] md:gap-6 md:py-10"
            >
              <span className="font-mono text-[11px] text-ink-500">{s.n}</span>
              <div>
                <div className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-tight text-ink-50 transition-transform duration-500 group-hover:translate-x-2">
                  {s.title}
                </div>
                <div className="mt-1.5 text-[14px] text-ink-400 md:text-[15px]">
                  {s.desc}
                </div>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-ink-200 transition-all duration-500 group-hover:rotate-45 group-hover:border-ink-50 group-hover:bg-ink-50 group-hover:text-ink-950 md:h-12 md:w-12">
                <ArrowUpRight size={18} />
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
