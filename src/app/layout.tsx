import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Analytics } from "@vercel/analytics/react"
import { ToastContainer } from 'react-toastify'
import { LanguageProvider } from '@/context/LanguageContext'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'Webleaders – Professional Web Saytlar va Ilovalar yaratish xizmati',
    template: '%s | Webleaders'
  },
  description: 'Biznesingiz uchun zamonaviy veb saytlar, CRM tizimlari va SMM xizmatlari. Toshkentda professional web studiya. Sifat, tezlik va xavfsizlik kafolati.',
  keywords: [
    'veb sayt yaratish', 'sayt ochish narxlari', 'CRM tizimi', 'internet magazin ochish',
    'landing page', 'vizitka sayt', 'web studiya toshkent', 'IT xizmatlari',
    'web developers Uzbekistan', 'seo optimizatsiya', 'telegram bot yaratish', 'Webleaders'
  ],
  authors: [{ name: 'Webleaders Team', url: 'https://webleaders.uz' }],
  creator: 'Webleaders Web Studio',
  publisher: 'Webleaders',
  metadataBase: new URL('https://webleaders.uz'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Webleaders – Raqamli Yechimlar Markazi',
    description: 'Biznesingizni keyingi bosqichga olib chiquvchi innovatsion IT yechimlar.',
    url: 'https://webleaders.uz',
    siteName: 'Webleaders',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Webleaders IT Company',
      },
    ],
    locale: 'uz_UZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webleaders – IT Solutions',
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

  other: {
    'geo.region': 'UZ-TO',
    'geo.placename': 'Tashkent',
    'geo.position': '41.2995;69.2401',
    'ICBM': '41.2995, 69.2401'
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
  '@type': 'Organization',
  name: 'Webleaders',
  url: 'https://webleaders.uz',
  logo: 'https://webleaders.uz/logo.png',
  sameAs: [
    'https://www.instagram.com/webleaders.uz/',
    'https://www.linkedin.com/company/webleaders/',
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
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>


      <body className={`${inter.className} bg-[#0a0a0a] text-white overflow-x-hidden antialiased selection:bg-green-500 selection:text-black`}>
        <LanguageProvider>
          <ToastContainer
            position="bottom-right"
            theme="dark"
            toastStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
          />

          <Header />
          <main className="min-h-screen relative z-10">
            {children}
          </main>
          <Analytics />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}