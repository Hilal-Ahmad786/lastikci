'use client'

import { Phone, Clock } from 'lucide-react'
import { CONTACT_INFO } from '@/utils/constants'
import { trackWhatsAppClick } from '@/utils/analytics'

export default function HeroSection({ onCallClick }) {
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    trackWhatsAppClick()
  }

  return (
    <section
      id="anasayfa"
      className="relative bg-gradient-to-br from-red-50 via-orange-50 to-red-50 py-20 md:py-32 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-30" />
      
      {/* Animated Background Circles */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-red-600 rounded-full opacity-10 blur-3xl animate-float" />
      <div
        className="absolute bottom-20 left-10 w-96 h-96 bg-orange-600 rounded-full opacity-10 blur-3xl animate-float"
        style={{ animationDelay: '1s' }}
      />

      <div className="container relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg animate-pulse-slow">
            <Clock size={18} />
            <span>7/24 Acil Mobil Yol Yardım</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            MOBİL
            <br />
            <span className="text-gradient">LASTİK YARDIM</span>
          </h2>

          {/* Subheading */}
          <p className="text-2xl md:text-3xl text-gray-700 mb-8 font-semibold">
            7/24 Mobil Yol Yardım
          </p>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-10 max-w-2xl leading-relaxed">
            Yolda kaldınız mı? Lastik mi patladı? Akü mü bitti? Hemen arayın, 
            profesyonel ekibimiz 15-30 dakika içinde yanınızda!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onCallClick}
              className="bg-gray-900 text-white px-10 py-5 rounded-xl text-xl font-bold hover:bg-gray-800 transition-all duration-300 shadow-2xl hover:shadow-xl-red flex items-center justify-center space-x-3 group active:scale-95"
            >
              <Phone size={28} className="group-hover:animate-bounce" />
              <span>{CONTACT_INFO.phoneFormatted}</span>
            </button>

            <button
              onClick={handleWhatsAppClick}
              className="bg-[#25D366] text-white px-10 py-5 rounded-xl text-xl font-bold hover:bg-[#20BA5A] transition-all duration-300 shadow-2xl flex items-center justify-center space-x-3 active:scale-95"
            >
              {/* WhatsApp Icon */}
              <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>WhatsApp</span>
            </button>

            <a
              href="#hizmetler"
              className="bg-white text-red-600 px-10 py-5 rounded-xl text-xl font-bold hover:bg-red-50 transition-all duration-300 shadow-xl flex items-center justify-center border-2 border-red-600 active:scale-95"
            >
              Hizmetlerimiz
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">7/24</div>
              <div className="text-sm text-gray-600">Hizmet</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">15-30</div>
              <div className="text-sm text-gray-600">Dakika Süre</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">%100</div>
              <div className="text-sm text-gray-600">Memnuniyet</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 opacity-5">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#DC2626"
            d="M45.7,-57.8C58.9,-49.4,69.3,-36.3,73.7,-21.6C78.1,-6.9,76.6,9.4,70.3,23.8C64,38.2,53,50.7,39.8,58.5C26.6,66.3,11.3,69.4,-4.4,75.1C-20.1,80.8,-36.2,89.1,-48.7,83.3C-61.2,77.5,-70.1,57.6,-75.8,38.9C-81.5,20.2,-84,2.7,-80.4,-13.5C-76.8,-29.7,-67.1,-44.6,-54.1,-53.1C-41.1,-61.6,-24.8,-63.7,-9.3,-61.8C6.2,-59.9,32.5,-66.2,45.7,-57.8Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </section>
  )
}
