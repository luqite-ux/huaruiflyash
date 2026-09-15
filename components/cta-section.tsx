import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaSection({
  title = "Ready to discuss your fly ash requirements?",
  description = "Submit your target product, purchasing requirements and contact details, and our team will respond directly.",
}: {
  title?: string
  description?: string
}) {
  return (
    <section className="border-t border-border bg-primary">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-5 px-4 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <h2 className="text-balance text-2xl font-bold text-primary-foreground sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
            {description}
          </p>
        </div>
        <Button asChild size="lg" variant="secondary" className="control-affordance group shrink-0">
          <Link href="/rfq">
            Request a Quote
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
