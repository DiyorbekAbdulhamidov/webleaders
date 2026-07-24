import type { Metadata } from 'next'
import PortfolioGrid from '@/components/PortfolioGrid'
import CTASection from '@/components/CTASection'
import { getAllProjects } from '@/lib/projects'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Portfolio — Amalga Oshirilgan Loyihalar',
  description:
    'Webleaders portfoliosi: real biznesga xizmat qilayotgan saytlar, CRM tizimlar, e-commerce platformalar va mobil ilovalar. Hilal Edu, Lutsente, Adizone, Zarnigor va boshqa jonli loyihalar.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio — Webleaders',
    description:
      'Real biznesga xizmat qilayotgan jonli loyihalar: saytlar, CRM tizimlar, e-commerce platformalar.',
    url: 'https://webleaders.uz/portfolio',
    images: ['/og-image.png']
  }
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Bosh sahifa', item: 'https://webleaders.uz' },
    { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://webleaders.uz/portfolio' }
  ]
}

export default async function PortfolioPage() {
  const projects = await getAllProjects()

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Webleaders Portfolio',
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `https://webleaders.uz/portfolio/${p.slug}`
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="bg-black min-h-screen text-white">
        <PortfolioGrid projects={projects} />
        <CTASection />
      </div>
    </>
  )
}
