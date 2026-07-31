import type { MetadataRoute } from 'next'
import { getAllProjects } from '@/lib/projects'

const BASE_URL = 'https://webleaders.uz'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      // Nisha sahifasi — o'quv markazlari yo'nalishi bo'yicha asosiy kirish nuqtasi
      url: `${BASE_URL}/oquv-markazlar`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9
    }
  ]

  const projectPages: MetadataRoute.Sitemap = projects.map(p => ({
    url: `${BASE_URL}/portfolio/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7
  }))

  return [...staticPages, ...projectPages]
}
