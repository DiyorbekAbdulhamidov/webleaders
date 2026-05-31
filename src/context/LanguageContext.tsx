'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

const translations = {
  UZ: {
    nav: {
      services: 'Kompetensiyalar',
      portfolio: 'Amaliyot',
      pricing: 'Modellar',
      contact: 'Hamkorlik',
      btn: 'Tashabbus'
    },
    hero: {
      badge: 'Webleaders — Raqamli Transformatsiya Bo‘yicha Strategik Hamkor',
      title1: 'Biznes Jarayonlarini Optimallashtirish.',
      title2: 'Raqamli Masshtablanish.',
      desc: 'Vizual yechimlar — bu standart. Biz korporativ unumdorlikni oshirish, barqaror o‘sishni ta’minlash va bozor pozitsiyalarini mustahkamlashga qaratilgan yuqori texnologik infratuzilmalarni loyihalashtiramiz.',
      btnPrimary: 'Tashabbusni Boshlash',
      btnSecondary: 'Ekspertiza'
    },
    services: {
      badge: 'Xizmatlar Portfeli',
      title: 'Korporativ Sektor Uchun',
      subtitle: 'Kompleks Yechimlar',
      desc: 'Strategik tahlildan to to‘liq integratsiyagacha. Biznesingizning raqamli yetukligini ta’minlovchi yuqori texnologik xizmatlar.',
      list: [
        { title: 'Tranzaksion Platformalar', desc: 'Mijoz oqimini samarali boshqaruvchi, neuromarketing va ilg‘or veb-arxitektura asosidagi resurslar.' },
        { title: 'Korporativ Ilovalar', desc: 'iOS va Android uchun mo‘ljallangan, yuqori unumdorlikka va kiberxavfsizlikka ega native dasturiy yechimlar.' },
        { title: 'Tizimli Integratsiya (ERP)', desc: 'Operatsion samaradorlikni oshirish. Resurslar, moliya va xodimlarni yagona ma’lumotlar bazasiga birlashtirish.' },
        { title: 'SEO Muhandisligi & Tahlil', desc: 'Qidiruv tizimlarida barqaror yetakchilik. Algoritmik tahlil va semantik optimizatsiya orqali organik o‘sish.' },
        { title: 'E-Commerce Ekotizimlari', desc: 'Global savdo platformalari. Xalqaro to‘lov va logistika tizimlari bilan integratsiyalashgan to‘liq sikl.' },
        { title: 'Infratuzilma & Xavfsizlik', desc: 'Tizimlar barqarorligini ta’minlash. Yuqori yuklamalarga chidamlilik va ma’lumotlarni bulutli himoya qilish.' }
      ]
    },
    whyUs: {
      badge: 'Sifat Boshqaruvi',
      title: 'Nega Aynan',
      subtitle: 'Webleaders?',
      desc: 'Havaskor yondashuvlar davri tugadi. Biz har bir yechim unumdorligi va dedlaynlarga rioya qilinishi uchun yuridik javobgarlikni zimmamizga olamiz.',
      list: [
        { title: 'Ekspertlar Tarkibi', desc: 'Loyiha ustida faqat xalqaro standartlarga javob beradigan, 5+ yillik tajribaga ega Senior muhandislar ishlaydi.' },
        { title: 'Mobile-First Standarti', desc: 'Trafikning asosiy qismi mobil qurilmalarda. Tizimlarimiz smartfonlarda native dasturlar kabi samarali ishlaydi.' },
        { title: 'Natijaga Yo‘naltirilgan UI', desc: 'Dizayn — bu unumdorlik vositasi. Biz foydalanuvchini maqsadli harakatga chalg‘itmasdan yetaklovchi interfeyslar chizamiz.' },
        { title: 'Maksimal Unumdorlik', desc: 'Tizim yuklanish tezligi — biznesning moliyaviy ko‘rsatkichi. Next.js texnologiyalari orqali lahzali yuklanish.' },
        { title: 'Shartnomaviy SLA', desc: 'Intizom — korporativ madaniyatimiz asosi. Shartnoma shartlari buzilsa — moliyaviy kompensatsiya kafolatlanadi.' },
        { title: 'Post-Loyiha Qo‘llab-quvvatlash', desc: 'Soddalashtirish va topshirish — bu start. Biz tizimni doimiy ravishda tahlil qilamiz va bozor talablariga moslaymiz.' }
      ]
    },
    pricing: {
      title: 'Raqamli Infratuzilmaga',
      subtitle: 'Kiritiladigan Sarmoya',
      desc: 'Bu operatsion xarajat emas — bu kompaniya kapitallashuvi va bozordagi ulushini oshirishga yo‘naltirilgan strategik investitsiyadir.',
      modalTitle: 'Hamkorlikni Rasmiylashtirish',
      modalDesc: 'Tanlangan muhandislik modeli bo‘yicha ekspert so‘rovini shakllantiring.',
      formName: 'To‘liq Ismingiz',
      formPhone: 'Aloqa Telefoningiz',
      btnSubmit: 'So‘rovni Tasdiqlash',
      btnLoading: 'Yuborilmoqda...',
      plans: [
        {
          title: 'Start',
          price: '1.5 mln',
          currency: "so'm",
          desc: 'Shaxsiy brend yoki kichik biznes sub’ektlari uchun raqamli bozorda professional start.',
          isPopular: false,
          features: [
            'Premium UI Landing Page (1 sahifa)',
            'To‘liq Mobil Adaptatsiya',
            'Ma’lumotlar Shlyuzi (Telegram/Email)',
            '3 Ish Kunida Ishga Tushirish',
            '1 Oy Texnik Qo‘llab-quvvatlash SLA'
          ]
        },
        {
          title: 'Growth',
          price: '4.5 mln',
          currency: "so'm",
          desc: 'Nufuzini oshirish va masshtablanishni ko‘zlagan korxonalar uchun optimallashgan yechim.',
          isPopular: true,
          features: [
            'Korporativ Platforma (5+ sahifa)',
            'Boshqaruv Tizimi (CMS Integratsiyasi)',
            'SEO Boshlang‘ich Optimizatsiyasi',
            'Speed Optimization Unumdorlik Tizimi',
            '3 oy VIP support + Domen & Hosting'
          ]
        },
        {
          title: 'Enterprise',
          price: '9.0 mln',
          currency: "so'm",
          desc: 'Bozor liderlari, murakkab tizimlar va maksimal avtomatlashtirishni talab qiluvchi sub’ektlar uchun.',
          isPopular: false,
          features: [
            'Yirik E-Commerce yoki Katalog Tizimi',
            'To‘lov Shlyuzlari Integratsiyasi',
            'ERP/CRM Tizimlari Bilan Sinxronizatsiya',
            'Ko‘p tilli Interfeys (Uz/Ru/En)',
            '6 oy 24/7 Shaxsiy Menejer (SLA)'
          ]
        }
      ]
    },
    contactSection: {
      badge: 'Sinergiya',
      title: 'Strategik Hamkorlik',
      subtitle: 'Muloqoti',
      desc: 'Masshtabli loyihangiz bormi yoki chuqur texnik audit kerakmi? Biz yangi chaqiriqlarga tayyormiz.',
      infoPhone: 'Aloqa',
      infoLoc: 'Ofis',
      infoEmail: 'Pochta',
      formTitle: 'So‘rov qoldirish',
      inputName: 'Ismingiz',
      inputPhone: 'Telefon',
      inputMsg: 'So‘rov tafsilotlari',
      placeholderMsg: 'Loyiha kontsepti yoki yechilishi kerak bo‘lgan muammolar haqida qisqacha...',
      btnSubmit: 'Yuborish',
      btnLoading: 'Yuborilmoqda...'
    },
    projects: {
      title: 'Amalga',
      subtitle: 'Oshirilgan Keyslar',
      desc: 'Har bir loyiha — biz uchun muhandislik chaqirig‘i, hamkorimiz uchun esa bozordagi dominantlikdir.',
      btnView: 'Saytni ko‘rish',
      techTitle: 'Stak:',
      aboutTitle: 'Keys haqida:',
      list: [
        {
          id: 'toybron',
          name: 'ToyBron AI Ecosystem',
          category: 'AI Marketplace & Super-CRM',
          desc: 'Sun’iy intellektga asoslangan ekotizim. Operatsion, moliyaviy va logistika jarayonlarini to‘liq avtomatlashtirish.',
          isFeatured: true
        },
        {
          id: 'hilaledu',
          name: 'Hilal Edu',
          category: 'Educational LMS Platform',
          desc: 'Yuqori yuklamalarga chidamli, ta’lim jarayonlarini raqamlashtiruvchi kompleks ta’lim platformasi.',
          isFeatured: false
        },
        {
          id: 'lutsente',
          name: 'Lutsente',
          category: 'Premium Corporate Website',
          desc: 'Xalqaro xoldingning raqamli nufuzi. Uch tilda to‘liq sinxronlashgan korporativ resurs.',
          isFeatured: false
        },
        {
          id: 'adizone',
          name: 'Adizone Education',
          category: 'Educational Platform',
          desc: 'Ta’lim muassasalari zanjiri uchun ERP yechim. Talabalar va to‘lovlar hisobini to‘liq avtomatlashtirish.',
          isFeatured: false
        },
        {
          id: 'kochirish',
          name: 'Kochirish Xizmati',
          category: 'Logistics Landing Page',
          desc: 'Logistika sohasida samarali yechim. Murakkab tarif kalkulyatori va real vaqtdagi buyurtmalar.',
          isFeatured: false
        },
        {
          id: 'gogermany',
          name: 'GoGermany Consulting',
          category: 'Consulting Agency Website',
          desc: 'Konsalting xizmatlari uchun optimallashgan, Yevropa standartlari asosidagi raqamli platforma.',
          isFeatured: false
        },
        {
          id: 'zarnigor',
          name: 'Zarnigor Wedding',
          category: 'CRM & Booking System',
          desc: 'Premium ijara industriyasi uchun ERP yechim. Bron tizimi va moliyaviy hisob-kitobni avtomatlashtirish.',
          isFeatured: false
        },
        {
          id: 'jetour',
          name: 'Jetour Uzbekistan',
          category: 'Avtosalon Promo Sayt',
          desc: 'Premium avtobrend uchun promo-platforma. Dinamika va nufuzni vizual yetkazish.',
          isFeatured: false
        },
        {
          id: 'dono',
          name: 'Dono-Dance',
          category: 'Raqs Maktabi Platformasi',
          desc: 'Raqamli o‘quv platformasi. Ota-onalar va o‘quvchilar uchun shaxsiy kabinetlar ekotizimi.',
          isFeatured: false
        },
        {
          id: 'telmee',
          name: 'Telmee Market',
          category: 'E-Commerce Platforma',
          desc: 'Yuqori tezlikdagi marketpleys. B2C va P2P savdo modellarini qo‘llab-quvvatlovchi elektron tijorat yechimi.',
          isFeatured: false
        }
      ]
    },
    footer: {
      rights: 'Webleaders. Barcha huquqlar qonun bilan himoyalangan',
      address: 'Toshkent sh., Yashnobod tumani',
      contact: 'Aloqa',
      socials: 'Ijtimoiy resurslar'
    },
    toast: {
      success: 'Muvaffaqiyatli qabul qilindi!',
      error: 'Tizimda texnik uzilish yuz berdi.',
      nameError: 'To‘liq ismingizni kiriting',
      phoneError: 'Telefon raqam formati noto‘g‘ri',
      msgError: 'Xabar tafsilotlari juda qisqa'
    }
  },
  RU: {
    nav: {
      services: 'Компетенции',
      portfolio: 'Кейсы',
      pricing: 'Модели',
      contact: 'Хамкорлик',
      btn: 'Старт'
    },
    hero: {
      badge: 'Webleaders — Стратегический Партнер По Цифровой Трансформации',
      title1: 'Оптимизация Бизнес Процессов.',
      title2: 'Цифровое Масштабирование.',
      desc: 'Визуальные решения — это стандарт. Мы проектируем высокотехнологичные инфраструктуры, направленные на повышение корпоративной unumdorlik, обеспечение устойчивого роста и укрепление рыночных позиций.',
      btnPrimary: 'Начать Инициативу',
      btnSecondary: 'Экспертиза'
    },
    services: {
      badge: 'Портфель Услуг',
      title: 'Комплексные Решения',
      subtitle: 'Для Корпоративного Сектора',
      desc: 'От стратегического анализа до полной интеграции. Высокотехнологичные услуги, обеспечивающие цифровую зрелость вашего бизнеса.',
      list: [
        { title: 'Транзакционные Платформы', desc: 'Ресурсы, эффективно управляющие потоком клиентов, на базе нейромаркетинга и передовой веб-архитектуры.' },
        { title: 'Корпоративные Приложения', desc: 'Native программные решения для iOS и Android, обладающие высокой производительностью и кибербезопасностью.' },
        { title: 'Системная Интеграция (ERP)', desc: 'Повышение операционной эффективности. Объединение ресурсов, финансов и персонала в единую базу данных.' },
        { title: 'SEO-Инжиниринг и Аналитика', desc: 'Стабильное лидерство в поисковых системах. Органический рост через алгоритмический анализ и семантическую оптимизацию.' },
        { title: 'Экосистемы E-Commerce', desc: 'Глобальные торговые платформы. Полный цикл с интеграцией международных платежных и логистических систем.' },
        { title: 'Инфраструктура и Безопасность', desc: 'Обеспечение стабильности систем. Устойчивость к высоким нагрузкам и облачная защита данных.' }
      ]
    },
    whyUs: {
      badge: 'Управление Качеством',
      title: 'Почему Именно',
      subtitle: 'Webleaders?',
      desc: 'Эра любительских подходов завершена. Мы несем юридическую ответственность за производительность каждого решения и соблюдение дедлайнов.',
      list: [
        { title: 'Экспертный Состав', desc: 'Над проектом работают только Senior-инженеры с опытом 5+ лет, соответствующие международным стандартам.' },
        { title: 'Стандарт Mobile-First', desc: 'Основная часть трафика приходится на мобильные устройства. Наши системы работают на смартфонах так же эффективно, как native приложения.' },
        { title: ' UI, Ориентированный на Результат', desc: 'Дизайн — это инструмент производительности. Мы проектируем интерфейсы, ведущие пользователя к целевому действию, не отвлекая.' },
        { title: 'Максимальная Производительность', desc: 'Скорость загрузки системы — финансовый показатель бизнеса. Мгновенная загрузка благодаря технологиям Next.js.' },
        { title: 'Договорной SLA', desc: 'Дисциплина — основа нашей корпоративной культуры. Нарушение условий договора гарантирует финансовую компенсацию.' },
        { title: 'Пост-Проектная Поддержка', desc: 'Упрощение и сдача — это старт. Мы постоянно анализируем систему и адаптируем её под требования рынка.' }
      ]
    },
    pricing: {
      title: 'Инвестиции в Цифровую',
      subtitle: 'Инфраструктуру',
      desc: 'Это не операционные расходы — это стратегическая инвестиция, направленная на повышение капитализации компании и доли рынка.',
      modalTitle: 'Оформление Хамкорлик',
      modalDesc: 'Сформируйте экспертный запрос по выбранной инженерной модели.',
      formName: 'Ваше Полное Имя',
      formPhone: 'Ваш Телефон',
      btnSubmit: 'Подтвердить Запрос',
      btnLoading: 'Отправка...',
      plans: [
        {
          title: 'Start',
          price: '1.5 млн',
          currency: "сум",
          desc: 'Профессиональный старт на цифровом рынке для личного бренда или субъектов малого бизнеса.',
          isPopular: false,
          features: [
            'Premium UI Landing Page (1 страница)',
            'Полная Мобильная Адаптация',
            'Шлюз Данных (Telegram/Email)',
            'Запуск за 3 Рабочих Дня',
            '1 Месяц Технической Поддержки SLA'
          ]
        },
        {
          title: 'Growth',
          price: '4.5 млн',
          currency: "сум",
          desc: 'Оптимизированное решение для предприятий, нацеленных на повышение авторитета и масштабирование.',
          isPopular: true,
          features: [
            'Корпоративная Платформа (5+ страниц)',
            'Система Управления (Интеграция CMS)',
            'SEO Базовая Оптимизация',
            'Система Производительности Speed Optimization',
            '3 месяца VIP support + Домен & Хостинг'
          ]
        },
        {
          title: 'Enterprise',
          price: '9.0 млн',
          currency: "сум",
          desc: 'Для лидеров рынка, сложных систем и субъектов, требующих максимальной автоматизации.',
          isPopular: false,
          features: [
            'Крупная E-Commerce или Каталог Система',
            'Интеграция Платежных Шлюзов',
            'Синхронизация с ERP/CRM Системами',
            'Мультиязычный Интерфейс (Uz/Ru/En)',
            '6 месяцев Личный Менеджер (SLA)'
          ]
        }
      ]
    },
    contactSection: {
      badge: 'Хамкорлик',
      title: 'Диалог Стратегического',
      subtitle: 'Хамкорлик',
      desc: 'Есть масштабный проект или нужен глубокий технический аудит? Мы готовы к новым вызовам.',
      infoPhone: 'Связь',
      infoLoc: 'Офис',
      infoEmail: 'Почта',
      formTitle: 'Оставить заявку',
      inputName: 'Ваше Имя',
      inputPhone: 'Телефон',
      inputMsg: 'Детали запроса',
      placeholderMsg: 'Кратко о концепте проекта или решаемых проблемах...',
      btnSubmit: 'Отправить',
      btnLoading: 'Отправка...'
    },
    projects: {
      title: 'Реализованные',
      subtitle: 'Кейсы',
      desc: 'Каждый проект — для нас инженерный вызов, для нашего хамкора — доминирование на рынке.',
      btnView: 'Смотреть сайт',
      techTitle: 'Стек:',
      aboutTitle: 'О кейсе:',
      list: [
        {
          id: 'toybron',
          name: 'ToyBron AI Ecosystem',
          category: 'AI Marketplace & Super-CRM',
          desc: 'Экосистема на базе искусственного интеллекта. Полная автоматизация операционных, финансовых и логистических процессов.',
          isFeatured: true
        },
        {
          id: 'hilaledu',
          name: 'Hilal Edu',
          category: 'Educational Platform',
          desc: 'Устойчивая к высоким нагрузкам комплексная образовательная платформа, цифровизирующая учебный процесс.',
          isFeatured: false
        },
        {
          id: 'lutsente',
          name: 'Lutsente',
          category: 'Premium Corporate Website',
          desc: 'Цифровой авторитет международного холдинга. Полностью синхронизированный корпоративный ресурс на трех языках.',
          isFeatured: false
        },
        {
          id: 'adizone',
          name: 'Adizone Education',
          category: 'Educational Platform',
          desc: 'ERP решение для сетей учебных заведений. Полная автоматизация учета студентов и платежей.',
          isFeatured: false
        },
        {
          id: 'kochirish',
          name: 'Kochirish Xizmati',
          category: 'Logistics Landing Page',
          desc: 'Эффективное решение в сфере логистики. Сложный тарифный калькулятор и заказы в реальном времени.',
          isFeatured: false
        },
        {
          id: 'gogermany',
          name: 'GoGermany Consulting',
          category: 'Consulting Agency Website',
          desc: 'Оптимизированная цифровая платформа для консалтинговых услуг на базе европейских стандартов.',
          isFeatured: false
        },
        {
          id: 'zarnigor',
          name: 'Zarnigor Wedding',
          category: 'CRM & Booking System',
          desc: 'ERP решение для индустрии премиальной аренды. Автоматизация системы бронирования и финансового учета.',
          isFeatured: false
        },
        {
          id: 'jetour',
          name: 'Jetour Uzbekistan',
          category: 'Avtosalon Promo Sayt',
          desc: 'Промо-платформа для автобренда премиум-класса. Визуальная передача динамики и статуса.',
          isFeatured: false
        },
        {
          id: 'dono',
          name: 'Dono-Dance',
          category: 'Raqs Maktabi Platformasi',
          desc: 'Цифровая учебная платформа. Экосистема личных кабинетов для родителей и учащихся.',
          isFeatured: false
        },
        {
          id: 'telmee',
          name: 'Telmee Market',
          category: 'E-Commerce Platforma',
          desc: 'Высокоскоростной маркетплейс. Электронное торговое решение, поддерживающее модели B2C и P2P.',
          isFeatured: false
        }
      ]
    },
    footer: {
      rights: 'Webleaders. Все права защищены законом',
      address: 'г. Ташкент, Яшнабадский р-н',
      contact: 'Связь',
      socials: 'Иjtimoiy ресурсы'
    },
    toast: {
      success: 'Успешно принято!',
      error: 'Произошел технический сбой в системе.',
      nameError: 'Введите ваше полное имя',
      phoneError: 'Неверный формат номера телефона',
      msgError: 'Детали сообщения очень короткие'
    }
  },
  EN: {
    nav: {
      services: 'Competencies',
      portfolio: 'Practice',
      pricing: 'Models',
      contact: 'Synergy',
      btn: 'Start'
    },
    hero: {
      badge: 'Webleaders — Strategic Partner For Digital Transformation',
      title1: 'Business Process Optimization.',
      title2: 'Digital Scaling.',
      desc: 'Visual solutions are the standard. We engineer high-tech infrastructures aimed at enhancing corporate productivity, ensuring sustainable growth, and strengthening market positions.',
      btnPrimary: 'Initialize Evolution',
      btnSecondary: 'Expertise'
    },
    services: {
      badge: 'Service Portfolio',
      title: 'Comprehensive Solutions',
      subtitle: 'For The Corporate Sector',
      desc: 'From strategic analysis to complete integration. High-tech services ensuring the digital maturity of your business.',
      list: [
        { title: 'Transactional Platforms', desc: 'Resources effectively managing client flow, based on neuromarketing and advanced web architecture.' },
        { title: 'Corporate Applications', desc: 'Native software solutions for iOS and Android, possessing high performance and cybersecurity.' },
        { title: 'System Integration (ERP)', desc: 'Enhancing operational efficiency. Unifying resources, finances, and personnel into a single database.' },
        { title: 'SEO-Engineering & Analytics', desc: 'Stable leadership in search systems. Organic growth through algorithmic analysis and semantic optimization.' },
        { title: 'E-Commerce Ecosystems', desc: 'Global trading platforms. Full cycle with integration of international payment and logistics systems.' },
        { title: 'Infrastructure & Security', desc: 'Ensuring system stability. Resistance to high loads and cloud data protection.' }
      ]
    },
    whyUs: {
      badge: 'Quality Management',
      title: 'Why Partners Choose',
      subtitle: 'Webleaders?',
      desc: 'The era of amateur approaches is over. We assume legal liability for the performance of every solution and strict adherence to deadlines.',
      list: [
        { title: 'Expert Team', desc: 'Only Senior engineers with 5+ years of experience, meeting international standards, work on the project.' },
        { title: 'Mobile-First Standard', desc: 'The majority of traffic is on mobile devices. Our systems work as efficiently on smartphones as native applications.' },
        { title: 'Result-Oriented UI', desc: 'Design is a productivity tool. We design interfaces that guide the user to the target action without distraction.' },
        { title: 'Maximum Performance', desc: 'System load speed is a financial indicator of business. Instant loading thanks to Next.js technologies.' },
        { title: 'Contractual SLA', desc: 'Discipline is the foundation of our corporate culture. Violation of contract terms guarantees financial compensation.' },
        { title: 'Post-Project Support', desc: 'Simplification and delivery is the start. We constantly analyze the system and adapt it to market requirements.' }
      ]
    },
    pricing: {
      title: 'Investment In Digital',
      subtitle: 'Infrastructure',
      desc: 'This is not an operational expense — it is a strategic investment aimed at multiplying company capitalization and market share.',
      modalTitle: 'Formalize Synergy',
      modalDesc: 'Submit an expert brief for your chosen software engineering model.',
      formName: 'Your Full Name',
      formPhone: 'Contact Phone',
      btnSubmit: 'Confirm Request',
      btnLoading: 'Transmitting secure data...',
      plans: [
        {
          title: 'Start',
          price: '1.5 mln',
          currency: "UZS",
          desc: 'A robust digital launchpad optimized for emerging startups or personal brands.',
          isPopular: false,
          features: [
            'Premium UI Landing Page (1 page)',
            'Flawless Mobile Responsive',
            'Automated Lead Channels (Telegram/Email API)',
            'Full deploy within 3 business days',
            '1-Month guaranteed maintenance SLA'
          ]
        },
        {
          title: 'Growth',
          price: '4.5 mln',
          currency: "UZS",
          desc: 'Engineered for rapidly scaling businesses focused on capturing sector dominance.',
          isPopular: true,
          features: [
            'Multi-Tier Corporate Core (5+ Pages)',
            'Custom Secure Management Panel (CMS)',
            'Advanced Core SEO Engine Framework',
            'Full-Scale Speed Optimization Mechanics',
            '3-Months VIP Support SLA + Free Domain & Hosting'
          ]
        },
        {
          title: 'Enterprise',
          price: '9.0 mln',
          currency: "UZS",
          desc: 'For enterprise market leaders demanding absolute automation and custom integrations.',
          isPopular: false,
          features: [
            'High-Scale E-Commerce Hub or Directory',
            'Multi-Gateway Payment Rails Integration',
            'Bi-Directional CRM & Warehouse ERP System',
            'Full Multilingual Localization (Uz/Ru/En)',
            'Dedicated Personal IT Director (24/7 SLA) for 6 Months'
          ]
        }
      ]
    },
    contactSection: {
      badge: 'Synergy',
      title: 'Strategic Partnership',
      subtitle: 'Dialogue',
      desc: 'Have a mass-scale project or need a high-level technical audit? We are always ready to discuss.',
      infoPhone: 'Communications Hub',
      infoLoc: 'Office',
      infoEmail: 'Pochta',
      formTitle: 'Submit Project Blueprint',
      inputName: 'Your Name',
      inputPhone: 'Phone',
      inputMsg: 'Project Objectives',
      placeholderMsg: 'Briefly define your product scope or business goals...',
      btnSubmit: 'Transmit Request',
      btnLoading: 'Sending...'
    },
    projects: {
      title: 'Digital',
      subtitle: 'Milestones Of Pride',
      desc: 'To us, each case is not just codebase artifacts, but a story of our partners capturing market share.',
      btnView: 'Visit Site',
      techTitle: 'Stack:',
      aboutTitle: 'Keys:',
      list: [
        {
          id: 'toybron',
          name: 'ToyBron AI Ecosystem',
          category: 'AI Marketplace & Super-CRM',
          desc: 'Ecosystem based on artificial intelligence. Full automation of operational, financial, and logistical processes.',
          isFeatured: true
        },
        {
          id: 'hilaledu',
          name: 'Hilal Edu',
          category: 'Educational LMS Platform',
          desc: 'Highly scalable educational LMS engineered to digitalize academic operations mass-scale.',
          isFeatured: false
        },
        {
          id: 'lutsente',
          name: 'Lutsente',
          category: 'Premium Corporate Hub',
          desc: 'Digital footprint of a multinational holding. Secure core synchronized across 3 international languages.',
          isFeatured: false
        },
        {
          id: 'adizone',
          name: 'Adizone Education',
          category: 'Educational Platform',
          desc: 'ERP infrastructure for academy chains. Full automation of student management, billing, and certification.',
          isFeatured: false
        },
        {
          id: 'kochirish',
          name: 'Move Service',
          category: 'Logistics High-Converting Page',
          desc: 'A leading logistics web core featuring a multi-variable tariff matrix and real-time fleet ordering.',
          isFeatured: false
        },
        {
          id: 'gogermany',
          name: 'GoGermany Consulting',
          category: 'International Consulting Portal',
          desc: 'A high-conversion international consulting engine architected entirelly according to European visual styles.',
          isFeatured: false
        },
        {
          id: 'zarnigor',
          name: 'Zarnigor Wedding',
          category: 'Bespoke CRM & Booking',
          desc: 'Bespoke ERP architecture for the luxury rental industry, featuring booking systems and automated ledgering.',
          isFeatured: false
        },
        {
          id: 'jetour',
          name: 'Jetour Uzbekistan',
          category: 'Automotive Digital Experience',
          desc: 'Car brand showroom demo. Emotional frontend architecture delivering mechanical power and aesthetics.',
          isFeatured: false
        },
        {
          id: 'dono',
          name: 'Dono-Dance',
          category: 'Dance School Platform',
          desc: 'Masofaviy educational infrastructure built with dedicated portals for students, parents, and billing managers.',
          isFeatured: false
        },
        {
          id: 'telmee',
          name: 'Telmee Market',
          category: 'Next-Gen E-Commerce Market',
          desc: 'Highly optimized digital marketplace managing hybrid B2C and P2P transaction commerce rails.',
          isFeatured: false
        }
      ]
    },
    footer: {
      rights: 'Webleaders. Barcha huquqlar qonun bilan himoyalangan',
      address: 'Tashkent city, Yashnabad district',
      contact: 'Aloqa',
      socials: 'Raqamli resurslar'
    },
    toast: {
      success: 'Yourbrief was received successfully over secure connections!',
      error: 'An error occurred!',
      nameError: 'Enter full name',
      phoneError: 'The contact configuration must match international telephone standards.',
      msgError: 'Message is too short'
    }
  }
}

type LangType = 'UZ' | 'RU' | 'EN'

interface LanguageContextType {
  language: LangType
  setLanguage: (lang: LangType) => void
  t: typeof translations['UZ']
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LangType>('UZ')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLang = localStorage.getItem('lang') as LangType
    if (savedLang && ['UZ', 'RU', 'EN'].includes(savedLang)) {
      setLanguage(savedLang)
    }
  }, [])

  const handleSetLanguage = (lang: LangType) => {
    setLanguage(lang)
    localStorage.setItem('lang', lang)
  }

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: 'UZ', setLanguage: handleSetLanguage, t: translations['UZ'] }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider')
  return context
}