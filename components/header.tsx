"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import { HoverLinkPreview } from "@/components/ui/hover-link-preview" // Import HoverLinkPreview

interface HeaderProps {
  currentSection: string
  onSectionClick: (sectionId: string) => void
  textColor: string
  scrollDirection: "up" | "down"
  isMobile: boolean
}

export default function Header({ currentSection, onSectionClick, textColor, scrollDirection, isMobile }: HeaderProps) {
  const sectionTitles = {
    home: "HERE",
    about: "A DEVELOPER",
    projects: "A CREATOR",
    contact: "AVAILABLE",
  }

  const sectionLinks = [
    { id: "home", label: "HOME" },
    { id: "about", label: "ABOUT" },
    { id: "projects", label: "PROJECTS" },
    { id: "contact", label: "CONTACT" },
  ]

  // Social links for mobile menu
  const socialLinks = [
    { href: "https://github.com/your-github", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com/in/your-linkedin", icon: Linkedin, label: "LinkedIn" },
    { href: "mailto:your-email@example.com", icon: Mail, label: "Email" },
  ]

  if (isMobile) {
    return (
      <header className="header">
        {/* Left - Dynamic Title */}
        <div className="header-left">
          <span>I'M&nbsp;</span>
          <span key={currentSection} className={`dynamic-title-part slide-in-${scrollDirection}`}>
            {sectionTitles[currentSection as keyof typeof sectionTitles]}
          </span>
        </div>

        {/* Right - Mobile Menu */}
        <div className="header-right">
          <MobileMenu onNavigate={onSectionClick} socialLinks={socialLinks} textColor={textColor} />
        </div>

        <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          z-index: 1000;
          font-family: var(--font-inter), 'Inter', system-ui, sans-serif;
          color: ${textColor};
        }

        .header-left {
          flex: 1;
          font-size: 0.9rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          overflow: hidden;
          height: 1em;
        }

        .dynamic-title-part {
          display: inline-block;
          white-space: nowrap;
          animation-duration: 0.5s;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }

        .slide-in-down {
          animation-name: slideInFromBottom;
        }

        .slide-in-up {
          animation-name: slideInFromTop;
        }

        @keyframes slideInFromBottom {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromTop {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .header-right {
          flex: 1;
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
      </header>
    )
  }

  // Desktop header (original)
  return (
    <header className="header">
      {/* Left - Dynamic Title */}
      <div className="header-left">
        <span>I'M&nbsp;</span>
        <span key={currentSection} className={`dynamic-title-part slide-in-${scrollDirection}`}>
          {sectionTitles[currentSection as keyof typeof sectionTitles]}
        </span>
      </div>

      {/* Right - Navigation Links */}
      <nav className="header-right">
        {sectionLinks.map((link) => (
          <HoverLinkPreview
            key={link.id}
            href={`/#${link.id}`} // Use hash link for internal navigation
            previewImage={`/${link.id}-preview.png`} // Unique image for each link
            imageAlt={`${link.label} section preview`}
            className="nav-link cursor-target" // Apply nav-link styles and cursor-target
            isMobile={isMobile} // Pass isMobile prop
            position="bottom" // Show preview below the link
            newTab={false} // Do not open in new tab
            onClick={() => onSectionClick(link.id)} // Keep existing navigation logic
          >
            {link.label}
          </HoverLinkPreview>
        ))}
      </nav>

      <style jsx>{`
      .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 40px;
        z-index: 1000;
        font-family: var(--font-inter), 'Inter', system-ui, sans-serif;
        color: ${textColor};
      }

      .header-left {
        flex: 1;
        font-size: 0.9rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        overflow: hidden;
        height: 1.2em;
      }

      .dynamic-title-part {
        display: inline-block;
        white-space: nowrap;
        animation-duration: 0.5s;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
      }

      .slide-in-down {
        animation-name: slideInFromBottom;
      }

      @keyframes slideInFromBottom {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes slideInFromTop {
        from {
          transform: translateY(-100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .header-right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        gap: 20px;
        font-size: 0.8rem;
        font-weight: 500;
      }

      /* Styles for HoverLinkPreview when used as nav-link */
      .nav-link {
        background: none;
        border: none;
        color: inherit; /* Inherit color from header */
        font-family: var(--font-inter), 'Inter', system-ui, sans-serif;
        font-size: 1rem;
        font-weight: 400;
        cursor: pointer;
        padding: 0;
        outline: none;
        transition: opacity 0.3s ease;
        text-decoration: none; /* Remove default underline */
      }

      .nav-link:hover {
        opacity: 0.7;
      }
    `}</style>
    </header>
  )
}
