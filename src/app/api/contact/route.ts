import { NextResponse } from 'next/server'

/**
 * XSS va HTML-struktura buzilishlarining oldini olish uchun kompleks filtr
 */
const escapeHtml = (text: string): string => {
  if (!text) return ''
  return text
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function POST(req: Request) {
  try {
    // 1. Protokol va format xavfsizligini tekshirish
    const contentType = req.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { success: false, message: "So'rov formati qabul qilinmas darajada" },
        { status: 415 }
      )
    }

    const body = await req.json()
    const { name, phone, plan } = body

    // 2. Korporativ ma'lumotlar yaxlitligini tekshirish
    if (!name || !phone || !plan) {
      return NextResponse.json(
        { success: false, message: "Tashabbus ma'lumotlari to'liq emas" },
        { status: 400 }
      )
    }

    // 3. Ma'lumot hajmi cheklovlari (Buffer Overflow va DDoS mudofaasi)
    if (name.length > 100 || phone.length > 30 || plan.length > 1000) {
      return NextResponse.json(
        { success: false, message: "Axborot hajmi o'rnatilgan limitdan yuqori" },
        { status: 400 }
      )
    }

    // 4. Infratuzilma o'zgaruvchilari auditi
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      console.error("[CRITICAL] Tizim integratsiyasi xatoligi: Atrof-muhit tokenlari topilmadi.")
      return NextResponse.json(
        { success: false, message: "Server konfiguratsiyasida uzilish" },
        { status: 500 }
      )
    }

    // 5. Ma'lumotlarni xavfsiz shaklga keltirish
    const safeName = escapeHtml(name)
    const safePhone = escapeHtml(phone)
    const safePlan = escapeHtml(plan)

    // Tashkent vaqti bo'yicha rasmiy formatlash
    const currentDate = new Date().toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
      dateStyle: "medium",
      timeStyle: "short"
    })

    // 6. Yuqori darajadagi institutsional hisobot shablonini shakllantirish
    const text = `
💼 <b>STRATEGIK HAMKORLIK SO‘ROVI [WEBLEADERS]</b>
───────────────────────────
👤 <b>Tashabbuskor (F.I.O):</b> ${safeName}
📞 <b>Aloqa kanali:</b> <code>${safePhone}</code>
📊 <b>Muhandislik modeli:</b> ${safePlan}
───────────────────────────
⏱ <b>Tizimli vaqt (Tashkent):</b> <i>${currentDate}</i>
    `.trim()

    // 7. Telegram Gateway API orqali uzatish
    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      }),
    })

    // 8. Gateway javobini tahlil qilish va qayta ishlash
    if (!telegramRes.ok) {
      const errorLog = await telegramRes.json().catch(() => ({}))
      console.error("[GATEWAY ERROR] Telegram infratuzilmasi rad etdi:", errorLog)
      return NextResponse.json(
        { success: false, message: "Tashqi shlyuzga uzatishda xatolik yuz berdi" },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Ekspertiza so'rovi tizimda muvaffaqiyatli ro'yxatdan o'tkazildi"
    })

  } catch (err) {
    console.error("[SERVER FATAL ERROR]:", err)
    return NextResponse.json(
      { success: false, message: "Ichki arxitekturada kutilmagan texnik uzilish" },
      { status: 500 }
    )
  }
}