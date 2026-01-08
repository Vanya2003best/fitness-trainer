import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const goalLabels: Record<string, Record<string, string>> = {
  ru: {
    lose_weight: 'похудеть',
    build_muscle: 'набрать мышечную массу',
    get_fit: 'улучшить общую форму',
    strength: 'увеличить силу',
    endurance: 'развить выносливость',
  },
  pl: {
    lose_weight: 'schudnąć',
    build_muscle: 'zbudować masę mięśniową',
    get_fit: 'poprawić ogólną formę',
    strength: 'zwiększyć siłę',
    endurance: 'rozwinąć wytrzymałość',
  }
}

const levelLabels: Record<string, Record<string, string>> = {
  ru: {
    beginner: 'новичок',
    intermediate: 'средний уровень',
    advanced: 'продвинутый уровень',
  },
  pl: {
    beginner: 'początkujący',
    intermediate: 'średniozaawansowany',
    advanced: 'zaawansowany',
  }
}

export async function POST(request: Request) {
  try {
    const { goal, level, days, limitations, lang = 'ru' } = await request.json()

    if (!goal || !level || !days) {
      return NextResponse.json(
        { error: lang === 'pl' ? 'Wypełnij wszystkie wymagane pola' : 'Заполните все обязательные поля' },
        { status: 400 }
      )
    }

    const langKey = lang === 'pl' ? 'pl' : 'ru'
    const goalText = goalLabels[langKey]?.[goal] || goal
    const levelText = levelLabels[langKey]?.[level] || level

    const prompt = lang === 'pl'
      ? `Jesteś doświadczonym trenerem personalnym. Stwórz plan treningowy w języku polskim.

Dane klienta:
- Cel: ${goalText}
- Poziom zaawansowania: ${levelText}
- Dni w tygodniu: ${days}
${limitations ? `- Ograniczenia/kontuzje: ${limitations}` : ''}

WAŻNE: Odpowiedź musi być TYLKO w formacie JSON bez markdown, bez \`\`\`json, tylko czysty JSON.

Struktura odpowiedzi:
{
  "days": [
    {
      "day": 1,
      "title": "Nazwa treningu",
      "focus": "Na co skierowany (np.: klatka piersiowa, plecy)",
      "warmup": {
        "duration": "10 minut",
        "exercises": ["Ćwiczenie 1", "Ćwiczenie 2"]
      },
      "main": [
        {"name": "Nazwa ćwiczenia", "sets": 3, "reps": "12-15"},
        {"name": "Plank", "sets": 3, "reps": "30 sek"}
      ],
      "cooldown": {
        "duration": "5 minut",
        "exercises": ["Rozciąganie", "Oddychanie"]
      }
    }
  ],
  "tips": ["Wskazówka 1 dot. odżywiania", "Wskazówka 2 dot. regeneracji"]
}

Stwórz ${days} dni treningowych. Ćwiczenia muszą odpowiadać poziomowi "${levelText}" i celowi "${goalText}".`
      : `Ты - опытный персональный тренер. Создай план тренировок на русском языке.

Данные клиента:
- Цель: ${goalText}
- Уровень подготовки: ${levelText}
- Дней в неделю: ${days}
${limitations ? `- Ограничения/травмы: ${limitations}` : ''}

ВАЖНО: Ответ должен быть ТОЛЬКО в формате JSON без markdown, без \`\`\`json, просто чистый JSON.

Структура ответа:
{
  "days": [
    {
      "day": 1,
      "title": "Название тренировки",
      "focus": "На что направлена (например: грудь, спина)",
      "warmup": {
        "duration": "10 минут",
        "exercises": ["Упражнение 1", "Упражнение 2"]
      },
      "main": [
        {"name": "Название упражнения", "sets": 3, "reps": "12-15"},
        {"name": "Планка", "sets": 3, "reps": "30 сек"}
      ],
      "cooldown": {
        "duration": "5 минут",
        "exercises": ["Растяжка", "Дыхание"]
      }
    }
  ],
  "tips": ["Совет 1 по питанию", "Совет 2 по восстановлению"]
}

Создай ${days} тренировочных дней. Упражнения должны соответствовать уровню "${levelText}" и цели "${goalText}".`

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Пробуем распарсить JSON
    try {
      const cleanJson = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      const workoutData = JSON.parse(cleanJson)
      return NextResponse.json({ workout: workoutData, format: 'json' })
    } catch {
      // Если не получилось распарсить, возвращаем как текст
      return NextResponse.json({ workout: text, format: 'text' })
    }
  } catch (error) {
    console.error('Gemini API error:', error)
    return NextResponse.json(
      { error: 'Ошибка генерации плана. Попробуйте позже.' },
      { status: 500 }
    )
  }
}
