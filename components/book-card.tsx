import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Book } from '@/types/book';

interface BookCardProps {
  book: Book;
}

function formatCurrency(amount: number, currency: string): string {
  const symbols: Record<string, string> = {
    GBP: '£',
    USD: '$',
    EUR: '€',
  };
  return `${symbols[currency] || currency}${amount.toFixed(2)}`;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="p-6 md:p-8 bg-card border-border">
      <div className="grid gap-6 items-start md:grid-cols-[140px_1fr]">
        {/* Book Cover */}
        <div className="relative w-[140px] h-[200px] mx-auto md:mx-0 shadow-md rounded-sm overflow-hidden bg-muted">
          <Image
            src={book.coverImage}
            alt={`Cover of ${book.title} by ${book.author}`}
            fill
            className="object-cover"
            sizes="140px"
          />
        </div>

        {/* Book Details */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-serif text-foreground mb-2">
            {book.title}
          </h3>
          
          <p className="text-muted-foreground mb-2">
            {book.author}
          </p>

          {book.description && (
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {book.description}
            </p>
          )}

          <p className="text-sm text-muted-foreground/70 mb-4">
            {book.format}
          </p>

          {/* Pricing */}
          <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
            {book.pricing.originalPrice && book.pricing.originalPrice > book.pricing.currentPrice && (
              <span className="text-muted-foreground line-through text-sm">
                {formatCurrency(book.pricing.originalPrice, book.pricing.currency)}
              </span>
            )}
            <span className="text-foreground">
              {formatCurrency(book.pricing.currentPrice, book.pricing.currency)}
            </span>
          </div>

          {/* CTA Button */}
          <Button variant="outline" className="border-border text-foreground" asChild>
            <a
              href={book.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy Now
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
