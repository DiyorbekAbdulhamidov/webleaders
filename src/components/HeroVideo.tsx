'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, FolderOpen } from 'lucide-react'
import * as THREE from 'three'
import { useLanguage } from '@/context/LanguageContext'

export default function HeroVideo() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [enable3D, setEnable3D] = useState(false)

  // 3D faqat desktop va harakat cheklanmagan qurilmalarda — mobil tezligi uchun
  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnable3D(isDesktop && !reducedMotion)
  }, [])

  useEffect(() => {
    if (!enable3D) return
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 4

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const count = 22000
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
  }, [enable3D])

  return (
    <section className="relative w-full overflow-hidden bg-black min-h-[100svh] flex flex-col">
      {/* 3D FON (faqat desktop) */}
      <div ref={containerRef} className="absolute inset-0 z-0 bg-black" />

      {/* Mobil uchun yengil gradient fon */}
      {!enable3D && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500/[0.07] rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-green-900/[0.1] rounded-full blur-[100px]" />
        </div>
      )}

      {/* GRADIENT QATLAM */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,black_100%)]" />
      </div>

      {/* KONTENT */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-28 pb-10">

        <div className="w-full max-w-[1200px] mx-auto text-center flex flex-col items-center">

          {/* Badge */}
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
              {t.hero.badge}
            </span>
          </motion.div>

          {/* H1 */}
          <h1 className="w-full max-w-[1100px] font-bold text-white tracking-tight leading-[1.08] text-center mb-6">
            <motion.span
              key={t.hero.title1}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/90"
              style={{ fontSize: 'clamp(2.3rem, 5.5vw, 5rem)' }}
            >
              {t.hero.title1}
            </motion.span>
            <motion.span
              key={t.hero.title2}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="block mt-2"
              style={{ fontSize: 'clamp(2.3rem, 5.5vw, 5rem)' }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-emerald-500">
                {t.hero.title2}
              </span>
            </motion.span>
          </h1>

          {/* Tavsif */}
          <motion.p
            key={t.hero.desc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-gray-400 text-sm sm:text-base md:text-lg max-w-[40rem] leading-relaxed mb-10"
          >
            {t.hero.desc}
          </motion.p>

          {/* CTA tugmalar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/contact"
              className="group w-full sm:w-auto h-14 px-9 rounded-full bg-green-500 text-black font-bold text-sm tracking-wide shadow-[0_4px_30px_rgba(34,197,94,0.35)] hover:bg-green-400 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
            >
              {t.hero.btnPrimary}
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="/portfolio"
              className="w-full sm:w-auto h-14 px-9 rounded-full bg-transparent text-white font-medium text-sm tracking-wide border border-white/15 hover:bg-white/5 hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FolderOpen size={17} className="text-green-400" />
              {t.hero.btnSecondary}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* STATISTIKA BAND */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 w-full border-t border-white/[0.06] bg-black/40 backdrop-blur-md"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.05]">
          {t.hero.stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-6 px-4">
              <span className="text-2xl md:text-3xl font-black text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mt-1 text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
