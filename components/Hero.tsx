'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { translations } from '@/lib/translations'

export default function Hero() {
  const { lang } = useLanguage()
  const t = translations.hero

  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-16 pb-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fadeIn">
          {t.title[lang]}
          <span className="block text-accent mt-2">{t.location[lang]}</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          {t.subtitle[lang]}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={scrollToGenerator}
            className="bg-accent hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 btn-glow"
          >
            {t.cta[lang]}
          </button>
          <a
            href="#services"
            className="border-2 border-white hover:bg-white hover:text-primary text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300"
          >
            {t.learnMore[lang]}
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 text-center animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-accent">15+</div>
            <div className="text-gray-400 text-sm md:text-base">{t.yearsInSport[lang]}</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-accent">GSA</div>
            <div className="text-gray-400 text-sm md:text-base">{t.certificate[lang]}</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-accent">100%</div>
            <div className="text-gray-400 text-sm md:text-base">{t.individual[lang]}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
