export const CONTACT_INFO = {
    phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || '05320520950',
    phoneFormatted: '0532 052 09 50',
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '905320520950',
    email: process.env.NEXT_PUBLIC_EMAIL || 'yardim@724mobillastikhizmeti.com.tr',
    address: 'Ankara, Türkiye',
  }
  
  export const SERVICES = [
    {
      id: 1,
      icon: '🚗',
      title: 'Mobil Yol Lastik Yardımı',
      description: 'Aracınızı güvenli ve güvenilir bir şekilde yol yardımı noktasına taşıyoruz. Her günün her saatinde ulaşılabilir hizmet sunuyoruz.',
      slug: 'mobil-yol-lastik-yardimi',
      image: '/images/service-1.jpg'
    },
    {
      id: 2,
      icon: '🔧',
      title: 'Yerinde Lastik Değişimi',
      description: 'Araçların lastik patlaklarında veya başka bir lastik problemi yaşadığında, en hızlı şekilde yerine gidip lastik değişimi çözümü sunarız.',
      slug: 'yerinde-lastik-degisimi',
      image: '/images/service-2.jpg'
    },
    {
      id: 3,
      icon: '🔋',
      title: 'Oto Akü Takviye Yol Yardım',
      description: 'Mobil yol yardım hizmeti, araç kullanıcılarının yolda karşılaştıkları acil akü sorunlarında büyük öneme sahiptir.',
      slug: 'oto-aku-takviye',
      image: '/images/service-3.jpg'
    },
    {
      id: 4,
      icon: '🔄',
      title: 'Oto Akü Değişim Yol Yardım',
      description: 'Profesyonel ekip ve modern ekipmanlarla aracınızın akü sorunlarını hızlıca çözerek güvenli yolculuğunuzu sağlarız.',
      slug: 'oto-aku-degisim',
      image: '/images/service-4.jpg'
    },
    {
      id: 5,
      icon: '🏥',
      title: '7/24 Lastik ve Akü Yol Yardım',
      description: 'Her an yanınızdayız! Gece gündüz demeden acil yol yardım hizmetleri sunuyoruz.',
      slug: '7-24-yol-yardim',
      image: '/images/service-5.jpg'
    }
  ]
  
  export const FEATURES = [
    {
      icon: '✓',
      title: '7/24 Acil Yol Yardım Hizmeti',
      description: 'Haftanın 7 günü, günün 24 saati hizmetinizdeyiz'
    },
    {
      icon: '⚡',
      title: 'Hızlı Müdahale Süresi',
      description: 'Ortalama 15-30 dakika içinde olay yerine ulaşıyoruz'
    },
    {
      icon: '⭐',
      title: 'Profesyonel Ekip',
      description: 'Deneyimli ve sertifikalı teknisyenlerimiz'
    },
    {
      icon: '📍',
      title: 'Tüm Bölgelere Hizmet',
      description: 'Ankara ve çevre illerde hizmet veriyoruz'
    }
  ]
  
  export const NAVIGATION = [
    { name: 'Ana Sayfa', href: '#anasayfa' },
    { name: 'Hizmetlerimiz', href: '#hizmetler' },
    { name: 'Hakkımızda', href: '#hakkimizda' },
    { name: 'İletişim', href: '#iletisim' }
  ]
  
  export const SCHEMA_ORG = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: '7/24 Mobil Lastikçi',
    image: '/images/logo.png',
    '@id': process.env.NEXT_PUBLIC_SITE_URL,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ankara',
      addressRegion: 'Ankara',
      addressCountry: 'TR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.8204,
      longitude: 34.8147
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '00:00',
      closes: '23:59'
    },
    priceRange: '$$',
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 39.8204,
        longitude: 34.8147
      },
      geoRadius: '50000'
    }
  }