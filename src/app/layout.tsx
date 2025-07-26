import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Webleaders – Professional Web Saytlar va CRM Yaratish Xizmati',
  description: 'Webleaders — biznesingiz uchun zamonaviy veb saytlar, CRM tizimlari va brend imidjini mustahkamlovchi yechimlar. Tajribali jamoamiz bilan siz ham raqamli dunyoda o‘z o‘rningizni egallang!',
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
  openGraph: {
    title: 'Webleaders – Veb Sayt va CRM Yaratish',
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
    title: 'Webleaders – IT va Web Solutions',
    description: 'Biznesingizga professional veb sayt va CRM kerakmi? Bizga murojaat qiling.',
    images: ['/og-image.jpg'],
  },
  metadataBase: new URL('https://webleaders.uz'),
};


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
