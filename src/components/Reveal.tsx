'use client'

import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

/**
 * Scroll bilan paydo bo'ladigan blok — framer-motion'ning `whileInView` o'rniga.
 *
 * Nega: framer-motion bosh sahifaga 41 KB (gz) JS qo'shardi va har bir
 * animatsiyalangan element uchun alohida kuzatuvchi hamda JS animatsiya tsikli
 * ochardi. Bu yerda butun sayt bo'ylab BITTA IntersectionObserver ishlaydi,
 * animatsiyani esa CSS (`.wl-in` globals.css ichida) bajaradi — ya'ni
 * kompozitor oqimida, asosiy thread'ni band qilmasdan.
 *
 * Element bir marta ko'ringach kuzatuvdan chiqariladi.
 */

let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null
  if (observer) return observer

  observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.setAttribute('data-shown', '')
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -40px 0px', threshold: 0.01 }
  )

  return observer
}

type Variant = 'up' | 'left' | 'right' | 'zoom'

const variantClass: Record<Variant, string> = {
  up: '',
  left: 'wl-in-left',
  right: 'wl-in-right',
  zoom: 'wl-in-zoom'
}

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode
  /** Qaysi HTML tegi sifatida chiqsin (default: div) */
  as?: ElementType
  /** Animatsiya boshlanish kechikishi, sekundda */
  delay?: number
  variant?: Variant
}

export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  variant = 'up',
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = getObserver()
    if (!io) {
      // IntersectionObserver yo'q (juda eski brauzer) — darhol ko'rsatamiz
      el.setAttribute('data-shown', '')
      return
    }

    io.observe(el)
    return () => io.unobserve(el)
  }, [])

  return (
    <Tag
      ref={ref}
      className={`wl-in ${variantClass[variant]} ${className}`.trim()}
      style={delay ? { ...style, ['--wl-delay' as string]: `${delay}s` } : style}
      {...rest}
    >
      {children}
    </Tag>
  )
}
