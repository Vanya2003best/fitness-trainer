import { NextResponse } from 'next/server'

// Escape HTML special characters to prevent Telegram parsing errors
function escapeHtml(text: string | undefined | null): string {
  if (!text) return ''
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// Safely join array with escaping
function safeJoin(arr: string[] | undefined | null, separator: string = ', '): string {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return ''
  return arr.map(item => escapeHtml(item)).join(separator)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('Received questionnaire data:', JSON.stringify(data, null, 2))

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
      ? data.injuries.map((i: any) => `  - ${escapeHtml(i.area) || 'область'}: ${escapeHtml(i.type) || 'тип'} (${i.current === 'yes' ? 'актуально' : 'в прошлом'})`).join('\n')
      : ''

    const message = `📋 <b>НОВАЯ АНКЕТА КЛИЕНТА</b>

👤 <b>ОСНОВНЫЕ ДАННЫЕ</b>
• Имя: ${escapeHtml(data.name) || 'Не указано'}
• Дата рождения: ${birthDateStr}
• Возраст: ${age} лет
• Рост: ${escapeHtml(data.height) || 'N/A'} см
• Вес: ${escapeHtml(data.weight) || 'N/A'} кг
• BMI: ${bmi}
• Характер работы: ${escapeHtml(data.workType) || 'Не указано'}

🎯 <b>ЦЕЛИ</b>
• Цели: ${safeJoin(data.goals) || 'Не указаны'}
• Описание: ${escapeHtml(data.goalDescription) || 'Нет'}
• Срок: ${escapeHtml(data.goalTimeframe) || 'Не указан'}
• Мотивация: ${escapeHtml(data.motivation) || 'Не указана'}

🏥 <b>ЗДОРОВЬЕ</b>
• Заболевания: ${safeJoin(data.healthConditions) || 'Нет'}
• Лекарства: ${data.takingMedications === 'yes' ? escapeHtml(data.medications) : 'Нет'}
• Травмы: ${data.hasInjuries === 'yes' ? 'Да' : 'Нет'}
${injuriesText}
• Боли: ${escapeHtml(data.painDescription) || 'Нет'}
• Разрешение врача: ${escapeHtml(data.doctorApproval) || 'Не указано'}

🏋️ <b>ОПЫТ</b>
• Уровень активности: ${escapeHtml(data.activityLevel) || 'Не указан'}
• Стаж тренировок: ${escapeHtml(data.trainingDuration) || 'Не указан'}
• Работал с тренером: ${escapeHtml(data.workedWithTrainer) || 'Нет'}
• Виды активности: ${safeJoin(data.activities) || 'Нет'}

💪 <b>ПРЕДПОЧТЕНИЯ</b>
• Виды тренировок: ${safeJoin(data.preferredTraining) || 'Не указаны'}
• Чего избегать: ${escapeHtml(data.avoidInTraining) || 'Ничего'}

🌙 <b>ОБРАЗ ЖИЗНИ</b>
• Сон: ${escapeHtml(data.sleepHours) || 'N/A'} ч, качество: ${escapeHtml(data.sleepQuality) || 'N/A'}
• Стресс: ${escapeHtml(data.stressLevel) || 'Не указан'}
• Приёмов пищи: ${escapeHtml(data.mealsPerDay) || 'N/A'}
• Воды: ${escapeHtml(data.waterIntake) || 'N/A'}
• Алкоголь: ${escapeHtml(data.alcohol) || 'Не указано'}
• Курение: ${escapeHtml(data.smoking) || 'Не указано'}
• Аллергии: ${escapeHtml(data.allergies) || 'Нет'}
• Диета: ${safeJoin(data.specialDiet) || 'Нет'}

📅 <b>ЛОГИСТИКА</b>
• Раз в неделю: ${escapeHtml(data.trainingFrequency) || 'Не указано'}
• Дни: ${safeJoin(data.preferredDays) || 'Любые'}
• Время: ${safeJoin(data.preferredTimes) || 'Любое'}
• Место: ${escapeHtml(data.trainingLocation) || 'Не указано'}
${data.trainingLocation === 'gym' ? `• Зал: ${escapeHtml(data.gymName) || 'Не указан'}` : ''}

📝 <b>ДОПОЛНИТЕЛЬНО</b>
• Доп. информация: ${escapeHtml(data.additionalInfo) || 'Нет'}
• Ожидания от тренера: ${escapeHtml(data.trainerExpectations) || 'Не указаны'}`

    // Check message length (Telegram limit is 4096 chars)
    console.log('Message length:', message.length)
    let finalMessage = message
    if (message.length > 4000) {
      console.warn('Message too long, truncating...')
      finalMessage = message.substring(0, 3950) + '\n\n... (сообщение обрезано из-за длины)'
    }

    // Send to Telegram
    console.log('Sending to Telegram...')
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: finalMessage,
          parse_mode: 'HTML'
        })
      }
    )

    const responseText = await telegramResponse.text()
    console.log('Telegram response status:', telegramResponse.status)
    console.log('Telegram response:', responseText)

    if (!telegramResponse.ok) {
      console.error('Telegram API error:', responseText)

      // If HTML parsing failed, try sending without parse_mode
      if (responseText.includes("can't parse")) {
        console.log('Retrying without HTML parsing...')
        const plainMessage = finalMessage
          .replace(/<b>/g, '')
          .replace(/<\/b>/g, '')

        const retryResponse = await fetch(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: plainMessage
            })
          }
        )

        if (retryResponse.ok) {
          return NextResponse.json({ success: true })
        }
        const retryError = await retryResponse.text()
        console.error('Retry also failed:', retryError)
      }

      return NextResponse.json({ error: 'Failed to send message', details: responseText }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing questionnaire:', error)
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}
