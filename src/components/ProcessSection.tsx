'use client'

import { motion } from 'framer-motion'
import { Workflow } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function ProcessSection() {
  const { t } = useLanguage()

  return (
    <section className="relative py-24 bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-green-900/[0.06] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Sarlavha */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-[0.2em] mb-5"
          >
            <Workflow size={13} />
            {t.process.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-5"
          >
            {t.process.title} <span className="text-green-500">{t.process.subtitle}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base font-light"
          >
            {t.process.desc}
          </motion.p>
        </div>

        {/* Bosqichlar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.process.steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 hover:border-green-500/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
            >
              {/* Katta raqam foni */}
              <span className="absolute -top-4 -right-2 text-[110px] font-black text-white/[0.03] group-hover:text-green-500/[0.06] transition-colors duration-500 leading-none select-none pointer-events-none">
                {step.num}
              </span>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 font-black text-sm mb-6 group-hover:bg-green-500 group-hover:text-black transition-all duration-500">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>

              {/* Bog'lovchi chiziq (desktop) */}
              {i < t.process.steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[1px] bg-gradient-to-r from-green-500/30 to-transparent z-20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
