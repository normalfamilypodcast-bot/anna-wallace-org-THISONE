export interface SocialLink {
  name: string
  url: string
  icon: 'linkedin' | 'instagram' | 'youtube' | 'facebook'
}

export type ContactDetails = {
  email: string;
  socials: SocialLink[];
};

export type SiteDetails = {
  canonicalUrl: string;
  logoPath: string;
};

export type PodcastSource = {
  id: string;
  name: string;
  url: string;
  icon: string;
  cta: string;
};

export type PodcastDetails = {
  name: string;
  spotifyShowId: string;
  sources: PodcastSource[];
};
