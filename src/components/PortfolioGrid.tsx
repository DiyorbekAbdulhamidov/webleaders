'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Grid3X3 } from 'lucide-react'
import type { Project } from '@/data/projects'
import { useLanguage } from '@/context/LanguageContext'
import ProjectCard from './ProjectCard'

/** Kategoriya nomidan filtr kaliti yasaymiz (til-agnostik guruhlash uchun) */
function categoryKey(p: Project): string {
  const en = p.category.EN.toLowerCase()
  if (en.includes('e-commerce') || en.includes('market')) return 'ecommerce'
  if (en.includes('crm') || en.includes('erp') || en.includes('booking')) return 'crm'
  if (en.includes('educational') || en.includes('lms') || en.includes('school')) return 'education'
  if (en.includes('landing')) return 'landing'
  return 'web'
}

const filterLabels: Record<string, { UZ: string; RU: string; EN: string }> = {
  web: { UZ: 'Veb-Saytlar', RU: 'Веб-сайты', EN: 'Websites' },
  ecommerce: { UZ: 'E-Commerce', RU: 'E-Commerce', EN: 'E-Commerce' },
  crm: { UZ: 'CRM / ERP', RU: 'CRM / ERP', EN: 'CRM / ERP' },
  education: { UZ: 'Ta’lim', RU: 'Образование', EN: 'Education' },
  landing: { UZ: 'Landing', RU: 'Лендинги', EN: 'Landing' }
}

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const { t, language } = useLanguage()
  const [filter, setFilter] = useState<string>('all')

  const categories = useMemo(() => {
    const keys = new Set(projects.map(categoryKey))
    return ['all', ...Array.from(keys)]
  }, [projects])

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => categoryKey(p) === filter)

  return (
    <section className="relative pt-36 pb-24 bg-black text-white overflow-hidden min-h-screen">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-green-900/[0.07] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Sarlavha */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-[0.2em] mb-5"
          >
            <Grid3X3 size={13} />
            {t.projects.badge}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-5"
          >
            {t.projects.title} <span className="text-green-500">{t.projects.subtitle}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg font-light"
          >
            {t.projects.desc}
          </motion.p>
        </div>

        {/* Filtrlar */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${filter === cat
                ? 'bg-green-500 text-black border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                : 'bg-white/[0.02] text-gray-400 border-white/[0.08] hover:border-green-500/40 hover:text-white'
                }`}
            >
              {cat === 'all' ? t.projects.filterAll : filterLabels[cat]?.[language] ?? cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-20 font-mono text-sm">Loyihalar topilmadi</p>
        )}
      </div>
    </section>
  )
}
