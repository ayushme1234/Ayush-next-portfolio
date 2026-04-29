'use client'

const items = [
  'Creative Developer',
  'AI Engineer',
  'UI Architect',
  'Salesforce Builder',
  'Agentic RAG',
  '3D & Motion',
  'Full-Stack',
  'React Fanboy',
]

export default function Marquee() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] py-7">
      <div className="marquee-track text-[clamp(1.25rem,3.5vw,2.5rem)] font-display font-semibold tracking-tighter-2 text-ink-100">
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-12">
            {i % 4 === 0 ? <span className="gradient-text">{item}</span> : item}
            <span className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
          </span>
        ))}
      </div>
    </section>
  )
}
