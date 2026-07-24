import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProjectDetail from '@/components/ProjectDetail'
import CTASection from '@/components/CTASection'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import { staticProjects } from '@/data/projects'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  return staticProjects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: 'Loyiha topilmadi' }

  return {
    title: `${project.name} — ${project.category.UZ}`,
    description: project.desc.UZ,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: `${project.name} — Webleaders Portfolio`,
      description: project.desc.UZ,
      url: `https://webleaders.uz/portfolio/${project.slug}`,
      images: project.images[0] ? [project.images[0]] : ['/og-image.png'],
      type: 'article'
    }
  }
}

export default async function ProjectPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const all = await getAllProjects()
  const others = all.filter(p => p.slug !== project.slug)

  const creativeWorkJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.longDesc.UZ,
    image: project.images.map(img => `https://webleaders.uz${img}`),
    dateCreated: `${project.year}`,
    creator: { '@id': 'https://webleaders.uz/#organization' },
    ...(project.url ? { url: project.url } : {}),
    keywords: project.tech.join(', ')
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Bosh sahifa', item: 'https://webleaders.uz' },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://webleaders.uz/portfolio' },
      { '@type': 'ListItem', position: 3, name: project.name, item: `https://webleaders.uz/portfolio/${project.slug}` }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="bg-black min-h-screen text-white">
        <ProjectDetail project={project} others={others} />
        <CTASection />
      </div>
    </>
  )
}
