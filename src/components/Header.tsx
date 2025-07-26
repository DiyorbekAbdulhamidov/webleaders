'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, PhoneCall } from 'lucide-react'
import logo from '../../public/logo.png'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navLinks = [
    { href: 'services', label: 'Xizmatlar' },
    { href: 'portfolio', label: 'Portfolio' },
    { href: 'pricing', label: 'Narxlar' },
    { href: 'contact', label: 'Aloqa' },
  ]

  return (
    <header className="fixed top-0 z-50 mb-4 w-full bg-black/60 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center h-14 overflow-hidden">
          <Image
            src={logo}
            alt="Webleaders logo"
            style={{ width: '180px', height: '180' }}
            className="-my-3 transition-all duration-300"
            priority
          />

        </Link>
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="relative text-white/90 font-medium transition hover:text-green-400 group"
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="ml-6 bg-green-400 text-black font-semibold px-4 py-2 rounded-xl hover:bg-green-500 transition flex items-center gap-1"
          >
            <PhoneCall size={18} /> Telefon qilish
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white hover:text-green-400 transition">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-black/90 border-t border-white/10 px-6 py-4 backdrop-blur space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => {
                scrollToSection(link.href)
                setIsOpen(false)
              }}
              className="text-white/90 text-base font-medium hover:text-green-400 transition w-full text-left"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              scrollToSection('contact')
              setIsOpen(false)
            }}
            className="bg-green-400 text-black font-semibold text-center py-2 rounded-xl hover:bg-green-500 transition w-full"
          >
            Telefon qilish
          </button>
        </div>
      )}
    </header>
  )
}
