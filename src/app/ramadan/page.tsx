"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Zap, Target, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", business: "" });
  const [status, setStatus] = useState("idle");

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
        setFormData({ name: "", phone: "", business: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  // Animatsiya variantlari
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-green-500 selection:text-black overflow-x-hidden">

      {/* 1-EKRAN: HERO SECTION - Premium Hook */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-10">

        {/* Murakkab Orqa Fon & Ramazon Atmosferasi */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-green-600/10 blur-[150px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-yellow-600/5 blur-[150px]" />
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-8 left-8 md:top-12 md:left-12 z-20"
        >
          <Image src="/logo.png" alt="Webleaders" width={160} height={45} className="object-contain" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="z-10 text-center max-w-5xl mx-auto mt-10"
        >
          {/* Ramazon Badge */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full border border-green-500/30 bg-green-500/5 backdrop-blur-xl">
            <span className="text-xl">🌙</span>
            <span className="text-green-400 font-medium tracking-wide uppercase text-xs md:text-sm">Ramazon Hayiti Munosabati Bilan</span>
          </motion.div>

          {/* Asosiy Sarlavha - Hook */}
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight leading-[1.1]">
            Raqobatchilardan <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-300 via-green-500 to-green-700">10 Qadam </span>
            Oldinda Bo'ling
          </motion.h1>

          <motion.p variants={fadeUp} className="text-gray-400 text-lg md:text-2xl mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Biznesingiz uchun oddiy sayt emas, 24/7 ishlaydigan <strong className="text-white font-semibold">"Sotuvchi Mashina"</strong> yarating. Yuqori tezlik, mukammal dizayn va kafolatlangan natija.
          </motion.p>

          {/* Narx va Aksiya Bloki - Premium Glassmorphism */}
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">

            <div className="relative group overflow-hidden rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl p-8 w-full md:w-auto shadow-2xl transition-all hover:bg-white/[0.05] hover:border-green-500/30">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-gray-500 line-through text-2xl mb-2 font-medium">3,000,000 so'm</p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl font-black text-white tracking-tighter">1.2</span>
                <span className="text-2xl text-green-400 font-bold">mln so'm</span>
              </div>
              <p className="text-green-500/80 text-sm mt-3 font-medium">To'liq Premium Landing Page</p>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-900/40 to-black border border-red-500/30 backdrop-blur-2xl p-8 w-full md:w-auto shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-[shimmer_2s_infinite]"></div>
              <div className="flex items-center justify-center gap-3 mb-3">
                <Zap className="text-red-400" size={24} />
                <p className="text-red-400 font-bold uppercase tracking-widest text-sm">Shoshiling</p>
              </div>
              <p className="text-5xl font-black text-white">30 ta joy</p>
              <p className="text-gray-400 text-sm mt-3 font-medium">Aksiya tugashiga oz qoldi</p>
            </div>

          </motion.div>

          <motion.a
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#order-form"
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 text-xl font-bold text-black bg-white rounded-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Hoziroq Band Qilish</span>
            <ArrowRight className="relative z-10 group-hover:text-white transition-colors duration-300" />
          </motion.a>
        </motion.div>
      </section>

      {/* 2-EKRAN: HILAL EDU - Flagman Loyiha (Aloqida Ajratilgan) */}
      <section className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[2.5rem] bg-[#050505] border border-white/[0.08] overflow-hidden"
          >
            {/* Ichki yorug'lik effekti */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-center">
              <div className="p-10 lg:p-16 lg:w-1/2 z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-bold mb-6 uppercase tracking-wider">
                  🏆 Asosiy Portfolio
                </div>
                <h2 className="text-4xl lg:text-6xl font-black mb-6">Hilal Edu</h2>
                <p className="text-gray-400 text-xl leading-relaxed mb-8">
                  O'rta Osiyodagi eng yirik o'quv markazlaridan biri uchun to'liq avtomatlashtirilgan platforma yaratdik. AmoCRM integratsiyasi va conversion-focused dizayn orqali mijozlar oqimi tizimlashtirildi.
                </p>
                <ul className="space-y-4 mb-10">
                  {["Mukammal UI/UX dizayn", "CRM tizimiga to'liq integratsiya", "0.5 soniyada yuklanish tezligi"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="text-green-500" size={20} />
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image qismi */}
              <div className="lg:w-1/2 h-[400px] lg:h-[600px] w-full relative p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] to-transparent z-10 lg:block hidden"></div>
                <div className="w-full h-full bg-[#111] rounded-2xl border border-white/10 relative overflow-hidden group">
                  {/* HILAL EDU RASMI SHU YERGA QOYILADI */}
                  <Image src="/hiloledu-mockup.png" alt="Hilal Edu Project" fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3-EKRAN: Boshqa Loyihalar (Grid) */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Bizga ishonishgan</h2>
              <p className="text-gray-400 text-xl">Sizning biznesingiz ham navbatdagi muvaffaqiyat hikoyasi bo'lishi mumkin.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Adizone', 'Lutsente', 'Kochirish'].map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-3xl bg-[#080808] border border-white/5 p-4 hover:border-green-500/30 transition-colors"
              >
                <div className="w-full h-64 bg-[#111] rounded-2xl mb-6 overflow-hidden relative">
                  {/* Loyiha rasmi */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                  <div className="absolute inset-0 bg-gray-800 group-hover:scale-110 transition-transform duration-700 ease-in-out"></div>

                  <div className="absolute bottom-4 left-4 z-20">
                    <h4 className="text-2xl font-bold text-white mb-1">{project}</h4>
                    <p className="text-green-400 font-medium">Biznes Landing Page</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-EKRAN: Qat'iy Ishonch (Raqamlar) */}
      <section className="py-24 px-4 bg-[#050505] border-y border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { icon: Target, num: "3+", text: "Yillik Tajriba" },
            { icon: Zap, num: "50+", text: "Muvaffaqiyatli Loyiha" },
            { icon: CheckCircle, num: "100%", text: "Mobile Moslashuv" },
            { icon: Clock, num: "24/7", text: "Texnik Yordam" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <stat.icon className="text-green-500 mb-6" size={40} />
              <p className="text-5xl font-black text-white mb-3">{stat.num}</p>
              <p className="text-gray-400 font-medium text-lg">{stat.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5-EKRAN: BUYURTMA FORMASI - Katta CTA */}
      <section id="order-form" className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] to-[#020202]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-900/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-16">

          <div className="md:w-1/2 text-left">
            <h2 className="text-5xl font-black mb-6 leading-tight">Vaqt Ketyapti.<br />Joylar <span className="text-red-500">Kamaymoqda.</span></h2>
            <p className="text-gray-400 text-xl mb-8">
              Raqobatchilaringiz allaqachon onlayn bozorni egallashmoqda. 1.2 mln so'mlik aksiya narxida premium saytga ega bo'lish imkoniyatini qo'ldan boy bermang.
            </p>
            <div className="flex items-center gap-4 text-white">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-[#020202] bg-gray-800"></div>
                ))}
              </div>
              <div>
                <p className="font-bold">15+ tadbirkorlar</p>
                <p className="text-sm text-gray-400">bugun joy band qilishdi</p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 w-full">
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-[2rem] p-8 md:p-10 backdrop-blur-2xl shadow-2xl relative">
              <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>

              <h3 className="text-2xl font-bold mb-8 text-white">Joyni hoziroq band qiling</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input required type="text" placeholder="Ismingizni kiriting"
                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-lg"
                    value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <input required type="tel" placeholder="Telefon raqam (+998...)"
                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-lg"
                    value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <input required type="text" placeholder="Biznes yo'nalishingiz"
                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-lg"
                    value={formData.business} onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                  />
                </div>

                <button disabled={status === "loading"} type="submit"
                  className="group relative w-full flex items-center justify-center gap-2 bg-white text-black font-extrabold text-xl py-5 rounded-2xl transition-all disabled:opacity-50 overflow-hidden mt-4"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    {status === "loading" ? "Yuborilmoqda..." : "Buyurtma Berish"}
                  </span>
                </button>

                {status === "success" && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-center font-medium mt-4">✅ Ajoyib! Mutaxassislarimiz tez orada bog'lanishadi.</motion.p>}
                {status === "error" && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-center font-medium mt-4">❌ Xatolik yuz berdi. Qaytadan urinib ko'ring.</motion.p>}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 text-center text-gray-600 bg-[#020202]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <Image src="/logo.png" alt="Webleaders" width={120} height={30} className="opacity-50 mb-4 md:mb-0" />
          <p>© 2026 Webleaders. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>

      {/* Tailwind xususiy animatsiyasi uchun qo'shimcha CSS (global.css ga qo'shish tavsiya etiladi) */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}