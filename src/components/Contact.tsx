'use client'

import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', phone: '', message: '' })
  }

  return (
    <section id="contact" className="bg-neutral-950 text-white px-4 py-24 sm:px-10 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-10 md:p-14 backdrop-blur-xl transition">
        <h2 className="text-4xl sm:text-5xl font-display font-semibold tracking-tight mb-4">
          Aloqa
        </h2>
        <p className="text-gray-400 mb-8 text-base sm:text-lg leading-relaxed">
          Biznesingiz uchun yechim kerakmi? Nomeringizni qoldiring yoki to‘g‘ridan-to‘g‘ri bizga qo‘ng‘iroq qiling.
        </p>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div>
            <label className="block mb-2 text-sm text-gray-300">Ismingiz</label>
            <input
              type="text"
              name="name"
              placeholder="Ali Valiyev"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">Telefon raqamingiz</label>
            <input
              type="tel"
              name="phone"
              placeholder="+998 90 123 45 67"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">Xabaringiz</label>
            <textarea
              name="message"
              rows={5}
              placeholder="Loyiham haqida maslahat olishni xohlayman..."
              value={form.message}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              type="submit"
              className="flex-1 bg-green-400 hover:bg-green-500 text-black font-semibold rounded-xl py-3 transition text-center"
            >
              Yuborish
            </button>
            <a
              href="tel:+998200127707"
              className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold rounded-xl py-3 text-center transition"
            >
              📞 Telefon qilish
            </a>
          </div>
        </form>

        {submitted && (
          <p className="text-green-400 mt-6 text-sm sm:text-base">
            ✅ Xabaringiz muvaffaqiyatli yuborildi. Tez orada siz bilan bog‘lanamiz.
          </p>
        )}
      </div>
    </section>
  )
}
