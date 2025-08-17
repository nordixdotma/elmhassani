"use client"

import type * as React from "react"
import { useRef, useState } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface HoverLinkPreviewProps {
  href: string
  previewImage: string
  imageAlt?: string
  children: React.ReactNode
  className?: string
  download?: boolean
  isMobile?: boolean // New prop
  position?: "top" | "bottom" // New prop
  newTab?: boolean // New prop
  onClick?: () => void // New prop for custom click handling
}

const HoverLinkPreview: React.FC<HoverLinkPreviewProps> = ({
  href,
  previewImage,
  imageAlt = "Link preview",
  children,
  className,
  download,
  isMobile = false, // Default to false
  position = "top", // Default to "top"
  newTab = true, // Default to true
  onClick, // Destructure onClick
}) => {
  const [showPreview, setShowPreview] = useState(false)
  const prevX = useRef<number | null>(null)

  const motionTop = useMotionValue(0)
  const motionLeft = useMotionValue(0)
  const motionRotate = useMotionValue(0)

  const springTop = useSpring(motionTop, { stiffness: 300, damping: 30 })
  const springLeft = useSpring(motionLeft, { stiffness: 300, damping: 30 })
  const springRotate = useSpring(motionRotate, { stiffness: 300, damping: 20 })

  const handleMouseEnter = () => {
    if (isMobile) return // Disable on mobile
    setShowPreview(true)
    prevX.current = null
  }

  const handleMouseLeave = () => {
    if (isMobile) return // Disable on mobile
    setShowPreview(false)
    prevX.current = null
    motionRotate.set(0)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) return // Disable on mobile

    const PREVIEW_WIDTH = 192
    const PREVIEW_HEIGHT = 112
    const OFFSET_Y = position === "top" ? 40 : -40 // Adjust offset based on position

    // Position the preview
    motionTop.set(e.clientY - (position === "top" ? PREVIEW_HEIGHT : 0) - OFFSET_Y)
    motionLeft.set(e.clientX - PREVIEW_WIDTH / 2)

    // Calculate tilt based on horizontal movement
    if (prevX.current !== null) {
      const deltaX = e.clientX - prevX.current
      const newRotate = Math.max(-15, Math.min(15, deltaX * 1.2))
      motionRotate.set(newRotate)
    }
    prevX.current = e.clientX
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault() // Prevent default link behavior if onClick is provided
      onClick()
    }
  }

  return (
    <>
      <a
        href={href}
        target={newTab ? "_blank" : undefined} // Conditionally set target
        rel={newTab ? "noopener noreferrer" : undefined} // Conditionally set rel
        className={cn("relative inline-block cursor-pointer", className)} // Removed text-blue-600
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={handleClick} // Use custom click handler
        download={download}
      >
        {children}
      </a>

      <AnimatePresence>
        {showPreview &&
          !isMobile && ( // Conditionally render preview based on isMobile
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: position === "top" ? -10 : 10, rotate: 0 }} // Adjust initial y based on position
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: position === "top" ? -10 : 10, rotate: 0 }} // Adjust exit y based on position
              style={{
                position: "fixed",
                top: springTop,
                left: springLeft,
                rotate: springRotate,
                zIndex: 50,
                pointerEvents: "none",
              }}
            >
              <div className="bg-white border rounded-2xl shadow-lg p-2 min-w-[180px] max-w-xs">
                <img
                  src={previewImage || "/placeholder.svg"}
                  alt={imageAlt}
                  draggable={false}
                  className="w-48 h-28 object-cover rounded-md"
                />
              </div>
            </motion.div>
          )}
      </AnimatePresence>
    </>
  )
}

export { HoverLinkPreview }
