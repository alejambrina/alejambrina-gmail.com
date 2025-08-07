'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Logo from './logo'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white border-b border-techitoLightGray sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/como-funciona" className="text-techitoText hover:text-techitoPurple transition-colors">
              Cómo funciona
            </Link>
            <Link href="/precios" className="text-techitoText hover:text-techitoPurple transition-colors">
              Precios
            </Link>
            <Link href="/preguntas" className="text-techitoText hover:text-techitoPurple transition-colors">
              Preguntas
            </Link>
            <Link href="/blog" className="text-techitoText hover:text-techitoPurple transition-colors">
              Blog
            </Link>
            <Link href="/contacto" className="text-techitoText hover:text-techitoPurple transition-colors">
              Contacto
            </Link>
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Link href="/precios">
              <Button className="bg-techitoPurple hover:bg-techitoPurple/90 text-white font-medium py-1.5 px-4 text-sm rounded-md transition-colors">
                Conseguí tu Techito
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* CTA Button - Mobile */}
            <Link href="/precios">
              <Button className="bg-techitoPurple hover:bg-techitoPurple/90 text-white font-medium py-1 px-3 text-xs rounded-md transition-colors">
                Conseguí tu Techito
              </Button>
            </Link>
            
            <button
              onClick={toggleMenu}
              className="text-techitoText hover:text-techitoPurple transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-techitoLightGray">
              <Link
                href="/como-funciona"
                className="block px-3 py-2 text-techitoText hover:text-techitoPurple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Cómo funciona
              </Link>
              <Link
                href="/precios"
                className="block px-3 py-2 text-techitoText hover:text-techitoPurple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Precios
              </Link>
              <Link
                href="/preguntas"
                className="block px-3 py-2 text-techitoText hover:text-techitoPurple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Preguntas
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 text-techitoText hover:text-techitoPurple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contacto"
                className="block px-3 py-2 text-techitoText hover:text-techitoPurple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <Link
                href="/precios"
                className="block px-3 py-2 bg-techitoPurple text-white rounded-md font-medium mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Conseguí tu Techito
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
