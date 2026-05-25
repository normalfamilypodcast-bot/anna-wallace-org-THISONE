import 'server-only';
import type { WhatIDoItem } from '@/types/what-i-do';

const WHAT_I_DO: WhatIDoItem[] = [
  {
    id: '1',
    title: 'Coaching',
    description: `Coaching is for people who've already done some of the work — maybe therapy, maybe a lot of reflection — but still feel stuck. Often something has shifted: a loss, a divorce, a redundancy, a moment that made them stop and ask what they actually want. They know something needs to change. They just don't know how to trust themselves enough to do it.\n\nIf you've spent years doing what others expected — and lost touch with what actually brings you joy — this is where we start.`,
    image: {
      alt: 'Anna, coaching',
      url: 'https://res.cloudinary.com/dhngfy4p6/image/upload/v1775860767/coaching_growth-transformation-card_wfkh95.svg',
    },
    cta: {
      text: 'Enquire about coaching',
      href: '/contact',
    },
  },
  {
    id: '2',
    title: 'The Podcast',
    description: 'I host A Normal Family, a podcast of true family stories and reflections to help you recognise your own patterns, feel less alone and find new ways to heal and connect.',
    image: {
      alt: 'Podcast image',
      url: 'https://res.cloudinary.com/dhngfy4p6/image/upload/v1776286074/podast_kxjeb8.jpg',
    },
    cta: {
      text: 'Listen now',
      href: '/podcast',
    },
  },
  {
    id: '3',
    title: 'Workshops and events',
    description: `My workshops give people room to slow down and look at themselves honestly. Their patterns. Their relationships. The role they play in them — for better and for worse.\n\nPeople leave feeling warmer. More patient with themselves. More curious about the people they love.\n\nAvailable for businesses, community groups and private events.`,
    image: {
      alt: 'Workshop facilitation',
      url: 'https://res.cloudinary.com/dhngfy4p6/image/upload/v1775860766/workshops-and-dinners_event-card_xxrcyd.svg',
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
