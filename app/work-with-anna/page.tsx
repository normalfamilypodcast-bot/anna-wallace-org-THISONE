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
    title, description,
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

      <section className="overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 items-stretch">
            <div className="flex flex-col justify-center py-16 md:py-24 md:pr-16 order-2 md:order-1">
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-8">Coaching · Workshops · Events</p>
              <h1 className="text-4xl md:text-5xl font-serif text-foreground leading-[1.1] mb-6 text-balance">Work with me</h1>
              <div className="space-y-5 text-muted-foreground leading-relaxed mb-10">
                <p>For twenty years I worked in politics and corporate affairs, helping organisations tell their story. Then a personal experience forced me to redefine mine.</p>
                <p>Now, through my podcast and coaching I help people understand and rewrite their own personal story.</p>
                <p>What connects my work is a mission to help people understand themselves and others with compassion, so that they can have better relationships and happier lives.</p>
                <p>There are a few ways we can work together: one-to-one, in a group, or in your organisation. Find out more below or get in touch.</p>
              </div>
              <Button asChild size="lg" className="rounded-none px-8"><Link href="/contact">Get in touch</Link></Button>
            </div>
            <div className="relative min-h-[50vw] md:min-h-full order-1 md:order-2">
              <Image src="https://res.cloudinary.com/dhngfy4p6/image/upload/v1781213946/anna_hero_work_bjh3n1.jpg" alt="Anna Wallace" fill className="object-cover object-[50%_35%]" priority />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Coaching</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">I work with women who have done the work and are ready to step into the next chapter of their lives. I work one-to-one in virtual or in-person using positive psychology and somatic (body) approaches.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <hr className="border-t border-foreground/40 mb-8" />
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>My coaching is grounded, practical and reflective. I believe in your power to change, not through quick fixes, but through self-awareness, openness and consistent action.</p>
                <p>I work with people who feel stuck at "what now?", often navigating change, whether chosen or unexpected, and wanting to move forward with more clarity, confidence and intention.</p>
                <p>My role is to help you build a life that feels aligned, meaningful and truly yours.</p>
                <p>I follow the <a href="https://coachingfederation.org/credentialing/coaching-ethics/icf-code-of-ethics/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">ICF Code of Ethics</a> and my work is guided by a simple mission: to help people build better relationships and happier lives.</p>
              </div>
              <div className="mt-10">
                <Button asChild size="lg" className="rounded-none px-8"><Link href="/contact">Enquire about coaching</Link></Button>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="w-full max-w-[280px]">
                <div className="relative w-full" style={{ paddingTop: '177.78%' }}>
                  <iframe className="absolute inset-0 w-full h-full rounded-sm" src="https://www.youtube.com/embed/kRcqBOGL1HA" title="Anna Wallace, coaching" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="py-20 md:py-28 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] bg-muted overflow-hidden">
              <Image src="https://res.cloudinary.com/dhngfy4p6/image/upload/v1779970263/podast_1200_x_900_px_lradym.jpg" alt="Workshop facilitation" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">Workshops and events</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>My workshops give people room to slow down and look at themselves honestly. Their patterns. Their relationships. The role they play in them, for better and for worse.</p>
                <p>People leave feeling warmer. More patient with themselves. More curious about the people they love.</p>
                <p>Available for businesses, community groups, and private events. If you're thinking about something for your team or organisation, I'd love to hear about it.</p>
              </div>
              <div className="mt-10">
                <Button asChild size="lg" className="rounded-none px-8"><Link href="/contact">Enquire about workshops</Link></Button>
              </div>
            </div>
          </div>

          {/* Upcoming event card */}
          <div className="mt-16 border-t border-border pt-12">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">Upcoming event</p>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/uploads/ek/7cd59f09-82f5-40c9-a159-88b30b78f94f.jpg"
                  alt="Reframe Your World, guided journaling workshop at Eritage, Lisbon"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-2">Reframe Your World</h3>
                <p className="text-sm text-muted-foreground mb-6">Wednesday 3 June 2026 · 19:00–20:30 · Eritage Gallery, Lisbon · €16</p>
                <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                  <p>Is a relationship you care about asking for your attention? This intimate guided workshop gives you space to pause, reflect, and look at it with fresh eyes.</p>
                  <p>We draw on the themes of ERITAGE's current exhibition on identity, heritage and belonging. You'll leave with one practical step to make things better.</p>
                </div>
                <Button asChild size="lg" className="rounded-none px-8">
                  <a href="https://luma.com/60ff6vik" target="_blank" rel="noopener noreferrer">Get your ticket: €16</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>


      <SiteFooter />
    </div>
  )
}
