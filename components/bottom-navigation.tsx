"use client"

import { Home, User, FolderOpen, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { memo } from "react"
import { motion } from "framer-motion"

interface BottomNavigationProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
}

// Memoize the component to prevent unnecessary re-renders
export const BottomNavigation = memo(function BottomNavigation({ activeSection, onNavigate }: BottomNavigationProps) {
  // Define navigation items outside of render to prevent recreation on each render
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "about", icon: User, label: "About" },
    { id: "projects", icon: FolderOpen, label: "Projects" },
    { id: "contact", icon: Mail, label: "Contact" },
  ]

  // Get current section colors - matching the section background and text
  const getSectionColors = (sectionId: string) => {
    switch (sectionId) {
      case "home":
        return {
          background: "#000000",
          text: "#ffffff",
          border: "#ffffff",
        }
      case "about":
        return {
          background: "#ffffff",
          text: "#000000",
          border: "#000000",
        }
      case "projects":
        return {
          background: "#ff4500",
          text: "#faf9f6",
          border: "#faf9f6",
        }
      case "contact":
        return {
          background: "#faf9f6",
          text: "#ff4500",
          border: "#ff4500",
        }
      default:
        return {
          background: "#000000",
          text: "#ffffff",
          border: "#ffffff",
        }
    }
  }

  const currentColors = getSectionColors(activeSection)

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md border-t md:hidden"
      style={{
        backgroundColor: currentColors.background,
        borderTopColor: `${currentColors.border}20`, // Reduced opacity for lighter border
      }}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{
        delay: 0.5,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <div className="flex justify-around items-center h-20">
        {" "}
        {/* Increased height from h-14 to h-20 for larger elements */}
        {navItems.map((item) => {
          const isActive = activeSection === item.id

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn("flex flex-col items-center justify-center w-full h-full relative")}
              style={{
                color: isActive ? currentColors.text : `${currentColors.text}60`, // 60% opacity for inactive
              }}
              aria-label={`Navigate to ${item.label} section`}
            >
              <motion.div
                animate={
                  isActive
                    ? {
                        scale: [1, 1.2, 1], // Increased scale from 1.1 back to 1.2 for more prominent active state
                        transition: { duration: 0.3 },
                      }
                    : { scale: 1 }
                }
              >
                <item.icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />{" "}
                {/* Increased size from w-4 h-4 to w-6 h-6 */}
              </motion.div>
              <motion.span
                className="text-xs mt-1" // Increased text size from text-[10px] to text-xs and margin from mt-0.5 to mt-1
                animate={
                  isActive
                    ? {
                        y: [0, -2, 0], // Increased movement from -1 back to -2
                        transition: { duration: 0.3 },
                      }
                    : { y: 0 }
                }
              >
                {item.label}
              </motion.span>
            </button>
          )
        })}
      </div>
    </motion.div>
  )
})
