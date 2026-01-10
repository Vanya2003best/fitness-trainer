'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { translations } from '@/lib/translations'
import BookingModal from './BookingModal'

type PackageType = {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular: boolean
  cta: string
}

export default function Pricing() {
  const { lang } = useLanguage()
  const t = translations.pricing

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<{ name: string; price: string; period: string } | null>(null)

  const packages: PackageType[] = [
    {
      name: t.packages.trial.name[lang],
      price: t.packages.trial.price[lang],
      period: '',
      description: t.packages.trial.description[lang],
      features: t.packages.trial.features[lang],
      popular: false,
      cta: t.packages.trial.cta[lang],
    },
    {
      name: t.packages.single.name[lang],
      price: '75',
      period: 'zł',
      description: t.packages.single.description[lang],
      features: t.packages.single.features[lang],
      popular: false,
      cta: t.packages.single.cta[lang],
    },
    {
      name: t.packages.package.name[lang],
      price: '720',
      period: 'zł',
      description: t.packages.package.description[lang],
      features: t.packages.package.features[lang],
      popular: true,
      cta: t.packages.package.cta[lang],
    },
    {
      name: t.packages.online.name[lang],
      price: '125',
      period: lang === 'ru' ? 'zł/мес' : 'zł/mies',
      description: t.packages.online.description[lang],
      features: t.packages.online.features[lang],
      popular: false,
      cta: t.packages.online.cta[lang],
    },
  ]

  const handlePackageClick = (pkg: PackageType) => {
    setSelectedPackage({
      name: pkg.name,
      price: pkg.price,
      period: pkg.period
    })
    setIsModalOpen(true)
  }

  return (
    <>
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t.title[lang]}
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            {t.subtitle[lang]}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:transform hover:scale-105 ${
                  pkg.popular
                    ? 'border-accent shadow-lg shadow-accent/20'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                      {t.popular[lang]}
                    </span>
                  </div>
                )}

                <h3 className="text-lg font-bold mb-2">{pkg.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>

                <div className="mb-6">
                  <span className="text-3xl font-bold text-accent">{pkg.price}</span>
                  {pkg.period && (
                    <span className="text-gray-400 ml-1">{pkg.period}</span>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-300">
                      <svg
                        className="w-5 h-5 text-accent mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePackageClick(pkg)}
                  className={`w-full py-3 rounded-full font-medium transition-colors ${
                    pkg.popular
                      ? 'bg-accent hover:bg-red-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  {pkg.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-accent/10 border border-accent/30 rounded-2xl p-6 max-w-2xl mx-auto text-center">
            <p className="text-gray-300 mb-2">
              {t.honesty.line1[lang]} <span className="text-accent font-semibold">{t.honesty.experience[lang]}</span> {t.honesty.line2[lang]} <a href="https://www.gsacademy.pl/kurs-na-trenera-personalnego/" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">{t.honesty.gsaCertificate[lang]}</a>.
            </p>
            <p className="text-gray-400">
              {t.honesty.line3[lang]}
            </p>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPackage={selectedPackage}
      />
    </>
  )
}
