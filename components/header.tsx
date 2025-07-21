"use client"

import Link from "next/link"
import { Menu, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Logo from "@/components/logo"

export default function Header() {
  const pathname = usePathname()

  const navLinks = [
    { href: "/compra", label: "Propiedades" },
    { href: "/precios", label: "Compra TuTechito" },
    { href: "/blog", label: "Blog" },
    { href: "/contacto", label: "Contacto" },
  ]

  return (
    <header className="px-6 py-4 flex items-center justify-between border-b border-techitoLightGray bg-white sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <Logo />

      {/* Desktop Navigation */}
      <nav className="hidden md:flex ml-auto gap-4 sm:gap-6 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm font-medium text-techitoText hover:text-techitoPrimary transition-colors",
              pathname === link.href && "text-techitoPrimary font-semibold",
            )}
          >
            {link.label}
          </Link>
        ))}

        {/* CTA Button */}
        <Link href="/precios">
          <Button className="btn-cta ml-4 group">
            Conseguí tu Techito
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-2">
        {/* Mobile CTA Button */}
        <Link href="/precios">
          <Button size="sm" className="btn-cta text-xs px-4 py-2">
            Conseguí tu Techito
          </Button>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-techitoPrimary">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-white p-6">
            <Logo />
            <nav className="grid gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium text-techitoText hover:text-techitoPrimary transition-colors py-2",
                    pathname === link.href && "text-techitoPrimary font-semibold",
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile CTA in menu */}
              <div className="mt-6 pt-6 border-t border-techitoLightGray">
                <Link href="/precios">
                  <Button className="btn-cta w-full group">
                    Conseguí tu Techito
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
