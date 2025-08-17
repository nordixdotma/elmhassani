"use client"

import HeroSection from "./sections/hero-section"
import { ContactSection } from "./sections/contact-section"
import ProjectsSection from "./sections/projects-section"
import { AboutSection } from "./sections/about-section"

interface SectionContentProps {
  sectionId: string
  isMobile: boolean
}

export default function SectionContent({ sectionId, isMobile }: SectionContentProps) {
  // Conditionally render specific section components
  switch (sectionId) {
    case "home":
      return <HeroSection isMobile={isMobile} />
    case "about":
      return <AboutSection isMobile={isMobile} />
    case "projects":
      return <ProjectsSection isMobile={isMobile} />
    case "contact":
      return <ContactSection isMobile={isMobile} />
    default:
      return (
        <div className="section-content-default w-full h-full flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Section {sectionId}</h1>
            <p className="text-lg sm:text-xl opacity-90">Default content</p>
          </div>
        </div>
      )
  }
}
