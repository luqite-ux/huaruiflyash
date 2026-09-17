import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { siteConfig } from '@/lib/site-config'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.legalName} | Fly Ash Supplier, Nantong, China`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: `${siteConfig.legalName} processes power-plant fly ash and slag for resource reuse, supplying Fly Ash Grade I, II and III for concrete, cement and building products. Request a quote.`,
  generator: siteConfig.shortName,
  openGraph: {
    title: siteConfig.legalName,
    description: siteConfig.focus,
    url: siteConfig.url,
    siteName: siteConfig.legalName,
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      en: siteConfig.url,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B4DA1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Adds the "js" class synchronously so MOT-HR-01/02/03 animations are
            a strict progressive enhancement: no-JS visitors and observer
            failures always see fully visible, unanimated content. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context':'https://schema.org','@graph':[
            {'@type':'Organization','@id':`${siteConfig.url}/#organization`,name:siteConfig.legalName,url:siteConfig.url,logo:`${siteConfig.url}/assets/huarui-logo.svg`,email:siteConfig.email,telephone:siteConfig.phone,address:{'@type':'PostalAddress',streetAddress:siteConfig.address,addressLocality:'Nantong',addressRegion:'Jiangsu',addressCountry:'CN'}},
            {'@type':'WebSite','@id':`${siteConfig.url}/#website`,url:siteConfig.url,name:siteConfig.legalName,inLanguage:'en',publisher:{'@id':`${siteConfig.url}/#organization`}}
          ]
        }) }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
