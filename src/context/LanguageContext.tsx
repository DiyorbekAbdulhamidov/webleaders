'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

const translations = {
  UZ: {
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
  },
  RU: {
    nav: {
      home: 'Главная',
      services: 'Услуги',
      portfolio: 'Портфолио',
      pricing: 'Цены',
      contact: 'Контакты',
      btn: 'Заказать'
    },
    hero: {
      badge: 'Webleaders — Стратегический Партнер По Цифровой Трансформации',
      title1: 'Сделаем Ваш Бизнес',
      title2: 'Лидером в Онлайне.',
      desc: 'Продающие сайты, CRM-системы и мобильные приложения. Современный дизайн, высокая скорость и топ-позиции в Google — от одной команды.',
      btnPrimary: 'Начать Проект',
      btnSecondary: 'Смотреть Работы',
      stats: [
        { value: '40+', label: 'Успешных проектов' },
        { value: '5+', label: 'Лет опыта' },
        { value: '3', label: 'Языка сервиса' },
        { value: '24/7', label: 'Тех. поддержка' }
      ]
    },
    services: {
      badge: 'Услуги',
      title: 'Комплексные Решения',
      subtitle: 'Для Вашего Бизнеса',
      desc: 'От стратегического анализа до полной интеграции — услуги, обеспечивающие цифровой рост вашего бизнеса.',
      btnAll: 'Все услуги',
      list: [
        { title: 'Создание Сайтов', desc: 'Продающие лендинги и корпоративные сайты. Премиальный дизайн, высокая скорость и структура, ведущая клиента к заказу.' },
        { title: 'Мобильные Приложения', desc: 'Высокопроизводительные native и cross-platform приложения для iOS и Android. Постоянный канал связи с клиентами.' },
        { title: 'CRM / ERP Системы', desc: 'Автоматизация бизнес-процессов: управляйте клиентами, финансами и персоналом в единой системе.' },
        { title: 'SEO Оптимизация', desc: 'Топ-позиции в Google и Яндекс. Стабильный органический трафик через технический аудит, семантику и контент-стратегию.' },
        { title: 'E-Commerce', desc: 'Интернет-магазины и маркетплейсы. Полный цикл с интеграцией платежных систем (Payme, Click, Uzum) и логистики.' },
        { title: 'Техническая Поддержка', desc: 'Мониторинг 24/7, обновления безопасности и постоянное развитие для бесперебойной работы сайта.' }
      ]
    },
    whyUs: {
      badge: 'Почему Мы',
      title: 'Почему Именно',
      subtitle: 'Webleaders?',
      desc: 'Мы не просто делаем сайты — мы строим цифровой инструмент, приносящий доход вашему бизнесу, и берем ответственность за результат.',
      list: [
        { title: 'Опытная Команда', desc: 'Над проектом работают инженеры с опытом 5+ лет, работающие по международным стандартам.' },
        { title: 'Mobile-First', desc: '80% трафика приходит с мобильных устройств. Наши сайты работают на смартфонах как native-приложения.' },
        { title: 'Продающий Дизайн', desc: 'Дизайн — это инструмент дохода. Каждый элемент проектируется так, чтобы вести клиента к заказу.' },
        { title: 'Максимальная Скорость', desc: 'Медленный сайт = потерянный клиент. Мгновенная загрузка благодаря технологии Next.js.' },
        { title: 'Договор и SLA', desc: 'Сроки и качество фиксируются в договоре. Нарушение условий — гарантированная финансовая компенсация.' },
        { title: 'Постоянная Поддержка', desc: 'Сдача проекта — это начало. Постоянно анализируем сайт и адаптируем под требования рынка.' }
      ]
    },
    process: {
      badge: 'Процесс',
      title: 'От Идеи до Результата',
      subtitle: '4 Этапа',
      desc: 'Прозрачный процесс: вы всегда знаете, что происходит на каждом этапе.',
      steps: [
        { num: '01', title: 'Анализ и Стратегия', desc: 'Изучаем ваш бизнес, конкурентов и аудиторию. Составляем точное ТЗ и план.' },
        { num: '02', title: 'Дизайн', desc: 'Продающий UI/UX дизайн в стиле вашего бренда. Дорабатываем до вашего утверждения.' },
        { num: '03', title: 'Разработка', desc: 'Чистый код на современных технологиях. Еженедельные отчеты о ходе работ.' },
        { num: '04', title: 'Запуск', desc: 'Тестирование, настройка SEO, домен и хостинг. Остаемся рядом и после запуска.' }
      ]
    },
    pricing: {
      badge: 'Цены',
      title: 'Инвестиционные',
      subtitle: 'Планы',
      desc: 'Прозрачные цены без скрытых платежей. Каждый план — инвестиция в рост вашего бизнеса.',
      btnAll: 'Все цены',
      modalTitle: 'Оформить Заказ',
      modalDesc: '— оставьте заявку, свяжемся в течение 15 минут.',
      formName: 'Ваше Полное Имя',
      formPhone: 'Ваш Телефон',
      btnSubmit: 'Отправить',
      btnLoading: 'Отправка...',
      btnSelect: 'Выбрать',
      popular: 'ПОПУЛЯРНЫЙ',
      plans: [
        {
          title: 'Start',
          price: '1.5 млн',
          currency: 'сум',
          desc: 'Профессиональный старт для личного бренда или малого бизнеса.',
          isPopular: false,
          features: [
            'Premium UI Landing Page (1 страница)',
            'Полная мобильная адаптация',
            'Заявки в Telegram/Email',
            'Запуск за 3 рабочих дня',
            '1 месяц технической поддержки'
          ]
        },
        {
          title: 'Growth',
          price: '4.5 млн',
          currency: 'сум',
          desc: 'Для компаний, нацеленных на рост и масштабирование.',
          isPopular: true,
          features: [
            'Корпоративный сайт (5+ страниц)',
            'Панель управления (CMS)',
            'SEO Оптимизация',
            'Оптимизация скорости',
            '3 месяца VIP-поддержки + Домен и хостинг'
          ]
        },
        {
          title: 'Enterprise',
          price: '9.0 млн',
          currency: 'сум',
          desc: 'Для сложных систем и максимальной автоматизации.',
          isPopular: false,
          features: [
            'E-Commerce или каталог-система',
            'Платежные системы (Payme, Click)',
            'Интеграция CRM/ERP',
            'Мультиязычный интерфейс (Uz/Ru/En)',
            '6 месяцев 24/7 личный менеджер'
          ]
        }
      ]
    },
    faq: {
      badge: 'FAQ',
      title: 'Часто Задаваемые',
      subtitle: 'Вопросы',
      items: [
        { q: 'Сколько времени займет создание сайта?', a: 'Лендинг — 3-5 рабочих дней, корпоративный сайт — 2-3 недели, сложные системы (CRM, e-commerce) — 1-2 месяца. Точный срок фиксируется в договоре после ТЗ.' },
        { q: 'Как происходит оплата?', a: 'Обычно 50% предоплата, 50% при сдаче проекта. Для крупных проектов составляется поэтапный график оплаты. Наличные, перевод или на счет компании.' },
        { q: 'Кто занимается доменом и хостингом?', a: 'В планах Growth и Enterprise первый год домена и хостинга — в подарок. В последующие годы полностью помогаем с настройкой и продлением.' },
        { q: 'Будет ли сайт в Google?', a: 'Да. Все наши сайты сдаются с основами SEO: техническая оптимизация, мета-теги, sitemap, скорость. В планах Growth и Enterprise включено углубленное SEO.' },
        { q: 'Смогу ли я вносить изменения на сайт?', a: 'Через панель CMS вы сами управляете текстами, фото и новостями. Для более сложных изменений всегда доступна наша поддержка.' },
        { q: 'Почему стоит выбрать именно вас?', a: 'Мы работаем на результат: каждый проект в портфолио обслуживает реальный бизнес. Договор, точные сроки и поддержка после запуска — наш стандарт.' }
      ]
    },
    cta: {
      title: 'Обсудим Ваш Проект?',
      desc: 'Получите бесплатную консультацию — проанализируем проект, назовем точную цену и сроки. Без обязательств.',
      btn: 'Оставить Заявку',
      btnCall: 'Позвонить',
      telegram: 'Написать в Telegram'
    },
    projects: {
      badge: 'Портфолио',
      title: 'Реализованные',
      subtitle: 'Проекты',
      desc: 'Каждый проект — живой продукт, обслуживающий реальный бизнес. Многие можно посетить прямо сейчас.',
      btnView: 'Открыть Сайт',
      btnDetails: 'Подробнее',
      btnAll: 'Все проекты',
      liveBadge: 'Live',
      filterAll: 'Все',
      detail: {
        overview: 'О Проекте',
        stack: 'Технологии',
        year: 'Год',
        category: 'Направление',
        visit: 'Открыть Сайт',
        gallery: 'Галерея',
        other: 'Другие Проекты',
        back: 'Назад в портфолио',
        orderSimilar: 'Заказать похожий проект'
      }
    },
    contactSection: {
      badge: 'Контакты',
      title: 'Есть Проект?',
      subtitle: 'Обсудим',
      desc: 'Заполните форму — свяжемся в течение 15 минут. Или позвоните напрямую.',
      infoPhone: 'Телефон',
      infoLoc: 'Адрес',
      infoEmail: 'Email',
      infoTelegram: 'Telegram',
      formTitle: 'Оставить Заявку',
      inputName: 'Ваше Имя',
      inputPhone: 'Телефон',
      inputMsg: 'О проекте',
      placeholderMsg: 'Кратко опишите ваш проект...',
      btnSubmit: 'Отправить',
      btnLoading: 'Отправка...'
    },
    footer: {
      rights: 'Все права защищены',
      address: 'г. Ташкент, Яшнабадский р-н',
      contact: 'Контакты',
      socials: 'Социальные сети',
      desc: 'IT-компания, выводящая ваш бизнес на новый уровень в цифровом мире. Качество, скорость и результат.',
      menuTitle: 'Страницы'
    },
    toast: {
      success: 'Успешно отправлено! Скоро свяжемся с вами.',
      error: 'Произошла ошибка. Попробуйте еще раз.',
      nameError: 'Введите ваше полное имя',
      phoneError: 'Неверный формат номера телефона',
      msgError: 'Сообщение слишком короткое',
      wait: 'Пожалуйста, подождите...'
    }
  },
  EN: {
    nav: {
      home: 'Home',
      services: 'Services',
      portfolio: 'Portfolio',
      pricing: 'Pricing',
      contact: 'Contact',
      btn: 'Order Now'
    },
    hero: {
      badge: 'Webleaders — Strategic Partner For Digital Transformation',
      title1: 'We Make Your Business',
      title2: 'A Leader Online.',
      desc: 'High-converting websites, CRM systems and mobile apps. Modern design, blazing speed and top Google rankings — from one team.',
      btnPrimary: 'Start a Project',
      btnSecondary: 'See Our Work',
      stats: [
        { value: '40+', label: 'Successful projects' },
        { value: '5+', label: 'Years of experience' },
        { value: '3', label: 'Service languages' },
        { value: '24/7', label: 'Tech support' }
      ]
    },
    services: {
      badge: 'Services',
      title: 'Comprehensive Solutions',
      subtitle: 'For Your Business',
      desc: 'From strategic analysis to complete integration — services that drive the digital growth of your business.',
      btnAll: 'All services',
      list: [
        { title: 'Website Development', desc: 'High-converting landing pages and corporate websites. Premium design, top speed and a structure that leads clients to order.' },
        { title: 'Mobile Applications', desc: 'High-performance native and cross-platform apps for iOS and Android. A permanent connection channel with your clients.' },
        { title: 'CRM / ERP Systems', desc: 'Business process automation: manage clients, finances and staff in a single system.' },
        { title: 'SEO Optimization', desc: 'Top positions in Google and Yandex. Stable organic traffic through technical audit, semantics and content strategy.' },
        { title: 'E-Commerce', desc: 'Online stores and marketplaces. Full cycle with payment systems (Payme, Click, Uzum) and logistics integration.' },
        { title: 'Technical Support', desc: '24/7 monitoring, security updates and continuous development to keep your site running flawlessly.' }
      ]
    },
    whyUs: {
      badge: 'Why Us',
      title: 'Why Partners Choose',
      subtitle: 'Webleaders?',
      desc: 'We don\'t just build websites — we build digital tools that generate revenue for your business, and we take responsibility for the result.',
      list: [
        { title: 'Expert Team', desc: 'Engineers with 5+ years of experience working to international standards handle your project.' },
        { title: 'Mobile-First', desc: '80% of traffic comes from mobile devices. Our sites work on smartphones like native apps.' },
        { title: 'Design That Sells', desc: 'Design is a revenue tool. Every element is engineered to lead the client to order.' },
        { title: 'Maximum Speed', desc: 'A slow site is a lost client. Instant loading thanks to Next.js technology.' },
        { title: 'Contract & SLA', desc: 'Deadlines and quality are fixed in the contract. Violations guarantee financial compensation.' },
        { title: 'Ongoing Support', desc: 'Delivery is just the start. We continuously analyze your site and adapt it to market demands.' }
      ]
    },
    process: {
      badge: 'Process',
      title: 'From Idea to Result',
      subtitle: 'In 4 Steps',
      desc: 'A transparent process: you always know what\'s happening at every stage.',
      steps: [
        { num: '01', title: 'Analysis & Strategy', desc: 'We study your business, competitors and audience. We draft a precise brief and plan.' },
        { num: '02', title: 'Design', desc: 'Conversion-focused UI/UX design in your brand style. We iterate until you approve.' },
        { num: '03', title: 'Development', desc: 'Clean code on modern technologies. Weekly progress reports.' },
        { num: '04', title: 'Launch', desc: 'Testing, SEO setup, domain and hosting. We stay by your side after launch.' }
      ]
    },
    pricing: {
      badge: 'Pricing',
      title: 'Investment',
      subtitle: 'Plans',
      desc: 'Transparent prices with no hidden fees. Every plan is an investment in your business growth.',
      btnAll: 'All pricing',
      modalTitle: 'Place an Order',
      modalDesc: '— leave a request, we\'ll contact you within 15 minutes.',
      formName: 'Your Full Name',
      formPhone: 'Contact Phone',
      btnSubmit: 'Submit',
      btnLoading: 'Sending...',
      btnSelect: 'Select',
      popular: 'MOST POPULAR',
      plans: [
        {
          title: 'Start',
          price: '1.5 mln',
          currency: 'UZS',
          desc: 'A professional digital launchpad for personal brands or small businesses.',
          isPopular: false,
          features: [
            'Premium UI Landing Page (1 page)',
            'Flawless Mobile Responsive',
            'Leads to Telegram/Email',
            'Launch within 3 business days',
            '1 month of technical support'
          ]
        },
        {
          title: 'Growth',
          price: '4.5 mln',
          currency: 'UZS',
          desc: 'For companies focused on growth and scaling.',
          isPopular: true,
          features: [
            'Corporate Website (5+ pages)',
            'Management Panel (CMS)',
            'SEO Optimization',
            'Speed Optimization',
            '3 months VIP support + Domain & Hosting'
          ]
        },
        {
          title: 'Enterprise',
          price: '9.0 mln',
          currency: 'UZS',
          desc: 'For complex systems and maximum automation.',
          isPopular: false,
          features: [
            'E-Commerce Hub or Directory',
            'Payment Systems (Payme, Click)',
            'CRM/ERP Integration',
            'Multilingual Interface (Uz/Ru/En)',
            '6 months of 24/7 dedicated manager'
          ]
        }
      ]
    },
    faq: {
      badge: 'FAQ',
      title: 'Frequently Asked',
      subtitle: 'Questions',
      items: [
        { q: 'How long does it take to build a website?', a: 'A landing page takes 3-5 business days, a corporate site 2-3 weeks, complex systems (CRM, e-commerce) 1-2 months. The exact deadline is fixed in the contract after the brief.' },
        { q: 'How does payment work?', a: 'Usually 50% upfront and 50% on delivery. For large projects we set up a milestone-based payment schedule. Cash, transfer or company account.' },
        { q: 'Who handles the domain and hosting?', a: 'On Growth and Enterprise plans the first year of domain and hosting is on us. In following years we fully assist with setup and renewals.' },
        { q: 'Will my site rank on Google?', a: 'Yes. All our sites ship with SEO fundamentals: technical optimization, meta tags, sitemap, speed. Growth and Enterprise plans include in-depth SEO.' },
        { q: 'Can I edit the site myself?', a: 'Through the CMS panel you manage texts, images and news yourself. For more complex changes, our support team is always available.' },
        { q: 'Why should I choose you?', a: 'We work for results: every project in our portfolio serves a real business. Contract, precise deadlines and post-launch support are our standard.' }
      ]
    },
    cta: {
      title: 'Let\'s Discuss Your Project?',
      desc: 'Get a free consultation — we\'ll analyze your project and give you an exact price and timeline. No obligations.',
      btn: 'Place an Order',
      btnCall: 'Call Us',
      telegram: 'Write on Telegram'
    },
    projects: {
      badge: 'Portfolio',
      title: 'Delivered',
      subtitle: 'Projects',
      desc: 'Every project is a live product serving a real business. You can visit most of them right now.',
      btnView: 'Visit Site',
      btnDetails: 'Details',
      btnAll: 'All projects',
      liveBadge: 'Live',
      filterAll: 'All',
      detail: {
        overview: 'About the Project',
        stack: 'Technologies',
        year: 'Year',
        category: 'Category',
        visit: 'Visit Site',
        gallery: 'Gallery',
        other: 'Other Projects',
        back: 'Back to portfolio',
        orderSimilar: 'Order a similar project'
      }
    },
    contactSection: {
      badge: 'Contact',
      title: 'Have a Project?',
      subtitle: 'Let\'s Talk',
      desc: 'Fill out the form — we\'ll get in touch within 15 minutes. Or call us directly.',
      infoPhone: 'Phone',
      infoLoc: 'Address',
      infoEmail: 'Email',
      infoTelegram: 'Telegram',
      formTitle: 'Submit a Request',
      inputName: 'Your Name',
      inputPhone: 'Phone',
      inputMsg: 'About the project',
      placeholderMsg: 'Briefly describe your project...',
      btnSubmit: 'Submit',
      btnLoading: 'Sending...'
    },
    footer: {
      rights: 'All rights reserved',
      address: 'Tashkent city, Yashnabad district',
      contact: 'Contact',
      socials: 'Social networks',
      desc: 'An IT company taking your business to the next level in the digital world. Quality, speed and results.',
      menuTitle: 'Pages'
    },
    toast: {
      success: 'Sent successfully! We\'ll contact you soon.',
      error: 'An error occurred. Please try again.',
      nameError: 'Enter your full name',
      phoneError: 'Invalid phone number format',
      msgError: 'Message is too short',
      wait: 'Please wait a moment...'
    }
  }
}

export type LangType = 'UZ' | 'RU' | 'EN'

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

  const value = mounted
    ? { language, setLanguage: handleSetLanguage, t: translations[language] }
    : { language: 'UZ' as LangType, setLanguage: handleSetLanguage, t: translations.UZ }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider')
  return context
}
