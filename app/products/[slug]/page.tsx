import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ChevronRight } from "lucide-react"
import { ViewportReveal } from "@/components/motion/viewport-reveal"
import { CtaSection } from "@/components/cta-section"
import { Button } from "@/components/ui/button"
import { fetchProductBySlug } from "@/lib/products-db"
import { getApplicationBySlug } from "@/lib/data/applications"
import { resolveLocaleText } from "@/lib/i18n"
import { siteConfig } from "@/lib/site-config"

export const revalidate = 60
export const dynamicParams = true

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await fetchProductBySlug(slug)
  if (!product) return {}
  return {
    title: resolveLocaleText(product.name),
    description: resolveLocaleText(product.summary),
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: resolveLocaleText(product.name), description: resolveLocaleText(product.summary), type: "website", url: `/products/${product.slug}`, images: [product.image.src] },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await fetchProductBySlug(slug)
  if (!product) notFound()

  const relatedApplications = product.applicationSlugs
    .map((appSlug) => getApplicationBySlug(appSlug))
    .filter((app): app is NonNullable<typeof app> => Boolean(app))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({'@context':'https://schema.org','@type':'Product','@id':`${siteConfig.url}/products/${product.slug}#product`,name:resolveLocaleText(product.name),description:resolveLocaleText(product.description),image:[product.image.src.startsWith('http')?product.image.src:`${siteConfig.url}${product.image.src}`],brand:{'@type':'Brand',name:siteConfig.shortName},manufacturer:{'@id':`${siteConfig.url}/#organization`},url:`${siteConfig.url}/products/${product.slug}`}) }} />
      <nav aria-label="Breadcrumb" className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-4 text-sm text-muted-foreground sm:px-6 lg:px-8">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/products" className="control-affordance hover:text-primary rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Products
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <li aria-current="page" className="text-foreground">
              {resolveLocaleText(product.name)}
            </li>
          </ol>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <ViewportReveal className="relative aspect-square overflow-hidden rounded-md border border-border bg-secondary">
            <Image
              src={product.image.src || "/placeholder.svg"}
              alt={resolveLocaleText(product.image.alt)}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain p-6"
              priority
            />
          </ViewportReveal>

          <ViewportReveal index={1}>
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">
              {resolveLocaleText(product.category)} · {product.grades.map(resolveLocaleText).join(" · ")}
            </span>
            <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              {resolveLocaleText(product.name)}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {resolveLocaleText(product.description)}
            </p>

            <div className="mt-6">
              <h2 className="text-sm font-semibold text-foreground">Available grades</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {product.grades.map((grade) => (
                  <li key={resolveLocaleText(grade)} className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground">
                    {resolveLocaleText(grade)}
                  </li>
                ))}
              </ul>
            </div>

            {relatedApplications.length > 0 && (
              <div className="mt-6">
                <h2 className="text-sm font-semibold text-foreground">Typical applications</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {relatedApplications.map((application) => (
                    <li key={application.slug}>
                      <Link
                        href={`/applications#${application.slug}`}
                        className="control-affordance rounded-full border border-border px-3 py-1.5 text-sm text-foreground hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {resolveLocaleText(application.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="control-affordance group">
                <Link href={`/rfq?product=${product.slug}`}>
                  Request a Quote
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="control-affordance">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </ViewportReveal>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
