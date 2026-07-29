'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { createRenderer } from './createRenderer'

interface CanvasProps {
  hoveredIndex: number | null
}

// --- 🌌 THREE.JS SPATIAL INTERACTIVE NAVIGATION BACKGROUND ---
export default function ServicesCanvas({ hoveredIndex }: CanvasProps) {
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

    const renderer = createRenderer(container.clientWidth, container.clientHeight)
    if (!renderer) return

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 6)

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
    let running = true

    // --- RENDER ANIMATION LOOP ---
    const animate = () => {
      if (!running) return
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

    const handleContextLost = (e: Event) => {
      e.preventDefault()
      running = false
      cancelAnimationFrame(animationFrameId)
    }
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost)

    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      running = false
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost)
      if (renderer.domElement.parentNode === container) {
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
