'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import QuestionnaireModal from './QuestionnaireModal'

export default function QuestionnaireSection() {
  const { lang } = useLanguage()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const t = {
    title: { ru: 'Анкета клиента', pl: 'Ankieta klienta' },
    subtitle: {
      ru: 'Заполните анкету, чтобы тренер смог найти правильный подход именно для вас',
      pl: 'Wypełnij ankietę, aby trener mógł znaleźć odpowiednie podejście dla Ciebie'
    },
    description: {
      ru: 'Подробная анкета поможет составить идеальную программу тренировок с учётом ваших целей, состояния здоровья и предпочтений.',
      pl: 'Szczegółowa ankieta pomoże stworzyć idealny program treningowy uwzględniający Twoje cele, stan zdrowia i preferencje.'
    },
    benefits: {
      ru: [
        'Индивидуальный подход к тренировкам',
        'Учёт состояния здоровья и ограничений',
        'Программа под ваши цели и график',
        'Безопасные и эффективные тренировки'
      ],
      pl: [
        'Indywidualne podejście do treningów',
        'Uwzględnienie stanu zdrowia i ograniczeń',
        'Program dostosowany do celów i grafiku',
        'Bezpieczne i efektywne treningi'
      ]
    },
    cta: { ru: 'Заполнить анкету', pl: 'Wypełnij ankietę' },
    time: { ru: '~5 минут', pl: '~5 minut' }
  }

  return (
    <>
      <section id="questionnaire" className="py-20 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.title[lang]}
            </h2>
            <p className="text-xl text-accent mb-2">
              {t.subtitle[lang]}
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t.description[lang]}
            </p>
          </div>

          <div className="bg-primary/50 rounded-2xl p-8 border border-gray-700">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {lang === 'ru' ? 'Что вы получите:' : 'Co otrzymasz:'}
                </h3>
                <ul className="space-y-3">
                  {t.benefits[lang].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <div className="bg-accent/10 rounded-xl p-6 border border-accent/30">
                  <svg className="w-16 h-16 mx-auto mb-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-gray-400 text-sm mb-4">{t.time[lang]}</p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-accent hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full transition-colors"
                  >
                    {t.cta[lang]}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuestionnaireModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
