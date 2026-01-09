'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, PlayCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function HeroVideo() {
  const { t } = useLanguage()

  return (
    <section className="relative w-full h-[100dvh] overflow-hidden flex flex-col items-center justify-center bg-black">

      <div className="absolute inset-0 w-full h-full z-0">
        <video
          className="w-full h-full object-cover opacity-60 scale-105"
          autoPlay muted loop playsInline
          poster="/images/video-poster.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_120%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[11px] font-medium text-gray-300 uppercase tracking-widest">
            {t.hero.badge}
          </span>
        </motion.div>

        <h1 className="flex flex-col items-center justify-center">
          <motion.span
            key={t.hero.title1}
            initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-[120px] font-semibold text-white tracking-tighter leading-[0.9]"
          >
            {t.hero.title1}
          </motion.span>

          <motion.span
            key={t.hero.title2}
            initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-[120px] font-semibold tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40"
          >
            {t.hero.title2}
          </motion.span>
        </h1>

        <motion.p
          key={t.hero.desc}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 text-lg md:text-xl text-gray-400 max-w-xl font-normal leading-relaxed"
        >
          {t.hero.desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 100 }}
          className="mt-12 p-2 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center gap-2"
        >
          <Link href="#contact">
            <button className="px-8 py-4 rounded-[1.5rem] bg-white text-black font-bold text-lg hover:scale-105 active:scale-95 transition-transform duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              {t.hero.btnPrimary}
              <ArrowUpRight size={20} />
            </button>
          </Link>

          <Link href="#portfolio">
            <button className="px-8 py-4 rounded-[1.5rem] bg-black/20 text-white font-medium text-lg hover:bg-black/40 transition-colors duration-300 flex items-center gap-2 border border-white/5">
              <PlayCircle size={20} className="text-white/80" />
              {t.hero.btnSecondary}
            </button>
          </Link>
        </motion.div>

      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-green-500/10 rounded-full blur-[150px] pointer-events-none" />
    </section>
  )
}