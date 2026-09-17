import type { Metadata } from "next"
import { ProductCard } from "@/components/product-card"
import { ViewportReveal } from "@/components/motion/viewport-reveal"
import { CtaSection } from "@/components/cta-section"
import { fetchProductsData } from "@/lib/products-db"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Products",
  alternates: { canonical: "/products" },
  description: "Fly Ash in Grade I, Grade II and Grade III from Nantong Huarui Building Materials Co., Ltd.",
}

export default async function ProductsPage() {
  const products = await fetchProductsData()
  return (
    <>
      <header className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ViewportReveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">Products</span>
            <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Fly Ash by Grade</h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Compare Grade I, Grade II and Grade III Fly Ash as three purchasing options within the same product
              family. Confirm the applicable grade and order-specific requirements with our team.
            </p>
          </ViewportReveal>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ViewportReveal key={product.slug} index={index}>
              <ProductCard product={product} />
            </ViewportReveal>
          ))}
        </div>
      </section>

      <CtaSection
        title="Have a specific grade or specification in mind?"
        description="Tell us your target grade, application and quantity and we will follow up directly."
      />
    </>
  )
}
