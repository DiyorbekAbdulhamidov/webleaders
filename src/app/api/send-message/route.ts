import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, message, plan } = body

    // 1. Env fayldan ma'lumotlarni o'qiymiz
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      return NextResponse.json({ success: false, message: "Serverda Token yo'q" }, { status: 500 })
    }

    // 2. Xabar matnini yasaymiz
    let text = `<b>📨 Yangi Xabar (Webleaders)</b>\n\n`
    text += `👤 <b>Ism:</b> ${name}\n`
    text += `📞 <b>Tel:</b> ${phone}\n`
    if (plan) text += `📦 <b>Tarif:</b> ${plan}\n`
    if (message) text += `💬 <b>Xabar:</b> ${message}\n`

    // 3. Telegramga yuboramiz
    const url = `https://api.telegram.org/bot${token}/sendMessage`

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
      }),
    })

    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, message: "Telegram error" }, { status: 500 })
    }

  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}