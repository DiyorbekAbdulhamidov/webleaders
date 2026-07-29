'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { useLanguage, LangType } from '@/context/LanguageContext'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Phone } from 'lucide-react'

const langOptions: { code: LangType; label: string }[] = [
  { code: 'UZ', label: "O'zbekcha" },
  { code: 'RU', label: 'Русский' },
  { code: 'EN', label: 'English' }
]

export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [imageError, setImageError] = useState(false)
  const pathname = usePathname()
  const [prevPathname, setPrevPathname] = useState(pathname)

  // Sahifa almashganda menyuni yopamiz (render paytida — effekt kaskadisiz)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  if (pathname === '/ramadan') return null

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/services', label: t.nav.services },
    { href: '/portfolio', label: t.nav.portfolio },
    { href: '/pricing', label: t.nav.pricing },
    { href: '/contact', label: t.nav.contact },
  ]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const menuVariants: Variants = {
    closed: { y: '-100%', transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
    open: { y: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }
  }

  const listVariants: Variants = {
    open: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
    closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } }
  }

  const itemVariants: Variants = {
    open: { y: 0, opacity: 1, transition: { duration: 0.45, ease: 'easeOut' } },
    closed: { y: 30, opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } }
  }

  return (
    <>
      {/* Animatsiya CSS orqali — header JS kelmasidan ko'rinadi */}
      <header
        className={`wl-reveal-down fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled || isOpen
          ? 'bg-[#050505]/70 backdrop-blur-xl border-b border-white/[0.05] py-3'
          : 'bg-transparent border-b border-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8">

          {/* LOGO */}
          <Link href="/" className="relative z-[101] flex items-center" aria-label="Webleaders — Bosh sahifa">
            <div className="relative w-[150px] h-[38px] flex items-center">
              {!imageError ? (
                <Image
                  src="/logo.png"
                  alt="Webleaders logo"
                  width={150}
                  height={32}
                  className="object-contain transition-opacity duration-300 hover:opacity-80"
                  priority
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="text-lg font-bold uppercase tracking-[0.25em] text-white">
                  WEB<span className="text-green-500">LEADERS</span>
                </span>
              )}
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-10" aria-label="Asosiy navigatsiya">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 py-1 group ${isActive(link.href) ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-1/2 h-[2px] bg-green-500 transition-all duration-300 -translate-x-1/2 rounded-full ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full opacity-60'
                    }`} />
                </Link>
              ))}
            </div>

            <div className="w-[1px] h-3 bg-white/10" />

            {/* LANG SWITCHER */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="text-[10px] font-bold tracking-[0.2em] text-gray-400 hover:text-white uppercase transition-colors py-1 flex items-center gap-1 cursor-pointer"
                aria-label="Tilni tanlash"
              >
                {language}
                <span className="text-[8px] opacity-40 transition-transform duration-300" style={{ transform: isLangMenuOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full right-0 mt-4 w-32 bg-[#09090b] border border-white/[0.08] rounded-xl shadow-2xl p-1 z-50 overflow-hidden"
                    onMouseLeave={() => setIsLangMenuOpen(false)}
                  >
                    {langOptions.map((langOpt) => (
                      <button
                        key={langOpt.code}
                        onClick={() => {
                          setLanguage(langOpt.code)
                          setIsLangMenuOpen(false)
                        }}
                        className={`w-full px-3 py-2 text-left text-[10px] tracking-widest font-medium uppercase rounded-lg transition-all cursor-pointer ${language === langOpt.code
                          ? 'text-white bg-white/5 font-bold'
                          : 'text-gray-500 hover:text-white hover:bg-white/[0.02]'
                          }`}
                      >
                        {langOpt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="group px-6 py-2.5 bg-green-500 text-black text-[10px] font-bold tracking-[0.2em] uppercase rounded-full hover:bg-green-400 hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all duration-300 flex items-center gap-1.5"
            >
              {t.nav.btn}
              <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </nav>

          {/* HAMBURGER */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-[101] flex flex-col justify-center items-center w-8 h-8 gap-[6px] cursor-pointer"
            aria-label={isOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
            aria-expanded={isOpen}
          >
            <span className={`w-6 h-[2px] bg-white rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
            <span className={`w-6 h-[2px] bg-white rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[99] bg-[#060607] px-7 pt-28 pb-10 lg:hidden flex flex-col justify-between overflow-y-auto"
          >
            {/* Nozik gradient fon */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-green-500/[0.06] rounded-full blur-[120px]" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-green-900/[0.08] rounded-full blur-[100px]" />
            </div>

            <motion.nav variants={listVariants} className="relative z-10 flex flex-col gap-2 w-full" aria-label="Mobil navigatsiya">
              {navLinks.map((link, i) => (
                <motion.div key={link.href} variants={itemVariants} className="overflow-hidden">
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`w-full text-left text-4xl font-bold tracking-tight py-3 flex items-baseline gap-4 group ${isActive(link.href) ? 'text-green-400' : 'text-gray-300 active:text-white'
                      }`}
                  >
                    <span className="text-[11px] font-mono tracking-normal text-gray-600">0{i + 1}</span>
                    <span className="transition-transform duration-300 group-active:translate-x-2">{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <div className="relative z-10 mt-12 pt-8 border-t border-white/[0.06] flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-[10px] tracking-widest uppercase font-semibold">Til / Язык</span>
                <div className="flex gap-5">
                  {langOptions.map((langOpt) => (
                    <button
                      key={langOpt.code}
                      onClick={() => setLanguage(langOpt.code)}
                      className={`text-xs font-bold tracking-widest uppercase transition-all cursor-pointer ${language === langOpt.code ? 'text-green-400' : 'text-gray-600'
                        }`}
                    >
                      {langOpt.code}
                    </button>
                  ))}
                </div>
              </div>

              <a
                href="tel:+998200127707"
                className="flex items-center justify-center gap-2 w-full py-4 border border-white/10 text-white font-semibold text-sm rounded-2xl active:scale-[0.98] transition-transform"
              >
                <Phone size={16} className="text-green-400" /> +998 20 012 77 07
              </a>

              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full py-4 bg-green-500 text-black font-bold text-xs tracking-[0.2em] uppercase text-center rounded-2xl active:scale-[0.98] transition-transform shadow-[0_0_30px_rgba(34,197,94,0.25)]"
              >
                {t.nav.btn}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
