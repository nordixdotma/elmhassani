"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0)
      setTimeout(() => {
        setIsVisible(false)
        onComplete()
      }, 500)
    }, 4000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    isVisible && (
      <div
        className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center z-[9999]"
        style={{ transition: "opacity 0.5s ease-in-out", opacity }}
      >
        <div className="select-none flex items-center justify-center">
          <div
            style={{
              width: "clamp(4rem,12vw,8rem)",
              height: "auto",
              overflow: "hidden",
              userSelect: "none",
            }}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={128}
              height={128}
              className="w-full h-auto animate-pulse"
              draggable={false}
              priority
              style={{
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>
    )
  )
}
