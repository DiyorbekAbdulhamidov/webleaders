'use client'

import HeroVideo from '@/components/HeroVideo'
import ServicesSection from '@/components/ServiceSection'
import PortfolioPreview from '@/components/PortfolioPreview'
import WhyChooseUs from '@/components/MyChooseUs'
import ProcessSection from '@/components/ProcessSection'
import PricingPage from '@/components/PricingPage'
import FAQSection from '@/components/FAQSection'
import CTASection from '@/components/CTASection'
import Contact from '@/components/Contact'
import type { Project } from '@/data/projects'

export default function HomeClient({ projects }: { projects: Project[] }) {
  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <HeroVideo />
      <ServicesSection />
      <PortfolioPreview projects={projects} />
      <WhyChooseUs />
      <ProcessSection />
      <PricingPage />
      <FAQSection />
      <CTASection />
      <Contact />
    </div>
  )
}
