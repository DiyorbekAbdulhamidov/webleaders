'use client'

import React, { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { ShieldCheck, Smartphone, Users, Rocket, Timer, Handshake, Star, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

// Ikonkalar (Yangi ro'yxatga moslab)
const icons = [
  ShieldCheck, // Seniorlar
  Smartphone,  // Mobile First
  Users,       // Sotadigan Dizayn
  Rocket,      // 0.5 Soniya
  Timer,       // Temir Intizom
  Handshake    // Tashlab qo'ymaymiz
]

// --- ULTRA GLASS CARD ---
const GlassCard = ({ item, index, Icon }: { item: any, index: number, Icon: any }) => {
  const ref = useRef<HTMLDivElement>(null)

  // 3D Tilt Logic (Juda yumshoq va silliq)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 })

  const rotateX = useMotionTemplate`calc(${mouseYSpring} * -0.2deg)`
  const rotateY = useMotionTemplate`calc(${mouseXSpring} * 0.2deg)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct * 10)
    y.set(yPct * 10)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative h-full group"
    >
      {/* CARD BODY: iOS 26 Glassmorphism */}
      <div className="relative h-full bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.15] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]">

        {/* Noise Texture (Juda nozik) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

        {/* Internal Glow Spot (Yashil) */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-green-500/30 transition-all duration-700" />

        <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(20px)" }}>

          {/* Header: Icon & Title */}
          <div className="flex items-start justify-between mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:border-green-500/50 group-hover:text-green-400 transition-all duration-500 shadow-inner">
              <Icon size={28} strokeWidth={1.5} />
            </div>
            {/* Top right decorative dot */}
            <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-green-500/80 transition-colors duration-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-4 tracking-tight leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-green-200 transition-all duration-300">
            {item.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed font-medium tracking-wide group-hover:text-gray-300 transition-colors mt-auto">
            {item.desc}
          </p>
        </div>

        {/* Bottom shine effect on hover */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      </div>
    </motion.div>
  )
}

// --- MAIN SECTION ---
export default function WhyChooseUs() {
  const { t } = useLanguage()

  return (
    <section className="relative py-32 bg-black text-white overflow-hidden">

      {/* Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full bg-black">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-green-900/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-green-500 mb-6"
            >
              <div className="px-3 py-1 rounded-full bg-green-950/30 border border-green-500/20 backdrop-blur-md flex items-center gap-2">
                <Star size={14} fill="currentColor" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{t.whyUs.badge}</span>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9]"
            >
              {t.whyUs.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-gray-200 to-gray-600">
                {t.whyUs.subtitle}
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4 max-w-sm text-right lg:text-left"
          >
            <p className="text-gray-400 text-base leading-relaxed font-medium">
              {t.whyUs.desc}
            </p>
            <div className="flex items-center gap-2 justify-end lg:justify-start text-green-400 text-sm font-bold uppercase tracking-wider">
              <CheckCircle2 size={16} /> 100% Natija
            </div>
          </motion.div>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.whyUs.list.map((item, idx) => (
            <GlassCard
              key={idx}
              item={item}
              index={idx}
              Icon={icons[idx] || ShieldCheck}
            />
          ))}
        </div>

      </div>
    </section>
  )
}