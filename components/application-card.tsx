import { Building2, Factory, Layers3, Warehouse } from "lucide-react"
import type { Application } from "@/lib/data/applications"
import { resolveLocaleText } from "@/lib/i18n"
import { getProductsByApplication } from "@/lib/data/products"
import Link from "next/link"

const icons = {
  concrete: Layers3,
  cement: Factory,
  brick: Building2,
  backfill: Warehouse,
} as const

export function ApplicationCard({ application }: { application: Application }) {
  const Icon = icons[application.icon]
  const relatedProducts = getProductsByApplication(application.slug)

  return (
    <div id={application.slug} className="flex flex-col rounded-md border border-border bg-card p-6 scroll-mt-24">
      <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-primary/10 text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{resolveLocaleText(application.name)}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {resolveLocaleText(application.description)}
      </p>
      {relatedProducts.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
          {relatedProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="control-affordance rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {product.grades.map(resolveLocaleText).join(" · ")}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
