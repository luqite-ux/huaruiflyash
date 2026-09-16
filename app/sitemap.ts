import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"
import { fetchProductsData } from "@/lib/products-db"
import { getPublishedArticles } from "@/lib/articles-db"

export const revalidate = 60
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, newsArticles] = await Promise.all([fetchProductsData(), getPublishedArticles()])
  const staticRoutes = [
    "",
    "/products",
    "/applications",
    "/manufacturing",
    "/quality",
    "/about",
    "/faq",
    "/news",
    "/contact",
    "/rfq",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }))

  const productRoutes = products.map((product) => ({
    url: `${siteConfig.url}/products/${product.slug}`,
    lastModified: new Date(),
  }))

  const newsRoutes = newsArticles.map((article) => ({
    url: `${siteConfig.url}/news/${article.slug}`,
    lastModified: article.publishedAt || new Date(),
  }))

  return [...staticRoutes, ...productRoutes, ...newsRoutes]
}
