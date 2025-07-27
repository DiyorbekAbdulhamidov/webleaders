'use client'

import { services } from '@/data/services'

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-black text-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-green-400">
          Xizmatlarimiz
        </h2>

        <div className="space-y-16">
          {services.map((service, index) => {
            const Icon = service.icon
            const isEven = index % 2 === 0

            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-6 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                <div className="flex-shrink-0">
                  <Icon className="w-12 h-12 text-green-400" />
                </div>

                <div className="md:w-3/4 text-center md:text-left">
                  <h3 className="text-2xl font-semibold mb-2 text-white">{service.title}</h3>
                  <p className="text-gray-400 text-base">{service.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
