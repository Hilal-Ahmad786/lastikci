'use client'

import { Phone, Clock } from 'lucide-react'
import { CONTACT_INFO } from '@/utils/constants'

export default function CTASection({ onCallClick }) {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-pattern" />
      </div>

      {/* Animated Circles */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-red-600 rounded-full opacity-20 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-red-600 rounded-full opacity-20 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 rounded-full mb-6 animate-bounce">
            <Clock size={40} />
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            7/24 OTO LASTİK HİZMETİ VE<br />AKÜ TAKVİYESİ
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-10 opacity-90">
            Arayın Hemen Yardım Edelim!
          </p>

          {/* CTA Button */}
          <button
            onClick={onCallClick}
            className="bg-red-600 text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-red-700 transition-all duration-300 shadow-2xl hover:shadow-xl inline-flex items-center space-x-3 group active:scale-95"
          >
            <Phone size={28} className="group-hover:animate-bounce" />
            <span>{CONTACT_INFO.phoneFormatted}</span>
          </button>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-5xl mb-3">⚡</div>
              <h3 className="text-lg font-bold mb-2">Hızlı Servis</h3>
              <p className="text-sm opacity-80">15-30 dakika içinde yanınızdayız</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">👨‍🔧</div>
              <h3 className="text-lg font-bold mb-2">Uzman Ekip</h3>
              <p className="text-sm opacity-80">Deneyimli ve profesyonel teknisyenler</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">💰</div>
              <h3 className="text-lg font-bold mb-2">Uygun Fiyat</h3>
              <p className="text-sm opacity-80">Rekabetçi ve şeffaf fiyatlandırma</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}