'use client'

import React, { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { ShieldCheck, Smartphone, Users, Rocket, Timer, Handshake, Star, CheckCircle2, type LucideIcon } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { use3DEnabled } from '@/hooks/use3DEnabled'

// three.js faqat desktopda, alohida chunk sifatida yuklanadi
const GravityFabric = dynamic(() => import('@/components/three/GravityFabric'), { ssr: false })

const icons = [
  ShieldCheck,
  Smartphone,
  Users,
  Rocket,
  Timer,
  Handshake
]

interface GlassCardProps {
  item: { title: string; desc: string }
  index: number
  Icon: LucideIcon
  onCardHover: (active: boolean) => void
}

// --- GLASS CARD COMPONENT WITH 3D TILT ---
const GlassCard = ({ item, index, Icon, onCardHover }: GlassCardProps) => {
  const ref = useRef<HTMLDivElement>(null)

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
    onCardHover(false)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => onCardHover(true)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative h-full group cursor-pointer"
    >
      <div className="relative h-full bg-white/[0.02] backdrop-blur-2xl border border-white/[0.06] rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:bg-white/[0.05] hover:border-green-500/30 shadow-[0_12px_40px_0_rgba(0,0,0,0.5)]">

        <div className="wl-noise absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay" />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-green-500/20 transition-all duration-700" />

        <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-start justify-between mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/[0.08] flex items-center justify-center text-gray-400 group-hover:scale-110 group-hover:border-green-500/40 group-hover:text-green-400 transition-all duration-500 shadow-inner">
              <Icon size={26} strokeWidth={1.5} />
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-green-500 group-hover:scale-125 transition-all duration-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-4 tracking-tight leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-green-400 transition-all duration-300">
            {item.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed font-light tracking-wide group-hover:text-gray-300 transition-colors mt-auto">
            {item.desc}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />
      </div>
    </motion.div>
  )
}

// --- MAIN SECTION ---
export default function WhyChooseUs() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null) // To'g'rilandi: HTMLElement
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false })
  const enable3D = use3DEnabled()

  // Global mouse tracker inside the section viewport
  const handleGlobalMouseMove = (e: React.MouseEvent<HTMLElement>) => { // To'g'rilandi: HTMLElement
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()

    // Normalize coordinates to WebGL clip space (-1 to 1)
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1

    setMousePos(prev => ({ ...prev, x, y }))
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleGlobalMouseMove}
      onMouseEnter={() => setMousePos(prev => ({ ...prev, active: true }))}
      onMouseLeave={() => setMousePos(prev => ({ ...prev, active: false }))}
      className="relative py-32 bg-black text-white overflow-hidden"
    >

      {/* 🔮 THREE.JS ACTIVE QUANTUM FABRIC (faqat desktop) */}
      {enable3D && <GravityFabric mousePos={mousePos} />}

      {/* Atmospheric Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-[1]" />
      <div className="absolute top-0 left-0 w-full h-full bg-black pointer-events-none opacity-20 z-0">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-green-950/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-24 gap-8 border-b border-white/[0.05] pb-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-green-500 mb-6"
            >
              <div className="px-3 py-1 rounded-full bg-green-950/40 border border-green-500/20 backdrop-blur-md flex items-center gap-2">
                <Star size={12} fill="currentColor" />
                <span className="text-[9px] font-bold uppercase tracking-[0.25em]">{t.whyUs.badge}</span>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.95]"
            >
              {t.whyUs.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-gray-100 to-gray-600">
                {t.whyUs.subtitle}
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4 max-w-sm lg:text-left"
          >
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              {t.whyUs.desc}
            </p>
            <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-widest font-mono">
              <CheckCircle2 size={14} /> {'// CRITICAL_SUCCESS_RATE_100%'}
            </div>
          </motion.div>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-20">
          {t.whyUs.list.map((item, idx) => (
            <GlassCard
              key={idx}
              item={item}
              index={idx}
              Icon={icons[idx] || ShieldCheck}
              onCardHover={(active) => setMousePos(prev => ({ ...prev, active }))}
            />
          ))}
        </div>

      </div>
    </section>
  )
}