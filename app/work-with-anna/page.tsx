import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { getSiteDetails } from '@/lib/contact-source'

export async function generateMetadata(): Promise<Metadata> {
  const siteDetails = await getSiteDetails()
  const title = 'Work with me | Anna Wallace'
  const description = 'Coaching, workshops, and events with Anna Wallace. For people ready to understand themselves better and live with more purpose and joy.'
  const url = `${siteDetails.canonicalUrl}/work-with-anna`

  return {
    title,
    description,
    keywords: ['Anna Wallace', 'coaching', 'workshops', 'personal development', 'women in transition', 'purpose', 'self-understanding'],
    authors: [{ name: 'Anna Wallace' }],
    creator: 'Anna Wallace',
    openGraph: { title, description, url, siteName: 'Anna Wallace', type: 'website' },
    alternates: { canonical: url },
  }
}

export default async function WorkWithAnnaPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-8">
            Coaching · Workshops · Events
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-foreground leading-[1.1] mb-6 text-balance">
            Work with me
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            There are a few ways we can work together — one-to-one, in a group, or in your organisation. All of them start from the same place: helping you understand yourself better so
