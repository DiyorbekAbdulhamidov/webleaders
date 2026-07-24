'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, Globe } from 'lucide-react'
import type { Project } from '@/data/projects'
import { useLanguage } from '@/context/LanguageContext'

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const { t, language } = useLanguage()
  const mainImage = project.images?.[0]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (index % 6) * 0.05 }}
      onMouseMove={handleMouseMove}
      className="group relative bg-white/[0.01] rounded-2xl border border-white/[0.08] overflow-hidden transition-all duration-500 hover:border-green-500/30 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-20px_rgba(34,197,94,0.15)]"
    >
      {/* Spotlight hover effekti */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30 bg-[radial-gradient(400px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(34,197,94,0.06),transparent_80%)]" />

      <Link href={`/portfolio/${project.slug}`} className="block" aria-label={`${project.name} — ${t.projects.btnDetails}`}>
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-white/[0.02]">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={`${project.name} — ${project.category[language]}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-700 text-xs font-mono">NO_PREVIEW</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-80" />

          {/* Kategoriya belgisi */}
          <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-md border border-white/[0.08]">
            <span className="text-[10px] font-semibold text-green-400 uppercase tracking-widest">
              {project.category[language].split(' ')[0]}
            </span>
          </div>

          {/* Jonli sayt belgisi */}
          {project.url && (
            <div className="absolute top-4 right-4 px-2.5 py-1 bg-green-500/90 backdrop-blur-md rounded-md flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-black" />
              </span>
              <span className="text-[10px] font-bold text-black uppercase tracking-widest">
                {t.projects.liveBadge}
              </span>
            </div>
          )}
        </div>

        <div className="p-6 relative z-10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors duration-300 line-clamp-1">
              {project.name}
            </h3>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-green-500 group-hover:text-black transition-all duration-300 flex-shrink-0">
              <ArrowUpRight size={16} />
            </div>
          </div>

          <p className="text-gray-400 text-xs line-clamp-2 mb-5 leading-relaxed font-light min-h-8">
            {project.desc[language]}
          </p>

          <div className="flex flex-wrap gap-1.5 border-t border-white/[0.05] pt-4">
            {project.tech.slice(0, 3).map((tech) => (
              <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.03] text-gray-400 border border-white/[0.05] font-mono">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Jonli saytga to'g'ridan-to'g'ri link */}
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 right-6 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-bold text-gray-300 uppercase tracking-wider opacity-0 group-hover:opacity-100 hover:bg-green-500 hover:text-black hover:border-green-500 transition-all duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <Globe size={11} />
          {t.projects.btnView}
        </a>
      )}
    </motion.div>
  )
}
