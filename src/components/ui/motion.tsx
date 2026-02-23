"use client"

import { motion, useReducedMotion, MotionProps } from "framer-motion"
import * as React from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 6, scale: 0.995 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: [0.2, 0.8, 0.2, 1] } },
  exit: { opacity: 0, y: 6, scale: 0.995, transition: { duration: 0.16 } },
}

export function useMotionReduced() {
  return useReducedMotion()
}

export function MotionDiv(props: MotionProps & React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) {
  const shouldReduce = useReducedMotion()
  if (shouldReduce) {
    const { children, ...rest } = props
    // Render a plain div if user prefers reduced motion
    return <div {...(rest as any)}>{children}</div>
  }

  return <motion.div initial="initial" animate="animate" exit="exit" variants={fadeInUp} {...props} />
}

export { motion }
