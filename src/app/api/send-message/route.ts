import { NextResponse } from 'next/server'

const escapeHtml = (text: string | undefined | null) => {
  if (!text) return ''
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, message, plan } = body

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Majburiy maydonlar to'ldirilmagan" },
        { status: 400 }
      )
    }

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      return NextResponse.json(
        { success: false, message: "Server konfiguratsiyasi xatosi" },
        { status: 500 }
      )
    }

    const safeName = escapeHtml(name)
    const safePhone = escapeHtml(phone)
    const safeMessage = escapeHtml(message)
    const safePlan = escapeHtml(plan)

    const currentDate = new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })

    let text = `<b>📨 YANGI BUYURTMA (WEBLEADERS)</b>\n\n`
    text += `👤 <b>Ism:</b> ${safeName}\n`
    text += `📞 <b>Tel:</b> ${safePhone}\n`

    if (safePlan) {
      text += `📦 <b>Tarif:</b> ${safePlan}\n`
    }

    if (safeMessage) {
      text += `💬 <b>Xabar:</b> ${safeMessage}\n`
    }

    text += `\n🕒 <i>${currentDate}</i>`

    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
      }),
    })

    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      const errorData = await response.json()
      console.error('Telegram API Error:', errorData)
      return NextResponse.json(
        { success: false, message: "Telegramga yuborishda xatolik" },
        { status: 502 }
      )
    }

  } catch (error) {
    console.error('Server Error:', error)
    return NextResponse.json(
      { success: false, message: "Server xatosi" },
      { status: 500 }
    )
  }
}