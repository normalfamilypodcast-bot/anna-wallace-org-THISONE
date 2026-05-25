import { fetchShowEpisodes, type SpotifyEpisode } from './client/spotify'
import {
  getPodcastDetails,
  SPOTIFY,
} from '@/lib/contact-source';
import type { PodcastSource } from '@/types/contact-details';
import podcastSourcesData from '@/data/podcast-sources.json';

interface EpisodeSourceEntry {
  episodeId: string;
  sources: Record<string, string>[];
}

// Type the imported JSON data - handle single object or array
const episodeSources: EpisodeSourceEntry[] = Array.isArray(podcastSourcesData) 
  ? podcastSourcesData 
  : [podcastSourcesData];

export interface PodcastEpisode {
  id: string
  number: number
  title: string
  description: string
  htmlDescription: string
  duration: string
  publishedAt: string
  coverImage?: string
  audioUrls: PodcastSource[]
}

// Cache the access token to avoid repeated auth calls
let cachedToken: { token: string; expiresAt: number } | null = null

async function getSpotifyAccessToken(): Promise<string> {
  // Return cached token if still valid
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials not configured')
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
    },
    body: 'grant_type=client_credentials',
    next: { revalidate: 3600 } // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error('Failed to get Spotify access token')
  }

  const data: any = await response.json() // Assuming SpotifyTokenResponse type is already defined
  
  // Cache the token with expiry
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in * 1000) - 60000 // Expire 1 min early
  }

  return data.access_token
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000)
  return `${minutes} min`
}

function getEpisodeAudioUrls(episodeId: string, spotifyUrl: string, availableSources: PodcastSource[]): PodcastSource[] {
  // Start with Spotify as the base source
  const audioUrls: PodcastSource[] = [{
    ...SPOTIFY,
    url: spotifyUrl
  }];

  // Find additional sources from the JSON data
  const episodeEntry = episodeSources.find(entry => entry.episodeId === episodeId);
  
  if (episodeEntry) {
    for (const sourceObj of episodeEntry.sources) {
      const [sourceKey, sourceUrl] = Object.entries(sourceObj)[0];

      // Find the matching source from available sources
      const matchingSource = availableSources.find(s => s.id === sourceKey);
      
      if (matchingSource && sourceUrl) {
        audioUrls.push({
          ...matchingSource,
          url: sourceUrl
        });
      }
    }
  }

  return audioUrls;
}

function transformSpotifyEpisode(episode: SpotifyEpisode, episodeNumber: number, availableSources: PodcastSource[]): PodcastEpisode {
  return {
    id: episode.id,
    number: episodeNumber,
    title: episode.name,
    description: episode.description,
    htmlDescription: episode.html_description,
    duration: formatDuration(episode.duration_ms),
    publishedAt: episode.release_date,
    coverImage: episode.images[0]?.url,
    audioUrls: getEpisodeAudioUrls(episode.id, episode.external_urls.spotify, availableSources)
  }
}

async function fetchEpisodes(): Promise<PodcastEpisode[]> {
  try {
    const { spotifyShowId: showId, sources: availableSources } = await getPodcastDetails();

    const data = await fetchShowEpisodes(showId, 50)

    return data.items.map((episode, index) =>
      transformSpotifyEpisode(episode, data.items.length - index, availableSources)
    )
  } catch (error) {
    console.warn('Spotify fetch failed, returning empty episode list:', error)
    return []
  }
}

export async function getLatestEpisode(): Promise<PodcastEpisode | null> {
  const episodes = await fetchEpisodes()
  return episodes[0] || null
}

export async function getRecentEpisodes(limit: number = 50): Promise<PodcastEpisode[]> {
  const episodes = await fetchEpisodes()
  return episodes.slice(1, limit + 1)
}

export async function getAllEpisodes(): Promise<PodcastEpisode[]> {
  return await fetchEpisodes()
}
