import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Analytics } from "@vercel/analytics/react"
import { LanguageProvider } from '@/context/LanguageContext'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'Webleaders — Korporativ Dasturiy Muhandislik va Raqamli Transformatsiya',
    template: '%s | Webleaders'
  },
  description: 'Yirik korxonalar va korporativ sektor uchun yuqori yuklamalarga chidamli (high-load) ekotizimlar, ERP/CRM platformalari va strategik raqamli infratuzilmalarni loyihalashtirish hamda integratsiya qilish.',
  referrer: 'strict-origin-when-cross-origin',
  keywords: [
    'dasturiy ta’minot ishlab chiqish',
    'korporativ tizimlar muhandisligi',
    'ERP integratsiyasi',
    'CRM tizimlari toshkent',
    'high load platformalar',
    'raqamli transformatsiya',
    'biznes jarayonlarini avtomatlashtirish',
    'enterprise software uzbekistan',
    'it konsalting toshkent',
    'Next.js korporativ yechimlar',
    'kiberxavfsizlik auditi',
    'operatsion samaradorlik'
  ],
  authors: [{ name: 'Webleaders Team', url: 'https://webleaders.uz' }],
  creator: 'Webleaders Web Studio',
  publisher: 'Webleaders',
  metadataBase: new URL('https://webleaders.uz'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Webleaders — Biznes uchun Barqaror Raqamli Infratuzilma',
    description: 'Operatsion samaradorlikni oshirish, resurslarni optimallashtirish va bozorda dominantlikni ta’minlovchi korporativ dasturiy yechimlar.',
    url: 'https://webleaders.uz',
    siteName: 'Webleaders',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Webleaders Enterprise Digital Solutions Architecture',
      },
    ],
    locale: 'uz_UZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webleaders — Enterprise Software Engineering',
    description: 'Korporativ jarayonlarni avtomatlashtirish va biznesning raqamli yetukligini ta’minlovchi muhandislik yechimlari.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code-here',
    yandex: 'yandex-verification-code-here',
  },
  other: {
    'geo.region': 'UZ-TO',
    'geo.placename': 'Tashkent',
    'geo.position': '41.2995;69.2401',
    'ICBM': '41.2995, 69.2401',
    'format-detection': 'telephone=no'
  }
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Webleaders',
  image: 'https://webleaders.uz/og-image.png',
  '@id': 'https://webleaders.uz/#organization',
  url: 'https://webleaders.uz',
  telephone: '+998-20-012-77-07',
  priceRange: '$$',
  logo: 'https://webleaders.uz/logo.png',
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
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#0a0a0a] text-white antialiased selection:bg-green-500 selection:text-black`}>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <LanguageProvider>
          <Header />
          <main className="min-h-screen relative z-10 overflow-x-hidden">
            {children}
          </main>
          <Footer />
          <Analytics />
        </LanguageProvider>

      </body>
    </html>
  )
}