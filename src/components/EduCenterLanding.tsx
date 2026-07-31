'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Users,
  Wallet,
  BellRing,
  Search,
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  ShieldCheck,
  Check,
  Phone,
  Send
} from 'lucide-react'

const PHONE = '+998200127707'
const PHONE_LABEL = '+998 20 012 77 07'
const TELEGRAM = 'https://t.me/webleadersuz'

/* ---------------------------------- MA'LUMOTLAR ---------------------------------- */

const PAINS = [
  {
    icon: BellRing,
    title: 'Kechqurun kelgan so‘rov ertalabgacha javobsiz',
    text:
      'Ota-onalar ish kunidan keyin qidiradi. Direct va guruhga tushgan savol tongda ochilganda mijoz allaqachon boshqa markazga yozilgan bo‘ladi.'
  },
  {
    icon: Users,
    title: 'Lidlar daftar va bloknotda yo‘qoladi',
    text:
      'Administrator qo‘lda yozadi, bir qismi tushib qoladi. “Kim qo‘ng‘iroq qilgan edi?” degan savolga aniq javob yo‘q.'
  },
  {
    icon: Wallet,
    title: 'To‘lov va qarzdorlik hisobi tarqoq',
    text:
      'Kim to‘ladi, kim qarzdor, qaysi guruhda nechta o‘quvchi bor — hammasi turli Excel fayllar va xotirada.'
  },
  {
    icon: Search,
    title: 'Google‘da markazingiz ko‘rinmaydi',
    text:
      '“Toshkentda IELTS kursi” deb qidirgan odam sizni topmaydi, chunki Instagram sahifasi Google natijalarida chiqmaydi.'
  }
]

const SOLUTIONS = [
  {
    icon: LayoutDashboard,
    title: 'Sotuvchi sayt',
    text:
      'Kurslar, narxlar, o‘qituvchilar, natijalar va filiallar — ishonch uyg‘otadigan tuzilma. Telefonda native ilova kabi ishlaydi.'
  },
  {
    icon: MessageSquare,
    title: 'Qabul formasi + Telegram',
    text:
      'O‘quvchi tungi soat 3 da ham ariza qoldiradi. Ma’lumot bir soniyada Telegram guruhingizga tushadi — hech biri yo‘qolmaydi.'
  },
  {
    icon: BarChart3,
    title: 'Lidlar va talabalar paneli',
    text:
      'Har bir ariza kartochka bo‘lib turadi: yangi, qo‘ng‘iroq qilindi, sinov darsi, yozildi. Guruh, davomat va to‘lov hisobi bitta joyda.'
  },
  {
    icon: Search,
    title: 'Google va Yandex‘da chiqish',
    text:
      'Texnik SEO, tezlik, sahifa tuzilmasi va lokal belgilar sozlanadi. Markazingiz o‘z nomi va yo‘nalishi bo‘yicha topiladi.'
  }
]

const PACKAGES = [
  {
    name: 'Vizitka',
    price: '2.5 mln',
    tagline: 'Yangi yoki kichik markaz uchun ishonchli start.',
    term: '5 ish kuni',
    popular: false,
    features: [
      'Bir sahifali premium landing',
      'Kurslar, narxlar, o‘qituvchilar bloki',
      'Qabul formasi → Telegram bildirishnoma',
      'To‘liq mobil adaptatsiya',
      'Google‘ga indeksatsiya (asosiy SEO)',
      '1 oy texnik qo‘llab-quvvatlash'
    ]
  },
  {
    name: 'Markaz+',
    price: '6.5 mln',
    tagline: 'O‘sayotgan, bir nechta yo‘nalishli markazlar uchun.',
    term: '2–3 hafta',
    popular: true,
    features: [
      'Ko‘p sahifali sayt (kurslar, blog, filiallar)',
      'Boshqaruv paneli — kurs va narxni o‘zingiz o‘zgartirasiz',
      'Lidlar CRM‘i: yangi → qo‘ng‘iroq → sinov darsi → yozildi',
      'Ikki tilli interfeys (Uz / Ru)',
      'To‘liq SEO va tezlik optimizatsiyasi',
      'Domen + hosting birinchi yil bizdan',
      '3 oy qo‘llab-quvvatlash'
    ]
  },
  {
    name: 'Avtomatlashtirish',
    price: '14 mln',
    tagline: 'Filiallar tarmog‘i va to‘liq raqamli hisob uchun.',
    term: '4–6 hafta',
    popular: false,
    features: [
      'Markaz+ tarkibidagi hamma narsa',
      'Talaba, guruh va davomat hisobi',
      'To‘lov va qarzdorlik nazorati, kvitansiya',
      'O‘qituvchi ish haqi hisob-kitobi',
      'Telegram bot: dars jadvali va to‘lov eslatmasi',
      'Rollar tizimi (rahbar / administrator / o‘qituvchi)',
      '6 oy shaxsiy menejer va 24/7 monitoring'
    ]
  }
]

