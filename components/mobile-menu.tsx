"use client"

import * as React from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect, memo } from "react"
import Image from "next/image"

interface MobileMenuProps {
  onNavigate: (sectionId: string) => void
  socialLinks: Array<{
    href: string
    icon: React.ElementType
    label: string
  }>
  textColor: string
}

export const MobileMenu = memo(function MobileMenu({ onNavigate, socialLinks, textColor }: MobileMenuProps) {
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNavigation = (sectionId: string) => {
    setOpen(false)
    onNavigate(sectionId)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  const menuItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ]

  if (!mounted) {
    return (
      <button className="w-9 h-9 flex items-center justify-center rounded-md transition-colors">
        <span className="sr-only">Toggle menu</span>
      </button>
    )
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="w-9 h-9 flex items-center justify-center rounded-md transition-all duration-200 hover:bg-white/10 cursor-target"
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
        className="w-full max-w-[320px] p-0 z-[1100] bg-black border-l border-gray-800/50 backdrop-blur-xl"
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 text-white z-10"
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <motion.div
          className="flex flex-col h-full text-white relative overflow-hidden"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div className="p-6 pt-16 flex justify-center" variants={item}>
            <div className="w-16 h-16 rounded-xl bg-white/10 p-3 shadow-lg">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain filter brightness-0 invert"
              />
            </div>
          </motion.div>

          {/* Navigation section */}
          <div className="flex-1 px-6 py-4">
            <nav className="space-y-2">
              {menuItems.map((menuItem, index) => (
                <motion.button
                  key={menuItem.label}
                  onClick={() => handleNavigation(menuItem.id)}
                  className="relative w-full text-left group block"
                  variants={item}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-white/5 group-hover:shadow-lg">
                    <div className="w-2 h-2 rounded-full bg-white opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors">
                      {menuItem.label}
                    </span>
                  </div>
                  <motion.div
                    className="absolute left-6 bottom-0 h-px bg-white"
                    initial={{ width: 0 }}
                    whileHover={{ width: "calc(100% - 3rem)" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Footer section */}
          <motion.div className="p-6 border-t border-gray-800/50 bg-gray-900/30 backdrop-blur-sm" variants={item}>
            <div className="text-sm font-medium mb-4 text-gray-300">Connect with me</div>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  className="p-3 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 hover:scale-105 hover:shadow-lg group"
                >
                  <link.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
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
