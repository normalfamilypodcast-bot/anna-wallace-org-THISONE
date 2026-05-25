'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

const COOKIE_CONSENT_KEY = 'cookie-consent'

type ConsentValue = 'accepted' | 'declined' | null

export function CookieConsentBanner() {
  const [consent, setConsent] = useState<ConsentValue>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentValue
    if (storedConsent) {
      setConsent(storedConsent)
    } else {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => setIsVisible(true), 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
    setConsent('accepted')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined')
    setConsent('declined')
    setIsVisible(false)
  }

  // Don't render if consent already given or not yet visible
  if (consent || !isVisible) {
    return null
  }

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="relative bg-card border border-border rounded-lg shadow-lg p-4 md:p-6">
          <button
            onClick={handleDecline}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close cookie consent banner"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="pr-8">
            <h2 
              id="cookie-consent-title" 
              className="font-serif text-lg text-foreground mb-2"
            >
              Cookie Notice
            </h2>
            <p 
              id="cookie-consent-description" 
              className="text-sm text-muted-foreground mb-4 leading-relaxed"
            >
              We use cookies to enhance your browsing experience and analyse site traffic. 
              By clicking &quot;Accept&quot;, you consent to our use of cookies. 
              Read our{' '}
              <Link 
                href="/cookies" 
                className="text-primary hover:underline"
              >
                Cookie Policy
              </Link>
              {' '}for more information.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={handleAccept}
                size="sm"
              >
                Accept
              </Button>
              <Button 
                onClick={handleDecline}
                variant="outline"
                size="sm"
              >
                Decline
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
