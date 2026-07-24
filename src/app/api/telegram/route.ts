import { NextResponse } from 'next/server'
import { readPortfolio, writePortfolio, saveImage, type DraftProject } from '@/lib/portfolio-store'
import type { Project } from '@/data/projects'

/**
 * TELEGRAM PORTFOLIO BOT WEBHOOK
 *
 * Admin Telegram orqali portfolio boshqaradi:
 *   /yangi    — yangi loyiha qoralamasini boshlash
 *   Nomi: ... — maydonlarni to'ldirish (Nomi, Kategoriya, Tavsif, Stack, URL, Yil)
 *   [rasm]    — rasm yuborish (bir nechta mumkin)
 *   /korish   — qoralamani ko'rish
 *   /saqlash  — saytga chiqarish
 *   /bekor    — qoralamani bekor qilish
 *   /royxat   — bot orqali qo'shilgan loyihalar
 *   /ochirish slug — loyihani o'chirish
 *
 * Xavfsizlik: faqat TELEGRAM_ADMIN_IDS (yoki TELEGRAM_CHAT_ID) dagi chatlar,
 * va agar berilgan bo'lsa TELEGRAM_WEBHOOK_SECRET header tekshiruvi.
 */

const TOKEN = process.env.TELEGRAM_BOT_TOKEN
const API = `https://api.telegram.org/bot${TOKEN}`

function adminIds(): string[] {
  const ids = process.env.TELEGRAM_ADMIN_IDS || process.env.TELEGRAM_CHAT_ID || ''
  return ids.split(',').map(s => s.trim()).filter(Boolean)
}

async function reply(chatId: number | string, text: string) {
  await fetch(`${API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true })
  }).catch(() => {})
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/o['’ʻʼ]/g, 'o')
    .replace(/g['’ʻʼ]/g, 'g')
    .replace(/['’ʻʼ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50) || `loyiha-${Date.now()}`
}

const HELP_TEXT = `<b>🤖 WEBLEADERS PORTFOLIO BOT</b>

Yangi loyiha qo'shish tartibi:

1️⃣ /yangi — qoralama boshlash
2️⃣ Maydonlarni yuboring (har birini alohida xabarda yoki bitta xabarda, har biri yangi qatordan):

<code>Nomi: Loyiha nomi</code>
<code>Kategoriya: E-commerce</code>
<code>Tavsif: Loyiha haqida qisqacha</code>
<code>Stack: Next.js, Tailwind, CRM</code>
<code>URL: https://sayt.uz</code>
<code>Yil: 2026</code>

3️⃣ Rasmlarni yuboring (1-6 ta, oddiy rasm sifatida)
4️⃣ /korish — tekshirish
5️⃣ /saqlash — saytga chiqarish ✅

Boshqa buyruqlar:
/royxat — qo'shilgan loyihalar
/ochirish slug — loyihani o'chirish
/bekor — qoralamani bekor qilish`

/** Xabar matnidan maydonlarni ajratib olish */
function parseFields(text: string, draft: DraftProject): { updated: string[]; draft: DraftProject } {
  const updated: string[] = []
  const lines = text.split('\n')
  for (const line of lines) {
    const m = line.match(/^\s*(Nomi|Kategoriya|Tavsif|Stack|URL|Yil)\s*:\s*(.+)$/i)
    if (!m) continue
    const key = m[1].toLowerCase()
    const value = m[2].trim()
    if (key === 'nomi') { draft.name = value; updated.push('Nomi') }
    else if (key === 'kategoriya') { draft.category = value; updated.push('Kategoriya') }
    else if (key === 'tavsif') { draft.desc = value; updated.push('Tavsif') }
    else if (key === 'stack') { draft.tech = value.split(',').map(s => s.trim()).filter(Boolean); updated.push('Stack') }
    else if (key === 'url') { draft.url = value.startsWith('http') ? value : `https://${value}`; updated.push('URL') }
    else if (key === 'yil') { const y = parseInt(value); if (y > 2000) { draft.year = y; updated.push('Yil') } }
  }
  return { updated, draft }
}

function draftPreview(d: DraftProject): string {
  return `<b>📋 QORALAMA HOLATI</b>

<b>Nomi:</b> ${d.name || '—'}
<b>Kategoriya:</b> ${d.category || '—'}
<b>Tavsif:</b> ${d.desc || '—'}
<b>Stack:</b> ${d.tech?.join(', ') || '—'}
<b>URL:</b> ${d.url || '—'}
<b>Yil:</b> ${d.year || new Date().getFullYear()}
<b>Rasmlar:</b> ${d.images.length} ta

${d.name && d.desc && d.images.length > 0
  ? '✅ Saqlashga tayyor — /saqlash'
  : '⚠️ Kamida Nomi, Tavsif va 1 ta rasm kerak'}`
}

