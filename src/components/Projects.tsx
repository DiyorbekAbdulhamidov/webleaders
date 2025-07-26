'use client'

import Image from 'next/image'

const projects = [
  {
    name: 'Zarnigor Wedding CRM',
    category: 'CRM Tizimi',
    image: '/projects/zarnigor.png',
  },
  {
    name: 'Beauty Studio Web',
    category: 'Portfolio Sayt',
    image: '/projects/beauty.png',
  },
  {
    name: 'Fitness App',
    category: 'Mobil Web App',
    image: '/projects/fitness.png',
  },
]

export default function Projects() {
  return (
    <section id="portfolio" className="bg-black text-white py-24 px-6">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Loyihalarimiz</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light">
          Webleaders jamoasi tomonidan ishlab chiqilgan turli soha va yo‘nalishlardagi loyihalar.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-green-400 transition-all duration-300 hover:shadow-xl backdrop-blur-md"
          >
            <Image
              src={project.image}
              alt={project.name}
              width={600}
              height={400}
              className="w-full h-52 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="p-6">
              <h3 className="text-xl font-serif text-white mb-1">{project.name}</h3>
              <p className="text-sm italic text-gray-400 mb-4">{project.category}</p>
              <button className="bg-green-400 text-black font-semibold px-4 py-2 rounded-full text-sm hover:bg-green-500 transition-colors">
                Batafsil
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
