"use client"

import type React from "react"
import { memo, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Mail, Github, Linkedin, Phone, Instagram, ExternalLink } from "lucide-react"
import { XIcon } from "@/components/x-icon"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"

interface ContactSectionProps {
  isMobile: boolean
}

// Contact items - moved outside component to prevent recreation on each render
const contactItems = [
  {
    icon: Phone,
    title: "Phone & WhatsApp",
    content: "(+212) 704 749 027",
    href: "https://wa.me/212704749027",
    color: "#25D366", // WhatsApp green
  },
  {
    icon: Mail,
    title: "Email",
    content: "noureddineelmhassani@email.com",
    href: "mailto:noureddineelmhassani@email.com",
    color: "#EA4335", // Gmail red
  },
  {
    icon: Github,
    title: "GitHub",
    content: "nordixdotma",
    href: "https://github.com/nordixdotma",
    color: "#000000", // Changed from #333 to #000000 to match X/Twitter
  },
  {
    icon: XIcon,
    title: "X / Twitter",
    content: "nordixdotma",
    href: "https://x.com/nordixdotma",
    color: "#000000", // X/Twitter black
  },
  {
    icon: Instagram,
    title: "Instagram",
    content: "nordix.ma",
    href: "https://instagram.com/nordix.ma",
    color: "#E1306C", // Instagram pink
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    content: "nordixdotma",
    href: "https://linkedin.com/in/nordixdotma",
    color: "#0A66C2", // LinkedIn blue
  },
]

// Animation variants - optimized and simplified
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Reduced from 0.1 for faster appearance
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 }, // Reduced y distance from 20 to 10
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }, // Reduced duration from 0.5 to 0.3
}

