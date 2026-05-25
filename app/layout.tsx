import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ContactDetailsProvider } from '@/providers/contact-details-provider';
import { SiteDetailsProvider } from '@/providers/site-details-provider';
import {
  getContactDetails,
  getSiteDetails,
} from '@/lib/contact-source';
import { CookieConsentBanner } from '@/components/cookie-consent-banner';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const contactDetails = await getContactDetails();
  const siteDetails = await getSiteDetails();
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        <ContactDetailsProvider value={contactDetails}>
          <SiteDetailsProvider value={siteDetails}>
            {children}
            <Analytics />
            <CookieConsentBanner />
          </SiteDetailsProvider>
        </ContactDetailsProvider>
      </body>
    </html>
  )
}

export const metadata = {
  generator: 'v0.app'
};
