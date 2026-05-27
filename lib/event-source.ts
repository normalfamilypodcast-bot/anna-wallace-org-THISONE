import 'server-only';
import type {Event} from '@/types/event';

const EVENTS: Event[] = [
  {
    id: 'reframe-your-world',
    title: 'Reframe Your World',
    description: `
      <p>
        Is a relationship you care about asking for your attention? This intimate guided workshop is for anyone
        who wants to pause, reflect, and look at a relationship with fresh eyes — whether it&apos;s a partner,
        family member, friend, or colleague.
      </p>
      <br/>
      <p>
        We draw on the themes of "Wherever You Go, There You Are," ERITAGE&apos;s current exhibition on identity,
        heritage and belonging. Using journaling and reflection exercises, you&apos;ll be invited to find new
        perspectives and leave with one practical step to make things better.
      </p>
      <br/>
      <p>
        Bring a notebook if you have one. Materials, tea, and refreshments provided. You&apos;re welcome to
        arrive early and spend time in the gallery.
      </p>
    `,
    highlights: [
      'A short, art-led exercise to connect with what you feel and how you express it',
      'Three guided journaling sprints designed to give you perspective',
      'A closing reflection and sharing circle',
      'Leave with one clear action you can take',
    ],
    location: {
      type: 'in-person',
      address: 'Eritage | R. das Janelas Verdes 128, Lisbon',
    },
    pricing: {
      amount: 16,
      currency: 'EUR',
      label: 'per person',
    },
    cta: {
      type: 'book',
      label: 'Get your ticket',
      url: 'https://luma.com/60ff6vik',
    },
    image: {
      url: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/uploads/ek/7cd59f09-82f5-40c9-a159-88b30b78f94f.jpg',
      alt: 'Reframe Your World — guided journaling workshop at Eritage, Lisbon',
    },
  },
  {
    id: 'reframe-yourself',
    title: 'Reframe Yourself',
    description: `
      <p>
        Is a relationship you care about asking for your attention? It could be a partner or colleague, family or a
        friend. We&apos;ve created a space for you to step back, examine your inner world and consider how you can
        reframe your relationship.
      </p>
      <br/>
      <p>
        You are invited to an intimate evening of guided journaling surrounded by &apos;Wherever You Go, There You Are,&apos;
        ERITAGE&apos;s current exhibition on identity, heritage and belonging. You&apos;ll use selected prompts such as
        &apos;what feels impossible to say?&apos; to step back, see the relationship in full, and leave with a clear action
        to make it better.
      </p>
    `,
    highlights: [],
    location: {
      type: 'in-person',
      address: 'Eritage Art Gallery, R. das Janelas Verdes 128, 1200-692, Lisbon',
    },
    schedule: {
      date: 'Wednesday, June 3, 2026',
      time: '19:00 – 20:30',
    },
    pricing: {
      amount: 16,
      currency: 'EUR',
      label: 'per person, numbers limited',
    },
    cta: {
      type: 'contact',
      label: 'Enquire about booking',
    },
  },
];

export async function getEvents(): Promise<Event[]> {
  return EVENTS;
}

export async function getEventById(id: string): Promise<Event | undefined> {
  return EVENTS.find(event => event.id === id);
}
