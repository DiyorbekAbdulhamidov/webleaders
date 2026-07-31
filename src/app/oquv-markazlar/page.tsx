import type { Metadata } from 'next'
import EduCenterLanding from '@/components/EduCenterLanding'

export const metadata: Metadata = {
  title: 'O‘quv Markazlari Uchun Sayt va CRM Tizim',
  description:
    'Toshkentdagi o‘quv markazlari uchun sayt, qabul formasi va talaba/to‘lov hisobi tizimi. Vizitka 2.5 mln, Markaz+ 6.5 mln, to‘liq avtomatlashtirish 14 mln so‘mdan. Hilal Edu va Adizone loyihalari mualliflaridan.',
  keywords: [
    'o‘quv markaz uchun sayt',
    'oquv markaz sayt yaratish',
    'ta’lim markazi sayti',
    'o‘quv markaz CRM',
    'talaba hisobi dasturi',
    'o‘quv markaz avtomatlashtirish',
    'сайт для учебного центра ташкент',
    'CRM для учебного центра'
  ],
  alternates: { canonical: '/oquv-markazlar' },
  openGraph: {
    title: 'O‘quv Markazlari Uchun Sayt va CRM — Webleaders',
    description:
      'Ariza tungi soat 3 da ham qabul qilinadi, Telegramingizga tushadi va panelda hisobga olinadi. Hilal Edu va Adizone mualliflaridan.',
    url: 'https://webleaders.uz/oquv-markazlar',
    images: ['/og-image.png']
  }
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'O‘quv markazlari uchun sayt va CRM tizim yaratish',
  serviceType: 'Veb-sayt va CRM ishlab chiqish',
  provider: { '@id': 'https://webleaders.uz/#organization' },
  areaServed: { '@type': 'City', name: 'Toshkent' },
  audience: { '@type': 'Audience', audienceType: 'O‘quv markazlari va ta’lim muassasalari' },
  offers: [
    {
      '@type': 'Offer',
      name: 'Vizitka',
      price: '2500000',
      priceCurrency: 'UZS',
      description: 'Bir sahifali landing, qabul formasi, Telegram bildirishnoma, 5 ish kunida ishga tushirish'
    },
    {
      '@type': 'Offer',
      name: 'Markaz+',
      price: '6500000',
      priceCurrency: 'UZS',
      description: 'Ko‘p sahifali sayt, boshqaruv paneli, lidlar CRM‘i, SEO, domen va hosting'
    },
    {
      '@type': 'Offer',
      name: 'Avtomatlashtirish',
      price: '14000000',
      priceCurrency: 'UZS',
      description: 'Talaba, guruh, davomat va to‘lov hisobi, Telegram bot, rollar tizimi'
    }
  ]
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Bizda Instagram bor, sayt nimaga kerak?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Instagram — ijara maydon: algoritm o‘zgarsa yoki sahifa bloklansa, auditoriya bilan bog‘lanish yo‘qoladi. Sayt esa sizniki. Ustiga, Google‘da kurs qidirayotgan odam Instagram sahifangizga tushmaydi — u faqat saytlarni ko‘radi.'
      }
    },
    {
      '@type': 'Question',
      name: 'Panelni administratorimiz ishlata oladimi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ha. Panel sodda qilib quriladi, topshirishda administratoringizga jonli o‘rgatamiz va video-yo‘riqnoma qoldiramiz.'
      }
    },
    {
      '@type': 'Question',
      name: 'O‘quv markazi uchun sayt qancha turadi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vizitka paketi 2.5 mln so‘mdan (5 ish kuni), Markaz+ 6.5 mln so‘mdan (2–3 hafta), to‘liq avtomatlashtirish 14 mln so‘mdan (4–6 hafta).'
      }
    },
    {
      '@type': 'Question',
      name: 'To‘lov qanday amalga oshiriladi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Odatda 50% ishni boshlashda, 50% topshirishda. Avtomatlashtirish paketida bosqichma-bosqich jadval tuziladi.'
      }
    },
    {
      '@type': 'Question',
      name: 'Keyinchalik yangi kurs qo‘sha olamanmi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Markaz+ va Avtomatlashtirish paketlarida kurs, narx, o‘qituvchi va yangilikni panel orqali o‘zingiz qo‘shasiz.'
      }
    }
  ]
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Bosh sahifa', item: 'https://webleaders.uz' },
    { '@type': 'ListItem', position: 2, name: 'O‘quv markazlari uchun', item: 'https://webleaders.uz/oquv-markazlar' }
  ]
}

export default function OquvMarkazlarRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <EduCenterLanding />
    </>
  )
}
