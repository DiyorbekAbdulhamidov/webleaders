import type { Metadata } from 'next'
import ServicesSection from '@/components/ServiceSection'
import ProcessSection from '@/components/ProcessSection'
import WhyChooseUs from '@/components/MyChooseUs'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'Xizmatlar — Sayt Yaratish, CRM, Mobil Ilova, SEO',
  description:
    'Webleaders xizmatlari: professional veb-sayt yaratish, mobil ilovalar (iOS/Android), CRM/ERP tizimlar, SEO optimizatsiya, e-commerce va texnik qo‘llab-quvvatlash. Toshkent bo‘ylab va butun O‘zbekistonda.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Xizmatlar — Webleaders',
    description:
      'Veb-sayt yaratish, mobil ilovalar, CRM/ERP tizimlar, SEO va e-commerce yechimlar.',
    url: 'https://webleaders.uz/services',
    images: ['/og-image.png']
  }
}

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Webleaders Xizmatlari',
  url: 'https://webleaders.uz/services',
  provider: { '@id': 'https://webleaders.uz/#organization' },
  itemListElement: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Veb-Sayt Yaratish', description: 'Sotuvga yo‘naltirilgan landing va korporativ saytlar' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobil Ilovalar', description: 'iOS va Android uchun native va cross-platform ilovalar' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CRM / ERP Tizimlar', description: 'Biznes jarayonlarini avtomatlashtirish tizimlari' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO Optimizatsiya', description: 'Google va Yandex’da yuqori o‘rinlar uchun optimizatsiya' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'E-Commerce', description: 'Onlayn do‘kon va marketpleyslar, to‘lov tizimlari integratsiyasi' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Texnik Qo‘llab-quvvatlash', description: '24/7 monitoring va doimiy rivojlantirish' } }
  ]
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Bosh sahifa', item: 'https://webleaders.uz' },
    { '@type': 'ListItem', position: 2, name: 'Xizmatlar', item: 'https://webleaders.uz/services' }
  ]
}

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="bg-black min-h-screen text-white">
        <ServicesSection asPage />
        <ProcessSection />
        <WhyChooseUs />
        <CTASection />
      </div>
    </>
  )
}
