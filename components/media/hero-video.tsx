"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type Props = {
  /** 1280×720 H.264, no audio. */
  desktopSrc: string
  /** 4:5 centre crop for portrait phones. */
  portraitSrc: string
  /** First frame of the clip; the LCP image. */
  poster: string
  /** Describes the poster (the video is the same scene, so it is aria-hidden). */
  alt: string
}

type NetworkInformation = { saveData?: boolean; effectiveType?: string }

/** Video only when motion is welcome and the connection can take it. */
function videoAllowed(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false
  const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection
  if (conn?.saveData) return false
  if (conn?.effectiveType && /(^|-)2g$|^3g$/.test(conn.effectiveType)) return false
  return true
}

/**
 * Hero loop: the poster renders first, server-side, through next/image
 * with priority (it is the LCP element). After mount, and only if
 * motion is allowed (no prefers-reduced-motion, no Save-Data, not
 * 2g/3g), a muted, looping, inline video fades in over it. Portrait
 * phones get the smaller 4:5 crop through <source media>.
 *
 * A visible Pause/Play control (WCAG 2.2.2) sits bottom-left. The loop
 * also pauses while the hero is off-screen, to save battery, and
 * resumes when it returns unless the visitor paused it.
 */
export function HeroVideo({ desktopSrc, portraitSrc, poster, alt }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [allowed, setAllowed] = useState(false)
  const [visible, setVisible] = useState(true)
  const [userPaused, setUserPaused] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    setAllowed(videoAllowed())
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setAllowed(videoAllowed())
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver((entries) => setVisible(entries.some((e) => e.isIntersecting)), {
      threshold: 0.05,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    if (allowed && visible && !userPaused) {
      v.play().catch(() => {
        // Autoplay refused (some browsers' power-saving modes): the poster stays.
      })
    } else {
      v.pause()
    }
  }, [allowed, visible, userPaused])

  const toggle = useCallback(() => setUserPaused((p) => !p), [])

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Image src={poster} alt={alt} fill priority sizes="100vw" className="object-cover" />
      {allowed && (
        <video
          ref={videoRef}
          aria-hidden
          tabIndex={-1}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          poster={poster}
          onPlaying={() => setPlaying(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            playing ? "opacity-100" : "opacity-0",
          )}
        >
          <source src={portraitSrc} type="video/mp4" media="(max-width: 767px) and (orientation: portrait)" />
          <source src={desktopSrc} type="video/mp4" />
        </video>
      )}
      {allowed && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={userPaused}
          aria-label={userPaused ? "Play background video" : "Pause background video"}
          className="absolute bottom-4 left-4 z-20 border border-bone/30 bg-night/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/85 backdrop-blur-sm transition-colors hover:border-amber hover:text-amber focus:outline-none focus-visible:ring-2 focus-visible:ring-amber md:bottom-6 md:left-8"
        >
          {userPaused ? "Play" : "Pause"}
        </button>
      )}
    </div>
  )
}
