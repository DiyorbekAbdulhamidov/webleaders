import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, phone, plan } = await req.json()

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      return NextResponse.json(
        { error: 'Telegram token yoki chatId topilmadi' },
        { status: 500 }
      )
    }

    const text = `
📦 Yangi buyurtma:
👤 Ism: ${name}
📞 Telefon raqami: ${phone}
💰 Tanlangan reja: ${plan}
    `

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    })

    const data = await res.json()

    return NextResponse.json({ success: true, data })
  } catch (err) {
    return NextResponse.json({ error: 'Server xatosi' }, { status: 500 })
  }
}
