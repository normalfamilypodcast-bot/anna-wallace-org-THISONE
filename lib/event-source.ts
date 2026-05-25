import 'server-only';
import type {Event} from '@/types/event';

const EVENTS: Event[] = [
  // {
  //   id: 'guided-journaling',
  //   title: 'Guided Journaling',
  //   description: `A reflective workshop experience where participants explore their family stories through structured journaling exercises. Using carefully crafted prompts and guided meditation, you'll uncover memories, patterns, and insights that have shaped who you are today.`,
  //   highlights: [
  //     'Small group settings for intimate connection',
  //     'Take-home journaling framework',
  //     'Optional sharing circles',
  //   ],
  //   location: {
  //     type: 'virtual',
  //   },
  //   schedule: {
  //     date: 'Saturday, May 10, 2026',
  //     time: '10:00 AM - 12:30 PM GMT',
  //   },
  //   cta: {
  //     type: 'book',
  //     label: 'Book Your Spot',
  //     url: 'https://example.com/book/guided-journaling',
  //   },
  //   image: {
  //     url: '/images/guided-journaling.jpg',
  //     alt: 'Guided journaling workshop',
  //   },
  // },
  {
    id: 'reframe-yourself-',
    title: 'Reframe Yourself',
    description: `
      <p>
        Is a relationship you care about asking for your attention? It could be a partner or colleague, family or a 
        friend. We’ve created a space for you to step back, examine your inner world and consider how you can Reframe 
        Your Relationship.
      </p>
      <br/>
      <p>
        You are invited to an intimate evening of guided journaling surrounded by ‘Wherever You Go, There You Are,’ 
        ERITAGE’s current exhibition on identity, heritage and belonging. You’ll use selected prompts such as ‘what 
        feels impossible to say?’ to step back, see the relationship in full, and leave with a clear action to make it 
        better.
      </p>
    `,
    highlights: [],
    location: {
      type: 'in-person',
      address: 'Eritage Art Gallery, R. das Janelas Verdes 128, 1200-692, Lisbon',
    },
    schedule: {
      date: 'Wednesday, June 3, 2026',
      time: '19:00 PM – 20:30 PM',
    },
    pricing: {
      amount: 16,
      currency: 'EUR',
      label: 'per person, numbers limited',
    },
    cta: {
      type: 'contact',
      label: 'Enquire About Booking',
    },
    // },
    // image: {
    //   url: '/images/family-dinners.jpg',
    //   alt: 'Family dinner gathering',
    // },
  },
  // {
  //   id: 'speaking-corporate',
  //   title: 'Speaking & Corporate Workshops',
  //   description: `Tailored presentations and workshops for organisations, conferences, and community groups. Topics include family storytelling in the workplace, building psychologically safe teams, and the power of vulnerability in leadership.`,
  //   highlights: [
  //     'Keynote speeches and panel participation',
  //     'Half-day and full-day workshops',
  //     'Team retreats and offsites',
  //   ],
  //   location: {
  //     type: 'both',
  //   },
  //   additionalInfo: 'Available for booking worldwide. Contact for dates and availability.',
  //   cta: {
  //     type: 'contact',
  //     label: 'Enquire About Booking',
  //   },
  //   image: {
  //     url: '/images/speaking.jpg',
  //     alt: 'Speaking engagement',
  //   },
  // },
];

export async function getEvents(): Promise<Event[]> {
  return EVENTS;
}

export async function getEventById(id: string): Promise<Event | undefined> {
  return EVENTS.find(event => event.id === id);
}
