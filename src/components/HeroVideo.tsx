'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, PlayCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function HeroVideo() {
  const { t } = useLanguage()

  return (
    <section
      id="home"
      className="
        relative w-full overflow-hidden bg-black
        h-[100svh] /* Mobil brauzerlar uchun to'liq balandlik */
      "
    >
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          className="
            w-full h-full object-cover object-center
            opacity-60 scale-105
          "
          autoPlay
          muted
          loop
          playsInline
          poster="/images/video-poster.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/30 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_115%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Content */}
      <div
        className="
          relative z-10 w-full h-full 
          flex flex-col items-center 
          /* ASOSIY O'ZGARISH: Mobilda justify-start va padding beramiz, Desktopda markaz */
          justify-start pt-32 sm:justify-center sm:pt-0
        "
      >
        <div
          className="
            mx-auto w-full max-w-[1200px] 2xl:max-w-[1400px]
            px-4 sm:px-6 lg:px-10
            flex flex-col items-center text-center
          "
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="
              mb-6 sm:mb-8 inline-flex items-center gap-3
              px-4 py-2 rounded-full
              bg-white/5 border border-white/10
              backdrop-blur-2xl shadow-2xl
            "
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>

            <span className="text-[10px] sm:text-[11px] font-medium text-gray-300 uppercase tracking-widest">
              {t.hero.badge}
            </span>
          </motion.div>

          {/* Title */}
          <h1 className="flex flex-col items-center justify-center w-full">
            <motion.span
              key={t.hero.title1}
              initial={{ opacity: 0, y: 28, filter: 'blur(18px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.95, delay: 0.15, ease: 'easeOut' }}
              className="
                font-semibold text-white tracking-tight
                leading-[1.1] sm:leading-[0.92]
                break-words text-center
              "
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 7.5rem)',
              }}
            >
              {t.hero.title1}
            </motion.span>

            <motion.span
              key={t.hero.title2}
              initial={{ opacity: 0, y: 28, filter: 'blur(18px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.95, delay: 0.3, ease: 'easeOut' }}
              className="
                font-semibold tracking-tight
                leading-[1.1] sm:leading-[0.92]
                text-transparent bg-clip-text
                bg-gradient-to-b from-white via-white to-white/40
                break-words text-center
              "
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 7.5rem)',
              }}
            >
              {t.hero.title2}
            </motion.span>
          </h1>

          {/* Description */}
          <motion.p
            key={t.hero.desc}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="
              mt-6 sm:mt-8
              text-base sm:text-lg md:text-xl
              text-gray-400
              max-w-[90%] sm:max-w-[42rem]
              leading-relaxed
            "
          >
            {t.hero.desc}
          </motion.p>

          {/* Buttons Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.6, type: 'spring', stiffness: 110 }}
            className="
              mt-10 sm:mt-14
              w-full sm:w-auto
              max-w-[90%] sm:max-w-none
              
              p-2 rounded-[2rem]
              bg-white/5 border border-white/10
              backdrop-blur-[40px]
              shadow-[0_20px_40px_rgba(0,0,0,0.4)]
              
              flex flex-col sm:flex-row 
              items-center justify-center 
              gap-3 sm:gap-2
            "
          >
            <Link href="#contact" className="block w-full sm:w-auto">
              <button
                className="
                  w-full sm:w-auto
                  h-14 sm:h-16
                  px-8 sm:px-10
                  rounded-[1.5rem]
                  bg-white text-black
                  font-bold text-base sm:text-lg
                  leading-none
                  flex items-center justify-center gap-2
                  transition-transform duration-300
                  hover:scale-[1.02] active:scale-[0.98]
                  shadow-[0_0_20px_rgba(255,255,255,0.25)]
                  whitespace-nowrap
                "
              >
                {t.hero.btnPrimary}
                <ArrowUpRight size={20} />
              </button>
            </Link>

            <Link href="#projects" className="block w-full sm:w-auto">
              <button
                className="
                  w-full sm:w-auto
                  h-14 sm:h-16
                  px-8 sm:px-10
                  rounded-[1.5rem]
                  bg-black/20 text-white
                  font-medium text-base sm:text-lg
                  leading-none
                  flex items-center justify-center gap-2
                  border border-white/5
                  hover:bg-black/40 transition-colors duration-300
                  whitespace-nowrap
                "
              >
                <PlayCircle size={20} className="text-white/80" />
                {t.hero.btnSecondary}
              </button>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Glow */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-[1] flex justify-center">
        <div className="w-[520px] h-[320px] sm:w-[700px] sm:h-[420px] lg:w-[900px] lg:h-[520px] bg-green-500/10 rounded-full blur-[150px]" />
      </div>
    </section>
  )
}