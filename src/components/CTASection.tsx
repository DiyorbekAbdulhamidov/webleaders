'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Phone, Send } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="relative py-20 bg-black text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2.5rem] border border-green-500/20 bg-gradient-to-br from-green-950/30 via-black to-black p-10 md:p-16 overflow-hidden"
        >
          {/* Nur effektlari */}
          <div className="absolute -top-24 -right-24 w-[350px] h-[350px] bg-green-500/[0.12] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-16 w-[300px] h-[300px] bg-green-900/[0.15] rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
                {t.cta.title}
              </h2>
              <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
                {t.cta.desc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto flex-shrink-0">
              <Link
                href="/contact"
                className="group h-14 px-8 rounded-full bg-green-500 text-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-400 hover:shadow-[0_0_35px_rgba(34,197,94,0.4)] transition-all duration-300"
              >
                {t.cta.btn}
                <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href="tel:+998200127707"
                className="h-14 px-8 rounded-full border border-white/15 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/5 hover:border-white/30 transition-all duration-300"
              >
                <Phone size={16} className="text-green-400" />
                {t.cta.btnCall}
              </a>
              <a
                href="https://t.me/webleaders_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 px-8 rounded-full border border-white/15 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/5 hover:border-white/30 transition-all duration-300"
              >
                <Send size={16} className="text-green-400" />
                {t.cta.telegram}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
