import { useEffect } from 'react'
import { trackEvent } from '@/utils/analytics'

export default function useAnalytics() {
  useEffect(() => {
    // Track page load
    trackEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    })
  }, [])

  return {
    trackEvent
  }
}
