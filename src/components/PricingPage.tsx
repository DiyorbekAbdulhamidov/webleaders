'use client'

import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Check, X, Loader2, Sparkles, Zap } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { useLanguage } from '@/context/LanguageContext'
import 'react-toastify/dist/ReactToastify.css'

const sanitizeInput = (input: string) => {
  return input.replace(/[<>&/"']/g, '')
}

interface EngineProps {
  hoveredIndex: number | null
  globalMouse: { x: number; y: number }
}

// --- 🌌 THREE.JS 3D CYBERNETIC QUANTUM CORE ENGINE ---
function ThreeQuantumCoreEngine({ hoveredIndex, globalMouse }: EngineProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const stateRef = useRef({ hoveredIndex, globalMouse })

  useEffect(() => {
    stateRef.current = { hoveredIndex, globalMouse }
  }, [hoveredIndex, globalMouse])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene, Camera & Renderer initialization
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.z = 7

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // --- 💎 CREATING 3 DISTINCT 3D QUANTUM CORES ---
    const cores: THREE.Group[] = []

    // Core 0: Basic Plan (Tetrahedron Matrix)
    const core0 = new THREE.Group()
    const geom0 = new THREE.TetrahedronGeometry(1.1, 1)
    const mat0 = new THREE.MeshBasicMaterial({ color: 0x16a34a, wireframe: true, transparent: true, opacity: 0.25 })
    core0.add(new THREE.Mesh(geom0, mat0))

    // Core 1: Popular Plan (Complex Glowing Icosahedron Matrix)
    const core1 = new THREE.Group()
    const geom1 = new THREE.IcosahedronGeometry(1.2, 1)
    const mat1 = new THREE.MeshBasicMaterial({ color: 0x22c55e, wireframe: true, transparent: true, opacity: 0.35 })
    core1.add(new THREE.Mesh(geom1, mat1))

    // Core 2: Premium Plan (Hyper-Dimensional Torus Knot)
    const core2 = new THREE.Group()
    const geom2 = new THREE.TorusKnotGeometry(0.7, 0.22, 100, 12)
    const mat2 = new THREE.MeshBasicMaterial({ color: 0x059669, wireframe: true, transparent: true, opacity: 0.25 })
    core2.add(new THREE.Mesh(geom2, mat2))

    // Set Default Grid Positions in 3D Space
    core0.userData = { defaultX: -3.6, defaultY: 0, defaultZ: -1 }
    core1.userData = { defaultX: 0, defaultY: 0, defaultZ: 0 }
    core2.userData = { defaultX: 3.6, defaultY: 0, defaultZ: -1 }

    cores.push(core0, core1, core2)
    scene.add(core0, core1, core2)

    // Cosmic Particle Ambient Field
    const particleCount = 400
    const partGeom = new THREE.BufferGeometry()
    const partPositions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i++) {
      partPositions[i] = (Math.random() - 0.5) * 15
    }
    partGeom.setAttribute('position', new THREE.BufferAttribute(partPositions, 3))
    const partMat = new THREE.PointsMaterial({ size: 0.03, color: 0x22c55e, transparent: true, opacity: 0.2 })
    const starField = new THREE.Points(partGeom, partMat)
    scene.add(starField)

    const clock = new THREE.Clock()
    let animationId: number

    // --- ANIMATION INTERACTIVE LOOP ---
    const animate = () => {
      const elapsed = clock.getElapsedTime()
      const { hoveredIndex: currentHover, globalMouse: currentMouse } = stateRef.current

      // Camera Parallax (Sichqoncha harakatiga qarab butun fazoni 3D burish)
      camera.position.x += (currentMouse.x * 1.5 - camera.position.x) * 0.05
      camera.position.y += (currentMouse.y * 1.5 - camera.position.y) * 0.05
      camera.lookAt(0, 0, 0)

      starField.rotation.y = elapsed * 0.01

      cores.forEach((core, idx) => {
        const mesh = core.children[0] as THREE.Mesh
        const material = mesh.material as THREE.MeshBasicMaterial

        let targetX = core.userData.defaultX
        let targetY = core.userData.defaultY
        let targetZ = core.userData.defaultZ
        let targetOpacity = idx === 1 ? 0.35 : 0.25
        let rotationSpeed = 0.3

        // Haqiqiy 8D Matematik Dinamika (Tarif ustiga borgandagi daxshatli transformatsiya)
        if (currentHover !== null) {
          if (currentHover === idx) {
            // Tanlangan yadro ekranning markaziga va eng oldiga (Z-o'qiga) otilib chiqadi
            targetX = 0
            targetY = 0.5
            targetZ = 2.5
            targetOpacity = 0.85
            rotationSpeed = 2.5 // Aylanish daxshatli darajada tezlashadi
            material.color.setHex(0x22c55e) // Rangi och neon yashilga o'tadi
          } else {
            // Tanlanmagan yadrolar orqa planga qochib, g'oyib bo'lish darajasiga keladi
            targetZ = -4
            targetOpacity = 0.05
          }
        } else {
          // Sichqoncha chiqib ketganda ranglarni qaytarish
          if (idx === 0) material.color.setHex(0x16a34a)
          if (idx === 1) material.color.setHex(0x22c55e)
          if (idx === 2) material.color.setHex(0x059669)
        }

        // Lerping Positions & Opacity (Silliq o'tishlar)
        core.position.x += (targetX - core.position.x) * 0.07
        core.position.y += (targetY - core.position.y) * 0.07
        core.position.z += (targetZ - core.position.z) * 0.07
        material.opacity += (targetOpacity - material.opacity) * 0.07

        // Murakkab ko'p o'qli doimiy aylanish
        core.rotation.x += 0.005 * rotationSpeed
        core.rotation.y += 0.01 * rotationSpeed
        core.rotation.z += 0.003 * rotationSpeed
      })

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
      geom0.dispose()
      mat0.dispose()
      geom1.dispose()
      mat1.dispose()
      geom2.dispose()
      mat2.dispose()
      partGeom.dispose()
      partMat.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-70" />
}

// --- MAIN PRICING PAGE COMPONENT ---
export default function PricingPage() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [globalMouse, setGlobalMouse] = useState({ x: 0, y: 0 })
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('+998 ')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [canSubmit, setCanSubmit] = useState(true)

  useEffect(() => {
    setMounted(true)
    const lastSubmit = localStorage.getItem('lastSubmitTime')
    if (lastSubmit) {
      const timeDiff = Date.now() - parseInt(lastSubmit)
      if (timeDiff < 60000) {
        setCanSubmit(false)
        const timeout = setTimeout(() => setCanSubmit(true), 60000 - timeDiff)
        return () => clearTimeout(timeout)
      }
    }
  }, [])

  useEffect(() => {
    if (selectedPlan) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedPlan])

  const handleGlobalMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    // Convert mouse coordinates to clip space (-1 to 1)
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    setGlobalMouse({ x, y })
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value
    if (!val.startsWith('+998')) {
      val = '+998 '
    }
    if (/^[+0-9 ]*$/.test(val)) {
      setPhone(val)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) {
      toast.warning('Iltimos, biroz kuting...', { theme: 'dark' })
      return
    }

    setLoading(true)
    const cleanName = sanitizeInput(name.trim())

    if (cleanName.length < 3) {
      toast.error(t.toast.nameError, { theme: 'dark' })
      setLoading(false)
      return
    }

    const rawPhone = phone.replace(/\D/g, '')
    if (rawPhone.length !== 12) {
      toast.error(t.toast.phoneError, { theme: 'dark' })
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: cleanName, phone, plan: selectedPlan }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        toast.success(t.toast.success, { theme: 'dark' })
        setSelectedPlan(null)
        setName('')
        setPhone('+998 ')

        localStorage.setItem('lastSubmitTime', Date.now().toString())
        setCanSubmit(false)
        setTimeout(() => setCanSubmit(true), 60000)
      } else {
        toast.error(t.toast.error, { theme: 'dark' })
      }
    } catch {
      toast.error(t.toast.error, { theme: 'dark' })
    } {
      setLoading(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleGlobalMouseMove}
      id="pricing"
      className="relative py-32 bg-black text-white overflow-hidden"
    >

      {/* 🔮 THREE.JS ACTIVE 8D QUANTUM CORES FIELD */}
      {mounted && <ThreeQuantumCoreEngine hoveredIndex={hoveredIndex} globalMouse={globalMouse} />}

      {/* Heavy Cyber Atmosphere Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] pointer-events-none mix-blend-overlay z-[1]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-inner"
          >
            <Sparkles size={13} className="text-green-400" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-gray-400">{t.nav.pricing}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none"
          >
            {t.pricing.title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-gray-300 to-green-600">{t.pricing.subtitle}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed tracking-wide"
          >
            {t.pricing.desc}
          </motion.p>
        </div>

        {/* INTERACTIVE CARDS GRID */}
        <div className="grid md:grid-cols-3 gap-8 items-center relative z-20">
          {t.pricing.plans.map((plan: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative group flex flex-col justify-between p-8 md:p-10 rounded-[2.5rem] transition-all duration-500 backdrop-blur-xl border cursor-pointer ${plan.isPopular
                  ? 'bg-black/40 border-green-500/30 shadow-[0_0_60px_-20px_rgba(34,197,94,0.3)] scale-105 z-10'
                  : 'bg-black/20 border-white/[0.05] hover:bg-black/40 hover:border-white/20'
                }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-black border border-green-500/50 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.2)] flex items-center gap-2 z-20">
                  <Zap size={12} className="text-green-400 fill-green-400 animate-pulse" />
                  <span className="text-[10px] font-bold tracking-widest text-white font-mono">ENG_OMMABOP</span>
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-green-400 transition-colors duration-300">{plan.title}</h3>
                <p className="text-gray-400 text-xs font-light mb-8 h-10 tracking-wide leading-relaxed">{plan.desc}</p>

                <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-white/[0.08]">
                  {language !== 'UZ' && (
                    <span className="text-lg text-gray-500 font-light font-mono">
                      {language === 'RU' ? 'от' : 'from'}
                    </span>
                  )}

                  <span className="text-5xl font-black text-white tracking-tighter">{plan.price}</span>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-widest font-mono">{plan.currency}</span>

                  {language === 'UZ' && (
                    <span className="text-base text-gray-500 font-light font-mono">dan</span>
                  )}
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature: string, fIdx: number) => (
                    <li key={fIdx} className="flex items-start gap-4 text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${plan.isPopular ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-400'
                        }`}>
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span className="leading-snug font-light tracking-wide">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelectedPlan(plan.title)}
                className={`w-full py-4.5 rounded-2xl font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center gap-2 ${plan.isPopular
                    ? 'bg-green-500 text-black hover:bg-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]'
                    : 'bg-white text-black hover:bg-gray-200'
                  }`}
              >
                Tanlash
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL PORTAL */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedPlan && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                onClick={() => setSelectedPlan(null)}
              />

              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md bg-[#070707] border border-white/[0.08] rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden z-10"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-[90px] pointer-events-none" />

                <button
                  onClick={() => setSelectedPlan(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
                >
                  <X size={18} />
                </button>

                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{t.pricing.modalTitle}</h3>
                  <p className="text-gray-400 text-xs font-light mb-8 tracking-wide leading-relaxed">
                    <span className="text-green-400 font-mono font-bold uppercase tracking-wider">{selectedPlan}</span> {t.pricing.modalDesc}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 ml-1">CLIENT_NAME</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ismingiz"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-green-500/40 focus:bg-white/10 transition-all font-light text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 ml-1">SECURE_TEL</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="+998 90 123 45 67"
                        maxLength={17}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-green-500/40 focus:bg-white/10 transition-all font-mono text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !canSubmit}
                      className="w-full py-4.5 mt-4 bg-green-500 text-black font-bold rounded-xl uppercase tracking-widest hover:bg-green-400 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs"
                    >
                      {loading ? <Loader2 className="animate-spin" size={16} /> : t.pricing.btnSubmit}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <ToastContainer
        position="bottom-right"
        theme="dark"
        toastStyle={{ backgroundColor: '#070707', border: '1px solid #1c1c1c', borderRadius: '16px' }}
      />
    </section>
  )
}