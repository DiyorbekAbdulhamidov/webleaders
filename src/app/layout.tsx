import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Webleaders – Professional Web Saytlar va ilovalar Yaratish Xizmati',
  description:
    'Webleaders — biznesingiz uchun zamonaviy veb saytlar, CRM tizimlari va brend imidjini mustahkamlovchi yechimlar. Tajribali jamoamiz bilan siz ham raqamli dunyoda o‘z o‘rningizni egallang!',
  keywords: [
    'veb sayt yaratish',
    'CRM tizimi',
    'veb dizayn',
    'digital marketing',
    'frontend backend',
    'web developers Uzbekistan',
    'IT kompaniya',
    'professional sayt tayyorlash',
    'zamonaviy sayt',
    'nextjs sayt',
    'seo optimizatsiya',
    'brend uchun sayt',
    'tailwind dizayn',
    'freelancer web developers',
    'Uzbekistan web kompaniya'
  ],
  metadataBase: new URL('https://webleaders.uz'),
  openGraph: {
    title: 'Webleaders – Web Sayt va Ilovalar yaratish xizmati!',
    description: 'Tajribali jamoa bilan biznesingizga mos zamonaviy web yechimlar.',
    url: 'https://webleaders.uz',
    siteName: 'Webleaders',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Webleaders sayt preview rasmi',
      },
    ],
    locale: 'uz_UZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webleaders – IT Solutions',
    description: 'Biznesingizga professional IT xizmati kerakmi? Bizga murojaat qiling.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz">
      <body className={`${inter.className} overflow-x-hidden bg-white text-gray-800`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
