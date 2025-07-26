'use client'

import React from 'react'

export default function AboutSection() {
  return (
    <section className="w-full bg-black text-white py-20 px-4 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Matn qismi */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Biz haqimizda
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            Webleaders – bu zamonaviy texnologiyalar orqali biznesingizni yangi bosqichga olib chiquvchi IT kompaniya. Biz web-saytlar, mobil ilovalar, CRM tizimlar va SEO xizmatlari bilan mijozlarimizga innovatsion yechimlar taqdim etamiz.
          </p>
          <p className="text-lg text-gray-400">
            Bizga ishonishadi, chunki biz sifat, tezlik va qulaylikni birlashtiramiz. Har bir loyiha – bu biz uchun mas’uliyat, siz uchun esa natija.
          </p>
        </div>

        {/* Lottie animatsiyasi */}
        <div className="w-full">
          {/* <AboutAnimation /> */}
        </div>
      </div>
    </section>
  )
}
