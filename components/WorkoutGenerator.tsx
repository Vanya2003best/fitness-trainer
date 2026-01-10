'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { translations } from '@/lib/translations'

type FormData = {
  goal: string
  customGoal: string
  level: string
  days: string
  location: string
  equipment: string
  limitations: string
}

type Exercise = {
  name: string
  sets: number
  reps: string
}

type WorkoutDay = {
  day: number
  title: string
  focus: string
  warmup: {
    duration: string
    exercises: string[]
  }
  main: Exercise[]
  cooldown: {
    duration: string
    exercises: string[]
  }
}

type WorkoutPlan = {
  days: WorkoutDay[]
  tips: string[]
}

export default function WorkoutGenerator() {
  const { lang } = useLanguage()
  const t = translations.generator

  const [formData, setFormData] = useState<FormData>({
    goal: '',
    customGoal: '',
    level: '',
    days: '3',
    location: '',
    equipment: '',
    limitations: ''
  })
  const [workout, setWorkout] = useState<WorkoutPlan | null>(null)
  const [workoutText, setWorkoutText] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showResult, setShowResult] = useState(false)

  const goals = [
    { value: 'lose_weight', label: t.goals.lose_weight[lang] },
    { value: 'build_muscle', label: t.goals.build_muscle[lang] },
    { value: 'get_fit', label: t.goals.get_fit[lang] },
    { value: 'strength', label: t.goals.strength[lang] },
    { value: 'endurance', label: t.goals.endurance[lang] },
    { value: 'other', label: t.goals.other[lang] },
  ]

  const levels = [
    { value: 'beginner', label: t.levels.beginner[lang] },
    { value: 'intermediate', label: t.levels.intermediate[lang] },
    { value: 'advanced', label: t.levels.advanced[lang] },
  ]

  const locations = [
    { value: 'gym', label: t.locations.gym[lang] },
    { value: 'home', label: t.locations.home[lang] },
    { value: 'outdoor', label: t.locations.outdoor[lang] },
  ]

  const equipmentOptions = [
    { value: 'full_gym', label: t.equipmentOptions.full_gym[lang] },
    { value: 'basic_gym', label: t.equipmentOptions.basic_gym[lang] },
    { value: 'dumbbells', label: t.equipmentOptions.dumbbells[lang] },
    { value: 'minimal', label: t.equipmentOptions.minimal[lang] },
    { value: 'none', label: t.equipmentOptions.none[lang] },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setWorkout(null)
    setWorkoutText('')

    try {
      const response = await fetch('/api/generate-workout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, lang })
      })

      if (!response.ok) {
        throw new Error(t.error[lang])
      }

      const data = await response.json()

      if (data.format === 'json') {
        setWorkout(data.workout)
      } else {
        setWorkoutText(data.workout)
      }
      setShowResult(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorGeneric[lang])
    } finally {
      setLoading(false)
    }
  }

  const scrollToContacts = () => {
    document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })
  }

  const resetForm = () => {
    setShowResult(false)
    setWorkout(null)
    setWorkoutText('')
  }

  const getDaysText = (num: number) => {
    if (lang === 'pl') return num === 1 ? `${num} dzień` : `${num} dni`
    if (num === 1) return `${num} день`
    return num < 5 ? `${num} дня` : `${num} дней`
  }

  return (
    <section id="generator" className="py-20 px-4 bg-gradient-to-b from-secondary/50 to-primary">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {t.title[lang]}
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          {t.description[lang]}
        </p>

        {!showResult ? (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-secondary/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">{t.goal[lang]} *</label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value, customGoal: '' })}
                  required
                  className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 focus:border-accent focus:outline-none transition-colors"
                >
                  <option value="">{t.goalPlaceholder[lang]}</option>
                  {goals.map((goal) => (
                    <option key={goal.value} value={goal.value}>{goal.label}</option>
                  ))}
                </select>
                {formData.goal === 'other' && (
                  <input
                    type="text"
                    value={formData.customGoal}
                    onChange={(e) => setFormData({ ...formData, customGoal: e.target.value })}
                    placeholder={t.customGoalPlaceholder[lang]}
                    required
                    className="w-full mt-2 bg-primary border border-gray-600 rounded-lg px-4 py-3 focus:border-accent focus:outline-none transition-colors"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.level[lang]} *</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  required
                  className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 focus:border-accent focus:outline-none transition-colors"
                >
                  <option value="">{t.levelPlaceholder[lang]}</option>
                  {levels.map((level) => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.days[lang]} *</label>
                <select
                  value={formData.days}
                  onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                  className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 focus:border-accent focus:outline-none transition-colors"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>{getDaysText(num)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.location[lang]} *</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 focus:border-accent focus:outline-none transition-colors"
                >
                  <option value="">{t.locationPlaceholder[lang]}</option>
                  {locations.map((loc) => (
                    <option key={loc.value} value={loc.value}>{loc.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.equipment[lang]} *</label>
                <select
                  value={formData.equipment}
                  onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                  required
                  className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 focus:border-accent focus:outline-none transition-colors"
                >
                  <option value="">{t.equipmentPlaceholder[lang]}</option>
                  {equipmentOptions.map((eq) => (
                    <option key={eq.value} value={eq.value}>{eq.label}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">{t.limitations[lang]}</label>
                <input
                  type="text"
                  value={formData.limitations}
                  onChange={(e) => setFormData({ ...formData, limitations: e.target.value })}
                  placeholder={t.limitationsPlaceholder[lang]}
                  className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 focus:border-accent focus:outline-none transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-accent hover:bg-red-600 disabled:bg-gray-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.loading[lang]}
                </>
              ) : (
                t.submit[lang]
              )}
            </button>
          </form>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-accent">{t.ready[lang]}</h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {t.createNew[lang]}
              </button>
            </div>

            {workout ? (
              <>
                {/* Карточки по дням */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {workout.days.map((day) => (
                    <div key={day.day} className="bg-secondary/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden hover:border-accent/50 transition-colors">
                      {/* Header */}
                      <div className="bg-accent/20 px-6 py-4 border-b border-gray-700">
                        <div className="flex items-center gap-3">
                          <span className="bg-accent text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                            {day.day}
                          </span>
                          <div>
                            <h4 className="font-bold text-lg">{day.title}</h4>
                            <p className="text-gray-400 text-sm">{day.focus}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        {/* Разминка */}
                        <div>
                          <div className="flex items-center gap-2 text-yellow-400 font-medium mb-2">
                            <span>🔥</span>
                            <span>{t.warmup[lang]}</span>
                            <span className="text-gray-500 text-sm">({day.warmup.duration})</span>
                          </div>
                          <ul className="text-gray-300 text-sm space-y-1 ml-6">
                            {day.warmup.exercises.map((ex, i) => (
                              <li key={i}>• {ex}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Основная часть */}
                        <div>
                          <div className="flex items-center gap-2 text-accent font-medium mb-2">
                            <span>💪</span>
                            <span>{t.mainPart[lang]}</span>
                          </div>
                          <div className="space-y-2">
                            {day.main.map((ex, i) => (
                              <div key={i} className="flex justify-between items-center bg-primary/50 rounded-lg px-3 py-2">
                                <span className="text-gray-300 text-sm">{ex.name}</span>
                                <span className="text-accent font-medium text-sm">
                                  {ex.sets}×{ex.reps}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Заминка */}
                        <div>
                          <div className="flex items-center gap-2 text-green-400 font-medium mb-2">
                            <span>🧘</span>
                            <span>{t.cooldown[lang]}</span>
                            <span className="text-gray-500 text-sm">({day.cooldown.duration})</span>
                          </div>
                          <ul className="text-gray-300 text-sm space-y-1 ml-6">
                            {day.cooldown.exercises.map((ex, i) => (
                              <li key={i}>• {ex}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Советы */}
                {workout.tips && workout.tips.length > 0 && (
                  <div className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-8">
                    <h4 className="flex items-center gap-2 font-bold text-lg mb-4">
                      <span>💡</span> {t.tips[lang]}
                    </h4>
                    <ul className="space-y-2">
                      {workout.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                          <span className="text-accent">✓</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : workoutText ? (
              <div className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-8">
                <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                  {workoutText}
                </div>
              </div>
            ) : null}

            {/* CTA */}
            <div className="bg-accent/20 border border-accent rounded-xl p-6 text-center">
              <p className="text-lg mb-4">
                {t.ctaText[lang]}
              </p>
              <button
                onClick={scrollToContacts}
                className="bg-accent hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
              >
                {t.ctaButton[lang]}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
