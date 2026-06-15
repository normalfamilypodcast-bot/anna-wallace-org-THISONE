import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { BookCard } from '@/components/book-card'
import { getBooks } from '@/lib/bookshop-source'

export default async function ResourcesPage() {
  const books = await getBooks()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Editorial intro */}
      <section className="container mx-auto px-4 py-12 md:py-20 max-w-5xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-6">
            Reading list
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-foreground leading-[1.1] mb-6 text-balance">
            Books that changed how I see myself
          </h1>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              These are the books I come back to — in sessions, in conversations, in my own life. They have shaped how I understand family, identity, and the stories we carry without knowing it.
            </p>
            <p>
              When you buy through this list, you support independent bookshops and help me keep creating free content.
            </p>
          </div>
        </div>
      </section>

      {/* Book List */}
      <section className="bg-secondary py-8 md:py-10">
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
