'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { createRenderer } from './createRenderer'

interface EngineProps {
  hoveredIndex: number | null
  globalMouse: { x: number; y: number }
}

// --- 🌌 THREE.JS 3D CYBERNETIC QUANTUM CORE ENGINE ---
export default function QuantumCore({ hoveredIndex, globalMouse }: EngineProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const stateRef = useRef({ hoveredIndex, globalMouse })

  useEffect(() => {
    stateRef.current = { hoveredIndex, globalMouse }
  }, [hoveredIndex, globalMouse])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = createRenderer(container.clientWidth, container.clientHeight)
    if (!renderer) return

    // Scene & Camera initialization
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.z = 7

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
    let running = true

    // --- ANIMATION INTERACTIVE LOOP ---
    const animate = () => {
      if (!running) return
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

    const handleContextLost = (e: Event) => {
      e.preventDefault()
      running = false
      cancelAnimationFrame(animationId)
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
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost)
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement)
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
