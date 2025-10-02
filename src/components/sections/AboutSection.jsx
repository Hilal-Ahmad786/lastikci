'use client'

import { FEATURES } from '@/utils/constants'
import { CheckCircle, Clock, Star, MapPin } from 'lucide-react'

const iconMap = {
  '✓': CheckCircle,
  '⚡': Clock,
  '⭐': Star,
  '📍': MapPin
}

export default function AboutSection() {
  return (
    <section id="hakkimizda" className="py-20 bg-gray-50">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="section-title">Hakkımızda</h2>
            <p className="section-subtitle">
              Güvenilir ve profesyonel yol yardım hizmetleri
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              Bölgeden Bölgeye her geçen gün artan trafik ve yoğun şehir hayatında, araç sahipleri 
              için güvenli ve sorunsuz bir sürüş deneyimi oldukça önemlidir. <strong>Oto Lastik</strong>, 
              her noktasına yayılmış kaliteli hizmet ağıyla araç sahiplerine güvenilir oto lastik, 
              akü takviye ve yol yardım hizmetleri sunan öncü bir firmadır.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              <strong>7/24 Oto Lastik</strong>, Geniş Servis ağı ve mobil ekipleri ile 7/24 hizmet verir. 
              Güvenilirlik, profesyonellik, kalite ve uygun fiyatlar konusundaki kararlılığıyla firmamız, 
              7/24 oto lastik ve yol yardım ihtiyaçlarınız için güvenilir bir tercihtir.
            </p>

            <p className="text-gray-700 leading-relaxed text-lg">
              Yolculuklarınızı güvenli ve konforlu hale getirmek için <strong>7/24 Oto Lastik</strong> 
              {' '}her zaman yanınızda!
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {FEATURES.map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    {feature.icon === '✓' && <CheckCircle size={24} />}
                    {feature.icon === '⚡' && <Clock size={24} />}
                    {feature.icon === '⭐' && <Star size={24} />}
                    {feature.icon === '📍' && <MapPin size={24} />}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Value Proposition */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8 md:p-10 rounded-2xl shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">
              Güvenilir Hizmet, Uygun Fiyatlar
            </h3>
            <p className="mb-4 leading-relaxed text-lg">
              Kaliteli hizmet anlayışını uygun fiyatlarla birleştirerek müşteri memnuniyetini 
              en üst seviyeye çıkarmayı hedefler. Firma, müşterilerine sunduğu hizmetlerde 
              kaliteden ödün vermezken, aynı zamanda rekabetçi fiyat politikasıyla da dikkat çeker.
            </p>
            <p className="leading-relaxed text-lg">
              Böylece, her bütçeye uygun çözümler sunarak araç sahiplerinin güvenini kazanmayı başarır.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}