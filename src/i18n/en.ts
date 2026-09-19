import type { Translations } from './uz'

/** Inglizcha matnlar — faqat foydalanuvchi EN ni tanlaganda yuklanadi. */
const en: Translations = {
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

export default en
