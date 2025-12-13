'use client'

import React from 'react'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion' // 1. Variants import qilindi
import { ArrowRight } from 'lucide-react'

export default function HeroVideo() {
  // 2. Variants tipi qo'shildi
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  }

  // 3. Variants tipi bu yerga ham qo'shildi
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" // Endi TypeScript buni to'g'ri tushunadi
      }
    }
  }

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="w-full h-full object-cover scale-105"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center lg:text-left pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center lg:justify-start mb-6">
            <span className="px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium backdrop-blur-sm uppercase tracking-wider">
              🚀 O‘zbekistonning Top IT Agentligi
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-8 tracking-tight"
          >
            Biznesingizni <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
              Raqamli Dunyoda
            </span> <br />
            Yuksaltiramiz
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed"
          >
            Webleaders — bu shunchaki kod emas. Bu premium dizayn,
            yuqori konversiya va biznesingiz uchun aniq strategik yechimlar.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Link href="#contact" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-green-500 text-black font-bold text-lg rounded-xl hover:bg-green-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(74,222,128,0.3)]"
              >
                Loyiha boshlash
                <ArrowRight size={20} />
              </motion.button>
            </Link>

            <Link href="#portfolio" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 border border-white/20 text-white font-medium text-lg rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2 group"
              >
                Portfolio
                <span className="w-2 h-2 rounded-full bg-green-500 group-hover:shadow-[0_0_10px_#4ade80] transition-all"></span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs uppercase tracking-widest">Pastga</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-green-500 to-transparent"></div>
      </motion.div>
    </section>
  )
}