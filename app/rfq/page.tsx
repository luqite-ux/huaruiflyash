import type { Metadata } from "next"
import { ViewportReveal } from "@/components/motion/viewport-reveal"
import { RfqForm } from "@/components/rfq-form"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Request a Quote",
  description: `Submit a fly ash purchasing inquiry to ${siteConfig.legalName}.`,
}

export default function RfqPage() {
  return (
    <>
      <header className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <ViewportReveal>
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">Request a Quote</span>
            <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Tell Us What You Need</h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Share your target product and purchasing requirements below. No prices are published on this site —
              our team will follow up directly with a quotation once we understand your requirements.
            </p>
          </ViewportReveal>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <ViewportReveal>
          <RfqForm />
        </ViewportReveal>
      </section>
    </>
  )
}
