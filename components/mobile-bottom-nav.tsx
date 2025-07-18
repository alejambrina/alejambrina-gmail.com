"use client"

import { Home, Search, Heart, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", icon: Home, label: "Inicio" },
  { href: "/compra", icon: Search, label: "Buscar" },
  { href: "/favoritos", icon: Heart, label: "Favoritos" },
  { href: "/perfil", icon: User, label: "Perfil" },
]

export default function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center py-2 px-3 text-xs transition-colors",
                isActive ? "text-techitoPurple" : "text-gray-500 hover:text-techitoPurple",
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
