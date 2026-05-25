'use client';

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useSiteDetails } from '@/providers/site-details-provider'
import { useContactDetails } from '@/providers/contact-details-provider'
import { InstagramIcon } from '@/components/icons/instagram-icon'
import { YouTubeIcon } from '@/components/icons/youtube-icon'

const navLinks = [
  { href: '/work-with-anna', label: 'Work with Anna' },
  { href: '/podcast', label: 'A Normal Family' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const { logoPath } = useSiteDetails();
  const { socials } = useContactDetails();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const instagram = socials.find(s => s.icon === 'instagram');
  const youtube = socials.find(s => s.icon === 'youtube');

  return (
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-xl font-serif text-foreground hover:text-primary transition-colors">
            <Image
              src={logoPath || "/placeholder.svg"}
              alt="A Normal Family Logo"
              width={36}
              height={36}
              className="rounded-sm"
            />
            <span>Anna Wallace</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Social icons */}
            <div className="flex items-center gap-3 border-l border-border pl-6 ml-1">
              {instagram && (
                <Link
                  href={instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <InstagramIcon />
                </Link>
              )}
              {youtube && (
                <Link
                  href={youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <YouTubeIcon />
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-border mt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-4 pt-2 border-t border-border">
                {instagram && (
                  <Link href={instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
                    <InstagramIcon />
                  </Link>
                )}
                {youtube && (
                  <Link href={youtube.url} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-muted-foreground hover:text-foreground transition-colors">
                    <YouTubeIcon />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
