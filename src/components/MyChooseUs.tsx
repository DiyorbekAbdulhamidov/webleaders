'use client'

import { ShieldCheck, Timer, Users, Smartphone, Rocket, Handshake } from 'lucide-react'

export default function WhyChooseUs() {
  const items = [
    {
      icon: <ShieldCheck className="text-green-400 w-8 h-8" />,
      title: 'Tajribali jamoa',
      desc: 'Ko‘p yillik tajribaga ega mutaxassislar siz uchun ishlaydi.',
    },
    {
      icon: <Smartphone className="text-green-400 w-8 h-8" />,
      title: 'Moslashuvchan saytlar',
      desc: 'Mobil, planshet va kompyuterlarda mukammal ishlaydi.',
    },
    {
      icon: <Users className="text-green-400 w-8 h-8" />,
      title: 'Mahalliy muhitga mos',
      desc: 'O‘zbekiston biznes sharoitlarini yaxshi bilamiz.',
    },
    {
      icon: <Rocket className="text-green-400 w-8 h-8" />,
      title: 'Zamonaviy texnologiyalar',
      desc: 'Eng yangi stacklar va trend dizaynlardan foydalanamiz.',
    },
    {
      icon: <Timer className="text-green-400 w-8 h-8" />,
      title: 'Tez ishlab beramiz',
      desc: 'Saytlaringizni belgilangan muddatda topshiramiz.',
    },
    {
      icon: <Handshake className="text-green-400 w-8 h-8" />,
      title: 'Doimiy ko‘mak',
      desc: 'Texnik xizmatimiz doim siz bilan.',
    },
  ]

  return (
    <section className="bg-gradient-to-br from-black via-gray-900 to-black py-24 px-6 text-white relative">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Nega aynan biz?</h2>
        <p className="text-gray-300 text-lg max-w-xl mx-auto">
          Webleaders — ishonchli, zamonaviy va samarali yechimlar markazi.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:shadow-xl hover:border-green-400 transition-all duration-300"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-300 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
