'use client'
import { motion } from 'framer-motion'
import SplitTextReveal from './SplitTextReveal'
import ParallaxSection from './ParallaxSection'

const groups = [
  {
    title: 'AI / ML',
    items: ['LangChain', 'Llama / Ollama', 'ChromaDB', 'Agentic RAG', 'Prompt Eng', 'OpenAI'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'Three.js', 'Tailwind', 'Framer Motion', 'GSAP'],
  },
  {
    title: 'Backend',
    items: ['FastAPI', 'Node.js', 'Python', 'REST APIs', 'PostgreSQL', 'Edge runtime'],
  },
  {
    title: 'Salesforce',
    items: ['LWC', 'Apex', 'Flows', 'SFDX', 'OWD / Sharing', 'Permission Sets'],
  },
  {
    title: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL', 'C / C++'],
  },
]

export default function Skills() {
  return (
    <section className="relative px-6 py-20 md:px-10 md:py-20">
      <div className="container-x">
        <ParallaxSection speed={0.3} clamp={60}>
          <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
            <div>
              <p className="eyebrow !mb-2">Toolkit</p>
              <h2 className="font-display text-[clamp(1.75rem,4.5vw,3rem)] font-semibold leading-[1.05] tracking-tighter-2 text-ink-50">
                <SplitTextReveal stagger={0.05}>Things I work with daily.</SplitTextReveal>
              </h2>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-ink-500 md:block">
              30+ · Tools
            </span>
          </div>
        </ParallaxSection>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] md:grid-cols-3 lg:grid-cols-5">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-40px' }}
              className="bg-[#0a0a0c] p-5 md:p-6"
            >
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                {String(i + 1).padStart(2, '0')} · {g.title}
              </div>
              <ul className="space-y-1.5">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="text-[13px] text-ink-100 transition-colors hover:text-white"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
