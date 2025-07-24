// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Webleaders – IT Solutions',
  description: 'Professional web development company in Uzbekistan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen px-4 md:px-20 pt-20 bg-white text-gray-800">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
