'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Layers, Calendar, ArrowUpRight, Globe } from 'lucide-react'
import type { Project } from '@/data/projects'
import { useLanguage } from '@/context/LanguageContext'
import ProjectCard from './ProjectCard'

export default function ProjectDetail({ project, others }: { project: Project; others: Project[] }) {
  const { t, language } = useLanguage()

  return (
    <article className="relative pt-32 pb-24 bg-black text-white overflow-hidden min-h-screen">
      <div className="absolute top-0 left-1/3 w-[600px] h-[500px] bg-green-900/[0.07] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Orqaga */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 text-sm font-medium transition-colors mb-10 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          {t.projects.detail.back}
        </Link>

        <div className="grid lg:grid-cols-5 gap-12 mb-20">

          {/* Chap — ma'lumot */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-2 text-green-400 mb-4">
                <Layers size={14} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">{project.category[language]}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                {project.name}
              </h1>

              <div className="flex items-center gap-4 mb-8 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} /> {project.year}
                </span>
                {project.url && (
                  <span className="flex items-center gap-1.5 text-green-400">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    {t.projects.liveBadge}
                  </span>
                )}
              </div>

              <div className="mb-8">
                <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">
                  {t.projects.detail.overview}
                </h2>
                <p className="text-gray-300 text-base leading-relaxed font-light">
                  {project.longDesc[language]}
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">
                  {t.projects.detail.stack}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(tech => (
                    <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs text-gray-300 font-mono hover:border-green-500/30 hover:bg-white/[0.04] transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full py-4 rounded-xl bg-green-500 text-black font-bold text-sm hover:bg-green-400 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(34,197,94,0.3)]"
                  >
                    <Globe size={16} />
                    {t.projects.detail.visit}
                    <ExternalLink size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
                <Link
                  href={`/contact?ref=${project.slug}`}
                  className="group w-full py-4 rounded-xl border border-white/10 text-white font-semibold text-sm hover:border-green-500/40 hover:bg-white/[0.03] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {t.projects.detail.orderSimilar}
                  <ArrowUpRight size={15} className="text-green-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* O'ng — galereya */}
          <div className="lg:col-span-3">
            <h2 className="sr-only">{t.projects.detail.gallery}</h2>
            <div className="flex flex-col gap-5">
              {project.images.map((img, i) => (
                <motion.div
                  key={img}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0d0d0d] group"
                >
                  <Image
                    src={img}
                    alt={`${project.name} — ${t.projects.detail.gallery} ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    priority={i === 0}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Boshqa loyihalar */}
        {others.length > 0 && (
          <div className="border-t border-white/[0.06] pt-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-10">
              {t.projects.detail.other}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.slice(0, 3).map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
