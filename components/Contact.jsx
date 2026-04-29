'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Linkedin, Github, Check, AlertCircle } from 'lucide-react'
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
    <section id="contact" className="section relative">
      <div className="container-x text-center">
        <p className="eyebrow">Let's talk</p>
        <h2 className="font-display text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-[1.0] tracking-tightest text-ink-50">
          <SplitTextReveal stagger={0.05}>Let's build something</SplitTextReveal>
          <br />
          <span className="gradient-text">
            <SplitTextReveal stagger={0.05} delay={0.4}>
              incredible.
            </SplitTextReveal>
          </span>
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-ink-400 md:text-[18px]"
        >
          Drop a message — I read everything personally and reply within 48 hours.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          onSubmit={onSubmit}
          className="mx-auto mt-12 max-w-2xl space-y-4 text-left"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              required
              minLength={2}
              maxLength={80}
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-[15px] text-ink-50 outline-none transition-colors placeholder:text-ink-500 focus:border-white/30 focus:bg-white/[0.06]"
            />
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-[15px] text-ink-50 outline-none transition-colors placeholder:text-ink-500 focus:border-white/30 focus:bg-white/[0.06]"
            />
          </div>
          <textarea
            required
            minLength={10}
            maxLength={4000}
            rows={6}
            placeholder="What are you building?"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-[15px] text-ink-50 outline-none transition-colors placeholder:text-ink-500 focus:border-white/30 focus:bg-white/[0.06] resize-none"
          />
          <div className="flex flex-wrap items-center justify-between gap-4">
            {status.state === 'success' && (
              <span className="flex items-center gap-2 text-[13px] text-emerald-400">
                <Check size={14} />
                {status.msg}
              </span>
            )}
            {status.state === 'error' && (
              <span className="flex items-center gap-2 text-[13px] text-red-400">
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

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${bio.email}`}
            className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[13px] text-ink-200 transition-colors hover:bg-white/[0.04]"
          >
            <Mail size={14} />
            {bio.email}
          </a>
          <a
            href={bio.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[13px] text-ink-200 transition-colors hover:bg-white/[0.04]"
          >
            <Linkedin size={14} />
            LinkedIn
          </a>
          <a
            href={bio.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[13px] text-ink-200 transition-colors hover:bg-white/[0.04]"
          >
            <Github size={14} />
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
