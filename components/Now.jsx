'use client'
import { motion } from 'framer-motion'
import { Activity, Code2, Zap } from 'lucide-react'
import SplitTextReveal from './SplitTextReveal'
import ParallaxSection from './ParallaxSection'

export default function Now() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:px-10 md:py-22">
      {/* Ambient glow behind */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-40"
        style={{
          background:
            'radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="container-x relative">
        <ParallaxSection speed={0.4} clamp={70}>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10">
            {/* Left — Glassmorphism status card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-50px' }}
              className="md:col-span-4"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                {/* Top status row */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-200">
                      Live
                    </span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink-500">
                    NOW
                  </span>
                </div>

                {/* Big role */}
                <div className="py-5">
                  <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                    Currently
                  </div>
                  <div className="font-display text-[18px] font-medium leading-tight tracking-tight text-ink-50">
                    Salesforce Domain Intern
                  </div>
                  <div className="mt-1 text-[12px] text-ink-400">
                    Cognizant Technology Solutions
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-4">
                  <div className="flex items-center gap-2 text-[11px] text-ink-300">
                    <Activity size={12} className="text-emerald-400" />
                    <span>Since Jan</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-ink-300">
                    <Code2 size={12} className="text-purple-400" />
                    <span>Apex · LWC</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-ink-300">
                    <Zap size={12} className="text-cyan-400" />
                    <span>Production</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-ink-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                    <span>Full-time '26</span>
                  </div>
                </div>

                {/* Subtle accent edge */}
                <div
                  className="absolute inset-x-0 bottom-0 h-px"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.5) 50%, transparent 100%)',
                  }}
                />
              </div>
            </motion.div>

            {/* Right — Big statement */}
            <div className="md:col-span-8">
              <p className="eyebrow !mb-3">The work</p>
              <h2 className="font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-tighter-2 text-ink-50">
                <SplitTextReveal stagger={0.04}>
                  Building agentic RAG systems on the Salesforce domain.
                </SplitTextReveal>
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="mt-5 max-w-2xl text-[14px] leading-relaxed text-ink-400 md:text-[16px]"
              >
                Shipping LWC + Apex on real client work, while training models on locally-hosted
                Llama and pushing my own AI projects. Open to full-time roles starting{' '}
                <span className="text-ink-100">2026</span>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-6 flex flex-wrap items-center gap-2"
              >
                {['Agentic RAG', 'LWC', 'Apex', 'Llama', 'LangChain', 'ChromaDB'].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-300 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    {t}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </ParallaxSection>
      </div>
    </section>
  )
}
