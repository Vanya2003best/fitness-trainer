import { NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, phone, email, paymentMethod, message, packageName, packagePrice } = data

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram credentials not configured')
      return NextResponse.json({ success: false, error: 'Bot not configured' }, { status: 500 })
    }

    // Format payment method
    const paymentLabels: Record<string, string> = {
      contact: '📞 Свяжусь для оплаты',
      blik: '💳 BLIK / Перевод',
      cash: '💵 Наличными'
    }

    // Create message
    const text = `
🆕 <b>Новая заявка!</b>

📦 <b>Услуга:</b> ${packageName}
💰 <b>Цена:</b> ${packagePrice}

👤 <b>Имя:</b> ${name}
📱 <b>Телефон:</b> +48 ${phone}
${email ? `📧 <b>Email:</b> ${email}` : ''}

💳 <b>Оплата:</b> ${paymentLabels[paymentMethod] || paymentMethod}
${message ? `\n💬 <b>Комментарий:</b> ${message}` : ''}

⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Warsaw' })}
`

    // Send to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: 'HTML'
        })
      }
    )

    const telegramData = await telegramResponse.json()

    if (!telegramData.ok) {
      console.error('Telegram API error:', telegramData)
      return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending booking:', error)
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
  }
}
