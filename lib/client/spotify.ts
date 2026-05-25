// Spotify Web API client for podcast data

interface SpotifyTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

interface SpotifyEpisode {
  id: string
  name: string
  description: string
  html_description: string
  duration_ms: number
  release_date: string
  images: Array<{ url: string }>
  external_urls: { spotify: string }
}

interface SpotifyShowEpisodesResponse {
  items: SpotifyEpisode[]
  total: number
}

// Cache the access token to avoid repeated auth calls
let cachedToken: { token: string; expiresAt: number } | null = null

async function getAccessToken(): Promise<string> {
  // Return cached token if still valid
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials not configured. Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET environment variables.')
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
    throw new Error(`Failed to authenticate with Spotify: ${response.status} ${response.statusText}`)
  }

  const data = await response.json() as SpotifyTokenResponse
  
  // Cache the token with expiry (expire 1 min early to be safe)
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in * 1000) - 60000
  }

  return data.access_token
}

export async function fetchShowEpisodes(showId: string, limit: number = 50): Promise<SpotifyShowEpisodesResponse> {
  const token = await getAccessToken()
  
  const response = await fetch(
    `https://api.spotify.com/v1/shows/${showId}/episodes?limit=${limit}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      next: { revalidate: 3600 } // Revalidate every hour
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch episodes from Spotify: ${response.status} ${response.statusText}`)
  }

  return await response.json() as SpotifyShowEpisodesResponse
}

export type { SpotifyEpisode, SpotifyShowEpisodesResponse }
