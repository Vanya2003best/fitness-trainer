import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://fitness-trainer-beryl.vercel.app'),
  title: {
    default: 'FitCoach | Персональный тренер в Варшаве | Trener personalny Warszawa',
    template: '%s | FitCoach',
  },
  description: 'Тренер Варшава - цена от 80 PLN/час. Пробная тренировка БЕСПЛАТНО! Персональные тренировки на русском. Сертификат GSA, 15+ лет опыта.',
  keywords: 'тренер Варшава, тренер Варшава цена, trener Warszawa, trener Warszawa cena, персональный тренер Варшава, личный тренер Варшава, trener personalny Warszawa, фитнес тренер Варшава, персональные тренировки Варшава, сколько стоит тренер в Варшаве, русскоязычный тренер Варшава, индивидуальные тренировки Warszawa, personal trainer Warsaw, тренер в Варшаве, личный тренер в Варшаве',
  applicationName: 'FitCoach',
  authors: [{ name: 'FitCoach' }],
  creator: 'FitCoach',
  publisher: 'FitCoach',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'FitCoach | Персональный тренер в Варшаве',
    description: 'Сертифицированный персональный тренер для русскоязычных в Варшаве. 15+ лет опыта. Индивидуальный подход. Первая консультация бесплатно!',
    url: 'https://fitness-trainer-beryl.vercel.app',
    locale: 'ru_RU',
    alternateLocale: 'pl_PL',
    type: 'website',
    siteName: 'FitCoach',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FitCoach | Персональный тренер в Варшаве',
    description: 'Сертифицированный персональный тренер для русскоязычных в Варшаве. Индивидуальные тренировки.',
  },
  verification: {
    google: '1b_TvUPqnCv0gGH8o5bMVVJiFmvmI1PQwp6UERyhmHE',
  },
  alternates: {
    canonical: '/',
    languages: {
      'ru': '/',
      'pl': '/',
    },
  },
  other: {
    'geo.region': 'PL-MZ',
    'geo.placename': 'Warszawa',
    'geo.position': '52.2297;21.0122',
    'ICBM': '52.2297, 21.0122',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
