import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400, // 31 kun — portfolio rasmlari kam o'zgaradi
    // Portfolio kartalari eng kattasi ~840px bo'lib chiqadi. Keraksiz katta
    // o'lchamlarni ro'yxatdan olib tashlasak, Next har bir rasmni kamroq
    // variantda qayta ishlaydi va birinchi so'rov tezroq javob qaytaradi.
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600],
    imageSizes: [64, 96, 128, 256, 384]
  },

  experimental: {
    // Ushbu paketlardan faqat ishlatilgan ikonka/funksiyalar bundle'ga tushadi
    optimizePackageImports: ['lucide-react']
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
        ]
      },
      {
        // public/ ichidagi statik rasmlar odatda `cache-control: max-age=0` bilan
        // beriladi — ya'ni har bir tashrifda qaytadan so'raladi. Bu fayllar
        // deyarli o'zgarmaydi, shuning uchun uzoq muddatli kesh qo'yamiz.
        source: '/:dir(projects|discounts|uploads)/:file*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      },
      {
        source: '/:file(logo.png|og-image.png|favicon.ico|favicon-96x96.png|apple-touch-icon.png|web-app-manifest-192x192.png|web-app-manifest-512x512.png)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }
        ]
      }
    ]
  }
}

export default nextConfig
