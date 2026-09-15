import type { LocalizedText } from "@/lib/i18n"

export interface Application {
  slug: string
  name: LocalizedText
  shortName: LocalizedText
  description: LocalizedText
  icon: "concrete" | "cement" | "brick" | "backfill"
}

export const applications: Application[] = [
  {
    slug: "concrete-admixture",
    name: { en: "Concrete Mineral Admixture" },
    shortName: { en: "Concrete" },
    description: {
      en: "Processed fly ash is supplied as a mineral admixture for concrete mixes.",
    },
    icon: "concrete",
  },
  {
    slug: "cement-production",
    name: { en: "Cement Production" },
    shortName: { en: "Cement" },
    description: {
      en: "Fly ash is used as a raw material input within cement production.",
    },
    icon: "cement",
  },
  {
    slug: "building-products",
    name: { en: "Fly-Ash Bricks, Aerated Concrete Blocks & Panels" },
    shortName: { en: "Building Products" },
    description: {
      en: "Fly ash is incorporated into fly-ash bricks, aerated concrete blocks and panels.",
    },
    icon: "brick",
  },
  {
    slug: "infrastructure-backfill",
    name: { en: "Infrastructure Backfill" },
    shortName: { en: "Backfill" },
    description: {
      en: "Fly ash is used as a backfill material in infrastructure construction.",
    },
    icon: "backfill",
  },
]

export function getApplicationBySlug(slug: string): Application | undefined {
  return applications.find((application) => application.slug === slug)
}
