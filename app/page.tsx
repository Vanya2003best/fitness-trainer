import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Pricing from '@/components/Pricing'
import WorkoutGenerator from '@/components/WorkoutGenerator'
import Contacts from '@/components/Contacts'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <About />
      <Pricing />
      <WorkoutGenerator />
      <Contacts />
      <Footer />

      {/* Schema.org structured data for local business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "FitCoach - Персональный тренер в Варшаве",
            "description": "Сертифицированный персональный тренер в Варшаве. Тренировки на русском языке.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Warszawa",
              "addressCountry": "PL"
            },
            "priceRange": "$$",
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
    </main>
  )
}