function ContactSectionComponent({ isMobile }: ContactSectionProps) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  // Optimized handlers with useCallback to prevent recreation on each render
  const handleMouseEnter = useCallback((index: number) => {
    setHoveredItem(index)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredItem(null)
  }, [])

  const { ref: contactRef, inView: contactInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  })

  return (
    <section
      id="contact"
      className={`w-full ${
        isMobile ? "min-h-[calc(100dvh-4rem-64px)] flex flex-col justify-center" : "py-12 md:py-24 lg:py-32"
      } relative overflow-hidden`}
    >
      <div
        className={`container px-4 md:px-6 mx-auto relative z-10 ${isMobile && "flex flex-col h-full justify-center"}`}
      >
        <motion.div
          ref={contactRef}
          initial={{ opacity: 0, y: -30, rotateX: 20 }}
          animate={contactInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: -30, rotateX: 20 }}
          transition={{
            duration: 0.7,
            type: "spring",
            stiffness: 50,
          }}
          viewport={{ once: true }}
          className={`flex flex-col items-center space-y-4 text-center ${!isMobile ? "mb-8" : "mb-6"}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#ff4500]">Let’s Talk</h2>
          </motion.div>
          <motion.p
            className="max-w-[600px] text-sm sm:text-base text-[#ff4500]/80 whitespace-nowrap overflow-hidden text-ellipsis"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {isMobile
              ? "Got a project idea? Hit me up."
              : "Got a project idea or curious about something I've made? Hit me up. I'd love to chat. Find me on my socials."}
          </motion.p>
        </motion.div>

        {/* Mobile-optimized grid with improved touch handling */}
        {isMobile ? (
          <motion.div
            className="grid grid-cols-3 gap-3 max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={contactInView ? "visible" : "hidden"}
          >
            {contactItems.map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: {
                    opacity: 0,
                    x: i % 2 === 0 ? -20 : 20,
                    y: i % 3 === 0 ? -10 : 0,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: i * 0.1,
                    },
                  },
                }}
                className="touch-manipulation relative"
              >
                <Link
                  href={item.href}
                  target="_blank"
                  className={cn(
                    "flex flex-col items-center justify-center aspect-square p-4 rounded-lg text-center cursor-target",
                    "backdrop-blur-sm border transition-colors duration-200",
                    "active:scale-95 group",
                    "relative z-10",
                  )}
                  style={{
                    boxShadow: !isMobile && hoveredItem === i ? `0 0 15px 2px ${item.color}40` : "none",
                    willChange: "transform",
                    borderColor: hoveredItem === i ? item.color : "#ff45004d", // Dynamic border color
                  }}
                  onClick={() => handleMouseEnter(i)}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                  onTouchStart={() => handleMouseEnter(i)}
                  onTouchEnd={handleMouseLeave}
                >
                  <div className="flex items-center justify-center mb-1 relative">
                    <item.icon
                      className={cn(
                        "w-5 h-5 transition-colors duration-200",
                        hoveredItem === i ? "text-[var(--item-color)]" : "text-[#ff4500]",
                      )}
                      style={{ "--item-color": item.color } as React.CSSProperties}
                    />
                  </div>
                  <h3
                    className={cn(
                      "text-xs font-medium transition-colors line-clamp-1",
                      hoveredItem === i ? "text-[var(--item-color)]" : "text-[#ff4500]",
                    )}
                    style={{ "--item-color": item.color } as React.CSSProperties}
                  >
                    {item.title.split(" ")[0]}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Desktop layout with optimized animations
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={contactInView ? "visible" : "hidden"}
          >
            {contactItems.map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: {
                    opacity: 0,
                    x: i % 2 === 0 ? -50 : 50,
                    rotateY: i % 2 === 0 ? -10 : 10,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    transition: {
                      type: "spring",
                      stiffness: 70,
                      damping: 15,
                      delay: i * 0.15,
                    },
                  },
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
              >
                <Link
                  href={item.href}
                  target="_blank"
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-lg cursor-target",
                    "backdrop-blur-sm border transition-colors duration-200",
                    "group relative overflow-hidden",
                  )}
                  style={{
                    boxShadow: hoveredItem === i ? `0 0 20px 2px ${item.color}40` : "none",
                    willChange: "transform, box-shadow",
                    borderColor: hoveredItem === i ? item.color : "#ff45004d", // Dynamic border color
                  }}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Simplified gradient animation */}
                  <AnimatePresence>
                    {hoveredItem === i && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r"
                        style={{
                          backgroundImage: `linear-gradient(120deg, ${item.color}10, transparent 80%)`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-center w-12 h-12 rounded-full border relative z-10 bg-white/10">
                    <item.icon
                      className={cn(
                        "w-5 h-5 transition-colors duration-200",
                        hoveredItem === i ? "text-[var(--item-color)]" : "text-[#ff4500]",
                      )}
                      style={{ "--item-color": item.color } as React.CSSProperties}
                    />
                    {/* Simplified pulse animation that only runs when hovered */}
                    {hoveredItem === i && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-[var(--item-color)]"
                        style={{ "--item-color": item.color } as React.CSSProperties}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: [0, 0.1, 0],
                          scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                          repeat: 1,
                          duration: 1.5,
                        }}
                      />
                    )}
                  </div>

                  <div className="flex-1 relative z-10">
                    <h3
                      className={cn(
                        "text-sm font-medium transition-colors",
                        hoveredItem === i ? "text-[var(--item-color)]" : "text-[#ff4500]",
                      )}
                      style={{ "--item-color": item.color } as React.CSSProperties}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#ff4500]/80">{item.content}</p>
                  </div>

                  {/* Simplified icon animation */}
                  <AnimatePresence>
                    {hoveredItem === i && (
                      <motion.div
                        className="ml-auto relative z-10"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ExternalLink
                          className={cn("w-4 h-4", hoveredItem === i ? "text-[var(--item-color)]" : "text-[#ff4500]")}
                          style={{ "--item-color": item.color } as React.CSSProperties}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Simplified decorative elements - reduced blur for better performance */}
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ff4500]/5 rounded-full blur-2xl" />
        <div className="absolute top-1/4 right-0 w-40 h-40 bg-[#ff4500]/5 rounded-full blur-2xl" />
      </div>
    </section>
  )
}

// Use memo to prevent unnecessary re-renders
export const ContactSection = memo(ContactSectionComponent)
