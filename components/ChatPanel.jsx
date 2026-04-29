'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles, MessageSquare } from 'lucide-react'
import { useUI } from '@/lib/store'
import { streamChat } from '@/lib/api'

const SUGGESTIONS = [
  'Top 3 projects?',
  'Tech stack?',
  'Are you available for work?',
  'Tell me about Salesforce work',
]

function localFallback(text) {
  const q = text.toLowerCase()
  if (q.includes('available') || q.includes('hire') || q.includes('work'))
    return "Yes — I'm actively interviewing for full-time roles starting 2026, and open to internships, freelance, and AI/Salesforce collaborations. Best way to reach me is **ayushme1234@gmail.com** or the contact form below."
  if (q.includes('stack') || q.includes('tech') || q.includes('build with'))
    return "Core stack: **React/Next.js**, **Three.js**, **Tailwind**, **Framer Motion** on the frontend. **FastAPI** + **Node** on the backend. **LangChain** + **Llama via Ollama** + **ChromaDB** for AI. **Salesforce LWC** + **Apex** + **Flows** for CRM."
  if (q.includes('project') || q.includes('top'))
    return "Top 3: 1) **AI-Powered Salesforce Assistant** — agentic RAG with LangChain + locally-hosted Llama. 2) **LWC Geek** — interactive learning platform with iframe-sandboxed live LWC playground. 3) **Velocyte** — precision typing lab with WebAudio. All 9 are in the Work section above."
  if (q.includes('salesforce') || q.includes('cognizant') || q.includes('lwc'))
    return "Currently a **Salesforce Domain Intern at Cognizant** (since Jan 2026). Real client work — Apex, LWC, Flows, custom objects, sharing rules. I've built end-to-end systems like **EventHive** (Event Management), **QuickRide OS** (ride-hailing), and the **Myntra × Salesforce** storefront."
  return "Good question. The live Llama backend isn't reachable right now, so this is a local fallback. Try asking about my projects, tech stack, availability, or Salesforce work. Or message me directly via the contact form below."
}

export default function ChatPanel() {
  const open = useUI((s) => s.chatOpen)
  const setOpen = useUI((s) => s.setChatOpen)
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hey 👋 I'm an AI version of Ayush. Ask me about his projects, stack, availability — anything.",
    },
  ])
  const abortRef = useRef(null)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const send = useCallback(
    async (text) => {
      if (!text.trim() || streaming) return
      const userMsg = { role: 'user', content: text.trim() }
      const draft = { role: 'assistant', content: '' }
      setMessages((m) => [...m, userMsg, draft])
      setStreaming(true)
      setInput('')

      abortRef.current = new AbortController()
      try {
        await streamChat(
          [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          (token) => {
            setMessages((curr) => {
              const next = [...curr]
              const last = next[next.length - 1]
              next[next.length - 1] = { ...last, content: last.content + token }
              return next
            })
          },
          abortRef.current.signal
        )
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[chat] backend error, using local fallback:', err?.message)
        const fallback = localFallback(text)
        setMessages((curr) => {
          const next = [...curr]
          next[next.length - 1] = { role: 'assistant', content: fallback }
          return next
        })
      } finally {
        setStreaming(false)
        abortRef.current = null
      }
    },
    [messages, streaming]
  )

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink-950 shadow-lg shadow-accent/20 transition-transform hover:scale-105"
      >
        <MessageSquare size={22} strokeWidth={2.2} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="fixed right-0 top-0 z-50 flex h-[100dvh] w-full max-w-md flex-col border-l border-white/10 bg-[#0a0a0c]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-blue">
                    <Sparkles size={14} className="text-ink-950" />
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-ink-50">AI Ayush</div>
                    <div className="flex items-center gap-1.5 text-[11px] text-ink-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Online
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-white/[0.06] hover:text-ink-50"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-ink-50 text-ink-950'
                          : 'bg-white/[0.06] text-ink-100'
                      }`}
                    >
                      {m.content || (
                        <span className="inline-flex items-center gap-1">
                          <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-ink-400" />
                          <span
                            className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-ink-400"
                            style={{ animationDelay: '0.15s' }}
                          />
                          <span
                            className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-ink-400"
                            style={{ animationDelay: '0.3s' }}
                          />
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggestions */}
              {messages.length <= 1 && (
                <div className="border-t border-white/10 px-5 py-3">
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] text-ink-200 transition-colors hover:bg-white/[0.08]"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  send(input)
                }}
                className="border-t border-white/10 p-4"
              >
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] pl-4 pr-1.5 py-1.5">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything…"
                    disabled={streaming}
                    className="flex-1 bg-transparent text-[14px] text-ink-50 outline-none placeholder:text-ink-500"
                  />
                  <button
                    type="submit"
                    disabled={streaming || !input.trim()}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-ink-950 transition-opacity disabled:opacity-40"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
