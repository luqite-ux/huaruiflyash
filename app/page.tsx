import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Recycle, ShieldCheck, Factory } from "lucide-react"
import { BannerCarousel } from "@/components/banner-carousel"
import { ApplicationPath } from "@/components/application-path"
import { ProductCard } from "@/components/product-card"
import { ViewportReveal } from "@/components/motion/viewport-reveal"
import { CtaSection } from "@/components/cta-section"
import { Button } from "@/components/ui/button"
import { fetchProductsData } from "@/lib/products-db"
import { siteConfig } from "@/lib/site-config"

export const revalidate = 60
export default async function HomePage() {
  const products = await fetchProductsData()
  return (
    <>
      <BannerCarousel />

      <section aria-labelledby="intro-heading" className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <ViewportReveal className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">About Huarui</span>
            <h2 id="intro-heading" className="mt-2 text-balance text-3xl font-bold text-foreground sm:text-4xl">
              Founded in {siteConfig.founded}, focused on resource utilization of fly ash and slag
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {siteConfig.legalName} is based in Nantong, Jiangsu, China. Our work centers on processing power-plant
              fly ash and slag so it can be reused as a construction material rather than discarded, supplying
              customers with Fly Ash in Grade I, Grade II and Grade III.
            </p>
          </ViewportReveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Recycle,
                title: "Resource reuse",
                text: "Power-plant fly ash and slag are processed for reuse rather than disposal.",
              },
              {
                icon: Factory,
                title: "One product family",
                text: "Fly Ash in Grade I, Grade II and Grade III, classified for different applications.",
              },
              {
                icon: ShieldCheck,
                title: "Direct communication",
                text: "Purchasing requirements are confirmed directly with our team for every inquiry.",
              },
            ].map((item, index) => (
              <ViewportReveal key={item.title} index={index} className="rounded-md border border-border p-6">
                <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="mt-3 text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </ViewportReveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="products-heading" className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <ViewportReveal>
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">Products</span>
              <h2 id="products-heading" className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                Three Fly Ash Grades
              </h2>
            </ViewportReveal>
            <ViewportReveal>
              <Button asChild variant="outline" className="control-affordance group">
                <Link href="/products">
                  View all products
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </ViewportReveal>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <ViewportReveal key={product.slug} index={index}>
                <ProductCard product={product} />
              </ViewportReveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="applications-heading" className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <ViewportReveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">From Source to Reuse</span>
            <h2 id="applications-heading" className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              One material, four application paths
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Fly ash processed by Huarui flows into concrete admixture, cement production, fly-ash building
              products and infrastructure backfill.
            </p>
          </ViewportReveal>
          <ViewportReveal className="mt-12">
            <ApplicationPath />
          </ViewportReveal>
        </div>
      </section>

      <section aria-labelledby="facility-heading" className="border-b border-border bg-secondary/30">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:items-center">
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
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">Where We Operate</span>
            <h2 id="facility-heading" className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              Based in Tongzhou District, Nantong
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {siteConfig.legalName} operates from {siteConfig.address}. Our team works directly with buyers to
              confirm requirements for each order.
            </p>
            <Button asChild className="control-affordance group mt-6">
              <Link href="/manufacturing">
                Manufacturing &amp; capabilities
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </ViewportReveal>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
