'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, ArrowUpRight, Grid3X3, Zap } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const staticData: Record<string, { images: string[], techStack: string[] }> = {
  toybron: {
    techStack: ['AI / ML', 'Big Data', 'Next.js 14'],
    images: ['/projects/toybron1.png', '/projects/toybron2.png', '/projects/toybron3.png', '/projects/toybron4.png']
  },
  lutsente: {
    techStack: ['Next.js', 'Framer Motion', 'Tailwind'],
    images: ['/projects/lutsente1.png', '/projects/lutsente2.png', '/projects/lutsente3.png', '/projects/lutsente4.png']
  },
  adizone: {
    techStack: ['React', 'CRM', 'Telegram Bot'],
    images: ['/projects/adizone1.png', '/projects/adizone2.png', '/projects/adizone3.png', '/projects/adizone4.png']
  },
  kochirish: {
    techStack: ['Landing Page', 'SEO', 'Mobile First'],
    images: ['/projects/move1.png', '/projects/move2.png', '/projects/move3.png', '/projects/move4.png']
  },
  gogermany: {
    techStack: ['React', 'Tailwind', 'UX/UI'],
    images: ['/projects/ger(1).png', '/projects/ger(2).png', '/projects/ger(3).png', '/projects/ger(4).png']
  },
  zarnigor: {
    techStack: ['Vue.js', 'Laravel', 'MySQL'],
    images: ['/projects/zarnigor1.png', '/projects/zarnigor2.png', '/projects/zarnigor3.png', '/projects/zarnigor4.png']
  },
  jetour: {
    techStack: ['Next.js', 'Three.js', 'GSAP'],
    images: ['/projects/jetour1.png', '/projects/jetour2.png', '/projects/jetour3.png', '/projects/jetour4.png']
  },
  dono: {
    techStack: ['WordPress', 'PHP', 'Custom Theme'],
    images: ['/projects/dance1.png', '/projects/dance2.png', '/projects/dance3.png', '/projects/dance4.png']
  },
  telmee: {
    techStack: ['MERN Stack', 'Socket.io', 'Real-time'],
    images: ['/projects/telmee1.png', '/projects/telmee2.png', '/projects/telmee3.png', '/projects/telmee4.png']
  }
}

export default function Projects() {
  const { t } = useLanguage()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedId])

  const activeProject = selectedId
    ? { ...t.projects.list.find(p => p.id === selectedId), ...staticData[selectedId] }
    : null

  return (
    <section id="portfolio" className="relative py-20 bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-green-500 mb-2">
              <Grid3X3 size={18} />
              <span className="text-sm font-bold uppercase tracking-widest">{t.projects.title}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              {t.projects.subtitle}
            </h2>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-md text-right md:text-left hidden md:block">
            {t.projects.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.projects.list.map((project, index) => {
            const staticInfo = staticData[project.id] || { images: [], techStack: [] }
            const mainImage = staticInfo.images?.[0] || null

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedId(project.id)}
                className="group cursor-pointer bg-[#111] rounded-xl border border-white/10 overflow-hidden hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative w-full aspect-video overflow-hidden bg-gray-900">
                  {mainImage ? (
                    <Image
                      src={mainImage}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-700 text-xs">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/10">
                    <span className="text-[10px] font-medium text-white uppercase tracking-wider">
                      {project.category.split(' ')[0]}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors line-clamp-1">
                      {project.name}
                    </h3>
                    <ArrowUpRight size={18} className="text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-gray-400 text-xs line-clamp-2 mb-4 leading-relaxed h-8">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-3">
                    {staticInfo.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {activeProject && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />

              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                className="relative w-full max-w-5xl h-[85vh] bg-[#111] rounded-2xl border border-white/10 shadow-2xl flex flex-col md:flex-row overflow-hidden z-10"
                onClick={(e) => e.stopPropagation()}
              >

                <div className="absolute top-4 right-4 z-50">
                  <button
                    onClick={() => setSelectedId(null)}
                    className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="w-full md:w-2/3 bg-black overflow-y-auto custom-scrollbar relative">
                  <div className="flex flex-col gap-1 pb-10">
                    {activeProject.images?.map((img, i) => (
                      <div key={i} className="relative w-full aspect-video">
                        <Image
                          src={img}
                          alt="Detail"
                          fill
                          className="object-cover"
                          priority={i === 0}
                        />
                      </div>
                    ))}
                    {(!activeProject.images || activeProject.images.length === 0) && (
                      <div className="h-full flex items-center justify-center text-gray-600">No Images Available</div>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-1/3 bg-[#111] border-l border-white/5 flex flex-col h-full">
                  <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">

                    {activeProject.isFeatured && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-6">
                        <Zap size={12} /> AI Ecosystem
                      </div>
                    )}

                    <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
                      {activeProject.name}
                    </h2>
                    <span className="text-gray-400 text-sm font-medium mb-8 block pb-6 border-b border-white/10">
                      {activeProject.category}
                    </span>

                    <div className="space-y-8">
                      <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                          {t.projects.aboutTitle}
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {activeProject.desc}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                          {t.projects.techTitle}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.techStack?.map(tech => (
                            <span key={tech} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-white/10 transition-colors cursor-default">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t border-white/5 bg-[#111]">
                    <button className="w-full py-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-green-400 transition-all flex items-center justify-center gap-2 shadow-lg">
                      {t.projects.btnView}
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}