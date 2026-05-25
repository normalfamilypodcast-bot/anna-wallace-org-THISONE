import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, MapPin, Video, Banknote } from 'lucide-react'
import { getEvents } from '@/lib/event-source'
import type { Event } from '@/types/event'
import { getMyApproaches } from '@/lib/my-approach-source'
import { getSiteDetails } from '@/lib/contact-source'

export async function generateMetadata(): Promise<Metadata> {
  const [events, siteDetails] = await Promise.all([
    getEvents(),
    getSiteDetails(),
  ])

  const title = 'Work with Anna | Coaching, Workshops & Events'
  const serviceNames = events.map(e => e.title).join(', ')
  const description = `Work with Anna Wallace through personalised coaching, workshops, and transformative events. Services include: ${serviceNames}. Explore your family story and deepen your understanding of family narratives.`
  const url = `${siteDetails.canonicalUrl}/work-with-anna`

  return {
    title,
    description,
    keywords: [
      'family coaching',
      'narrative therapy',
      'family storytelling',
      'workshops',
      'guided journaling',
      'family dinners',
      'corporate workshops',
      'personal growth',
      'family history',
      'Anna Wallace',
    ],
    authors: [{ name: 'Anna Wallace' }],
    creator: 'Anna Wallace',
    openGraph: {
      title,
      description,
      url,
      siteName: 'Anna Wallace',
      type: 'website',
      images: [
        {
          url: siteDetails.logoPath,
          width: 1200,
          height: 630,
          alt: 'Work with Anna - Coaching & Workshops',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteDetails.logoPath],
    },
    alternates: {
      canonical: url,
    },
  }
}

function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

function LocationBadge({ type }: { type: Event['location']['type'] }) {
  if (type === 'virtual') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
        <Video className="size-3" />
        Virtual
      </span>
    )
  }
  if (type === 'in-person') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
        <MapPin className="size-3" />
        In Person
      </span>
    )
  }
  // both
  return (
    <>
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
        <Video className="size-3" />
        Virtual
      </span>
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
        <MapPin className="size-3" />
        In Person
      </span>
    </>
  )
}

