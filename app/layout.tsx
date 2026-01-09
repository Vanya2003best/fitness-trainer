import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
  },
  title: 'Персональный тренер в Варшаве | Trener personalny Warszawa | FitCoach',
  description: 'Персональный тренер в Варшаве для русскоязычных. Сертификат GSA. Индивидуальные тренировки, бесплатный AI план. Trener personalny Warszawa dla rosyjskojęzycznych.',
  keywords: 'персональный тренер Варшава, trener personalny Warszawa, фитнес тренер Варшава, персональные тренировки Варшава, trener personalny dla rosyjskojęzycznych, русскоязычный тренер Варшава, индивидуальные тренировки Warszawa, personal trainer Warsaw, GSA certified trainer',
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
    title: 'Персональный тренер в Варшаве | FitCoach',
    description: 'Сертифицированный персональный тренер для русскоязычных в Варшаве. 15+ лет опыта. Индивидуальный подход. Первая консультация бесплатно!',
    locale: 'ru_RU',
    alternateLocale: 'pl_PL',
    type: 'website',
    siteName: 'FitCoach',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Персональный тренер в Варшаве | FitCoach',
    description: 'Сертифицированный персональный тренер для русскоязычных в Варшаве. Индивидуальные тренировки.',
  },
  verification: {
    google: '1b_TvUPqnCv0gGH8o5bMVVJiFmvmI1PQwp6UERyhmHE',
  },
  alternates: {
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
    <html lang="ru">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
