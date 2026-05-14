"use client"

import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"

import { track } from "@/lib/analytics/track"
import type { StartBriefSource } from "@/lib/analytics/events"

type Props = Omit<ComponentProps<typeof Link>, "href" | "onClick"> & {
  /** Where this CTA lives on the site — drives the "source" param. */
  source: StartBriefSource
  /** Defaults to `/plan`; override only when a sibling intake path is added. */
  href?: string
  children: ReactNode
}

/**
 * Client-side wrapper around a Next `<Link>` that fires the
 * `start-brief-click` analytics event on click.
 *
 * Drop-in replacement for any `<Link href="/plan">` that currently
 * functions as a Start-a-brief CTA. Preserves className + other Link
 * props; the onClick handler is the only thing it adds.
 *
 * Works as the slot child of shadcn's `<Button asChild>` — Slot merges
 * Button's props onto the underlying anchor, leaving our onClick
 * handler intact.
 */
export function StartBriefLink({
  source,
  href = "/plan",
  children,
  ...rest
}: Props) {
  return (
    <Link
      href={href}
      onClick={() => track("start-brief-click", { source })}
      {...rest}
    >
      {children}
    </Link>
  )
}
