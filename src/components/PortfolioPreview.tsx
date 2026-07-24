'use client'

import Link from 'next/link'
import { Grid3X3, ArrowRight } from 'lucide-react'
import type { Project } from '@/data/projects'
import { useLanguage } from '@/context/LanguageContext'
import ProjectCard from './ProjectCard'

export default function PortfolioPreview({ projects }: { projects: Project[] }) {
  const { t } = useLanguage()

  return (
    <section id="projects" className="relative py-24 bg-black text-white overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-900/[0.06] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Sarlavha */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <div className="flex items-center gap-2 text-green-400 mb-3">
              <Grid3X3 size={16} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">{t.projects.badge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              {t.projects.title} <span className="text-green-500">{t.projects.subtitle}</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-md font-light leading-relaxed">
            {t.projects.desc}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* Hammasini ko'rish */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 text-white font-semibold text-sm hover:border-green-500/50 hover:bg-green-500/[0.05] transition-all duration-300"
          >
            {t.projects.btnAll}
            <ArrowRight size={16} className="text-green-400 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
