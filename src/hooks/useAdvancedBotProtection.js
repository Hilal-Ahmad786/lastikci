import { useEffect } from 'react'
import botProtection from '@/utils/advancedBotProtection'

export default function useAdvancedBotProtection() {
  useEffect(() => {
    // Initialize all bot protection mechanisms
    botProtection.init()
  }, [])

  const validatePhoneCall = () => {
    // Check if action should be blocked
    if (botProtection.shouldBlockAction()) {
      return false
    }

    // Check rate limiting
    if (!botProtection.checkCallRateLimit()) {
      alert('Too many calls in a short time. Please wait a moment.')
      return false
    }

    return true
  }

  const validateWhatsAppClick = () => {
    if (botProtection.shouldBlockAction()) {
      return false
    }
    return true
  }

  return {
    validatePhoneCall,
    validateWhatsAppClick,
    getSuspicionLevel: () => botProtection.getSuspicionLevel(),
    getSuspicionScore: () => botProtection.suspicionScore
  }
}