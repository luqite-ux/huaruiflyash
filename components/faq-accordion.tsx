"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { FaqItem } from "@/lib/data/faq"
import { resolveLocaleText } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(items[0]?.slug ?? null)

  return (
    <div className="divide-y divide-border rounded-md border border-border bg-card">
      {items.map((item) => {
        const isOpen = openSlug === item.slug
        const panelId = `faq-panel-${item.slug}`
        const buttonId = `faq-button-${item.slug}`
        return (
          <div key={item.slug}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenSlug(isOpen ? null : item.slug)}
                className="control-affordance flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
              >
                <span className="text-sm font-medium text-foreground sm:text-base">
                  {resolveLocaleText(item.question)}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-primary transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground"
            >
              {resolveLocaleText(item.answer)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
