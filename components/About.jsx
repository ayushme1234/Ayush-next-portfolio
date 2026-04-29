'use client'
import { motion } from 'framer-motion'
import { bio } from '@/data/bio'
import SplitTextReveal from './SplitTextReveal'
import ParallaxSection from './ParallaxSection'

export default function About() {
  return (
    <section id="about" className="section relative">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <ParallaxSection speed={0.3} clamp={80}>
            <div>
            <p className="eyebrow">About</p>
            <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold leading-[1.05] tracking-tighter-2 text-ink-50">
              <SplitTextReveal stagger={0.06}>I build finished things.</SplitTextReveal>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-80px' }}
              className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-400 md:text-[18px]"
            >
              Currently a Salesforce Domain Intern at Cognizant. Previously interned in
              Embedded/IoT at IC Centre, Jadavpur University. I love the corner where
              applied AI meets clean product — and shipping fast.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-80px' }}
              className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-400 md:text-[18px]"
            >
              Based in {bio.location}. Available for full-time roles starting 2026.
            </motion.p>
            </div>
          </ParallaxSection>

          <ParallaxSection speed={-0.2} clamp={60}>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
              {bio.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true, margin: '-80px' }}
                  className="bg-[#0a0a0c] p-6 md:p-10"
                >
                  <div className="gradient-text font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold tracking-tighter-2">
                    {s.value}
                  </div>
                  <div className="mt-2 text-[12px] font-medium uppercase tracking-wider text-ink-500">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </ParallaxSection>
        </div>
      </div>
    </section>
  )
}
