import type { Image } from './image'

export type EventLocationType = 'virtual' | 'in-person' | 'both';

export type EventCtaType = 'book' | 'contact';

export interface EventCta {
  type: EventCtaType;
  label: string;
  url?: string; // External booking URL for 'book' type, not needed for 'contact'
}

export interface EventSchedule {
  date: string;       // e.g., "Saturday, May 10, 2026"
  time: string;       // e.g., "10:00 AM - 12:30 PM GMT"
}

export interface EventLocation {
  type: EventLocationType;
  address?: string;   // Optional - in-person events may not have address yet
}

export interface EventPricing {
  amount: number;
  currency: string;               // e.g., "EUR", "USD", "GBP"
  label?: string;                 // Optional custom label, e.g., "Early Bird", "Per Person"
}

export interface Event {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  location: EventLocation;
  schedule?: EventSchedule;       // Optional - some events are "contact for dates"
  pricing?: EventPricing;         // Optional - some events may not have pricing yet
  additionalInfo?: string;        // e.g., "Available for booking worldwide..."
  cta: EventCta;
  image?: Image;
}
