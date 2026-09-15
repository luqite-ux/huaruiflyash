import type { Metadata } from "next"
import { MapPin, Calendar, Recycle } from "lucide-react"
import { ViewportReveal } from "@/components/motion/viewport-reveal"
import { CtaSection } from "@/components/cta-section"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.legalName}, founded in ${siteConfig.founded} in Nantong, Jiangsu, China.`,
}

const facts = [
  { icon: Calendar, label: "Founded", value: `${siteConfig.founded}` },
  { icon: MapPin, label: "Location", value: "Tongzhou District, Nantong, Jiangsu, China" },
  { icon: Recycle, label: "Focus", value: "Resource utilization of power-plant fly ash and slag" },
]

export default function AboutPage() {
  return (
    <>
      <header className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ViewportReveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">About Huarui</span>
            <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">{siteConfig.legalName}</h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Founded in {siteConfig.founded} in Nantong, Jiangsu, Huarui focuses on the resource utilization of
              power-plant fly ash and slag, supplying Fly Ash in Grade I, Grade II and Grade III to the construction
              materials industry.
            </p>
          </ViewportReveal>
        </div>
      </header>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {facts.map((fact, index) => (
              <ViewportReveal key={fact.label} index={index} className="rounded-md border border-border p-6">
                <fact.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <h2 className="mt-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {fact.label}
                </h2>
                <p className="mt-1 text-base font-medium text-foreground">{fact.value}</p>
              </ViewportReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ViewportReveal className="max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Our Focus</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {siteConfig.legalName} processes power-plant fly ash and slag for resource reuse. Our product family —
            Fly Ash in Grade I, Grade II and Grade III — is supplied for use as a concrete mineral admixture, a raw
            material in cement production, a component in fly-ash bricks, aerated concrete blocks and panels, and
            for infrastructure backfill.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We work directly with buyers to confirm grade, quantity and other purchasing requirements for every
            inquiry.
          </p>
        </ViewportReveal>
      </section>

      <CtaSection />
    </>
  )
}
