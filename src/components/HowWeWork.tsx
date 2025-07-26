'use client'

import { ClipboardCheck, Layers, Code, Bug, Send, Smile } from 'lucide-react'

export default function HowWeWork() {
  const steps = [
    {
      icon: <ClipboardCheck className="text-green-400 w-8 h-8" />,
      title: 'Talablarni aniqlaymiz',
      desc: 'Sizning ehtiyojlaringizni chuqur tahlil qilamiz va aniq reja tuzamiz.',
    },
    {
      icon: <Layers className="text-green-400 w-8 h-8" />,
      title: 'Struktura va dizayn',
      desc: 'Saytning funksional tuzilmasi va dizayn maketlarini tayyorlaymiz.',
    },
    {
      icon: <Code className="text-green-400 w-8 h-8" />,
      title: 'Dasturlash bosqichi',
      desc: 'Sayt yoki tizimni zamonaviy texnologiyalar bilan yaratamiz.',
    },
    {
      icon: <Bug className="text-green-400 w-8 h-8" />,
      title: 'Testdan o‘tkazamiz',
      desc: 'Xatoliklar, optimizatsiya va ishlash tezligi tekshiriladi.',
    },
    {
      icon: <Send className="text-green-400 w-8 h-8" />,
      title: 'Loyihani topshiramiz',
      desc: 'Saytni sizga topshiramiz va barcha hujjatlarni taqdim etamiz.',
    },
    {
      icon: <Smile className="text-green-400 w-8 h-8" />,
      title: 'Qo‘llab-quvvatlaymiz',
      desc: 'Texnik yordam va yangilanishlarni doimiy ta’minlaymiz.',
    },
  ]

  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Biz qanday ishlaymiz?</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Webleaders har bir bosqichni aniq strategiya va yondashuv bilan amalga oshiradi.
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
