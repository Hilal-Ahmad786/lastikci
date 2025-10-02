'use client'

import { useState } from 'react'
import { Phone, Menu, X } from 'lucide-react'
import { CONTACT_INFO, NAVIGATION } from '@/utils/constants'
import { trackWhatsAppClick } from '@/utils/analytics'
import Image from 'next/image'

export default function Header({ onCallClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    trackWhatsAppClick()
  }

  return (
    <header className="bg-gradient-to-r from-red-600 to-red-700 text-white sticky top-0 z-50 shadow-lg">
      <div className="container">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg shadow-md">
              {/* Replace with your actual logo 
              <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xl">YL</span>
              </div>
              */}
             
              <Image
                src="/images/logo.png"
                alt="7/24 Mobil Lastikçi"
                width={120}
                height={120}
                priority
              />
              
            </div>

          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {NAVIGATION.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="hover:text-red-200 transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center space-x-2 bg-[#25D366] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#20BA5A] transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
              aria-label="WhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>WhatsApp</span>
            </button>

            {/* Call Button */}
            <button
              onClick={onCallClick}
              className="flex items-center space-x-2 bg-white text-red-600 px-6 py-2 rounded-full font-bold hover:bg-red-50 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
              aria-label="Hemen Ara"
            >
              <Phone size={20} />
              <span>{CONTACT_INFO.phoneFormatted}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menü"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2 border-t border-red-500 pt-4">
            {NAVIGATION.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 hover:text-red-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            
            {/* Mobile WhatsApp Button */}
            <button
              onClick={() => {
                handleWhatsAppClick()
                setIsMenuOpen(false)
              }}
              className="w-full flex items-center justify-center space-x-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold mt-4"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>WhatsApp</span>
            </button>
            
            {/* Mobile Call Button */}
            <button
              onClick={() => {
                onCallClick()
                setIsMenuOpen(false)
              }}
              className="w-full flex items-center justify-center space-x-2 bg-white text-red-600 px-6 py-3 rounded-full font-bold"
            >
              <Phone size={20} />
              <span>{CONTACT_INFO.phoneFormatted}</span>
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}