/**
 * O'zbekcha matnlar — standart til, statik import qilinadi.
 *
 * Bu fayl `Translations` tipining manbasi — RU va EN unga mos bo'lishi shart.
 */
export const uz = {
  nav: {
    home: 'Bosh sahifa',
    services: 'Xizmatlar',
    portfolio: 'Portfolio',
    pricing: 'Narxlar',
    contact: 'Aloqa',
    btn: 'Buyurtma berish'
  },
  hero: {
    badge: 'Webleaders — Raqamli Transformatsiya Bo‘yicha Strategik Hamkor',
    title1: 'Biznesingizni Onlaynda',
    title2: 'Yetakchiga Aylantiramiz.',
    desc: 'Sotuvga ishlaydigan saytlar, CRM tizimlar va mobil ilovalar. Zamonaviy dizayn, yuqori tezlik va Google’da yuqori o‘rinlar — bitta jamoadan.',
    btnPrimary: 'Loyihani Boshlash',
    btnSecondary: 'Ishlarimizni Ko‘rish',
    stats: [
      { value: '40+', label: 'Muvaffaqiyatli loyiha' },
      { value: '5+', label: 'Yillik tajriba' },
      { value: '3', label: 'Tilda xizmat' },
      { value: '24/7', label: 'Texnik yordam' }
    ]
  },
  services: {
    badge: 'Xizmatlar',
    title: 'Biznesingiz Uchun',
    subtitle: 'Kompleks Yechimlar',
    desc: 'Strategik tahlildan to‘liq integratsiyagacha — biznesingizning raqamli o‘sishini ta’minlovchi xizmatlar.',
    btnAll: 'Barcha xizmatlar',
    list: [
      { title: 'Veb-Sayt Yaratish', desc: 'Sotuvga yo‘naltirilgan landing va korporativ saytlar. Premium dizayn, yuqori tezlik va mijozni buyurtmaga yetaklovchi tuzilma.' },
      { title: 'Mobil Ilovalar', desc: 'iOS va Android uchun yuqori unumdorlikka ega native va cross-platform ilovalar. Mijozlaringiz bilan doimiy aloqa kanali.' },
      { title: 'CRM / ERP Tizimlar', desc: 'Biznes jarayonlarini avtomatlashtirish: mijozlar, moliya va xodimlar hisobini yagona tizimda boshqaring.' },
      { title: 'SEO Optimizatsiya', desc: 'Google va Yandex’da yuqori o‘rinlar. Texnik audit, semantik yadro va kontent strategiyasi orqali barqaror organik trafik.' },
      { title: 'E-Commerce', desc: 'Onlayn do‘kon va marketpleyslar. To‘lov tizimlari (Payme, Click, Uzum) va logistika integratsiyasi bilan to‘liq sikl.' },
      { title: 'Texnik Qo‘llab-quvvatlash', desc: 'Saytingiz uzluksiz ishlashi uchun 24/7 monitoring, xavfsizlik yangilanishlari va doimiy rivojlantirish.' }
    ]
  },
  whyUs: {
    badge: 'Nega Biz',
    title: 'Nega Aynan',
    subtitle: 'Webleaders?',
    desc: 'Biz shunchaki sayt yasamaymiz — biznesingizga daromad keltiradigan raqamli vosita quramiz va natija uchun javobgarlikni olamiz.',
    list: [
      { title: 'Tajribali Jamoa', desc: 'Loyihangiz ustida 5+ yillik tajribaga ega, xalqaro standartlarda ishlaydigan muhandislar ishlaydi.' },
      { title: 'Mobile-First', desc: 'Trafikning 80% mobil qurilmalardan keladi. Saytlarimiz smartfonlarda native ilova kabi ishlaydi.' },
      { title: 'Sotuvchi Dizayn', desc: 'Dizayn — bu daromad vositasi. Har bir element mijozni buyurtmaga yetaklaydigan qilib loyihalanadi.' },
      { title: 'Maksimal Tezlik', desc: 'Sekundiga yuklanadigan sayt = yo‘qotilgan mijoz. Next.js texnologiyasi bilan lahzali yuklanish.' },
      { title: 'Shartnoma va SLA', desc: 'Muddat va sifat shartnomada qayd etiladi. Shartlar buzilsa — moliyaviy kompensatsiya kafolatlanadi.' },
      { title: 'Doimiy Qo‘llab-quvvatlash', desc: 'Topshirish — bu boshlanish. Saytingizni doimiy tahlil qilamiz va bozor talabiga moslab boramiz.' }
    ]
  },
  process: {
    badge: 'Ish Jarayoni',
    title: 'G‘oyadan Natijagacha',
    subtitle: '4 Bosqich',
    desc: 'Shaffof jarayon: har bir bosqichda nima bo‘layotganini bilib turasiz.',
    steps: [
      { num: '01', title: 'Tahlil va Strategiya', desc: 'Biznesingiz, raqobatchilar va auditoriyani o‘rganamiz. Aniq texnik topshiriq va reja tuzamiz.' },
      { num: '02', title: 'Dizayn', desc: 'Brendingizga mos, sotuvga yo‘naltirilgan UI/UX dizayn. Tasdiqlagunizcha qayta ishlaymiz.' },
      { num: '03', title: 'Dasturlash', desc: 'Zamonaviy texnologiyalarda toza kod. Har hafta jarayon haqida hisobot berib boramiz.' },
      { num: '04', title: 'Ishga Tushirish', desc: 'Test, SEO sozlash, domen va hosting. Ishga tushgandan keyin ham yoningizda qolamiz.' }
    ]
  },
  pricing: {
    badge: 'Narxlar',
    title: 'Investitsiya',
    subtitle: 'Rejalari',
    desc: 'Yashirin to‘lovlarsiz, aniq narxlar. Har bir reja — biznesingiz o‘sishiga qaratilgan investitsiya.',
    btnAll: 'Barcha narxlar',
    modalTitle: 'Buyurtma Berish',
    modalDesc: 'rejasi bo‘yicha so‘rov qoldiring — 15 daqiqada aloqaga chiqamiz.',
    formName: 'To‘liq Ismingiz',
    formPhone: 'Telefon Raqamingiz',
    btnSubmit: 'Yuborish',
    btnLoading: 'Yuborilmoqda...',
    btnSelect: 'Tanlash',
    popular: 'ENG OMMABOP',
    plans: [
      {
        title: 'Start',
        price: '1.5 mln',
        currency: "so'm",
        desc: 'Shaxsiy brend yoki kichik biznes uchun professional start.',
        isPopular: false,
        features: [
          'Premium UI Landing Page (1 sahifa)',
          'To‘liq Mobil Adaptatsiya',
          'Telegram/Email’ga buyurtmalar',
          '3 Ish Kunida Ishga Tushirish',
          '1 Oy Texnik Qo‘llab-quvvatlash'
        ]
      },
      {
        title: 'Growth',
        price: '4.5 mln',
        currency: "so'm",
        desc: 'O‘sish va masshtablanishni ko‘zlagan korxonalar uchun.',
        isPopular: true,
        features: [
          'Korporativ Sayt (5+ sahifa)',
          'Boshqaruv Paneli (CMS)',
          'SEO Optimizatsiya',
          'Tezlik Optimizatsiyasi',
          '3 Oy VIP Support + Domen & Hosting'
        ]
      },
      {
        title: 'Enterprise',
        price: '9.0 mln',
        currency: "so'm",
        desc: 'Murakkab tizimlar va maksimal avtomatlashtirish uchun.',
        isPopular: false,
        features: [
          'E-Commerce yoki Katalog Tizimi',
          'To‘lov Tizimlari (Payme, Click)',
          'CRM/ERP Integratsiyasi',
          'Ko‘p Tilli Interfeys (Uz/Ru/En)',
          '6 Oy 24/7 Shaxsiy Menejer'
        ]
      }
    ]
  },
  faq: {
    badge: 'Savol-Javob',
    title: 'Ko‘p Beriladigan',
    subtitle: 'Savollar',
    items: [
      { q: 'Sayt qancha vaqtda tayyor bo‘ladi?', a: 'Landing sahifa — 3-5 ish kuni, korporativ sayt — 2-3 hafta, murakkab tizimlar (CRM, e-commerce) — 1-2 oy. Aniq muddat texnik topshiriqdan keyin shartnomada belgilanadi.' },
      { q: 'To‘lov qanday amalga oshiriladi?', a: 'Odatda 50% oldindan, 50% loyiha topshirilganda. Yirik loyihalarda bosqichma-bosqich to‘lov jadvali tuziladi. Naqd, pul o‘tkazma yoki bank hisobiga to‘lash mumkin.' },
      { q: 'Domen va hosting kimning zimmasida?', a: 'Growth va Enterprise rejalarida birinchi yil domen va hosting bizdan sovg‘a. Keyingi yillarda ham sozlash va yangilashda to‘liq yordam beramiz.' },
      { q: 'Sayt Google’da chiqadimi?', a: 'Ha. Barcha saytlarimiz SEO asoslari bilan topshiriladi: texnik optimizatsiya, meta-teglar, sitemap, tezlik. Growth va Enterprise rejalarida chuqur SEO ham kiradi.' },
      { q: 'Tayyor saytga o‘zgartirish kirita olamanmi?', a: 'CMS boshqaruv paneli orqali matn, rasm va yangiliklarni o‘zingiz boshqarasiz. Murakkabroq o‘zgarishlar uchun support xizmatimiz doim yoningizda.' },
      { q: 'Nega aynan sizni tanlashim kerak?', a: 'Biz natijaga ishlaymiz: portfolio’dagi har bir loyiha real biznesga xizmat qilmoqda. Shartnoma, aniq muddat va ishga tushgandan keyingi qo‘llab-quvvatlash — standartimiz.' }
    ]
  },
  cta: {
    title: 'Loyihangizni Muhokama Qilamizmi?',
    desc: 'Bepul konsultatsiya oling — loyihangizni tahlil qilib, aniq narx va muddatni aytamiz. Majburiyatsiz.',
    btn: 'Buyurtma Berish',
    btnCall: 'Qo‘ng‘iroq Qilish',
    telegram: 'Telegram’da yozish'
  },
  projects: {
    badge: 'Portfolio',
    title: 'Amalga Oshirilgan',
    subtitle: 'Loyihalar',
    desc: 'Har bir loyiha — real biznesga xizmat qilayotgan jonli mahsulot. Ko‘pchiligiga kirib ko‘rishingiz mumkin.',
    btnView: 'Saytga Kirish',
    btnDetails: 'Batafsil',
    btnAll: 'Barcha loyihalar',
    liveBadge: 'Jonli',
    filterAll: 'Barchasi',
    detail: {
      overview: 'Loyiha Haqida',
      stack: 'Texnologiyalar',
      year: 'Yil',
      category: 'Yo‘nalish',
      visit: 'Saytga Kirish',
      gallery: 'Galereya',
      other: 'Boshqa Loyihalar',
      back: 'Portfolio’ga qaytish',
      orderSimilar: 'Shunga o‘xshash loyiha buyurtma qilish'
    }
  },
  contactSection: {
    badge: 'Aloqa',
    title: 'Loyihangiz Bormi?',
    subtitle: 'Gaplashamiz',
    desc: 'Formani to‘ldiring — 15 daqiqa ichida aloqaga chiqamiz. Yoki to‘g‘ridan-to‘g‘ri qo‘ng‘iroq qiling.',
    infoPhone: 'Telefon',
    infoLoc: 'Manzil',
    infoEmail: 'Email',
    infoTelegram: 'Telegram',
    formTitle: 'So‘rov Qoldirish',
    inputName: 'Ismingiz',
    inputPhone: 'Telefon',
    inputMsg: 'Loyiha haqida',
    placeholderMsg: 'Loyihangiz haqida qisqacha yozing...',
    btnSubmit: 'Yuborish',
    btnLoading: 'Yuborilmoqda...'
  },
  footer: {
    rights: 'Barcha huquqlar himoyalangan',
    address: 'Toshkent sh., Yashnobod tumani',
    contact: 'Aloqa',
    socials: 'Ijtimoiy tarmoqlar',
    desc: 'Biznesingizni raqamli dunyoda yangi bosqichga olib chiquvchi IT kompaniya. Sifat, tezlik va natija.',
    menuTitle: 'Sahifalar'
  },
  toast: {
    success: 'Muvaffaqiyatli yuborildi! Tez orada aloqaga chiqamiz.',
    error: 'Xatolik yuz berdi. Qayta urinib ko‘ring.',
    nameError: 'To‘liq ismingizni kiriting',
    phoneError: 'Telefon raqam formati noto‘g‘ri',
    msgError: 'Xabar juda qisqa',
    wait: 'Iltimos, biroz kuting...'
  }
}

export type Translations = typeof uz
export default uz
