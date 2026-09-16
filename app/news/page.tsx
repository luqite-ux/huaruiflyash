import type { Metadata } from "next"
import Link from "next/link"
import { Newspaper } from "lucide-react"
import { ViewportReveal } from "@/components/motion/viewport-reveal"
import { getPublishedArticles } from "@/lib/articles-db"

export const revalidate = 60

export const metadata: Metadata = {
  title: "News",
  alternates: { canonical: "/news" },
  description: "Updates from Nantong Huarui Building Materials Co., Ltd.",
}

export default async function NewsPage() {
  const newsArticles = await getPublishedArticles()
  return (
    <>
      <header className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ViewportReveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">News</span>
            <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Company News</h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Updates from {"Huarui"} will be published here as they become available.
            </p>
          </ViewportReveal>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {newsArticles.length === 0 ? (
          <ViewportReveal className="mx-auto flex max-w-md flex-col items-center rounded-md border border-dashed border-border px-6 py-16 text-center">
            <Newspaper className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold text-foreground">No news articles yet</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Huarui has not published any news articles at this time. Please check back later, or{" "}
              <Link href="/contact" className="control-affordance font-medium text-primary hover:underline">
                contact us
              </Link>{" "}
              directly for the latest information.
            </p>
          </ViewportReveal>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsArticles.map((article, index) => (
              <ViewportReveal key={article.slug} index={index} as="li">
                <Link
                  href={`/news/${article.slug}`}
                  className="control-affordance block rounded-md border border-border p-6 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <time dateTime={article.publishedAt} className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="mt-2 text-lg font-semibold text-foreground">{article.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {article.excerpt}
                  </p>
                </Link>
              </ViewportReveal>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
