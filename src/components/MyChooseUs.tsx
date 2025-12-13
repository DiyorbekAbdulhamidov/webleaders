'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { ShieldCheck, Timer, Users, Smartphone, Rocket, Handshake } from 'lucide-react'

// --- 1. 3D TILT CARD COMPONENT (Alohada komponent qildik) ---
const TiltCard = ({ item, index }: { item: any, index: number }) => {
  const ref = useRef<HTMLDivElement>(null)

  // Sichqoncha koordinatalari (3D effekt uchun)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Sichqoncha harakati silliq bo'lishi uchun (Spring physics)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useMotionTemplate`calc(${mouseYSpring} * -0.5deg)`
  const rotateY = useMotionTemplate`calc(${mouseXSpring} * 0.5deg)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()

    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct * 20) // Qanchalik qattiq egilishi (20)
    y.set(yPct * 20)
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative h-full w-full rounded-2xl bg-gradient-to-br from-white/5 to-white/0 p-[1px] transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,222,128,0.3)] group"
    >
      {/* 2. NEON BORDER GLOW (Sichqoncha borganda yonadigan chegara) */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-transparent via-green-500 to-transparent blur-md" />

      {/* CARD CONTENT */}
      <div className="relative h-full bg-black/80 backdrop-blur-xl rounded-2xl p-8 flex flex-col items-start justify-between border border-white/10 overflow-hidden">

        {/* Orqa fon gridi (Bezagi) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-green-500/20 rounded-full blur-[50px] group-hover:bg-green-500/40 transition-all duration-500" />

        <div className="relative z-10">
          {/* Ikonka 3D bo'lib chiqib turadi */}
          <div
            className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-transparent border border-green-500/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-green-400 transition-all duration-300 shadow-[0_0_15px_rgba(74,222,128,0.1)]"
            style={{ transform: "translateZ(30px)" }} // 3D Effekt
          >
            {item.icon}
          </div>

          <h3
            className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors"
            style={{ transform: "translateZ(20px)" }}
          >
            {item.title}
          </h3>

          <p
            className="text-gray-400 text-sm leading-relaxed"
            style={{ transform: "translateZ(10px)" }}
          >
            {item.desc}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// --- MAIN SECTION ---
export default function WhyChooseUs() {
  const items = [
    {
      icon: <ShieldCheck className="text-green-400 w-7 h-7" />,
      title: 'Tajribali Jamoa',
      desc: 'Biznesingizni tajribasizlarga ishonib xato qilmang. Bizda faqat Senior darajadagi mutaxassislar.',
    },
    {
      icon: <Smartphone className="text-green-400 w-7 h-7" />,
      title: 'Mobile First',
      desc: 'Saytingiz telefonlarda ilovadek qulay ishlaydi. Google buni yaxshi ko‘radi.',
    },
    {
      icon: <Users className="text-green-400 w-7 h-7" />,
      title: 'Marketingni Tushunamiz',
      desc: 'Shunchaki chiroyli rasm emas, balki sotuvga olib keladigan struktura tuzamiz.',
    },
    {
      icon: <Rocket className="text-green-400 w-7 h-7" />,
      title: 'Kosmik Tezlik',
      desc: 'Sayt ochilish tezligi 0.5 soniya. Mijozlaringiz kutishni yomon ko‘rishadi.',
    },
    {
      icon: <Timer className="text-green-400 w-7 h-7" />,
      title: 'Aniq Dedlayn',
      desc: 'Vaqt — pul. Biz loyihani kelishilgan kundan bir soat ham kechiktirmaymiz.',
    },
    {
      icon: <Handshake className="text-green-400 w-7 h-7" />,
      title: 'Umrbod Kafolat',
      desc: 'Biz yaratgan tizim buzilmasligiga kafolat beramiz va doim aloqada bo‘lamiz.',
    },
  ]

  return (
    <section className="relative py-32 bg-black text-white overflow-hidden perspective-1000">

      {/* Background Ambience (Yashil tuman) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Title Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="py-2 px-4 rounded-full border border-green-500/20 bg-green-900/10 text-green-400 text-sm font-bold tracking-widest uppercase mb-4 block">
              Why Webleaders?
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500"
          >
            Nega Aynan Biz?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 text-xl max-w-2xl mx-auto"
          >
            Bozorda minglab "IT-kompaniyalar" bor. Lekin natija beradiganlari sanoqli.
          </motion.p>
        </div>

        {/* 3D Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <TiltCard key={idx} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}