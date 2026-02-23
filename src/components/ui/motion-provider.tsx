"use client"

import * as React from 'react'
import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

type MotionContextType = {
  reducedMotion: boolean;
  duration: number;
}

const MotionContext = React.createContext<MotionContextType | undefined>(undefined)

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion()
  // allow a short client-side override in future; for now mirror system pref
  const [reducedMotion] = useState(Boolean(prefersReduced))

  // central motion timing token
  const duration = reducedMotion ? 0 : 0.22

  useEffect(() => {
    // ensure body attr for global reduced motion styling if needed
    if (reducedMotion) document.body.setAttribute('data-reduced-motion', 'true')
    else document.body.removeAttribute('data-reduced-motion')
  }, [reducedMotion])

  return (
    <MotionContext.Provider value={{ reducedMotion, duration }}>
      {children}
    </MotionContext.Provider>
  )
}

export function useMotionSettings() {
  const ctx = React.useContext(MotionContext)
  if (!ctx) return { reducedMotion: true, duration: 0 }
  return ctx
}
