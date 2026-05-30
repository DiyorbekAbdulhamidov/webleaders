'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { usePathname } from 'next/navigation'
import * as THREE from 'three'

const langOptions = [
  { code: 'UZ', label: "O'zbekcha" },
  { code: 'RU', label: 'Русский' },
  { code: 'EN', label: 'English' }
]

// --- 🌀 LIGHTWEIGHT MENU 3D VORTEX BACKGROUND ---
// Mobil qurilmalarda qotmasligi uchun zarralar soni biroz optimizatsiya qilindi
function MenuVortexBackground() {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = canvasContainerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(65, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.z = 3.8

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Mobil menyu uchun 18,000 ta zarra yetarli (CPU yuklamasligini oldini oladi)
    const count = 18000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const colorInside = new THREE.Color('#22c55e') // Brand yashil
    const colorOutside = new THREE.Color('#050505') // To'q fon

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = Math.random() * 4.0
      const spinAngle = radius * 2.5
      const branchAngle = ((i % 3) / 3) * Math.PI * 2

      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
      positions[i3 + 1] = randomY
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

      const mixedColor = colorInside.clone()
      mixedColor.lerp(colorOutside, radius / 4.0)

      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.018,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    })

    const points = new THREE.Points(geometry, material)
    points.rotation.x = 0.6
    scene.add(points)

    // Interaktivlik (Sichqoncha yoki Touch harakati)
    let mouseX = 0, mouseY = 0
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5
      mouseY = (e.clientY / window.innerHeight) - 0.5
    }
    window.addEventListener('mousemove', handleMouseMove)

    const clock = new THREE.Clock()
    let animationFrameId: number

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()
      points.rotation.y = elapsedTime * 0.05 // Sekin, elegant aylanish

      points.rotation.x = 0.6 + (mouseY * 0.2)
      points.rotation.z = mouseX * 0.2

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

    // --- CLEANUP MECHANISM (Zaruriy qism!) ---
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

  return <div ref={canvasContainerRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />
}


