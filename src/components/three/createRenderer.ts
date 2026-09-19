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

/**
 * 3D sahna uchun render tsikli.
 *
 * Ilgari har bir sahna `requestAnimationFrame` ni to'xtovsiz aylantirardi —
 * sahna ekrandan chiqib ketgan yoki brauzer boshqa tabda bo'lgan paytda ham.
 * Bosh sahifada 4 ta sahna borligini hisobga olsak, bu doimiy GPU yuki va
 * noutbukda batareya sarfi degani.
 *
 * Bu yordamchi tsiklni ikki holatda to'xtatadi:
 *  - sahna viewport'dan butunlay chiqib ketganda (IntersectionObserver)
 *  - sahifa fonga o'tganda (document.hidden)
 *
 * Shuningdek `THREE.Clock` o'rniga `performance.now()` ishlatiladi —
 * three.js r180+ da Clock eskirgan deb belgilangan va konsolga ogohlantirish
 * chiqaradi.
 *
 * @param element Kuzatiladigan konteyner
 * @param onFrame Har kadrda chaqiriladi; argument — boshlanishdan beri sekund
 * @returns Tozalash funksiyasi
 */
export function startRenderLoop(
  element: Element,
  onFrame: (elapsedSeconds: number) => void
): () => void {
  const start = performance.now()
  let frameId = 0
  let visible = true
  let stopped = false

  const tick = () => {
    if (stopped) return
    onFrame((performance.now() - start) / 1000)
    frameId = requestAnimationFrame(tick)
  }

  const resume = () => {
    if (stopped || frameId) return
    frameId = requestAnimationFrame(tick)
  }

  const pause = () => {
    if (!frameId) return
    cancelAnimationFrame(frameId)
    frameId = 0
  }

  const sync = () => {
    if (visible && !document.hidden) resume()
    else pause()
  }

  let observer: IntersectionObserver | null = null
  if (typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(
      entries => {
        visible = entries[entries.length - 1].isIntersecting
        sync()
      },
      { threshold: 0 }
    )
    observer.observe(element)
  }

  document.addEventListener('visibilitychange', sync)
  sync()

  return () => {
    stopped = true
    pause()
    observer?.disconnect()
    document.removeEventListener('visibilitychange', sync)
  }
}
