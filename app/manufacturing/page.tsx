import type { Metadata } from "next"
import Image from "next/image"
import { Layers3, Recycle, Truck, Warehouse } from "lucide-react"
import { ViewportReveal } from "@/components/motion/viewport-reveal"
import { CtaSection } from "@/components/cta-section"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Manufacturing & Capabilities",
  alternates: { canonical: "/manufacturing" },
  description:
    "How Nantong Huarui Building Materials Co., Ltd. processes power-plant fly ash and slag for resource reuse.",
}

const steps = [
  {
    icon: Truck,
    title: "Sourcing",
    text: "Power-plant fly ash and slag are received for processing.",
  },
  {
    icon: Layers3,
    title: "Processing & classification",
    text: "Material is processed and classified into Fly Ash Grade I, Grade II and Grade III.",
  },
  {
    icon: Warehouse,
    title: "Storage",
    text: "Classified fly ash is stored ahead of dispatch to customers.",
  },
  {
    icon: Recycle,
    title: "Resource reuse",
    text: "Fly ash is supplied back into the construction materials industry for reuse.",
  },
]

const facilityGallery = [
  {
    src: "/assets/production-classification-equipment.jpg",
    alt: "Fly ash processing and classification equipment inside the Huarui facility",
    label: "Processing & classification",
  },
  {
    src: "/assets/production-control-room.jpg",
    alt: "Operator monitoring production equipment in the Huarui control room",
    label: "Production monitoring",
  },
  {
    src: "/assets/quality-testing-laboratory.jpg",
    alt: "Quality testing work in the Huarui laboratory",
    label: "Quality testing",
  },
  {
    src: "/assets/laboratory-equipment.jpg",
    alt: "Laboratory testing equipment used by Huarui",
    label: "Laboratory equipment",
  },
]

export default function ManufacturingPage() {
  return (
    <>
      <header className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ViewportReveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">Manufacturing</span>
            <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Processing Fly Ash for Reuse</h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {siteConfig.legalName} focuses on the resource utilization of power-plant fly ash and slag, based at{" "}
              {siteConfig.address}.
            </p>
          </ViewportReveal>
        </div>
      </header>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <ViewportReveal key={step.title} index={index} className="rounded-md border border-border p-6">
                <step.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <h2 className="mt-3 text-base font-semibold text-foreground">{step.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </ViewportReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <ViewportReveal className="relative aspect-[16/10] overflow-hidden rounded-md border border-border">
            <Image
              src="/assets/huarui-facility.jpg"
              alt="Huarui facility in Tongzhou District, Nantong"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </ViewportReveal>
          <ViewportReveal index={1}>
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">Facility</span>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Nantong, Jiangsu Since 2012</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Huarui has operated from Jinqiao Village, Pingdong Town Industrial Concentration Area, Tongzhou
              District, Nantong, Jiangsu, China, since {siteConfig.founded}. Specific equipment, process parameters
              and production details for an order are confirmed directly with our team upon inquiry.
            </p>
          </ViewportReveal>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <ViewportReveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">Inside the facility</span>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Customer-Supplied Production Photos</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Processing, production monitoring and laboratory testing at the Nantong facility.
            </p>
          </ViewportReveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {facilityGallery.map((item, index) => (
              <ViewportReveal key={item.src} index={index} className="overflow-hidden rounded-md border border-border bg-background">
                <div className="relative aspect-[4/3] bg-secondary/40">
                  <Image src={item.src} alt={item.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                <p className="px-4 py-3 text-sm font-medium text-foreground">{item.label}</p>
              </ViewportReveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
