import type React from "react"
import { cn } from "@/lib/utils"

interface TimelineProps {
  children: React.ReactNode
  className?: string
}

export function Timeline({ children, className }: TimelineProps) {
  return <div className={cn("relative", className)}>{children}</div>
}

interface TimelineItemProps {
  children: React.ReactNode
  className?: string
}

export function TimelineItem({ children, className }: TimelineItemProps) {
  return <div className={cn("flex mb-8 last:mb-0", className)}>{children}</div>
}

interface TimelineSeparatorProps {
  children: React.ReactNode
  className?: string
}

export function TimelineSeparator({ children, className }: TimelineSeparatorProps) {
  return <div className={cn("flex flex-col items-center mr-4", className)}>{children}</div>
}

interface TimelineDotProps {
  className?: string
}

export function TimelineDot({ className }: TimelineDotProps) {
  return <div className={cn("w-4 h-4 rounded-full bg-primary", className)} />
}

interface TimelineConnectorProps {
  className?: string
}

export function TimelineConnector({ className }: TimelineConnectorProps) {
  return <div className={cn("w-1 bg-border flex-grow my-1", className)} />
}

interface TimelineContentProps {
  children: React.ReactNode
  className?: string
}

export function TimelineContent({ children, className }: TimelineContentProps) {
  return <div className={cn("flex-grow pt-1", className)}>{children}</div>
}
