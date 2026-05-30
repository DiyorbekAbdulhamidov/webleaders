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
    default: 'Webleaders – Professional Web Saytlar va Ilovalar Yaratish',
    template: '%s | Webleaders'
  },
  description: 'Biznesingiz uchun zamonaviy veb saytlar, CRM tizimlari, mukammal Telegram botlar va SMM xizmatlari. Toshkentda professional web studiya. Sifat va tezlik kafolati.',
  keywords: [
    'veb sayt yaratish', 'sayt ochish narxlari', 'CRM tizimi', 'internet magazin ochish',
    'landing page', 'vizitka sayt', 'web studiya toshkent', 'IT xizmatlari',
    'web developers Uzbekistan', 'seo optimizatsiya', 'telegram bot yaratish', 'Webleaders',
    'it kompaniya toshkent', 'avtomatlashtirish'
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
    title: 'Webleaders – Raqamli Yechimlar Markazi',
    description: 'Biznesingizni keyingi bosqichga olib chiquvchi innovatsion va professional IT yechimlar.',
    url: 'https://webleaders.uz',
    siteName: 'Webleaders',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Webleaders IT Company Office and Solutions',
      },
    ],
    locale: 'uz_UZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webleaders – Professional IT Solutions',
    description: 'Biznesingizga professional IT xizmati kerakmi? Bizga murojaat qiling.',
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
    // Google Search Console va Yandex Webmaster kodlarini shu yerga yozasiz
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

// --- 📊 SCHEMA.ORG LOCAL BUSINESS & ORG OPTIMIZATION ---
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService', // IT Agency uchun aniqroq tip
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
    <html lang="uz" className="scroll-smooth">
      <head>
        {/* Next.js tavsiyasiga ko'ra xavfsiz standartlar */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className={`${inter.className} bg-[#0a0a0a] text-white overflow-x-hidden antialiased selection:bg-green-500 selection:text-black`}>
        <LanguageProvider>
          {/* ToastContainer olib tashlandi, chunki har bir formaning o'zida render qilinishi optimalroq */}

          <Header />
          <main className="min-h-screen relative z-10">
            {children}
          </main>
          <Footer />

          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  )
}