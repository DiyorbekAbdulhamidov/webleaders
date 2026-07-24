'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Phone, Send, X, MessageCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'

/**
 * Suzuvchi aloqa doki — har bir sahifada pastki o'ng burchakda.
 * Telegram va telefon orqali bir bosishda bog'lanish (konversiya uchun).
 */
export default function FloatingContact() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname === '/ramadan') return null

  return (
    <div className="fixed bottom-6 right-5 z-[90] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-2.5"
          >
            <a
              href="https://t.me/webleaders_uz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 pl-4 pr-5 py-3 rounded-full bg-[#0d0d0d] border border-white/10 text-white text-sm font-semibold shadow-2xl hover:border-green-500/40 hover:bg-[#111] transition-all"
            >
              <span className="w-8 h-8 rounded-full bg-[#229ED9]/15 flex items-center justify-center">
                <Send size={15} className="text-[#37BBFE]" />
              </span>
              {t.cta.telegram}
            </a>
            <a
              href="tel:+998200127707"
              className="flex items-center gap-3 pl-4 pr-5 py-3 rounded-full bg-[#0d0d0d] border border-white/10 text-white text-sm font-semibold shadow-2xl hover:border-green-500/40 hover:bg-[#111] transition-all"
            >
              <span className="w-8 h-8 rounded-full bg-green-500/15 flex items-center justify-center">
                <Phone size={15} className="text-green-400" />
              </span>
              +998 20 012 77 07
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Aloqa menyusini yopish' : 'Tezkor aloqa'}
            className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(34,197,94,0.35)] transition-colors duration-300 cursor-pointer ${open ? 'bg-white text-black' : 'bg-green-500 text-black hover:bg-green-400'
              }`}
          >
            {!open && (
              <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
            )}
            {open ? <X size={22} /> : <MessageCircle size={22} />}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
