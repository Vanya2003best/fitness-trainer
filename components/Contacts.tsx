'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { translations } from '@/lib/translations'

export default function Contacts() {
  const { lang } = useLanguage()
  const t = translations.contacts

  const contactLinks = {
    telegram: 'https://t.me/Daanaat',
    whatsapp: 'https://wa.me/48576480429',
    instagram: 'https://instagram.com/panda.3012701',
  }

  return (
    <section id="contacts" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t.title[lang]}
        </h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          {t.subtitle[lang]}
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {/* Telegram */}
          <a
            href={contactLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-2xl p-6 transition-all duration-300 hover:transform hover:scale-105 flex flex-col items-center"
          >
            <svg className="w-12 h-12 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.121.1.154.234.169.328.015.093.034.306.019.472z"/>
            </svg>
            <span className="font-semibold text-lg">Telegram</span>
            <span className="text-white/70 text-sm mt-1">{t.telegram[lang]}</span>
          </a>

          {/* WhatsApp */}
          <a
            href={contactLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl p-6 transition-all duration-300 hover:transform hover:scale-105 flex flex-col items-center"
          >
            <svg className="w-12 h-12 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.625.846 5.059 2.284 7.034l-1.495 5.466 5.617-1.473c1.908 1.28 4.191 2.027 6.594 2.027 6.627 0 12-5.373 12-12s-5.373-12-12-12z"/>
            </svg>
            <span className="font-semibold text-lg">WhatsApp</span>
            <span className="text-white/70 text-sm mt-1">{t.whatsapp[lang]}</span>
          </a>

          {/* Instagram */}
          <a
            href={contactLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white rounded-2xl p-6 transition-all duration-300 hover:transform hover:scale-105 flex flex-col items-center"
          >
            <svg className="w-12 h-12 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span className="font-semibold text-lg">Instagram</span>
            <span className="text-white/70 text-sm mt-1">{t.instagram[lang]}</span>
          </a>
        </div>

        <p className="text-gray-500 text-sm">
          {t.free[lang]}
        </p>
      </div>
    </section>
  )
}
