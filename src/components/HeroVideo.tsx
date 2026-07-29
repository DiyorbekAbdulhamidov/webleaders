'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowUpRight, FolderOpen } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { use3DEnabled } from '@/hooks/use3DEnabled'

// three.js faqat desktopda, alohida chunk sifatida yuklanadi
const HeroGalaxy = dynamic(() => import('@/components/three/HeroGalaxy'), { ssr: false })

export default function HeroVideo() {
  const { t } = useLanguage()
  const enable3D = use3DEnabled()

  return (
    <section className="relative w-full overflow-hidden bg-black min-h-[100svh] flex flex-col">
      {/* 3D FON (faqat desktop) */}
      {enable3D ? (
        <HeroGalaxy />
      ) : (
        /* Mobil uchun yengil gradient fon */
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500/[0.07] rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-green-900/[0.1] rounded-full blur-[100px]" />
        </div>
      )}

      {/* GRADIENT QATLAM */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,black_100%)]" />
      </div>

      {/* KONTENT — animatsiya CSS orqali, JS kutmasdan darhol chiqadi */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-28 pb-10">

        <div className="w-full max-w-[1200px] mx-auto text-center flex flex-col items-center">

          {/* Badge */}
          <div className="wl-reveal mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-gray-300 uppercase tracking-widest">
              {t.hero.badge}
            </span>
          </div>

          {/* H1 */}
          <h1 className="w-full max-w-[1100px] font-bold text-white tracking-tight leading-[1.08] text-center mb-6">
            <span
              className="wl-reveal block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/90"
              style={{ fontSize: 'clamp(2.3rem, 5.5vw, 5rem)' }}
            >
              {t.hero.title1}
            </span>
            <span
              className="wl-reveal wl-delay-1 block mt-2"
              style={{ fontSize: 'clamp(2.3rem, 5.5vw, 5rem)' }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-emerald-500">
                {t.hero.title2}
              </span>
            </span>
          </h1>

          {/* Tavsif */}
          <p className="wl-reveal wl-delay-2 text-gray-400 text-sm sm:text-base md:text-lg max-w-[40rem] leading-relaxed mb-10">
            {t.hero.desc}
          </p>

          {/* CTA tugmalar */}
          <div className="wl-reveal wl-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/contact"
              className="group w-full sm:w-auto h-14 px-9 rounded-full bg-green-500 text-black font-bold text-sm tracking-wide shadow-[0_4px_30px_rgba(34,197,94,0.35)] hover:bg-green-400 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
            >
              {t.hero.btnPrimary}
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="/portfolio"
              className="w-full sm:w-auto h-14 px-9 rounded-full bg-transparent text-white font-medium text-sm tracking-wide border border-white/15 hover:bg-white/5 hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FolderOpen size={17} className="text-green-400" />
              {t.hero.btnSecondary}
            </Link>
          </div>
        </div>
      </div>

      {/* STATISTIKA BAND */}
      <div className="wl-reveal wl-delay-4 relative z-10 w-full border-t border-white/[0.06] bg-black/40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.05]">
          {t.hero.stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-6 px-4">
              <span className="text-2xl md:text-3xl font-black text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mt-1 text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
