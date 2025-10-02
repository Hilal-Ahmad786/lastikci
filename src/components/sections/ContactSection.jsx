'use client'

import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { CONTACT_INFO } from '@/utils/constants'

export default function ContactSection({ onCallClick }) {
  return (
    <section id="iletisim" className="py-20 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">İletişim</h2>
          <p className="section-subtitle">
            Size nasıl yardımcı olabiliriz? Hemen iletişime geçin!
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Contact Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Phone Card */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl text-center hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-red-600">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <Phone size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Telefon</h3>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                onClick={onCallClick}
                className="text-2xl text-red-600 hover:text-red-700 transition-colors font-bold block"
              >
                {CONTACT_INFO.phoneFormatted}
              </a>
              <button
                onClick={onCallClick}
                className="mt-6 btn-primary"
              >
                Hemen Ara
              </button>
            </div>

            {/* Email Card */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl text-center hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-red-600">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <Mail size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Email</h3>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-lg text-gray-700 hover:text-red-600 transition-colors break-all"
              >
                {CONTACT_INFO.email}
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="mt-6 btn-secondary inline-block"
              >
                Email Gönder
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Location */}
            <div className="flex items-start space-x-4 bg-gray-50 p-6 rounded-xl">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <MapPin size={24} />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Hizmet Bölgesi</h3>
                <p className="text-gray-600">
                  Ankara ve çevre iller<br />
                  Mobil hizmet ile her yerde
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start space-x-4 bg-gray-50 p-6 rounded-xl">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <Clock size={24} />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Çalışma Saatleri</h3>
                <p className="text-gray-600">
                  7 Gün 24 Saat<br />
                  Kesintisiz Hizmet
                </p>
              </div>
            </div>
          </div>

          {/* Emergency CTA */}
          <div className="mt-12 bg-gradient-to-r from-red-600 to-red-700 text-white p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-3">
              Acil Durumda mı?
            </h3>
            <p className="mb-6 text-lg">
              Hemen arayın, ekibimiz 15-30 dakika içinde yanınızda olsun!
            </p>
            <button
              onClick={onCallClick}
              className="bg-white text-red-600 px-8 py-4 rounded-full text-xl font-bold hover:bg-red-50 transition-all duration-300 shadow-xl inline-flex items-center space-x-2"
            >
              <Phone size={24} />
              <span>{CONTACT_INFO.phoneFormatted}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}