'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import * as THREE from 'three'
import { ShieldCheck, Smartphone, Users, Rocket, Timer, Handshake, Star, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const icons = [
  ShieldCheck,
  Smartphone,
  Users,
  Rocket,
  Timer,
  Handshake
]

// --- 🌌 THREE.JS GRAVITY WELL CYBER-FABRIC ENGINE ---
function GravityFabricEngine({ mousePos }: { mousePos: { x: number; y: number; active: boolean } }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mouseRef = useRef(mousePos)

  useEffect(() => {
    mouseRef.current = mousePos
  }, [mousePos])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene & Camera setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 7)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Silliq egiluvchan kiber-mato yaratish (38x38 segmentli simli to'r)
    const cols = 38
    const rows = 38
    const geometry = new THREE.BufferGeometry()

    const count = cols * rows
    const positions = new Float32Array(count * 3)
    const initialPositions = new Float32Array(count * 3)

    const width = 12
    const height = 7

    // Nuqtalar koordinatalarini boshlang'ich matritsa holatiga keltirish
    for (let i = 0; i < count; i++) {
      const x = (i % cols) / (cols - 1) * width - width / 2
      const y = Math.floor(i / cols) / (rows - 1) * height - height / 2

      const i3 = i * 3
      positions[i3] = x
      positions[i3 + 1] = y
      positions[i3 + 2] = 0

      initialPositions[i3] = x
      initialPositions[i3 + 1] = y
      initialPositions[i3 + 2] = 0
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // To'r chiziqlarini bog'lash (Chiroyli kiber panjara hosil qilish uchun)
    const indices = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const current = r * cols + c
        if (c < cols - 1) {
          indices.push(current, current + 1) // Gorizontal chiziq
        }
        if (r < rows - 1) {
          indices.push(current, current + cols) // Vertikal chiziq
        }
      }
    }
    geometry.setIndex(indices)

    // To'r materiali (Neon Yashil va nozik kiber uslub)
    const material = new THREE.LineBasicMaterial({
      color: 0x22c55e,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    })

    const gridLines = new THREE.LineSegments(geometry, material)
    scene.add(gridLines)

    const clock = new THREE.Clock()
    let animationId: number

    // Raycaster yordamida sichqoncha koordinatasini 3D fazoga o'tkazish
    const raycaster = new THREE.Raycaster()
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const intersectPoint = new THREE.Vector3()

    // --- ANIMATION LOOP (Eynshteyn Gravitatsiya Matematikasi) ---
    const animate = () => {
      const elapsed = clock.getElapsedTime()
      const currentMouse = mouseRef.current

      // Sichqoncha nuqtasini 3D fazodagi koordinataga o'girish
      const mouse3D = new THREE.Vector2(currentMouse.x, currentMouse.y)
      raycaster.setFromCamera(mouse3D, camera)
      raycaster.ray.intersectPlane(planeZ, intersectPoint)

      const posAttribute = geometry.attributes.position
      const currentPositions = posAttribute.array as Float32Array

      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const initX = initialPositions[i3]
        const initY = initialPositions[i3 + 1]

        // Shovqinli tebranish (Doimiy mayin to'lqinlanish)
        const wave = Math.sin(initX * 0.5 + elapsed * 1.5) * Math.cos(initY * 0.5 + elapsed * 1.5) * 0.08

        if (currentMouse.active) {
          // Sichqonchagacha bo'lgan 2D masofa
          const dx = intersectPoint.x - initX
          const dy = intersectPoint.y - initY
          const dist = Math.sqrt(dx * dx + dy * dy)

          // Gravitatsiya kuchi formulasi (Gaussian distortion)
          const radius = 2.8 // Gravitatsiya ta'sir doirasi
          if (dist < radius) {
            const force = Math.pow((radius - dist) / radius, 2) * 0.85

            // Tugunlarni chuqurlikka (Z o'qiga) va sichqoncha markaziga tortish
            currentPositions[i3 + 2] += (-force * 1.2 - currentPositions[i3 + 2]) * 0.12
            currentPositions[i3] += (initX + (dx * force * 0.15) - currentPositions[i3]) * 0.12
            currentPositions[i3 + 1] += (initY + (dy * force * 0.15) - currentPositions[i3 + 1]) * 0.12
          } else {
            // Ta'sir doirasidan tashqarida tinch holatga qaytarish
            currentPositions[i3 + 2] += (wave - currentPositions[i3 + 2]) * 0.08
            currentPositions[i3] += (initX - currentPositions[i3]) * 0.08
            currentPositions[i3 + 1] += (initY - currentPositions[i3 + 1]) * 0.08
          }
        } else {
          // Sichqoncha bo'limda bo'lmaganda oddiy kosmik tebranish
          currentPositions[i3 + 2] += (wave - currentPositions[i3 + 2]) * 0.06
          currentPositions[i3] += (initX - currentPositions[i3]) * 0.06
          currentPositions[i3 + 1] += (initY - currentPositions[i3 + 1]) * 0.06
        }
      }

      posAttribute.needsUpdate = true

      // Matritsani biroz burchak ostida aylantirib turish
      gridLines.rotation.z = Math.sin(elapsed * 0.03) * 0.02

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

  return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-80" />
}

