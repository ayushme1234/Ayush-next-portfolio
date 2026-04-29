'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause, Volume2 } from 'lucide-react'
import { useUI } from '@/lib/store'
import { generateVoice } from '@/lib/api'

const NARRATION = `Hi, I'm Ayush. I build agentic RAG systems, polished React frontends, and Salesforce platforms that ship. Currently a Salesforce Domain Intern at Cognizant, B.Tech ECE class of 2026. If you're interested in working together, drop me a message below.`

export default function VoicePlayer() {
  const open = useUI((s) => s.voiceOpen)
  const setOpen = useUI((s) => s.setVoiceOpen)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [bars, setBars] = useState(Array(24).fill(0.2))
  const audioRef = useRef(null)
  const speechRef = useRef(null)
  const analyserRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current)
      audioRef.current?.pause()
      window.speechSynthesis?.cancel()
    }
  }, [])

  const play = async () => {
    if (playing) {
      // Pause whichever is active
      audioRef.current?.pause()
      window.speechSynthesis?.cancel()
      setPlaying(false)
      return
    }

    setPlaying(true)

    // 1. Try /audio/intro.mp3
    try {
      const probe = await fetch('/audio/intro.mp3', { method: 'HEAD' })
      if (probe.ok) {
        playAudio('/audio/intro.mp3')
        return
      }
    } catch {
      /* fall through */
    }

    // 2. Try /api/voice (ElevenLabs)
    try {
      const blob = await generateVoice(NARRATION)
      const url = URL.createObjectURL(blob)
      playAudio(url)
      return
    } catch {
      /* fall through */
    }

    // 3. Web Speech API fallback
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(NARRATION)
      utter.rate = 1
      utter.pitch = 1
      utter.onend = () => setPlaying(false)
      utter.onerror = () => setPlaying(false)
      speechRef.current = utter
      window.speechSynthesis.speak(utter)

      // Fake bars while speaking
      const fake = () => {
        setBars(Array.from({ length: 24 }, () => 0.2 + Math.random() * 0.7))
        rafRef.current = requestAnimationFrame(fake)
      }
      fake()
      return
    }

    setPlaying(false)
  }

  const playAudio = (src) => {
    if (audioRef.current) audioRef.current.pause()
    const audio = new Audio(src)
    audioRef.current = audio
    audio.crossOrigin = 'anonymous'
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))
    audio.addEventListener('timeupdate', () =>
      setProgress(audio.currentTime / (audio.duration || 1))
    )
    audio.addEventListener('ended', () => {
      setPlaying(false)
      cancelAnimationFrame(rafRef.current)
      setBars(Array(24).fill(0.2))
    })
    audio.play().catch(() => setPlaying(false))

    // Hook up Web Audio analyser if supported
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext
      const ctx = new Ctx()
      const source = ctx.createMediaElementSource(audio)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 64
      source.connect(analyser)
      analyser.connect(ctx.destination)
      analyserRef.current = analyser

      const data = new Uint8Array(analyser.frequencyBinCount)
      const tick = () => {
        analyser.getByteFrequencyData(data)
        const out = []
        const step = Math.floor(data.length / 24)
        for (let i = 0; i < 24; i++) {
          out.push(Math.max(0.1, data[i * step] / 255))
        }
        setBars(out)
        rafRef.current = requestAnimationFrame(tick)
      }
      tick()
    } catch {
      /* analyser not supported */
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              audioRef.current?.pause()
              window.speechSynthesis?.cancel()
              setOpen(false)
              setPlaying(false)
            }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-[#0a0a0c] p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow !mb-1.5">Voice intro</p>
                <h3 className="font-display text-[22px] font-semibold tracking-tight text-ink-50">
                  Hi from Ayush.
                </h3>
              </div>
              <button
                onClick={() => {
                  audioRef.current?.pause()
                  window.speechSynthesis?.cancel()
                  setOpen(false)
                  setPlaying(false)
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-white/[0.06] hover:text-ink-50"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-3 text-[14px] leading-relaxed text-ink-400">
              ~60 second introduction. Plays via your browser's voice if no audio file is configured.
            </p>

            {/* Waveform */}
            <div className="mt-6 flex h-16 items-end justify-center gap-1">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-full bg-gradient-to-t from-accent-blue to-accent transition-all duration-100"
                  style={{ height: `${Math.max(6, h * 64)}px` }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={play}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-50 text-ink-950 transition-transform hover:scale-105"
              >
                {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" fill="currentColor" />}
              </button>
              <div className="flex-1">
                <div className="h-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-ink-50 transition-all"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-ink-500">
                  <span>{format(progress * duration)}</span>
                  <span className="flex items-center gap-1">
                    <Volume2 size={11} />
                    {format(duration)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function format(s) {
  if (!s || !isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}
