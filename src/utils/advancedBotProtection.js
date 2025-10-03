// Advanced Bot Protection & Click Fraud Prevention

class BotProtection {
    constructor() {
      this.suspicionScore = 0
      this.interactions = []
      this.startTime = Date.now()
      this.clickTimestamps = []
      this.sessionId = this.generateSessionId()
    }
  
    generateSessionId() {
      return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }
  
    // Track mouse movements
    trackMouseMovement() {
      let mouseMovements = 0
      let totalDistance = 0
      let lastX = 0
      let lastY = 0
  
      const handleMouseMove = (e) => {
        mouseMovements++
        const distance = Math.sqrt(
          Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2)
        )
        totalDistance += distance
        lastX = e.clientX
        lastY = e.clientY
  
        this.interactions.push({
          type: 'mouse_move',
          timestamp: Date.now(),
          x: e.clientX,
          y: e.clientY
        })
      }
  
      window.addEventListener('mousemove', handleMouseMove)
  
      // Check after 3 seconds
      setTimeout(() => {
        if (mouseMovements < 5) {
          this.suspicionScore += 30
          this.logSuspiciousActivity('low_mouse_movement', { count: mouseMovements })
        }
        if (totalDistance < 100) {
          this.suspicionScore += 20
          this.logSuspiciousActivity('minimal_mouse_distance', { distance: totalDistance })
        }
      }, 3000)
  
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  
    // Detect rapid clicking (bot behavior)
    trackClickPattern(element) {
      element.addEventListener('click', (e) => {
        const now = Date.now()
        this.clickTimestamps.push(now)
  
        // Keep only last 10 clicks
        if (this.clickTimestamps.length > 10) {
          this.clickTimestamps.shift()
        }
  
        // Check for rapid clicking (more than 5 clicks in 2 seconds)
        const recentClicks = this.clickTimestamps.filter(
          timestamp => now - timestamp < 2000
        )
  
        if (recentClicks.length > 5) {
          this.suspicionScore += 50
          this.logSuspiciousActivity('rapid_clicking', { count: recentClicks.length })
          return false // Block the action
        }
  
        // Check for perfectly timed clicks (bot signature)
        if (this.clickTimestamps.length >= 3) {
          const intervals = []
          for (let i = 1; i < this.clickTimestamps.length; i++) {
            intervals.push(this.clickTimestamps[i] - this.clickTimestamps[i - 1])
          }
          
          const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
          const variance = intervals.every(
            interval => Math.abs(interval - avgInterval) < 50
          )
  
          if (variance && intervals.length > 3) {
            this.suspicionScore += 40
            this.logSuspiciousActivity('perfectly_timed_clicks', { intervals })
          }
        }
  
        return true
      })
    }
  
    // Check if user stays less than 2 seconds (bounce bot)
    trackSessionTime() {
      window.addEventListener('beforeunload', () => {
        const sessionDuration = Date.now() - this.startTime
        
        if (sessionDuration < 2000) {
          this.suspicionScore += 25
          this.logSuspiciousActivity('instant_bounce', { duration: sessionDuration })
        }
      })
    }
  
    // Detect headless browsers
    detectHeadlessBrowser() {
      const tests = {
        webdriver: navigator.webdriver,
        chrome: !window.chrome && navigator.userAgent.includes('Chrome'),
        permissions: navigator.permissions === undefined,
        plugins: navigator.plugins.length === 0,
        languages: navigator.languages.length === 0
      }
  
      const suspiciousTests = Object.entries(tests).filter(([_, value]) => value)
  
      if (suspiciousTests.length >= 2) {
        this.suspicionScore += 60
        this.logSuspiciousActivity('headless_browser', { tests: suspiciousTests })
      }
    }
  
    // Check for automation tools
    detectAutomation() {
      const automationIndicators = [
        window.document.__selenium_unwrapped,
        window.document.__webdriver_evaluate,
        window.document.__driver_evaluate,
        window.navigator.webdriver,
        window.document.__webdriver_script_fn,
        window.document.__fxdriver_unwrapped,
        window.document.__driver_unwrapped,
        window._phantom,
        window._selenium,
        window.callPhantom,
        window.callSelenium
      ]
  
      const detected = automationIndicators.filter(indicator => indicator !== undefined)
  
      if (detected.length > 0) {
        this.suspicionScore += 100
        this.logSuspiciousActivity('automation_detected', { count: detected.length })
        return true
      }
  
      return false
    }
  
