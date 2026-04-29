'use client'
import { bio } from '@/data/bio'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12 px-6">
      <div className="container-x">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="font-display text-[20px] font-semibold tracking-tight text-ink-50">
            Ayush<span className="text-accent">.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-[12px] text-ink-500">
            <a href={bio.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink-200 transition-colors">GitHub</a>
            <a href={bio.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink-200 transition-colors">LinkedIn</a>
            <a href={bio.socials.trailhead} target="_blank" rel="noopener noreferrer" className="hover:text-ink-200 transition-colors">Trailhead</a>
            <a href={`mailto:${bio.email}`} className="hover:text-ink-200 transition-colors">Email</a>
          </div>
          <div className="text-[12px] text-ink-500">
            © {new Date().getFullYear()} · Designed & built by Ayush
          </div>
        </div>
      </div>
    </footer>
  )
}
