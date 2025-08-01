'use client'

import { useState } from 'react'
import Cleave from 'cleave.js/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '+998 ',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    if (name === 'name' && /[^a-zA-Zа-яА-ЯёЁ\s'-]/.test(value)) return
    if (name === 'message' && value.length > 500) return

    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const digitsOnly = form.phone.replace(/\D/g, '')
    if (digitsOnly.length !== 12) {
      toast.error('❌ Telefon raqam to‘liq kiritilmadi.', {
        position: 'bottom-right',
        theme: 'dark',
      })
      setSubmitting(false)
      return
    }

    try {
      await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      toast.success('Xabaringiz yuborildi! Tez orada siz bilan bog‘lanamiz.', {
        position: 'bottom-right',
        theme: 'dark',
      })

      setForm({ name: '', phone: '+998 ', message: '' })
    } catch (error) {
      toast.error('Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.', {
        position: 'bottom-right',
        theme: 'dark',
      })
    }

    setSubmitting(false)
  }

  return (
    <section id="contact" className="bg-neutral-950 text-white px-4 py-24 sm:px-10 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-10 md:p-14 backdrop-blur-xl transition">
        <h2 className="text-4xl sm:text-5xl font-display font-semibold tracking-tight mb-4">Aloqa</h2>
        <p className="text-gray-400 mb-8 text-base sm:text-lg leading-relaxed">
          Biznesingiz uchun yechim kerakmi? Raqamingizni qoldiring yoki to‘g‘ridan-to‘g‘ri bizga qo‘ng‘iroq qiling.
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
            <Cleave
              options={{
                prefix: '+998',
                blocks: [4, 2, 3, 2, 2],
                delimiters: [' ', ' ', '-', '-', ''],
                numericOnly: true,
              }}
              value={form.phone}
              name="phone"
              onChange={handleChange}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              placeholder="+998 33 123-45-67"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Xabaringiz <span className="text-xs text-gray-500">({form.message.length}/500)</span>
            </label>
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
              disabled={submitting}
              className="flex-1 bg-green-400 hover:bg-green-500 text-black font-semibold rounded-xl py-3 transition text-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? '⏳ Yuborilmoqda...' : 'Yuborish'}
            </button>
            <a
              href="tel:+998200127707"
              className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold rounded-xl py-3 text-center transition"
            >
              📞 Telefon qilish
            </a>
          </div>
        </form>
      </div>

      <ToastContainer />
    </section>
  )
}
