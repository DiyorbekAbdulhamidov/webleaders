'use client'

import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Send
} from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

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

  // Navigatsiya linklarini shakllantirish
  const navLinks = [
    { name: content.home, href: '#home' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.portfolio, href: '#projects' },
    { name: t.nav.pricing, href: '#pricing' },
    { name: content.team, href: '#team' }
  ]

  return (
    <footer className="relative bg-black text-white pt-24 pb-12 border-t border-white/10 overflow-hidden">

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* 1. BRAND & ABOUT (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-bold tracking-tighter text-white">
                WEB<span className="text-green-500">LEADERS</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {content.desc}
            </p>
            <div className="flex gap-4 pt-2">
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
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-green-500 hover:border-green-500 transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. NAVIGATION (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-6">{content.menuTitle}</h3>
            <ul className="space-y-4">
              {navLinks.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="text-gray-400 hover:text-green-400 text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. CONTACTS (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold mb-6">{t.footer.contact}</h3>
            <ul className="space-y-5">
              <li>
                <a href="tel:+998200127707" className="group flex items-start gap-3">
                  <div className="mt-1 p-2 rounded-lg bg-white/5 text-green-400 group-hover:bg-green-500 group-hover:text-black transition-all">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500 uppercase">{t.contactSection.infoPhone}</span>
                    <span className="text-gray-300 group-hover:text-white transition-colors">+998 20 012 77 07</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@webleaders.uz" className="group flex items-start gap-3">
                  <div className="mt-1 p-2 rounded-lg bg-white/5 text-green-400 group-hover:bg-green-500 group-hover:text-black transition-all">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500 uppercase">{t.contactSection.infoEmail}</span>
                    <span className="text-gray-300 group-hover:text-white transition-colors">info@webleaders.uz</span>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-lg bg-white/5 text-green-400">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase">{t.contactSection.infoLoc}</span>
                  <span className="text-gray-300">{t.footer.address}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* 4. NEWSLETTER (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold mb-6">{content.newsletterTitle}</h3>
            <p className="text-gray-400 text-xs mb-4">
              {content.newsletterDesc}
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={content.emailPlaceholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-green-500 transition-all placeholder:text-gray-600"
              />
              <button
                className="absolute right-1.5 top-1.5 p-2 bg-green-500 text-black rounded-lg hover:bg-green-400 transition-colors"
                aria-label="Subscribe"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} Webleaders. {t.footer.rights}.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">{content.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{content.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}