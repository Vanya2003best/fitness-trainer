'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { translations } from '@/lib/translations'

export default function About() {
  const { lang } = useLanguage()
  const t = translations.about

  const stats = [
    { label: t.stats.pushups[lang], value: '75+', icon: '💪' },
    { label: t.stats.squats[lang], value: '500+', icon: '🦵' },
    { label: t.stats.pullups[lang], value: '25+', icon: '🏋️' },
    { label: t.stats.halfMarathon[lang], value: '1:35', icon: '🏃' },
  ]

  return (
    <section id="about" className="py-16 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Photo + Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-accent/50 mb-4 bg-gradient-to-br from-accent/20 to-primary">
            <img
              src="/images/trainer.png"
              alt={lang === 'ru' ? 'Персональный тренер' : 'Trener personalny'}
              className="w-full h-full object-cover scale-[1.8] translate-y-[15%]"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextElementSibling?.classList.remove('hidden')
              }}
            />
            <div className="hidden w-full h-full flex items-center justify-center">
              <span className="text-4xl">🏋️</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            {t.title[lang]}
          </h2>
          <p className="text-gray-400 text-center mt-2">
            {t.subtitle[lang]}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="bg-secondary/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 text-center hover:border-accent/50 transition-colors">
              <span className="text-2xl mb-1 block">{stat.icon}</span>
              <div className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left - About text */}
          <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-accent">🎯</span> {t.sportIsLife[lang]}
            </h3>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              {t.aboutText1[lang]}
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t.aboutText2[lang]}
            </p>
          </div>

          {/* Right - Experience */}
          <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-accent">🏆</span> {t.myExperience[lang]}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {t.experienceItems.map((item, index) => (
                <div key={index} className="bg-primary/50 rounded-lg p-3">
                  <div className="text-white text-sm font-medium">{item.text[lang]}</div>
                  <div className="text-gray-400 text-xs">{item.detail[lang]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
