'use client'

import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion' // 1. Variants qo'shildi
import { HelpCircle, Lightbulb, Brush, Hammer, Rocket, LifeBuoy } from 'lucide-react'

export default function HowWeWork() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const steps = [
    {
      id: '01',
      icon: <HelpCircle className="w-8 h-8" />,
      title: 'Muammoni anglaymiz',
      desc: 'Biznesingizdagi og‘riqli nuqtalarni topish uchun chuqur tahlil va suhbat o‘tkazamiz.',
    },
    {
      id: '02',
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Strategik Yechim',
      desc: 'Raqobatchilarni o‘rganib, bozorda sizni ajratib turadigan individual strategiya tuzamiz.',
    },
    {
      id: '03',
      icon: <Brush className="w-8 h-8" />,
      title: 'Premium UI/UX',
      desc: 'Mijozni saytda ushlab qoladigan va sotuvga undaydigan zamonaviy dizayn chizamiz.',
    },
    {
      id: '04',
      icon: <Hammer className="w-8 h-8" />,
      title: 'Toza Kod (Development)',
      desc: 'Next.js va eng so‘nggi texnologiyalarda tez ishlaydigan xavfsiz tizim yaratamiz.',
    },
    {
      id: '05',
      icon: <Rocket className="w-8 h-8" />,
      title: 'Lauch & Test',
      desc: 'Loyihani mukammal holatda ishga tushiramiz va Google qidiruv tizimiga ulaymiz.',
    },
    {
      id: '06',
      icon: <LifeBuoy className="w-8 h-8" />,
      title: 'Doimiy Support',
      desc: 'Loyiha topshirilgandan keyin ham sizni yolg‘izlatib qo‘ymaymiz. 24/7 yordam.',
    },
  ]

  // 2. Variants tipi bu yerga qo'shildi
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  // 3. Variants tipi bu yerga ham qo'shildi
  const cardVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring", // Endi TypeScript bu to'g'ri ekanligini biladi
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <section ref={ref} className="relative bg-black text-white py-32 px-6 overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-green-400 font-medium tracking-widest uppercase text-sm"
          >
            Ish Jarayoni
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-3 text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
          >
            G‘oyadan Natijagacha <br /> 6 Qadam
          </motion.h2>
        </div>

        {/* Grid Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 overflow-hidden hover:border-green-500/50 transition-colors duration-300"
            >
              {/* Big Background Number */}
              <span className="absolute -right-4 -top-6 text-9xl font-black text-white/[0.03] group-hover:text-green-500/[0.05] transition-colors select-none">
                {step.id}
              </span>

              {/* Icon */}
              <div className="relative z-10 w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:text-black text-green-400 transition-all duration-300">
                {step.icon}
              </div>

              {/* Text */}
              <h3 className="relative z-10 text-xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors">
                {step.title}
              </h3>
              <p className="relative z-10 text-gray-400 text-sm leading-relaxed group-hover:text-gray-300">
                {step.desc}
              </p>

              {/* Hover Line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-green-500 transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}