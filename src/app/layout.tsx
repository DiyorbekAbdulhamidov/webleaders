import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingContact from '@/components/FloatingContact'
import { Analytics } from '@vercel/analytics/react'
import { LanguageProvider } from '@/context/LanguageContext'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
const grotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap', variable: '--font-grotesk' })

export const metadata: Metadata = {
  title: {
    default: 'Webleaders — Sayt Yaratish, CRM va Mobil Ilovalar | Toshkent',
    template: '%s | Webleaders'
  },
  description:
    'Webleaders — Toshkentda professional sayt yaratish, CRM/ERP tizimlar, mobil ilovalar va SEO xizmatlari. Sotuvga ishlaydigan zamonaviy veb-yechimlar. Bepul konsultatsiya: +998 20 012 77 07.',
  keywords: [
    'sayt yaratish',
    'sayt yasash toshkent',
    'veb sayt buyurtma qilish',
    'landing page yaratish',
    'CRM tizim yaratish',
    'mobil ilova yaratish',
    'SEO xizmati toshkent',
    'internet magazin yaratish',
    'создание сайтов ташкент',
    'разработка сайтов узбекистан',
    'web development uzbekistan',
    'IT kompaniya toshkent'
  ],
  authors: [{ name: 'Webleaders Team', url: 'https://webleaders.uz' }],
  creator: 'Webleaders',
  publisher: 'Webleaders',
  metadataBase: new URL('https://webleaders.uz'),
  alternates: {
    canonical: '/'
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-96x96.png',
    apple: '/apple-touch-icon.png'
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Webleaders — Sayt Yaratish, CRM va Mobil Ilovalar',
    description:
      'Sotuvga ishlaydigan saytlar, CRM tizimlar va mobil ilovalar. Zamonaviy dizayn, yuqori tezlik va Google’da yuqori o‘rinlar.',
    url: 'https://webleaders.uz',
    siteName: 'Webleaders',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Webleaders — Professional Veb Yechimlar'
      }
    ],
    locale: 'uz_UZ',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webleaders — Sayt Yaratish, CRM va Mobil Ilovalar',
    description:
      'Sotuvga ishlaydigan saytlar, CRM tizimlar va mobil ilovalar — bitta jamoadan.',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  referrer: 'strict-origin-when-cross-origin',
  other: {
    'geo.region': 'UZ-TO',
    'geo.placename': 'Tashkent',
    'geo.position': '41.2995;69.2401',
    ICBM: '41.2995, 69.2401',
    'format-detection': 'telephone=no'
  }
}

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://webleaders.uz/#organization',
  name: 'Webleaders',
  alternateName: 'Webleaders Web Studio',
  description:
    'Toshkentda professional sayt yaratish, CRM/ERP tizimlar, mobil ilovalar va SEO xizmatlari.',
  image: 'https://webleaders.uz/og-image.png',
  logo: 'https://webleaders.uz/logo.png',
  url: 'https://webleaders.uz',
  telephone: '+998-20-012-77-07',
  email: 'info@webleaders.uz',
  priceRange: '$$',
  sameAs: [
    'https://www.instagram.com/webleaders.uz/',
    'https://www.linkedin.com/company/106364349/',
    'https://t.me/webleaders_uz'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+998-20-012-77-07',
    contactType: 'customer service',
    areaServed: 'UZ',
    availableLanguage: ['Uzbek', 'Russian', 'English']
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Yashnobod tumani',
    addressLocality: 'Toshkent',
    addressRegion: 'Toshkent shahri',
    postalCode: '100000',
    addressCountry: 'UZ'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.2995,
    longitude: 69.2401
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '19:00'
  }
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://webleaders.uz/#website',
  url: 'https://webleaders.uz',
  name: 'Webleaders',
  publisher: { '@id': 'https://webleaders.uz/#organization' },
  inLanguage: 'uz'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz" className={`scroll-smooth ${inter.variable} ${grotesk.variable}`} suppressHydrationWarning>
      <body className={`${inter.className} bg-[#050505] text-white antialiased selection:bg-green-500 selection:text-black`}>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />

        <LanguageProvider>
          <Header />
          <main className="min-h-screen relative z-10 overflow-x-hidden">
            {children}
          </main>
          <Footer />
          <FloatingContact />
          <Analytics />
        </LanguageProvider>

      </body>
    </html>
  )
}
