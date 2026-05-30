'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, Variants } from 'framer-motion'
import * as THREE from 'three'
import {
  MonitorSmartphone,
  Smartphone,
  LayoutDashboard,
  SearchCheck,
  ShoppingCart,
  LifeBuoy,
  ArrowUpRight
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const icons = [
  MonitorSmartphone,
  Smartphone,
  LayoutDashboard,
  SearchCheck,
  ShoppingCart,
  LifeBuoy
]

// --- 🌌 THREE.JS SPATIAL INTERACTIVE NAVIGATION BACKGROUND ---
interface CanvasProps {
  hoveredIndex: number | null
}

function Services3DCanvas({ hoveredIndex }: CanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const stateRef = useRef({ hoveredIndex, targetX: 0, targetY: 0, targetZ: 5, morphProgress: 0 })

  // State yangilanganda refni yangilaymiz (Three.js render loop ichida eng oxirgi qiymatni olish uchun)
  useEffect(() => {
    stateRef.current.hoveredIndex = hoveredIndex

    // Har bir karta uchun kamera va obyektlarning alohida koordinatalarini belgilaymiz
    switch (hoveredIndex) {
      case 0: // Web Dev -> Chapga yuqoriga siljish, chuqurlik
        stateRef.current.targetX = -2.5
        stateRef.current.targetY = 1.2
        stateRef.current.targetZ = 4.2
        break
      case 1: // Mobile Apps -> O'ngga pastga keskin burilish
        stateRef.current.targetX = 2.5
        stateRef.current.targetY = -1.5
        stateRef.current.targetZ = 3.8
        break
      case 2: // Dashboards -> Markazga yaqinlashish, struktura
        stateRef.current.targetX = 0
        stateRef.current.targetY = 2.0
        stateRef.current.targetZ = 4.0
        break
      case 3: // SEO/Audit -> Orqaga chekinish va burchak o'zgarishi
        stateRef.current.targetX = -2.0
        stateRef.current.targetY = -2.0
        stateRef.current.targetZ = 5.5
        break
      case 4: // E-Commerce -> O'ngga yuqoriga, tez aylanish
        stateRef.current.targetX = 2.2
        stateRef.current.targetY = 1.8
        stateRef.current.targetZ = 4.5
        break
      case 5: // Support -> To'liq yaqinlashish
        stateRef.current.targetX = 0
        stateRef.current.targetY = -1.8
        stateRef.current.targetZ = 3.5
        break
      default: // Default holat -> Tinch va uzoqroq panoramik ko'rinish
        stateRef.current.targetX = 0
        stateRef.current.targetY = 0
        stateRef.current.targetZ = 6.0
    }
  }, [hoveredIndex])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 6)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // --- 💎 LOW-POLY DIGITAL ARTIFACTS (3D Obyektlar guruhlari) ---
    const group = new THREE.Group()
    scene.add(group)

    // 1. Markaziy kiber-kristall (Icosahedron)
    const icoGeo = new THREE.IcosahedronGeometry(1.6, 1)
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    })
    const mainMesh = new THREE.Mesh(icoGeo, wireMat)
    group.add(mainMesh)

    // 2. Tashqi kiber-halqa (Torus)
    const torusGeo = new THREE.TorusGeometry(2.5, 0.02, 8, 40)
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x16a34a,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    })
    const ringMesh = new THREE.Mesh(torusGeo, torusMat)
    ringMesh.rotation.x = Math.PI / 2
    group.add(ringMesh)

    // 3. Tarqoq kiber-tugunlar (Data Nodes)
    const nodeCount = 200
    const nodePositions = new Float32Array(nodeCount * 3)
    for (let i = 0; i < nodeCount * 3; i++) {
      nodePositions[i] = (Math.random() - 0.5) * 12
    }
    const nodeGeo = new THREE.BufferGeometry()
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3))
    const nodeMat = new THREE.PointsMaterial({
      color: 0x4ade80,
      size: 0.04,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    })
    const dataNodes = new THREE.Points(nodeGeo, nodeMat)
    scene.add(dataNodes)

    // Sichqoncha harakati inteksiyasi
    let mouseX = 0, mouseY = 0
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5
      mouseY = (e.clientY / window.innerHeight) - 0.5
    }
    window.addEventListener('mousemove', handleMouseMove)

    const clock = new THREE.Clock()
    let animationFrameId: number

    // --- RENDER ANIMATION LOOP ---
    const animate = () => {
      const elapsed = clock.getElapsedTime()
      const state = stateRef.current

      // Hover holatiga qarab aylanish tezligini oshirish yoki sekinlashtirish
      const speedMultiplier = state.hoveredIndex !== null ? 2.5 : 1.0

      group.rotation.y = elapsed * 0.06 * speedMultiplier
      group.rotation.x = elapsed * 0.03 * speedMultiplier
      dataNodes.rotation.y = -elapsed * 0.02

      // Obyekt formasini impulsli (pulsatsiya) o'zgartirish
      const scalePulse = 1 + Math.sin(elapsed * 2) * 0.05
      mainMesh.scale.set(scalePulse, scalePulse, scalePulse)

      // Karta almashganda mesh rangini dinamik o'zgartirish (Oq / Yashil orasida)
      if (state.hoveredIndex !== null) {
        wireMat.color.setHex(0xffffff)
        wireMat.opacity = THREE.MathUtils.lerp(wireMat.opacity, 0.35, 0.1)
      } else {
        wireMat.color.setHex(0x22c55e)
        wireMat.opacity = THREE.MathUtils.lerp(wireMat.opacity, 0.15, 0.1)
      }

      // 🏎 LERP INTERPOLATION (Kamerani yumshoq koordinataga uchirish)
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, state.targetX + (mouseX * 0.8), 0.05)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, state.targetY - (mouseY * 0.8), 0.05)
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, state.targetZ, 0.05)

      // Kamera har doim markazga qarab turadi
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
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
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      icoGeo.dispose()
      torusGeo.dispose()
      nodeGeo.dispose()
      wireMat.dispose()
      torusMat.dispose()
      nodeMat.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />
}

