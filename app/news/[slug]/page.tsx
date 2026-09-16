import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { ViewportReveal } from "@/components/motion/viewport-reveal"
import { getArticleBySlug } from "@/lib/articles-db"
import { siteConfig } from "@/lib/site-config"

export const revalidate = 60
export const dynamicParams = true

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: { title: article.title, description: article.excerpt, type: "article", url: `/news/${article.slug}`, publishedTime: article.publishedAt, images: article.featuredImage ? [article.featuredImage] : undefined },
  }
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({'@context':'https://schema.org','@type':'Article','@id':`${siteConfig.url}/news/${article.slug}#article`,headline:article.title,description:article.excerpt,datePublished:article.publishedAt,dateModified:article.publishedAt,image:article.featuredImage?[article.featuredImage]:undefined,author:{'@id':`${siteConfig.url}/#organization`},publisher:{'@id':`${siteConfig.url}/#organization`},mainEntityOfPage:`${siteConfig.url}/news/${article.slug}`}) }} />
      <nav aria-label="Breadcrumb" className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-3xl px-4 py-4 text-sm text-muted-foreground sm:px-6 lg:px-8">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/news" className="control-affordance hover:text-primary rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                News
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <li aria-current="page" className="text-foreground">
              {article.title}
            </li>
          </ol>
        </div>
      </nav>

      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <ViewportReveal>
          <time dateTime={article.publishedAt} className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">{article.title}</h1>
        </ViewportReveal>

        <ViewportReveal className="article-prose mt-8 text-base leading-relaxed text-muted-foreground">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </ViewportReveal>
      </article>
    </>
  )
}
