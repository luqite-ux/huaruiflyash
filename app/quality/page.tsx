import type { Metadata } from "next"
import { ClipboardCheck, FlaskConical, PackageCheck } from "lucide-react"
import { ViewportReveal } from "@/components/motion/viewport-reveal"
import { CtaSection } from "@/components/cta-section"

export const metadata: Metadata = {
  title: "Quality",
  alternates: { canonical: "/quality" },
  description: "How Huarui approaches quality and communication for fly ash orders.",
}

const commitments = [
  {
    icon: FlaskConical,
    title: "Grade classification",
    text: "Fly ash is processed and classified into Grade I, Grade II and Grade III before dispatch.",
  },
  {
    icon: ClipboardCheck,
    title: "Order-specific confirmation",
    text: "Specifications, test data and documentation relevant to a specific order are discussed directly with our team after an inquiry is submitted.",
  },
  {
    icon: PackageCheck,
    title: "Direct communication",
    text: "Buyers can reach our team by phone, WhatsApp, email or the Request a Quote form to confirm requirements before ordering.",
  },
]

export default function QualityPage() {
  return (
    <>
      <header className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ViewportReveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">Quality</span>
            <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Quality &amp; Communication</h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              We confirm grade, specification and documentation directly with buyers for each inquiry rather than
              publishing generalized claims. Please reach out with your requirements so our team can respond
              accurately.
            </p>
          </ViewportReveal>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {commitments.map((item, index) => (
            <ViewportReveal key={item.title} index={index} className="rounded-md border border-border p-6">
              <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              <h2 className="mt-3 text-base font-semibold text-foreground">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </ViewportReveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  )
}
