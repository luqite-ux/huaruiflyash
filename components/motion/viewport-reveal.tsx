"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ViewportRevealProps {
  children: React.ReactNode
  className?: string
  /** Stagger index, 0-5. Each step adds 80ms of delay, capped at six items. */
  index?: number
  as?: "div" | "li"
}

/**
 * MOT-HR-03: bounded content settling.
 * Each section/item gets its own IntersectionObserver lifecycle and animates
 * exactly once on first viewport entry. Content is visible by default; the
 * ".reveal" class only hides it once the "js" class is present (see
 * app/layout.tsx and globals.css), so no-JS and observer-failure states are
 * never stuck invisible.
 */
export function ViewportReveal({ children, className, index = 0, as = "div" }: ViewportRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const staggerIndex = Math.min(index, 5)
  const Tag = as

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ "--reveal-delay": `${staggerIndex * 80}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  )
}
