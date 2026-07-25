export type Lang = 'UZ' | 'RU' | 'EN'
export type LocalizedText = Record<Lang, string>

export interface Project {
  slug: string
  name: string
  category: LocalizedText
  desc: LocalizedText
  longDesc: LocalizedText
  tech: string[]
  images: string[]
  /** Faqat jonli, tekshirilgan saytlar. Yo'q bo'lsa tugma chiqmaydi. */
  url?: string
  year: number
  featured?: boolean
}

export const staticProjects: Project[] = [
  {
    slug: 'hilaledu',
    name: 'Hilal Edu',
    category: {
      UZ: 'Ta’lim LMS Platformasi',
      RU: 'Образовательная LMS-платформа',
      EN: 'Educational LMS Platform'
    },
    desc: {
      UZ: 'Yuqori yuklamalarga chidamli, ta’lim jarayonlarini raqamlashtiruvchi kompleks ta’lim platformasi.',
      RU: 'Устойчивая к высоким нагрузкам комплексная образовательная платформа, цифровизирующая учебный процесс.',
      EN: 'Highly scalable educational LMS engineered to digitalize academic operations at scale.'
    },
    longDesc: {
      UZ: 'Hilal Edu — Toshkentdagi professional turk tili markazi uchun yaratilgan zamonaviy ta’lim platformasi. Kurslar katalogi, onlayn ro‘yxatdan o‘tish, daraja testlari va SEO-optimallashtirilgan kontent arxitekturasi orqali markaz organik trafikni bir necha barobar oshirdi. Sayt Next.js asosida qurilgan bo‘lib, Google PageSpeed’da yuqori ball bilan ishlaydi.',
      RU: 'Hilal Edu — современная образовательная платформа для профессионального центра турецкого языка в Ташкенте. Каталог курсов, онлайн-запись, тесты уровня и SEO-оптимизированная контентная архитектура позволили центру кратно увеличить органический трафик. Сайт построен на Next.js и показывает высокие баллы в Google PageSpeed.',
      EN: 'Hilal Edu is a modern educational platform for a professional Turkish language center in Tashkent. A course catalog, online enrollment, level tests and SEO-optimized content architecture multiplied the center\'s organic traffic. Built with Next.js, it scores high on Google PageSpeed.'
    },
    tech: ['Next.js', 'SEO', 'Shadcn UI', 'Tailwind CSS'],
    images: ['/projects/hilal1.png', '/projects/hilal2.png', '/projects/hilal3.png', '/projects/hilal4.png'],
    url: 'https://hilaledu.uz',
    year: 2025,
    featured: true
  },
  {
    slug: 'toybron',
    name: 'ToyBron AI Ecosystem',
    category: {
      UZ: 'AI Marketplace & Super-CRM',
      RU: 'AI Marketplace & Super-CRM',
      EN: 'AI Marketplace & Super-CRM'
    },
    desc: {
      UZ: 'Sun’iy intellektga asoslangan ekotizim. Operatsion, moliyaviy va logistika jarayonlarini to‘liq avtomatlashtirish.',
      RU: 'Экосистема на базе искусственного интеллекта. Полная автоматизация операционных, финансовых и логистических процессов.',
      EN: 'Ecosystem based on artificial intelligence. Full automation of operational, financial, and logistical processes.'
    },
    longDesc: {
      UZ: 'ToyBron — to‘yxonalar va tadbir xizmatlari bozorini raqamlashtiruvchi AI-ekotizim. Platformada bron qilish, narxlash, moliyaviy hisobot va mijozlar bilan ishlash jarayonlari yagona Super-CRM ichida avtomatlashtirilgan. Sun’iy intellekt tavsiyalar tizimi mijozga eng mos to‘yxonani tanlashda yordam beradi, biznes egalariga esa bandlik prognozi va daromad analitikasini taqdim etadi.',
      RU: 'ToyBron — AI-экосистема, цифровизирующая рынок банкетных залов и event-услуг. Бронирование, ценообразование, финансовая отчётность и работа с клиентами автоматизированы в едином Super-CRM. Рекомендательная система на базе ИИ помогает клиентам выбрать подходящий зал, а владельцам бизнеса даёт прогноз загрузки и аналитику доходов.',
      EN: 'ToyBron is an AI ecosystem digitalizing the banquet hall and event services market. Booking, pricing, financial reporting and client management are automated within a single Super-CRM. An AI recommendation engine helps clients pick the right venue while giving business owners occupancy forecasts and revenue analytics.'
    },
    tech: ['Next.js 16', 'AI / ML', 'Big Data', 'PostgreSQL', 'Telegram Bot'],
    images: ['/projects/toybron1.png', '/projects/toybron2.png', '/projects/toybron3.png', '/projects/toybron4.png'],
    url: 'https://toybron.vercel.app/',
    year: 2025,
    featured: true
  },
  {
    slug: 'lutsente',
    name: 'Lutsente',
    category: {
      UZ: 'Premium Korporativ Sayt',
      RU: 'Премиальный корпоративный сайт',
      EN: 'Premium Corporate Website'
    },
    desc: {
      UZ: 'Xalqaro xoldingning raqamli nufuzi. Uch tilda to‘liq sinxronlashgan korporativ resurs.',
      RU: 'Цифровой авторитет международного холдинга. Полностью синхронизированный корпоративный ресурс на трех языках.',
      EN: 'Digital footprint of a multinational holding. Corporate resource synchronized across 3 languages.'
    },
    longDesc: {
      UZ: 'Lutsente — biznes uchun Wi-Fi marketing va analitika xizmatlarini taqdim etuvchi kompaniyaning korporativ sayti. Mahsulot taqdimoti, uch tilli kontent boshqaruvi va zamonaviy animatsiyalar bilan brend nufuzini raqamli muhitda mustahkamlaydi. Framer Motion asosidagi silliq o‘tishlar va premium UI foydalanuvchini xizmat buyurtma qilishga yo‘naltiradi.',
      RU: 'Lutsente — корпоративный сайт компании, предоставляющей услуги Wi-Fi маркетинга и аналитики для бизнеса. Презентация продукта, трёхъязычное управление контентом и современные анимации укрепляют авторитет бренда в цифровой среде. Плавные переходы на Framer Motion и премиальный UI ведут пользователя к заказу услуги.',
      EN: 'Lutsente is the corporate website of a Wi-Fi marketing and analytics company. Product presentation, trilingual content management and modern animations strengthen the brand\'s digital authority. Smooth Framer Motion transitions and a premium UI guide users toward ordering the service.'
    },
    tech: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'i18n'],
    images: ['/projects/lutsente1.png', '/projects/lutsente2.png', '/projects/lutsente3.png', '/projects/lutsente4.png'],
    url: 'https://lutsente.uz',
    year: 2025,
    featured: true
  },
  {
    slug: 'adizone',
    name: 'Adizone Education',
    category: {
      UZ: 'Ta’lim Platformasi',
      RU: 'Образовательная платформа',
      EN: 'Educational Platform'
    },
    desc: {
      UZ: 'Ta’lim muassasalari zanjiri uchun ERP yechim. Talabalar va to‘lovlar hisobini to‘liq avtomatlashtirish.',
      RU: 'ERP-решение для сетей учебных заведений. Полная автоматизация учета студентов и платежей.',
      EN: 'ERP infrastructure for academy chains. Full automation of student management, billing, and certification.'
    },
    longDesc: {
      UZ: 'Adizone — Toshkentdagi professional turk tili va abituriyentlar markazi uchun raqamli platforma. Kurslar, o‘qituvchilar va natijalar taqdimoti bilan birga, ichki boshqaruv uchun CRM va Telegram bot integratsiyasi joriy qilingan. Ariza oqimi avtomatlashtirilib, administratsiya yuki sezilarli kamaytirildi.',
      RU: 'Adizone — цифровая платформа профессионального центра турецкого языка и абитуриентов в Ташкенте. Наряду с презентацией курсов, преподавателей и результатов, внедрены CRM и интеграция с Telegram-ботом для внутреннего управления. Поток заявок автоматизирован, нагрузка на администрацию заметно снижена.',
      EN: 'Adizone is the digital platform of a professional Turkish language and university-prep center in Tashkent. Alongside course, teacher and results presentation, a CRM and Telegram bot integration handle internal management. The application flow is automated, significantly reducing administrative load.'
    },
    tech: ['React', 'CRM', 'Telegram Bot', 'Node.js'],
    images: ['/projects/adizone1.png', '/projects/adizone2.png', '/projects/adizone3.png', '/projects/adizone4.png'],
    url: 'https://adizone.uz',
    year: 2024,
    featured: true
  },
  {
    slug: 'kochirish',
    name: 'Kochirish Xizmati',
    category: {
      UZ: 'Logistika Landing Page',
      RU: 'Логистический Landing Page',
      EN: 'Logistics Landing Page'
    },
    desc: {
      UZ: 'Logistika sohasida samarali yechim. Murakkab tarif kalkulyatori va real vaqtdagi buyurtmalar.',
      RU: 'Эффективное решение в сфере логистики. Сложный тарифный калькулятор и заказы в реальном времени.',
      EN: 'A leading logistics web core featuring a multi-variable tariff calculator and real-time ordering.'
    },
    longDesc: {
      UZ: 'Kochirish.uz — professional ko‘chirish xizmati va sklad saqlash kompaniyasining yuqori konversiyali landing sahifasi. Ko‘p parametrli tarif kalkulyatori mijozga narxni bir zumda hisoblab beradi, buyurtmalar Telegram orqali real vaqtda operatorga tushadi. Mobile-first dizayn va lokal SEO tufayli sayt qidiruvda yetakchi pozitsiyalarni egalladi.',
      RU: 'Kochirish.uz — высококонверсионный лендинг профессиональной компании по переездам и складскому хранению. Многопараметрический калькулятор мгновенно рассчитывает цену, заказы в реальном времени поступают оператору в Telegram. Благодаря mobile-first дизайну и локальному SEO сайт занял лидирующие позиции в поиске.',
      EN: 'Kochirish.uz is a high-converting landing page for a professional moving and storage company. A multi-variable tariff calculator instantly quotes prices, and orders reach the operator in Telegram in real time. Mobile-first design and local SEO took the site to top search positions.'
    },
    tech: ['Landing Page', 'SEO', 'Mobile First', 'Telegram API'],
    images: ['/projects/move1.png', '/projects/move2.png', '/projects/move3.png', '/projects/move4.png'],
    url: 'https://kochirish.uz',
    year: 2024,
    featured: true
  },
  {
    slug: 'zarnigor',
    name: 'Zarnigor Wedding',
    category: {
      UZ: 'CRM & Bron Tizimi',
      RU: 'CRM и система бронирования',
      EN: 'Bespoke CRM & Booking'
    },
    desc: {
      UZ: 'Premium ijara industriyasi uchun ERP yechim. Bron tizimi va moliyaviy hisob-kitobni avtomatlashtirish.',
      RU: 'ERP-решение для индустрии премиальной аренды. Автоматизация системы бронирования и финансового учета.',
      EN: 'Bespoke ERP architecture for the luxury rental industry, featuring booking systems and automated ledgering.'
    },
    longDesc: {
      UZ: 'Zarnigor Wedding — premium to‘y liboslari ijarasi biznesining raqamli platformasi. Katalog, bron kalendari va moliyaviy hisob-kitob yagona tizimda birlashtirilgan. Har bir libos bandligi real vaqtda kuzatiladi, mijoz oqimi CRM orqali boshqariladi va biznes egasi mobil qurilmadan to‘liq nazoratga ega.',
      RU: 'Zarnigor Wedding — цифровая платформа бизнеса аренды премиальных свадебных нарядов. Каталог, календарь бронирования и финансовый учёт объединены в единой системе. Занятость каждого наряда отслеживается в реальном времени, поток клиентов управляется через CRM, а владелец имеет полный контроль с мобильного устройства.',
      EN: 'Zarnigor Wedding is the digital platform of a premium wedding dress rental business. Catalog, booking calendar and financial ledgering live in a single system. Each item\'s availability is tracked in real time, the client flow is managed through the CRM, and the owner has full control from a mobile device.'
    },
    tech: ['Vue.js', 'Laravel', 'MySQL', 'CRM'],
    images: ['/projects/zarnigor1.png', '/projects/zarnigor2.png', '/projects/zarnigor3.png', '/projects/zarnigor4.png'],
    url: 'https://wedding-homes-crm.vercel.app/',
    year: 2024,
    featured: true
  },
  {
    slug: 'gogermany',
    name: 'GoGermany Consulting',
    category: {
      UZ: 'Konsalting Agentligi Sayti',
      RU: 'Портал международного консалтинга',
      EN: 'International Consulting Portal'
    },
    desc: {
      UZ: 'Konsalting xizmatlari uchun optimallashgan, Yevropa standartlari asosidagi raqamli platforma.',
      RU: 'Оптимизированная цифровая платформа для консалтинговых услуг на базе европейских стандартов.',
      EN: 'A high-conversion international consulting engine architected according to European visual standards.'
    },
    longDesc: {
      UZ: 'GoGermany — Germaniyada ta’lim va ish bo‘yicha konsalting agentligining raqamli platformasi. Xizmatlar taqdimoti, ariza formalari va muvaffaqiyat tarixlarini o‘z ichiga olgan sayt Yevropa vizual standartlariga mos ravishda loyihalashtirilgan. Konversiyaga yo‘naltirilgan UX mijozlarni konsultatsiyaga yozilishga samarali yetaklaydi.',
      RU: 'GoGermany — цифровая платформа консалтингового агентства по образованию и работе в Германии. Сайт с презентацией услуг, формами заявок и историями успеха спроектирован в соответствии с европейскими визуальными стандартами. Ориентированный на конверсию UX эффективно ведёт клиентов к записи на консультацию.',
      EN: 'GoGermany is the digital platform of a consulting agency for education and employment in Germany. Featuring service presentations, application forms and success stories, the site follows European visual standards. Conversion-focused UX effectively leads clients to book a consultation.'
    },
    tech: ['React', 'Tailwind CSS', 'UX/UI'],
    images: ['/projects/ger(1).png', '/projects/ger(2).png', '/projects/ger(3).png', '/projects/ger(4).png'],
    url: 'https://gogermany-nu.vercel.app/',
    year: 2024,

  },
  {
    slug: 'jetour',
    name: 'Jetour Uzbekistan',
    category: {
      UZ: 'Avtosalon Promo Sayt',
      RU: 'Промо-сайт автобренда',
      EN: 'Automotive Digital Experience'
    },
    desc: {
      UZ: 'Premium avtobrend uchun promo-platforma. Dinamika va nufuzni vizual yetkazish.',
      RU: 'Промо-платформа для автобренда премиум-класса. Визуальная передача динамики и статуса.',
      EN: 'Premium car brand promo platform delivering mechanical power and aesthetics visually.'
    },
    longDesc: {
      UZ: 'Jetour Uzbekistan — premium avtobrend uchun yaratilgan promo-platforma. Three.js asosidagi 3D vizualizatsiya va GSAP animatsiyalari avtomobil dinamikasini ekranda his qilish imkonini beradi. Modellar katalogi, texnik xususiyatlar va test-drayvga yozilish formasi bilan to‘liq marketing vositasi sifatida ishlaydi.',
      RU: 'Jetour Uzbekistan — промо-платформа для премиального автобренда. 3D-визуализация на Three.js и анимации GSAP позволяют почувствовать динамику автомобиля на экране. С каталогом моделей, техническими характеристиками и формой записи на тест-драйв работает как полноценный маркетинговый инструмент.',
      EN: 'Jetour Uzbekistan is a promo platform for a premium car brand. Three.js 3D visualization and GSAP animations convey vehicle dynamics on screen. With a model catalog, tech specs and a test-drive form, it works as a complete marketing tool.'
    },
    tech: ['Next.js', 'Three.js', 'GSAP'],
    images: ['/projects/jetour1.png', '/projects/jetour2.png', '/projects/jetour3.png', '/projects/jetour4.png'],
    url: 'https://jetour-app.vercel.app/',
    year: 2024
  },
  {
    slug: 'dono',
    name: 'Dono-Dance',
    category: {
      UZ: 'Raqs Maktabi Platformasi',
      RU: 'Платформа школы танцев',
      EN: 'Dance School Platform'
    },
    desc: {
      UZ: 'Raqamli o‘quv platformasi. Ota-onalar va o‘quvchilar uchun shaxsiy kabinetlar ekotizimi.',
      RU: 'Цифровая учебная платформа. Экосистема личных кабинетов для родителей и учащихся.',
      EN: 'Educational infrastructure with dedicated portals for students, parents, and billing managers.'
    },
    longDesc: {
      UZ: 'Dono-Dance — raqs maktabi uchun raqamli o‘quv platformasi. O‘quvchilar jadval va natijalarni, ota-onalar to‘lovlar va davomatni shaxsiy kabinetlar orqali kuzatib boradi. Administratsiya uchun guruhlar, o‘qituvchilar va moliya boshqaruvi yagona panelda jamlangan.',
      RU: 'Dono-Dance — цифровая учебная платформа для школы танцев. Ученики следят за расписанием и результатами, родители — за оплатами и посещаемостью через личные кабинеты. Для администрации управление группами, преподавателями и финансами собрано в единой панели.',
      EN: 'Dono-Dance is a digital learning platform for a dance school. Students track schedules and results, parents track payments and attendance through personal portals. For administration, group, teacher and finance management is unified in a single panel.'
    },
    tech: ['WordPress', 'PHP', 'Custom Theme'],
    images: ['/projects/dance1.png', '/projects/dance2.png', '/projects/dance3.png', '/projects/dance4.png'],
    url: 'https://webleaders-project-dance.vercel.app/',
    year: 2023
  },
  {
    slug: 'telmee',
    name: 'Telmee Market',
    category: {
      UZ: 'E-Commerce Platforma',
      RU: 'Маркетплейс нового поколения',
      EN: 'Next-Gen E-Commerce Market'
    },
    desc: {
      UZ: 'Yuqori tezlikdagi marketpleys. B2C va P2P savdo modellarini qo‘llab-quvvatlovchi elektron tijorat yechimi.',
      RU: 'Высокоскоростной маркетплейс. Электронное торговое решение, поддерживающее модели B2C и P2P.',
      EN: 'Highly optimized digital marketplace managing hybrid B2C and P2P transaction commerce rails.'
    },
    longDesc: {
      UZ: 'Telmee Market — B2C va P2P savdo modellarini birlashtiruvchi yuqori tezlikdagi marketpleys. MERN stack va Socket.io asosida qurilgan tizim real vaqtdagi chat, buyurtma kuzatuvi va sotuvchi kabinetlarini taqdim etadi. Mahsulot katalogi yuqori yuklamalarga mo‘ljallangan arxitekturada ishlaydi.',
      RU: 'Telmee Market — высокоскоростной маркетплейс, объединяющий модели торговли B2C и P2P. Построенная на MERN-стеке и Socket.io система предоставляет чат в реальном времени, отслеживание заказов и кабинеты продавцов. Каталог товаров работает на архитектуре, рассчитанной на высокие нагрузки.',
      EN: 'Telmee Market is a high-speed marketplace combining B2C and P2P commerce models. Built on the MERN stack and Socket.io, it provides real-time chat, order tracking and seller dashboards. The product catalog runs on a high-load architecture.'
    },
    tech: ['MERN Stack', 'Socket.io', 'Real-time'],
    images: ['/projects/telmee1.png', '/projects/telmee2.png', '/projects/telmee3.png', '/projects/telmee4.png'],
    url: 'https://telmee.uz/',
    year: 2023
  }
]