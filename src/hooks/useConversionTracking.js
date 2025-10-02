import { trackConversion } from '@/utils/analytics'

export default function useConversionTracking() {
  const trackPhoneCall = () => {
    trackConversion('phone_call', {
      event_category: 'contact',
      event_label: 'phone_click',
      value: 1.0,
      currency: 'TRY'
    })
  }

  const trackWhatsApp = () => {
    trackConversion('whatsapp_click', {
      event_category: 'contact',
      event_label: 'whatsapp_button',
      value: 1.0,
      currency: 'TRY'
    })
  }

  const trackFormSubmit = (formName) => {
    trackConversion('form_submit', {
      event_category: 'lead',
      event_label: formName,
      value: 2.0,
      currency: 'TRY'
    })
  }

  return {
    trackPhoneCall,
    trackWhatsApp,
    trackFormSubmit
  }
}
