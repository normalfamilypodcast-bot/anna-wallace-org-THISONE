import 'server-only';
import type { Testimonial } from '@/types/testimonial';

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    authorName: 'Julia Onslow-Cole, Partner, Fragomen ',
    quote:
      "Anna is an outstanding speaker, engaging and articulate. I had the privilege to share many platforms with her and could not recommend her more highly.",
    context: null,
  },
  {
    id: '2',
    authorName:
      "Maria Elena Sandali, Bloomberg LP",
    quote: 'I had the privilege of being mentored by Anna and I couldn\'t have asked for a better guide. Her unwavering dedication, invaluable counsel, and exceptional listening skills were instrumental. Working with Anna was an enriching experience that significantly contributed to my professional growth.',
    context: null,
  },
  {
    id: '3',
    authorName: 'Louise Hymers, Regional Growth Manager, PwC',
    quote:
      "I wholeheartedly recommend Anna for any speaking engagement.  She can take complex topics and present them in an accessible and relatable manner. Her ability to engage and connect with diverse audiences is truly remarkable.",
    context: null,
  },
];

const PODCAST_TESTIMONIALS: Testimonial[] = [
  {
    id: '4',
    authorName: 'Ruth Badley, Author of ‘Where are the grown ups?’',
    quote:
      "It was an absolute delight to take part in the Normal Family podcast. Anna made it such a safe and inviting place to talk openly and honestly.",
    context: null,
  },
  {
    id: '5',
    authorName: 'Listener, A Normal Family Podcast',
    quote:
      'You give me hope to find love and peace and if I look into my own family patterns, I will think of myself as ‘good enough’.',
    context: null,
  },
  {
    id: '6',
    authorName: 'Listener, A Normal Family Podcast',
    quote:
      'It has so many relatable themes and parallels for me and probably for others too.',
    context: null,
  },
];

export async function getTestimonials(): Promise<Testimonial[]> {
  return TESTIMONIALS;
}

export async function getPodcastTestimonials(): Promise<Testimonial[]> {
  return PODCAST_TESTIMONIALS;
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return TESTIMONIALS.filter((t) => t.featured);
}
