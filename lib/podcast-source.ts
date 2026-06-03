import 'server-only'
import { getPodcastDetails } from '@/lib/contact-source'
import type { PodcastSource } from '@/types/contact-details'

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

function parseDuration(raw: string): string {
  if (!raw) return ''
  if (raw.includes(':')) return raw
  const secs = parseInt(raw, 10)
  if (isNaN(secs)) return raw
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = secs % 60
  return h > 0
    ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    : `${m}:${String(s).padStart(2, '0')}`
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim()
}

async function fetchEpisodesFromRss(rssUrl: string, availableSources: PodcastSource[]): Promise<PodcastEpisode[]> {
  const res = await fetch(rssUrl, {
    next: { revalidate: 3600 },
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; annawallace.org/1.0)' },
  })
  if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`)

  const xml = await res.text()
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]

  // Get show-level cover image as fallback
  const showCover = xml.match(/<itunes:image[^>]+href="([^"]+)"/)?.[1]

  return items.map((match, i) => {
    const block = match[1]

    const title =
      block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ??
      block.match(/<title>(.*?)<\/title>/)?.[1] ??
      `Episode ${items.length - i}`

    const desc =
      block.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] ??
      block.match(/<description>([\s\S]*?)<\/description>/)?.[1] ??
      ''

    const audioUrl = block.match(/<enclosure[^>]+url="([^"]+)"/)?.[1] ?? ''

    const coverImage =
      block.match(/<itunes:image[^>]+href="([^"]+)"/)?.[1] ??
      showCover

    const duration = parseDuration(
      block.match(/<itunes:duration>(.*?)<\/itunes:duration>/)?.[1] ?? ''
    )

    const pubDate = block.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? ''
    const guid = block.match(/<guid[^>]*>(.*?)<\/guid>/)?.[1] ?? String(i)

    const audioUrls: PodcastSource[] = []
    if (audioUrl) {
      audioUrls.push({ id: 'direct', name: 'Listen', url: audioUrl, icon: 'rss', cta: 'Listen now' })
    }
    availableSources.forEach(s => audioUrls.push(s))

    return {
      id: guid,
      number: items.length - i,
      title,
      description: stripHtml(desc),
      htmlDescription: desc,
      duration,
      publishedAt: pubDate,
      coverImage,
      audioUrls,
    }
  })
}

async function fetchEpisodes(): Promise<PodcastEpisode[]> {
  try {
    const details = await getPodcastDetails() as { rssUrl?: string; sources: PodcastSource[]; name: string; spotifyShowId: string }
    if (!details.rssUrl) throw new Error('No rssUrl in podcast details')
    return await fetchEpisodesFromRss(details.rssUrl, details.sources)
  } catch (err) {
    console.warn('Podcast RSS fetch failed:', err)
    return []
  }
}

export async function getLatestEpisode(): Promise<PodcastEpisode | null> {
  const eps = await fetchEpisodes()
  return eps[0] ?? null
}

export async function getRecentEpisodes(limit = 4): Promise<PodcastEpisode[]> {
  const eps = await fetchEpisodes()
  return eps.slice(1, limit + 1)
}

export async function getAllEpisodes(): Promise<PodcastEpisode[]> {
  return fetchEpisodes()
}
