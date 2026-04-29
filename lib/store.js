'use client'
import { create } from 'zustand'

export const useUI = create((set) => ({
  chatOpen: false,
  voiceOpen: false,
  setChatOpen: (v) => set({ chatOpen: v }),
  setVoiceOpen: (v) => set({ voiceOpen: v }),
}))
