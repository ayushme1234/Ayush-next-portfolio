'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import { useUI } from '@/lib/store'
import { bio } from '@/data/bio'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const setChatOpen = useUI((s) => s.setChatOpen)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-nav' : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-14 items-center justify-between gap-3 px-6">
        <Link
          href="#top"
          className="font-display text-[16px] font-semibold tracking-tight text-ink-50"
        >
          Ayush<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">.</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[12px] font-normal text-ink-200 transition-colors hover:text-ink-50"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={bio.resumeUrl || '/resume.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[12px] font-medium text-ink-100 transition-all hover:border-white/30 hover:bg-white/[0.08] sm:inline-flex"
          >
            <FileText size={12} />
            Resume
          </a>
          <button
            onClick={() => setChatOpen(true)}
            className="rounded-full bg-ink-50 px-4 py-1.5 text-[12px] font-medium text-ink-950 transition-all hover:bg-white"
          >
            Ask AI
          </button>
        </div>
      </nav>
    </header>
  )
}
