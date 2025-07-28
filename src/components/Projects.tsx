'use client'

import Image from 'next/image'
import { useState } from 'react'

type Project = {
  name: string
  category: string
  images: string[]
}

const projects: Project[] = [
  {
    name: 'Telmee',
    category: 'Telefon sotish va sotib olish platformasi',
    images: ['/projects/telmee2.png', '/projects/telmee1.png', '/projects/telmee1.png', '/projects/telmee4.png'],
  },
  {
    name: 'Zarnigor Wedding CRM',
    category: 'Zarnigor Wedding saloni ichki tizimini boshqarish uchun',
    images: ['/projects/zarnigor1.png', '/projects/zarnigor2.png', '/projects/zarnigor3.png', '/projects/zarnigor4.png'],
  },
  {
    name: 'Jetour Uzbekistan',
    category: 'Jetour avtomobil saloni uchun',
    images: ['/projects/jetour1.png', '/projects/jetour2.png', '/projects/jetour3.png', '/projects/jetour4.png',],
  },
  {
    name: 'РУСВЕРИФ',
    category: 'Любые виды верификаций!',
    images: ['/projects/rus1.png', '/projects/rus2.png', '/projects/rus3.png', '/projects/rus4.png'],
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const openModal = (project: Project) => setSelectedProject(project)
  const closeModal = () => setSelectedProject(null)

  return (
    <section id="portfolio" className="bg-black text-white py-24 px-6 relative">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Loyihalarimiz</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light">
          Webleaders jamoasi tomonidan ishlab chiqilgan turli soha va yo‘nalishlardagi loyihalar.
        </p>
      </div>

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-transparent">
        <div className="flex space-x-6 px-2 pb-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="min-w-[300px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-green-400 transition-all duration-300 hover:shadow-xl backdrop-blur-md"
            >
              <Image
                src={project.images[0]}
                alt={project.name}
                width={600}
                height={400}
                className="w-full h-52 object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                onClick={() => openModal(project)}
              />
              <div className="p-6">
                <h3 className="text-xl font-serif text-white mb-1">{project.name}</h3>
                <p className="text-sm italic text-gray-400 mb-4">{project.category}</p>
                <button
                  onClick={() => openModal(project)}
                  className="bg-green-400 text-black font-semibold px-4 py-2 rounded-full text-sm hover:bg-green-500 transition-colors"
                >
                  Batafsil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-red-500 text-3xl font-bold hover:text-red-400 z-10"
              aria-label="Yopish"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold text-white mb-4">{selectedProject.name}</h3>
            <p className="text-gray-300 mb-6">{selectedProject.category}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {selectedProject.images.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`${selectedProject.name} image ${i + 1}`}
                  width={600}
                  height={400}
                  className="rounded-lg w-full object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
