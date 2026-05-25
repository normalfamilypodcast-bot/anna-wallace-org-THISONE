'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useContactDetails } from '@/providers/contact-details-provider'
import { useSiteDetails } from '@/providers/site-details-provider'
import { FacebookIcon } from '@/components/icons/facebook-icon'
import { InstagramIcon } from '@/components/icons/instagram-icon'
import { LinkedInIcon } from '@/components/icons/linkedin-icon'
import { YouTubeIcon } from '@/components/icons/youtube-icon'

export function SiteFooter() {

  const { socials } = useContactDetails();
  const { logoPath } = useSiteDetails();
  
  // Helper to get the correct icon component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'linkedin':
        return <LinkedInIcon />
      case 'instagram':
        return <InstagramIcon />
      case 'youtube':
        return <YouTubeIcon />
      case 'facebook':
        return <FacebookIcon />
      default:
        return null
    }
  }

  return (
    <footer className="border-t border-border py-12 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Image 
                src={logoPath || "/placeholder.svg"} 
                alt="A Normal Family Logo" 
                width={32} 
                height={32}
                className="rounded-sm"
              />
              <h3 className="font-serif text-lg text-foreground">Anna Wallace</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Creating safe spaces for honest conversations about family life.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Navigate</h4>
            <div className="flex flex-col gap-2">
              <Link href="/work-with-anna" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Work with Anna
              </Link>
              <Link href="/podcast" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                A Normal Family (ANF)
              </Link>
              <Link href="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Resources
              </Link>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Connect</h4>
            <div className="flex gap-3">
              {socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                  aria-label={social.name}
                >
                  {getIcon(social.icon)}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Anna Wallace. All stories shared with permission.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
