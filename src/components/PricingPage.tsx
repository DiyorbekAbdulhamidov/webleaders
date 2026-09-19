'use client'

import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { createPortal } from 'react-dom'
import { Check, X, Loader2, Sparkles, Zap } from 'lucide-react'
import { toast } from '@/components/Toaster'
import Reveal from '@/components/Reveal'
import { useLanguage } from '@/context/LanguageContext'
import { use3DEnabled } from '@/hooks/use3DEnabled'
import { formatPhone, isPhoneComplete, PHONE_PREFIX, PHONE_MAX_LENGTH } from '@/lib/phone'

// three.js faqat desktopda, alohida chunk sifatida yuklanadi
const QuantumCore = dynamic(() => import('@/components/three/QuantumCore'), { ssr: false })

const sanitizeInput = (input: string) => {
  return input.replace(/[<>&/"']/g, '')
}

// --- MAIN PRICING PAGE COMPONENT ---
export default function PricingPage({ asPage = false }: { asPage?: boolean }) {
  const { t, language } = useLanguage()
  const HeadingTag = asPage ? 'h1' : 'h2'
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [globalMouse, setGlobalMouse] = useState({ x: 0, y: 0 })
  const [name, setName] = useState('')
  const [phone, setPhone] = useState(PHONE_PREFIX)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [canSubmit, setCanSubmit] = useState(true)
  const enable3D = use3DEnabled()

  // localStorage'ni faqat mount'dan keyin o'qish mumkin (serverda mavjud emas).
  // `mounted` — modal portali uchun: document.body faqat klientda bor.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    let lastSubmit: string | null = null
    try {
      lastSubmit = localStorage.getItem('lastSubmitTime')
    } catch { /* private rejim */ }
    if (lastSubmit) {
      const timeDiff = Date.now() - parseInt(lastSubmit)
      if (timeDiff < 60000) {
        setCanSubmit(false)
        const timeout = setTimeout(() => setCanSubmit(true), 60000 - timeDiff)
        return () => clearTimeout(timeout)
      }
    }
  }, [])

  useEffect(() => {
    if (!selectedPlan) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [selectedPlan])

  // Modalni Escape bilan yopish
  useEffect(() => {
    if (!selectedPlan) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedPlan(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [selectedPlan])

  const handleGlobalMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!enable3D || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    // Convert mouse coordinates to clip space (-1 to 1)
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    setGlobalMouse({ x, y })
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) {
      toast.warning(t.toast.wait)
      return
    }

    setLoading(true)
    const cleanName = sanitizeInput(name.trim())

    if (cleanName.length < 3) {
      toast.error(t.toast.nameError)
      setLoading(false)
      return
    }

    if (!isPhoneComplete(phone)) {
      toast.error(t.toast.phoneError)
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: cleanName, phone, plan: selectedPlan }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        toast.success(t.toast.success)
        setSelectedPlan(null)
        setName('')
        setPhone(PHONE_PREFIX)

        try {
          localStorage.setItem('lastSubmitTime', Date.now().toString())
        } catch { /* private rejim */ }
        setCanSubmit(false)
        setTimeout(() => setCanSubmit(true), 60000)
      } else {
        toast.error(t.toast.error)
      }
    } catch {
      toast.error(t.toast.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={enable3D ? handleGlobalMouseMove : undefined}
      id="pricing"
      className={`relative ${asPage ? 'pt-36 pb-32' : 'py-32'} bg-black text-white overflow-hidden`}
    >

      {/* 🔮 THREE.JS ACTIVE 8D QUANTUM CORES FIELD */}
      {enable3D && <QuantumCore hoveredIndex={hoveredIndex} globalMouse={globalMouse} />}

      {/* Heavy Cyber Atmosphere Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black pointer-events-none z-[1]" />
      <div className="wl-noise absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay z-[1]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-24">
          <Reveal className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-inner">
            <Sparkles size={13} className="text-green-400" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-gray-400">{t.nav.pricing}</span>
          </Reveal>

          <Reveal delay={0.1}>
            <HeadingTag className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
              {t.pricing.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-gray-300 to-green-600">{t.pricing.subtitle}</span>
            </HeadingTag>
          </Reveal>

          <Reveal as="p" delay={0.2} className="text-gray-400 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed tracking-wide">
            {t.pricing.desc}
          </Reveal>
        </div>

        {/* INTERACTIVE CARDS GRID */}
        <div className="grid md:grid-cols-3 gap-8 items-center relative z-20">
          {t.pricing.plans.map((plan, idx) => (
            <Reveal
              key={idx}
              delay={idx * 0.1}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative group flex flex-col justify-between p-8 md:p-10 rounded-[2.5rem] transition-colors duration-500 backdrop-blur-xl border cursor-pointer ${plan.isPopular
                  ? 'bg-black/40 border-green-500/30 shadow-[0_0_60px_-20px_rgba(34,197,94,0.3)] scale-105 z-10'
                  : 'bg-black/20 border-white/[0.05] hover:bg-black/40 hover:border-white/20'
                }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-black border border-green-500/50 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.2)] flex items-center gap-2 z-20">
                  <Zap size={12} className="text-green-400 fill-green-400 animate-pulse" />
                  <span className="text-[10px] font-bold tracking-widest text-white font-mono">{t.pricing.popular}</span>
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-green-400 transition-colors duration-300">{plan.title}</h3>
                <p className="text-gray-400 text-xs font-light mb-8 h-10 tracking-wide leading-relaxed">{plan.desc}</p>

                <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-white/[0.08]">
                  {language !== 'UZ' && (
                    <span className="text-lg text-gray-500 font-light font-mono">
                      {language === 'RU' ? 'от' : 'from'}
                    </span>
                  )}

                  <span className="text-5xl font-black text-white tracking-tighter">{plan.price}</span>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-widest font-mono">{plan.currency}</span>

                  {language === 'UZ' && (
                    <span className="text-base text-gray-500 font-light font-mono">dan</span>
                  )}
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature: string, fIdx: number) => (
                    <li key={fIdx} className="flex items-start gap-4 text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${plan.isPopular ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-400'
                        }`}>
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span className="leading-snug font-light tracking-wide">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelectedPlan(plan.title)}
                className={`w-full py-4.5 rounded-2xl font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center gap-2 ${plan.isPopular
                    ? 'bg-green-500 text-black hover:bg-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]'
                    : 'bg-white text-black hover:bg-gray-200'
                  }`}
              >
                {t.pricing.btnSelect}
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* MODAL PORTAL — ochilish/yopilish animatsiyasi CSS orqali (globals.css) */}
      {mounted && createPortal(
        <div
          data-open={Boolean(selectedPlan)}
          className="wl-pop fixed inset-0 z-[9999] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t.pricing.modalTitle}
        >
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            onClick={() => setSelectedPlan(null)}
          />

          <div className="relative w-full max-w-md bg-[#070707] border border-white/[0.08] rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden z-10">
            <div className="wl-glow absolute top-0 right-0 w-64 h-64 pointer-events-none" />

            <button
              onClick={() => setSelectedPlan(null)}
              aria-label="Yopish"
              tabIndex={selectedPlan ? 0 : -1}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="relative z-10">
              <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{t.pricing.modalTitle}</h3>
              <p className="text-gray-400 text-xs font-light mb-8 tracking-wide leading-relaxed">
                <span className="text-green-400 font-mono font-bold uppercase tracking-wider">{selectedPlan}</span> {t.pricing.modalDesc}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="wl-plan-name" className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 ml-1">
                    {t.pricing.formName}
                  </label>
                  <input
                    id="wl-plan-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.pricing.formName}
                    autoComplete="name"
                    tabIndex={selectedPlan ? 0 : -1}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-green-500/40 focus:bg-white/10 transition-all font-light text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="wl-plan-phone" className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 ml-1">
                    {t.pricing.formPhone}
                  </label>
                  <input
                    id="wl-plan-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="+998 90 123-45-67"
                    maxLength={PHONE_MAX_LENGTH}
                    tabIndex={selectedPlan ? 0 : -1}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-green-500/40 focus:bg-white/10 transition-all font-mono text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !canSubmit}
                  tabIndex={selectedPlan ? 0 : -1}
                  className="w-full py-4.5 mt-4 bg-green-500 text-black font-bold rounded-xl uppercase tracking-widest hover:bg-green-400 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs cursor-pointer"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : t.pricing.btnSubmit}
                </button>
              </form>
            </div>
          </div>
        </div>,
        document.body
      )}

    </section>
  )
}