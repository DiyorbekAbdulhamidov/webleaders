'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, PhoneCall, ChevronRight } from 'lucide-react'
import logo from '../../public/logo.png' // Logotip manzili to'g'ri ekanligiga ishonch hosil qiling

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Skroll bo'lganda Header foni o'zgarishi uchun
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  const navLinks = [
    { href: 'services', label: 'Xizmatlar' },
    { href: 'portfolio', label: 'Portfolio' },
    { href: 'pricing', label: 'Narxlar' },
    { href: 'contact', label: 'Aloqa' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-2'
          : 'bg-transparent py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
          {/* LOGO */}
          <Link href="/" className="relative z-50 group">
            {/* Logo o'rniga vaqtincha text yoki rasm */}
            <div className="flex items-center gap-2">
              {/* Agar rasm bo'lsa: */}
              {/* <Image src={logo} alt="Webleaders" width={160} height={50} className="object-contain" /> */}
              <span className="text-2xl font-bold text-white tracking-tighter">
                WEB<span className="text-green-400">LEADERS</span>
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="relative text-sm uppercase tracking-wider font-medium text-white/80 hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-green-400 transition-all duration-300 group-hover:w-full box-shadow-glow" />
              </button>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="ml-4 px-5 py-2.5 bg-green-500 text-black font-bold rounded-full flex items-center gap-2 hover:bg-green-400 transition-colors shadow-[0_0_20px_rgba(74,222,128,0.4)]"
            >
              <PhoneCall size={18} />
              <span>Bog‘lanish</span>
            </motion.button>
          </nav>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-50 text-white hover:text-green-400 transition p-2"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </motion.header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center space-y-8 lg:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                onClick={() => scrollToSection(link.href)}
                className="text-3xl font-bold text-white hover:text-green-400 flex items-center gap-2 group"
              >
                {link.label}
                <ChevronRight className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-green-400" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}