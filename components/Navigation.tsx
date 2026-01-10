'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { translations } from '@/lib/translations'

export default function Navigation() {
  const { lang, toggleLang } = useLanguage()
  const t = translations.nav

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-xl font-bold">
          <span className="text-accent">Fit</span>Coach
        </a>
        <div className="hidden sm:flex gap-6 text-sm">
          <a href="#services" className="hover:text-accent transition-colors">{t.services[lang]}</a>
          <a href="#about" className="hover:text-accent transition-colors">{t.about[lang]}</a>
          <a href="#pricing" className="hover:text-accent transition-colors">{t.pricing[lang]}</a>
          <a href="#questionnaire" className="hover:text-accent transition-colors">{t.questionnaire[lang]}</a>
          <a href="#generator" className="hover:text-accent transition-colors">{t.plan[lang]}</a>
          <a href="#contacts" className="hover:text-accent transition-colors">{t.contacts[lang]}</a>
        </div>
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-600 hover:border-accent text-sm transition-colors"
            title={lang === 'ru' ? 'Zmień na polski' : 'Сменить на русский'}
          >
            <span className={lang === 'ru' ? 'text-accent font-medium' : 'text-gray-400'}>RU</span>
            <span className="text-gray-500">/</span>
            <span className={lang === 'pl' ? 'text-accent font-medium' : 'text-gray-400'}>PL</span>
          </button>
          <a
            href="#contacts"
            className="bg-accent hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-full transition-colors"
          >
            {t.book[lang]}
          </a>
        </div>
      </div>
    </nav>
  )
}
