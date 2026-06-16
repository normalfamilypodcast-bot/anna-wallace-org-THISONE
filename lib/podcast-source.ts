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

// Fetch episode-level Apple Podcasts URLs via iTunes Search API (no auth required).
// Show ID 1850937450 is from the Apple Podcasts show URL (id1850937450).
async function fetchAppleEpisodeUrls(): Promise<Map<string, string>> {
  try {
    const res = await fetch(
      'https://itunes.apple.com/lookup?id=1850937450&media=podcast&entity=podcastEpisode&limit=200',
      { next: { revalidate: 86400 } } // cache 24h — Apple episode URLs are stable
    )
    if (!res.ok) return new Map()
    const data = await res.json()
    const map = new Map<string, string>()
    for (const item of (data.results ?? [])) {
      if (item.wrapperType === 'podcastEpisode' && item.trackName && item.trackViewUrl) {
        map.set(item.trackName.trim().toLowerCase(), item.trackViewUrl)
      }
    }
    return map
  } catch {
    return new Map()
  }
}

// A Normal Family Podcast channel ID (resolved via YouTube Data API, stable identifier).
const YOUTUBE_CHANNEL_ID = 'UCaVQO3uKDb_A2isVkPyFGAQ'

// Every channel's "uploads" playlist ID is the channel ID with the UC prefix
// swapped for UU - a long-standing, stable YouTube convention. Using the
// uploads playlist (playlistItems.list, 1 quota unit/page) instead of
// search.list (100 quota units/call, and only returns the 50 *most recent*
// videos) lets us paginate back through the channel's full upload history,
// which matters here since the channel posts shorts/clips far more often
// than full episodes - the 50 most recent videos didn't reach back to the
// show's earlier episodes.
const UPLOADS_PLAYLIST_ID = 'UU' + YOUTUBE_CHANNEL_ID.slice(2)

function normalizeForMatch(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

// Words too common to be useful as match signals (kept short on purpose — erring
// toward keeping a word is safer than dropping one that's actually distinctive).
const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'to', 'of', 'in', 'on', 'at', 'by', 'is',
  'are', 'was', 'were', 'be', 'been', 'do', 'does', 'did', 'i', 'we', 'you', 'your',
  'my', 'our', 'this', 'that', 'these', 'those', 'with', 'for', 'about', 'how',
  'why', 'what', 'who', 'when', 'it', 'its', 'can', 'will', 'into', 'them', 'me',
  'us', 'her', 'his', 'their',
])

// Splits a title into meaningful lowercase word tokens, dropping stopwords and
// very short words. Used for loose overlap matching, not exact comparison —
// podcast RSS titles and YouTube video titles for the same episode are rarely
// worded identically (typos, added hashtags, "we" vs "I", merged hashtag words).
function tokenize(s: string): string[] {
  return normalizeForMatch(s)
    .split(' ')
    .filter(w => w.length > 2 && !STOPWORDS.has(w))
}

// Scores how much of an episode's title shows up inside a candidate video title.
// Checks substring containment per-token (not exact set match) so that things like
// "inherit" matching inside "inherited", or "personal"+"growth" matching inside the
// merged hashtag "personalgrowth", still count as hits.
function titleOverlapScore(episodeTokens: string[], videoTitle: string): number {
  if (episodeTokens.length === 0) return 0
  const vtJoined = normalizeForMatch(videoTitle).replace(/ /g, '')
  let hits = 0
  for (const t of episodeTokens) {
    if (vtJoined.includes(t)) hits++
  }
  return hits / episodeTokens.length
}

interface YouTubeVideo {
  title: string
  url: string
  publishedAt: string
}

// Fetch episode-level YouTube video URLs via YouTube Data API v3.
// Requires YOUTUBE_API_KEY env var. Matches by loose title-overlap scoring (see
// titleOverlapScore) since YouTube video titles are often worded differently from
// RSS episode titles (typos, hashtags, minor rewording) even for the same episode.
async function fetchYouTubeEpisodeUrls(): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    console.warn('[youtube-sync] YOUTUBE_API_KEY is not set in this environment — skipping YouTube episode matching')
    return []
  }

  const videos: YouTubeVideo[] = []
  let pageToken: string | undefined = undefined

  try {
    do {
      const url =
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${UPLOADS_PLAYLIST_ID}&maxResults=50&key=${apiKey}` +
        (pageToken ? `&pageToken=${pageToken}` : '')

      const res = await fetch(url, { next: { revalidate: 86400 } }) // cache 24h
      if (!res.ok) {
        console.warn('[youtube-sync] playlistItems request failed:', res.status, await res.text())
        break
      }

      const data = await res.json()
      for (const item of (data.items ?? [])) {
        const videoId = item.snippet?.resourceId?.videoId
        const title = item.snippet?.title
        const publishedAt = item.snippet?.publishedAt
        if (videoId && title) {
          videos.push({
            title,
            url: `https://www.youtube.com/watch?v=${videoId}`,
            publishedAt,
          })
        }
      }

      pageToken = data.nextPageToken
    } while (pageToken && videos.length < 400) // safety cap against runaway pagination

    console.log(`[youtube-sync] fetched ${videos.length} videos from uploads playlist ${UPLOADS_PLAYLIST_ID}`)
    return videos
  } catch (err) {
    console.warn('[youtube-sync] YouTube API fetch error:', err)
    return videos
  }
}

