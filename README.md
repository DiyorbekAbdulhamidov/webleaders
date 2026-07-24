# Webleaders — Kompaniya Sayti

Toshkentdagi Webleaders IT-kompaniyasining rasmiy sayti. Next.js (App Router) asosida qurilgan ko'p sahifali, SEO-optimallashtirilgan, 3 tilli (UZ/RU/EN) sayt.

## Sahifalar

| Sahifa | Yo'l | Tavsif |
|---|---|---|
| Bosh sahifa | `/` | Hero, xizmatlar, portfolio, narxlar, FAQ, aloqa |
| Xizmatlar | `/services` | To'liq xizmatlar + ish jarayoni |
| Portfolio | `/portfolio` | Barcha loyihalar, kategoriya filtri |
| Loyiha sahifasi | `/portfolio/[slug]` | Har bir loyiha uchun alohida SEO sahifa |
| Narxlar | `/pricing` | Tariflar + FAQ (buyurtma modali bilan) |
| Aloqa | `/contact` | Forma + kontaktlar |

## Ishga tushirish

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Muhit o'zgaruvchilari (.env)

```env
# Buyurtma formalari va portfolio bot uchun (majburiy)
TELEGRAM_BOT_TOKEN=123456:ABC...
TELEGRAM_CHAT_ID=-100123456789

# Portfolio botni boshqara oladigan adminlar (ixtiyoriy, vergul bilan;
# berilmasa TELEGRAM_CHAT_ID ishlatiladi)
TELEGRAM_ADMIN_IDS=123456789,987654321

# Webhook xavfsizligi uchun maxfiy kalit (tavsiya etiladi)
TELEGRAM_WEBHOOK_SECRET=har-qanday-maxfiy-satr

# Vercel'da portfolio saqlash uchun GitHub rejimi (serverless'da MAJBURIY):
# token'ga repo yozish huquqi kerak (Contents: Read and write)
GITHUB_TOKEN=ghp_...
GITHUB_REPO=username/company-site
```

## 🤖 Telegram orqali portfolio qo'shish

Sayt portfoliosini Telegram botdan boshqarish mumkin. Bir marta sozlanadi:

### 1. Webhook o'rnatish

Deploy'dan keyin (domen ishlagach) quyidagini bir marta bajaring:

```bash
curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://webleaders.uz/api/telegram&secret_token=<TELEGRAM_WEBHOOK_SECRET>"
```

### 2. Bot buyruqlari (faqat adminlar uchun)

| Buyruq | Vazifa |
|---|---|
| `/yangi` | Yangi loyiha qoralamasini boshlash |
| `Nomi: ...` | Maydonlarni to'ldirish (Nomi, Kategoriya, Tavsif, Stack, URL, Yil) |
| 📸 rasm | Rasm qo'shish (1-6 ta) |
| `/korish` | Qoralama holatini ko'rish |
| `/saqlash` | Loyihani saytga chiqarish |
| `/bekor` | Qoralamani bekor qilish |
| `/royxat` | Bot orqali qo'shilgan loyihalar |
| `/ochirish slug` | Loyihani o'chirish |

Misol:

```
/yangi
Nomi: Yangi Loyiham
Kategoriya: E-commerce
Tavsif: Onlayn do'kon platformasi
Stack: Next.js, Tailwind, Payme
URL: https://misol.uz
```
keyin rasmlarni yuboring va `/saqlash` deb yozing. Sayt 1-2 daqiqada yangilanadi.

### Saqlash rejimi

- **Vercel'da**: `GITHUB_TOKEN` + `GITHUB_REPO` berilsa, bot ma'lumot va rasmlarni to'g'ridan-to'g'ri repoga commit qiladi — Vercel avtomatik qayta deploy qiladi. Serverless muhitda bu yagona ishonchli usul.
- **VPS/lokal**: hech narsa berilmasa `data/portfolio.json` va `public/uploads/` ga yoziladi.

## SEO

- Har sahifada alohida `title`, `description`, `canonical`, OpenGraph
- Dinamik `sitemap.xml` (portfolio sahifalari avtomatik qo'shiladi) va `robots.txt`
- JSON-LD: Organization, WebSite, OfferCatalog, ItemList, CreativeWork, FAQPage, BreadcrumbList
- `next/image` AVIF/WebP optimizatsiyasi, lazy-load, security headerlar
