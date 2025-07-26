'use client'

import { CheckCircle2 } from 'lucide-react'

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
            <button className="mt-8 w-full py-3 bg-green-400 text-black font-semibold rounded-xl hover:bg-green-500 transition">
              Buyurtma berish
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
