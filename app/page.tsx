import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { getBiography } from '@/lib/biography-source'
import { getTestimonials } from '@/lib/testimonial-source'
import { getWhatIDo } from '@/lib/what-i-do-source'
import { getSiteDetails, getPodcastDetails } from '@/lib/contact-source'
import { SubscribeModal } from '@/components/subscribe-modal'

export async function generateMetadata(): Promise<Metadata> {
  const [siteDetails] = await Promise.all([getSiteDetails()])
  const title = 'Anna Wallace | Speaker, Coach & Podcast Host'
  const description = 'Anna Wallace helps people understand their family patterns, their relationships, and themselves. Speaker, coach, and host of A Normal Family podcast.'
  const url = siteDetails.canonicalUrl

  return {
    title,
    description,
    keywords: [
      'Anna Wallace',
      'family coach',
      'speaker',
      'A Normal Family',
      'family patterns',
      'relationship coaching',
      'workshops',
      'podcast host',
    ],
    authors: [{ name: 'Anna Wallace' }],
    creator: 'Anna Wallace',
    openGraph: {
      title,
      description,
      url,
      siteName: 'Anna Wallace',
      type: 'profile',
      images: [
        {
          url: 'https://res.cloudinary.com/dhngfy4p6/image/upload/v1775587122/448CEC65-3B2B-4DF2-B294-1A45ACEA374E_1_105_c_qwppoj.jpg',
          width: 1200,
          height: 630,
          alt: 'Anna Wallace - Speaker, Coach & Podcast Host',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://res.cloudinary.com/dhngfy4p6/image/upload/v1775587122/448CEC65-3B2B-4DF2-B294-1A45ACEA374E_1_105_c_qwppoj.jpg'],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function Home() {
  const [biography, testimonials, whatIDoItems, siteDetails, podcastDetails] = await Promise.all([
    getBiography(),
    getTestimonials(),
    getWhatIDo(),
    getSiteDetails(),
    getPodcastDetails(),
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Anna Wallace',
    url: siteDetails.canonicalUrl,
    image: biography.image?.url,
    jobTitle: 'Speaker, Coach & Podcast Host',
    description: 'Anna Wallace helps people understand their family patterns, their relationships, and themselves.',
    sameAs: [
      'https://www.instagram.com/a.normal.family',
      'https://youtube.com/@anormalfamilypodcast',
      'https://www.linkedin.com/in/anna-wallace-0751b76',
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

        {/* ── HERO ── */}
        <section className="overflow-hidden">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 min-h-[85vh] items-stretch">

              {/* Text */}
              <div className="flex flex-col justify-center py-16 md:py-24 md:pr-16 order-2 md:order-1">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-8">
                  Speaker · Coach · Podcast Host
                </p>
                <h1 className="text-5xl md:text-6xl font-serif text-foreground leading-[1.1] mb-6 text-balance">
                  The stories you tell yourself — some of them aren't true.
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-md">
                  Hello, I'm Anna Wallace and I help people understand themselves so they can have better relationships and happier lives.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="rounded-none px-8">
                   <Link href="/work-with-anna">Work with me</Link>
                  </Button>
                  <SubscribeModal sources={podcastDetails.sources}>
                    <Button variant="outline" size="lg" className="rounded-none px-8">
                      Listen to the podcast
                    </Button>
                  </SubscribeModal>
                </div>
              </div>

              {/* Image */}
              {biography.image && (
                <div className="relative min-h-[55vw] md:min-h-full order-1 md:order-2">
                  <Image
                    src={biography.image.url}
                    alt={biography.image.alt}
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── WORK WITH ME ── */}
        <section className="bg-secondary/50 py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4 text-balance">
             Work with me
            </h2>
            <p className="text-muted-foreground text-lg mb-16 max-w-xl">
              Whether you want to go deeper on your own, explore in a group, or listen in — there are a few ways we can work together.
            </p>

            <div className="grid md:grid-cols-3 gap-10">
              {whatIDoItems.map((item) => (
                <div key={item.id} className="flex flex-col">
                  <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-muted">
                    <Image
                      src={item.image.url}
                      alt={item.image.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-serif text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-grow text-sm">
                    {item.description}
                  </p>
                  <Button variant="outline" asChild className="self-start rounded-none">
                    <Link href={item.cta.href}>{item.cta.text}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-16 text-balance">
              What people say
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="border-t-2 border-border pt-8">
                  <blockquote className="space-y-6">
                    <p className="text-foreground leading-relaxed text-lg font-serif italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <footer>
                      <cite className="not-italic text-sm font-medium text-foreground block">
                        {testimonial.authorName}
                      </cite>
                      {testimonial.context && (
                        <p className="text-sm text-muted-foreground mt-1">{testimonial.context}</p>
                      )}
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PODCAST CTA ── */}
        <section className="bg-foreground py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div>
                <p className="text-xs font-medium tracking-[0.2em] uppercase mb-8 text-background/60">
                  A Normal Family
                </p>
                <h2 className="text-4xl md:text-5xl font-serif mb-6 text-balance leading-[1.1] text-background">
                  True stories about family life
                </h2>
                <p className="text-lg leading-relaxed mb-10 text-background/75">
                  A podcast of honest conversations exploring the patterns we inherit, the secrets we carry, and how we find our way through.
                </p>
                <div className="flex flex-wrap gap-4">
                  <SubscribeModal sources={podcastDetails.sources}>
                    <Button
                      size="lg"
                      className="rounded-none px-8 bg-background text-foreground hover:bg-background/90"
                    >
                      Listen now
                    </Button>
                  </SubscribeModal>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="rounded-none px-8 text-background hover:bg-background/10 border border-background/30"
                    asChild
                  >
                    <Link href="/contact">Share your story</Link>
                  </Button>
                </div>
              </div>

              <div className="relative aspect-square max-w-xs mx-auto md:ml-auto">
                <Image
                 src="https://res.cloudinary.com/dhngfy4p6/image/upload/v1776286074/podast_kxjeb8.jpg"
                  alt="A Normal Family Podcast"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  )
}
