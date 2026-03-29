import * as React from "react"
import { cn } from "@/lib/utils"

type SectionVariant = "default" | "lavender" | "paleBlue" | "offWhite" | "warm" | "muted" | "gradient"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SectionVariant
  /** Use py-24 for more breathing room on key sections */
  spacing?: "normal" | "large"
  as?: "section" | "div"
}

const variantClasses: Record<SectionVariant, string> = {
  default: "bg-[var(--section-off-white)]",
  lavender: "bg-section-lavender",
  paleBlue: "bg-section-pale-blue",
  offWhite: "bg-section-off-white",
  warm: "bg-section-warm",
  muted: "bg-section-muted",
  gradient: "bg-gradient-brand-subtle",
}

export function Section({
  className,
  variant = "default",
  spacing = "normal",
  as: Component = "section",
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(
        variantClasses[variant],
        spacing === "large" ? "py-24" : "py-16",
        "w-full",
        className
      )}
      {...props}
    />
  )
}
