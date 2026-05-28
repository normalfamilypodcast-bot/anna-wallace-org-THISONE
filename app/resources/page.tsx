import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { BookCard } from '@/components/book-card'
import { getBooks } from '@/lib/bookshop-source'

export default async function ResourcesPage() {
  const books = await getBooks()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      {/* Page Header */}
      <section className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl tracking-wide text-muted-foreground text-balance">
            Reading list
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            A curated collection of books that have shaped my thinking on family, storytelling, 
            and what it means to belong. When you purchase through this list, you support 
            independent bookshops.
          </p>
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
          
          {/* Affiliate Note */}
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