/** Telegramdan rasmni yuklab olish */
async function downloadPhoto(fileId: string): Promise<Buffer | null> {
  try {
    const fileRes = await fetch(`${API}/getFile?file_id=${fileId}`)
    const fileJson = await fileRes.json()
    if (!fileJson.ok) return null
    const filePath = fileJson.result.file_path
    const imgRes = await fetch(`https://api.telegram.org/file/bot${TOKEN}/${filePath}`)
    if (!imgRes.ok) return null
    return Buffer.from(await imgRes.arrayBuffer())
  } catch {
    return null
  }
}

export async function POST(req: Request) {
  if (!TOKEN) {
    return NextResponse.json({ ok: true })
  }

  // Webhook secret tekshiruvi (o'rnatilgan bo'lsa)
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET
  if (secret) {
    const header = req.headers.get('x-telegram-bot-api-secret-token')
    if (header !== secret) {
      return NextResponse.json({ ok: false }, { status: 401 })
    }
  }

  let update: any
  try {
    update = await req.json()
  } catch {
    return NextResponse.json({ ok: true })
  }

  const message = update?.message
  if (!message) return NextResponse.json({ ok: true })

  const chatId = message.chat?.id
  const chatKey = String(chatId)

  // Faqat adminlarga ruxsat
  const admins = adminIds()
  if (!admins.includes(chatKey)) {
    return NextResponse.json({ ok: true })
  }

  const text: string = (message.text || message.caption || '').trim()

  try {
    // --- BUYRUQLAR ---
    if (text === '/start' || text === '/help') {
      await reply(chatId, HELP_TEXT)
      return NextResponse.json({ ok: true })
    }

    if (text === '/yangi') {
      const data = await readPortfolio()
      data.drafts[chatKey] = { images: [] }
      await writePortfolio(data, 'chore: portfolio draft start')
      await reply(chatId, `🆕 Yangi loyiha qoralamasi ochildi!\n\nEndi maydonlarni yuboring:\n\n<code>Nomi: Loyiha nomi\nKategoriya: E-commerce\nTavsif: Qisqacha tavsif\nStack: Next.js, Tailwind\nURL: https://sayt.uz</code>\n\nKeyin rasmlarni yuboring 📸`)
      return NextResponse.json({ ok: true })
    }

    if (text === '/bekor') {
      const data = await readPortfolio()
      delete data.drafts[chatKey]
      await writePortfolio(data, 'chore: portfolio draft cancel')
      await reply(chatId, '❌ Qoralama bekor qilindi.')
      return NextResponse.json({ ok: true })
    }

    if (text === '/korish') {
      const data = await readPortfolio()
      const draft = data.drafts[chatKey]
      if (!draft) {
        await reply(chatId, '⚠️ Aktiv qoralama yo\'q. /yangi bilan boshlang.')
      } else {
        await reply(chatId, draftPreview(draft))
      }
      return NextResponse.json({ ok: true })
    }

    if (text === '/royxat') {
      const data = await readPortfolio()
      if (data.projects.length === 0) {
        await reply(chatId, '📭 Bot orqali qo\'shilgan loyihalar hali yo\'q.')
      } else {
        const list = data.projects
          .map((p, i) => `${i + 1}. <b>${p.name}</b> — <code>${p.slug}</code>`)
          .join('\n')
        await reply(chatId, `<b>📚 BOT ORQALI QO'SHILGAN LOYIHALAR:</b>\n\n${list}\n\nO'chirish: <code>/ochirish slug</code>`)
      }
      return NextResponse.json({ ok: true })
    }

    if (text.startsWith('/ochirish')) {
      const slug = text.replace('/ochirish', '').trim()
      if (!slug) {
        await reply(chatId, '⚠️ Slug kiriting: <code>/ochirish loyiha-slug</code>')
        return NextResponse.json({ ok: true })
      }
      const data = await readPortfolio()
      const before = data.projects.length
      data.projects = data.projects.filter(p => p.slug !== slug)
      if (data.projects.length === before) {
        await reply(chatId, `⚠️ <code>${slug}</code> topilmadi. /royxat bilan tekshiring.`)
      } else {
        await writePortfolio(data, `chore: remove portfolio project ${slug}`)
        await reply(chatId, `🗑 <b>${slug}</b> o'chirildi. Sayt bir daqiqa ichida yangilanadi.`)
      }
      return NextResponse.json({ ok: true })
    }

    if (text === '/saqlash') {
      const data = await readPortfolio()
      const draft = data.drafts[chatKey]
      if (!draft || !draft.name || !draft.desc || draft.images.length === 0) {
        await reply(chatId, '⚠️ Qoralama to\'liq emas. Kamida <b>Nomi</b>, <b>Tavsif</b> va <b>1 ta rasm</b> bo\'lishi kerak.\n\n/korish bilan holatni tekshiring.')
        return NextResponse.json({ ok: true })
      }

      const slug = slugify(draft.name)
      const desc = draft.desc || ''
      const project: Project = {
        slug,
        name: draft.name,
        category: { UZ: draft.category || 'Web Loyiha', RU: draft.category || 'Web Loyiha', EN: draft.category || 'Web Loyiha' },
        desc: { UZ: desc, RU: desc, EN: desc },
        longDesc: { UZ: desc, RU: desc, EN: desc },
        tech: draft.tech || [],
        images: draft.images,
        url: draft.url,
        year: draft.year || new Date().getFullYear(),
        featured: true
      }

      data.projects = [project, ...data.projects.filter(p => p.slug !== slug)]
      delete data.drafts[chatKey]
      await writePortfolio(data, `feat: add portfolio project ${slug} via telegram bot`)

      await reply(chatId, `🎉 <b>${project.name}</b> saytga qo'shildi!\n\n🔗 https://webleaders.uz/portfolio/${slug}\n\nSayt 1-2 daqiqa ichida yangilanadi.`)
      return NextResponse.json({ ok: true })
    }

    // --- RASM QABUL QILISH ---
    if (message.photo && Array.isArray(message.photo) && message.photo.length > 0) {
      const data = await readPortfolio()
      const draft = data.drafts[chatKey]
      if (!draft) {
        await reply(chatId, '⚠️ Avval /yangi bilan qoralama boshlang.')
        return NextResponse.json({ ok: true })
      }
      if (draft.images.length >= 6) {
        await reply(chatId, '⚠️ Maksimum 6 ta rasm. /saqlash bilan yakunlang.')
        return NextResponse.json({ ok: true })
      }

      // Eng katta o'lchamdagi rasmni olamiz
      const photo = message.photo[message.photo.length - 1]
      const buffer = await downloadPhoto(photo.file_id)
      if (!buffer) {
        await reply(chatId, '❌ Rasmni yuklab bo\'lmadi. Qayta urinib ko\'ring.')
        return NextResponse.json({ ok: true })
      }

      const fileName = `tg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.jpg`
      const publicPath = await saveImage(fileName, buffer)
      if (!publicPath) {
        await reply(chatId, '❌ Rasmni saqlab bo\'lmadi. Sozlamalarni tekshiring.')
        return NextResponse.json({ ok: true })
      }

      draft.images.push(publicPath)

      // Rasm bilan birga caption'da maydonlar bo'lsa, ularni ham o'qiymiz
      if (text) parseFields(text, draft)

      await writePortfolio(data, 'chore: portfolio draft image')
      await reply(chatId, `📸 Rasm qabul qilindi (${draft.images.length}/6).\n\n${draft.name && draft.desc ? '✅ /saqlash bilan yakunlashingiz mumkin' : 'Maydonlarni to\'ldirishni unutmang — /korish'}`)
      return NextResponse.json({ ok: true })
    }

    // --- MAYDONLARNI QABUL QILISH ---
    if (text) {
      const data = await readPortfolio()
      const draft = data.drafts[chatKey]
      if (!draft) {
        await reply(chatId, '⚠️ Aktiv qoralama yo\'q.\n\n/yangi — yangi loyiha boshlash\n/help — yordam')
        return NextResponse.json({ ok: true })
      }

      const { updated } = parseFields(text, draft)
      if (updated.length === 0) {
        await reply(chatId, '⚠️ Maydon topilmadi. Format:\n\n<code>Nomi: Loyiha nomi</code>\n\n/help — to\'liq yordam')
        return NextResponse.json({ ok: true })
      }

      await writePortfolio(data, 'chore: portfolio draft fields')
      await reply(chatId, `✅ Yangilandi: <b>${updated.join(', ')}</b>\n\n${draftPreview(draft)}`)
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[TELEGRAM BOT ERROR]:', err)
    await reply(chatId, '❌ Texnik xatolik yuz berdi. Qayta urinib ko\'ring.')
    return NextResponse.json({ ok: true })
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ ok: true, service: 'webleaders-telegram-portfolio-bot' })
}
