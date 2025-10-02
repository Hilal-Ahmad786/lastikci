// Google Analytics and Google Ads tracking utilities

export const initGTM = (gtmId) => {
    if (!gtmId || typeof window === 'undefined') return
  
    window.dataLayer = window.dataLayer || []
    
    const script = document.createElement('script')
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `
    document.head.appendChild(script)
  }
  
  export const initGA = (gaId) => {
    if (!gaId || typeof window === 'undefined') return
  
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script1)
  
    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}', {
        page_path: window.location.pathname,
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
      });
    `
    document.head.appendChild(script2)
  
    window.gtag = function() {
      window.dataLayer.push(arguments)
    }
  }
  
  export const trackPageView = (url) => {
    if (typeof window === 'undefined' || !window.gtag) return
    
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    })
  }
  
  export const trackEvent = (action, params = {}) => {
    if (typeof window === 'undefined') return
  
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', action, params)
    }
  
    // Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        event: action,
        ...params
      })
    }
  }
  
  export const trackConversion = (conversionType, params = {}) => {
    if (typeof window === 'undefined' || !window.gtag) return
  
    const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
    const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL
  
    if (!googleAdsId || !conversionLabel) {
      console.warn('Google Ads tracking not configured')
      return
    }
  
    window.gtag('event', 'conversion', {
      send_to: `${googleAdsId}/${conversionLabel}`,
      value: params.value || 1.0,
      currency: params.currency || 'TRY',
      transaction_id: params.transaction_id || Date.now().toString(),
      ...params
    })
  
    // Also track in GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'conversion',
        conversion_type: conversionType,
        ...params
      })
    }
  }
  
  export const trackPhoneCall = () => {
    trackConversion('phone_call', {
      event_category: 'contact',
      event_label: 'phone_click',
      value: 1.0
    })
  }
  
  export const trackWhatsAppClick = () => {
    trackEvent('whatsapp_click', {
      event_category: 'contact',
      event_label: 'whatsapp_button'
    })
  }
  
  export const trackFormSubmit = (formName) => {
    trackConversion('form_submit', {
      event_category: 'lead',
      event_label: formName,
      value: 2.0
    })
  }