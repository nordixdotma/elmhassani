"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Download, Github } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { HoverLinkPreview } from "@/components/ui/hover-link-preview" // Import the new component

interface HeroSectionProps {
  isMobile: boolean
}

// Memoize the component to prevent unnecessary re-renders
export const HeroSection = memo(function HeroSection({ isMobile }: HeroSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: false, // Change to false to re-trigger on scroll
    threshold: 0.3, // Increase threshold to trigger animation when more of the section is visible
  })

  // Animation variants - defined outside of render to prevent recreation
  const nameVariants = {
    hidden: { opacity: 0, y: -50, rotateX: 45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  }

  const backgroundVariants = {
    hidden: { opacity: 0.3, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  }

  return (
    <section
      id="home"
      ref={ref}
      className={cn("w-full relative overflow-hidden", isMobile ? "h-[calc(100dvh-4rem)]" : "h-screen")}
      style={{ marginTop: isMobile ? "-4rem" : "0" }}
    >
      {/* Background image - with loading optimization and animation */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={backgroundVariants}
      >
        <img
          src="https://plus.unsplash.com/premium_photo-1673603988651-99f79e4ae7d3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero background"
          className="w-full h-full object-cover"
        />

        {/* Light shade overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Mobile bottom overlay - always black for hero section */}
        {isMobile && (
          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black via-black/70 to-transparent" />
        )}
      </motion.div>

      {/* Content container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container px-4 md:px-6 mx-auto z-10">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            {/* Name with animation */}
            <motion.h1
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={nameVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white/90"
            >
              NOUREDDINE EL MHASSANI
            </motion.h1>

            {/* Download Resume and GitHub Buttons */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={buttonVariants}
              className="mt-8 flex space-x-4"
            >
              <HoverLinkPreview
                href="/ELMHASSANI RESUME.pdf"
                previewImage="/resumeimage.png"
                imageAlt="Resume Preview"
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-xs md:text-sm font-medium transition-all cursor-target",
                  "h-9 px-2 py-2 md:px-6 md:py-2 md:h-10",
                  "bg-white text-black hover:bg-white/90",
                  "hover:translate-y-[-2px] hover:shadow-lg hover:shadow-white/20",
                  "border border-primary/20 backdrop-blur-sm",
                )}
                download
                isMobile={isMobile} // Pass isMobile prop
                position="top" // Explicitly set position
                newTab={true} // Resume should open in new tab
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </HoverLinkPreview>

              <Link
                href="https://github.com/nordixdotma"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-xs md:text-sm font-medium transition-all cursor-target",
                  "h-9 px-2 py-2 md:px-6 md:py-2 md:h-10",
                  "bg-transparent text-white hover:text-white hover:bg-white/10",
                  "hover:translate-y-[-2px] hover:shadow-lg hover:shadow-white/20",
                  "border border-white/20 backdrop-blur-sm",
                )}
              >
                <Github className="mr-2 h-4 w-4" />
                Visit GitHub
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Desktop decorative element at the bottom */}
      {!isMobile && (
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-black to-transparent" />
      )}
    </section>
  )
})

export default HeroSection
