'use client'

import { motion, Variants } from 'framer-motion'
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

const icons = [
  MonitorSmartphone,
  Smartphone,
  LayoutDashboard,
  SearchCheck,
  ShoppingCart,
  LifeBuoy
]

export default function ServicesSection() {
  const { t } = useLanguage()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="services" className="relative py-24 bg-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-semibold uppercase tracking-wider mb-4 inline-block"
          >
            {t.services.badge} {/* <-- Dinamik */}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6"
          >
            {t.services.title} <br className="hidden md:block" />
            <span className="text-green-500">{t.services.subtitle}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            {t.services.desc}
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {t.services.list.map((service, index) => {
            const Icon = icons[index] // Ikonkani indeks bo'yicha olamiz
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] hover:border-green-500/50 transition-all duration-300 overflow-hidden"
              >
                {/* Hover Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-transparent to-transparent group-hover:from-green-500/10 transition-all duration-500" />

                {/* Header: Icon & Arrow */}
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(74,222,128,0.1)] group-hover:shadow-[0_0_20px_rgba(74,222,128,0.4)]">
                    <Icon strokeWidth={1.5} className="w-7 h-7" />
                  </div>

                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:text-white group-hover:border-white/30 transition-all cursor-pointer">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300">
                    {service.desc}
                  </p>
                </div>

                {/* Bottom Line Animation */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}