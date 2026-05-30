'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { X, ExternalLink, ArrowUpRight, Grid3X3, Zap, Layers } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const staticData: Record<string, { images: string[], techStack: string[] }> = {
  hilaledu: {
    techStack: ['Next.js', 'SEO', 'Shadcn UI'],
    images: ['/projects/hilal1.png', '/projects/hilal2.png', '/projects/hilal3.png', '/projects/hilal4.png']
  },
  toybron: {
    techStack: ['AI / ML', 'Big Data', 'Next.js 16'],
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

// --- 🌌 THREE.JS QUANTUM PARTICLE MORPHING ENGINE ---
function Projects3DEngine({ hoveredIndex }: { hoveredIndex: number | null }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const hoveredRef = useRef<number | null>(hoveredIndex)

  useEffect(() => {
    hoveredRef.current = hoveredIndex
  }, [hoveredIndex])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Matematik shakllar uchun zarralar soni
    const particleCount = 700
    const geometry = new THREE.BufferGeometry()

    // Turli xil geometrik koordinatalar massivlari
    const initialPositions = new Float32Array(particleCount * 3)
    const spherePositions = new Float32Array(particleCount * 3)
    const torusPositions = new Float32Array(particleCount * 3)
    const cubePositions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // 1. Tinch holat (Kosmik betartiblik)
      initialPositions[i3] = (Math.random() - 0.5) * 10
      initialPositions[i3 + 1] = (Math.random() - 0.5) * 6
      initialPositions[i3 + 2] = (Math.random() - 0.5) * 5

      // 2. Sfera Shakli (Web loyihalar uchun)
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = 2.0
      spherePositions[i3] = r * Math.sin(phi) * Math.cos(theta)
      spherePositions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      spherePositions[i3 + 2] = r * Math.cos(phi)

      // 3. Torus Donuts Shakli (AI va Murakkab tizimlar uchun)
      const torusU = Math.random() * Math.PI * 2
      const torusV = Math.random() * Math.PI * 2
      const R = 2.2, rad = 0.5
      torusPositions[i3] = (R + rad * Math.cos(torusV)) * Math.cos(torusU)
      torusPositions[i3 + 1] = (R + rad * Math.cos(torusV)) * Math.sin(torusU)
      torusPositions[i3 + 2] = rad * Math.sin(torusV)

      // 4. Giper-Kub Shakli (CRM va Ma'lumotlar bazasi uchun)
      cubePositions[i3] = (Math.random() - 0.5) * 3.2
      cubePositions[i3 + 1] = (Math.random() - 0.5) * 3.2
      cubePositions[i3 + 2] = (Math.random() - 0.5) * 3.2
    }

    // Dynamic o'zgaruvchan asosiy koordinatalar
    const dynamicPositions = new Float32Array(initialPositions)
    geometry.setAttribute('position', new THREE.BufferAttribute(dynamicPositions, 3))

    // Zarra materiali (Neon kiber yashil nuqtalar)
    const material = new THREE.PointsMaterial({
      color: 0x22c55e,
      size: 0.035,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const clock = new THREE.Clock()
    let animationId: number

    // --- ANIMATION LOOP (Dinamik Lerping) ---
    const animate = () => {
      const elapsed = clock.getElapsedTime()
      const currentHover = hoveredRef.current

      let targetArray = initialPositions
      if (currentHover !== null) {
        if (currentHover % 3 === 0) targetArray = spherePositions
        else if (currentHover % 3 === 1) targetArray = torusPositions
        else targetArray = cubePositions
      }

      // Zarralarni o'z o'rnidan target o'rniga silliq uchirish (Zarralar migratsiyasi)
      const positions = geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount * 3; i++) {
        positions[i] += (targetArray[i] - positions[i]) * 0.08 // Lerp silliqligi
      }
      geometry.attributes.position.needsUpdate = true

      // Sekin umumiy aylanish panoramasi
      points.rotation.y = elapsed * 0.04
      points.rotation.x = elapsed * 0.02

      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      if (container && renderer.domElement) container.removeChild(renderer.domElement)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />
}

export default function Projects() {
  const { t } = useLanguage()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  const activeProject = selectedId
    ? { ...t.projects.list.find(p => p.id === selectedId), ...staticData[selectedId] }
    : null

  return (
    <section id="projects" className="relative py-24 bg-black text-white overflow-hidden">

      {/* 🔮 THREE.JS LIVE MOUNTED MORPHING PARTICLES */}
      <Projects3DEngine hoveredIndex={hoveredIndex} />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <div className="flex items-center gap-2 text-green-400 mb-3">
              <Grid3X3 size={16} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">{t.projects.title}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              {t.projects.subtitle}
            </h2>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-md font-light leading-relaxed">
            {t.projects.desc}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.projects.list.map((project, index) => {
            const staticInfo = staticData[project.id] || { images: [], techStack: [] }
            const mainImage = staticInfo.images?.[0] || null

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
                onClick={() => setSelectedId(project.id)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onMouseMove={handleMouseMove}
                className="group relative cursor-pointer bg-white/[0.01] rounded-2xl border border-white/[0.08] overflow-hidden transition-all duration-500 hover:border-green-500/30 hover:-translate-y-1.5"
              >
                {/* Spotlight effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30 bg-[radial-gradient(400px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(34,197,94,0.06),transparent_80%)]" />

                <div className="relative w-full aspect-[16/10] overflow-hidden bg-white/[0.02]">
                  {mainImage ? (
                    <Image
                      src={mainImage}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[15%] group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-700 text-xs font-mono">NO_PREVIEW</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-80" />

                  <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-md border border-white/[0.08]">
                    <span className="text-[10px] font-semibold text-green-400 uppercase tracking-widest">
                      {project.category.split(' ')[0]}
                    </span>
                  </div>
                </div>

                <div className="p-6 relative z-10 bg-gradient-to-b from-[#0d0d0d]/0 to-[#0d0d0d]">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors duration-300 line-clamp-1">
                      {project.name}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-green-500 group-hover:text-black transition-all duration-300">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  <p className="text-gray-400 text-xs line-clamp-2 mb-5 leading-relaxed h-8 font-light">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 border-t border-white/[0.05] pt-4">
                    {staticInfo.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.03] text-gray-400 border border-white/[0.05] font-mono">
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

      {/* Cinematic Modal Split Panel */}
      {mounted && createPortal(
        <AnimatePresence>
          {activeProject && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-6 lg:p-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              />

              <div className="absolute top-6 right-6 z-[10000]">
                <button
                  onClick={() => setSelectedId(null)}
                  className="p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-green-500 hover:text-black hover:scale-110 transition-all duration-300 shadow-xl"
                >
                  <X size={20} />
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.98 }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                className="relative w-full max-w-6xl h-full md:h-[85vh] bg-[#0d0d0d] rounded-none md:rounded-2xl border-0 md:border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row overflow-hidden z-10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Left side showcase */}
                <div className="w-full md:w-3/5 bg-black overflow-y-auto relative h-1/2 md:h-full scrollbar-none">
                  <div className="flex flex-col gap-3 p-3 pb-12">
                    {activeProject.images?.map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 + 0.2 }}
                        className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.05] bg-[#141414]"
                      >
                        <Image
                          src={img}
                          alt={`${activeProject.name} layout ${i + 1}`}
                          fill
                          className="object-cover"
                          priority={i === 0}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right side terminal */}
                <div className="w-full md:w-2/3 lg:w-2/5 bg-[#0d0d0d] border-t md:border-t-0 md:border-l border-white/[0.08] flex flex-col h-1/2 md:h-full relative">
                  <div className="p-8 overflow-y-auto flex-1 scrollbar-none z-10">
                    {activeProject.isFeatured && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider mb-6">
                        <Zap size={10} className="fill-green-400" /> Premium Architecture
                      </div>
                    )}

                    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">
                      {activeProject.name}
                    </h3>
                    <div className="text-green-500 text-xs font-mono mb-8 pb-4 border-b border-white/[0.08] flex items-center gap-2">
                      <Layers size={12} /> {activeProject.category}
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">PROJECT OVERVIEW</h4>
                        <p className="text-gray-300 text-sm leading-relaxed font-light">{activeProject.desc}</p>
                      </div>

                      <div>
                        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">ENGINE ARCHITECTURE</h4>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.techStack?.map(tech => (
                            <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs text-gray-300 font-mono transition-colors hover:border-green-500/30 hover:bg-white/[0.04] cursor-default">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t border-white/[0.08] bg-black/40 backdrop-blur-md z-20">
                    <button className="group/btn w-full py-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-green-400 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,255,255,0.05)] hover:shadow-[0_4px_25px_rgba(34,197,94,0.3)]">
                      {t.projects.btnView}
                      <ExternalLink size={16} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
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