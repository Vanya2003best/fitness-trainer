import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Бесплатный план тренировок | Darmowy plan treningowy | Trener personalny Warszawa',
  description: 'Получи БЕСПЛАТНЫЙ план тренировок от AI! Darmowy plan treningowy online. Персональный тренер в Варшаве (сертификат GSA). Trener personalny dla rosyjskojęzycznych. Первая тренировка бесплатно!',
  keywords: 'бесплатный план тренировок, darmowy plan treningowy, darmowy plan ćwiczeń, free workout plan, бесплатная программа тренировок, план тренировок бесплатно, trener personalny Warszawa, персональный тренер Варшава, darmowy trening, bezpłatny plan treningowy, план тренировок онлайн бесплатно, trener fitness za darmo konsultacja',
  openGraph: {
    title: 'Бесплатный план тренировок | Darmowy plan treningowy',
    description: 'Получи бесплатный персональный план тренировок от AI за 30 секунд! Darmowy plan treningowy online.',
    locale: 'ru_RU',
    alternateLocale: 'pl_PL',
    type: 'website',
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