const CASES = [
  {
    name: 'Hilal Edu',
    tag: 'Ta’lim platformasi',
    image: '/projects/hilal1.png',
    text:
      'Yuqori yuklamalarga chidamli, ta’lim jarayonlarini raqamlashtiruvchi kompleks platforma. Katta oqimdagi o‘quvchilar bilan ishlash uchun qurilgan arxitektura.',
    href: '/portfolio/hilaledu',
    live: 'https://hilaledu.uz'
  },
  {
    name: 'Adizone Education',
    tag: 'ERP / CRM yechim',
    image: '/projects/adizone1.png',
    text:
      'Ta’lim muassasalari zanjiri uchun ERP. Talabalar, guruhlar va to‘lovlar hisobi to‘liq avtomatlashtirilgan, Telegram bot bilan integratsiya qilingan.',
    href: '/portfolio/adizone',
    live: 'https://adizone.uz'
  }
]

const STEPS = [
  { n: '01', t: 'Tanishuv', d: 'Markazingiz, yo‘nalishlar va hozirgi qabul jarayonini o‘rganamiz. 30 daqiqa, bepul.' },
  { n: '02', t: 'Tuzilma va dizayn', d: 'Sahifa tuzilmasi va dizayn maketi. Tasdiqlagunizcha qayta ishlaymiz.' },
  { n: '03', t: 'Dasturlash', d: 'Sayt va panel quriladi. Har hafta jarayon haqida xabar berib turamiz.' },
  { n: '04', t: 'Ishga tushirish', d: 'Domen, hosting, SEO sozlamalari. Administratoringizni panelda ishlashga o‘rgatamiz.' }
]

const FAQ = [
  {
    q: 'Bizda Instagram bor, sayt nimaga kerak?',
    a: 'Instagram — ijara maydon: algoritm o‘zgarsa yoki sahifa bloklansa, auditoriya bilan bog‘lanish yo‘qoladi. Sayt esa sizniki. Ustiga, “Toshkentda IELTS kursi” deb Google‘da qidirayotgan odam Instagram sahifangizga tushmaydi — u faqat saytlarni ko‘radi.'
  },
  {
    q: 'Panelni administratorimiz ishlata oladimi?',
    a: 'Ha. Panel maxsus sodda qilib quriladi va topshirishda administratoringizga jonli o‘rgatamiz. Qo‘shimcha video-yo‘riqnoma qoldiramiz. Savol chiqsa — qo‘llab-quvvatlash davrida javob beramiz.'
  },
  {
    q: 'Tayyor shablon berasizmi?',
    a: 'Yo‘q. Har bir markaz o‘z yo‘nalishi va narx tuzilmasiga ega. Dizayn va tuzilma sizning kurslaringiz asosida quriladi. Shu sababli tayyor shablonlarga qaraganda ko‘proq ariza keltiradi.'
  },
  {
    q: 'To‘lov qanday amalga oshiriladi?',
    a: 'Odatda 50% ishni boshlashda, 50% topshirishda. Avtomatlashtirish paketida bosqichma-bosqich jadval tuziladi. Muddat va hajm shartnomada qayd etiladi.'
  },
  {
    q: 'Muddatni buzsangiz nima bo‘ladi?',
    a: 'Shartnomada muddat aniq yoziladi. Biz sababsiz kechiktirsak — moliyaviy kompensatsiya qo‘llaniladi. Bu bizning javobgarligimiz, sizning tavakkalingiz emas.'
  },
  {
    q: 'Keyinchalik yangi kurs qo‘sha olamanmi?',
    a: 'Markaz+ va Avtomatlashtirish paketlarida kurs, narx, o‘qituvchi va yangilikni o‘zingiz panel orqali qo‘shasiz — bizga murojaat qilish shart emas.'
  }
]

