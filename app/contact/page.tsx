import type { Metadata } from "next"
import Link from "next/link"
import { Mail, MapPin, MessageCircle, Phone, ArrowRight } from "lucide-react"
import { ViewportReveal } from "@/components/motion/viewport-reveal"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
  description: `Contact ${siteConfig.legalName} in Nantong, Jiangsu, China.`,
}

const channels = [
  {
    icon: MapPin,
    label: "Address",
    value: siteConfig.address,
    href: undefined,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: siteConfig.phone,
    href: siteConfig.whatsappHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
]

export default function ContactPage() {
  return (
    <>
      <header className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ViewportReveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">Contact</span>
            <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Get in Touch</h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Reach {siteConfig.legalName} directly using the details below, or submit a Request a Quote for
              product-specific inquiries.
            </p>
          </ViewportReveal>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {channels.map((channel, index) => (
            <ViewportReveal key={channel.label} index={index} className="flex items-start gap-4 rounded-md border border-border p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
                <channel.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {channel.label}
                </h2>
                {channel.href ? (
                  <a
                    href={channel.href}
                    className="control-affordance mt-1 inline-block text-base font-medium text-foreground hover:text-primary rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {channel.value}
                  </a>
                ) : (
                  <p className="mt-1 text-base font-medium text-foreground">{channel.value}</p>
                )}
              </div>
            </ViewportReveal>
          ))}
        </div>

        <ViewportReveal index={4} className="mt-10 flex flex-col items-start gap-4 rounded-md border border-border bg-secondary/30 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Have a product inquiry?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Use the Request a Quote form to share your target product and purchasing requirements.
            </p>
          </div>
          <Button asChild size="lg" className="control-affordance group shrink-0">
            <Link href="/rfq">
              Request a Quote
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </ViewportReveal>
      </section>
    </>
  )
}
