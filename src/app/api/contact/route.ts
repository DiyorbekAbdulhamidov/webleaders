import { NextResponse } from 'next/server'

const escapeHtml = (text: string) => {
  if (!text) return ''
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, plan } = body

    if (!name || !phone || !plan) {
      return NextResponse.json(
        { success: false, message: "Ma'lumotlar to'liq emas" },
        { status: 400 }
      )
    }

    if (name.length > 100 || plan.length > 500) {
      return NextResponse.json(
        { success: false, message: "Ma'lumot hajmi juda katta" },
        { status: 400 }
      )
    }

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      console.error("Telegram token yoki Chat ID topilmadi (.env faylni tekshiring)")
      return NextResponse.json(
        { success: false, message: 'Server sozlamalarida xatolik' },
        { status: 500 }
      )
    }

    const safeName = escapeHtml(name)
    const safePhone = escapeHtml(phone)
    const safePlan = escapeHtml(plan)

    const currentDate = new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })

    const text = `
<b>🔥 YANGI BUYURTMA!</b>

👤 <b>Mijoz:</b> ${safeName}
📞 <b>Telefon:</b> ${safePhone}
📦 <b>Reja / Xabar:</b> ${safePlan}

🕒 <i>Vaqt: ${currentDate}</i>
    `

    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML'
      }),
    })

    if (!telegramRes.ok) {
      const errorData = await telegramRes.json()
      console.error("Telegram API Xatosi:", errorData)
      return NextResponse.json(
        { success: false, message: 'Telegramga yuborishda xatolik' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true, message: "Xabar yuborildi" })

  } catch (err) {
    console.error("Server Xatosi:", err)
    return NextResponse.json(
      { success: false, message: 'Server xatosi' },
      { status: 500 }
    )
  }
}