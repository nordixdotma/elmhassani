"use client"

import * as React from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect, memo } from "react"

interface MobileMenuProps {
  onNavigate: (sectionId: string) => void
  socialLinks: Array<{
    href: string
    icon: React.ElementType
    label: string
  }>
  textColor: string
}

// Memoize the component to prevent unnecessary re-renders
export const MobileMenu = memo(function MobileMenu({ onNavigate, socialLinks, textColor }: MobileMenuProps) {
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = useState(false)

  // After hydration, we can show the correct theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNavigation = (sectionId: string) => {
    setOpen(false)
    onNavigate(sectionId)
  }

  // Define animation variants outside of render to prevent recreation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  }

  // Define menu items outside of render to prevent recreation
  const menuItems = [
    { label: "about", id: "about" },
    { label: "projects", id: "projects" },
    { label: "contact", id: "contact" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="w-9 h-9 flex items-center justify-center rounded-md transition-colors hover:bg-black/10 cursor-target"
          style={{ color: textColor }}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 transition-transform duration-200 hover:scale-110"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full max-w-[280px] p-0 z-[1100] bg-black border-0 [&>button]:text-white [&>button]:w-5 [&>button]:h-5 [&>button]:right-2 [&>button]:top-4"
      >
        <motion.div
          className="flex flex-col h-full bg-black text-white"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Header section */}
          <div className="p-6">
            <motion.div className="mb-8" variants={item}>
              <h2
                className="text-2xl font-normal mb-2 text-white"
                style={{ fontFamily: "MoonetdemoRegular, Inter, system-ui, sans-serif" }}
              >
                N
              </h2>
              <div className="h-0.5 w-8 bg-[#ff4500] rounded-full" />
            </motion.div>
          </div>

          {/* Navigation section - left aligned, smaller text, no bold */}
          <div className="flex-1 flex items-center justify-start pl-6">
            <nav className="space-y-6">
              {menuItems.map((menuItem, index) => (
                <motion.button
                  key={menuItem.label}
                  onClick={() => handleNavigation(menuItem.id)}
                  className="relative w-full text-lg font-normal capitalize text-left group block"
                  variants={item}
                  whileHover="hover"
                >
                  <span className="relative z-10 group-hover:text-[#ff4500] transition-colors duration-300 text-white">
                    {menuItem.label}
                  </span>
                  <motion.div
                    className="absolute left-0 bottom-0 w-0 h-2 bg-[#ff4500]/20 rounded-full"
                    initial={false}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Footer section */}
          <motion.div className="mt-auto p-6 border-t border-[#ff4500]" variants={item} initial="hidden" animate="show">
            <div className="text-sm font-medium mb-4 text-white">Connect with me</div>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  className="p-2.5 rounded-lg border border-[#ff4500] bg-black hover:bg-[#ff4500]/10 hover:border-[#ff4500] transition-colors"
                >
                  <link.icon className="w-5 h-5 text-white" />
                  <span className="sr-only">{link.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </SheetContent>
    </Sheet>
  )
})
