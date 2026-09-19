'use client'

import { useState, useEffect } from 'react'
import { toast } from '@/components/Toaster'
import Reveal from '@/components/Reveal'
import { MapPin, Phone, Mail, Send, Loader2 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { formatPhone, isPhoneComplete, PHONE_PREFIX, PHONE_MAX_LENGTH } from '@/lib/phone'

const sanitizeInput = (input: string) => {
  return input.replace(/[<>&/"']/g, '')
}

export default function Contact({ asPage = false }: { asPage?: boolean }) {
  const { t } = useLanguage()
  const HeadingTag = asPage ? 'h1' : 'h2'

  const [form, setForm] = useState({
    name: '',
    phone: PHONE_PREFIX,
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const [canSubmit, setCanSubmit] = useState(true)

  const MESSAGE_LIMIT = 200

  // localStorage'ni faqat mount'dan keyin o'qish mumkin (serverda mavjud emas)
  useEffect(() => {
    let lastSubmit: string | null = null
    try {
      lastSubmit = localStorage.getItem('lastSubmitTime')
    } catch { /* private rejim */ }
    if (lastSubmit) {
      const timeDiff = Date.now() - parseInt(lastSubmit)
      if (timeDiff < 60000) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCanSubmit(false)
        const timeout = setTimeout(() => setCanSubmit(true), 60000 - timeDiff)
        return () => clearTimeout(timeout)
      }
    }
  }, [])

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target

    if (name === 'name' && /[^a-zA-Zа-яА-ЯёЁ\s'-]/.test(value)) return

    if (name === 'message' && value.length > MESSAGE_LIMIT) return

    setForm(prev => ({
      ...prev,
      [name]: name === 'phone' ? formatPhone(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!canSubmit) {
      toast.warning(t.toast.wait)
      return
    }

    setSubmitting(true)

    const cleanName = sanitizeInput(form.name.trim())
    const cleanMessage = sanitizeInput(form.message.trim())

    if (cleanName.length < 3) {
      toast.error(t.toast.nameError)
      setSubmitting(false)
      return
    }

    if (!isPhoneComplete(form.phone)) {
      toast.error(t.toast.phoneError)
      setSubmitting(false)
      return
    }

    if (cleanMessage.length < 3) {
      toast.error(t.toast.msgError)
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: cleanName,
          phone: form.phone,
          plan: `XABAR: ${cleanMessage}`
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        toast.success(t.toast.success)
        setForm({ name: '', phone: PHONE_PREFIX, message: '' })

        try {
          localStorage.setItem('lastSubmitTime', Date.now().toString())
        } catch { /* private rejim */ }
        setCanSubmit(false)
        setTimeout(() => setCanSubmit(true), 60000)
      } else {
        toast.error(t.toast.error)
      }
    } catch {
      toast.error(t.toast.error)
    } finally {
      setSubmitting(false)
    }
  }

  const getCounterColor = () => {
    const length = form.message.length
    if (length >= MESSAGE_LIMIT) return 'text-red-500 font-bold'
    if (length >= MESSAGE_LIMIT - 20) return 'text-yellow-500'
    return 'text-gray-600'
  }

  return (
    <section id="contact" className={`relative bg-black text-white ${asPage ? 'pt-36 pb-24' : 'py-24'} overflow-hidden`}>
      <div className="wl-glow-deep absolute top-0 right-0 w-[600px] h-[600px] max-w-full pointer-events-none" />
      <div className="wl-glow-white absolute bottom-0 left-0 w-[400px] h-[400px] max-w-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <Reveal variant="left">
            <span className="text-green-400 font-bold tracking-widest uppercase text-sm mb-4 block">
              {t.contactSection.badge}
            </span>
            <HeadingTag className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t.contactSection.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                {t.contactSection.subtitle}
              </span>
            </HeadingTag>
            <p className="text-gray-400 text-lg mb-12 max-w-md">
              {t.contactSection.desc}
            </p>

            <div className="space-y-8">
              {[
                { icon: Phone, label: t.contactSection.infoPhone, value: '+998 20 012 77 07', href: 'tel:+998200127707' },
                { icon: Send, label: t.contactSection.infoTelegram, value: '@webleadersuz', href: 'https://t.me/webleadersuz' },
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
          </Reveal>

          <Reveal variant="right" delay={0.2} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 blur-3xl opacity-30 -z-10" />

            <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
              <h3 className="text-2xl font-bold mb-8">{t.contactSection.formTitle}</h3>

              <div className="space-y-6">
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

                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase tracking-wider ml-1">{t.contactSection.inputPhone}</label>
                  <div className={`relative transition-all duration-300 ${focused === 'phone' ? 'scale-[1.02]' : ''}`}>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      inputMode="tel"
                      autoComplete="tel"
                      maxLength={PHONE_MAX_LENGTH}
                      placeholder="+998 90 123-45-67"
                      className={`w-full bg-[#0a0a0a] border rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none transition-all duration-300 ${focused === 'phone' ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'border-white/10 hover:border-white/20'}`}
                    />
                  </div>
                </div>

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
                      maxLength={MESSAGE_LIMIT}
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
                  disabled={submitting || !canSubmit}
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
          </Reveal>
        </div>
      </div>
    </section>
  )
}