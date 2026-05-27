import 'server-only';
import type {
  ContactDetails,
  PodcastDetails,
  PodcastSource,
  SiteDetails,
  SocialLink,
} from '@/types/contact-details';

export const SPOTIFY: PodcastSource = {
  id: 'spotify',
  name: 'Spotify',
  url: 'https://open.spotify.com/show/0uvoKMauD0FUN7agYgzyVf',
  icon: 'spotify',
  cta: 'Listen on Spotify',
};

export const APPLE_PODCASTS: PodcastSource = {
  id: 'apple-podcasts',
  name: 'Apple Podcasts',
  url: 'https://podcasts.apple.com/gb/podcast/a-normal-family-modern-family-life-trauma-healing/id1850937450',
  icon: 'apple-podcasts',
  cta: 'Listen on Apple Podcasts',
};

export const YOUTUBE: PodcastSource = {
  id: 'youtube',
  name: 'YouTube',
  url: 'https://youtube.com/@anormalfamilypodcast',
  icon: 'youtube',
  cta: 'Watch on YouTube',
};

export const PODCAST_ADDICT: PodcastSource = {
  id: 'podcast-addict',
  name: 'Podcast Addict',
  url: 'https://podcastaddict.com/podcast/a-normal-family-modern-family-life-trauma-amp-healing/6482702',
  icon: 'podcast-addict',
  cta: 'Listen on Podcast Addict',
};

const PODCAST_SOURCES: PodcastSource[] = [
  SPOTIFY,
  APPLE_PODCASTS,
  YOUTUBE,
  PODCAST_ADDICT,
];

const SOCIALS = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/anna-wallace-0751b76',
      icon: 'linkedin',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/a.normal.family',
      icon: 'instagram',
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@anormalfamilypodcast',
      icon: 'youtube',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/share/1H1jpducxw/',
      icon: 'facebook',
    },
];

const CONTACT_DETAILS = {
  email: 'normalfamilypodcast@gmail.com',
  socials: SOCIALS,
}

const PODCAST_DETAILS = {
  name: 'A Normal Family',
  spotifyShowId: '0uvoKMauD0FUN7agYgzyVf',
  rssUrl: 'https://anchor.fm/s/105d16338/podcast/rss',
  sources: PODCAST_SOURCES,
}

const DOMAIN = 'annawallace.org'

const SITE_DETAILS = {
  domain: DOMAIN,
  canonicalUrl: `https://${DOMAIN}`,
  logoPath: 'https://res.cloudinary.com/dhngfy4p6/image/upload/v1775587122/448CEC65-3B2B-4DF2-B294-1A45ACEA374E_1_105_c_qwppoj.jpg',
};

export async function getContactDetails(): Promise<ContactDetails> {
  return CONTACT_DETAILS;
}

export async function getSiteDetails(): Promise<SiteDetails> {
  return SITE_DETAILS;
}

export async function getPodcastDetails(): Promise<PodcastDetails> {
  return PODCAST_DETAILS;
}

export const getEmailSenderConfiguration = async () => {
  const { email } = await getContactDetails();
  const { domain, canonicalUrl } = await getSiteDetails();
  return {
    domain: canonicalUrl,
    noreply: `noreply@${domain}`,
    contact: email,
    fromName: domain,
    websiteName: `${domain} Website`,
  };
};
