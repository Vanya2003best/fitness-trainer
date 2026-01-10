import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      console.error('Missing Telegram credentials')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // Calculate BMI
    const height = parseFloat(data.height) / 100
    const weight = parseFloat(data.weight)
    const bmi = height > 0 && weight > 0 ? (weight / (height * height)).toFixed(1) : 'N/A'

    // Calculate age
    let age = 'N/A'
    if (data.birthDate) {
      const birth = new Date(data.birthDate)
      const today = new Date()
      age = String(today.getFullYear() - birth.getFullYear())
    }

    // Format message
    const message = `
📋 *НОВАЯ АНКЕТА КЛИЕНТА*

👤 *ОСНОВНЫЕ ДАННЫЕ*
• Имя: ${data.name || 'Не указано'}
• Возраст: ${age} лет
• Рост: ${data.height || 'N/A'} см
• Вес: ${data.weight || 'N/A'} кг
• BMI: ${bmi}
• Характер работы: ${data.workType || 'Не указано'}

🎯 *ЦЕЛИ*
• Цели: ${data.goals?.join(', ') || 'Не указаны'}
• Описание: ${data.goalDescription || 'Нет'}
• Срок: ${data.goalTimeframe || 'Не указан'}
• Мотивация: ${data.motivation || 'Не указана'}

🏥 *ЗДОРОВЬЕ*
• Заболевания: ${data.healthConditions?.join(', ') || 'Нет'}
• Лекарства: ${data.takingMedications === 'yes' ? data.medications : 'Нет'}
• Травмы: ${data.hasInjuries === 'yes' ? 'Да' : 'Нет'}
${data.injuries?.length > 0 ? data.injuries.map((i: any) => `  - ${i.area}: ${i.type} (${i.current === 'yes' ? 'актуально' : 'в прошлом'})`).join('\n') : ''}
• Боли: ${data.painDescription || 'Нет'}
• Разрешение врача: ${data.doctorApproval || 'Не указано'}

🏋️ *ОПЫТ*
• Уровень активности: ${data.activityLevel || 'Не указан'}
• Стаж тренировок: ${data.trainingDuration || 'Не указан'}
• Работал с тренером: ${data.workedWithTrainer || 'Нет'}
• Виды активности: ${data.activities?.join(', ') || 'Нет'}

💪 *ПРЕДПОЧТЕНИЯ*
• Виды тренировок: ${data.preferredTraining?.join(', ') || 'Не указаны'}
• Чего избегать: ${data.avoidInTraining || 'Ничего'}

🌙 *ОБРАЗ ЖИЗНИ*
• Сон: ${data.sleepHours || 'N/A'} ч, качество: ${data.sleepQuality || 'N/A'}
• Стресс: ${data.stressLevel || 'Не указан'}
• Приёмов пищи: ${data.mealsPerDay || 'N/A'}
• Воды: ${data.waterIntake || 'N/A'}
• Алкоголь: ${data.alcohol || 'Не указано'}
• Курение: ${data.smoking || 'Не указано'}
• Аллергии: ${data.allergies || 'Нет'}
• Диета: ${data.specialDiet?.join(', ') || 'Нет'}

📅 *ЛОГИСТИКА*
• Раз в неделю: ${data.trainingFrequency || 'Не указано'}
• Дни: ${data.preferredDays?.join(', ') || 'Любые'}
• Время: ${data.preferredTimes?.join(', ') || 'Любое'}
• Место: ${data.trainingLocation || 'Не указано'}
${data.trainingLocation === 'gym' ? `• Зал: ${data.gymName || 'Не указан'}` : ''}

📝 *ДОПОЛНИТЕЛЬНО*
• Доп. информация: ${data.additionalInfo || 'Нет'}
• Ожидания от тренера: ${data.trainerExpectations || 'Не указаны'}
`

    // Send to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      }
    )

    if (!telegramResponse.ok) {
      const error = await telegramResponse.text()
      console.error('Telegram API error:', error)
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing questionnaire:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
