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

export const products: Product[] = [
  {
    slug: "grade-i-fly-ash",
    category: { en: "Fly Ash" },
    grades: [{ en: "Grade I" }],
    name: { en: "Grade I Fly Ash" },
    summary: {
      en: "Grade I fly ash for order-specific concrete and construction-material requirements.",
    },
    description: {
      en: "Grade I Fly Ash is one of the three fly ash grades supplied by Huarui. Typical uses may include concrete mineral admixture and other construction-material applications. Applicable technical requirements are confirmed directly for each order.",
    },
    applicationSlugs: ["concrete-admixture", "cement-production", "building-products", "infrastructure-backfill"],
    image: {
      src: "/assets/grade-i-fly-ash.png",
      alt: { en: "Grade I fly ash supplied in white industrial bulk bags" },
    },
  },
  {
    slug: "grade-ii-fly-ash",
    category: { en: "Fly Ash" },
    grades: [{ en: "Grade II" }],
    name: { en: "Grade II Fly Ash" },
    summary: { en: "Grade II fly ash for concrete, cement and building-product applications." },
    description: {
      en: "Grade II Fly Ash is one of the three fly ash grades supplied by Huarui. Typical uses may include concrete, cement production and fly-ash building products. Applicable technical requirements are confirmed directly for each order.",
    },
    applicationSlugs: ["concrete-admixture", "cement-production", "building-products", "infrastructure-backfill"],
    image: {
      src: "/assets/grade-ii-fly-ash.png",
      alt: { en: "Grade II fly ash sample with industrial bulk bags" },
    },
  },
  {
    slug: "grade-iii-fly-ash",
    category: { en: "Fly Ash" },
    grades: [{ en: "Grade III" }],
    name: { en: "Grade III Fly Ash" },
    summary: { en: "Grade III fly ash for suitable building-product and infrastructure applications." },
    description: {
      en: "Grade III Fly Ash is one of the three fly ash grades supplied by Huarui. Typical uses may include suitable building products and infrastructure backfill. Applicable technical requirements are confirmed directly for each order.",
    },
    applicationSlugs: ["building-products", "infrastructure-backfill"],
    image: {
      src: "/assets/grade-iii-fly-ash.png",
      alt: { en: "Grade III fly ash prepared beside industrial bulk bags" },
    },
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getProductsByApplication(applicationSlug: string): Product[] {
  return products.filter((product) => product.applicationSlugs.includes(applicationSlug))
}
