'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { translations } from '@/lib/translations'

type Package = {
  name: string
  price: string
  period: string
}

type BookingModalProps = {
  isOpen: boolean
  onClose: () => void
  selectedPackage: Package | null
}

export default function BookingModal({ isOpen, onClose, selectedPackage }: BookingModalProps) {
  const { lang } = useLanguage()
  const t = translations.booking

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    paymentMethod: 'blik',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/send-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          packageName: selectedPackage?.name || '',
          packagePrice: selectedPackage?.price + (selectedPackage?.period ? ' ' + selectedPackage.period : '')
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send')
      }

      setSubmitted(true)
    } catch (error) {
      console.error('Error:', error)
      // Still show success to user, but log error
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setSubmitted(false)
    setFormData({
      name: '',
      phone: '',
      email: '',
      paymentMethod: 'contact',
      message: ''
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-secondary border border-gray-700 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!submitted ? (
          <div className="p-6">
            {/* Header */}
            <h3 className="text-2xl font-bold mb-2">{t.title[lang]}</h3>

            {/* Selected package */}
            {selectedPackage && (
              <div className="bg-accent/20 border border-accent/50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{selectedPackage.name}</span>
                  <span className="text-accent font-bold text-xl">
                    {selectedPackage.price}
                    {selectedPackage.period && <span className="text-sm text-gray-400 ml-1">{selectedPackage.period}</span>}
                  </span>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t.name[lang]} *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 focus:border-accent focus:outline-none transition-colors"
                  placeholder={t.namePlaceholder[lang]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t.phone[lang]} *</label>
                <div className="flex">
                  <span className="bg-gray-700 border border-gray-600 border-r-0 rounded-l-lg px-4 py-3 text-gray-300 font-medium">
                    +48
                  </span>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 9)
                      setFormData({ ...formData, phone: value })
                    }}
                    className="w-full bg-primary border border-gray-600 rounded-r-lg px-4 py-3 focus:border-accent focus:outline-none transition-colors"
                    placeholder="123456789"
                    maxLength={9}
                    pattern="[0-9]{9}"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t.email[lang]}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 focus:border-accent focus:outline-none transition-colors"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.paymentMethod[lang]}</label>
                <div className="space-y-2">
                  <div>
                    <label className={`flex items-center gap-3 p-3 bg-primary border rounded-lg cursor-pointer transition-colors ${formData.paymentMethod === 'blik' ? 'border-accent' : 'border-gray-600 hover:border-accent'}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="blik"
                        checked={formData.paymentMethod === 'blik'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="w-4 h-4 text-accent"
                      />
                      <div>
                        <div className="font-medium">{t.paymentBlik[lang]}</div>
                        <div className="text-xs text-gray-400">{t.paymentBlikDesc[lang]}</div>
                      </div>
                    </label>
                    {formData.paymentMethod === 'blik' && (
                      <div className="mt-2 p-3 bg-accent/10 border border-accent/30 rounded-lg">
                        <p className="text-sm text-gray-300 mb-1">{t.blikPhone[lang]}:</p>
                        <p className="font-mono text-accent text-lg font-bold">+48 576 480 429</p>
                      </div>
                    )}
                  </div>

                  <label className="flex items-center gap-3 p-3 bg-primary border border-gray-600 rounded-lg cursor-pointer hover:border-accent transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-4 h-4 text-accent"
                    />
                    <div>
                      <div className="font-medium">{t.paymentCash[lang]}</div>
                      <div className="text-xs text-gray-400">{t.paymentCashDesc[lang]}</div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t.message[lang]}</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 focus:border-accent focus:outline-none transition-colors resize-none"
                  placeholder={t.messagePlaceholder[lang]}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-red-600 disabled:bg-gray-600 text-white font-bold py-4 rounded-full transition-all duration-300 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.submitting[lang]}
                  </>
                ) : (
                  t.submit[lang]
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-6 text-center">
            {/* Success state */}
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">{t.successTitle[lang]}</h3>
            <p className="text-gray-400 mb-6">{t.successMessage[lang]}</p>

            {formData.paymentMethod === 'blik' && (
              <div className="bg-primary/50 rounded-xl p-4 mb-6 text-center">
                <p className="text-sm text-gray-300 mb-2">{t.bankDetails[lang]}:</p>
                <p className="font-mono text-accent text-lg font-bold">+48 576 480 429</p>
                <p className="text-xs text-gray-500 mt-1">{t.blikPhone[lang]}</p>
              </div>
            )}

            <button
              onClick={handleClose}
              className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-8 rounded-full transition-colors"
            >
              {t.close[lang]}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
