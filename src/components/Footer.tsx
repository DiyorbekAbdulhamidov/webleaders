'use client'

import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Kompaniya haqida */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Webleaders</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Biz – raqamli yechimlar bo&#39;yicha yetakchi IT kompaniyamiz. Websaytlar,
            CRM tizimlar va brendingda sizning ishonchli hamkoringiz.
          </p>
        </div>

        {/* Sayt bo‘limlari */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Sayt bo‘limlari</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <a href="#services" className="hover:text-white transition">Xizmatlar</a>
            </li>
            <li>
              <a href="#portfolio" className="hover:text-white transition">Portfolio</a>
            </li>
            <li>
              <a href="#team" className="hover:text-white transition">Jamoa</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white transition">Bog&#39;lanish</a>
            </li>
          </ul>
        </div>

        {/* Aloqa */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Aloqa</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-400" />
              +998 20 012 77 07
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-400" />
              +998 20 000 00 00
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-green-400" />
              webleaders@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-400" />
              O&#39;zbekiston, Toshkent
            </li>
          </ul>
        </div>

        {/* Ijtimoiy tarmoqlar */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Bizni kuzating</h3>
          <div className="flex gap-4 text-gray-400">
            <a href="#" className="hover:text-white transition duration-200">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition duration-200">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition duration-200">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Pastki chiziq */}
      <div className="mt-12 text-center text-gray-500 text-sm border-t border-white/10 pt-6">
        © 2025 Webleaders. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  )
}
