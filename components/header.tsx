"use client"

import Link from "next/link"
import { Home, Menu, HelpCircle, DollarSign, BookOpen, Mail, Lightbulb } from "lucide-react" // Import new icons
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils" // Assuming cn utility is available

export default function Header() {
  const pathname = usePathname()

  const navLinks = [
    { href: "/como-funciona", label: "¿Cómo funciona?", icon: Lightbulb }, // Changed to Lightbulb for "How it works"
    { href: "/precios", label: "Precios", icon: DollarSign },
    { href: "/preguntas", label: "Preguntas", icon: HelpCircle },
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/contacto", label: "Contacto", icon: Mail },
  ]

  return (
    <header className="px-6 py-4 flex items-center justify-between border-b border-techitoLightGray bg-techitoBackground">
      <Link href="/" className="flex items-center gap-2">
        <Home className="h-6 w-6 text-techitoPurple" />
        <span className="text-xl font-bold">Techito</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex ml-auto gap-4 sm:gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm font-medium text-techitoText hover:text-techitoPurple transition-colors flex items-center gap-1", // Added flex and gap
              pathname === link.href && "text-techitoPurple font-semibold",
            )}
          >
            <link.icon className="h-4 w-4" /> {/* Render icon */}
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-techitoPurple">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-techitoBackground p-6">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Home className="h-6 w-6 text-techitoPurple" />
              <span className="text-xl font-bold">Techito</span>
            </Link>
            <nav className="grid gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium text-techitoText hover:text-techitoPurple transition-colors flex items-center gap-2", // Added flex and gap
                    pathname === link.href && "text-techitoPurple font-semibold",
                  )}
                >
                  <link.icon className="h-5 w-5" /> {/* Render icon */}
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
