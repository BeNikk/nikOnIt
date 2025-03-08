import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Merriweather, Merriweather_Sans } from "next/font/google"
import Link from "next/link"

const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
})

const merriweatherSans = Merriweather_Sans({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-merriweather-sans",
})

export const metadata: Metadata = {
  title: "On It",
  description: "A zen-inspired minimalist blog focused on clarity and simplicity",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${merriweather.variable} ${merriweatherSans.variable} font-serif bg-white text-neutral-800`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <header className="mb-16">
            <nav className="flex justify-between items-center text-neutral-500">
              <div>
                <Link href="/" className="text-neutral-700 hover:text-neutral-900 transition-colors">
                  Blog
                </Link>
              </div>
              <div className="flex gap-x-8 text-sm font-sans">
                <Link href="/archive" className="hover:text-neutral-900 transition-colors">
                  archives
                </Link>
                <Link href="/about" className="hover:text-neutral-900 transition-colors">
                  about
                </Link>
              </div>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}

