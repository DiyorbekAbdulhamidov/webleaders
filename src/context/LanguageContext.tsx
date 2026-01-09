'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

const translations = {
  UZ: {
    nav: {
      services: 'Imkoniyatlar',
      portfolio: 'Bizning Ishlar',
      pricing: 'Sarmoya',
      contact: 'Aloqa',
      btn: 'Start'
    },
    hero: {
      badge: 'Webleaders — Raqamli Evolyutsiya',
      title1: 'Shunchaki Sayt Emas.',
      title2: 'Biznesingiz Dvigateli.',
      desc: 'Hamma chiroyli rasm chizishi mumkin. Biz esa siz uxlayotganingizda ham pul ishlaydigan, raqobatchilarni ortda qoldiradigan tizim quramiz.',
      btnPrimary: 'Loyiha Boshlash',
      btnSecondary: 'Nimalar Qildik?'
    },
    services: {
      badge: 'Bizning Arsenal',
      title: 'Biznesingiz Uchun',
      subtitle: 'Premium Yechimlar',
      desc: 'G‘oyadan to realizatsiyagacha. Biznesingizni keyingi bosqichga olib chiquvchi to‘liq sikl.',
      list: [
        { title: 'Sotuvchi Veb-saytlar', desc: 'Mijoz saytga kirdimi — u sizniki. Psixologiya va texnologiya uyg‘unligi.' },
        { title: 'Mobil Ilovalar', desc: 'Brendingiz mijozning cho‘ntagida. iOS va Android uchun mukammal yechimlar.' },
        { title: 'CRM Tizimlar', desc: 'Xaosni to‘xtating. Ombor, kassa va xodimlarni bitta tugmada boshqaring.' },
        { title: 'SEO va Trafik', desc: 'Google qidiruvida 1-o‘rin? Bu shunchaki texnik vazifa, mo‘jiza emas.' },
        { title: 'E-Commerce', desc: 'Do‘koningiz yopilmaydi. 24/7 ishlaydigan avtomatlashgan savdo tizimi.' },
        { title: 'Texnik "Otel"', desc: 'Siz biznesni o‘ylang, serverlar va xavfsizlik bizning bo‘ynimizda.' }
      ]
    },
    whyUs: {
      badge: 'Bizning Standart',
      title: 'Nega Aynan',
      subtitle: 'Webleaders?',
      desc: 'Bozor "Hacker"lar va tajribasizlarga to‘la. Biz esa biznesingizga kafolatlangan natija beramiz.',
      list: [
        { title: 'Faqat "Senior"lar', desc: 'Biznesingiz tajriba maydoni emas. Loyihangizni faqat 5+ yil tajribasi bor mutaxassislar quradi.' },
        { title: 'Telefonda "Uchadi"', desc: 'Mijozlarning 80%i telefondan kiradi. Bizning saytlar ilovadan ham qulayroq ishlaydi.' },
        { title: 'Sotadigan Dizayn', desc: 'Shunchaki "chiroyli" emas. Biz mijozni "Sotib olish" tugmasiga olib boradigan psixologik dizayn chizamiz.' },
        { title: '0.5 Soniya', desc: 'Sayt sekin ishlasa, mijoz ketadi. Bizning texnologiyalar saytni chaqmoqdek tez qiladi.' },
        { title: 'Temir Intizom', desc: 'Ertaga, indinga degan gap yo‘q. Dedlayn buzilsa — pulingizni qaytaramiz.' },
        { title: 'Tashlab Qo‘ymaymiz', desc: 'Sayt bitdi degani — xayr degani emas. Biz doim aloqadamiz va loyihangizni rivojlantiramiz.' }
      ]
    },
    pricing: {
      title: 'Sarmoya',
      subtitle: 'Rejalari',
      desc: 'Bu shunchaki harajat emas, bu biznesingiz kelajagiga tikilgan eng to‘g‘ri investitsiya.',
      modalTitle: 'Hamkorlikni Boshlaymiz!',
      modalDesc: 'rejasi bo‘yicha so‘rov qoldiring.',
      formName: 'Ismingiz',
      formPhone: 'Telefon raqam',
      btnSubmit: 'Ariza Yuborish',
      btnLoading: 'Yuborilmoqda...',
      plans: [
        {
          title: 'Start',
          price: '1.5 mln',
          currency: "so'm",
          desc: 'Kichik biznes yoki shaxsiy brend uchun tezkor start.',
          isPopular: false,
          features: [
            'Sotuvchi Landing Page (1 sahifa)',
            'Mobil Moslashuv (Responsive)',
            'Lidlar bazasi (Telegramga keladi)',
            '3 kunda tayyor',
            '1 oy bepul texnik yordam'
          ]
        },
        {
          title: 'Growth',
          price: '4.5 mln',
          currency: "so'm",
          desc: 'Rivojlanayotgan kompaniyalar uchun ideal yechim.',
          isPopular: true,
          features: [
            'Korporativ Sayt (5+ sahifa)',
            'Admin Panel (Oson boshqaruv)',
            'Google SEO (Qidiruvda topish)',
            'Ultra-Tezkor (Speed Optimization)',
            '3 oy VIP support + Domen sovg\'a'
          ]
        },
        {
          title: 'Enterprise',
          price: '9.0 mln',
          currency: "so'm",
          desc: 'Bozor liderlari va murakkab tizimlar uchun.',
          isPopular: false,
          features: [
            'Onlayn Do‘kon yoki Katalog',
            'To‘lov tizimlari (Payme/Click)',
            'CRM Integratsiya & Avtomatizatsiya',
            'Ko‘p tillilik (Uz/Ru/En)',
            '6 oy 24/7 Shaxsiy Menejer'
          ]
        }
      ]
    },
    contactSection: {
      badge: 'Aloqa',
      title: 'G‘oyalar',
      subtitle: 'Reallikka Aylanadi',
      desc: 'Sizda loyiha bormi? Yoki shunchaki maslahatlashmoqchimisiz? Biz har doim ochiqmiz.',
      infoPhone: 'Telefon',
      infoLoc: 'Manzil',
      infoEmail: 'Email',
      formTitle: 'So‘rov qoldirish',
      inputName: 'Ismingiz',
      inputPhone: 'Telefon',
      inputMsg: 'Xabar',
      placeholderMsg: 'Loyiha haqida qisqacha...',
      btnSubmit: 'Yuborish',
      btnLoading: 'Yuborilmoqda...'
    },
    projects: {
      title: 'Bizning',
      subtitle: 'G‘ururimiz',
      desc: 'Har bir loyiha — bu shunchaki kod emas, bu mijozimizning muvaffaqiyat tarixi.',
      btnView: 'Saytni ko‘rish',
      techTitle: 'Texnologiyalar:',
      aboutTitle: 'Loyiha haqida:',
      list: [
        {
          id: 'toybron',
          name: 'ToyBron AI Ecosystem',
          category: 'AI Marketplace & Super-CRM',
          desc: 'O‘zbekistonda yagona. Sun’iy intellekt omborni ham, kassani ham o‘zi boshqaradi. Kelajak bugun.',
          isFeatured: true
        },
        {
          id: 'lutsente',
          name: 'Lutsente',
          category: 'Premium Corporate Website',
          desc: 'Xalqaro kompaniyaning raqamli yuzi. 3 tilda mukammal ishlaydigan korporativ platforma.',
          isFeatured: false
        },
        {
          id: 'adizone',
          name: 'Adizone Education',
          category: 'Educational Platform',
          desc: 'O‘quv markazi uchun "avtopilot". Lidlar kelishidan tortib, to‘lovgacha to‘liq nazorat.',
          isFeatured: false
        },
        {
          id: 'kochirish',
          name: 'Kochirish Xizmati',
          category: 'Logistics Landing Page',
          desc: 'Logistika sohasida inqilob. Mijoz kiradi, ko‘radi va buyurtma beradi. Oddiy va tez.',
          isFeatured: false
        },
        {
          id: 'gogermany',
          name: 'GoGermany Consulting',
          category: 'Consulting Agency Website',
          desc: 'Yevropa standartidagi dizayn. Germaniyaga ketishni istaganlar uchun ishonchli ko‘prik.',
          isFeatured: false
        },
        {
          id: 'zarnigor',
          name: 'Zarnigor Wedding',
          category: 'CRM & Booking System',
          desc: 'To‘y biznesida tartib. Ko‘ylaklar ijarasi va mijozlar hisobi endi daftar-ruchkasiz.',
          isFeatured: false
        },
        {
          id: 'jetour',
          name: 'Jetour Uzbekistan',
          category: 'Avtosalon Promo Sayt',
          desc: 'Avtomobil kuchini ekranda his qiling. Jetour brendi uchun emotsional promo-sayt.',
          isFeatured: false
        },
        {
          id: 'dono',
          name: 'Dono-Dance',
          category: 'Raqs Maktabi Platformasi',
          desc: 'Raqs san’ati raqamli dunyoda. Ota-onalar va o‘quvchilar uchun qulay portal.',
          isFeatured: false
        },
        {
          id: 'telmee',
          name: 'Telmee Market',
          category: 'E-Commerce Platforma',
          desc: 'Telefon bozorini cho‘ntakka joyladik. Xavfsiz va tezkor oldi-sotdi platformasi.',
          isFeatured: false
        }
      ]
    },
    footer: {
      rights: 'Barcha huquqlar himoyalangan',
      address: 'Toshkent sh., Yashnobod tumani',
      contact: 'Aloqa',
      socials: 'Ijtimoiy tarmoqlar'
    },
    toast: {
      success: 'Muvaffaqiyatli yuborildi!',
      error: 'Xatolik yuz berdi!',
      nameError: 'Ismingizni to‘liq kiriting',
      phoneError: 'Telefon raqam noto‘g‘ri',
      msgError: 'Xabar juda qisqa'
    }
  },
  RU: {
    nav: {
      services: 'Возможности',
      portfolio: 'Кейсы',
      pricing: 'Инвестиции',
      contact: 'Связь',
      btn: 'Старт'
    },
    hero: {
      badge: 'Webleaders — Цифровая Эволюция',
      title1: 'Не просто сайт.',
      title2: 'Двигатель Бизнеса.',
      desc: 'Красивые картинки рисуют все. Мы строим системы, которые зарабатывают деньги, пока вы спите.',
      btnPrimary: 'Начать Проект',
      btnSecondary: 'Наши Работы'
    },
    services: {
      badge: 'Наш Арсенал',
      title: 'Для Вашего',
      subtitle: 'Бизнеса',
      desc: 'От идеи до реализации. Полный цикл, который выведет ваш бизнес на новый уровень.',
      list: [
        { title: 'Продающие Сайты', desc: 'Клиент зашел — клиент купил. Симбиоз психологии и технологий.' },
        { title: 'Мобильные Приложения', desc: 'Ваш бренд в кармане клиента. Идеальные решения для iOS и Android.' },
        { title: 'CRM Системы', desc: 'Остановите хаос. Управляйте складом, кассой и персоналом одной кнопкой.' },
        { title: 'SEO и Трафик', desc: 'Топ-1 в Google? Это не чудо, это просто наша работа.' },
        { title: 'E-Commerce', desc: 'Магазин, который не закрывается. Автоматизированная торговля 24/7.' },
        { title: 'Технический "Отель"', desc: 'Думайте о бизнесе, а сервера и безопасность мы берем на себя.' }
      ]
    },
    whyUs: {
      badge: 'Наш Стандарт',
      title: 'Почему',
      subtitle: 'Webleaders?',
      desc: 'Рынок полон дилетантов. Мы предлагаем гарантированный результат и железное качество.',
      list: [
        { title: 'Только "Senior"', desc: 'Ваш бизнес — не полигон для тестов. Работают только профи с опытом 5+ лет.' },
        { title: 'Mobile First', desc: '80% клиентов заходят с телефона. Наши сайты работают лучше приложений.' },
        { title: 'Продающий Дизайн', desc: 'Не просто красиво. Мы ведем клиента к кнопке "Купить" через психологию.' },
        { title: '0.5 Секунды', desc: 'Медленный сайт теряет клиентов. Наши технологии ускоряют загрузку до предела.' },
        { title: 'Железная Дисциплина', desc: 'Никаких "завтра". Срыв дедлайна = возврат денег.' },
        { title: 'Вечная Поддержка', desc: 'Сдача проекта — это только начало. Мы всегда на связи.' }
      ]
    },
    pricing: {
      title: 'Инвестиции',
      subtitle: 'В Будущее',
      desc: 'Это не расходы, а самое правильное вложение в развитие вашего бизнеса.',
      modalTitle: 'Начнем Сотрудничество!',
      modalDesc: 'Оставьте заявку по тарифу',
      formName: 'Ваше Имя',
      formPhone: 'Номер Телефона',
      btnSubmit: 'Отправить Заявку',
      btnLoading: 'Отправка...',
      plans: [
        {
          title: 'Start',
          price: '1.5 млн',
          currency: "сум",
          desc: 'Быстрый старт для малого бизнеса или личного бренда.',
          isPopular: false,
          features: [
            'Продающий Landing Page (1 стр.)',
            'Мобильная адаптация',
            'База лидов (в Telegram)',
            'Готовность за 3 дня',
            '1 месяц бесплатной поддержки'
          ]
        },
        {
          title: 'Growth',
          price: '4.5 млн',
          currency: "сум",
          desc: 'Идеальное решение для растущих компаний.',
          isPopular: true,
          features: [
            'Корпоративный сайт (5+ стр.)',
            'Админ-панель (Легкое управление)',
            'SEO (Топ в поиске Google)',
            'Ultra-Speed Оптимизация',
            '3 месяца VIP поддержки + Домен'
          ]
        },
        {
          title: 'Enterprise',
          price: '9.0 млн',
          currency: "сум",
          desc: 'Для лидеров рынка и сложных систем.',
          isPopular: false,
          features: [
            'Интернет-магазин или Каталог',
            'Платежные системы (Payme/Click)',
            'CRM Интеграция & Автоматизация',
            'Мультиязычность (Uz/Ru/En)',
            '6 месяцев Личный Менеджер 24/7'
          ]
        }
      ]
    },
    contactSection: {
      badge: 'Контакты',
      title: 'Идеи',
      subtitle: 'Становятся Реальностью',
      desc: 'Есть проект? Или просто хотите посоветоваться? Мы всегда открыты для диалога.',
      infoPhone: 'Телефон',
      infoLoc: 'Адрес',
      infoEmail: 'Email',
      formTitle: 'Оставить заявку',
      inputName: 'Ваше Имя',
      inputPhone: 'Телефон',
      inputMsg: 'Сообщение',
      placeholderMsg: 'Коротко о проекте...',
      btnSubmit: 'Отправить',
      btnLoading: 'Отправка...'
    },
    projects: {
      title: 'Наша',
      subtitle: 'Гордость',
      desc: 'Каждый проект — это не просто код, это история успеха наших клиентов.',
      btnView: 'Смотреть сайт',
      techTitle: 'Стек:',
      aboutTitle: 'О проекте:',
      list: [
        {
          id: 'toybron',
          name: 'ToyBron AI Ecosystem',
          category: 'AI Marketplace & Super-CRM',
          desc: 'Единственная в Узбекистане. ИИ управляет складом и кассой. Будущее уже здесь.',
          isFeatured: true
        },
        {
          id: 'lutsente',
          name: 'Lutsente',
          category: 'Premium Corporate Website',
          desc: 'Цифровое лицо международной компании. Корпоративная платформа на 3 языках.',
          isFeatured: false
        },
        {
          id: 'adizone',
          name: 'Adizone Education',
          category: 'Educational Platform',
          desc: '"Автопилот" для учебного центра. Полный контроль от заявки до оплаты.',
          isFeatured: false
        },
        {
          id: 'kochirish',
          name: 'Kochirish Xizmati',
          category: 'Logistics Landing Page',
          desc: 'Революция в логистике. Клиент зашел, увидел, заказал. Быстро и просто.',
          isFeatured: false
        },
        {
          id: 'gogermany',
          name: 'GoGermany Consulting',
          category: 'Consulting Agency Website',
          desc: 'Дизайн европейского стандарта. Надежный мост для желающих уехать в Германию.',
          isFeatured: false
        },
        {
          id: 'zarnigor',
          name: 'Zarnigor Wedding',
          category: 'CRM & Booking System',
          desc: 'Порядок в свадебном бизнесе. Аренда платьев и учет клиентов без тетрадок.',
          isFeatured: false
        },
        {
          id: 'jetour',
          name: 'Jetour Uzbekistan',
          category: 'Avtosalon Promo Sayt',
          desc: 'Почувствуйте мощь авто на экране. Эмоциональный промо-сайт для бренда Jetour.',
          isFeatured: false
        },
        {
          id: 'dono',
          name: 'Dono-Dance',
          category: 'Платформа Школы Танцев',
          desc: 'Искусство танца в цифровом мире. Удобный портал для родителей и учеников.',
          isFeatured: false
        },
        {
          id: 'telmee',
          name: 'Telmee Market',
          category: 'E-Commerce Платформа',
          desc: 'Рынок телефонов в кармане. Безопасная и быстрая платформа купли-продажи.',
          isFeatured: false
        }
      ]
    },
    footer: {
      rights: 'Все права защищены',
      address: 'г. Ташкент, Яшнабадский р-н',
      contact: 'Связь',
      socials: 'Соцсети'
    },
    toast: {
      success: 'Успешно отправлено!',
      error: 'Произошла ошибка!',
      nameError: 'Введите полное имя',
      phoneError: 'Неверный номер телефона',
      msgError: 'Сообщение слишком короткое'
    }
  },
  EN: {
    nav: {
      services: 'Capabilities',
      portfolio: 'Work',
      pricing: 'Investment',
      contact: 'Contact',
      btn: 'Start'
    },
    hero: {
      badge: 'Webleaders — Digital Evolution',
      title1: 'Not Just a Website.',
      title2: 'Business Engine.',
      desc: 'Anyone can draw pretty pictures. We build systems that make money while you sleep and outpace competitors.',
      btnPrimary: 'Start Project',
      btnSecondary: 'Our Cases'
    },
    services: {
      badge: 'Our Arsenal',
      title: 'For Your',
      subtitle: 'Business',
      desc: 'From idea to execution. A full cycle that takes your business to the next level.',
      list: [
        { title: 'Selling Websites', desc: 'Client visits — client buys. A mix of psychology and technology.' },
        { title: 'Mobile Apps', desc: 'Your brand in your client\'s pocket. Perfect solutions for iOS and Android.' },
        { title: 'CRM Systems', desc: 'Stop the chaos. Manage warehouse, POS, and staff with one button.' },
        { title: 'SEO & Traffic', desc: 'Top 1 on Google? It\'s not a miracle, it\'s just our job.' },
        { title: 'E-Commerce', desc: 'A store that never sleeps. Automated trading 24/7.' },
        { title: 'Tech "Hotel"', desc: 'You focus on business, we handle servers and security.' }
      ]
    },
    whyUs: {
      badge: 'Our Standard',
      title: 'Why',
      subtitle: 'Webleaders?',
      desc: 'The market is full of amateurs. We offer guaranteed results and ironclad quality.',
      list: [
        { title: 'Seniors Only', desc: 'Your business is not a testing ground. Only experts with 5+ years experience.' },
        { title: 'Mobile First', desc: '80% of clients use mobile. Our sites perform better than native apps.' },
        { title: 'Design that Sells', desc: 'Not just pretty. We guide the client to the "Buy" button using psychology.' },
        { title: '0.5 Seconds', desc: 'Slow sites lose clients. Our tech makes your site load lightning fast.' },
        { title: 'Iron Discipline', desc: 'No "tomorrow". Missed deadline = money back.' },
        { title: 'Lifetime Support', desc: 'Project delivery is just the start. We are always online.' }
      ]
    },
    pricing: {
      title: 'Investment',
      subtitle: 'Plans',
      desc: 'It is not an expense, but the smartest investment in your business future.',
      modalTitle: 'Let\'s Start!',
      modalDesc: 'Request for plan:',
      formName: 'Your Name',
      formPhone: 'Phone Number',
      btnSubmit: 'Send Request',
      btnLoading: 'Sending...',
      plans: [
        {
          title: 'Start',
          price: '1.5 mln',
          currency: "UZS",
          desc: 'Fast start for small businesses or personal brands.',
          isPopular: false,
          features: [
            'Sales Landing Page (1 page)',
            'Mobile Responsive',
            'Lead Database (Telegram integration)',
            'Ready in 3 days',
            '1 month free support'
          ]
        },
        {
          title: 'Growth',
          price: '4.5 mln',
          currency: "UZS",
          desc: 'Ideal solution for growing companies.',
          isPopular: true,
          features: [
            'Corporate Website (5+ pages)',
            'Admin Panel (Easy management)',
            'SEO (Google Ranking)',
            'Ultra-Speed Optimization',
            '3 months VIP support + Free Domain'
          ]
        },
        {
          title: 'Enterprise',
          price: '9.0 mln',
          currency: "UZS",
          desc: 'For market leaders and complex systems.',
          isPopular: false,
          features: [
            'E-commerce or Catalog',
            'Payment Systems (Payme/Click)',
            'CRM Integration & Automation',
            'Multilingual (Uz/Ru/En)',
            '6 months Personal Manager 24/7'
          ]
        }
      ]
    },
    contactSection: {
      badge: 'Contact',
      title: 'Ideas',
      subtitle: 'Become Reality',
      desc: 'Have a project? Or just want to consult? We are always open to dialogue.',
      infoPhone: 'Phone',
      infoLoc: 'Address',
      infoEmail: 'Email',
      formTitle: 'Send Request',
      inputName: 'Your Name',
      inputPhone: 'Phone',
      inputMsg: 'Message',
      placeholderMsg: 'Briefly about project...',
      btnSubmit: 'Send Message',
      btnLoading: 'Sending...'
    },
    projects: {
      title: 'Our',
      subtitle: 'Pride',
      desc: 'Each project is not just code, it\'s a success story of our clients.',
      btnView: 'Visit Site',
      techTitle: 'Stack:',
      aboutTitle: 'About:',
      list: [
        {
          id: 'toybron',
          name: 'ToyBron AI Ecosystem',
          category: 'AI Marketplace & Super-CRM',
          desc: 'Unique in Uzbekistan. AI manages warehouse and POS. The future is here.',
          isFeatured: true
        },
        {
          id: 'lutsente',
          name: 'Lutsente',
          category: 'Premium Corporate Website',
          desc: 'Digital face of an international company. Corporate platform in 3 languages.',
          isFeatured: false
        },
        {
          id: 'adizone',
          name: 'Adizone Education',
          category: 'Educational Platform',
          desc: '"Autopilot" for learning centers. Full control from lead to payment.',
          isFeatured: false
        },
        {
          id: 'kochirish',
          name: 'Move Service',
          category: 'Logistics Landing Page',
          desc: 'Revolution in logistics. Client visits, sees, orders. Fast and simple.',
          isFeatured: false
        },
        {
          id: 'gogermany',
          name: 'GoGermany Consulting',
          category: 'Consulting Agency Website',
          desc: 'European standard design. Reliable bridge for those wanting to go to Germany.',
          isFeatured: false
        },
        {
          id: 'zarnigor',
          name: 'Zarnigor Wedding',
          category: 'CRM & Booking System',
          desc: 'Order in the wedding business. Dress rentals and client tracking without notebooks.',
          isFeatured: false
        },
        {
          id: 'jetour',
          name: 'Jetour Uzbekistan',
          category: 'Car Showroom Promo Site',
          desc: 'Feel the car\'s power on screen. Emotional promo site for the Jetour brand.',
          isFeatured: false
        },
        {
          id: 'dono',
          name: 'Dono-Dance',
          category: 'Dance School Platform',
          desc: 'Art of dance in the digital world. Convenient portal for parents and students.',
          isFeatured: false
        },
        {
          id: 'telmee',
          name: 'Telmee Market',
          category: 'E-Commerce Platform',
          desc: 'Phone market in your pocket. Safe and fast trading platform.',
          isFeatured: false
        }
      ]
    },
    footer: {
      rights: 'All rights reserved',
      address: 'Tashkent city, Yashnabad dist.',
      contact: 'Contact',
      socials: 'Socials'
    },
    toast: {
      success: 'Successfully sent!',
      error: 'An error occurred!',
      nameError: 'Enter full name',
      phoneError: 'Invalid phone number',
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