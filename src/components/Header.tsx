'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, PhoneCall, ChevronRight, Globe, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext' // <-- Import

const langOptions = [
  { code: 'UZ', label: "O'zbek" },
  { code: 'RU', label: 'Русский' },
  { code: 'EN', label: 'English' }
]

export default function Header() {
  const { language, setLanguage, t } = useLanguage() // <-- Contextdan olish
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) setScrolled(isScrolled)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const headerOffset = 80
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
      setIsOpen(false)
    }
  }

  // Navigatsiya linklari endi tarjima bilan keladi
  const navLinks = [
    { href: 'services', label: t.nav.services },
    { href: 'portfolio', label: t.nav.portfolio },
    { href: 'pricing', label: t.nav.pricing },
    { href: 'contact', label: t.nav.contact },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-300 py-4 ${scrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'bg-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

          {/* LOGO */}
          <Link href="/" className="relative z-50 group">
            <div className="relative w-[180px] h-[50px] flex items-center">
              {!imageError ? (
                <Image
                  src="/logo.png"
                  alt="Webleaders"
                  width={180}
                  height={50}
                  className="object-contain"
                  priority
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="text-2xl font-bold text-white tracking-tighter">
                  WEB<span className="text-green-500">LEADERS</span>
                </span>
              )}
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="relative text-sm uppercase tracking-widest font-medium text-white/70 hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}

            <div className="w-[1px] h-6 bg-white/20 mx-2" />

            {/* LANGUAGE SWITCHER */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 text-sm font-bold text-white hover:text-green-400 transition-colors"
              >
                <Globe size={18} />
                {language}
                <ChevronDown size={14} className={`transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-4 w-32 bg-[#0F0F0F] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col"
                    onMouseLeave={() => setIsLangMenuOpen(false)}
                  >
                    {langOptions.map((langOpt) => (
                      <button
                        key={langOpt.code}
                        onClick={() => {
                          setLanguage(langOpt.code as any) // Tilni o'zgartirish
                          setIsLangMenuOpen(false)
                        }}
                        className={`px-4 py-3 text-left text-sm hover:bg-white/10 transition-colors ${language === langOpt.code ? 'text-green-400 font-bold' : 'text-gray-400'
                          }`}
                      >
                        {langOpt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA BUTTON */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="ml-2 px-6 py-3 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:bg-green-400 transition-all"
            >
              <PhoneCall size={18} />
              <span className="text-xs uppercase tracking-wider">{t.nav.btn}</span>
            </motion.button>
          </nav>

          {/* MOBILE TOGGLE */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden relative z-50 p-2 text-white hover:text-green-400 transition-colors">
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 lg:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                onClick={() => scrollToSection(link.href)}
                className="text-3xl font-black text-white hover:text-green-400 flex items-center gap-2 group uppercase tracking-tighter"
              >
                {link.label}
                <ChevronRight className="opacity-0 -ml-8 group-hover:opacity-100 group-hover:ml-0 transition-all text-green-400" />
              </motion.button>
            ))}

            <div className="w-20 h-[1px] bg-white/10 my-4" />

            {/* Mobile Lang Switcher */}
            <div className="flex gap-4">
              {langOptions.map((langOpt, i) => (
                <motion.button
                  key={langOpt.code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  onClick={() => setLanguage(langOpt.code as any)}
                  className={`px-4 py-2 rounded-full border text-sm font-bold transition-all ${language === langOpt.code
                      ? 'border-green-500 text-green-500 bg-green-500/10'
                      : 'border-white/20 text-gray-400'
                    }`}
                >
                  {langOpt.code}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}