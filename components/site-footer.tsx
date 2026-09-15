import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"
import { HuaruiLogo } from "@/components/huarui-logo"
import { navLinks, siteConfig } from "@/lib/site-config"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="control-affordance inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <HuaruiLogo />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.legalName}, founded in {siteConfig.founded} in Nantong, Jiangsu. {siteConfig.focus}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-foreground">Navigate</h2>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="control-affordance text-sm text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-foreground">Products</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/products/fly-ash" className="control-affordance text-sm text-muted-foreground hover:text-primary rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  Fly Ash — Grade I, II &amp; III
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-foreground">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={siteConfig.phoneHref} className="control-affordance hover:text-primary rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} className="control-affordance hover:text-primary rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.legalName.replace(/[.;:!?。；：！？\s]+$/u, "")}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
