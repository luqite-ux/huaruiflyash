import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"
import { products } from "@/lib/data/products"
import { newsArticles } from "@/lib/data/news"

export default function sitemap(): MetadataRoute.Sitemap {
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
    lastModified: article.publishedAt,
  }))

  return [...staticRoutes, ...productRoutes, ...newsRoutes]
}
