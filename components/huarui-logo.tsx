import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * Official raster logo cropped without redrawing from 画册.pdf page 1.
 */
export function HuaruiLogo({ className, showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={showWordmark ? "/assets/huarui-logo.svg" : "/assets/huarui-mark.png"}
        alt={showWordmark ? "Huarui Construction Material" : ""}
        width={showWordmark ? 940 : 40}
        height={showWordmark ? 300 : 40}
        className={showWordmark ? "h-16 w-auto object-contain sm:h-20" : "h-8 w-8 object-contain"}
        priority
      />
    </span>
  )
}
