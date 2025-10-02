import { Inter } from 'next/font/google'
import './globals.css'
import Analytics from '@/components/shared/Analytics'
import JsonLd from '@/components/seo/JsonLd'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '7/24 Mobil Lastikçi | Acil Yol Yardım Hizmeti',
  description: 'Ankara\'da 7/24 mobil lastik değişimi, akü takviyesi ve yol yardım hizmeti. Hızlı, güvenilir ve profesyonel hizmet. Hemen arayın: 0532 052 09 50',
  keywords: [
    'mobil lastikçi',
    'yol yardım',
    'acil lastik değişimi',
    'akü takviyesi',
    'oto lastik',
    '7/24 lastik servisi',
    'Ankara lastikçi',
    'mobil oto servis',
    'lastik patlaması',
    'yol kenarı yardım'
  ],
  authors: [{ name: '7/24 Mobil Lastikçi' }],
  creator: '7/24 Mobil Lastikçi',
  publisher: '7/24 Mobil Lastikçi',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '7/24 Mobil Lastikçi | Acil Yol Yardım Hizmeti',
    description: 'Ankara\'da 7/24 mobil lastik değişimi, akü takviyesi ve yol yardım hizmeti. Hızlı ve güvenilir.',
    url: '/',
    siteName: '7/24 Mobil Lastikçi',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '7/24 Mobil Lastikçi - Acil Yol Yardım',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '7/24 Mobil Lastikçi | Acil Yol Yardım',
    description: 'Ankara\'da 7/24 mobil lastik ve yol yardım hizmeti. Hemen arayın!',
    images: ['/images/og-image.jpg'],
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/images/logo.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className={inter.className}>
        <Analytics />
        <JsonLd />
        {children}
      </body>
    </html>
  )
}