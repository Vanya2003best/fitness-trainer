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
    let birthDateStr = 'N/A'
    if (data.birthYear && data.birthMonth && data.birthDay) {
      const birth = new Date(
        parseInt(data.birthYear),
        parseInt(data.birthMonth) - 1,
        parseInt(data.birthDay)
      )
      const today = new Date()
      let calculatedAge = today.getFullYear() - birth.getFullYear()
      const m = today.getMonth() - birth.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        calculatedAge--
      }
      age = String(calculatedAge)
      birthDateStr = `${data.birthDay}.${data.birthMonth}.${data.birthYear}`
    }

    // Format message (using HTML for better compatibility)
    const injuriesText = data.injuries?.length > 0
      ? data.injuries.map((i: any) => `  - ${i.area || 'область'}: ${i.type || 'тип'} (${i.current === 'yes' ? 'актуально' : 'в прошлом'})`).join('\n')
      : ''

    const message = `📋 <b>НОВАЯ АНКЕТА КЛИЕНТА</b>

👤 <b>ОСНОВНЫЕ ДАННЫЕ</b>
• Имя: ${data.name || 'Не указано'}
• Дата рождения: ${birthDateStr}
• Возраст: ${age} лет
• Рост: ${data.height || 'N/A'} см
• Вес: ${data.weight || 'N/A'} кг
• BMI: ${bmi}
• Характер работы: ${data.workType || 'Не указано'}

🎯 <b>ЦЕЛИ</b>
• Цели: ${data.goals?.join(', ') || 'Не указаны'}
• Описание: ${data.goalDescription || 'Нет'}
• Срок: ${data.goalTimeframe || 'Не указан'}
• Мотивация: ${data.motivation || 'Не указана'}

🏥 <b>ЗДОРОВЬЕ</b>
• Заболевания: ${data.healthConditions?.join(', ') || 'Нет'}
• Лекарства: ${data.takingMedications === 'yes' ? data.medications : 'Нет'}
• Травмы: ${data.hasInjuries === 'yes' ? 'Да' : 'Нет'}
${injuriesText}
• Боли: ${data.painDescription || 'Нет'}
• Разрешение врача: ${data.doctorApproval || 'Не указано'}

🏋️ <b>ОПЫТ</b>
• Уровень активности: ${data.activityLevel || 'Не указан'}
• Стаж тренировок: ${data.trainingDuration || 'Не указан'}
• Работал с тренером: ${data.workedWithTrainer || 'Нет'}
• Виды активности: ${data.activities?.join(', ') || 'Нет'}

💪 <b>ПРЕДПОЧТЕНИЯ</b>
• Виды тренировок: ${data.preferredTraining?.join(', ') || 'Не указаны'}
• Чего избегать: ${data.avoidInTraining || 'Ничего'}

🌙 <b>ОБРАЗ ЖИЗНИ</b>
• Сон: ${data.sleepHours || 'N/A'} ч, качество: ${data.sleepQuality || 'N/A'}
• Стресс: ${data.stressLevel || 'Не указан'}
• Приёмов пищи: ${data.mealsPerDay || 'N/A'}
• Воды: ${data.waterIntake || 'N/A'}
• Алкоголь: ${data.alcohol || 'Не указано'}
• Курение: ${data.smoking || 'Не указано'}
• Аллергии: ${data.allergies || 'Нет'}
• Диета: ${data.specialDiet?.join(', ') || 'Нет'}

📅 <b>ЛОГИСТИКА</b>
• Раз в неделю: ${data.trainingFrequency || 'Не указано'}
• Дни: ${data.preferredDays?.join(', ') || 'Любые'}
• Время: ${data.preferredTimes?.join(', ') || 'Любое'}
• Место: ${data.trainingLocation || 'Не указано'}
${data.trainingLocation === 'gym' ? `• Зал: ${data.gymName || 'Не указан'}` : ''}

📝 <b>ДОПОЛНИТЕЛЬНО</b>
• Доп. информация: ${data.additionalInfo || 'Нет'}
• Ожидания от тренера: ${data.trainerExpectations || 'Не указаны'}`

    // Send to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      }
    )

    if (!telegramResponse.ok) {
      const error = await telegramResponse.text()
      console.error('Telegram API error:', error)
      console.error('Message length:', message.length)
      return NextResponse.json({ error: 'Failed to send message', details: error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing questionnaire:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
