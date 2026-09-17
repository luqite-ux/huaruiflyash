import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * Official raster logo cropped without redrawing from 画册.pdf page 1.
 */
export function HuaruiLogo({ className, showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={showWordmark ? "/assets/huarui-logo.png" : "/assets/huarui-mark.png"}
        alt={showWordmark ? "Huarui Construction Material" : ""}
        width={showWordmark ? 824 : 40}
        height={showWordmark ? 256 : 40}
        className={showWordmark ? "h-14 w-auto object-contain sm:h-16" : "h-8 w-8 object-contain"}
        priority
      />
    </span>
  )
}
