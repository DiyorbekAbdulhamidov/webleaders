'use client'

import { useSyncExternalStore } from 'react'

/**
 * 3D fonlar faqat kuchli, sichqonchali qurilmalarda ishlasin.
 *
 * Sabab: bosh sahifada 4 ta alohida WebGL sahnasi bor edi. Telefon brauzeri
 * bir vaqtda shuncha kontekstni ko'tara olmaydi — `new WebGLRenderer()` xato
 * tashlaydi, xato useEffect ichidan chiqib butun React daraxtini yiqitadi va
 * sahifa qora bo'lib qoladi.
 */

const DESKTOP = '(min-width: 1024px)'
const FINE_POINTER = '(hover: hover) and (pointer: fine)'
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

// WebGL tekshiruvi qimmat — bir marta bajarib, natijani saqlaymiz
let webglSupport: boolean | null = null

function hasWebGL() {
  if (webglSupport !== null) return webglSupport
  try {
    const canvas = document.createElement('canvas')
    webglSupport = !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    webglSupport = false
  }
  return webglSupport
}

function subscribe(onChange: () => void) {
  const queries = [DESKTOP, FINE_POINTER, REDUCED_MOTION].map(q => window.matchMedia(q))
  queries.forEach(q => q.addEventListener('change', onChange))
  return () => queries.forEach(q => q.removeEventListener('change', onChange))
}

function getSnapshot() {
  return (
    window.matchMedia(DESKTOP).matches &&
    window.matchMedia(FINE_POINTER).matches &&
    !window.matchMedia(REDUCED_MOTION).matches &&
    hasWebGL()
  )
}

// Serverda har doim o'chiq — hydration mos kelishi uchun
const getServerSnapshot = () => false

export function use3DEnabled() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
