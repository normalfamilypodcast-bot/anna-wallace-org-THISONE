import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { BookCard } from '@/components/book-card'
import { getBooks } from '@/lib/bookshop-source'

export default async function ResourcesPage() {
  const books = await getBooks()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Editorial intro
          Mobile:  text first (order-1), image below (order-2)
          Desktop: image left (col 1),   text right (col 2)            */}
      <section className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-start">

          {/* TEXT — first on mobile, second column on desktop */}
          <div className="flex flex-col justify-start order-1 md:order-2">
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-6">
              Reading list
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground leading-[1.1] mb-6 text-balance">
              Books that changed how I see myself
            </h1>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed mb-8">
              <p>
                These are the books I come back to — in sessions, in conversations, in my own life. They have shaped how I understand family, identity, and the stories we carry without knowing it.
              </p>
              <p>
                When you buy through this list, you support independent bookshops and help me keep creating free content.
              </p>
            </div>
            <a href="#books" className="text-sm font-medium tracking-[0.15em] uppercase text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
              Browse the list
            </a>
          </div>

          {/* IMAGE — second on mobile, first column on desktop */}
          {/* Desktop: crop portrait to ~480px so text column isn't dwarfed */}
          <div className="w-full order-2 md:order-1 md:max-h-[480px] md:overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dhngfy4p6/image/upload/v1781544032/anna_resources_gallery_npuld5.jpg"
              alt="Anna Wallace at a gallery"
              width={900}
              height={1350}
              className="w-full h-auto"
              priority
            />
          </div>

        </div>
      </section>

      {/* Book List */}
      <section id="books" className="bg-secondary py-8 md:py-10 scroll-mt-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-8">
            This is an affiliate bookshop. A small commission from purchases helps support my work
            at no extra cost to you.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
