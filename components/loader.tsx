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

  if (!isVisible) return null

  return (
    <div
      className="fixed inset-0 w-screen h-[100dvh] bg-black flex items-center justify-center z-[9999] transition-opacity duration-500 loader-opacity overflow-hidden"
    >
      <div className="select-none">
        <Image
          src="/logo.png"
          alt="Logo"
          width={128}
          height={128}
          className="w-16 h-16 md:w-32 md:h-32 animate-pulse"
          draggable={false}
          priority
        />
      </div>
    </div>
  )
}
