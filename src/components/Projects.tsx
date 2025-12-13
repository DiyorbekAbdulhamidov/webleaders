'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Zap, Star, BrainCircuit } from 'lucide-react'

// Loyiha Tipi
type Project = {
  id: string
  name: string
  category: string
  description: string
  techStack: string[]
  images: string[]
  isFeatured?: boolean
}

// MA'LUMOTLAR (ToyBron yangilandi)
const projects: Project[] = [
  {
    id: 'toybron',
    name: 'ToyBron AI Ecosystem', // Nomini o'zgartirdik
    category: 'AI Marketplace & Super-CRM', // Toifasi ham jiddiy
    description: 'O‘zbekistonda analogi yo‘q yagona Ekotizim. Bu shunchaki CRM emas — bu sizning biznesingizni boshqaradigan va ayni vaqtda toyxonanigzni minglab xaridorlarga "Marketplace" orqali o‘zi sotadigan Sun’iy Intellekt. Sklad nazorati, kassa va onlayn savdo endi bitta "Miya"da jamlandi.',
    techStack: ['Artificial Intelligence', 'Big Data', 'Next.js 14', 'Cloud Native'],
    images: ['/projects/toybron1.png', '/projects/toybron2.png', '/projects/toybron3.png', '/projects/toybron4.png'],
    isFeatured: true,
  },
  {
    id: 'gogermany',
    name: 'GoGermany Consulting',
    category: 'Consulting Agency Website',
    description: 'Germaniyada o‘qish va ishlashni istaganlar uchun premium dizaynga ega ishonchli platforma.',
    techStack: ['React', 'Tailwind CSS', 'Framer Motion'],
    images: ['/projects/ger(1).png', '/projects/ger(2).png', '/projects/ger(3).png', '/projects/ger(4).png'],
  },
  {
    id: 'zarnigor',
    name: 'Zarnigor Wedding',
    category: 'CRM & Booking System',
    description: 'To‘y liboslari ijarasi va mijozlar bazasini boshqarish uchun maxsus yechim.',
    techStack: ['Vue.js', 'Laravel', 'MySQL'],
    images: ['/projects/zarnigor1.png', '/projects/zarnigor2.png', '/projects/zarnigor3.png', '/projects/zarnigor4.png'],
  },
  {
    id: 'jetour',
    name: 'Jetour Uzbekistan',
    category: 'Avtosalon Promo Sayt',
    description: 'Jetour avtomobillarining kuchi va dizaynini ochib beruvchi zamonaviy landing page.',
    techStack: ['Next.js', 'Three.js', 'GSAP'],
    images: ['/projects/jetour1.png', '/projects/jetour2.png', '/projects/jetour3.png', '/projects/jetour4.png'],
  },
  {
    id: 'dono',
    name: 'Dono-Dance',
    category: 'Raqs Maktabi Platformasi',
    description: 'Raqs san’atini targ‘ib qiluvchi, yorqin va energiyaga boy web-sayt.',
    techStack: ['WordPress', 'Custom CSS', 'PHP'],
    images: ['/projects/dance1.png', '/projects/dance2.png', '/projects/dance3.png', '/projects/dance4.png'],
  },
  {
    id: 'telmee',
    name: 'Telmee Market',
    category: 'E-Commerce Platforma',
    description: 'Telefon oldi-sotdisi uchun qulay va xavfsiz maydon.',
    techStack: ['MERN Stack', 'Socket.io'],
    images: ['/projects/telmee2.png', '/projects/telmee1.png', '/projects/telmee1.png', '/projects/telmee4.png'],
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="portfolio" className="relative py-24 bg-black text-white overflow-hidden">
      {/* Background Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500"
          >
            Bizning <span className="text-green-500">Masterpieces</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Har bir loyiha — bu alohida san’at asari. Biz shunchaki sayt yasamaymiz,
            biz bizneslar uchun raqamli kelajak quramiz.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
              className={`group relative cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm ${project.isFeatured ? 'md:col-span-2 md:row-span-2' : ''
                }`}
            >
              {/* Image Container */}
              <div className="relative w-full h-full overflow-hidden aspect-[4/3]">
                <Image
                  src={project.images[0]}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {project.isFeatured && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 text-black text-xs font-bold uppercase tracking-wider mb-3 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                    <BrainCircuit size={14} className="text-black" /> Powered by AI
                  </span>
                )}

                <h3 className={`font-bold text-white mb-2 ${project.isFeatured ? 'text-3xl md:text-4xl' : 'text-xl'}`}>
                  {project.name}
                </h3>

                <p className="text-gray-300 text-sm line-clamp-2 mb-4 group-hover:text-white transition-colors">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 rounded-md bg-white/10 text-white/80 border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Border Glow */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-500/50 rounded-2xl transition-colors duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL (Lightbox) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-red-500/80 transition-colors"
              >
                <X size={24} />
              </button>

              {/* Left Side: Scrollable Images */}
              <div className="w-full md:w-2/3 bg-black overflow-y-auto scrollbar-hide h-[40vh] md:h-auto">
                <div className="grid grid-cols-1 gap-1">
                  {selectedProject.images.map((img, i) => (
                    <div key={i} className="relative aspect-video">
                      <Image
                        src={img}
                        alt="Project screenshot"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Info */}
              <div className="w-full md:w-1/3 p-8 flex flex-col overflow-y-auto bg-[#0F0F0F]">
                <div>
                  {selectedProject.isFeatured && (
                    <span className="text-green-400 text-xs font-bold tracking-widest uppercase mb-2 block flex items-center gap-2">
                      <Zap size={14} /> AI Ecosystem
                    </span>
                  )}
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.name}</h3>
                  <p className="text-gray-400 text-sm mb-6">{selectedProject.category}</p>

                  <div className="h-px w-full bg-white/10 mb-6" />

                  <h4 className="text-sm font-semibold text-white mb-2 uppercase tracking-wider">Loyiha haqida:</h4>
                  <p className="text-gray-300 leading-relaxed text-sm mb-8">
                    {selectedProject.description}
                  </p>

                  <h4 className="text-sm font-semibold text-white mb-2 uppercase tracking-wider">Texnologiyalar:</h4>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <button className="w-full py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-green-400 transition-colors">
                    <ExternalLink size={18} />
                    Saytga o‘tish
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}