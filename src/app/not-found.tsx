import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      <span className="text-[120px] md:text-[180px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-green-500/60 to-green-500/5 select-none">
        404
      </span>
      <h1 className="text-2xl md:text-3xl font-bold mb-3">Sahifa topilmadi</h1>
      <p className="text-gray-400 text-sm md:text-base mb-8 max-w-md">
        Siz izlagan sahifa mavjud emas yoki ko‘chirilgan. Bosh sahifaga qaytib, kerakli bo‘limni toping.
      </p>
      <Link
        href="/"
        className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-green-500 text-black font-bold text-sm hover:bg-green-400 transition-all duration-300 shadow-[0_4px_25px_rgba(34,197,94,0.3)]"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        Bosh sahifaga qaytish
      </Link>
    </div>
  )
}
