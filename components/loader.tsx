"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Start fade out after 3.5 seconds, so it finishes by 4 seconds (with 0.5s transition)
    const timer = setTimeout(() => {
      setFadeOut(true)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  const handleTransitionEnd = () => {
    if (fadeOut) {
      setIsVisible(false) // Fully hidden, now can be unmounted
      onComplete() // Notify parent
    }
  }

  if (!isVisible) return null // Don't render if not visible

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ease-in-out",
        fadeOut ? "opacity-0" : "opacity-100",
      )}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="relative">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          priority
          className="animate-pulse filter brightness-0 invert"
        />
        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
      </div>
    </div>
  )
}
