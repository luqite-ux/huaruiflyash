import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Product } from "@/lib/data/products"
import { resolveLocaleText } from "@/lib/i18n"

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="control-affordance group flex flex-col overflow-hidden rounded-md border border-border bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
        <Image
          src={product.image.src || "/placeholder.svg"}
          alt={resolveLocaleText(product.image.alt)}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.025]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-primary">
          {product.grades.map(resolveLocaleText).join(" · ")}
        </span>
        <h3 className="mt-1 text-lg font-semibold text-foreground">{resolveLocaleText(product.name)}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {resolveLocaleText(product.summary)}
        </p>
        <span className="control-affordance mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
          View specifications
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
