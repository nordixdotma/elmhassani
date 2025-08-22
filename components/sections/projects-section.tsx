"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Info } from "lucide-react" // Import Info icon
import { Carousel, CarouselContent, CarouselNavigation, CarouselItem } from "@/components/kaif-ui/carousel"
import { projects } from "@/lib/projects" // Import projects data
import { useState, useCallback } from "react" // Import useState and useCallback
import { motion, AnimatePresence } from "framer-motion" // Import motion and AnimatePresence
import { cn } from "@/lib/utils"

interface ProjectsSectionProps {
  isMobile: boolean
}
export default function ProjectsSection({ isMobile }: ProjectsSectionProps) {
  const [showTooltip, setShowTooltip] = useState(false) // State for tooltip visibility
  const [activeProject, setActiveProject] = useState<number | null>(null) // State for active project ID
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null) // State for hovered card ID

  const handleMouseEnterTooltip = (projectId: number) => {
    setActiveProject(projectId)
    setShowTooltip(true)
  }

  const handleMouseLeaveTooltip = () => {
    setActiveProject(null)
    setShowTooltip(false)
  }

  // Prevent wheel events from bubbling up to the main scroll handler
  const handleWheelCapture = useCallback((e: React.WheelEvent) => {
    // Only prevent propagation if we're actually scrolling horizontally in the carousel
    // or if the wheel event is happening over the carousel area
    e.stopPropagation()
  }, [])

  // Prevent touch events from interfering with main scroll
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation()
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.stopPropagation()
  }, [])

  // Carousel options with smooth animations
  const carouselOpts = isMobile
    ? {
        align: "center" as const,
        loop: false,
        slidesToScroll: 1,
        duration: 25, // Smooth transition duration
        dragFree: false, // Snap to slides
        containScroll: "trimSnaps" as const,
        skipSnaps: false,
      }
    : {
        align: "start" as const,
        loop: false,
        duration: 20, // Smooth transition for desktop
        dragFree: false,
        containScroll: "trimSnaps" as const,
      }

  return (
    <section
      id="work"
      className={cn(
        "relative flex flex-col justify-center",
        isMobile ? "min-h-[calc(100dvh-80px)] py-8" : "min-h-screen py-16 sm:py-24", // Adjusted mobile padding to balance top and bottom spacing
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className={cn("flex flex-col items-center text-center", isMobile ? "mb-8" : "mb-8")}>
          {" "}
          <div>
            <h2
              className={cn(
                "font-bold tracking-tight text-[#faf9f6] mb-4",
                isMobile ? "text-2xl" : "text-3xl sm:text-4xl md:text-5xl",
              )}
            >
              Things I've Made
            </h2>
            <p className="text-sm sm:text-base text-[#faf9f6]/80 whitespace-nowrap overflow-hidden text-ellipsis">
              {isMobile
                ? "Recent projects & skills showcase"
                : "Explore a selection of my recent projects, showcasing my skills in web development and design."}
            </p>
          </div>
        </div>

        {/* Carousel with event handling */}
        <div
          className={cn("relative w-full", isMobile ? "px-2 pb-0" : "px-4 pb-[1rem]")} // Removed bottom padding on mobile to reduce bottom spacing
          onWheelCapture={handleWheelCapture}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <Carousel opts={carouselOpts}>
            <CarouselContent className={cn(isMobile ? "-ml-2" : "-ml-4")}>
              {projects.map((item) => {
                const displayedTech =
                  item.tech.length > 2 ? `${item.tech[0]}, ${item.tech[1]}...` : item.tech.join(", ")

                return (
                  <CarouselItem
                    key={item.id}
                    className={cn(isMobile ? "pl-2 basis-full" : "pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4")}
                  >
                    <div className={cn("flex justify-center", isMobile && "px-4")}>
                      <div
                        className={cn(
                          "relative flex flex-col justify-end overflow-hidden rounded-md border border-[#faf9f6]/30 group cursor-target",
                          isMobile ? "aspect-[4/5] w-full max-w-[320px]" : "aspect-[4/5] w-full", // Increased from 280px to 320px
                        )}
                        onMouseEnter={() => setHoveredCardId(item.id)}
                        onMouseLeave={() => setHoveredCardId(null)}
                        style={{ opacity: 1 }}
                      >
                        {/* Main Image */}
                        <motion.div
                          className="absolute inset-0 w-full h-full"
                          initial={{ opacity: 1 }}
                          animate={{ opacity: hoveredCardId === item.id ? 0 : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            alt={item.title}
                            src={item.mainImage || "/placeholder.svg"}
                            fill
                            className="object-cover"
                          />
                        </motion.div>

                        {/* Secondary Image (on hover) */}
                        <motion.div
                          className="absolute inset-0 w-full h-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredCardId === item.id ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            alt={`${item.title} - secondary`}
                            src={item.secondaryImage || "/placeholder.svg"}
                            fill
                            className="object-cover"
                          />
                        </motion.div>

                        {/* Tech Badge with Tooltip - Made responsive */}
                        {item.tech && item.tech.length > 0 && (
                          <div
                            className="absolute top-3 right-3 z-10"
                            onMouseEnter={() => handleMouseEnterTooltip(item.id)}
                            onMouseLeave={handleMouseLeaveTooltip}
                          >
                            <div
                              className={cn(
                                "bg-[#ff4500] text-[#faf9f6] rounded-md font-medium relative cursor-target",
                                isMobile
                                  ? "px-2 py-0.5 text-[0.65rem]" // Mobile size (current)
                                  : "px-3 py-1 text-xs", // Desktop size (larger)
                              )}
                            >
                              {displayedTech}
                            </div>
                            <AnimatePresence>
                              {showTooltip && activeProject === item.id && (
                                <motion.div
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 5 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute top-full right-0 mt-2 p-2 bg-[#faf9f6] text-[#ff4500] text-xs rounded-md shadow-lg whitespace-nowrap z-20"
                                >
                                  {item.tech.join(", ")}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}

                        {/* Bottom Content Div with Margin */}
                        <div className="relative z-10 mx-2 mb-2 bg-[#faf9f6] rounded-md" style={{ height: "auto" }}>
                          <div className="p-2">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex flex-col flex-grow">
                                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-[#ff4500] mb-1">
                                  {item.title}
                                </h3>
                                <p className="text-[0.65rem] text-[#ff4500]/90 flex items-center">
                                  <Info className="w-2.5 h-2.5 mr-1" strokeWidth={3} /> {/* Info icon made bolder */}
                                  {item.description}
                                </p>
                              </div>
                              {item.demoLink && (
                                <Link
                                  href={item.demoLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={cn(
                                    "inline-flex items-center justify-center rounded-md bg-[#ff4500] text-[#faf9f6] font-medium hover:bg-[#ff4500]/90 transition-all transform hover:scale-105 flex-shrink-0 cursor-target",
                                    isMobile
                                      ? "px-2 py-1 text-xs" // Smaller for mobile
                                      : "px-4 py-2 text-sm", // Larger for desktop
                                  )}
                                >
                                  Live
                                  <ExternalLink className="ml-1.5 h-3.5 w-3.5 text-[#faf9f6]" />
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselNavigation
              className={cn(
                "gap-2",
                isMobile ? "flex justify-center mt-2" : "absolute -bottom-10 left-auto top-auto w-full justify-end",
              )}
              classNameButton={cn(
                "bg-[#faf9f6] *:stroke-[#ff4500] disabled:opacity-50",
                isMobile ? "h-10 w-10" : "h-8 w-8",
              )}
              alwaysShow
            />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
