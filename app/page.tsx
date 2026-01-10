import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Pricing from '@/components/Pricing'
import QuestionnaireSection from '@/components/QuestionnaireSection'
import WorkoutGenerator from '@/components/WorkoutGenerator'
import Contacts from '@/components/Contacts'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import MobileNav from '@/components/MobileNav'

export default function Home() {
  return (
    <main className="min-h-screen pb-20 md:pb-0">
      <Navigation />
      <Hero />
      <Services />
      <About />
      <Pricing />
      <QuestionnaireSection />
      <WorkoutGenerator />
      <Contacts />
      <Footer />
      <MobileNav />

      {/* Schema.org structured data for local business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "FitCoach - Персональный тренер в Варшаве",
            "description": "Сертифицированный персональный тренер в Варшаве. Тренировки на русском языке.",
            "image": "https://fitness-trainer-beryl.vercel.app/images/trainer.png",
            "telephone": "+48576480429",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Warszawa",
              "addressCountry": "PL"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 52.2297,
              "longitude": 21.0122
            },
            "priceRange": "80-120 PLN",
            "openingHours": "Mo-Su 07:00-21:00",
            "areaServed": {
              "@type": "City",
              "name": "Warszawa"
            },
            "knowsLanguage": ["ru", "pl"],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Услуги тренера",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Персональные тренировки"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Онлайн программы тренировок"
                  }
                }
              ]
            }
          })
        }}
      />

      {/* FAQ Schema for rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Сколько стоит персональная тренировка в Варшаве?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Пробная тренировка бесплатно. Разовая тренировка — 120 PLN, абонемент на 8 тренировок — 800 PLN (100 PLN за тренировку)."
                }
              },
              {
                "@type": "Question",
                "name": "Тренер говорит по-русски?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, тренировки проводятся на русском и польском языках. Идеально для русскоязычных в Варшаве."
                }
              },
              {
                "@type": "Question",
                "name": "Есть ли у тренера сертификат?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, сертификат GSA (Global Sports Academy) — аккредитованная программа обучения персональных тренеров в Польше."
                }
              },
              {
                "@type": "Question",
                "name": "Можно ли получить бесплатный план тренировок?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Да, на сайте есть бесплатный AI-генератор плана тренировок. Укажите цель, уровень подготовки и получите персональную программу."
                }
              }
            ]
          })
        }}
      />
    </main>
  )
}
