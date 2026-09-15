"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { applications } from "@/lib/data/applications"
import { resolveLocaleText } from "@/lib/i18n"
import { cn } from "@/lib/utils"

/**
 * MOT-HR-02: particle-to-structure application path.
 * A single connecting path (fly ash -> concrete -> cement -> building
 * products -> infrastructure backfill) reveals its nodes only on viewport
 * entry, once. Desktop renders the path horizontally; on narrow viewports
 * (<=640px) it switches to a vertical layout so every node stays fully
 * visible without horizontal scrolling.
 */
export function ApplicationPath() {
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
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const nodes = [{ slug: "fly-ash", name: "Fly Ash", href: "/products", isSource: true }, ...applications.map((a) => ({
    slug: a.slug,
    name: resolveLocaleText(a.shortName),
    href: `/applications#${a.slug}`,
    isSource: false,
  }))]

  return (
    <div ref={ref} className="w-full">
      {/* Vertical layout: default and <=640px */}
      <ol className="flex flex-col gap-0 sm:hidden" aria-label="Fly ash application path">
        {nodes.map((node, index) => (
          <li key={node.slug} className="flex gap-4">
            <div className="flex flex-col items-center">
              <PathNodeDot visible={visible} delay={index * 120} />
              {index < nodes.length - 1 && (
                <div
                  className={cn(
                    "w-px flex-1 bg-border transition-all duration-500",
                    visible ? "opacity-100" : "opacity-0",
                  )}
                  style={{ transitionDelay: `${index * 120 + 80}ms`, minHeight: "2.5rem" }}
                  aria-hidden="true"
                />
              )}
            </div>
            <div className="pb-8">
              <PathNodeLabel node={node} visible={visible} delay={index * 120} />
            </div>
          </li>
        ))}
      </ol>

      {/* Horizontal layout: >640px */}
      <ol className="hidden items-start justify-between gap-2 sm:flex" aria-label="Fly ash application path">
        {nodes.map((node, index) => (
          <li key={node.slug} className="flex flex-1 flex-col items-center text-center">
            <div className="flex w-full items-center">
              {index > 0 && (
                <div
                  className={cn("h-px flex-1 bg-border transition-all duration-500")}
                  style={{
                    transitionDelay: `${index * 120}ms`,
                    transform: visible ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                  }}
                  aria-hidden="true"
                />
              )}
              <PathNodeDot visible={visible} delay={index * 120} />
              {index < nodes.length - 1 && (
                <div
                  className={cn("h-px flex-1 bg-border transition-all duration-500")}
                  style={{
                    transitionDelay: `${index * 120}ms`,
                    transform: visible ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                  }}
                  aria-hidden="true"
                />
              )}
            </div>
            <div className="mt-3">
              <PathNodeLabel node={node} visible={visible} delay={index * 120} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function PathNodeDot({ visible, delay }: { visible: boolean; delay: number }) {
  return (
    <span
      className="control-affordance flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background transition-all duration-400"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.6)",
      }}
      aria-hidden="true"
    >
      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
    </span>
  )
}

function PathNodeLabel({
  node,
  visible,
  delay,
}: {
  node: { slug: string; name: string; href: string; isSource: boolean }
  visible: boolean
  delay: number
}) {
  const content = (
    <span
      className="inline-block text-sm font-medium text-foreground transition-all duration-400"
      style={{
        transitionDelay: `${delay + 60}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
      }}
    >
      {node.name}
    </span>
  )
  if (node.isSource) return content
  return (
    <Link
      href={node.href}
      className="control-affordance rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {content}
    </Link>
  )
}
