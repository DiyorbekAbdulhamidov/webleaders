'use client'

import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Send,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { usePathname } from 'next/navigation'

const footerContent = {
  UZ: {
    desc: "Biznesingizni raqamli dunyoda yangi bosqichga olib chiquvchi innovatsion IT kompaniya. Sifat, tezlik va natija — bizning shiorimiz.",
    menuTitle: "Menyu",
    home: "Bosh sahifa",
    team: "Jamoa",
    newsletterTitle: "Yangiliklardan xabardor bo‘ling",
    newsletterDesc: "Eng so‘nggi IT yangiliklar va aksiyalarimiz haqida birinchi bo‘lib biling.",
    emailPlaceholder: "Email manzilingiz",
    privacy: "Maxfiylik siyosati",
    terms: "Foydalanish shartlari"
  },
  RU: {
    desc: "Инновационная IT-компания, выводящая ваш бизнес на новый уровень в цифровом мире. Качество, скорость и результат — наш девиз.",
    menuTitle: "Меню",
    home: "Главная",
    team: "Команда",
    newsletterTitle: "Будьте в курсе новостей",
    newsletterDesc: "Узнавайте первыми о последних новостях IT и наших акциях.",
    emailPlaceholder: "Ваш Email",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования"
  },
  EN: {
    desc: "Innovative IT company taking your business to the next level in the digital world. Quality, speed, and results are our motto.",
    menuTitle: "Menu",
    home: "Home",
    team: "Team",
    newsletterTitle: "Stay updated",
    newsletterDesc: "Be the first to know about the latest IT news and our promotions.",
    emailPlaceholder: "Your Email",
    privacy: "Privacy Policy",
    terms: "Terms of Use"
  }
}

export default function Footer() {
  const { t, language } = useLanguage()
  const content = footerContent[language]
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()

  if (pathname === "/ramadan") return null

  const navLinks = [
    { name: content.home, href: '#home' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.portfolio, href: '#projects' },
    { name: t.nav.pricing, href: '#pricing' },
    { name: content.team, href: '#team' }
  ]

  return (
    <footer className="relative bg-black text-white pt-24 pb-12 border-t border-white/[0.06] overflow-hidden">

      {/* Premium Ambient Light Layer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-green-950/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Optimized Grid System to stop mid-screen wrapping issues */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-10 xl:gap-8 mb-16">

          {/* 1. BRAND & ABOUT */}
          <div className="xl:col-span-4 space-y-5">
            <Link href="/" className="inline-block group">
              <span className="text-2xl font-black tracking-tighter text-white transition-transform duration-300 block group-hover:scale-[1.01]">
                WEB<span className="text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]">LEADERS</span>
              </span>
            </Link>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm font-light tracking-wide">
              {content.desc}
            </p>
            <div className="flex gap-3 pt-2">
              {[
                { icon: Instagram, href: "https://www.instagram.com/webleaders.uz/" },
                { icon: Facebook, href: "#" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/106364349/" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-black hover:bg-green-500 hover:border-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. NAVIGATION */}
          <div className="xl:col-span-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-1.5">
              <Sparkles size={10} className="text-green-400" />
              {content.menuTitle}
            </h3>
            <ul className="space-y-3.5">
              {navLinks.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="text-gray-400 hover:text-green-400 text-sm font-light transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-green-500 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. CONTACTS */}
          <div className="xl:col-span-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
              {t.footer.contact}
            </h3>
            <ul className="space-y-4">

              {/* Phone */}
              <li>
                <a href="tel:+998200127707" className="group flex items-center gap-3.5 min-w-0 w-full">
                  <div className="p-2 rounded-xl bg-white/5 text-green-400 group-hover:bg-green-500 group-hover:text-black transition-all duration-300 flex-shrink-0 border border-white/5">
                    <Phone size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider">{t.contactSection.infoPhone}</span>
                    <span className="text-sm font-semibold text-gray-300 group-hover:text-green-400 transition-colors block truncate whitespace-nowrap font-mono">
                      +998 20 012 77 07
                    </span>
                  </div>
                </a>
              </li>

              {/* Email */}
              <li>
                <a href="mailto:info@webleaders.uz" className="group flex items-center gap-3.5 min-w-0 w-full">
                  <div className="p-2 rounded-xl bg-white/5 text-green-400 group-hover:bg-green-500 group-hover:text-black transition-all duration-300 flex-shrink-0 border border-white/5">
                    <Mail size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider">{t.contactSection.infoEmail}</span>
                    <span className="text-sm font-semibold text-gray-300 group-hover:text-green-400 transition-colors block truncate whitespace-nowrap">
                      info@webleaders.uz
                    </span>
                  </div>
                </a>
              </li>

              {/* Location */}
              <li className="flex items-center gap-3.5 min-w-0 w-full group">
                <div className="p-2 rounded-xl bg-white/5 text-green-400 group-hover:border-green-500/20 transition-all duration-300 flex-shrink-0 border border-white/5">
                  <MapPin size={14} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider">{t.contactSection.infoLoc}</span>
                  <span className="text-sm font-medium text-gray-300 block truncate whitespace-nowrap">
                    {t.footer.address}
                  </span>
                </div>
              </li>

            </ul>
          </div>

          {/* 4. NEWSLETTER */}
          <div className="xl:col-span-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
              {content.newsletterTitle}
            </h3>
            <p className="text-gray-400 text-xs mb-4 font-light leading-relaxed">
              {content.newsletterDesc}
            </p>
            <form className="relative w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={content.emailPlaceholder}
                className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl py-3 pl-4 pr-12 text-xs text-white focus:outline-none focus:border-green-500 focus:bg-white/[0.04] transition-all placeholder:text-gray-700 font-light"
              />
              <button
                className="absolute right-1.5 top-1.5 p-2 bg-green-500 text-black rounded-lg hover:bg-green-400 transition-colors shadow-md active:scale-95"
                aria-label="Subscribe"
              >
                <Send size={13} />
              </button>
            </form>
          </div>

        </div>

        {/* COPYRIGHT LAYER */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-500 font-mono">
          <p>© {currentYear} Webleaders. {t.footer.rights}.</p>
          <div className="flex gap-6 font-sans font-light">
            <a href="#" className="hover:text-white transition-colors">{content.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{content.terms}</a>
          </div>
        </div>

      </div>
    </footer>
  )
}