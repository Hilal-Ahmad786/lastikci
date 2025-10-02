'use client'

import { SERVICES } from '@/utils/constants'
import { ArrowRight } from 'lucide-react'

export default function ServicesSection({ onCallClick }) {
  return (
    <section id="hizmetler" className="py-20 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">Hizmetlerimiz</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Profesyonel ve güvenilir yol yardım hizmetleri ile 7/24 yanınızdayız
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="card p-6 hover:border-2 hover:border-red-600 transition-all duration-300 group cursor-pointer"
              onClick={onCallClick}
            >
              {/* Icon */}
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-red-600 transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* CTA */}
              <button
                className="text-red-600 font-bold hover:text-red-700 transition-colors flex items-center space-x-2 group-hover:translate-x-2 transition-transform duration-300"
                onClick={(e) => {
                  e.stopPropagation()
                  onCallClick()
                }}
              >
                <span>Hemen Ara</span>
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6 text-lg">
            Başka bir sorununuz mu var? Size yardımcı olmaktan mutluluk duyarız!
          </p>
          <button
            onClick={onCallClick}
            className="btn-primary text-lg px-8 py-4"
          >
            Hemen Arayın
          </button>
        </div>
      </div>
    </section>
  )
}