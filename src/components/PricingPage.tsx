'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import 'react-toastify/dist/ReactToastify.css'

const plans = [
  {
    title: 'Boshlang‘ich',
    price: "1 500 000 so'm",
    description: 'Oddiy veb-saytga ega bo‘lishni xohlovchilar uchun.',
    features: [
      '1 sahifali sayt (landing)',
      'Mobil va kompyuterga mos dizayn',
      'Kontakt forma va Google xarita',
      '1 hafta ichida tayyor',
      '1 oy texnik ko‘mak',
    ],
  },
  {
    title: 'Biznes',
    price: "4 500 000 so'm",
    description: 'Kichik va o‘rta biznes uchun ideal tanlov.',
    features: [
      '5 tagacha sahifa: Bosh sahifa, Xizmatlar, Portfolio, About, Contact',
      'Admin panel orqali o‘zgartirish imkoni',
      'Tez yuklanish va SEO optimizatsiya',
      '3 oy texnik ko‘mak',
    ],
    popular: true,
  },
  {
    title: 'Premium',
    price: "9 000 000 so'm",
    description: 'Yirik kompaniyalar va to‘liq funksional saytlar uchun.',
    features: [
      'Cheksiz sahifalar va modul qo‘shish imkoniyati',
      'To‘lov tizimi va foydalanuvchi ro‘yxati integratsiyasi',
      'Boshqaruv paneli (CRM/ERP kabi)',
      'Mahsulotlar katalogi va blog bo‘limi',
      '6 oy texnik qo‘llab-quvvatlash',
    ],
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

    try {
      const res = await fetch('/api/send-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, plan: selectedPlan }),
      })

      const data = await res.json()
      if (data.success) {
        toast.success('Buyurtma muvaffaqiyatli yuborildi!')
        setName('')
        setPhone('+998')
        setSelectedPlan(null)
      } else {
        toast.error('❌ Xatolik yuz berdi. Qaytadan urinib ko‘ring.')
      }
    } catch (err) {
      console.error('Xatolik:', err)
      toast.error('❌ Server bilan ulanishda xatolik.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="pricing" className="min-h-screen bg-neutral-950 text-white px-6 py-24">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Narxlar rejalari</h2>
        <p className="text-gray-400 text-lg">
          Biz sizning ehtiyojlaringizga mos yechimlarni taklif qilamiz. Har bir tarif professional darajada tayyorlanadi.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`rounded-2xl border ${plan.popular ? 'border-green-400 shadow-green-400/20 shadow-xl' : 'border-white/10'
              } bg-white/5 p-8 flex flex-col justify-between hover:scale-[1.02] transition`}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-1">{plan.title}</h3>
              <p className="text-green-400 text-3xl font-bold">{plan.price}</p>
              <p className="text-gray-400 mt-2 mb-6 text-sm">{plan.description}</p>
              <ul className="space-y-3 text-gray-300 text-sm">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <CheckCircle2 className="text-green-400 w-4 h-4" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setSelectedPlan(plan.title)}
              className="mt-8 w-full py-3 bg-green-400 text-black font-semibold rounded-xl hover:bg-green-500 transition"
            >
              Buyurtma berish
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="bg-neutral-900 text-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <h3 className="text-xl font-bold mb-4">Buyurtma: {selectedPlan}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Ismingiz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-gray-600 bg-neutral-800 text-white px-4 py-2 rounded-lg"
                />
                <input
                  type="tel"
                  placeholder="Telefon raqam"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full border border-gray-600 bg-neutral-800 text-white px-4 py-2 rounded-lg"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                  >
                    {loading ? 'Yuborilmoqda...' : 'Yuborish'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPlan(null)}
                    className="flex-1 bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
                  >
                    Bekor qilish
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="dark"
        newestOnTop
        pauseOnHover
        closeOnClick
      />
    </div>
  )
}
