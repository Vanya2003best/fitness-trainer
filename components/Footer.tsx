'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { translations } from '@/lib/translations'

export default function Footer() {
  const { lang } = useLanguage()
  const t = translations.footer

  return (
    <footer className="py-8 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-500 text-sm">
          Warszawa, Polska
        </p>
        <p className="text-gray-600 text-xs mt-2">
          {t.certified[lang]}
        </p>
      </div>
    </footer>
  )
}
