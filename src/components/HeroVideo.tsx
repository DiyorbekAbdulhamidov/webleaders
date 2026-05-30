'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, PlayCircle } from 'lucide-react'
import * as THREE from 'three'
import { useLanguage } from '@/context/LanguageContext'

export default function HeroVideo() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement | null>(null)

  // --- 🌀 THREE.JS 3D PARTICLE VORTEX ENGINE ---
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.z = 4

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const count = 35000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const colorInside = new THREE.Color('#22c55e')
    const colorOutside = new THREE.Color('#011c15')

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = Math.random() * 3.5
      const spinAngle = radius * 3.0
      const branchAngle = ((i % 3) / 3) * Math.PI * 2

      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.4
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.2
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.4

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
      positions[i3 + 1] = randomY
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

      const mixedColor = colorInside.clone()
      mixedColor.lerp(colorOutside, radius / 3.5)

      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.015,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    })

    const points = new THREE.Points(geometry, material)
    points.rotation.x = 0.9
    scene.add(points)

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) - 0.5
      mouseY = (event.clientY / window.innerHeight) - 0.5
    }
    window.addEventListener('mousemove', handleMouseMove)

    const clock = new THREE.Clock()
    let animationFrameId: number

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()
      points.rotation.y = elapsedTime * 0.03

      points.rotation.x = 0.9 + (mouseY * 0.2)
      points.rotation.z = mouseX * 0.2

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      if (!container) return
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-black h-[100svh]"
    >
      {/* 3D WEBGL ENGINE BACKGROUND */}
      <div ref={containerRef} className="absolute inset-0 z-0 bg-black" />

      {/* GRADIENT DEPTH LAYER */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,black_100%)]" />
      </div>

      {/* UI INTERACTION LAYER */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pointer-events-none">

        <div className="w-full max-w-[1200px] mx-auto text-center flex flex-col items-center">

          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-gray-300 uppercase tracking-widest">
              {t.hero.badge || "WEBLEADERS — RAQAMLI EVOLUTSIYA"}
            </span>
          </motion.div>

          {/* ASOSIY SARLAVHA (TITLE 1 VA TITLE 2 TO'LIQ QAYTARILDI) */}
          <h1 className="w-full max-w-[1150px] font-bold text-white tracking-tight leading-[1.12] text-center mb-6">
            <motion.span
              key={t.hero.title1}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/90"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5.2rem)' }}
            >
              {t.hero.title1}
            </motion.span>

            <motion.span
              key={t.hero.title2}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 mt-2"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5.2rem)' }}
            >
              {t.hero.title2}
            </motion.span>
          </h1>

          {/* Subtitle Description */}
          <motion.p
            key={t.hero.desc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-gray-400 text-sm sm:text-base md:text-lg max-w-[38rem] leading-relaxed tracking-normal font-normal mb-10"
          >
            {t.hero.desc}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pointer-events-auto"
          >
            <Link href="#contact" className="block w-full sm:w-auto">
              <button className="w-full sm:w-auto h-14 px-8 rounded-full bg-white text-black font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                {t.hero.btnPrimary || "Loyiha Boshlash"}
                <ArrowUpRight size={18} />
              </button>
            </Link>

            <Link href="#projects" className="block w-full sm:w-auto">
              <button className="w-full sm:w-auto h-14 px-8 rounded-full bg-transparent text-white font-medium text-sm tracking-wide border border-white/10 hover:bg-white/5 hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                <PlayCircle size={18} className="text-white/70" />
                {t.hero.btnSecondary || "Nimalar Qildik?"}
              </button>
            </Link>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.3em] text-gray-500 uppercase animate-bounce hidden sm:block">
          Scroll to Enter
        </div>

      </div>
    </section>
  )
}