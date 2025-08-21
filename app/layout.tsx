import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Noureddine El Mhassani - Full Stack Developer & Software Engineer",
  description:
    "Experienced full stack developer specializing in React, Next.js, Node.js, and modern web technologies. Creating fast, reliable, and scalable web applications.",
  keywords:
    "full stack developer, software engineer, React developer, Next.js, Node.js, web development, JavaScript, TypeScript, frontend, backend",
  authors: [{ name: "Noureddine El Mhassani" }],
  creator: "Noureddine El Mhassani",
  publisher: "Noureddine El Mhassani",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com", // Replace with your actual domain
    title: "Noureddine El Mhassani - Full Stack Developer",
    description: "Experienced full stack developer creating innovative web solutions with modern technologies.",
    siteName: "Noureddine El Mhassani Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Add your Open Graph image
        width: 1200,
        height: 630,
        alt: "Noureddine El Mhassani - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noureddine El Mhassani - Full Stack Developer",
    description: "Experienced full stack developer creating innovative web solutions with modern technologies.",
    creator: "@nordixdotma",
    images: ["/og-image.jpg"], // Add your Twitter card image
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ff4500",
  generator: "Next.js",
  applicationName: "Noureddine El Mhassani Portfolio",
  referrer: "origin-when-cross-origin",
  colorScheme: "light dark",
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" translate="no" className={`${inter.variable} antialiased`}>
      <head>
        {/* Disable browser auto-translation */}
        <meta name="google" content="notranslate" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        {/* Additional SEO meta tags */}
        <link rel="canonical" href="https://your-domain.com" />
        <meta name="format-detection" content="telephone=no" />

        <link rel="preload" href="/MoonetdemoRegular-6RnxY.otf" as="font" type="font/otf" crossOrigin="anonymous" />

        {/* San Francisco Font */}
        <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet" />

        {/* Structured Data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Noureddine El Mhassani",
              jobTitle: "Full Stack Developer",
              description:
                "Experienced full stack developer specializing in React, Next.js, Node.js, and modern web technologies.",
              url: "https://your-domain.com",
              sameAs: [
                "https://github.com/nordixdotma",
                "https://linkedin.com/in/nordixdotma",
                "https://x.com/nordixdotma",
                "https://instagram.com/nordix.ma",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "Node.js",
                "JavaScript",
                "TypeScript",
                "Full Stack Development",
                "Web Development",
                "Software Engineering",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+212704749027",
                contactType: "professional",
                availableLanguage: ["English", "French", "Arabic"],
              },
            }),
          }}
        />
      </head>
      <body translate="no" className="notranslate">
        {children}
      </body>
    </html>
  )
}
