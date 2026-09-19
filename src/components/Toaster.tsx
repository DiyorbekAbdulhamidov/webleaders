'use client'

import { useSyncExternalStore } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

/**
 * Yengil toast tizimi — `react-toastify` o'rniga.
 *
 * Nega almashtirildi:
 *  - react-toastify bosh sahifaga 47 KB JS + 14 KB CSS qo'shardi, holbuki
 *    saytda uning atigi 3 ta chaqiruvi bor: success / error / warning.
 *  - Uning CSS fayli faqat PricingPage ichida import qilingan edi, shuning
 *    uchun `/contact` sahifasida toastlar stilsiz chiqardi.
 *
 * Bu modul ~2 KB va saytning o'z dizayniga mos.
 */

type ToastKind = 'success' | 'error' | 'warning'

interface ToastItem {
  id: number
  kind: ToastKind
  message: string
}

type Listener = () => void

const EMPTY: ToastItem[] = []

let items: ToastItem[] = EMPTY
let nextId = 1
const listeners = new Set<Listener>()

function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

const getSnapshot = () => items
// Serverda toast bo'lmaydi — hydration mos kelishi uchun doimo bo'sh
const getServerSnapshot = () => EMPTY

function emit() {
  for (const listener of listeners) listener()
}

function push(kind: ToastKind, message: string) {
  const id = nextId++
  items = [...items, { id, kind, message }]
  emit()
  setTimeout(() => dismiss(id), 4500)
  return id
}

function dismiss(id: number) {
  const next = items.filter(i => i.id !== id)
  if (next.length === items.length) return
  items = next.length ? next : EMPTY
  emit()
}

export const toast = {
  success: (message: string) => push('success', message),
  error: (message: string) => push('error', message),
  warning: (message: string) => push('warning', message)
}

const styles: Record<ToastKind, { ring: string; icon: React.ReactNode }> = {
  success: {
    ring: 'border-green-500/40',
    icon: <CheckCircle2 size={18} className="text-green-400 flex-shrink-0" />
  },
  error: {
    ring: 'border-red-500/40',
    icon: <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
  },
  warning: {
    ring: 'border-yellow-500/40',
    icon: <Info size={18} className="text-yellow-400 flex-shrink-0" />
  }
}

export default function Toaster() {
  const list = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  if (list.length === 0) return null

  return (
    <div
      className="fixed bottom-4 right-4 left-4 sm:left-auto z-[10000] flex flex-col gap-2 items-stretch sm:items-end pointer-events-none"
      role="status"
      aria-live="polite"
    >
      {list.map(item => (
        <div
          key={item.id}
          className={`animate-fade-in-up pointer-events-auto flex items-center gap-3 w-full sm:w-auto sm:max-w-sm px-4 py-3.5 rounded-2xl bg-[#0a0a0a] border text-sm text-gray-200 shadow-[0_12px_40px_rgba(0,0,0,0.6)] ${styles[item.kind].ring}`}
        >
          {styles[item.kind].icon}
          <span className="flex-1 leading-snug">{item.message}</span>
          <button
            onClick={() => dismiss(item.id)}
            aria-label="Yopish"
            className="p-1 -mr-1 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
