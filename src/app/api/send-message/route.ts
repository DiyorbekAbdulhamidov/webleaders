import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { name, phone, message } = await req.json()

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  const text = `
🆕 Yangi xabar:
👤 Ism: ${name}
📞 Telefon: ${phone}
💬 Xabar: ${message}
  `

  const send = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  })

  const data = await send.json()
  return NextResponse.json(data)
}
