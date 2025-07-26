'use client'

import React from 'react'
import Link from 'next/link'

export default function HeroVideo() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Video fon */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Sizning brauzeringiz video tegini qo‘llab‑quvvatlamaydi.
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/60" />

      {/* Kontent */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-6xl mx-auto px-6 text-center">
          <h2
            className="mt-10 text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            Bizning IT yechimlarimiz bilan <br /> raqobatdan oldinda bo‘ling
          </h2>
          <p
            className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Webleaders kompaniyasi zamonaviy web-saytlar, mobil ilovalar va SEO xizmatlarini taklif etadi.
          </p>
          <div
            className="flex justify-center flex-wrap gap-4"
            data-aos="zoom-in"
            data-aos-delay="500"
          >
            <Link
              href="#contact"
              className="px-6 py-3 bg-green-500 text-black rounded-md font-semibold hover:bg-green-400 transition"
            >
              Biz bilan bog‘lanish
            </Link>
            <Link
              href="#services"
              className="px-6 py-3 border border-green-500 text-green-500 rounded-md font-medium hover:bg-green-500 hover:text-white transition"
            >
              Xizmatlarimiz
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
