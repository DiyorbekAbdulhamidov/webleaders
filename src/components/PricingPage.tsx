'use client'

import { useState } from 'react'
import { CheckCircle2, X, Loader2, Sparkles } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import 'react-toastify/dist/ReactToastify.css'

const plans = [
  {
    title: 'Start',
    price: "1.5 mln",
    currency: "so'm",
    description: 'Shaxsiy brend yoki kichik xizmatlar uchun tezkor start.',
    features: [
      '1 sahifali Landing Page',
      'Moslashuvchan (Mobile) dizayn',
      'Kontaktlar va Xarita',
      '3 kun ichida tayyor',
      '1 oy bepul support',
    ],
    popular: false,
  },
  {
    title: 'Business',
    price: "4.5 mln",
    currency: "so'm",
    description: 'Rivojlanayotgan kompaniyalar uchun eng maqbul yechim.',
    features: [
      '5+ sahifali korporativ sayt',
      'Admin panel (o‘zingiz o‘zgartirasiz)',
      'SEO optimizatsiya (Google)',
      'Tezkor yuklanish (Speed Optimization)',
      '3 oy VIP support',
    ],
    popular: true, // Eng ommabop
  },
  {
    title: 'Premium',
    price: "9.0 mln",
    currency: "so'm",
    description: 'Katta bozor o‘yinchilari va murakkab tizimlar uchun.',
    features: [
      'E-commerce yoki Katalog',
      'To‘lov tizimlari (Click/Payme)',
      'CRM elementlari integratsiyasi',
      'Ko‘p tillilik (Uz/Ru/En)',
      '6 oy 24/7 support',
    ],
    popular: false,
  },
]

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('+998')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validatsiya
    if (name.length < 3) {
      toast.error('Iltimos, ismingizni to‘liq yozing', { theme: 'dark' })
      setLoading(false)
      return
    }

    if (phone.length < 9) {
      toast.error('Telefon raqamni to‘g‘ri kiriting', { theme: 'dark' })
      setLoading(false)
      return
    }

    try {
      // 1. API ga so'rov yuboramiz
      const res = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // "plan" maydonini qo'shdik, shunda Telegramda qaysi tarifligini bilasiz
        body: JSON.stringify({ name, phone, plan: selectedPlan }),
      })

      const data = await res.json()

      if (data.success) {
        toast.success(`🎉 Buyurtma qabul qilindi! Tez orada aloqaga chiqamiz.`, { theme: 'dark' })
        setSelectedPlan(null)
        setName('')
        setPhone('+998')
      } else {
        toast.error('❌ Xatolik yuz berdi. Qaytadan urinib ko‘ring.', { theme: 'dark' })
      }
    } catch (error) {
      toast.error('❌ Server bilan ulanishda xatolik.', { theme: 'dark' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="pricing" className="relative min-h-screen bg-black text-white py-24 overflow-hidden">

      {/* Background FX */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Investitsiya <span className="text-green-500">Rejalari</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Harajat emas, foyda keltiradigan sarmoya kiriting. Har bir tarifda premium sifat kafolatlangan.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative flex flex-col justify-between p-8 rounded-3xl transition-all duration-300 border backdrop-blur-md ${plan.popular
                ? 'bg-white/10 border-green-500/50 shadow-[0_0_40px_rgba(34,197,94,0.15)] scale-105 z-10 h-[550px]'
                : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07] h-[500px]'
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-black px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg shadow-green-500/20">
                  <Sparkles size={14} /> TAVSIYA ETILADI
                </div>
              )}

              <div>
                <h3 className="text-xl font-medium text-gray-300 mb-2">{plan.title}</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm text-gray-500 mb-2">{plan.currency}</span>
                </div>
                <p className="text-sm text-gray-400 mb-8 leading-relaxed border-b border-white/10 pb-6">
                  {plan.description}
                </p>

                <ul className="space-y-4">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-green-400' : 'text-gray-500'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelectedPlan(plan.title)}
                className={`mt-8 w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${plan.popular
                  ? 'bg-green-500 text-black hover:bg-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                  }`}
              >
                Tanlash
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL FORM */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPlan(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#0F0F0F] border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl overflow-hidden"
            >
              {/* Green Glow Effect inside modal */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-[60px] pointer-events-none" />

              <button
                onClick={() => setSelectedPlan(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <h3 className="text-2xl font-bold mb-1 text-white">Hamkorlikni boshlaymiz!</h3>
              <p className="text-gray-400 text-sm mb-6">
                <span className="text-green-400 font-semibold">{selectedPlan}</span> rejasi bo‘yicha so‘rov qoldiring.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 ml-1">Ismingiz</label>
                  <input
                    type="text"
                    placeholder="Abbos Bekmurodov"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:bg-white/10 transition-all placeholder:text-gray-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-500 ml-1">Telefon raqam</label>
                  <input
                    type="tel"
                    placeholder="+998 90 123 45 67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:bg-white/10 transition-all placeholder:text-gray-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] mt-2 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} /> Yuborilmoqda...
                    </>
                  ) : (
                    'Ariza yuborish'
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer
        position="bottom-right"
        theme="dark"
        toastStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
      />
    </section>
  )
}