    // Rate limiting for phone calls
    checkCallRateLimit() {
      const callHistory = JSON.parse(localStorage.getItem('callHistory') || '[]')
      const now = Date.now()
      const recentCalls = callHistory.filter(timestamp => now - timestamp < 60000) // 1 minute
  
      if (recentCalls.length >= 3) {
        this.suspicionScore += 70
        this.logSuspiciousActivity('excessive_calls', { count: recentCalls.length })
        return false // Block the call
      }
  
      // Add current call
      callHistory.push(now)
      // Keep only last 10 calls
      const trimmedHistory = callHistory.slice(-10)
      localStorage.setItem('callHistory', JSON.stringify(trimmedHistory))
  
      return true
    }
  
    // IP-based protection (requires backend - this is frontend simulation)
    simulateIPCheck() {
      // In production, send session data to backend for IP verification
      // Backend should check:
      // - Multiple sessions from same IP
      // - IP reputation databases
      // - Geolocation matching ad targeting
      
      const sessionCount = parseInt(sessionStorage.getItem('sessionCount') || '0')
      sessionStorage.setItem('sessionCount', (sessionCount + 1).toString())
  
      if (sessionCount > 5) {
        this.suspicionScore += 40
        this.logSuspiciousActivity('multiple_sessions', { count: sessionCount })
      }
    }
  
    // Check viewport size (bots often have unusual viewports)
    checkViewport() {
      const width = window.innerWidth
      const height = window.innerHeight
  
      if (width < 300 || height < 300 || width > 5000 || height > 5000) {
        this.suspicionScore += 30
        this.logSuspiciousActivity('unusual_viewport', { width, height })
      }
    }
  
    // Honeypot - invisible elements that bots might interact with
    createHoneypot() {
      const honeypot = document.createElement('input')
      honeypot.type = 'text'
      honeypot.name = 'website'
      honeypot.style.cssText = `
        position: absolute;
        left: -9999px;
        top: -9999px;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
      `
      honeypot.tabIndex = -1
      honeypot.setAttribute('aria-hidden', 'true')
      honeypot.autocomplete = 'off'
  
      honeypot.addEventListener('change', () => {
        this.suspicionScore += 100
        this.logSuspiciousActivity('honeypot_triggered', { value: honeypot.value })
      })
  
      document.body.appendChild(honeypot)
    }
  
    // Log suspicious activities
    logSuspiciousActivity(type, data) {
      const activity = {
        type,
        data,
        timestamp: Date.now(),
        sessionId: this.sessionId,
        userAgent: navigator.userAgent,
        score: this.suspicionScore
      }
  
      // Send to analytics
      if (window.gtag) {
        window.gtag('event', 'suspicious_activity', {
          event_category: 'security',
          event_label: type,
          value: this.suspicionScore
        })
      }
  
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.warn('Suspicious Activity:', activity)
      }
  
      // In production, send to your backend for analysis
      // fetch('/api/log-suspicious-activity', {
      //   method: 'POST',
      //   body: JSON.stringify(activity)
      // })
    }
  
    // Check if user is suspicious
    isSuspicious() {
      return this.suspicionScore >= 100
    }
  
    // Get suspicion level
    getSuspicionLevel() {
      if (this.suspicionScore >= 150) return 'critical'
      if (this.suspicionScore >= 100) return 'high'
      if (this.suspicionScore >= 50) return 'medium'
      return 'low'
    }
  
    // Block action if suspicious
    shouldBlockAction() {
      if (this.suspicionScore >= 100) {
        alert('Unusual activity detected. Please try again later or contact us directly.')
        return true
      }
      return false
    }
  
    // Initialize all protections
    init() {
      this.trackMouseMovement()
      this.trackSessionTime()
      this.detectHeadlessBrowser()
      this.detectAutomation()
      this.simulateIPCheck()
      this.checkViewport()
      this.createHoneypot()
  
      // Track all clickable elements
      document.addEventListener('DOMContentLoaded', () => {
        const buttons = document.querySelectorAll('button, a[href^="tel:"]')
        buttons.forEach(button => this.trackClickPattern(button))
      })
  
      // Log final score before page unload
      window.addEventListener('beforeunload', () => {
        console.log('Final Suspicion Score:', this.suspicionScore)
        console.log('Suspicion Level:', this.getSuspicionLevel())
      })
    }
  }
  
  // Export singleton instance
  const botProtection = new BotProtection()
  export default botProtection