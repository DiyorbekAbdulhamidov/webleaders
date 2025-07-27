'use client'

import { MonitorSmartphone, Smartphone, Settings2, TrendingUp, ShoppingCart, LifeBuoy } from 'lucide-react'

export default function Services() {
  const services = [
    {
      icon: <MonitorSmartphone className="w-8 h-8 text-green-400" />,
      title: 'Zamonaviy web-saytlar tayyorlash',
      desc: 'Responsive, tezkor va SEOga mos web-saytlar yordamida sizning biznesingiz internetda porlaydi.',
    },
    {
      icon: <Smartphone className="w-8 h-8 text-green-400" />,
      title: 'Mobil ilovalar ishlab chiqish',
      desc: 'iOS va Android platformalari uchun qulay, tez va samarali ilovalarni ishlab chiqamiz.',
    },
    {
      icon: <Settings2 className="w-8 h-8 text-green-400" />,
      title: 'CRM tizimlar yaratish',
      desc: 'Ichki ish jarayonlaringizni avtomatlashtiruvchi, professional darajadagi boshqaruv tizimlari.',
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-400" />,
      title: 'SEO optimizatsiya va Google qidiruvga chiqish',
      desc: 'Saytingizni Google va boshqa qidiruv tizimlarida yuqori o‘rinlarga olib chiqamiz.',
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-green-400" />,
      title: 'Mahsulot katalogi va e-commerce saytlar',
      desc: 'Onlayn savdo va mahsulotlarni boshqarish uchun kuchli platformalarni yaratamiz.',
    },
    {
      icon: <LifeBuoy className="w-8 h-8 text-green-400" />,
      title: 'Texnik ko‘mak va qo‘llab-quvvatlash',
      desc: 'Sayt yoki tizimlaringizni barqaror ishlashini kafolatlaymiz va doimiy texnik yordam beramiz.',
    },
  ]

  return (
    <section id="services" className="bg-gradient-to-br from-black via-zinc-900 to-black text-white py-24 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Xizmatlarimiz</h2>
        <p className="text-lg text-gray-400">
          Webleaders sizning biznesingizni keyingi bosqichga olib chiqadigan IT xizmatlarini taklif qiladi.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:shadow-xl hover:border-green-400 transition-all duration-300"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors duration-300">{service.title}</h3>
            <p className="text-gray-300 text-sm">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
