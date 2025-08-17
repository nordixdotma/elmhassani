"use client"
import { useState, useRef, useEffect, memo } from "react"
import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

// Simplified Highlighted Word component without animation
const HighlightedWord = ({ children }: { children: React.ReactNode }) => {
  return <span className="font-medium text-black dark:text-white">{children}</span>
}

interface AboutSectionProps {
  isMobile: boolean
}

// Fix the export to ensure it's properly named and exported
function AboutSectionComponent({ isMobile }: AboutSectionProps) {
  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: false, // Change to false to re-trigger on scroll
    threshold: 0.2, // Lower threshold to start animation earlier
  })

  // Refs for the swiper rows
  const firstRowRef = useRef<HTMLDivElement>(null)
  const secondRowRef = useRef<HTMLDivElement>(null)
  const desktopRowRef = useRef<HTMLDivElement>(null)

  // State for tracking touch/swipe
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [firstRowScrollLeft, setFirstRowScrollLeft] = useState(0)
  const [secondRowScrollLeft, setSecondRowScrollLeft] = useState(0)

  // All skills
  const allSkills = [
    { name: "React", icon: "react", color: "#61DAFB" },
    { name: "Next.js", icon: "nextjs", color: "#000000" },
    { name: "Angular", icon: "angular", color: "#DD0031" },
    { name: "JavaScript", icon: "javascript", color: "#F7DF1E" },
    { name: "HTML5", icon: "html5", color: "#E34F26" },
    { name: "CSS3", icon: "css3", color: "#1572B6" },
    { name: "Tailwind CSS", icon: "tailwindcss", color: "#06B6D4" },
    { name: "Bootstrap", icon: "bootstrap", color: "#7952B3" },
    { name: "jQuery", icon: "jquery", color: "#0769AD" },
    { name: "Node.js", icon: "nodejs", color: "#339933" },
    { name: "C", icon: "c", color: "#A8B9CC" },
    { name: "PHP", icon: "php", color: "#777BB4" },
    { name: "Laravel", icon: "laravel", color: "#f0513f" },
    { name: "MySQL", icon: "mysql", color: "#4479A1" },
    { name: "Python", icon: "python", color: "#3776AB" },
    { name: "Java", icon: "java", color: "#007396" },
  ]

  // Split skills into two halves
  const firstHalfSkills = allSkills.slice(0, Math.ceil(allSkills.length / 2))
  const secondHalfSkills = allSkills.slice(Math.ceil(allSkills.length / 2))

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        type: "spring",
        stiffness: 50,
      },
    },
  }

  // Touch event handlers for manual swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)

    // Store current scroll positions
    if (firstRowRef.current) {
      setFirstRowScrollLeft(firstRowRef.current.scrollLeft)
    }
    if (secondRowRef.current) {
      setSecondRowScrollLeft(secondRowRef.current.scrollLeft)
    }
  }

  const handleTouchMove = (e: React.TouchEvent, rowRef: React.RefObject<HTMLDivElement>, initialScrollLeft: number) => {
    if (touchStartX === null || !rowRef.current) return

    const touchCurrentX = e.touches[0].clientX
    const diff = touchStartX - touchCurrentX

    // Update scroll position based on touch movement
    rowRef.current.scrollLeft = initialScrollLeft + diff

    // Prevent default to avoid page scrolling while swiping
    e.preventDefault()
  }

  const handleTouchEnd = () => {
    setTouchStartX(null)
  }

  // Auto-scroll effect for the skills rows - optimized with requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number
    let lastTimestamp = 0
    const scrollSpeed = 0.05 // pixels per millisecond

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp
      const elapsed = timestamp - lastTimestamp

      // First row (left to right) - mobile
      if (isMobile && firstRowRef.current) {
        if (firstRowRef.current.scrollLeft >= firstRowRef.current.scrollWidth / 2) {
          firstRowRef.current.scrollLeft = 0
        } else {
          firstRowRef.current.scrollLeft += scrollSpeed * elapsed
        }
      }

      // Second row (right to left) - mobile
      if (isMobile && secondRowRef.current) {
        if (secondRowRef.current.scrollLeft <= 0) {
          secondRowRef.current.scrollLeft = secondRowRef.current.scrollWidth / 2
        } else {
          secondRowRef.current.scrollLeft -= scrollSpeed * elapsed
        }
      }

      // Desktop row (left to right)
      if (!isMobile && desktopRowRef.current) {
        if (desktopRowRef.current.scrollLeft >= desktopRowRef.current.scrollWidth / 2) {
          desktopRowRef.current.scrollLeft = 0
        } else {
          desktopRowRef.current.scrollLeft += scrollSpeed * elapsed * 0.8 // Slightly slower for desktop
        }
      }

      lastTimestamp = timestamp
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile])

  return (
    <section
      id="about"
      className={`w-full ${
        isMobile ? "min-h-[calc(100dvh-4rem-64px)] flex flex-col justify-center" : "py-16 md:py-24 lg:py-32"
      } bg-white dark:bg-black text-black dark:text-white relative overflow-hidden`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 w-full h-full dark:bg-grid-white/[0.1] bg-grid-black/[0.1] bg-[size:40px_40px] opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />

      {/* Decorative elements - reduced for better performance */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <div
        className={`container px-4 md:px-6 mx-auto relative z-10 ${isMobile && "flex flex-col h-full justify-center"}`}
      >
        <motion.div
          ref={aboutRef}
          initial="hidden"
          animate={aboutInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col items-center space-y-8 text-center"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Who I Am</h2>
            <motion.p
              variants={textVariants}
              className={`${
                isMobile ? "max-w-[90%] mx-auto text-sm" : "max-w-[900px] text-base sm:text-lg"
              } text-gray-600 dark:text-gray-400 leading-relaxed`}
            >
              {isMobile ? (
                <>
                  I'm a <HighlightedWord>software engineer</HighlightedWord> who loves solving{" "}
                  <HighlightedWord>real-world problems</HighlightedWord> with code that works. I focus on creating{" "}
                  <HighlightedWord>fast</HighlightedWord>, <HighlightedWord>reliable</HighlightedWord>, and{" "}
                  <HighlightedWord>useful</HighlightedWord> solutions.
                </>
              ) : (
                <>
                  I'm a <HighlightedWord>software engineer</HighlightedWord> who loves cracking{" "}
                  <HighlightedWord>real-world problems</HighlightedWord> with code that works. From building slick web
                  apps to optimizing backend systems, I focus on creating stuff that's{" "}
                  <HighlightedWord>fast</HighlightedWord>, <HighlightedWord>reliable</HighlightedWord>, and actually{" "}
                  <HighlightedWord>useful</HighlightedWord>. I've worked with everything from React to C, delivering
                  projects like e-commerce platforms and sustainable product showcases. Passionate about clean solutions
                  that make a difference. No fluff, just solid engineering.
                </>
              )}
            </motion.p>
          </motion.div>

          {isMobile ? (
            <div className="w-full mt-4 overflow-hidden">
              <div className="flex flex-col items-center text-center w-full mb-3">
                <h3 className="text-lg font-bold">My Tools</h3>
              </div>

              {/* First row - left to right */}
              <div className="relative w-full overflow-hidden mb-3 p-2 rounded-md bg-background/50">
                <div
                  ref={firstRowRef}
                  className="flex overflow-x-auto scrollbar-hide"
                  onTouchStart={handleTouchStart}
                  onTouchMove={(e) => handleTouchMove(e, firstRowRef, firstRowScrollLeft)}
                  onTouchEnd={handleTouchEnd}
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {/* Double the skills to create seamless loop */}
                  {[...firstHalfSkills, ...firstHalfSkills].map((skill, index) => (
                    <div key={`first-${index}`} className="flex flex-col items-center mx-3 flex-shrink-0 cursor-target">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300">
                        <img
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg`}
                          alt={skill.name}
                          className="w-6 h-6"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-plain.svg`
                          }}
                        />
                      </div>
                      <span className="text-xs mt-1">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Second row - right to left */}
              <div className="relative w-full overflow-hidden p-2 rounded-md bg-background/50">
                <div
                  ref={secondRowRef}
                  className="flex overflow-x-auto scrollbar-hide"
                  onTouchStart={handleTouchStart}
                  onTouchMove={(e) => handleTouchMove(e, secondRowRef, secondRowScrollLeft)}
                  onTouchEnd={handleTouchEnd}
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {/* Double the skills to create seamless loop */}
                  {[...secondHalfSkills, ...secondHalfSkills].map((skill, index) => (
                    <div key={`second-${index}`} className="flex flex-col items-center mx-3 flex-shrink-0">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300">
                        <img
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg`}
                          alt={skill.name}
                          className="w-6 h-6"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-plain.svg`
                          }}
                        />
                      </div>
                      <span className="text-xs mt-1">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-8 w-full backdrop-blur-sm bg-background/30 rounded-lg p-6 border border-border/50">
              <div className="flex flex-col items-center text-center w-full mb-4">
                <h3 className="text-xl font-bold">My Tools</h3>
              </div>

              {/* Desktop auto-scrolling skills row */}
              <div className="relative w-full overflow-visible p-2 rounded-md">
                <div
                  ref={desktopRowRef}
                  className="flex overflow-x-auto scrollbar-hide py-4"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {/* Double all skills to create seamless loop */}
                  {[...allSkills, ...allSkills].map((skill, index) => (
                    <div
                      key={`desktop-${index}`}
                      className="flex flex-col items-center mx-4 flex-shrink-0 cursor-target"
                    >
                      <div className="w-16 h-16 flex items-center justify-center rounded-xl border border-gray-300 bg-background/80">
                        <img
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg`}
                          alt={skill.name}
                          className="w-10 h-10"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-plain.svg`
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium mt-2 whitespace-nowrap">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

// Export the memoized component with the correct name
export const AboutSection = memo(AboutSectionComponent)
