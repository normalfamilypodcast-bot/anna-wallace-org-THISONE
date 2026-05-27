// Temporary debug endpoint — remove after Spotify is confirmed working
export const dynamic = 'force-dynamic'

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const showId = '0uvoKMauD0FUN7agYgzyVf'

  if (!clientId || !clientSecret) {
    return Response.json({ error: 'Missing env vars', clientId: !!clientId, clientSecret: !!clientSecret })
  }

  try {
    // Step 1: get token
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
      },
      body: 'grant_type=client_credentials',
      cache: 'no-store',
    })
    const tokenBody = await tokenRes.json()
    if (!tokenRes.ok) {
      return Response.json({ step: 'token', status: tokenRes.status, body: tokenBody })
    }

    // Step 2: fetch episodes
    const episodesRes = await fetch(
      `https://api.spotify.com/v1/shows/${showId}/episodes?limit=5&market=GB`,
      {
        headers: { Authorization: `Bearer ${tokenBody.access_token}` },
        cache: 'no-store',
      }
    )
    const episodesBody = await episodesRes.json()
    return Response.json({
      step: 'episodes',
      status: episodesRes.status,
      total: episodesBody.total,
      count: episodesBody.items?.length,
      first: episodesBody.items?.[0]?.name,
      error: episodesBody.error,
    })
  } catch (e: unknown) {
    return Response.json({ error: String(e) })
  }
}
