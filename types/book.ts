export interface BookPricing {
  originalPrice?: number;
  currentPrice: number;
  currency: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  format: 'Paperback' | 'Hardcover' | 'eBook' | 'Audiobook';
  coverImage: string;
  pricing: BookPricing;
  purchaseUrl: string;
}
