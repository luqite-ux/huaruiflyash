import type { LocalizedText } from "@/lib/i18n"

export interface NewsArticle {
  slug: string
  title: LocalizedText
  excerpt: LocalizedText
  body: LocalizedText[]
  publishedAt: string // ISO date
  coverImage?: { src: string; alt: LocalizedText }
}

// No verified news content has been supplied yet. This array is intentionally
// empty and is read by /news and /news/[slug] so that publishing real
// articles later (e.g. from a CMS or database) requires no template changes.
export const newsArticles: NewsArticle[] = []

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug)
}
