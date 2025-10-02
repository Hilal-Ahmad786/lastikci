'use client'

import { CONTACT_INFO, NAVIGATION } from '@/utils/constants'

export default function Footer() {
  return (
    <footer className="bg-red-600 text-white py-12">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">HAKKIMIZDA</h3>
            <p className="text-sm leading-relaxed opacity-90">
              7/24 Oto Lastik, Geniş Servis ağı ve mobil ekipleri ile 7/24 hizmet verir. 
              Güvenilirlik, profesyonellik, kalite ve uygun fiyatlar konusundaki kararlılığıyla 
              firmamız, 7/24 oto lastik ve yol yardım ihtiyaçlarınız için güvenilir bir tercihtir.
            </p>
            <p className="text-sm mt-3 opacity-90">
              Yolculuklarınızı güvenli ve konforlu hale getirmek için 7/24 Oto Lastik her zaman yanınızda!
            </p>
          </div>

          {/* Menu Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">MENÜ</h3>
            <ul className="space-y-2 text-sm">
              {NAVIGATION.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-red-200 transition-colors duration-200 inline-block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">İLETİŞİM</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Telefon:</span>{' '}
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="hover:text-red-200 transition-colors"
                >
                  {CONTACT_INFO.phoneFormatted}
                </a>
              </p>
              <p>
                <span className="font-semibold">Email:</span>{' '}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-red-200 transition-colors break-all"
                >
                  {CONTACT_INFO.email}
                </a>
              </p>
              <p>
                <span className="font-semibold">Adres:</span> {CONTACT_INFO.address}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-red-500 pt-6 text-center text-sm">
          <p className="opacity-90">
            {new Date().getFullYear()} © Tüm Hakları Saklıdır, 7/24 Mobil Lastikçi
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-24 left-6 bg-gray-900 text-white p-3 rounded-full shadow-xl hover:bg-gray-800 transition-all duration-300 hover:scale-110 z-40"
        aria-label="Yukarı Çık"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </footer>
  )
}