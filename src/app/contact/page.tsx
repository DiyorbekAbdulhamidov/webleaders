import type { Metadata } from 'next'
import Contact from '@/components/Contact'
import FAQSection from '@/components/FAQSection'

export const metadata: Metadata = {
  title: 'Aloqa — Buyurtma Berish va Bepul Konsultatsiya',
  description:
    'Webleaders bilan bog‘laning: +998 20 012 77 07, info@webleaders.uz, Telegram @webleaders_uz. Toshkent sh., Yashnobod tumani. Loyihangizni 15 daqiqada muhokama qilamiz — bepul konsultatsiya.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Aloqa — Webleaders',
    description:
      'Loyihangiz bormi? 15 daqiqada aloqaga chiqamiz. Tel: +998 20 012 77 07',
    url: 'https://webleaders.uz/contact',
    images: ['/og-image.png']
  }
}

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Webleaders — Aloqa',
  url: 'https://webleaders.uz/contact',
  mainEntity: { '@id': 'https://webleaders.uz/#organization' }
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Bosh sahifa', item: 'https://webleaders.uz' },
    { '@type': 'ListItem', position: 2, name: 'Aloqa', item: 'https://webleaders.uz/contact' }
  ]
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="bg-black min-h-screen text-white">
        <Contact asPage />
        <FAQSection />
      </div>
    </>
  )
}
