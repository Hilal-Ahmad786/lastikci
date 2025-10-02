import { useEffect } from 'react'

const useBotProtection = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Bot detection patterns
    const botPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /crawling/i,
      /fetcher/i,
      /scanner/i,
      /scraper/i
    ]

    // Check user agent
    const userAgent = navigator.userAgent.toLowerCase()
    const isBot = botPatterns.some(pattern => pattern.test(userAgent))

    if (isBot) {
      console.log('Bot detected via user agent')
      // Track bot visits
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'bot_detected',
          bot_type: 'user_agent'
        })
      }
    }

    // Mouse movement tracking
    let mouseMovements = 0
    let mouseMoveStartTime = Date.now()

    const handleMouseMove = () => {
      mouseMovements++
    }

    // Touch tracking for mobile
    let touchEvents = 0
    const handleTouch = () => {
      touchEvents++
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchstart', handleTouch)

    // Check after 3 seconds
    const timer = setTimeout(() => {
      const elapsedTime = (Date.now() - mouseMoveStartTime) / 1000

      if (mouseMovements < 3 && touchEvents < 1 && !isBot) {
        console.log('Suspicious behavior detected - low interaction')
        
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'suspicious_behavior',
            mouse_movements: mouseMovements,
            touch_events: touchEvents,
            elapsed_time: elapsedTime
          })
        }
      }
    }, 3000)

    // Check if JavaScript is enabled (honeypot)
    const honeypot = document.createElement('input')
    honeypot.type = 'text'
    honeypot.name = 'website'
    honeypot.style.position = 'absolute'
    honeypot.style.left = '-9999px'
    honeypot.tabIndex = -1
    honeypot.autocomplete = 'off'
    document.body.appendChild(honeypot)

    // Check for automated tools
    const checkAutomation = () => {
      // Check for webdriver
      if (navigator.webdriver) {
        console.log('Webdriver detected')
        return true
      }

      // Check for phantom/headless browsers
      if (window.callPhantom || window._phantom) {
        console.log('Headless browser detected')
        return true
      }

      return false
    }

    if (checkAutomation()) {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'automation_detected'
        })
      }
    }

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouch)
      clearTimeout(timer)
      if (honeypot.parentNode) {
        honeypot.parentNode.removeChild(honeypot)
      }
    }
  }, [])
}

export default useBotProtection