// Minimum overlap score to accept a match at all — below this, two titles are
// treated as unrelated rather than risking a wrong link.
const MATCH_THRESHOLD = 0.5

function findYouTubeMatch(
  episodeTitle: string,
  episodePubDate: Date | null,
  videos: YouTubeVideo[]
): string | undefined {
  const episodeTokens = tokenize(episodeTitle)
  if (episodeTokens.length === 0) return undefined

  let best: { url: string; score: number; dayDiff: number } | null = null

  for (const v of videos) {
    const score = titleOverlapScore(episodeTokens, v.title)
    if (score < MATCH_THRESHOLD) continue

    const vDate = v.publishedAt ? new Date(v.publishedAt) : null
    const dayDiff =
      episodePubDate && vDate && !isNaN(vDate.getTime())
        ? Math.abs(vDate.getTime() - episodePubDate.getTime()) / 86400000
        : Number.MAX_SAFE_INTEGER

    // Prefer the highest-scoring title match; among near-equal scores, prefer
    // whichever video was published closer to the episode's release date
    // (helps when a short clip and the full episode share similar wording).
    if (!best || score > best.score || (score === best.score && dayDiff < best.dayDiff)) {
      best = { url: v.url, score, dayDiff }
    }
  }

  return best?.url
}

async function fetchEpisodesFromRss(rssUrl: string, availableSources: PodcastSource[]): Promise<PodcastEpisode[]> {
  const [res, appleEpisodeUrls, youtubeVideos] = await Promise.all([
    fetch(rssUrl, {
      next: { revalidate: 3600 },
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; annawallace.org/1.0)' },
    }),
    fetchAppleEpisodeUrls(),
    fetchYouTubeEpisodeUrls(),
  ])

  if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`)

  const xml = await res.text()
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]

  // Get show-level cover image as fallback
  const showCover = xml.match(/<itunes:image[^>]+href="([^"]+)"/)?.[1]

  console.log(`[youtube-sync] matching ${items.length} RSS episodes against ${youtubeVideos.length} YouTube videos`)
  let matchedCount = 0

  const episodes = items.map((match, i) => {
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

    const episodeLink =
      block.match(/<link>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/link>/)?.[1]?.trim() ?? ''

    const coverImage =
      block.match(/<itunes:image[^>]+href="([^"]+)"/)?.[1] ??
      showCover

    const duration = parseDuration(
      block.match(/<itunes:duration>(.*?)<\/itunes:duration>/)?.[1] ?? ''
    )

    const pubDate = block.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? ''
    const guid = block.match(/<guid[^>]*>(.*?)<\/guid>/)?.[1] ?? String(i)

    const titleKey = title.trim().toLowerCase()
    const parsedPubDate = pubDate ? new Date(pubDate) : null
    const validPubDate = parsedPubDate && !isNaN(parsedPubDate.getTime()) ? parsedPubDate : null

    const audioUrls: PodcastSource[] = []
    availableSources.forEach(s => {
      if (s.icon === 'spotify') {
        // This show has no anchor.fm handle (numeric RSS only: anchor.fm/s/113672578).
        // Episode-level Spotify URLs require the Spotify Web API (business registration
        // required — not available). Linking to the show page is the best option.
        // If the RSS ever provides open.spotify.com episode URLs, use them directly.
        const spotifyUrl = episodeLink.startsWith('https://open.spotify.com/episode/')
          ? episodeLink
          : s.url
        audioUrls.push({ ...s, url: spotifyUrl })

      } else if (s.icon === 'apple-podcasts') {
        // Use iTunes Search API result for episode-specific Apple Podcasts URL.
        // Falls back to show URL if no match found.
        const appleUrl = appleEpisodeUrls.get(titleKey)
        audioUrls.push({ ...s, url: appleUrl ?? s.url })

      } else if (s.icon === 'youtube') {
        // Match via YouTube Data API results (loose title-overlap + date-proximity).
        // Falls back to channel page if no API key or no confident match found.
        const ytUrl = findYouTubeMatch(title, validPubDate, youtubeVideos)
        if (ytUrl) matchedCount++
        else console.log(`[youtube-sync] no match for episode: "${title}"`)
        audioUrls.push({ ...s, url: ytUrl ?? s.url })

      } else {
        audioUrls.push(s)
      }
    })

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

  console.log(`[youtube-sync] matched ${matchedCount}/${items.length} episodes to a YouTube video`)
  return episodes
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
