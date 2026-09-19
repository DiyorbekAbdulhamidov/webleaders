'use client'

import { useState } from 'react'
import Reveal from '@/components/Reveal'
import { HelpCircle, Plus } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function FAQSection() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative py-24 bg-black text-white overflow-hidden">
      <div className="wl-glow-faint absolute bottom-0 right-1/4 w-[500px] h-[400px] max-w-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">

        {/* Sarlavha */}
        <div className="text-center mb-16">
          <Reveal className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-[0.2em] mb-5">
            <HelpCircle size={13} />
            {t.faq.badge}
          </Reveal>
          <Reveal as="h2" delay={0.1} className="text-4xl md:text-5xl font-bold tracking-tight">
            {t.faq.title} <span className="text-green-500">{t.faq.subtitle}</span>
          </Reveal>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {t.faq.items.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <Reveal
                key={i}
                delay={i * 0.05}
                className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${isOpen
                  ? 'bg-white/[0.03] border-green-500/25'
                  : 'bg-white/[0.01] border-white/[0.06] hover:border-white/[0.12]'
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className={`font-semibold text-base transition-colors ${isOpen ? 'text-green-400' : 'text-white'}`}>
                    {item.q}
                  </span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen
                    ? 'bg-green-500 border-green-500 text-black rotate-45'
                    : 'border-white/10 text-gray-400'
                    }`}>
                    <Plus size={15} />
                  </span>
                </button>

                {/* height:auto animatsiyasi — grid 0fr/1fr hiylasi (globals.css) */}
                <div className="wl-collapse" data-open={isOpen} aria-hidden={!isOpen}>
                  <div>
                    <p className="px-6 pb-6 text-gray-400 text-sm leading-relaxed font-light">
                      {item.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
