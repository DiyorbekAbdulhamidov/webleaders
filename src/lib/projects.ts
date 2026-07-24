import { staticProjects, type Project, type LocalizedText } from '@/data/projects'
import { readPortfolio } from './portfolio-store'

/**
 * Statik (repo ichidagi) va dinamik (Telegram bot orqali qo'shilgan)
 * loyihalarni yagona ro'yxatga birlashtiradi. Dinamik loyihalar oldinda turadi.
 */
export async function getAllProjects(): Promise<Project[]> {
  try {
    const dynamic = await readPortfolio()
    const dynamicProjects = (dynamic.projects || []).map(normalizeProject)
    const staticFiltered = staticProjects.filter(
      s => !dynamicProjects.some(d => d.slug === s.slug)
    )
    return [...dynamicProjects, ...staticFiltered]
  } catch {
    return staticProjects
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const all = await getAllProjects()
  return all.find(p => p.slug === slug)
}

export async function getFeaturedProjects(limit = 6): Promise<Project[]> {
  const all = await getAllProjects()
  const featured = all.filter(p => p.featured)
  const rest = all.filter(p => !p.featured)
  return [...featured, ...rest].slice(0, limit)
}

/** Bot bir tilda kiritgan matnlarni 3 tilga normallashtiradi. */
function normalizeProject(p: Partial<Project> & { slug: string; name: string }): Project {
  return {
    slug: p.slug,
    name: p.name,
    category: toLocalized(p.category, 'Web Loyiha'),
    desc: toLocalized(p.desc, ''),
    longDesc: toLocalized(p.longDesc ?? p.desc, ''),
    tech: p.tech || [],
    images: p.images || [],
    url: p.url,
    year: p.year || new Date().getFullYear(),
    featured: p.featured ?? true
  }
}

function toLocalized(value: LocalizedText | string | undefined, fallback: string): LocalizedText {
  if (!value) return { UZ: fallback, RU: fallback, EN: fallback }
  if (typeof value === 'string') return { UZ: value, RU: value, EN: value }
  return value
}
