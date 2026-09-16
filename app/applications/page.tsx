import type { Metadata } from "next"
import { ApplicationCard } from "@/components/application-card"
import { ApplicationPath } from "@/components/application-path"
import { ViewportReveal } from "@/components/motion/viewport-reveal"
import { CtaSection } from "@/components/cta-section"
import { applications } from "@/lib/data/applications"

export const metadata: Metadata = {
  title: "Applications",
  alternates: { canonical: "/applications" },
  description:
    "How Huarui fly ash is used: concrete mineral admixture, cement production, fly-ash building products and infrastructure backfill.",
}

export default function ApplicationsPage() {
  return (
    <>
      <header className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ViewportReveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">Applications</span>
            <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Where Huarui Fly Ash Is Used</h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Processed fly ash from Huarui is supplied into four application areas: concrete mineral admixture,
              cement production, fly-ash bricks/aerated concrete blocks/panels, and infrastructure backfill.
            </p>
          </ViewportReveal>
        </div>
      </header>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <ViewportReveal>
            <ApplicationPath />
          </ViewportReveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {applications.map((application, index) => (
            <ViewportReveal key={application.slug} index={index}>
              <ApplicationCard application={application} />
            </ViewportReveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  )
}
