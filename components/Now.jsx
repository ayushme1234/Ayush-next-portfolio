'use client'
import { motion } from 'framer-motion'
import SplitTextReveal from './SplitTextReveal'
import ParallaxSection from './ParallaxSection'

export default function Now() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32">
      <div className="container-x">
        <ParallaxSection speed={0.4} clamp={80}>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            {/* Left meta */}
            <div className="md:col-span-3">
              <p className="eyebrow !mb-2">Currently</p>
              <div className="flex items-center gap-2 text-[12px] text-ink-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="font-mono uppercase tracking-wider">Live now</span>
              </div>
            </div>

            {/* Big statement */}
            <div className="md:col-span-9">
              <h2 className="font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-tighter-2 text-ink-50">
                <SplitTextReveal stagger={0.04}>
                  Building agentic RAG systems on the Salesforce domain at Cognizant.
                </SplitTextReveal>
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="mt-4 max-w-2xl text-[14px] leading-relaxed text-ink-400 md:text-[16px]"
              >
                Shipping LWC + Apex on real client work, while training models on locally-hosted
                Llama and pushing my own AI projects. Open to full-time roles starting{' '}
                <span className="text-ink-100">2026</span>.
              </motion.p>

              {/* Tag row */}
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
                    className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-300"
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
