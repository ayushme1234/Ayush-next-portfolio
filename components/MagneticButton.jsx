'use client'
import { useRef } from 'react'

/**
 * MagneticButton - children snap toward the cursor when hovered.
 * Render any element via `as` prop ('a', 'button', 'div').
 */
export default function MagneticButton({
  as = 'button',
  children,
  className = '',
  strength = 0.4,
  ...rest
}) {
  const Tag = as
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
  }

  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate3d(0,0,0)'
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
