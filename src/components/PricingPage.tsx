'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Check, X, Loader2, Sparkles, Zap } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import 'react-toastify/dist/ReactToastify.css'

export default function PricingPage() {
  const { t } = useLanguage()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('+998 ') // Bo'sh joy bilan boshlanadi
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (selectedPlan) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedPlan])

  // --- TELEFON RAQAM LOGIKASI ---
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value

    // Agar foydalanuvchi hammasini o'chirib tashlasa ham +998 qolsin
    if (!val.startsWith('+998')) {
      val = '+998 '
    }

    // Faqat raqam va probel va + belgisiga ruxsat
    if (/^[+0-9 ]*$/.test(val)) {
      setPhone(val)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // 1. Ism validatsiyasi
    if (name.length < 3) {
      toast.error('Ismingizni to‘liq yozing', { theme: 'dark' })
      setLoading(false)
      return
    }

    // 2. Telefon validatsiyasi (Uzbekistan: 998 + 9 ta raqam = 12 ta raqam)
    // Barcha bo'sh joylarni va + belgisini olib tashlab sanaymiz
    const rawPhone = phone.replace(/\D/g, '') // Faqat raqamlarni qoldiradi

    if (rawPhone.length !== 12) {
      toast.error('Telefon raqamni to‘liq kiriting (+998 90 123 45 67)', { theme: 'dark' })
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          plan: selectedPlan
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        toast.success(`🎉 ${name}, arizangiz qabul qilindi!`, { theme: 'dark' })
        setSelectedPlan(null)
        setName('')
        setPhone('+998 ')
      } else {
        // Agar backend 404 yoki 500 qaytarsa
        toast.error('❌ Xatolik: Xabar yuborilmadi. Qaytadan urinib ko‘ring.', { theme: 'dark' })
        console.error("API Error:", data)
      }
    } catch (error) {
      toast.error('❌ Server bilan bog‘lanib bo‘lmadi. Internetni tekshiring.', { theme: 'dark' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="pricing" className="relative py-32 bg-black text-white overflow-hidden">

      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-900/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
          >
            <Sparkles size={14} className="text-green-400" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300">{t.nav.pricing}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            {t.pricing.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">{t.pricing.subtitle}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            {t.pricing.desc}
          </motion.p>
        </div>

        {/* PRICING CARDS */}
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {t.pricing.plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`relative group flex flex-col justify-between p-8 md:p-10 rounded-[2.5rem] transition-all duration-500 backdrop-blur-xl border ${plan.isPopular
                ? 'bg-white/[0.08] border-green-500/30 shadow-[0_0_60px_-15px_rgba(34,197,94,0.3)] scale-105 z-10'
                : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-[#111] border border-green-500/50 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.2)] flex items-center gap-2 z-20">
                  <Zap size={14} className="text-green-400 fill-green-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white">Eng Ommabop</span>
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{plan.title}</h3>
                <p className="text-gray-400 text-sm mb-8 h-10">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-8 pb-8 border-b border-white/10">
                  <span className="text-5xl font-bold text-white tracking-tighter">{plan.price}</span>
                  <span className="text-sm font-medium text-gray-500">{plan.currency}</span>
                </div>
                <ul className="space-y-5 mb-10">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-4 text-sm text-gray-300 group-hover:text-white transition-colors">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.isPopular ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-gray-400'}`}>
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelectedPlan(plan.title)}
                className={`w-full py-5 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${plan.isPopular
                  ? 'bg-green-500 text-black hover:bg-green-400 shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_50px_rgba(34,197,94,0.6)]'
                  : 'bg-white text-black hover:bg-gray-200'
                  }`}
              >
                Tanlash
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {selectedPlan && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                onClick={() => setSelectedPlan(null)}
              />

              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl overflow-hidden z-10"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none" />

                <button
                  onClick={() => setSelectedPlan(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>

                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-white mb-2">{t.pricing.modalTitle}</h3>
                  <p className="text-gray-400 text-sm mb-8">
                    <span className="text-green-400 font-bold uppercase tracking-wider">{selectedPlan}</span> {t.pricing.modalDesc}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">{t.pricing.formName}</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ismingiz"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">{t.pricing.formPhone}</label>
                      {/* --- YANGILANGAN INPUT --- */}
                      <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="+998 90 123 45 67"
                        maxLength={17} // +998 (4) + space (1) + 9 digits + spaces = taxminan
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-5 mt-4 bg-green-500 text-black font-bold rounded-2xl uppercase tracking-widest hover:bg-green-400 transition-all shadow-lg shadow-green-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? <Loader2 className="animate-spin" /> : t.pricing.btnSubmit}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <ToastContainer
        position="bottom-right"
        theme="dark"
        toastStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
      />
    </section>
  )
}