'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import WhyChooseUs from '@/components/MyChooseUs'
import ServicesSection from '../components/ServiceSection'
import HeroVideo from '@/components/HeroVideo'
import HowWeWork from '@/components/HowWeWork'
import Contact from '@/components/Contact'
import PricingPage from '@/components/PricingPage'
import Projects from '@/components/Projects'

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-out-back',
      once: true,
      offset: 100,
    })
  }, [])

  return (
    <>
      <div data-aos="fade-in">
        <HeroVideo />
      </div>

      <div >
        <ServicesSection />
      </div>

      <div >
        <WhyChooseUs />
      </div>

      <div >
        <HowWeWork />
      </div>

      <div >
        <Projects />
      </div>

      <div >
        <PricingPage />
      </div>

      <div >
        <Contact />
      </div>
    </>
  )
}
