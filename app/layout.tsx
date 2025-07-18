import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Providers from "@/components/providers"
import MobileBottomNav from "@/components/mobile-bottom-nav"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "Techito - Tu plataforma inmobiliaria inteligente",
    template: "%s | Techito",
  },
  description:
    "Encuentra tu techito ideal con análisis inteligente de propiedades. Compara precios, analiza barrios y toma decisiones informadas.",
  keywords: ["propiedades", "inmobiliaria", "compra", "venta", "análisis", "Argentina", "CABA"],
  authors: [{ name: "Techito" }],
  creator: "Techito",
  publisher: "Techito",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://techito.com.ar"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://techito.com.ar",
    siteName: "Techito",
    title: "Techito - Tu plataforma inmobiliaria inteligente",
    description: "Encuentra tu techito ideal con análisis inteligente de propiedades",
    images: [
      {
        url: "/images/techito-logo-green.png",
        width: 1200,
        height: 630,
        alt: "Techito - Plataforma inmobiliaria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Techito - Tu plataforma inmobiliaria inteligente",
    description: "Encuentra tu techito ideal con análisis inteligente de propiedades",
    images: ["/images/techito-logo-green.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  generator: "Next.js",
  applicationName: "Techito",
  referrer: "origin-when-cross-origin",
  category: "Real Estate",
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/images/techito-logo-green.png" />
        <link rel="apple-touch-icon" href="/images/techito-logo-green.png" />
        <meta name="theme-color" content="#22C55E" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Techito" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <MobileBottomNav />
        </Providers>
      </body>
    </html>
  )
}
