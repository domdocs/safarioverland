'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent')
    if (!hasConsented) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true')
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 p-4 shadow-lg border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
            By clicking "Accept", you consent to our use of cookies.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowConsent(false)}
            className="h-8"
          >
            <X className="h-4 w-4 mr-1" /> Decline
          </Button>
          <Button 
            onClick={acceptCookies}
            className="h-8"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent 