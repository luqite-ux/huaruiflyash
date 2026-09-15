import type { Metadata } from "next"
import { FaqAccordion } from "@/components/faq-accordion"
import { ViewportReveal } from "@/components/motion/viewport-reveal"
import { CtaSection } from "@/components/cta-section"
import { faqItems } from "@/lib/data/faq"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Huarui fly ash products and inquiries.",
}

export default function FaqPage() {
  return (
    <>
      <header className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ViewportReveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">FAQ</span>
            <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Frequently Asked Questions</h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Answers to common questions about Huarui and our fly ash product family. For anything not covered
              here, please contact us directly.
            </p>
          </ViewportReveal>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <ViewportReveal>
          <FaqAccordion items={faqItems} />
        </ViewportReveal>
      </section>

      <CtaSection />
    </>
  )
}
