'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { createRenderer } from './createRenderer'

// --- 🌌 THREE.JS GRAVITY WELL CYBER-FABRIC ENGINE ---
export default function GravityFabric({ mousePos }: { mousePos: { x: number; y: number; active: boolean } }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mouseRef = useRef(mousePos)

  useEffect(() => {
    mouseRef.current = mousePos
  }, [mousePos])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = createRenderer(container.clientWidth, container.clientHeight)
    if (!renderer) return

    // Scene & Camera setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 7)

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
    let running = true

    // Raycaster yordamida sichqoncha koordinatasini 3D fazoga o'tkazish
    const raycaster = new THREE.Raycaster()
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const intersectPoint = new THREE.Vector3()

    // --- ANIMATION LOOP (Eynshteyn Gravitatsiya Matematikasi) ---
    const animate = () => {
      if (!running) return
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
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-80" />
}
