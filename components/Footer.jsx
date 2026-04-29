'use client'
import { Github, Heart } from 'lucide-react'
import { bio } from '@/data/bio'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-12 md:px-10">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="font-display text-[20px] font-semibold tracking-tight text-ink-50">
              Ayush<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">.</span>
            </div>
            <p className="mt-2 max-w-xs text-[12px] leading-relaxed text-ink-500">
              Full-stack AI engineer building agentic systems and Salesforce platforms.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-4 text-[12px]">
            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-ink-500">
                Connect
              </div>
              <ul className="space-y-1.5">
                <li>
                  <a
                    href={bio.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-200 transition-colors hover:text-ink-50"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={bio.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-200 transition-colors hover:text-ink-50"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={bio.socials.trailhead}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-200 transition-colors hover:text-ink-50"
                  >
                    Trailhead
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${bio.email}`}
                    className="text-ink-200 transition-colors hover:text-ink-50"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-ink-500">
                This site
              </div>
              <ul className="space-y-1.5">
                <li>
                  <a
                    href={bio.repoUrl || 'https://github.com/ayushme1234/Ayush-next-portfolio'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-ink-200 transition-colors hover:text-ink-50"
                  >
                    <Github size={11} />
                    Source code
                  </a>
                </li>
                <li>
                  <a
                    href={bio.resumeUrl || '/resume.pdf'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-200 transition-colors hover:text-ink-50"
                  >
                    Resume
                  </a>
                </li>
                <li>
                  <a
                    href="#top"
                    className="text-ink-200 transition-colors hover:text-ink-50"
                  >
                    Back to top
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Colophon */}
          <div className="text-[11px] text-ink-500 md:text-right">
            <div className="font-mono uppercase tracking-wider">Built with</div>
            <div className="mt-1 text-ink-300">Next.js · Tailwind · Framer · Three.js</div>
            <div className="mt-3 flex items-center gap-1.5 text-ink-500 md:justify-end">
              Designed & built by Ayush
              <Heart size={11} className="text-pink-400" fill="currentColor" />
            </div>
            <div className="mt-1 font-mono">© {new Date().getFullYear()}</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
