'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Reveal from '@/components/Reveal'
import {
  MonitorSmartphone,
  Smartphone,
  LayoutDashboard,
  SearchCheck,
  ShoppingCart,
  LifeBuoy,
  ArrowUpRight
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { use3DEnabled } from '@/hooks/use3DEnabled'

// three.js faqat desktopda, alohida chunk sifatida yuklanadi
const ServicesCanvas = dynamic(() => import('@/components/three/ServicesCanvas'), { ssr: false })

const icons = [
  MonitorSmartphone,
  Smartphone,
  LayoutDashboard,
  SearchCheck,
  ShoppingCart,
  LifeBuoy
]

export default function ServicesSection({ asPage = false }: { asPage?: boolean }) {
  const { t } = useLanguage()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const HeadingTag = asPage ? 'h1' : 'h2'
  const enable3D = use3DEnabled()

  return (
    <section id="services" className={`relative ${asPage ? 'pt-36 pb-24' : 'py-24'} bg-black text-white overflow-hidden`}>

      {/* 🌀 THE HIGH-END INTERACTIVE 3D ENGINE (faqat desktop) */}
      {enable3D && <ServicesCanvas hoveredIndex={hoveredIndex} />}

      {/* Cyber overlay elements */}
      <div className="wl-noise absolute inset-0 opacity-5 pointer-events-none z-[1]" />
      <div className="wl-glow-faint absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] max-w-full pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <Reveal
            as="span"
            variant="zoom"
            className="px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-semibold uppercase tracking-wider mb-4 inline-block backdrop-blur-md"
          >
            {t.services.badge}
          </Reveal>
          <Reveal>
            <HeadingTag className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6 tracking-tight">
              {t.services.title} <br className="hidden md:block" />
              <span className="text-green-500">{t.services.subtitle}</span>
            </HeadingTag>
          </Reveal>
          <Reveal as="p" delay={0.1} className="text-gray-400 text-lg font-light">
            {t.services.desc}
          </Reveal>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.list.map((service, index) => {
            const Icon = icons[index]
            return (
              <Reveal
                key={index}
                delay={index * 0.08}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative bg-white/[0.01] hover:bg-white/[0.04] backdrop-blur-md border border-white/[0.06] hover:border-green-500/40 rounded-3xl p-8 transition-colors duration-500 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Micro Glow Effect inside the card */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-transparent to-transparent group-hover:from-green-500/[0.08] transition-all duration-700 pointer-events-none" />

                {/* Header: Icon & Arrow */}
                <div className="flex justify-between items-start mb-8 relative z-10" style={{ transform: 'translateZ(20px)' }}>
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-green-500 group-hover:text-black group-hover:border-green-500 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.02)] group-hover:shadow-[0_0_25px_rgba(34,197,94,0.4)]">
                    <Icon strokeWidth={1.2} className="w-7 h-7 transition-transform duration-500 group-hover:scale-110" />
                  </div>

                  <div className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/20 group-hover:text-white group-hover:border-white/20 group-hover:bg-white/5 transition-all duration-300 cursor-pointer">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10" style={{ transform: 'translateZ(10px)' }}>
                  <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight group-hover:text-green-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light group-hover:text-gray-300 transition-colors duration-300">
                    {service.desc}
                  </p>
                </div>

                {/* Neon Bottom Gauge line */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}