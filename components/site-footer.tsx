'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useContactDetails } from '@/providers/contact-details-provider'
import { FacebookIcon } from '@/components/icons/facebook-icon'
import { InstagramIcon } from '@/components/icons/instagram-icon'
import { LinkedInIcon } from '@/components/icons/linkedin-icon'
import { YouTubeIcon } from '@/components/icons/youtube-icon'

export function SiteFooter() {
  const { socials } = useContactDetails();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'linkedin': return <LinkedInIcon />
      case 'instagram': return <InstagramIcon />
      case 'youtube': return <YouTubeIcon />
      case 'facebook': return <FacebookIcon />
      default: return null
    }
  }

  return (
    <footer className="border-t border-border py-12 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Image src="https://res.cloudinary.com/dhngfy4p6/image/upload/v1775587122/448CEC65-3B2B-4DF2-B294-1A45ACEA374E_1_105_c_qwppoj.jpg" alt="Anna Wallace" width={32} height={32} className="rounded-full object-cover object-top" />
              <h3 className="font-serif text-lg text-foreground">Anna Wallace</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">Helping people understand themselves so they can have better relationships and happier lives.</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Navigate</h4>
            <div className="flex flex-col gap-2">
              <Link href="/work-with-anna" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Work with me</Link>
              <Link href="/podcast" className="text-sm text-muted-foreground hover:text-foreground transition-colors">A Normal Family</Link>
              <Link href="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Resources</Link>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Connect</h4>
            <div className="flex gap-3">
              {socials.map((social) => (
                <Link key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center" aria-label={social.name}>
                  {getIcon(social.icon)}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2026 Anna Wallace. All stories shared with permission.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookies</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
