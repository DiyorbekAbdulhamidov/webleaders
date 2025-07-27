'use client'

import { HelpCircle, Lightbulb, Brush, Hammer, Rocket, LifeBuoy } from 'lucide-react'

export default function HowWeWork() {
  const steps = [
    {
      icon: <HelpCircle className="text-green-400 w-8 h-8" />,
      title: '1. Muammoni anglaymiz',
      desc: 'Siz bilan suhbat orqali biznesingizdagi aniq muammoni tushunamiz.',
    },
    {
      icon: <Lightbulb className="text-green-400 w-8 h-8" />,
      title: '2. Yechim taklif qilamiz',
      desc: 'Tahlil asosida sizga to‘g‘ri keladigan yechimni taklif qilamiz.',
    },
    {
      icon: <Brush className="text-green-400 w-8 h-8" />,
      title: '3. Fikrni dizaynga aylantiramiz',
      desc: 'Dizayn — birinchi taassurot. Biz uni mukammal qilishga harakat qilamiz.',
    },
    {
      icon: <Hammer className="text-green-400 w-8 h-8" />,
      title: '4. Mahsulotni yaratamiz',
      desc: 'Kod yozamiz, tizim quramiz — mahsulot jismoniy shaklga kiradi.',
    },
    {
      icon: <Rocket className="text-green-400 w-8 h-8" />,
      title: '5. Ishga tushuramiz',
      desc: 'Loyiha tayyor bo‘lgach, uni onlayn ishga tushuramiz va nazorat qilamiz.',
    },
    {
      icon: <LifeBuoy className="text-green-400 w-8 h-8" />,
      title: '6. Doim yoningizdamiz',
      desc: 'Yangi xatoliklar yoki savollar bo‘lsa — texnik yordam har doim bor.',
    },
  ]

  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Sizda muammo bor – bizda yechim bor</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Webleaders har bir mijozning muammosini eshitadi, tushunadi va unga yechim topadi. Biz bilan ishlash – bu ishonchli hamkorlik yo‘li.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:shadow-xl hover:border-green-400 transition-all duration-300"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-300 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
