'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import HeroVideo from '@/components/HeroVideo'
import ServicesSection from '../components/ServiceSection'
import Projects from '@/components/Projects'
import WhyChooseUs from '@/components/MyChooseUs'
import Contact from '@/components/Contact'
import PricingPage from '@/components/PricingPage'
export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    })
  }, [])

  return (
    <main className="bg-black min-h-screen text-white overflow-x-hidden">

      <div data-aos="fade-in">
        <HeroVideo />
      </div>

      <div data-aos="fade-up">
        <ServicesSection />
      </div>

      <div data-aos="fade-up">
        <Projects />
      </div>

      <div data-aos="fade-up">
        <WhyChooseUs />
      </div>

      <div data-aos="fade-up">
        <PricingPage />
      </div>

      <div data-aos="zoom-in-up">
        <Contact />
      </div>

    </main>
  )
}