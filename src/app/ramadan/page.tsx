"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Montserrat, Inter } from "next/font/google";
import { ArrowRight, ShieldCheck, TrendingUp, Users, LayoutTemplate, Database } from "lucide-react";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "700", "800", "900"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function EduCenterUniversalPremium() {
  const [formData, setFormData] = useState({ name: "", phone: "", centerName: "" });
  const [status, setStatus] = useState("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Asosiy sayt body elementining scrollini vaqtincha to'xtatib, bu sahifani to'liq ekranga yoyish hiylasi
    document.body.style.overflow = 'auto';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", centerName: "" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (!mounted) return null;

  return (
    // ASOSIY O'ZGARISH: fixed va z-[999999] berildi. Bu hamma global Navbar va Footer ustini yopadi.
    <div className={`fixed inset-0 z-[999999] overflow-y-auto bg-[#020202] text-white ${inter.className} selection:bg-[#00ff7f] selection:text-black w-full h-full`}>

      {/* 1. MUKAMMAL ATMOSFERA (Mobilga moslashtirilgan blur) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[5%] left-[5%] md:left-[20%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#00ff7f]/10 blur-[80px] md:blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[0%] md:right-[10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#d4af37]/5 blur-[80px] md:blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
      </div>

      {/* 2. NAVBAR (Mobil ekran uchun kichraytirilgan) */}
      <nav className="relative z-50 flex items-center justify-between px-4 md:px-12 py-5 md:py-8 max-w-[1600px] mx-auto">
        <Image src="/logo.png" alt="Webleaders" width={120} height={30} className="object-contain md:w-[160px] md:h-[40px]" priority />
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2.5 bg-[#111] border border-[#222] rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <span className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className={`text-gray-300 text-[8px] md:text-[10px] font-bold tracking-[0.15em] md:tracking-[0.25em] uppercase ${montserrat.className}`}>Limit: 30 ta joy</span>
          </div>
        </div>
      </nav>

      {/* 3. HERO SECTION - Mobil uchun shriftlar va paddinglar to'g'rilandi */}
      <section className="relative z-10 flex flex-col xl:flex-row items-center justify-between px-4 md:px-12 max-w-[1600px] mx-auto gap-10 md:gap-16 pt-4 pb-16 md:pb-20">

        <motion.div
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full xl:w-1/2 flex flex-col items-start z-20"
        >
          <div className="px-3 py-1.5 md:px-4 md:py-2 border border-[#d4af37]/30 bg-[#d4af37]/5 rounded-full backdrop-blur-md mb-6 md:mb-8 inline-flex items-center gap-2 md:gap-3">
            <span className="text-[#d4af37] text-base md:text-xl">🌙</span>
            <span className={`text-[#d4af37] font-bold text-[9px] md:text-sm tracking-[0.1em] md:tracking-[0.2em] uppercase ${montserrat.className}`}>O'quv Markazlari Uchun Maxsus</span>
          </div>

          <h1 className={`${montserrat.className} text-[2.5rem] leading-[1.05] sm:text-5xl md:text-7xl lg:text-[5rem] font-black tracking-tighter mb-6 md:mb-8 text-white drop-shadow-2xl uppercase break-words w-full`}>
            O'quvchilarni <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Yo'qotishni</span> <br />
            To'xtating.
          </h1>

          <p className="text-gray-400 text-sm sm:text-base md:text-xl font-light leading-relaxed mb-8 md:mb-12 max-w-xl">
            Oddiy kanal yoki guruhlar yetarli emas. Markazingizning ishonchliligini oshiruvchi, kun-u tun mijozlar yig'uvchi <strong className="text-white font-medium">Premium Veb-sayt</strong> quramiz. Xohlang vizitka sayt, xohlang to'liq avtomatlashgan tizim.
          </p>

          <a href="#booking" className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 md:gap-4 px-6 py-4 md:px-10 md:py-5 bg-white text-black font-black text-sm md:text-xl rounded-xl md:rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            <span className={`relative z-10 uppercase tracking-wider ${montserrat.className}`}>Loyiha Muhokamasi</span>
            <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform w-5 h-5 md:w-6 md:h-6" />
          </a>
        </motion.div>

        {/* 3D SHISHA VA NEON BLOK (Mobil ekranga sig'dirish) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full xl:w-1/2 max-w-lg mx-auto relative perspective-[1200px] z-10 mt-8 xl:mt-0"
        >
          <div className="absolute -inset-2 md:-inset-4 bg-[#00ff7f] opacity-[0.15] md:opacity-20 blur-[40px] md:blur-[60px] rounded-[2rem] md:rounded-[3rem] animate-pulse" />

          <div className="relative bg-[#050505]/80 backdrop-blur-3xl border border-[#00ff7f]/40 rounded-[1.5rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-14 shadow-[inset_0_0_40px_rgba(0,255,127,0.1),0_20px_40px_rgba(0,0,0,0.8)] flex flex-col items-center text-center transform-gpu md:rotate-y-[-8deg] md:rotate-x-[5deg]">

            <div className="absolute inset-2 md:inset-4 border border-[#00ff7f]/30 rounded-[1rem] md:rounded-[2rem] pointer-events-none" />

            {/* <div className="w-24 h-24 md:w-40 md:h-40 relative mb-4 md:mb-8 flex items-center justify-center">
              <Image src="/image.png" alt="Moon" fill className="object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] md:drop-shadow-[0_0_40px_rgba(212,175,55,0.8)]" />
            </div> */}

            <h2 className={`${montserrat.className} text-xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FFF7D6] via-[#d4af37] to-[#8a6d00] tracking-widest uppercase mb-2 md:mb-4`} style={{ WebkitTextStroke: "1px rgba(212,175,55,0.2)" }}>
              Ramazon Aksiyasi
            </h2>

            <p className={`${montserrat.className} text-white text-base md:text-2xl font-bold tracking-[0.15em] md:tracking-[0.2em] mb-4 md:mb-6`}>PREMIUM LENDING</p>

            <div className="relative mb-1 md:mb-2">
              <span className={`${montserrat.className} text-gray-400 text-xl md:text-3xl font-black tracking-widest relative z-10`}>3 MLN SO'M</span>
              <div className="absolute top-1/2 left-[-10%] w-[120%] h-1 md:h-1.5 bg-red-600 -rotate-3 z-20 shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
            </div>

            <div className={`${montserrat.className} text-[2.5rem] sm:text-[3.5rem] md:text-[5.5rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFaa] via-[#FFD700] to-[#B8860B] leading-none tracking-tighter drop-shadow-[0_0_20px_rgba(255,215,0,0.4)] md:drop-shadow-[0_0_40px_rgba(255,215,0,0.6)] mb-6 md:mb-8`}>
              1.2 MLN <span className="text-xl sm:text-2xl md:text-[2.5rem]">SO'M</span>
            </div>

            <p className={`${montserrat.className} text-white text-xs md:text-xl font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase bg-black px-6 md:px-8 py-2 md:py-3 rounded-full border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
              Faqat 30 ta joy
            </p>
          </div>
        </motion.div>
      </section>

      {/* 4. XIZMATLAR KO'LAMI (Mobilda Grid ustma-ust tushadi) */}
      <section className="relative z-10 py-16 md:py-24 bg-[#000000] border-t border-white/[0.02]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="p-6 md:p-10 rounded-2xl md:rounded-3xl bg-[#050505] border border-white/5 hover:border-[#00ff7f]/30 transition-colors">
              <LayoutTemplate className="text-[#d4af37] mb-4 md:mb-6" size={32} />
              <h3 className={`${montserrat.className} text-lg md:text-2xl font-black mb-2 md:mb-4 uppercase`}>Premium Dizayn</h3>
              <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed">Sizning markazingizni raqobatchilardan vizual jihatdan bir necha pog'ona baland ko'rsatadigan jiddiy va zamonaviy qiyofa.</p>
            </div>
            <div className="p-6 md:p-10 rounded-2xl md:rounded-3xl bg-[#050505] border border-white/5 hover:border-[#00ff7f]/30 transition-colors">
              <Users className="text-[#00ff7f] mb-4 md:mb-6" size={32} />
              <h3 className={`${montserrat.className} text-lg md:text-2xl font-black mb-2 md:mb-4 uppercase`}>24/7 Ro'yxatga olish</h3>
              <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed">Tungi soat 3 da saytga kirgan o'quvchi ham osongina ro'yxatdan o'tadi. Barcha ma'lumotlar to'g'ridan-to'g'ri telegramingizga tushadi.</p>
            </div>
            <div className="p-6 md:p-10 rounded-2xl md:rounded-3xl bg-[#050505] border border-white/5 hover:border-[#00ff7f]/30 transition-colors">
              <Database className="text-[#d4af37] mb-4 md:mb-6" size={32} />
              <h3 className={`${montserrat.className} text-lg md:text-2xl font-black mb-2 md:mb-4 uppercase`}>CRM Integratsiya</h3>
              <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed">Xohishga ko'ra tizimni AmoCRM yoki boshqa bazalarga ulab beramiz. Katta markazlar uchun mukammal savdo ekotizimi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PORTFOLIO - Mobilda rasm ustiga chiqmaydi */}
      <section className="relative z-10 py-20 md:py-32 bg-[#000000] border-t border-[#111]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-8">
            <div>
              <h2 className={`${montserrat.className} text-3xl sm:text-4xl md:text-6xl font-black mb-4 md:mb-6 uppercase tracking-tight text-white leading-[1.1]`}>
                Bizning Ishlar.
              </h2>
              <p className="text-gray-500 text-sm sm:text-base md:text-xl font-light">Biz kichik brendlardan tortib, bozor gigantlarigacha xizmat ko'rsatamiz.</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row bg-[#050505] rounded-[1.5rem] md:rounded-[2rem] border border-[#222] overflow-hidden group hover:border-[#00ff7f]/30 transition-colors duration-700">
            <div className="w-full lg:w-1/2 p-6 sm:p-10 md:p-16 flex flex-col justify-center relative order-2 lg:order-1">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00ff7f]/5 to-transparent pointer-events-none" />

              <div className={`inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/5 border border-white/10 rounded-full text-gray-300 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] w-max mb-6 md:mb-8 ${montserrat.className}`}>
                🏆 Yirik Ta'lim Loyihasi
              </div>

              <h3 className={`${montserrat.className} text-3xl sm:text-5xl md:text-7xl font-black mb-4 md:mb-6 text-white tracking-tighter`}>HILAL EDU</h3>

              <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-6 md:mb-10">
                O'rta Osiyodagi eng yirik ta'lim muassasalaridan biri. Mijoz talabidan kelib chiqib, to'liq avtomatlashgan, yuqori yuklanishlarga bardosh beruvchi kuchli arxitektura qurib berildi.
              </p>

              <div className="grid grid-cols-2 gap-4 md:gap-8 border-t border-white/5 pt-6 md:pt-8">
                <div>
                  <ShieldCheck className="text-[#00ff7f] mb-2 md:mb-4 w-6 h-6 md:w-8 md:h-8" />
                  <p className={`text-[9px] md:text-sm text-gray-500 uppercase tracking-widest font-bold mb-1 ${montserrat.className}`}>Dizayn & Tizim</p>
                  <p className="text-sm md:text-2xl font-bold text-white">Premium Daraja</p>
                </div>
                <div>
                  <TrendingUp className="text-[#00ff7f] mb-2 md:mb-4 w-6 h-6 md:w-8 md:h-8" />
                  <p className={`text-[9px] md:text-sm text-gray-500 uppercase tracking-widest font-bold mb-1 ${montserrat.className}`}>Konversiya</p>
                  <p className="text-sm md:text-2xl font-bold text-white">Kafolatlangan</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative min-h-[250px] sm:min-h-[350px] md:min-h-full bg-[#0a0a0a] border-b lg:border-t-0 lg:border-l border-[#222] overflow-hidden p-0 md:p-8 flex items-center justify-center order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 opacity-50 md:hidden" />
              <Image src="/discounts/hilal-edu.png" alt="Hilal Edu Mockup" fill className="object-cover md:object-contain opacity-80 md:opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 md:grayscale group-hover:grayscale-0" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. JIDDIY FORMA - Telefon uchun klaviatura chiqishiga moslashgan */}
      <section id="booking" className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-[#020202] border-t border-[#111] overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-[#00ff7f]/5 blur-[100px] md:blur-[200px] rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">

          <div>
            <h2 className={`${montserrat.className} text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-6 md:mb-8 leading-[1.05] text-white uppercase break-words`}>
              Markazingiz <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff7f] to-[#00b359]">Tayyormi?</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-xl leading-relaxed mb-8 md:mb-12 max-w-lg">
              Aksiya doirasida atigi 30 ta loyiha olinadi. O'z joyingizni band qiling. Biz siz bilan bog'lanib, markazingizga qanday sayt (oddiy yoki CRM tizimli) mos kelishini aniqlaymiz.
            </p>

            <div className="p-4 md:p-6 border border-white/10 bg-white/5 rounded-2xl flex items-start gap-4 md:gap-6 backdrop-blur-sm max-w-md">
              <TrendingUp className="text-[#d4af37] shrink-0 w-6 h-6 md:w-8 md:h-8 mt-1" />
              <div>
                <p className={`${montserrat.className} text-white font-bold text-sm md:text-lg mb-1 md:mb-2 uppercase tracking-wide`}>Bepul Konsultatsiya</p>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Ma'lumot qoldirish sizni hech narsaga majbur qilmaydi. Mutaxassislarimiz loyihangizni bepul tahlil qilib berishadi.</p>
              </div>
            </div>
          </div>

          <div className="relative w-full">
            <div className="bg-[#050505] p-6 sm:p-10 md:p-16 rounded-[1.5rem] md:rounded-[2rem] border border-[#222] shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative z-10 w-full">
              <h3 className={`${montserrat.className} text-xl md:text-3xl font-black mb-6 md:mb-10 text-white tracking-tight uppercase`}>Loyiha Boshlash</h3>

              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
                <div className="relative">
                  <label className={`${montserrat.className} text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-2 md:mb-3 block`}>Rahbar ism-sharifi</label>
                  <input required type="text" placeholder="Ismingizni kiriting" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-[#333] pb-2 md:pb-3 text-base md:text-2xl text-white placeholder-gray-800 focus:outline-none focus:border-[#00ff7f] transition-colors rounded-none" />
                </div>
                <div className="relative">
                  <label className={`${montserrat.className} text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-2 md:mb-3 block`}>Aloqa Raqami</label>
                  <input required type="tel" placeholder="+998 90 123 45 67" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-[#333] pb-2 md:pb-3 text-base md:text-2xl text-white placeholder-gray-800 focus:outline-none focus:border-[#00ff7f] transition-colors rounded-none" />
                </div>
                <div className="relative">
                  <label className={`${montserrat.className} text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-2 md:mb-3 block`}>O'quv Markazi Nomi</label>
                  <input required type="text" placeholder="Markazingiz nomi" value={formData.centerName} onChange={(e) => setFormData({ ...formData, centerName: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-[#333] pb-2 md:pb-3 text-base md:text-2xl text-white placeholder-gray-800 focus:outline-none focus:border-[#00ff7f] transition-colors rounded-none" />
                </div>

                <button disabled={status === "loading"} type="submit"
                  className="w-full bg-white text-black font-black text-sm md:text-xl py-4 md:py-6 rounded-xl hover:bg-[#00ff7f] transition-colors duration-300 disabled:opacity-50 mt-2 md:mt-4 flex items-center justify-center gap-3 md:gap-4 uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 touch-manipulation"
                >
                  {status === "loading" ? "Yuborilmoqda..." : "Joyni Band Qilish"}
                  {!status && <ArrowRight size={20} className="md:w-6 md:h-6" />}
                </button>

                <AnimatePresence>
                  {status === "success" && (
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[#00ff7f] font-bold text-center mt-4 md:mt-6 text-[10px] md:text-sm bg-[#00ff7f]/10 py-3 md:py-4 rounded-xl border border-[#00ff7f]/20 uppercase tracking-widest">
                      Murojaat qabul qilindi.
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 font-bold text-center mt-4 md:mt-6 text-[10px] md:text-sm bg-red-500/10 py-3 md:py-4 rounded-xl border border-red-500/20 uppercase tracking-widest">
                      Tizimda xatolik yuz berdi.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 7. KORPORATIV FOOTER */}
      <footer className="px-4 md:px-6 py-8 md:py-12 bg-black border-t border-[#111] text-center flex flex-col items-center">
        <Image src="/logo.png" alt="Webleaders" width={100} height={25} className="md:w-[140px] md:h-[35px] opacity-40 mb-6 md:mb-8 grayscale" />
        <p className={`${montserrat.className} text-[#555] text-[8px] md:text-[10px] font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase`}>© {new Date().getFullYear()} WEBLEADERS. Raqamli Evolyutsiya.</p>
      </footer>
    </div>
  );
}