// --- GLASS CARD COMPONENT WITH 3D TILT ---
const GlassCard = ({ item, index, Icon, onCardHover }: { item: any, index: number, Icon: any, onCardHover: (active: boolean) => void }) => {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 })

  const rotateX = useMotionTemplate`calc(${mouseYSpring} * -0.2deg)`
  const rotateY = useMotionTemplate`calc(${mouseXSpring} * 0.2deg)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct * 10)
    y.set(yPct * 10)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    onCardHover(false)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => onCardHover(true)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative h-full group cursor-pointer"
    >
      <div className="relative h-full bg-white/[0.02] backdrop-blur-2xl border border-white/[0.06] rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:bg-white/[0.05] hover:border-green-500/30 shadow-[0_12px_40px_0_rgba(0,0,0,0.5)]">

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none mix-blend-overlay" />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-green-500/20 transition-all duration-700" />

        <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-start justify-between mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/[0.08] flex items-center justify-center text-gray-400 group-hover:scale-110 group-hover:border-green-500/40 group-hover:text-green-400 transition-all duration-500 shadow-inner">
              <Icon size={26} strokeWidth={1.5} />
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-green-500 group-hover:scale-125 transition-all duration-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-4 tracking-tight leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-green-400 transition-all duration-300">
            {item.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed font-light tracking-wide group-hover:text-gray-300 transition-colors mt-auto">
            {item.desc}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />
      </div>
    </motion.div>
  )
}

// --- MAIN SECTION ---
export default function WhyChooseUs() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null) // To'g'rilandi: HTMLElement
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Global mouse tracker inside the section viewport
  const handleGlobalMouseMove = (e: React.MouseEvent<HTMLElement>) => { // To'g'rilandi: HTMLElement
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()

    // Normalize coordinates to WebGL clip space (-1 to 1)
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1

    setMousePos(prev => ({ ...prev, x, y }))
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleGlobalMouseMove}
      onMouseEnter={() => setMousePos(prev => ({ ...prev, active: true }))}
      onMouseLeave={() => setMousePos(prev => ({ ...prev, active: false }))}
      className="relative py-32 bg-black text-white overflow-hidden"
    >

      {/* 🔮 THREE.JS ACTIVE QUANTUM FABRIC */}
      {mounted && <GravityFabricEngine mousePos={mousePos} />}

      {/* Atmospheric Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-[1]" />
      <div className="absolute top-0 left-0 w-full h-full bg-black pointer-events-none opacity-20 z-0">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-green-950/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-24 gap-8 border-b border-white/[0.05] pb-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-green-500 mb-6"
            >
              <div className="px-3 py-1 rounded-full bg-green-950/40 border border-green-500/20 backdrop-blur-md flex items-center gap-2">
                <Star size={12} fill="currentColor" />
                <span className="text-[9px] font-bold uppercase tracking-[0.25em]">{t.whyUs.badge}</span>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.95]"
            >
              {t.whyUs.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-gray-100 to-gray-600">
                {t.whyUs.subtitle}
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4 max-w-sm lg:text-left"
          >
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              {t.whyUs.desc}
            </p>
            <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-widest font-mono">
              <CheckCircle2 size={14} /> // CRITICAL_SUCCESS_RATE_100%
            </div>
          </motion.div>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-20">
          {t.whyUs.list.map((item, idx) => (
            <GlassCard
              key={idx}
              item={item}
              index={idx}
              Icon={icons[idx] || ShieldCheck}
              onCardHover={(active) => setMousePos(prev => ({ ...prev, active }))}
            />
          ))}
        </div>

      </div>
    </section>
  )
}