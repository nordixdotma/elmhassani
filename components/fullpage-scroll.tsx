"use client"

import { useState, useEffect, useRef } from "react"
import Header from "./header"
import SectionContent from "./section-content"
import { BottomNavigation } from "@/components/bottom-navigation"
import { useMobile } from "@/hooks/use-mobile"
import TargetCursor from "@/components/target-cursor"
import Loader from "@/components/loader"

export default function FullPageScroll() {
  const [currentSection, setCurrentSection] = useState("home")
  const [prevSection, setPrevSection] = useState("home")
  const [headerTextColor, setHeaderTextColor] = useState("#ffffff")
  const [isScrolling, setIsScrolling] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const animationFrameRef = useRef<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const isMobile = useMobile()

  const TRANSITION_DURATION = isMobile ? 800 : 1800 // Faster transitions on mobile

  const sections = [
    { id: "home", backgroundColor: "#000000", textColor: "#ffffff" },
    { id: "about", backgroundColor: "#ffffff", textColor: "#000000" },
    { id: "projects", backgroundColor: "#ff4500", textColor: "#faf9f6" },
    { id: "contact", backgroundColor: "#faf9f6", textColor: "#ff4500" },
  ]

  const handleLoaderComplete = () => {
    setIsLoading(false)
  }

  const goToSection = (sectionId: string, useTransition = true) => {
    const sectionIndex = sections.findIndex((s) => s.id === sectionId)
    if (sectionIndex >= 0 && !isScrolling && !isLoading) {
      setPrevSection(currentSection)
      setCurrentSection(sectionId)

      if (useTransition) {
        setIsScrolling(true)
        setTimeout(() => {
          setIsScrolling(false)
        }, TRANSITION_DURATION)
      }
    }
  }

  const getCurrentSectionIndex = () => sections.findIndex((s) => s.id === currentSection)
  const getPrevSectionIndex = () => sections.findIndex((s) => s.id === prevSection)

  // Update header text color immediately when section changes on mobile
  useEffect(() => {
    if (isMobile) {
      const section = sections.find((s) => s.id === currentSection)
      if (section) {
        setHeaderTextColor(section.textColor)
      }
    }
  }, [currentSection, isMobile, sections])

  // Header text color effect for desktop (scroll-based)
  useEffect(() => {
    if (isMobile || isLoading) return // Skip desktop logic on mobile or when loading

    const headerHeight = 80

    const animate = () => {
      const currentSectionData = sections.find((s) => s.id === currentSection)
      let newHeaderTextColor = currentSectionData?.textColor || "#ffffff"

      let topMostSectionIndex = -1
      let minDistanceToTop = Number.POSITIVE_INFINITY

      sectionRefs.current.forEach((sectionEl, index) => {
        if (sectionEl) {
          const rect = sectionEl.getBoundingClientRect()

          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            if (rect.top <= headerHeight && rect.bottom >= 0) {
              const distance = Math.abs(rect.top)
              if (distance < minDistanceToTop) {
                minDistanceToTop = distance
                topMostSectionIndex = index
              }
            }
          }
        }
      })

      if (topMostSectionIndex !== -1) {
        newHeaderTextColor = sections[topMostSectionIndex].textColor
      } else {
        newHeaderTextColor = currentSectionData?.textColor || "#ffffff"
      }

      if (newHeaderTextColor !== headerTextColor) {
        setHeaderTextColor(newHeaderTextColor)
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [currentSection, sections, headerTextColor, isMobile, isLoading])

  // Desktop scroll and keyboard events
  useEffect(() => {
    if (isMobile || isLoading) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isScrolling) return

      const currentIndex = getCurrentSectionIndex()
      if (e.deltaY > 10 && currentIndex < sections.length - 1) {
        goToSection(sections[currentIndex + 1].id)
      } else if (e.deltaY < -10 && currentIndex > 0) {
        goToSection(sections[currentIndex - 1].id)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return

      const currentIndex = getCurrentSectionIndex()
      if (e.key === "ArrowDown" && currentIndex < sections.length - 1) {
        e.preventDefault()
        goToSection(sections[currentIndex + 1].id)
      } else if (e.key === "ArrowUp" && currentIndex > 0) {
        e.preventDefault()
        goToSection(sections[currentIndex - 1].id)
      }
    }

    // Touch events for desktop
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartY.current) return

      const touchEndY = e.changedTouches[0].clientY
      const diffY = touchStartY.current - touchEndY

      if (Math.abs(diffY) > 50) {
        const currentIndex = getCurrentSectionIndex()
        if (diffY > 0 && currentIndex < sections.length - 1) {
          // Swipe up - go to next section
          goToSection(sections[currentIndex + 1].id)
        } else if (diffY < 0 && currentIndex > 0) {
          // Swipe down - go to previous section
          goToSection(sections[currentIndex - 1].id)
        }
      }

      touchStartY.current = null
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
      container.addEventListener("touchstart", handleTouchStart, { passive: false })
      container.addEventListener("touchend", handleTouchEnd, { passive: false })
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchend", handleTouchEnd)
      }
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentSection, isScrolling, sections.length, isMobile, isLoading])

  // Mobile touch events for horizontal swiping
  useEffect(() => {
    if (!isMobile || isLoading) return // Skip mobile events on desktop or when loading

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartX.current || !touchStartY.current) return

      const touchEndX = e.touches[0].clientX
      const touchEndY = e.touches[0].clientY
      const diffX = touchStartX.current - touchEndX
      const diffY = touchStartY.current - touchEndY

      // Only handle horizontal swipes (ignore vertical scrolling within sections)
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartX.current || !touchStartY.current) return

      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY
      const diffX = touchStartX.current - touchEndX
      const diffY = touchStartY.current - touchEndY

      // Only handle horizontal swipes
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        const currentIndex = getCurrentSectionIndex()
        if (diffX > 0 && currentIndex < sections.length - 1) {
          // Swipe left - go to next section with transition
          goToSection(sections[currentIndex + 1].id, true)
        } else if (diffX < 0 && currentIndex > 0) {
          // Swipe right - go to previous section with transition
          goToSection(sections[currentIndex - 1].id, true)
        }
      }

      touchStartX.current = null
      touchStartY.current = null
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: false })
      container.addEventListener("touchmove", handleTouchMove, { passive: false })
      container.addEventListener("touchend", handleTouchEnd, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSection, isScrolling, sections.length, isMobile, isLoading])

  const scrollDirection = getCurrentSectionIndex() > getPrevSectionIndex() ? "down" : "up"

  // Show loader first
  if (isLoading) {
    return <Loader onComplete={handleLoaderComplete} />
  }

  return (
    <div ref={containerRef} className="fullpage-container">
      {/* Target Cursor - Only show on desktop */}
      {!isMobile && <TargetCursor targetSelector=".cursor-target" spinDuration={2} hideDefaultCursor={true} />}

      {/* Header */}
      <Header
        currentSection={currentSection}
        onSectionClick={(sectionId) => goToSection(sectionId, false)} // No transition for header clicks
        textColor={headerTextColor}
        scrollDirection={scrollDirection}
        isMobile={isMobile}
      />

      {/* Sections */}
      <div className="sections-wrapper">
        {sections.map((section, index) => (
          <div
            key={section.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className={`section ${currentSection === section.id ? "active" : ""}`}
            style={{
              backgroundColor: section.backgroundColor,
              color: section.textColor,
              transform: isMobile
                ? `translateX(${(index - getCurrentSectionIndex()) * 100}vw)`
                : `translateY(${(index - getCurrentSectionIndex()) * 100}vh)`,
              transition: isMobile
                ? `transform ${isScrolling ? TRANSITION_DURATION : 0}ms cubic-bezier(0.23, 1, 0.32, 1)`
                : `transform ${TRANSITION_DURATION}ms cubic-bezier(0.23, 1, 0.32, 1)`,
            }}
          >
            <SectionContent sectionId={section.id} isMobile={isMobile} />
          </div>
        ))}
      </div>

      {/* Bottom Navigation - Mobile Only */}
      {isMobile && (
        <BottomNavigation activeSection={currentSection} onNavigate={(sectionId) => goToSection(sectionId, false)} />
      )}

      <style jsx>{`
        .fullpage-container {
          height: 100dvh; /* Changed from 100vh to 100dvh for better mobile viewport handling */
          overflow: hidden;
          position: relative;
          font-family: 'SF Pro Display', system-ui, sans-serif;
        }

        .sections-wrapper {
          height: 100dvh; /* Changed from 100vh to 100dvh for better mobile viewport handling */
          position: relative;
          ${isMobile ? "width: 400vw;" : ""} /* 4 sections * 100vw each for mobile */
        }

        .section {
          height: 100dvh; /* Changed from 100vh to 100dvh for better mobile viewport handling */
          width: 100vw;
          position: absolute;
          top: 0;
          ${isMobile ? "left: 0;" : "left: 0;"}
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform ${TRANSITION_DURATION}ms cubic-bezier(0.23, 1, 0.32, 1);
          ${isMobile ? "padding-bottom: 80px;" : ""} /* Increased from 64px to 80px for larger bottom nav */
          box-sizing: border-box;
        }

        .section.active {
          z-index: 1;
        }
      `}</style>
    </div>
  )
}
