'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingButtons from '@/components/layout/FloatingButtons'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import CTASection from '@/components/sections/CTASection'
import AboutSection from '@/components/sections/AboutSection'
import ContactSection from '@/components/sections/ContactSection'
import useBotProtection from '@/hooks/useBotProtection'
import { trackConversion, trackEvent } from '@/utils/analytics'

export default function Home() {
  useBotProtection()

  const handleCallClick = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '05320520950'
    window.location.href = `tel:${phoneNumber}`
    
    // Track conversion
    trackConversion('phone_call', {
      phone_number: phoneNumber,
      value: 1.0,
      currency: 'TRY'
    })

    // Track event
    trackEvent('phone_call_click', {
      event_category: 'engagement',
      event_label: phoneNumber
    })
  }

  return (
    <>
      <Header onCallClick={handleCallClick} />
      <main>
        <HeroSection onCallClick={handleCallClick} />
        <ServicesSection onCallClick={handleCallClick} />
        <CTASection onCallClick={handleCallClick} />
        <AboutSection />
        <ContactSection onCallClick={handleCallClick} />
      </main>
      <Footer />
      <FloatingButtons onCallClick={handleCallClick} />
    </>
  )
}