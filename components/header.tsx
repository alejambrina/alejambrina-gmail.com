"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
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
    <header className="px-6 py-4 flex items-center justify-between border-b border-techitoLightGray bg-white">
      <Logo />

      {/* Desktop Navigation */}
      <nav className="hidden md:flex ml-auto gap-4 sm:gap-6 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm font-medium text-techitoText hover:text-techitoPurple transition-colors",
              pathname === link.href && "text-techitoPurple font-semibold",
            )}
          >
            {link.label}
          </Link>
        ))}

        {/* CTA Button */}
        <Link href="/precios">
          <Button className="bg-techitoPurple hover:bg-techitoPurple/90 text-white font-medium py-1.5 px-4 rounded-md text-sm transition-all duration-200 ml-4">
            Conseguí tu Techito
          </Button>
        </Link>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-2">
        {/* Mobile CTA Button */}
        <Link href="/precios">
          <Button className="bg-techitoPurple hover:bg-techitoPurple/90 text-white font-medium py-1 px-3 rounded-md text-xs">
            Conseguí tu Techito
          </Button>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-techitoPurple">
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
                    "text-lg font-medium text-techitoText hover:text-techitoPurple transition-colors",
                    pathname === link.href && "text-techitoPurple font-semibold",
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile CTA in menu */}
              <div className="mt-6 pt-6 border-t border-techitoLightGray">
                <Link href="/precios">
                  <Button className="bg-techitoPurple hover:bg-techitoPurple/90 text-white font-medium py-2 px-4 rounded-md w-full">
                    Conseguí tu Techito
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