/* ---------------------------------- SAHIFA ---------------------------------- */

export default function EduCenterLanding() {
  const [form, setForm] = useState({ name: '', phone: '', centerName: '', pkg: 'Hali aniq emas' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // API `plan` maydonini majburiy talab qiladi — markaz nomi va paketni shu yerga jamlaymiz.
    const plan = `O‘QUV MARKAZI: ${form.centerName || 'ko‘rsatilmagan'} | Qiziqqan paket: ${form.pkg} | Manba: /oquv-markazlar`

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, plan })
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', phone: '', centerName: '', pkg: 'Hali aniq emas' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="bg-black text-white">
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-[10%] h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-[120px] md:h-[520px] md:w-[520px]" />
          <div className="absolute bottom-0 right-[5%] h-[260px] w-[260px] rounded-full bg-sky-500/10 blur-[120px] md:h-[460px] md:w-[460px]" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-5 py-20 md:px-10 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 md:text-xs">
              O‘quv markazlari uchun maxsus yo‘nalish
            </span>

            <h1 className="mt-7 text-4xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Har oy qancha o‘quvchini
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                javobsiz qoldiryapsiz?
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-gray-400 md:text-xl">
              O‘quv markazlari uchun sayt va qabul tizimi quramiz. Ariza tungi soat 3 da ham qabul qilinadi,
              Telegramingizga tushadi va panelda hisobga olinadi — administratoringizning daftarida emas.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#ariza"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-white px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:bg-emerald-400 md:text-base"
              >
                Bepul tahlil olish
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/15 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:border-white/40 md:text-base"
              >
                <Phone className="h-4 w-4" />
                {PHONE_LABEL}
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/5 pt-8 text-sm text-gray-500">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-600">Ta’lim sohasidagi ishlarimiz</span>
              <span className="font-bold text-white">Hilal Edu</span>
              <span className="font-bold text-white">Adizone Education</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================ MUAMMO ============================ */}
      <section className="border-b border-white/5 py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Tanish holat</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight tracking-tight md:text-5xl">
            Muammo o‘quvchi kam kelishida emas
          </h2>
          <p className="mt-5 max-w-2xl text-base text-gray-400 md:text-lg">
            Aksariyat markazlarda so‘rov yetarli. Ular qabul jarayonining ichida yo‘qoladi.
          </p>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {PAINS.map(item => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/5 bg-[#080808] p-7 transition-colors hover:border-red-500/20 md:p-9"
              >
                <item.icon className="mb-5 h-7 w-7 text-red-500" />
                <h3 className="mb-3 text-lg font-bold md:text-xl">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400 md:text-base">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ YECHIM ============================ */}
      <section className="border-b border-white/5 bg-[#040404] py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Nima quramiz</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight tracking-tight md:text-5xl">
            Sayt emas — ishlaydigan qabul tizimi
          </h2>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SOLUTIONS.map(item => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/5 bg-black p-7 transition-colors hover:border-emerald-400/30"
              >
                <item.icon className="mb-5 h-7 w-7 text-emerald-400" />
                <h3 className="mb-3 text-lg font-bold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ PAKETLAR ============================ */}
      <section id="paketlar" className="border-b border-white/5 py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Paketlar</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight tracking-tight md:text-5xl">
            Markazingiz hajmiga qarab
          </h2>
          <p className="mt-5 max-w-2xl text-base text-gray-400 md:text-lg">
            Narxlar aniq va yashirin to‘lovsiz. Aniq summa tanishuvdan keyin shartnomada belgilanadi.
          </p>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {PACKAGES.map(p => (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-3xl border p-8 md:p-10 ${
                  p.popular
                    ? 'border-emerald-400/40 bg-gradient-to-b from-emerald-400/[0.07] to-transparent'
                    : 'border-white/8 bg-[#080808]'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-8 rounded-full bg-emerald-400 px-4 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-black">
                    Eng ommabop
                  </span>
                )}

                <h3 className="text-2xl font-black">{p.name}</h3>
                <p className="mt-3 min-h-[48px] text-sm text-gray-400">{p.tagline}</p>

                <div className="mt-7 flex items-end gap-2">
                  <span className="text-4xl font-black tracking-tight md:text-5xl">{p.price}</span>
                  <span className="mb-1 text-sm text-gray-500">so‘mdan</span>
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-gray-600">Muddat: {p.term}</p>

                <ul className="mt-8 flex-1 space-y-3.5">
                  {p.features.map(f => (
                    <li key={f} className="flex gap-3 text-sm leading-relaxed text-gray-300">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#ariza"
                  onClick={() => setForm(s => ({ ...s, pkg: p.name }))}
                  className={`mt-9 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-black uppercase tracking-wider transition ${
                    p.popular
                      ? 'bg-emerald-400 text-black hover:bg-emerald-300'
                      : 'border border-white/15 text-white hover:border-white/40'
                  }`}
                >
                  Tanlash
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-white/8 bg-[#080808] p-6">
            <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-400" />
            <p className="text-sm leading-relaxed text-gray-400">
              <span className="font-bold text-white">Qo‘llab-quvvatlash davri tugagach</span> — oyiga 500 ming so‘m:
              hosting, zaxira nusxa, xavfsizlik yangilanishlari va kichik o‘zgartirishlar. Majburiy emas.
            </p>
          </div>
        </div>
      </section>

      {/* ============================ KEYSLAR ============================ */}
      <section className="border-b border-white/5 bg-[#040404] py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Keyslar</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight tracking-tight md:text-5xl">
            Ta’lim sohasida qilgan ishlarimiz
          </h2>

          <div className="mt-14 space-y-6">
            {CASES.map((c, i) => (
              <div
                key={c.name}
                className={`group flex flex-col overflow-hidden rounded-3xl border border-white/8 bg-black lg:flex-row ${
                  i % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex flex-col justify-center p-8 md:p-12 lg:w-1/2">
                  <span className="w-max rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                    {c.tag}
                  </span>
                  <h3 className="mt-6 text-3xl font-black tracking-tight md:text-5xl">{c.name}</h3>
                  <p className="mt-5 text-sm leading-relaxed text-gray-400 md:text-base">{c.text}</p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={c.href}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-wider transition hover:border-white/40"
                    >
                      Keysni ko‘rish
                    </Link>
                    <a
                      href={c.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/30 px-5 py-3 text-xs font-bold uppercase tracking-wider text-emerald-400 transition hover:border-emerald-400/60"
                    >
                      Saytga kirish
                    </a>
                  </div>
                </div>

                <div className="relative min-h-[240px] overflow-hidden border-white/8 lg:min-h-[380px] lg:w-1/2 lg:border-l">
                  <Image
                    src={c.image}
                    alt={`${c.name} — Webleaders loyihasi`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ JARAYON ============================ */}
      <section className="border-b border-white/5 py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Jarayon</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight tracking-tight md:text-5xl">
            Nima bo‘lishini oldindan bilasiz
          </h2>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(s => (
              <div key={s.n} className="rounded-2xl border border-white/5 bg-[#080808] p-7">
                <span className="text-3xl font-black text-white/10">{s.n}</span>
                <h3 className="mt-4 text-lg font-bold">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ FAQ ============================ */}
      <section className="border-b border-white/5 bg-[#040404] py-20 md:py-28">
        <div className="mx-auto max-w-[900px] px-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Savol-javob</p>
          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight md:text-5xl">
            Ko‘p beriladigan savollar
          </h2>

          <div className="mt-12 divide-y divide-white/5 border-y border-white/5">
            {FAQ.map((item, i) => (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-base font-bold md:text-lg">{item.q}</span>
                  <span
                    className={`shrink-0 text-2xl font-light text-emerald-400 transition-transform ${
                      openFaq === i ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <p className="pb-7 text-sm leading-relaxed text-gray-400 md:text-base">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ ARIZA ============================ */}
      <section id="ariza" className="relative overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />

        <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-5 md:px-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">
              Markazingizni
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                bepul tahlil qilamiz
              </span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-gray-400 md:text-lg">
              30 daqiqalik suhbat: hozirgi qabul jarayoningizni ko‘ramiz, qayerda o‘quvchi yo‘qolayotganini
              aytamiz va qaysi paket mos kelishini asoslab beramiz. Hech narsaga majbur emassiz.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href={`tel:${PHONE}`}
                className="flex items-center gap-4 rounded-xl border border-white/8 bg-[#080808] p-5 transition hover:border-white/20"
              >
                <Phone className="h-5 w-5 shrink-0 text-emerald-400" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Telefon</p>
                  <p className="mt-1 font-bold">{PHONE_LABEL}</p>
                </div>
              </a>
              <a
                href={TELEGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-white/8 bg-[#080808] p-5 transition hover:border-white/20"
              >
                <Send className="h-5 w-5 shrink-0 text-emerald-400" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Telegram</p>
                  <p className="mt-1 font-bold">@webleadersuz</p>
                </div>
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/8 bg-[#080808] p-7 md:p-11">
            <h3 className="text-xl font-black uppercase tracking-tight md:text-2xl">So‘rov qoldirish</h3>
            <p className="mt-2 text-sm text-gray-500">15 daqiqa ichida aloqaga chiqamiz.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="edu-name" className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                  Ismingiz
                </label>
                <input
                  id="edu-name"
                  required
                  maxLength={100}
                  type="text"
                  placeholder="Ism-sharifingiz"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-black px-4 py-3.5 text-base text-white placeholder-gray-700 transition focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="edu-phone" className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                  Telefon raqamingiz
                </label>
                <input
                  id="edu-phone"
                  required
                  maxLength={30}
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-black px-4 py-3.5 text-base text-white placeholder-gray-700 transition focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="edu-center" className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                  O‘quv markazi nomi
                </label>
                <input
                  id="edu-center"
                  required
                  maxLength={100}
                  type="text"
                  placeholder="Markazingiz nomi"
                  value={form.centerName}
                  onChange={e => setForm({ ...form, centerName: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-black px-4 py-3.5 text-base text-white placeholder-gray-700 transition focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="edu-pkg" className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                  Qiziqtirgan paket
                </label>
                <select
                  id="edu-pkg"
                  value={form.pkg}
                  onChange={e => setForm({ ...form, pkg: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-black px-4 py-3.5 text-base text-white transition focus:border-emerald-400 focus:outline-none"
                >
                  <option>Hali aniq emas</option>
                  <option>Vizitka</option>
                  <option>Markaz+</option>
                  <option>Avtomatlashtirish</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-white py-4 text-sm font-black uppercase tracking-widest text-black transition hover:bg-emerald-400 disabled:opacity-50 md:text-base"
              >
                {status === 'loading' ? 'Yuborilmoqda…' : 'Bepul tahlil olish'}
                {status !== 'loading' && <ArrowRight className="h-5 w-5" />}
              </button>

              {status === 'success' && (
                <p className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 py-4 text-center text-xs font-bold uppercase tracking-widest text-emerald-400">
                  So‘rovingiz qabul qilindi. Tez orada bog‘lanamiz.
                </p>
              )}
              {status === 'error' && (
                <p className="rounded-xl border border-red-500/20 bg-red-500/10 py-4 text-center text-xs font-bold uppercase tracking-widest text-red-500">
                  Xatolik yuz berdi. Iltimos, {PHONE_LABEL} raqamiga qo‘ng‘iroq qiling.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