function EventCard({ event, imagePosition }: { event: Event; imagePosition: 'left' | 'right' }) {
  const imageComponent = event.image && (
    <div className="hidden md:block relative aspect-square rounded-lg overflow-hidden bg-muted">
      <Image
        src={event.image.url}
        alt={event.image.alt}
        fill
        className="object-cover"
      />
    </div>
  )

  return (
    <Card className="p-6 md:p-8 bg-card border-border">
      <div className={`grid gap-6 items-start ${imagePosition === 'left' ? 'md:grid-cols-[200px_1fr]' : 'md:grid-cols-[1fr_200px]'}`}>
        {imagePosition === 'left' && imageComponent}
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h3 className="text-xl font-serif text-foreground">{event.title}</h3>
            <LocationBadge type={event.location.type} />
          </div>
          <div className="text-muted-foreground leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: event.description }} />
          <ul className="text-sm text-muted-foreground space-y-1 mb-5">
            {event.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
          {(event.schedule || event.pricing) && (
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-5">
              {event.schedule && (
                <>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="size-4" />
                    {event.schedule.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-4" />
                    {event.schedule.time}
                  </span>
                </>
              )}
              {event.pricing && (
                  <span className="inline-flex items-center gap-1.5">
                  <Banknote className="size-4" />
                    {formatPrice(event.pricing.amount, event.pricing.currency)}
                    {event.pricing.label && (
                        <span>({event.pricing.label})</span>
                    )}
                </span>
              )}
              {event.location.type === 'in-person' && event.location.address && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors underline underline-offset-2"
                >
                  <MapPin className="size-4" />
                  {event.location.address}
                </a>
              )}
            </div>
          )}
          {event.additionalInfo && (
            <p className="text-sm text-muted-foreground mb-5">
              {event.additionalInfo}
            </p>
          )}
          {event.cta.type === 'book' && event.cta.url ? (
            <Button asChild>
              <a href={event.cta.url} target="_blank" rel="noopener noreferrer">
                {event.cta.label}
              </a>
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href="/contact">
                {event.cta.label}
              </Link>
            </Button>
          )}
        </div>
        {imagePosition === 'right' && imageComponent}
      </div>
    </Card>
  )
}

export default async function WorkWithAnnaPage() {
  const [events, myApproaches, siteDetails] = await Promise.all([
    getEvents(),
    getMyApproaches(),
    getSiteDetails(),
  ])

  // JSON-LD structured data for Services
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // Main service offering
      {
        '@type': 'Service',
        name: 'Work with Anna Wallace',
        description: 'Personalised coaching, workshops, and transformative events to explore your family story and deepen your understanding of family narratives.',
        url: `${siteDetails.canonicalUrl}/work-with-anna`,
        provider: {
          '@type': 'Person',
          name: 'Anna Wallace',
          url: siteDetails.canonicalUrl,
        },
        serviceType: ['Coaching', 'Workshops', 'Events'],
        areaServed: {
          '@type': 'Place',
          name: 'Worldwide',
        },
      },
      // Individual events/services
      ...events.map(event => ({
        '@type': event.location.type === 'virtual' ? 'OnlineEventService' : 'Event',
        name: event.title,
        description: event.description,
        url: `${siteDetails.canonicalUrl}/work-with-anna#events`,
        image: event.image?.url,
        organizer: {
          '@type': 'Person',
          name: 'Anna Wallace',
        },
        eventAttendanceMode: event.location.type === 'virtual'
          ? 'https://schema.org/OnlineEventAttendanceMode'
          : event.location.type === 'in-person'
          ? 'https://schema.org/OfflineEventAttendanceMode'
          : 'https://schema.org/MixedEventAttendanceMode',
        ...(event.location.address && {
          location: {
            '@type': 'Place',
            address: event.location.address,
          },
        }),
      })),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background">
        <SiteHeader />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl tracking-wide text-muted-foreground text-balance">
            Work with Anna
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you&apos;re looking for a transformative group experience or personalised
            one-on-one support, I offer different ways to explore your story and deepen
            your understanding of family narratives.
          </p>
        </div>
      </section>

      {/* Events & Workshops Section */}
      <section id="events" className="bg-secondary py-8 md:py-10 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl tracking-wide text-muted-foreground text-balance">
              Workshops and events
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Immersive experiences designed to help you connect with yourself, your family,
              and your story in meaningful ways.
            </p>
          </div>

          <div className="grid gap-8">
            {events.length > 0 ? (
              events.map((event, index) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  imagePosition={index % 2 === 0 ? 'right' : 'left'} 
                />
              ))
            ) : (
              <Card className="p-8 md:p-12 bg-card border-border text-center">
                <div className="max-w-md mx-auto space-y-4">
                  <Calendar className="size-12 text-muted-foreground/50 mx-auto" />
                  <h3 className="text-xl font-serif text-foreground">No Events Scheduled</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    There are no upcoming events at the moment. Subscribe to my newsletter 
                    or follow me on social media to be the first to know when new workshops 
                    and gatherings are announced.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <Button asChild>
                      <Link href="/contact">Get in Touch</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/podcast">Explore the Podcast</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Coaching Section */}
      <section className="container mx-auto px-4 py-8 md:py-10 max-w-5xl">
        <div className="space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl tracking-wide text-muted-foreground text-balance">
            Coaching
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            One-on-one support for those ready to do deeper work on their family story
            and personal narrative.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* My Approach */}
          <Card className="p-6 md:p-8 bg-card border-border">
            <h3 className="text-xl font-serif text-foreground mb-4">My Approach</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                My coaching is rooted in deep listening and compassionate inquiry. I don&apos;t
                believe in quick fixes or surface-level solutions. Instead, we work together
                to understand the stories you&apos;ve inherited, the narratives you&apos;ve created,
                and how they shape your present.
              </p>
              <p>
                Sessions combine reflective conversation, guided exercises, and practical
                frameworks to help you make sense of your family history and move forward
                with clarity and intention.
              </p>
              <ul className="space-y-2 text-sm">
                <li>Compassion-centred methodology</li>
                <li>No judgement, only curiosity</li>
                <li>Flexible session structure</li>
                <li>Integration of narrative therapy principles</li>
              </ul>
            </div>
          </Card>

          {/* Who I Work With */}
          <Card className="p-6 md:p-8 bg-card border-border">
            <h3 className="text-xl font-serif text-foreground mb-4">Who I Work With</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I work with individuals who are ready to explore the deeper currents of
                their family story. My clients often come to me at transition points—new
                parenthood, loss, relationship changes, or simply a growing awareness that
                something needs to shift.
              </p>
              <p>You might be a good fit if you:</p>
              <ul className="space-y-2 text-sm">
                <li>Want to understand patterns passed down through generations</li>
                <li>Are preparing for difficult family conversations</li>
                <li>Feel disconnected from your family history</li>
                <li>Are processing grief or family estrangement</li>
                <li>Want to create a different legacy for your own family</li>
                <li>Are curious about how your story shapes your present</li>
              </ul>
            </div>
          </Card>
        </div>

        {/* How to Apply */}
        <Card className="p-8 md:p-12 bg-secondary border-border text-center">
          <h3 className="text-2xl font-serif text-foreground mb-4">Ready to Begin?</h3>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
            Coaching spaces are limited to ensure I can give each client my full attention.
            If you&apos;re interested in working together, please reach out through my contact
            page. Include a little about yourself and what you&apos;re hoping to explore—I
            read every message personally.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-lg"
          >
            Apply for Coaching
          </Link>
        </Card>
      </section>

      {/* Values Section */}
      <section className="bg-secondary py-8 md:py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-4 mb-12 text-center">
            <h2 className="text-4xl md:text-5xl tracking-wide text-muted-foreground text-balance">
              My Approach
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {myApproaches.map((myApproach, index) => (
              <Card key={myApproach.id} className="p-6 md:p-8 bg-card border-border">
                <h3 className="text-xl font-serif text-foreground mb-3">{myApproach.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{myApproach.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      </div>
    </>
  )
}
