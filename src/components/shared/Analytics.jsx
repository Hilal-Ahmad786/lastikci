'use client'

import { useEffect } from 'react'
import { initGTM, initGA } from '@/utils/analytics'

export default function Analytics() {
  useEffect(() => {
    // Initialize Google Tag Manager
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID
    if (gtmId) {
      initGTM(gtmId)
    }

    // Initialize Google Analytics
    const gaId = process.env.NEXT_PUBLIC_GA_ID
    if (gaId) {
      initGA(gaId)
    }
  }, [])

  return (
    <>
      {/* GTM noscript fallback */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
}