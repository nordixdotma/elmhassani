"use client"

import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Low-level hook – returns true when viewport width is < 768 px.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    handleResize() // initial
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isMobile
}

/**
 * Convenience wrapper identical to useIsMobile (kept for backward compatibility).
 * Components can import either:
 *   import { useIsMobile, useMobile } from "@/hooks/use-mobile"
 */
export const useMobile = useIsMobile
