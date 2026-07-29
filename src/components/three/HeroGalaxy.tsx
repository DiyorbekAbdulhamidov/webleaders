'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { createRenderer } from './createRenderer'

export default function HeroGalaxy() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = createRenderer(window.innerWidth, window.innerHeight)
    if (!renderer) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 4

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
    let running = true

    const animate = () => {
      if (!running) return
      const elapsedTime = clock.getElapsedTime()
      points.rotation.y = elapsedTime * 0.03
      points.rotation.x = 0.9 + (mouseY * 0.2)
      points.rotation.z = mouseX * 0.2

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    // Brauzer GPU kontekstini tortib olsa — sokin to'xtaymiz, xato tashlamaymiz
    const handleContextLost = (e: Event) => {
      e.preventDefault()
      running = false
      cancelAnimationFrame(animationFrameId)
    }
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
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
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 z-0" />
}
