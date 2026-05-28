import 'server-only';
import type { WhatIDoItem } from '@/types/what-i-do';

const WHAT_I_DO: WhatIDoItem[] = [
  {
    id: '1',
    title: 'Coaching',
    description: `One-to-one coaching for people who feel stuck at "what now?" — navigating change, wanting to move forward with more clarity, confidence and intention. This is where we start.`,
    image: {
      alt: 'Anna, coaching',
      url: 'https://res.cloudinary.com/dhngfy4p6/image/upload/v1775860767/coaching_growth-transformation-card_wfkh95.svg',
    },
    videoId: 'kRcqBOGL1HA',
    cta: {
      text: 'Enquire about coaching',
      href: '/contact',
    },
  },
  {
    id: '2',
    title: 'The Podcast',
    description: 'A Normal Family is a podcast of true family stories to help you recognise your own patterns, feel less alone, and find new ways to heal and connect.',
    image: {
      alt: 'Podcast image',
      url: 'https://res.cloudinary.com/dhngfy4p6/image/upload/v1779970291/podast_1200_x_900_px_1_odg6c9.jpg',
    },
    cta: {
      text: 'Listen now',
      href: '/podcast',
    },
  },
  {
    id: '3',
    title: 'Workshops and events',
    description: `Workshops for people who want to slow down and look at themselves honestly — their patterns, their relationships, the role they play in them. Available for businesses, community groups, and private events.`,
    image: {
      alt: 'Workshop facilitation',
      url: 'https://res.cloudinary.com/dhngfy4p6/image/upload/v1779970263/podast_1200_x_900_px_lradym.jpg',
    },
    cta: {
      text: 'Enquire about workshops',
      href: '/work-with-anna#events',
    },
  },
];

export async function getWhatIDo(): Promise<WhatIDoItem[]> {
  return WHAT_I_DO;
}
