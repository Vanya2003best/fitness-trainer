'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

interface QuestionnaireModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  // Step 1: Basic data
  name: string
  birthDay: string
  birthMonth: string
  birthYear: string
  height: string
  weight: string
  workType: string

  // Step 2: Goals
  goals: string[]
  goalDescription: string
  goalTimeframe: string
  motivation: string

  // Step 3: Health
  healthConditions: string[]
  diabetesType: string
  takingMedications: string
  medications: string
  hasInjuries: string
  injuries: Array<{
    area: string
    type: string
    when: string
    current: string
  }>
  painDescription: string
  consultingDoctor: string
  doctorApproval: string
  doctorLimitations: string

  // Step 4: Training history
  activityLevel: string
  trainingDuration: string
  workedWithTrainer: string
  trainerExperience: string
  activities: string[]
  otherActivity: string

  // Step 5: Preferences
  preferredTraining: string[]
  avoidInTraining: string

  // Step 6: Lifestyle
  sleepHours: string
  sleepQuality: string
  bedTime: string
  wakeTime: string
  stressLevel: string
  mealsPerDay: string
  alcohol: string
  smoking: string
  cigarettesPerDay: string
  waterIntake: string
  coffeeTeaPerDay: string
  allergies: string
  specialDiet: string[]
  otherDiet: string

  // Step 7: Logistics
  trainingFrequency: string
  preferredDays: string[]
  preferredTimes: string[]
  trainingLocation: string
  gymName: string

  // Step 8: Additional
  additionalInfo: string
  trainerExpectations: string
}

const initialFormData: FormData = {
  name: '',
  birthDay: '',
  birthMonth: '',
  birthYear: '',
  height: '',
  weight: '',
  workType: '',
  goals: [],
  goalDescription: '',
  goalTimeframe: '',
  motivation: '',
  healthConditions: [],
  diabetesType: '',
  takingMedications: '',
  medications: '',
  hasInjuries: '',
  injuries: [],
  painDescription: '',
  consultingDoctor: '',
  doctorApproval: '',
  doctorLimitations: '',
  activityLevel: '',
  trainingDuration: '',
  workedWithTrainer: '',
  trainerExperience: '',
  activities: [],
  otherActivity: '',
  preferredTraining: [],
  avoidInTraining: '',
  sleepHours: '',
  sleepQuality: '',
  bedTime: '',
  wakeTime: '',
  stressLevel: '',
  mealsPerDay: '',
  alcohol: '',
  smoking: '',
  cigarettesPerDay: '',
  waterIntake: '',
  coffeeTeaPerDay: '',
  allergies: '',
  specialDiet: [],
  otherDiet: '',
  trainingFrequency: '',
  preferredDays: [],
  preferredTimes: [],
  trainingLocation: '',
  gymName: '',
  additionalInfo: '',
  trainerExpectations: ''
}

