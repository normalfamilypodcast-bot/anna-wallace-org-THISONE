import 'server-only';

import type { HeroImageConfigMap } from '@/types/hero-image';

const HERO_IMAGES: HeroImageConfigMap = {
  'tall_trees_pale_green': {
    imageId: 'tall_trees_pale_green_zquwdu',
    alt: 'A sunlit forest trail lined with tall redwood trees, shown through a pale green tint or overlay. Sunbeams filter through the canopy, casting long shadows across the path. Three people walk along the trail, two in the foreground and one farther ahead, surrounded by the towering trees.',
    devices: {
      desktop: {
        aspectRatio: '16:9',
        gravity: 'center',
      },
      tablet: {
        aspectRatio: '16:9',
        gravity: 'center',
      },
      mobile: {
        aspectRatio: '4:3',
        gravity: 'center',
      },
    },
  },
  'podcast_hero-banner': {
    imageId: 'podast_kxjeb8',
    alt: 'A Normal Family Podcast hero banner',
    devices: {
      desktop: {
        aspectRatio: '16:9',
        gravity: 'center',
      },
      tablet: {
        aspectRatio: '16:9',
        gravity: 'center',
      },
      mobile: {
        aspectRatio: '4:3',
        gravity: 'center',
      },
    },
  },

} as const; // Make it readonly for better type safety

export const getHeroImage = (imageName: keyof typeof HERO_IMAGES) => {
  return HERO_IMAGES[imageName];
};

export const getAllHeroImages = () => {
  return HERO_IMAGES;
};