export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [imageError, setImageError] = useState(false)
  const pathname = usePathname()

  if (pathname === "/ramadan") return null

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offsetPosition = el.getBoundingClientRect().top + window.scrollY - 90
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
      setIsOpen(false)
    }
  }

  const navLinks = [
    { href: 'services', label: t.nav.services },
    { href: 'portfolio', label: t.nav.portfolio },
    { href: 'pricing', label: t.nav.pricing },
    { href: 'contact', label: t.nav.contact },
  ]

  const overlayVariants: Variants = {
    closed: { opacity: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
    open: { opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
  }

  const menuVariants: Variants = {
    closed: {
      y: "-100%",
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
    },
    open: {
      y: 0,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
    }
  }

  const listVariants: Variants = {
    open: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
    closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } }
  }

  const itemVariants: Variants = {
    open: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    closed: { y: 40, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }
  }

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled || isOpen
          ? 'bg-[#050505]/60 backdrop-blur-xl border-b border-white/[0.04] py-4'
          : 'bg-transparent border-b border-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8">

          {/* BRAND LOGO */}
          <Link href="/" className="relative z-50 flex items-center">
            <div className="relative w-[160px] h-[40px] flex items-center">
              {!imageError ? (
                <Image
                  src="/logo.png"
                  alt="Webleaders"
                  width={160}
                  height={40}
                  className="object-contain transition-opacity duration-300 hover:opacity-80"
                  priority
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="text-lg font-bold uppercase tracking-[0.3em] text-white">
                  WEB<span className="text-gray-400 font-light">LEADERS</span>
                </span>
              )}
            </div>
          </Link>

          {/* DESKTOP SILENT NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-12">
            <div className="flex items-center gap-10">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="relative text-[11px] font-medium tracking-[0.25em] text-gray-400 hover:text-white uppercase transition-colors duration-300 py-1 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-white transition-all duration-300 -translate-x-1/2 group-hover:w-full opacity-40" />
                </button>
              ))}
            </div>

            <div className="w-[1px] h-3 bg-white/10" />

            {/* MINIMALIST LANG SWITCHER */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="text-[10px] font-bold tracking-[0.2em] text-gray-400 hover:text-white uppercase transition-colors py-1 flex items-center gap-1"
              >
                {language}
                <span className="text-[8px] opacity-40 transition-transform duration-300" style={{ transform: isLangMenuOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full right-0 mt-4 w-32 bg-[#09090b] border border-white/[0.06] rounded-sm shadow-2xl p-1 z-50"
                    onMouseLeave={() => setIsLangMenuOpen(false)}
                  >
                    {langOptions.map((langOpt) => (
                      <button
                        key={langOpt.code}
                        onClick={() => {
                          setLanguage(langOpt.code as any)
                          setIsLangMenuOpen(false)
                        }}
                        className={`w-full px-3 py-2 text-left text-[10px] tracking-widest font-medium uppercase rounded-sm transition-all ${language === langOpt.code
                          ? 'text-white bg-white/5 font-bold'
                          : 'text-gray-500 hover:text-white hover:bg-white/[0.02]'
                          }`}
                      >
                        {langOpt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* HIGH-END LUXURY CTA */}
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2.5 bg-white text-black text-[10px] font-bold tracking-[0.25em] uppercase rounded-none hover:bg-black hover:text-white border border-white transition-all duration-400"
            >
              {t.nav.btn}
            </button>
          </nav>

          {/* MINIMALIST HAMBURGER TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-[101] flex flex-col justify-center items-center w-6 h-6 gap-[5px] cursor-pointer"
            aria-label="Toggle Menu"
          >
            <span className={`w-6 h-[1px] bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
            <span className={`w-6 h-[1px] bg-white transition-all duration-300 ${isOpen ? '-rotate-45 translate-y fly-out -translate-y-[3px]' : ''}`} />
          </button>
        </div>
      </motion.header>

      {/* --- PREMIUM FULLSCREEN CURTAIN OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Matte Background Blur */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              className="fixed inset-0 z-[98] bg-black/60 backdrop-blur-2xl lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Smooth Cinematic Curtain Drop */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 left-0 right-0 h-screen z-[99] bg-[#070708] border-b border-white/[0.04] px-8 pt-32 pb-16 lg:hidden flex flex-col justify-between overflow-hidden"
            >
              {/* 🌀 INJECTED THREE.JS BACKGROUND ELEMENT */}
              <MenuVortexBackground />

              {/* GRADIENT SHADOWS OVER WEBGL TO KEEP TEXTS READABLE */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#070708]/80 via-transparent to-[#070708]/90 pointer-events-none z-[1]" />

              {/* Luxury Menu Grid (Z-INDEX RAISING TO PREVENT CLICKS BLOCKING) */}
              <motion.div variants={listVariants} className="relative z-10 flex flex-col gap-5 w-full pointer-events-auto">
                {navLinks.map((link, i) => (
                  <motion.div key={link.href} variants={itemVariants} className="overflow-hidden">
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="w-full text-left text-3xl font-light tracking-wide text-gray-400 hover:text-white uppercase py-1 flex items-baseline gap-4 group cursor-pointer"
                    >
                      <span className="text-[10px] font-mono tracking-normal text-gray-600">0{i + 1}</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-2">{link.label}</span>
                    </button>
                  </motion.div>
                ))}
              </motion.div>

              {/* Bottom Utility Deck */}
              <div className="relative z-10 mt-16 pt-8 border-t border-white/[0.04] flex flex-col gap-6 pointer-events-auto">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-[9px] tracking-widest uppercase font-medium">Language</span>
                  <div className="flex gap-4">
                    {langOptions.map((langOpt) => (
                      <button
                        key={langOpt.code}
                        onClick={() => setLanguage(langOpt.code as any)}
                        className={`text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer ${language === langOpt.code ? 'text-white' : 'text-gray-600'
                          }`}
                      >
                        {langOpt.code}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full py-4 bg-white text-black font-bold text-[10px] tracking-[0.25em] uppercase text-center active:scale-[0.99] transition-transform cursor-pointer"
                >
                  {t.nav.btn}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}