'use client'
import { useEffect, useRef } from 'react'

/**
 * SplitTextReveal - wrap text. On scroll-into-view, words slide up from below
 * with stagger. Pure intersection-observer driven (no GSAP needed).
 */
export default function SplitTextReveal({
  children,
  as: Tag = 'span',
  className = '',
  stagger = 0.05,
  delay = 0,
  type = 'word', // 'word' | 'char'
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = el.querySelectorAll('.reveal-word')
            items.forEach((it, i) => {
              it.style.animationDelay = `${delay + i * stagger}s`
              it.classList.add('is-visible')
            })
            obs.unobserve(el)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay, stagger])

  const text = String(children)
  const tokens =
    type === 'word' ? text.split(' ') : text.split('')

  return (
    <Tag ref={ref} className={className}>
      {tokens.map((tok, i) => (
        <span key={i} className="reveal-line">
          <span className="reveal-word">
            {tok}
            {type === 'word' && i < tokens.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}
