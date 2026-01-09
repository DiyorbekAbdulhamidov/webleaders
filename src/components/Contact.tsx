'use client'

import { useState } from 'react'
import Cleave from 'cleave.js/react'
import { ToastContainer, toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Send, Loader2 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext' // <--- TILLARNI ULANDIK
import 'react-toastify/dist/ReactToastify.css'

export default function Contact() {
  const { t } = useLanguage() // <--- TILLARNI CHAQIRIB OLDIK

  const [form, setForm] = useState({
    name: '',
    phone: '+998',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  // Maksimal belgi limiti
  const MESSAGE_LIMIT = 200

  const handleChange = (e: any) => {
    const { name, value } = e.target

    // 1. Ism validatsiyasi (faqat harflar)
    if (name === 'name' && /[^a-zA-Zа-яА-ЯёЁ\s'-]/.test(value)) return

    // 2. Xabar limiti validatsiyasi (200 tadan oshirmaslik)
    if (name === 'message') {
      if (value.length > MESSAGE_LIMIT) return
    }

    setForm({ ...form, [name]: value })
  }

  // Telefon raqamni tozalash (faqat raqamlar qoladi)
  const getRawPhone = (phone: string) => phone.replace(/\D/g, '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Validatsiya: Ism bo'sh emasligi
    if (form.name.length < 3) {
      toast.error(t.toast.nameError, { theme: 'dark' }) // <--- TARJIMA
      setSubmitting(false)
      return
    }

    // Validatsiya: Telefon raqam (998 + 9 ta raqam = 12 ta)
    const rawPhone = getRawPhone(form.phone)
    if (rawPhone.length < 12) {
      toast.error(t.toast.phoneError, { theme: 'dark' }) // <--- TARJIMA
      setSubmitting(false)
      return
    }

    // Validatsiya: Xabar bo'sh emasligi
    if (form.message.length < 3) {
      toast.error(t.toast.msgError, { theme: 'dark' }) // <--- TARJIMA
      setSubmitting(false)
      return
    }

    try {
      // Backendga moslash (/api/contact)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          plan: `XABAR: ${form.message}` // Backend "plan" kutgani uchun xabarni shunga joylaymiz
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        toast.success(t.toast.success, { theme: 'dark' }) // <--- TARJIMA
        setForm({ name: '', phone: '+998', message: '' })
      } else {
        toast.error(t.toast.error, { theme: 'dark' }) // <--- TARJIMA
      }
    } catch (error) {
      toast.error(t.toast.error, { theme: 'dark' }) // <--- TARJIMA
    } finally {
      setSubmitting(false)
    }
  }

  // Xabar uzunligiga qarab rangni o'zgartirish
  const getCounterColor = () => {
    const length = form.message.length
    if (length >= MESSAGE_LIMIT) return 'text-red-500 font-bold'
    if (length >= MESSAGE_LIMIT - 20) return 'text-yellow-500' // Oxirgi 20 ta qolganda sariq
    return 'text-gray-600'
  }

  return (
    <section id="contact" className="relative bg-black text-white py-24 overflow-hidden">
      {/* Orqa fon bezaklari */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Chap taraf: Ma'lumotlar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-green-400 font-bold tracking-widest uppercase text-sm mb-4 block">
              {t.contactSection.badge} {/* Aloqa */}
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t.contactSection.title} <br /> {/* G‘oyalar */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                {t.contactSection.subtitle} {/* Reallikka Aylanadi */}
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-md">
              {t.contactSection.desc}
            </p>

            <div className="space-y-8">
              {[
                { icon: Phone, label: t.contactSection.infoPhone, value: '+998 20 012 77 07', href: 'tel:+998200127707' },
                { icon: MapPin, label: t.contactSection.infoLoc, value: 'Toshkent sh., Yashnobod tumani', href: null },
                { icon: Mail, label: t.contactSection.infoEmail, value: 'info@webleaders.uz', href: 'mailto:info@webleaders.uz' }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-5 group cursor-pointer">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-black transition-all duration-300 border border-white/10">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm mb-1 uppercase tracking-wider">{item.label}</h4>
                    {item.href ? (
                      <a href={item.href} className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* O'ng taraf: Forma */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 blur-3xl opacity-30 -z-10" />

            <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
              <h3 className="text-2xl font-bold mb-8">{t.contactSection.formTitle}</h3> {/* So‘rov qoldirish */}

              <div className="space-y-6">
                {/* Ism */}
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase tracking-wider ml-1">{t.contactSection.inputName}</label>
                  <div className={`relative transition-all duration-300 ${focused === 'name' ? 'scale-[1.02]' : ''}`}>
                    <input
                      type="text"
                      name="name"
                      placeholder={t.contactSection.inputName}
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      autoComplete="name"
                      className={`w-full bg-[#0a0a0a] border rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none transition-all duration-300 ${focused === 'name' ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'border-white/10 hover:border-white/20'}`}
                    />
                  </div>
                </div>

                {/* Telefon */}
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase tracking-wider ml-1">{t.contactSection.inputPhone}</label>
                  <div className={`relative transition-all duration-300 ${focused === 'phone' ? 'scale-[1.02]' : ''}`}>
                    <Cleave
                      options={{ prefix: '+998', blocks: [4, 2, 3, 2, 2], delimiters: [' ', ' ', '-', '-', ''], numericOnly: true }}
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      inputMode="tel"
                      className={`w-full bg-[#0a0a0a] border rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none transition-all duration-300 ${focused === 'phone' ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'border-white/10 hover:border-white/20'}`}
                    />
                  </div>
                </div>

                {/* Xabar (Textarea) */}
                <div className="space-y-2">
                  <div className="flex justify-between ml-1">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">{t.contactSection.inputMsg}</label>
                    <span className={`text-[10px] transition-colors duration-300 ${getCounterColor()}`}>
                      ({form.message.length}/{MESSAGE_LIMIT})
                    </span>
                  </div>

                  <div className={`relative transition-all duration-300 ${focused === 'message' ? 'scale-[1.02]' : ''}`}>
                    <textarea
                      name="message"
                      rows={4}
                      maxLength={MESSAGE_LIMIT} // HTML darajasida cheklov
                      placeholder={t.contactSection.placeholderMsg}
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      className={`w-full bg-[#0a0a0a] border rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none transition-all duration-300 resize-none ${focused === 'message' ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]' :
                        form.message.length >= MESSAGE_LIMIT ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'
                        }`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-green-500 text-black font-bold text-lg rounded-xl py-4 hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4 active:scale-95"
                >
                  {submitting ? (
                    <><Loader2 className="animate-spin" /> {t.contactSection.btnLoading}</>
                  ) : (
                    <>{t.contactSection.btnSubmit} <Send size={18} /></>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </section>
  )
}