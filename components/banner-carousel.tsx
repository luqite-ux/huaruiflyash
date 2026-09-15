"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Slide {
  src: string
  alt: string
  headline: string
  description: string
  ctaHref: string
  ctaLabel: string
}

const slides: Slide[] = [
  {
    src: "/assets/banner-1.jpg",
    alt: "Aerial view of a coastal bulk material terminal with storage silos and stockpiles",
    headline: "Resource Utilization of Power-Plant Fly Ash & Slag",
    description:
      "Nantong Huarui Building Materials Co., Ltd. processes power-plant fly ash and slag for reuse across concrete, cement and building products.",
    ctaHref: "/rfq",
    ctaLabel: "Request a Quote",
  },
  {
    src: "/assets/banner-2.jpg",
    alt: "Processing equipment and storage silos at a fly ash processing facility",
    headline: "Fly Ash in Grade I, Grade II & Grade III",
    description:
      "One product family, classified to suit concrete admixture, cement production and building-product applications.",
    ctaHref: "/products",
    ctaLabel: "View Products",
  },
  {
    src: "/assets/banner-3.jpg",
    alt: "Fly ash storage silos beside a power plant at dusk",
    headline: "Based in Nantong, Jiangsu Since 2012",
    description: "Supplying fly ash for construction materials from Tongzhou District, Nantong, Jiangsu, China.",
    ctaHref: "/contact",
    ctaLabel: "Contact Us",
  },
]

const AUTOPLAY_MS = 6500

export function BannerCarousel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [tabHidden, setTabHidden] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const goTo = useCallback((index: number) => {
    setActive(((index % slides.length) + slides.length) % slides.length)
  }, [])

  const next = useCallback(() => goTo(active + 1), [active, goTo])
  const prev = useCallback(() => goTo(active - 1), [active, goTo])

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden)
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [])

  useEffect(() => {
    if (paused || tabHidden) return
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setActive((a) => (a + 1) % slides.length), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, tabHidden])

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Huarui highlights"
      className="relative overflow-hidden bg-secondary"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="relative aspect-[16/9] w-full sm:aspect-[16/7] lg:aspect-[1920/800]"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return
          const delta = e.changedTouches[0].clientX - touchStartX.current
          if (delta > 40) prev()
          else if (delta < -40) next()
          touchStartX.current = null
        }}
      >
        {slides.map((slide, index) => {
          const isActive = index === active
          return (
            <div
              key={slide.src}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-out",
                isActive ? "z-10 opacity-100" : "z-0 opacity-0",
              )}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.src || "/placeholder.svg"}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-[center_38%] sm:object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10 sm:bg-gradient-to-r sm:from-black/70 sm:via-black/30 sm:to-transparent" />

              {/* MOT-HR-01: confined particulate drift accent, background only. */}
              <div
                className="pointer-events-none absolute inset-0 overflow-hidden"
                data-particles-paused={paused || tabHidden || !isActive}
                aria-hidden="true"
              >
                {isActive &&
                  Array.from({ length: 10 }).map((_, i) => (
                    <span
                      key={i}
                      className="particle"
                      style={
                        {
                          left: `${8 + i * 9}%`,
                          bottom: "-4%",
                          width: `${3 + (i % 3)}px`,
                          height: `${3 + (i % 3)}px`,
                          "--particle-duration": `${7 + (i % 4)}s`,
                          "--particle-delay": `${i * 0.5}s`,
                          "--particle-opacity": "0.3",
                        } as React.CSSProperties
                      }
                    />
                  ))}
              </div>

              {/* MOT-HR-01: veil sweep on transition, decorative only. */}
              <div className={cn("banner-veil pointer-events-none absolute inset-0", isActive && "is-active")}>
                <div className="h-full w-1/3 bg-white/20" />
              </div>

              <div className="relative z-20 flex h-full items-end sm:items-center">
                <div className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 sm:pb-0 lg:px-8">
                  <div className="max-w-md sm:max-w-lg">
                    <h1 className="text-balance text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                      {slide.headline}
                    </h1>
                    <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base">{slide.description}</p>
                    <Button asChild size="lg" className="control-affordance group mt-5">
                      <Link href={slide.ctaHref}>
                        {slide.ctaLabel}
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="absolute inset-x-0 bottom-3 z-30 flex items-center justify-center gap-3 sm:bottom-4">
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="control-affordance h-9 w-9 bg-white/90 text-foreground hover:bg-white"
          onClick={prev}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Show slide ${index + 1}: ${slide.headline}`}
              onClick={() => goTo(index)}
              className={cn(
                "control-affordance h-2.5 w-2.5 rounded-full border border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                index === active ? "bg-white" : "bg-white/30",
              )}
            />
          ))}
        </div>

        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="control-affordance h-9 w-9 bg-white/90 text-foreground hover:bg-white"
          onClick={next}
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="control-affordance h-9 w-9 bg-white/90 text-foreground hover:bg-white"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play carousel" : "Pause carousel"}
          aria-pressed={paused}
        >
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </Button>
      </div>
    </section>
  )
}
