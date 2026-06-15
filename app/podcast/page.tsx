import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getLatestEpisode, getRecentEpisodes } from '@/lib/podcast-source'
import { ListenButton } from '@/components/listen-button'
import { getPodcastDetails, getSiteDetails } from '@/lib/contact-source'
import Image from 'next/image'
import { ApplePodcastIcon } from '@/components/icons/apple-podcast-icon'
import { RssIcon } from '@/components/icons/rss-icon'
import { SpotifyIcon } from '@/components/icons/spotify-icon'
import { YouTubeIcon } from '@/components/icons/youtube-icon'
import { SubscribeModal } from '@/components/subscribe-modal'
import { getPodcastTestimonials } from '@/lib/testimonial-source'

export async function generateMetadata(): Promise<Metadata> {
  const [podcastDetails, siteDetails, latestEpisode] = await Promise.all([
    getPodcastDetails(),
    getSiteDetails(),
    getLatestEpisode(),
  ])

  const title = `${podcastDetails.name} Podcast | Anna Wallace`
  const description = `${podcastDetails.name} is a project collecting and retelling true family stories to address the gap between what we think of as normal and what is actually normal.`
  const url = `${siteDetails.canonicalUrl}/podcast`
  
  // Use latest episode cover image or fallback to site logo
  const ogImage = latestEpisode?.coverImage || siteDetails.logoPath

  return {
    title,
    description,
    keywords: [
      'family podcast',
      'storytelling',
      'family stories',
      'healing',
      'modern family',
      'trauma recovery',
      'personal growth',
      'Anna Wallace',
      podcastDetails.name,
    ],
    authors: [{ name: 'Anna Wallace' }],
    creator: 'Anna Wallace',
    openGraph: {
      title,
      description,
      url,
      siteName: podcastDetails.name,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${podcastDetails.name} Podcast`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function PodcastPage() {
  const [podcastDetails, siteDetails, testimonials, latestEpisode, recentEpisodes] = await Promise.all([
    getPodcastDetails(),
    getSiteDetails(),
    getPodcastTestimonials(),
    getLatestEpisode(),
    getRecentEpisodes(4),
  ])

  const { sources } = podcastDetails

  // JSON-LD structured data for PodcastSeries
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    name: podcastDetails.name,
    description: `${podcastDetails.name} is a project collecting and retelling true family stories to address the gap between what we think of as normal and what is actually normal.`,
    url: `${siteDetails.canonicalUrl}/podcast`,
    author: {
      '@type': 'Person',
      name: 'Anna Wallace',
      url: siteDetails.canonicalUrl,
    },
    image: latestEpisode?.coverImage || siteDetails.logoPath,
    episodes: recentEpisodes.map(episode => ({
      '@type': 'PodcastEpisode',
      name: episode.title,
      episodeNumber: episode.number,
      duration: episode.duration,
      datePublished: episode.publishedAt,
      image: episode.coverImage,
    })),
  }

  // Helper to get the correct icon component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'apple-podcasts':
        return <ApplePodcastIcon />
      case 'spotify':
        return <SpotifyIcon />
      case 'youtube':
        return <YouTubeIcon />
      case 'rss':
        return <RssIcon />
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background">
        <SiteHeader />

      {/* Hero */}
      <section className="overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 items-stretch">
            <div className="flex flex-col justify-center py-16 md:py-24 md:pr-16 order-2 md:order-1">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
                A Normal Family
              </p>
              <h1 className="text-4xl md:text-5xl font-serif text-foreground leading-[1.1] mb-6 text-balance">
                True stories about family life
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                I started A Normal Family because I wanted to tell the stories we usually keep to ourselves.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                Each episode is a real conversation about the patterns we inherit, the secrets we carry, and how we find our way through.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-none px-8">
                  <a href="#platforms">Listen now</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-none px-8">
                  <a href="/contact">Share your story</a>
                </Button>
              </div>
            </div>
            <div className="relative min-h-[55vw] md:min-h-full order-1 md:order-2">
              <Image
                src="https://res.cloudinary.com/dhngfy4p6/image/upload/v1781213946/anna_hero_podcast_rqiem3.jpg"
                alt="A Normal Family Podcast hero"
                fill
                className="object-cover object-[50%_20%]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Episode */}
      <section className="bg-secondary py-8 md:py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-8">Latest episode</h2>
          {latestEpisode && (
            <Card className="p-6 md:p-8 bg-card border-border">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <div className="relative w-full aspect-square md:w-48 md:aspect-auto md:h-48 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                  {latestEpisode.coverImage && (
                    <Image
                      src={latestEpisode.coverImage}
                      alt={latestEpisode.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Episode {latestEpisode.number} • {latestEpisode.duration}
                    </p>
                    <h3 className="text-xl md:text-2xl font-serif text-foreground">
                      {latestEpisode.title}
                    </h3>
                    <div
                      className="text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: latestEpisode.htmlDescription }}
                    />
                  </div>
                  <ListenButton
                    audioUrls={latestEpisode.audioUrls}
                    episodeTitle={latestEpisode.title}
                  />
                </div>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Recent Episodes */}
      <section className="container mx-auto px-4 py-8 md:py-10 max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-8">Recent episodes</h2>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {recentEpisodes.map((episode) => (
            <Card key={episode.id} className="p-4 md:p-6 bg-card border-border hover:shadow-lg transition-shadow overflow-hidden">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full aspect-square sm:w-24 sm:aspect-auto sm:h-24 bg-muted rounded flex-shrink-0 overflow-hidden">
                  {episode.coverImage && (
                    <Image
                      src={episode.coverImage}
                      alt={episode.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Episode {episode.number} • {episode.duration}
                  </p>
                  <h3 className="text-lg font-serif text-foreground line-clamp-2">{episode.title}</h3>
                  <div
                    className="text-sm text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-4 break-words prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: episode.htmlDescription }}
                  />
                  <ListenButton
                    audioUrls={episode.audioUrls}
                    episodeTitle={episode.title}
                    variant="ghost"
                    size="sm"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-secondary py-8 md:py-10">
        <div className="container mx-auto px-4 max-w-5xl">
        <div className="space-y-4 mb-12 text-center">
          <h2 className="text-4xl md:text-5xl tracking-wide text-muted-foreground text-balance">
            Praise for the podcast
          </h2>
        </div>

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

      {/* Subscribe CTA */}
      <section id="platforms" className="bg-primary text-primary-foreground py-8 md:py-10">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-serif mb-4 md:mb-6 text-balance">
            Never miss an episode
          </h2>
          <p className="text-base md:text-lg mb-6 md:mb-8 leading-relaxed opacity-90">
            Subscribe on your favourite podcast platform and join the conversation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {sources.map((source) => (
              <Button 
                key={source.id}
                asChild 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {getIcon(source.icon)}
                  {source.cta}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      </div>
    </>
  )
}
