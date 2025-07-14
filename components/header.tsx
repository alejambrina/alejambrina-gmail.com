"use client"

import Link from "next/link"
import { Home, Menu } from "lucide-react" // Removed other icon imports
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils" // Assuming cn utility is available

export default function Header() {
  const pathname = usePathname()

  const navLinks = [
    { href: "/como-funciona", label: "¿Cómo funciona?" },
    { href: "/precios", label: "Precios" },
    { href: "/preguntas", label: "Preguntas" },
    { href: "/blog", label: "Blog" },
    { href: "/contacto", label: "Contacto" },
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
              "text-sm font-medium text-techitoText hover:text-techitoPurple transition-colors", // Removed flex and gap
              pathname === link.href && "text-techitoPurple font-semibold",
            )}
          >
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
                    "text-lg font-medium text-techitoText hover:text-techitoPurple transition-colors", // Removed flex and gap
                    pathname === link.href && "text-techitoPurple font-semibold",
                  )}
                >
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
