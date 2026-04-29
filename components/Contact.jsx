'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Mail,
  Linkedin,
  Github,
  Check,
  AlertCircle,
  Clock,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { sendContact } from '@/lib/api'
import { bio } from '@/data/bio'
import SplitTextReveal from './SplitTextReveal'
import MagneticButton from './MagneticButton'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status.state === 'sending') return
    setStatus({ state: 'sending', msg: '' })
    try {
      await sendContact(form)
      setStatus({ state: 'success', msg: "Message sent. I'll reply within 48h." })
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus({ state: 'error', msg: err?.message || 'Send failed' })
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-12 md:px-10 md:py-16">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-40"
        style={{
          background:
            'radial-gradient(circle, rgba(167,139,250,0.15) 0%, rgba(236,72,153,0.08) 40%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="container-x relative">
        {/* Header */}
        <div className="text-center">
          <p className="eyebrow !mb-2">Let's talk</p>
          <h2 className="font-display text-[clamp(2rem,5.5vw,4rem)] font-semibold leading-[1.0] tracking-tightest text-ink-50">
            <SplitTextReveal stagger={0.05}>Let's build something</SplitTextReveal>{' '}
            <span className="gradient-text">
              <SplitTextReveal stagger={0.05} delay={0.4}>
                incredible.
              </SplitTextReveal>
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-ink-400 md:text-[15px]"
          >
            Drop a message — I read everything personally and reply within 48 hours.
          </motion.p>
        </div>

        {/* Form + glass facts grid */}
        <div className="mx-auto mt-8 grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-[1.5fr_1fr]">
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            onSubmit={onSubmit}
            className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl md:p-6"
          >
            <div className="grid gap-3 md:grid-cols-2">
              <input
                type="text"
                required
                minLength={2}
                maxLength={80}
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[14px] text-ink-50 outline-none transition-colors placeholder:text-ink-500 focus:border-white/30 focus:bg-white/[0.06]"
              />
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[14px] text-ink-50 outline-none transition-colors placeholder:text-ink-500 focus:border-white/30 focus:bg-white/[0.06]"
              />
            </div>
            <textarea
              required
              minLength={10}
              maxLength={4000}
              rows={4}
              placeholder="What are you building?"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[14px] text-ink-50 outline-none transition-colors placeholder:text-ink-500 focus:border-white/30 focus:bg-white/[0.06]"
            />
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              {status.state === 'success' && (
                <span className="flex items-center gap-2 text-[12px] text-emerald-400">
                  <Check size={14} />
                  {status.msg}
                </span>
              )}
              {status.state === 'error' && (
                <span className="flex items-center gap-2 text-[12px] text-red-400">
                  <AlertCircle size={14} />
                  {status.msg}
                </span>
              )}
              {status.state !== 'success' && status.state !== 'error' && <span />}
              <MagneticButton
                as="button"
                type="submit"
                disabled={status.state === 'sending'}
                className="btn-primary disabled:opacity-60"
              >
                {status.state === 'sending' ? 'Sending…' : 'Send message'}
                <ArrowRight size={16} />
              </MagneticButton>
            </div>
          </motion.form>

          {/* GLASSMORPHISM CREDIBILITY STACK */}
          <div className="grid grid-cols-1 gap-3">
            <GlassFact
              icon={Clock}
              label="Response"
              value="< 48 hours"
              accent="#a78bfa"
              delay={0.65}
            />
            <GlassFact
              icon={MapPin}
              label="Location"
              value="Kolkata · IN"
              accent="#22d3ee"
              delay={0.75}
            />
            <GlassFact
              icon={Sparkles}
              label="Open to"
              value="Full-time · 2026"
              accent="#ec4899"
              delay={0.85}
            />
          </div>
        </div>

        {/* Direct social pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <a
            href={`mailto:${bio.email}`}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[12px] text-ink-200 backdrop-blur-md transition-colors hover:bg-white/[0.06]"
          >
            <Mail size={13} />
            {bio.email}
          </a>
          <a
            href={bio.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[12px] text-ink-200 backdrop-blur-md transition-colors hover:bg-white/[0.06]"
          >
            <Linkedin size={13} />
            LinkedIn
          </a>
          <a
            href={bio.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[12px] text-ink-200 backdrop-blur-md transition-colors hover:bg-white/[0.06]"
          >
            <Github size={13} />
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

function GlassFact({ icon: Icon, label, value, accent, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl"
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, ${accent}40 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />
      <div className="relative flex items-center gap-3">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-500"
          style={{
            background: `${accent}1a`,
            border: `1px solid ${accent}40`,
          }}
        >
          <Icon size={13} style={{ color: accent }} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-500">
            {label}
          </div>
          <div className="mt-0.5 truncate text-[13px] font-medium text-ink-50">
            {value}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
