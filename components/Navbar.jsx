'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useUI } from '@/lib/store'

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
      <nav className="container-x flex h-14 items-center justify-between px-6">
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

        <button
          onClick={() => setChatOpen(true)}
          className="rounded-full bg-ink-50 px-4 py-1.5 text-[12px] font-medium text-ink-950 transition-all hover:bg-white"
        >
          Ask AI
        </button>
      </nav>
    </header>
  )
}
