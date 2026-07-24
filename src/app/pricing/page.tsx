import type { Metadata } from 'next'
import PricingPage from '@/components/PricingPage'
import FAQSection from '@/components/FAQSection'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'Narxlar — Sayt Yaratish Qancha Turadi?',
  description:
    'Webleaders narxlari: Landing sahifa 1.5 mln so‘mdan, korporativ sayt 4.5 mln so‘mdan, e-commerce va CRM tizimlar 9 mln so‘mdan. Aniq narxlar, yashirin to‘lovlarsiz. Bepul konsultatsiya.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Narxlar — Webleaders',
    description:
      'Sayt yaratish narxlari: Start 1.5 mln, Growth 4.5 mln, Enterprise 9 mln so‘mdan. Yashirin to‘lovlarsiz.',
    url: 'https://webleaders.uz/pricing',
    images: ['/og-image.png']
  }
}

const offersJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Veb-Sayt Yaratish Xizmati',
  provider: { '@id': 'https://webleaders.uz/#organization' },
  areaServed: 'UZ',
  offers: [
    {
      '@type': 'Offer',
      name: 'Start',
      price: '1500000',
      priceCurrency: 'UZS',
      description: 'Premium UI Landing Page, mobil adaptatsiya, 3 ish kunida ishga tushirish'
    },
    {
      '@type': 'Offer',
      name: 'Growth',
      price: '4500000',
      priceCurrency: 'UZS',
      description: 'Korporativ sayt (5+ sahifa), CMS, SEO optimizatsiya, domen va hosting'
    },
    {
      '@type': 'Offer',
      name: 'Enterprise',
      price: '9000000',
      priceCurrency: 'UZS',
      description: 'E-commerce yoki katalog tizimi, to‘lov tizimlari, CRM/ERP integratsiyasi'
    }
  ]
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Sayt qancha vaqtda tayyor bo‘ladi?',
      acceptedAnswer: { '@type': 'Answer', text: 'Landing sahifa — 3-5 ish kuni, korporativ sayt — 2-3 hafta, murakkab tizimlar (CRM, e-commerce) — 1-2 oy.' }
    },
    {
      '@type': 'Question',
      name: 'To‘lov qanday amalga oshiriladi?',
      acceptedAnswer: { '@type': 'Answer', text: 'Odatda 50% oldindan, 50% loyiha topshirilganda. Yirik loyihalarda bosqichma-bosqich to‘lov jadvali tuziladi.' }
    },
    {
      '@type': 'Question',
      name: 'Domen va hosting kimning zimmasida?',
      acceptedAnswer: { '@type': 'Answer', text: 'Growth va Enterprise rejalarida birinchi yil domen va hosting bizdan sovg‘a.' }
    },
    {
      '@type': 'Question',
      name: 'Sayt Google’da chiqadimi?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ha. Barcha saytlarimiz SEO asoslari bilan topshiriladi: texnik optimizatsiya, meta-teglar, sitemap, tezlik.' }
    },
    {
      '@type': 'Question',
      name: 'Tayyor saytga o‘zgartirish kirita olamanmi?',
      acceptedAnswer: { '@type': 'Answer', text: 'CMS boshqaruv paneli orqali matn, rasm va yangiliklarni o‘zingiz boshqarasiz.' }
    }
  ]
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Bosh sahifa', item: 'https://webleaders.uz' },
    { '@type': 'ListItem', position: 2, name: 'Narxlar', item: 'https://webleaders.uz/pricing' }
  ]
}

export default function PricingRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offersJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="bg-black min-h-screen text-white">
        <PricingPage asPage />
        <FAQSection />
        <CTASection />
      </div>
    </>
  )
}
