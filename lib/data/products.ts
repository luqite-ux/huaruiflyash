import type { LocalizedText } from "@/lib/i18n"

export interface Product {
  slug: string
  category: LocalizedText
  grades: LocalizedText[]
  name: LocalizedText
  summary: LocalizedText
  description: LocalizedText
  applicationSlugs: string[]
  image: { src: string; alt: LocalizedText }
}

// Fly Ash in Grade I, Grade II and Grade III are specifications within one
// real product family supplied by Huarui — not separate invented product lines.
export const products: Product[] = [
  {
    slug: "fly-ash",
    category: { en: "Fly Ash" },
    grades: [{ en: "Grade I" }, { en: "Grade II" }, { en: "Grade III" }],
    name: { en: "Fly Ash" },
    summary: {
      en: "Processed power-plant fly ash supplied in Grade I, Grade II and Grade III for construction-material applications.",
    },
    description: {
      en: "Huarui processes power-plant fly ash for resource reuse and supplies it as one product family in Grade I, Grade II and Grade III. Typical uses include concrete mineral admixture, cement production, fly-ash building products and infrastructure backfill. The applicable grade and order-specific requirements are confirmed directly for each inquiry.",
    },
    applicationSlugs: ["concrete-admixture", "cement-production", "building-products", "infrastructure-backfill"],
    image: {
      src: "/assets/product-fly-ash.jpg",
      alt: { en: "Fly ash product packaged in bulk bags ready for shipment" },
    },
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getProductsByApplication(applicationSlug: string): Product[] {
  return products.filter((product) => product.applicationSlugs.includes(applicationSlug))
}
