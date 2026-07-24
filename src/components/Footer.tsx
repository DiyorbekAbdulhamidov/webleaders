'use client'

import { Phone, Mail, MapPin, Instagram, Linkedin, Send, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()

  if (pathname === '/ramadan') return null

  const navLinks = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.services, href: '/services' },
    { name: t.nav.portfolio, href: '/portfolio' },
    { name: t.nav.pricing, href: '/pricing' },
    { name: t.nav.contact, href: '/contact' }
  ]

  const socials = [
    { icon: Instagram, href: 'https://www.instagram.com/webleaders.uz/', label: 'Instagram' },
    { icon: Send, href: 'https://t.me/webleaders_uz', label: 'Telegram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/106364349/', label: 'LinkedIn' }
  ]

  return (
    <footer className="relative bg-black text-white pt-20 pb-10 border-t border-white/[0.06] overflow-hidden">

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-green-950/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-10 xl:gap-8 mb-14">

          {/* BRAND */}
          <div className="xl:col-span-4 space-y-5">
            <Link href="/" className="inline-block group">
              <span className="text-2xl font-black tracking-tighter text-white transition-transform duration-300 block group-hover:scale-[1.01]">
                WEB<span className="text-green-500">LEADERS</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-light tracking-wide">
              {t.footer.desc}
            </p>
            <div className="flex gap-3 pt-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-black hover:bg-green-500 hover:border-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300"
                >
                  <social.icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="xl:col-span-2" aria-label="Footer navigatsiya">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
              {t.footer.menuTitle}
            </h3>
            <ul className="space-y-3.5">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-400 hover:text-green-400 text-sm font-light transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-green-500 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CONTACTS */}
          <div className="xl:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
              {t.footer.contact}
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+998200127707" className="group flex items-center gap-3.5 min-w-0 w-full">
                  <div className="p-2.5 rounded-xl bg-white/5 text-green-400 group-hover:bg-green-500 group-hover:text-black transition-all duration-300 flex-shrink-0 border border-white/5">
                    <Phone size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider">{t.contactSection.infoPhone}</span>
                    <span className="text-sm font-semibold text-gray-300 group-hover:text-green-400 transition-colors block truncate">
                      +998 20 012 77 07
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@webleaders.uz" className="group flex items-center gap-3.5 min-w-0 w-full">
                  <div className="p-2.5 rounded-xl bg-white/5 text-green-400 group-hover:bg-green-500 group-hover:text-black transition-all duration-300 flex-shrink-0 border border-white/5">
                    <Mail size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider">{t.contactSection.infoEmail}</span>
                    <span className="text-sm font-semibold text-gray-300 group-hover:text-green-400 transition-colors block truncate">
                      info@webleaders.uz
                    </span>
                  </div>
                </a>
              </li>
              <li className="flex items-center gap-3.5 min-w-0 w-full">
                <div className="p-2.5 rounded-xl bg-white/5 text-green-400 flex-shrink-0 border border-white/5">
                  <MapPin size={15} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider">{t.contactSection.infoLoc}</span>
                  <span className="text-sm font-medium text-gray-300 block truncate">
                    {t.footer.address}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* QUICK CTA */}
          <div className="xl:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
              {t.cta.title}
            </h3>
            <p className="text-gray-400 text-xs mb-5 font-light leading-relaxed">
              {t.cta.desc}
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="group flex items-center justify-center gap-2 w-full py-3.5 bg-green-500 text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-green-400 hover:shadow-[0_0_25px_rgba(34,197,94,0.3)] transition-all"
              >
                {t.cta.btn}
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href="https://t.me/webleaders_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 border border-white/10 text-white font-semibold text-xs uppercase tracking-widest rounded-xl hover:border-green-500/40 hover:bg-white/[0.03] transition-all"
              >
                <Send size={14} className="text-green-400" /> {t.cta.telegram}
              </a>
            </div>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-500">
          <p>© {currentYear} Webleaders. {t.footer.rights}.</p>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            webleaders.uz
          </div>
        </div>

      </div>
    </footer>
  )
}