export default function ServicesSection() {
  const { t } = useLanguage()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  return (
    <section id="services" className="relative py-24 bg-black text-white overflow-hidden">

      {/* 🌀 THE HIGH-END INTERACTIVE 3D ENGINE */}
      <Services3DCanvas hoveredIndex={hoveredIndex} />

      {/* Cyber overlay elements */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none z-[1]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-tr from-green-500/5 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-semibold uppercase tracking-wider mb-4 inline-block backdrop-blur-md"
          >
            {t.services.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6 tracking-tight"
          >
            {t.services.title} <br className="hidden md:block" />
            <span className="text-green-500">{t.services.subtitle}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg font-light"
          >
            {t.services.desc}
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {t.services.list.map((service, index) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative bg-white/[0.01] hover:bg-white/[0.04] backdrop-blur-md border border-white/[0.06] hover:border-green-500/40 rounded-3xl p-8 transition-all duration-500 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Micro Glow Effect inside the card */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-transparent to-transparent group-hover:from-green-500/[0.08] transition-all duration-700 pointer-events-none" />

                {/* Header: Icon & Arrow */}
                <div className="flex justify-between items-start mb-8 relative z-10" style={{ transform: 'translateZ(20px)' }}>
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-green-500 group-hover:text-black group-hover:border-green-500 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.02)] group-hover:shadow-[0_0_25px_rgba(34,197,94,0.4)]">
                    <Icon strokeWidth={1.2} className="w-7 h-7 transition-transform duration-500 group-hover:scale-110" />
                  </div>

                  <div className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/20 group-hover:text-white group-hover:border-white/20 group-hover:bg-white/5 transition-all duration-300 cursor-pointer">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10" style={{ transform: 'translateZ(10px)' }}>
                  <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight group-hover:text-green-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light group-hover:text-gray-300 transition-colors duration-300">
                    {service.desc}
                  </p>
                </div>

                {/* Neon Bottom Gauge line */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}