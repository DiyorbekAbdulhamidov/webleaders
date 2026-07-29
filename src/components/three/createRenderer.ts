import * as THREE from 'three'

/**
 * WebGLRenderer'ni xavfsiz yaratadi. Kontekst yaratilmasa `null` qaytaradi —
 * hech qachon xato tashlamaydi, shunda sahifa qora bo'lib qolmaydi.
 */
export function createRenderer(width: number, height: number): THREE.WebGLRenderer | null {
  try {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: false
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    return renderer
  } catch {
    return null
  }
}
