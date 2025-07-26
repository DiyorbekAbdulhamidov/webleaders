'use client'

import React from 'react'
import { CheckCircle } from 'lucide-react'

export default function Services() {
  return (
    <section id="services" className="w-full bg-black text-white py-24 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Xizmatlarimiz</h2>
        <p className="text-lg text-gray-300 mb-12">
          Webleaders kompaniyasi orqali siz o‘z biznesingizga zamonaviy va ishonchli IT yechimlarini olasiz.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            'Zamonaviy web-saytlar tayyorlash',
            'Mobil ilovalar ishlab chiqish',
            'CRM tizimlar yaratish',
            'SEO optimizatsiya va Google qidiruvga chiqish',
            'Mahsulotlar katalogi va e-commerce saytlar',
            'Texnik ko‘mak va qo‘llab-quvvatlash'
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white/5 p-6 rounded-xl border border-white/10 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="text-green-400" />
                <h3 className="text-xl font-semibold">{service}</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Biz bu xizmatni to‘liq funksional, responsive va sizning brendingizga mos tarzda amalga oshiramiz.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
