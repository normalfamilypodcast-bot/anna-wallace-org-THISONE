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
    keywords: [
      'Anna Wallace',
      'coaching',
      'workshops',
      'personal development',
      'women in transition',
      'purpose',
      'self-understanding',
    ],
    authors: [{ name: 'Anna Wallace' }],
    creator: 'Anna Wallace',
    openGraph: {
      title,
      description,
      url,
      siteName: 'Anna Wallace',
      type: 'website',
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function WorkWithAnnaPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-8">
            Coaching · Workshops · Events
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-foreground leading-[1.1] mb-6 text-balance">
            Work with me
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            There are a few ways we can work together — one-to-one, in a group, or in your organisation. All of them start from the same place: helping you understand yourself better so you can have better relationships and a happier life.
          </p>
        </div>
      </section>

      {/* Coaching */}
      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Coaching
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A grounded space for women who've done the work and are ready to step into the next chapter of their lives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h3 className="font-serif text-xl text-foreground mb-6">My Approach</h3>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  My coaching is grounded, practical and reflective. I believe in your power to change — not through quick fixes, but through self-awareness, openness and consistent action.
                </p>
                <p>
                  I work with people who feel stuck at "what now?" — often navigating change, whether chosen or unexpected, and wanting to move forward with more clarity, confidence and intention.
                </p>
                <p>
                  My role is to help you build a life that feels aligned, meaningful and truly yours.
                </p>
                <p>
                  I follow the{' '}
                  
                    href="https://coachingfederation.org/credentialing/coaching-ethics/icf-code-of-ethics/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-foreground transition-colors"
                  >
                    ICF Code of Ethics
                  </a>{' '}
                  and my work is guided by a simple mission: to help people build better relationships and happier lives.
                </p>
              </div>
              <div className="mt-10">
                <Button asChild size="lg" className="rounded-none px-8">
                  <Link href="/contact">Enquire about coaching</Link>
                </Button>
              </div>
            </div>

            {/* Coaching video */}
            <div className="flex justify-center md:justify-end">
              <div className="w-full max-w-[280px]">
                <div className="relative w-full" style={{ paddingTop: '177.78%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full rounded-sm"
                    src="https://www.youtube.com/embed/kRcqBOGL1HA"
                    title="Anna Wallace — coaching"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshops */}
      <section id="events" className="py-20 md:py-28 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="relative aspect-[4/3] bg-muted overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dhngfy4p6/image/upload/v1775860766/workshops-and-dinners_event-card_xxrcyd.svg"
                alt="Workshop facilitation"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
                Workshops and events
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  My workshops give people room to slow down and look at themselves honestly. Their patterns. Their relationships. The role they play in them — for better and for worse.
                </p>
                <p>
                  People leave feeling warmer. More patient with themselves. More curious about the people they love.
                </p>
                <p>
                  Available for businesses, community groups, and private events. If you're thinking about something for your team or organisation, I'd love to hear about it.
                </p>
              </div>
              <div className="mt-10">
                <Button asChild size="lg" className="rounded-none px-8">
                  <Link href="/contact">Enquire about workshops</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speaking */}
      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              Speaking
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                I speak on the themes I explore in my podcast and coaching work: family patterns, self-understanding, relationships, and what it means to choose a different path.
              </p>
              <p>
                If you're looking for a speaker for a conference, corporate event, or panel, get in touch.
              </p>
            </div>
            <div className="mt-10">
              <Button asChild variant="outline" size="lg" className="rounded-none px-8">
                <Link href="/contact">Get in touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