export default function QuestionnaireModal({ isOpen, onClose }: QuestionnaireModalProps) {
  const { lang } = useLanguage()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const totalSteps = 9

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('questionnaireData')
    if (saved) {
      try {
        setFormData(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load saved data')
      }
    }
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('questionnaireData', JSON.stringify(formData))
  }, [formData])

  // Calculate BMI
  const calculateBMI = () => {
    const height = parseFloat(formData.height) / 100
    const weight = parseFloat(formData.weight)
    if (height > 0 && weight > 0) {
      const bmi = weight / (height * height)
      return bmi.toFixed(1)
    }
    return null
  }

  const getBMICategory = (bmi: number) => {
    if (lang === 'ru') {
      if (bmi < 18.5) return 'Недостаточный вес'
      if (bmi < 25) return 'Норма'
      if (bmi < 30) return 'Избыточный вес'
      return 'Ожирение'
    } else {
      if (bmi < 18.5) return 'Niedowaga'
      if (bmi < 25) return 'Norma'
      if (bmi < 30) return 'Nadwaga'
      return 'Otyłość'
    }
  }

  // Calculate age
  const calculateAge = () => {
    if (!formData.birthYear || !formData.birthMonth || !formData.birthDay) return null
    const birth = new Date(
      parseInt(formData.birthYear),
      parseInt(formData.birthMonth) - 1,
      parseInt(formData.birthDay)
    )
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleArrayField = (field: keyof FormData, value: string) => {
    setFormData(prev => {
      const arr = prev[field] as string[]
      if (arr.includes(value)) {
        return { ...prev, [field]: arr.filter(v => v !== value) }
      }
      return { ...prev, [field]: [...arr, value] }
    })
  }

  const addInjury = () => {
    setFormData(prev => ({
      ...prev,
      injuries: [...prev.injuries, { area: '', type: '', when: '', current: '' }]
    }))
  }

  const updateInjury = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      injuries: prev.injuries.map((inj, i) =>
        i === index ? { ...inj, [field]: value } : inj
      )
    }))
  }

  const removeInjury = (index: number) => {
    setFormData(prev => ({
      ...prev,
      injuries: prev.injuries.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/send-questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setIsSuccess(true)
        localStorage.removeItem('questionnaireData')
        setFormData(initialFormData)
      }
    } catch (error) {
      console.error('Failed to submit:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const t = {
    steps: {
      ru: ['Данные', 'Цели', 'Здоровье', 'Опыт', 'Предпочтения', 'Образ жизни', 'Логистика', 'Дополнительно', 'Отправка'],
      pl: ['Dane', 'Cele', 'Zdrowie', 'Doświadczenie', 'Preferencje', 'Styl życia', 'Logistyka', 'Dodatkowe', 'Wysyłka']
    },
    next: { ru: 'Далее', pl: 'Dalej' },
    back: { ru: 'Назад', pl: 'Wstecz' },
    submit: { ru: 'Отправить анкету', pl: 'Wyślij ankietę' },
    submitting: { ru: 'Отправка...', pl: 'Wysyłanie...' },
    close: { ru: 'Закрыть', pl: 'Zamknij' },
    required: { ru: '* обязательное поле', pl: '* pole wymagane' }
  }

  if (!isOpen) return null

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
        <div className="bg-secondary rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">
            {lang === 'ru' ? 'Анкета отправлена!' : 'Ankieta wysłana!'}
          </h3>
          <p className="text-gray-400 mb-6">
            {lang === 'ru'
              ? 'Спасибо! Я свяжусь с вами в ближайшее время.'
              : 'Dziękuję! Skontaktuję się z Tobą wkrótce.'}
          </p>
          <button
            onClick={() => { setIsSuccess(false); onClose() }}
            className="bg-accent hover:bg-red-600 text-white px-6 py-2 rounded-full"
          >
            {t.close[lang]}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-secondary rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {lang === 'ru' ? 'Анкета клиента' : 'Ankieta klienta'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-4 py-3 border-b border-gray-700">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>{t.steps[lang][step - 1]}</span>
            <span>{step}/{totalSteps}</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Basic data */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">
                {lang === 'ru' ? 'Основные данные' : 'Dane podstawowe'}
              </h3>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  {lang === 'ru' ? 'Имя и фамилия *' : 'Imię i nazwisko *'}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  {lang === 'ru' ? 'Дата рождения *' : 'Data urodzenia *'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <select
                    value={formData.birthDay}
                    onChange={(e) => updateField('birthDay', e.target.value)}
                    className="bg-primary border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-accent focus:outline-none"
                  >
                    <option value="">{lang === 'ru' ? 'День' : 'Dzień'}</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                  <select
                    value={formData.birthMonth}
                    onChange={(e) => updateField('birthMonth', e.target.value)}
                    className="bg-primary border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-accent focus:outline-none"
                  >
                    <option value="">{lang === 'ru' ? 'Месяц' : 'Miesiąc'}</option>
                    {[
                      { value: '1', ru: 'Январь', pl: 'Styczeń' },
                      { value: '2', ru: 'Февраль', pl: 'Luty' },
                      { value: '3', ru: 'Март', pl: 'Marzec' },
                      { value: '4', ru: 'Апрель', pl: 'Kwiecień' },
                      { value: '5', ru: 'Май', pl: 'Maj' },
                      { value: '6', ru: 'Июнь', pl: 'Czerwiec' },
                      { value: '7', ru: 'Июль', pl: 'Lipiec' },
                      { value: '8', ru: 'Август', pl: 'Sierpień' },
                      { value: '9', ru: 'Сентябрь', pl: 'Wrzesień' },
                      { value: '10', ru: 'Октябрь', pl: 'Październik' },
                      { value: '11', ru: 'Ноябрь', pl: 'Listopad' },
                      { value: '12', ru: 'Декабрь', pl: 'Grudzień' }
                    ].map(month => (
                      <option key={month.value} value={month.value}>{month[lang]}</option>
                    ))}
                  </select>
                  <select
                    value={formData.birthYear}
                    onChange={(e) => updateField('birthYear', e.target.value)}
                    className="bg-primary border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-accent focus:outline-none"
                  >
                    <option value="">{lang === 'ru' ? 'Год' : 'Rok'}</option>
                    {Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - 10 - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                {calculateAge() !== null && (
                  <p className="text-sm text-gray-400 mt-1">
                    {lang === 'ru' ? 'Возраст' : 'Wiek'}: {calculateAge()} {lang === 'ru' ? 'лет' : 'lat'}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    {lang === 'ru' ? 'Рост (см) *' : 'Wzrost (cm) *'}
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="250"
                    value={formData.height}
                    onChange={(e) => updateField('height', e.target.value)}
                    className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    {lang === 'ru' ? 'Вес (кг) *' : 'Waga (kg) *'}
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="300"
                    value={formData.weight}
                    onChange={(e) => updateField('weight', e.target.value)}
                    className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              {calculateBMI() && (
                <div className="bg-primary/50 rounded-lg p-3">
                  <p className="text-sm">
                    <span className="text-gray-400">BMI:</span>{' '}
                    <span className="text-accent font-semibold">{calculateBMI()}</span>{' '}
                    <span className="text-gray-400">({getBMICategory(parseFloat(calculateBMI()!))})</span>
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {lang === 'ru' ? 'Характер работы *' : 'Charakter pracy *'}
                </label>
                {[
                  { value: 'sedentary', ru: 'Сидячая', pl: 'Siedząca' },
                  { value: 'standing', ru: 'Стоячая', pl: 'Stojąca' },
                  { value: 'physical', ru: 'Физическая', pl: 'Fizyczna' },
                  { value: 'mixed', ru: 'Смешанная', pl: 'Mieszana' }
                ].map(option => (
                  <label key={option.value} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="radio"
                      name="workType"
                      value={option.value}
                      checked={formData.workType === option.value}
                      onChange={(e) => updateField('workType', e.target.value)}
                      className="text-accent focus:ring-accent"
                    />
                    <span>{option[lang]}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Goals */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">
                {lang === 'ru' ? 'Цели тренировок' : 'Cele treningowe'}
              </h3>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {lang === 'ru' ? 'Главная цель (макс. 2) *' : 'Główny cel (max 2) *'}
                </label>
                {[
                  { value: 'weight_loss', ru: 'Снижение веса', pl: 'Redukcja masy ciała' },
                  { value: 'muscle_gain', ru: 'Набор мышечной массы', pl: 'Budowa masy mięśniowej' },
                  { value: 'fitness', ru: 'Улучшение формы', pl: 'Poprawa kondycji' },
                  { value: 'strength', ru: 'Увеличение силы', pl: 'Poprawa siły' },
                  { value: 'body_shape', ru: 'Улучшение фигуры', pl: 'Poprawa sylwetki' },
                  { value: 'rehab', ru: 'Реабилитация', pl: 'Rehabilitacja' },
                  { value: 'health', ru: 'Улучшение здоровья', pl: 'Poprawa zdrowia' },
                  { value: 'competition', ru: 'Подготовка к соревнованиям', pl: 'Przygotowanie do zawodów' }
                ].map(option => (
                  <label key={option.value} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.goals.includes(option.value)}
                      onChange={() => {
                        if (formData.goals.includes(option.value) || formData.goals.length < 2) {
                          toggleArrayField('goals', option.value)
                        }
                      }}
                      className="text-accent focus:ring-accent rounded"
                    />
                    <span>{option[lang]}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  {lang === 'ru' ? 'Опишите цель своими словами' : 'Opisz swój cel własnymi słowami'}
                </label>
                <textarea
                  value={formData.goalDescription}
                  onChange={(e) => updateField('goalDescription', e.target.value)}
                  placeholder={lang === 'ru' ? 'например: Хочу похудеть на 10 кг к лету...' : 'np. Chcę schudnąć 10 kg przed wakacjami...'}
                  className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none h-24 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {lang === 'ru' ? 'За какое время хотите достичь цели? *' : 'W jakim czasie chcesz osiągnąć cel? *'}
                </label>
                {[
                  { value: '1-3', ru: '1-3 месяца', pl: '1-3 miesiące' },
                  { value: '3-6', ru: '3-6 месяцев', pl: '3-6 miesięcy' },
                  { value: '6-12', ru: '6-12 месяцев', pl: '6-12 miesięcy' },
                  { value: '12+', ru: 'Больше года', pl: 'Ponad rok' }
                ].map(option => (
                  <label key={option.value} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="radio"
                      name="goalTimeframe"
                      value={option.value}
                      checked={formData.goalTimeframe === option.value}
                      onChange={(e) => updateField('goalTimeframe', e.target.value)}
                      className="text-accent focus:ring-accent"
                    />
                    <span>{option[lang]}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  {lang === 'ru' ? 'Что мотивирует вас тренироваться?' : 'Co najbardziej motywuje Cię do treningu?'}
                </label>
                <textarea
                  value={formData.motivation}
                  onChange={(e) => updateField('motivation', e.target.value)}
                  placeholder={lang === 'ru' ? 'Здоровье, внешний вид, энергия...' : 'Zdrowie, wygląd, energia...'}
                  className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none h-20 resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 3: Health */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-2">
                {lang === 'ru' ? 'Состояние здоровья' : 'Stan zdrowia'}
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                {lang === 'ru'
                  ? 'Пожалуйста, ответьте честно. Эта информация важна для вашей безопасности.'
                  : 'Proszę o szczere odpowiedzi. Te informacje są kluczowe dla Twojego bezpieczeństwa.'}
              </p>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {lang === 'ru' ? 'Есть ли у вас какие-либо заболевания?' : 'Czy cierpisz na któreś z poniższych schorzeń?'}
                </label>
                {[
                  { value: 'hypertension', ru: 'Гипертония', pl: 'Nadciśnienie' },
                  { value: 'heart', ru: 'Заболевания сердца', pl: 'Choroby serca' },
                  { value: 'diabetes', ru: 'Диабет', pl: 'Cukrzyca' },
                  { value: 'asthma', ru: 'Астма', pl: 'Astma' },
                  { value: 'epilepsy', ru: 'Эпилепсия', pl: 'Epilepsja' },
                  { value: 'thyroid', ru: 'Проблемы с щитовидной железой', pl: 'Problemy z tarczycą' },
                  { value: 'osteoporosis', ru: 'Остеопороз', pl: 'Osteoporoza' },
                  { value: 'depression', ru: 'Депрессия / тревожность', pl: 'Depresja / zaburzenia lękowe' },
                  { value: 'none', ru: 'Нет заболеваний', pl: 'Nie mam żadnych schorzeń' }
                ].map(option => (
                  <label key={option.value} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.healthConditions.includes(option.value)}
                      onChange={() => toggleArrayField('healthConditions', option.value)}
                      className="text-accent focus:ring-accent rounded"
                    />
                    <span>{option[lang]}</span>
                  </label>
                ))}
              </div>

              {formData.healthConditions.includes('diabetes') && (
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    {lang === 'ru' ? 'Тип диабета' : 'Typ cukrzycy'}
                  </label>
                  <input
                    type="text"
                    value={formData.diabetesType}
                    onChange={(e) => updateField('diabetesType', e.target.value)}
                    placeholder="1 / 2 / другой"
                    className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {lang === 'ru' ? 'Принимаете лекарства на постоянной основе?' : 'Czy przyjmujesz jakieś leki na stałe?'}
                </label>
                {[
                  { value: 'no', ru: 'Нет', pl: 'Nie' },
                  { value: 'yes', ru: 'Да', pl: 'Tak' }
                ].map(option => (
                  <label key={option.value} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="radio"
                      name="takingMedications"
                      value={option.value}
                      checked={formData.takingMedications === option.value}
                      onChange={(e) => updateField('takingMedications', e.target.value)}
                      className="text-accent focus:ring-accent"
                    />
                    <span>{option[lang]}</span>
                  </label>
                ))}
              </div>

              {formData.takingMedications === 'yes' && (
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    {lang === 'ru' ? 'Какие лекарства?' : 'Jakie leki?'}
                  </label>
                  <input
                    type="text"
                    value={formData.medications}
                    onChange={(e) => updateField('medications', e.target.value)}
                    className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {lang === 'ru' ? 'Есть травмы или проблемы с опорно-двигательным аппаратом?' : 'Czy masz kontuzje lub problemy z aparatem ruchu?'}
                </label>
                {[
                  { value: 'no', ru: 'Нет', pl: 'Nie' },
                  { value: 'yes', ru: 'Да', pl: 'Tak' }
                ].map(option => (
                  <label key={option.value} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasInjuries"
                      value={option.value}
                      checked={formData.hasInjuries === option.value}
                      onChange={(e) => updateField('hasInjuries', e.target.value)}
                      className="text-accent focus:ring-accent"
                    />
                    <span>{option[lang]}</span>
                  </label>
                ))}
              </div>

              {formData.hasInjuries === 'yes' && (
                <div className="space-y-3">
                  {formData.injuries.map((injury, index) => (
                    <div key={index} className="bg-primary/50 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {lang === 'ru' ? `Травма ${index + 1}` : `Kontuzja ${index + 1}`}
                        </span>
                        <button
                          onClick={() => removeInjury(index)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          {lang === 'ru' ? 'Удалить' : 'Usuń'}
                        </button>
                      </div>
                      <select
                        value={injury.area}
                        onChange={(e) => updateInjury(index, 'area', e.target.value)}
                        className="w-full bg-primary border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                      >
                        <option value="">{lang === 'ru' ? 'Область тела' : 'Obszar ciała'}</option>
                        <option value="knee">{lang === 'ru' ? 'Колено' : 'Kolano'}</option>
                        <option value="ankle">{lang === 'ru' ? 'Стопа / голеностоп' : 'Stopa / kostka'}</option>
                        <option value="hip">{lang === 'ru' ? 'Тазобедренный сустав' : 'Biodro'}</option>
                        <option value="spine_neck">{lang === 'ru' ? 'Шейный отдел' : 'Kręgosłup szyjny'}</option>
                        <option value="spine_thoracic">{lang === 'ru' ? 'Грудной отдел' : 'Kręgosłup piersiowy'}</option>
                        <option value="spine_lumbar">{lang === 'ru' ? 'Поясничный отдел' : 'Kręgosłup lędźwiowy'}</option>
                        <option value="shoulder">{lang === 'ru' ? 'Плечо' : 'Bark / ramię'}</option>
                        <option value="elbow">{lang === 'ru' ? 'Локоть' : 'Łokieć'}</option>
                        <option value="wrist">{lang === 'ru' ? 'Запястье / кисть' : 'Nadgarstek / dłoń'}</option>
                        <option value="other">{lang === 'ru' ? 'Другое' : 'Inne'}</option>
                      </select>
                      <input
                        type="text"
                        value={injury.type}
                        onChange={(e) => updateInjury(index, 'type', e.target.value)}
                        placeholder={lang === 'ru' ? 'Тип проблемы (растяжение, операция...)' : 'Rodzaj problemu (skręcenie, operacja...)'}
                        className="w-full bg-primary border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                      />
                      <input
                        type="text"
                        value={injury.when}
                        onChange={(e) => updateInjury(index, 'when', e.target.value)}
                        placeholder={lang === 'ru' ? 'Когда это было?' : 'Kiedy to było?'}
                        className="w-full bg-primary border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                      />
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                          <input
                            type="radio"
                            name={`injuryCurrent${index}`}
                            value="yes"
                            checked={injury.current === 'yes'}
                            onChange={() => updateInjury(index, 'current', 'yes')}
                          />
                          <span>{lang === 'ru' ? 'Беспокоит сейчас' : 'Dotyczy obecnie'}</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                          <input
                            type="radio"
                            name={`injuryCurrent${index}`}
                            value="no"
                            checked={injury.current === 'no'}
                            onChange={() => updateInjury(index, 'current', 'no')}
                          />
                          <span>{lang === 'ru' ? 'Не беспокоит' : 'Nie dotyczy'}</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addInjury}
                    className="text-accent hover:text-red-400 text-sm flex items-center gap-1"
                  >
                    <span>+</span> {lang === 'ru' ? 'Добавить травму' : 'Dodaj kontuzję'}
                  </button>
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  {lang === 'ru' ? 'Опишите текущие болевые ощущения (если есть)' : 'Opisz aktualne dolegliwości bólowe (jeśli występują)'}
                </label>
                <textarea
                  value={formData.painDescription}
                  onChange={(e) => updateField('painDescription', e.target.value)}
                  className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none h-20 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {lang === 'ru' ? 'Врач разрешил физические нагрузки?' : 'Czy lekarz wyraził zgodę na aktywność fizyczną?'}
                </label>
                {[
                  { value: 'yes', ru: 'Да, без ограничений', pl: 'Tak, bez ograniczeń' },
                  { value: 'limited', ru: 'Да, с ограничениями', pl: 'Tak, z ograniczeniami' },
                  { value: 'no', ru: 'Нет', pl: 'Nie' },
                  { value: 'not_consulted', ru: 'Не консультировался', pl: 'Nie konsultowałem' }
                ].map(option => (
                  <label key={option.value} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="radio"
                      name="doctorApproval"
                      value={option.value}
                      checked={formData.doctorApproval === option.value}
                      onChange={(e) => updateField('doctorApproval', e.target.value)}
                      className="text-accent focus:ring-accent"
                    />
                    <span>{option[lang]}</span>
                  </label>
                ))}
              </div>

              {formData.doctorApproval === 'limited' && (
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    {lang === 'ru' ? 'Какие ограничения?' : 'Jakie ograniczenia?'}
                  </label>
                  <input
                    type="text"
                    value={formData.doctorLimitations}
                    onChange={(e) => updateField('doctorLimitations', e.target.value)}
                    className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 4: Training history */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">
                {lang === 'ru' ? 'Тренировочный опыт' : 'Historia treningowa'}
              </h3>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {lang === 'ru' ? 'Текущий уровень активности *' : 'Obecny poziom aktywności *'}
                </label>
                {[
                  { value: 'none', ru: 'Не тренируюсь', pl: 'Brak (nie trenuję)' },
                  { value: 'low', ru: '1-2 раза в неделю', pl: 'Niski (1-2 razy w tygodniu)' },
                  { value: 'medium', ru: '3-4 раза в неделю', pl: 'Średni (3-4 razy w tygodniu)' },
                  { value: 'high', ru: '5+ раз в неделю', pl: 'Wysoki (5+ razy w tygodniu)' }
                ].map(option => (
                  <label key={option.value} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="radio"
                      name="activityLevel"
                      value={option.value}
                      checked={formData.activityLevel === option.value}
                      onChange={(e) => updateField('activityLevel', e.target.value)}
                      className="text-accent focus:ring-accent"
                    />
                    <span>{option[lang]}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {lang === 'ru' ? 'Как долго регулярно тренируетесь?' : 'Jak długo regularnie ćwiczysz?'}
                </label>
                {[
                  { value: 'never', ru: 'Никогда не тренировался регулярно', pl: 'Nigdy nie ćwiczyłem regularnie' },
                  { value: '<6m', ru: 'Менее 6 месяцев', pl: 'Mniej niż 6 miesięcy' },
                  { value: '6-12m', ru: '6-12 месяцев', pl: '6-12 miesięcy' },
                  { value: '1-3y', ru: '1-3 года', pl: '1-3 lata' },
                  { value: '3y+', ru: 'Более 3 лет', pl: 'Ponad 3 lata' }
                ].map(option => (
                  <label key={option.value} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="radio"
                      name="trainingDuration"
                      value={option.value}
                      checked={formData.trainingDuration === option.value}
                      onChange={(e) => updateField('trainingDuration', e.target.value)}
                      className="text-accent focus:ring-accent"
                    />
                    <span>{option[lang]}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {lang === 'ru' ? 'Работали с персональным тренером?' : 'Czy pracowałeś z trenerem personalnym?'}
                </label>
                {[
                  { value: 'no', ru: 'Нет', pl: 'Nie' },
                  { value: 'yes', ru: 'Да', pl: 'Tak' }
                ].map(option => (
                  <label key={option.value} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="radio"
                      name="workedWithTrainer"
                      value={option.value}
                      checked={formData.workedWithTrainer === option.value}
                      onChange={(e) => updateField('workedWithTrainer', e.target.value)}
                      className="text-accent focus:ring-accent"
                    />
                    <span>{option[lang]}</span>
                  </label>
                ))}
              </div>

              {formData.workedWithTrainer === 'yes' && (
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    {lang === 'ru' ? 'Что работало / не работало?' : 'Co działało / nie działało?'}
                  </label>
                  <textarea
                    value={formData.trainerExperience}
                    onChange={(e) => updateField('trainerExperience', e.target.value)}
                    className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none h-20 resize-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {lang === 'ru' ? 'Какие виды активности практикуете/практиковали?' : 'Jakie formy aktywności uprawiasz?'}
                </label>
                {[
                  { value: 'gym', ru: 'Тренажёрный зал', pl: 'Siłownia' },
                  { value: 'running', ru: 'Бег', pl: 'Bieganie' },
                  { value: 'cycling', ru: 'Велосипед', pl: 'Rower' },
                  { value: 'swimming', ru: 'Плавание', pl: 'Pływanie' },
                  { value: 'crossfit', ru: 'Кроссфит', pl: 'Crossfit' },
                  { value: 'team_sports', ru: 'Командные виды спорта', pl: 'Sporty drużynowe' },
                  { value: 'martial_arts', ru: 'Единоборства', pl: 'Sztuki walki' },
                  { value: 'dance', ru: 'Танцы', pl: 'Taniec' },
                  { value: 'yoga', ru: 'Йога / Пилатес', pl: 'Joga / Pilates' },
                  { value: 'group_fitness', ru: 'Групповой фитнес', pl: 'Fitness grupowy' },
                  { value: 'none', ru: 'Никакие', pl: 'Żadne' }
                ].map(option => (
                  <label key={option.value} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.activities.includes(option.value)}
                      onChange={() => toggleArrayField('activities', option.value)}
                      className="text-accent focus:ring-accent rounded"
                    />
                    <span>{option[lang]}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Preferences */}
          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">
                {lang === 'ru' ? 'Предпочтения в тренировках' : 'Preferencje treningowe'}
              </h3>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {lang === 'ru' ? 'Какие виды тренировок предпочитаете?' : 'Jakie rodzaje treningu preferujesz?'}
                </label>
                {[
                  { value: 'strength', ru: 'Силовой тренинг', pl: 'Trening siłowy' },
                  { value: 'cardio', ru: 'Кардио', pl: 'Cardio' },
                  { value: 'hiit', ru: 'HIIT / Табата', pl: 'HIIT / Tabata' },
                  { value: 'interval', ru: 'Интервальный тренинг', pl: 'Trening interwałowy' },
                  { value: 'circuit', ru: 'Круговой тренинг', pl: 'Trening obwodowy' },
                  { value: 'functional', ru: 'Функциональный тренинг', pl: 'Trening funkcjonalny' },
                  { value: 'stretching', ru: 'Стретчинг / мобильность', pl: 'Stretching / mobilność' },
                  { value: 'kettlebell', ru: 'Гири', pl: 'Kettlebell' },
                  { value: 'trx', ru: 'TRX', pl: 'TRX' },
                  { value: 'no_preference', ru: 'Доверяю тренеру', pl: 'Zaufam trenerowi' }
                ].map(option => (
                  <label key={option.value} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.preferredTraining.includes(option.value)}
                      onChange={() => toggleArrayField('preferredTraining', option.value)}
                      className="text-accent focus:ring-accent rounded"
                    />
                    <span>{option[lang]}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  {lang === 'ru' ? 'Чего хотите избегать в тренировках?' : 'Czego NIE lubisz lub chcesz unikać?'}
                </label>
                <textarea
                  value={formData.avoidInTraining}
                  onChange={(e) => updateField('avoidInTraining', e.target.value)}
                  placeholder={lang === 'ru' ? 'например: не люблю бегать, боюсь упражнений на ноги...' : 'np. Nie lubię biegać, boję się ćwiczeń na nogi...'}
                  className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none h-24 resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 6: Lifestyle */}
          {step === 6 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">
                {lang === 'ru' ? 'Образ жизни' : 'Styl życia'}
              </h3>

              {/* Sleep */}
              <div className="bg-primary/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-accent mb-3">
                  {lang === 'ru' ? 'Сон' : 'Sen'}
                </h4>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      {lang === 'ru' ? 'Часов сна' : 'Godzin snu'}
                    </label>
                    <input
                      type="number"
                      min="3"
                      max="12"
                      value={formData.sleepHours}
                      onChange={(e) => updateField('sleepHours', e.target.value)}
                      className="w-full bg-primary border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      {lang === 'ru' ? 'Качество сна' : 'Jakość snu'}
                    </label>
                    <select
                      value={formData.sleepQuality}
                      onChange={(e) => updateField('sleepQuality', e.target.value)}
                      className="w-full bg-primary border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                    >
                      <option value="">{lang === 'ru' ? 'Выбрать' : 'Wybierz'}</option>
                      <option value="good">{lang === 'ru' ? 'Хорошее' : 'Dobra'}</option>
                      <option value="average">{lang === 'ru' ? 'Среднее' : 'Średnia'}</option>
                      <option value="poor">{lang === 'ru' ? 'Плохое' : 'Słaba'}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Stress */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {lang === 'ru' ? 'Уровень стресса' : 'Poziom stresu'}
                </label>
                <div className="flex gap-2">
                  {[
                    { value: 'low', ru: 'Низкий', pl: 'Niski' },
                    { value: 'medium', ru: 'Средний', pl: 'Średni' },
                    { value: 'high', ru: 'Высокий', pl: 'Wysoki' },
                    { value: 'very_high', ru: 'Очень высокий', pl: 'Bardzo wysoki' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => updateField('stressLevel', option.value)}
                      className={`flex-1 py-2 px-2 rounded-lg text-xs transition-colors ${
                        formData.stressLevel === option.value
                          ? 'bg-accent text-white'
                          : 'bg-primary border border-gray-700 text-gray-400 hover:border-accent'
                      }`}
                    >
                      {option[lang]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nutrition */}
              <div className="bg-primary/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-accent mb-3">
                  {lang === 'ru' ? 'Питание и привычки' : 'Odżywianie i nawyki'}
                </h4>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      {lang === 'ru' ? 'Приёмов пищи в день' : 'Posiłków dziennie'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="8"
                      value={formData.mealsPerDay}
                      onChange={(e) => updateField('mealsPerDay', e.target.value)}
                      className="w-full bg-primary border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      {lang === 'ru' ? 'Воды в день' : 'Wody dziennie'}
                    </label>
                    <select
                      value={formData.waterIntake}
                      onChange={(e) => updateField('waterIntake', e.target.value)}
                      className="w-full bg-primary border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                    >
                      <option value="">{lang === 'ru' ? 'Выбрать' : 'Wybierz'}</option>
                      <option value="<1L">&lt;1 L</option>
                      <option value="1-1.5L">1-1.5 L</option>
                      <option value="1.5-2L">1.5-2 L</option>
                      <option value="2-3L">2-3 L</option>
                      <option value=">3L">&gt;3 L</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="block text-xs text-gray-400 mb-1">
                    {lang === 'ru' ? 'Алкоголь' : 'Alkohol'}
                  </label>
                  <select
                    value={formData.alcohol}
                    onChange={(e) => updateField('alcohol', e.target.value)}
                    className="w-full bg-primary border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                  >
                    <option value="">{lang === 'ru' ? 'Выбрать' : 'Wybierz'}</option>
                    <option value="no">{lang === 'ru' ? 'Не пью' : 'Nie'}</option>
                    <option value="occasional">{lang === 'ru' ? 'Иногда' : 'Okazjonalnie'}</option>
                    <option value="regular">{lang === 'ru' ? 'Регулярно' : 'Regularnie'}</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="block text-xs text-gray-400 mb-1">
                    {lang === 'ru' ? 'Курение' : 'Palenie'}
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="smoking"
                        value="no"
                        checked={formData.smoking === 'no'}
                        onChange={(e) => updateField('smoking', e.target.value)}
                      />
                      <span>{lang === 'ru' ? 'Нет' : 'Nie'}</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="smoking"
                        value="yes"
                        checked={formData.smoking === 'yes'}
                        onChange={(e) => updateField('smoking', e.target.value)}
                      />
                      <span>{lang === 'ru' ? 'Да' : 'Tak'}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    {lang === 'ru' ? 'Аллергии / непереносимости' : 'Alergie pokarmowe'}
                  </label>
                  <input
                    type="text"
                    value={formData.allergies}
                    onChange={(e) => updateField('allergies', e.target.value)}
                    placeholder={lang === 'ru' ? 'лактоза, глютен, орехи...' : 'laktoza, gluten, orzechy...'}
                    className="w-full bg-primary border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {lang === 'ru' ? 'Специальная диета' : 'Dieta specjalna'}
                </label>
                {[
                  { value: 'none', ru: 'Нет', pl: 'Brak' },
                  { value: 'vegetarian', ru: 'Вегетарианская', pl: 'Wegetariańska' },
                  { value: 'vegan', ru: 'Веганская', pl: 'Wegańska' },
                  { value: 'keto', ru: 'Кето', pl: 'Ketogeniczna' },
                  { value: 'gluten_free', ru: 'Безглютеновая', pl: 'Bezglutenowa' }
                ].map(option => (
                  <label key={option.value} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.specialDiet.includes(option.value)}
                      onChange={() => toggleArrayField('specialDiet', option.value)}
                      className="text-accent focus:ring-accent rounded"
                    />
                    <span className="text-sm">{option[lang]}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 7: Logistics */}
          {step === 7 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">
                {lang === 'ru' ? 'Логистика и расписание' : 'Logistyka i dostępność'}
              </h3>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {lang === 'ru' ? 'Сколько раз в неделю готовы тренироваться? *' : 'Ile razy w tygodniu możesz trenować? *'}
                </label>
                <div className="flex gap-2">
                  {['1', '2', '3', '4', '5+'].map(num => (
                    <button
                      key={num}
                      onClick={() => updateField('trainingFrequency', num)}
                      className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                        formData.trainingFrequency === num
                          ? 'bg-accent text-white'
                          : 'bg-primary border border-gray-700 text-gray-400 hover:border-accent'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {lang === 'ru' ? 'Предпочтительные дни' : 'Preferowane dni'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'mon', ru: 'Пн', pl: 'Pn' },
                    { value: 'tue', ru: 'Вт', pl: 'Wt' },
                    { value: 'wed', ru: 'Ср', pl: 'Śr' },
                    { value: 'thu', ru: 'Чт', pl: 'Cz' },
                    { value: 'fri', ru: 'Пт', pl: 'Pt' },
                    { value: 'sat', ru: 'Сб', pl: 'Sb' },
                    { value: 'sun', ru: 'Вс', pl: 'Nd' }
                  ].map(day => (
                    <button
                      key={day.value}
                      onClick={() => toggleArrayField('preferredDays', day.value)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        formData.preferredDays.includes(day.value)
                          ? 'bg-accent text-white'
                          : 'bg-primary border border-gray-700 text-gray-400 hover:border-accent'
                      }`}
                    >
                      {day[lang]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {lang === 'ru' ? 'Предпочтительное время' : 'Preferowane godziny'}
                </label>
                {[
                  { value: 'morning', ru: 'Утро (6:00 - 9:00)', pl: 'Rano (6:00 - 9:00)' },
                  { value: 'late_morning', ru: 'До полудня (9:00 - 12:00)', pl: 'Przedpołudnie (9:00 - 12:00)' },
                  { value: 'afternoon', ru: 'День (12:00 - 17:00)', pl: 'Popołudnie (12:00 - 17:00)' },
                  { value: 'evening', ru: 'Вечер (17:00 - 21:00)', pl: 'Wieczór (17:00 - 21:00)' }
                ].map(time => (
                  <label key={time.value} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.preferredTimes.includes(time.value)}
                      onChange={() => toggleArrayField('preferredTimes', time.value)}
                      className="text-accent focus:ring-accent rounded"
                    />
                    <span className="text-sm">{time[lang]}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {lang === 'ru' ? 'Где хотите тренироваться? *' : 'Gdzie chcesz trenować? *'}
                </label>
                {[
                  { value: 'gym', ru: 'В зале', pl: 'Na siłowni' },
                  { value: 'online', ru: 'Онлайн', pl: 'Online' },
                  { value: 'outdoor', ru: 'На улице', pl: 'Na zewnątrz' }
                ].map(option => (
                  <label key={option.value} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="radio"
                      name="trainingLocation"
                      value={option.value}
                      checked={formData.trainingLocation === option.value}
                      onChange={(e) => updateField('trainingLocation', e.target.value)}
                      className="text-accent focus:ring-accent"
                    />
                    <span>{option[lang]}</span>
                  </label>
                ))}
              </div>

              {formData.trainingLocation === 'gym' && (
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    {lang === 'ru' ? 'Название зала / локация' : 'Nazwa siłowni / lokalizacja'}
                  </label>
                  <input
                    type="text"
                    value={formData.gymName}
                    onChange={(e) => updateField('gymName', e.target.value)}
                    className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 8: Additional */}
          {step === 8 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">
                {lang === 'ru' ? 'Дополнительная информация' : 'Dodatkowe informacje'}
              </h3>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  {lang === 'ru' ? 'Есть что-то ещё, что мне стоит знать?' : 'Czy jest coś jeszcze, o czym powinienem wiedzieć?'}
                </label>
                <textarea
                  value={formData.additionalInfo}
                  onChange={(e) => updateField('additionalInfo', e.target.value)}
                  placeholder={lang === 'ru' ? 'Всё, что может быть важно для нашей работы...' : 'Wszystko, co może być istotne dla naszej współpracy...'}
                  className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none h-32 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  {lang === 'ru' ? 'Какие у вас ожидания от тренера?' : 'Jakie są Twoje oczekiwania wobec trenera?'}
                </label>
                <textarea
                  value={formData.trainerExpectations}
                  onChange={(e) => updateField('trainerExpectations', e.target.value)}
                  placeholder={lang === 'ru' ? 'Мотивация, понимание, требовательность...' : 'Motywacja, wyrozumiałość, wymagający...'}
                  className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none h-24 resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 9: Summary */}
          {step === 9 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">
                {lang === 'ru' ? 'Проверьте данные' : 'Sprawdź dane'}
              </h3>

              <div className="space-y-3 text-sm">
                <div className="bg-primary/50 rounded-lg p-3">
                  <p className="text-accent font-medium mb-1">{lang === 'ru' ? 'Основные данные' : 'Dane podstawowe'}</p>
                  <p><span className="text-gray-400">{lang === 'ru' ? 'Имя:' : 'Imię:'}</span> {formData.name}</p>
                  <p><span className="text-gray-400">{lang === 'ru' ? 'Возраст:' : 'Wiek:'}</span> {calculateAge()} {lang === 'ru' ? 'лет' : 'lat'}</p>
                  <p><span className="text-gray-400">{lang === 'ru' ? 'Рост/Вес:' : 'Wzrost/Waga:'}</span> {formData.height} см / {formData.weight} кг</p>
                  {calculateBMI() && <p><span className="text-gray-400">BMI:</span> {calculateBMI()}</p>}
                </div>

                <div className="bg-primary/50 rounded-lg p-3">
                  <p className="text-accent font-medium mb-1">{lang === 'ru' ? 'Цели' : 'Cele'}</p>
                  <p><span className="text-gray-400">{lang === 'ru' ? 'Цели:' : 'Cele:'}</span> {formData.goals.join(', ')}</p>
                  <p><span className="text-gray-400">{lang === 'ru' ? 'Срок:' : 'Termin:'}</span> {formData.goalTimeframe}</p>
                </div>

                <div className="bg-primary/50 rounded-lg p-3">
                  <p className="text-accent font-medium mb-1">{lang === 'ru' ? 'Логистика' : 'Logistyka'}</p>
                  <p><span className="text-gray-400">{lang === 'ru' ? 'Тренировок в неделю:' : 'Treningów tygodniowo:'}</span> {formData.trainingFrequency}</p>
                  <p><span className="text-gray-400">{lang === 'ru' ? 'Место:' : 'Miejsce:'}</span> {formData.trainingLocation}</p>
                </div>
              </div>

              <p className="text-xs text-gray-400 text-center">
                {lang === 'ru'
                  ? 'Нажимая "Отправить", вы соглашаетесь на обработку данных для подготовки программы тренировок.'
                  : 'Klikając "Wyślij", wyrażasz zgodę na przetwarzanie danych w celu przygotowania programu treningowego.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 flex justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
            >
              {t.back[lang]}
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              className="bg-accent hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors"
            >
              {t.next[lang]}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-accent hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors disabled:opacity-50"
            >
              {isSubmitting ? t.submitting[lang] : t.submit[lang]}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
