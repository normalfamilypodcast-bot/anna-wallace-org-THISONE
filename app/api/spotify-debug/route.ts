export const dynamic = 'force-dynamic'

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const showId = '0uvoKMauD0FUN7agYgzyVf'

  if (!clientId || !clientSecret) {
    return Response.json({
      error: 'Missing env vars',
      hasClientId: !!clientId,
      hasClientSecret: !!clientSecret,
    })
  }

  try {
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
      },
      body: 'grant_type=client_credentials',
      cache: 'no-store',
    })

    // Read raw text first so we can see exactly what Spotify returned
    const rawToken = await tokenRes.text()

    if (!tokenRes.ok) {
      return Response.json({
        step: 'token_failed',
        status: tokenRes.status,
        rawResponse: rawToken,
        clientIdPrefix: clientId.slice(0, 6),
        clientSecretPrefix: clientSecret.slice(0, 6),
      })
    }

    let tokenData: { access_token: string }
    try {
      tokenData = JSON.parse(rawToken)
    } catch {
      return Response.json({
        step: 'token_parse_failed',
        status: tokenRes.status,
        rawResponse: rawToken,
      })
    }

    // Fetch episodes
    const epRes = await fetch(
      `https://api.spotify.com/v1/shows/${showId}/episodes?limit=3&market=GB`,
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
        cache: 'no-store',
      }
    )
    const rawEp = await epRes.text()

    if (!epRes.ok) {
      return Response.json({ step: 'episodes_failed', status: epRes.status, rawResponse: rawEp })
    }

    const epData = JSON.parse(rawEp)
    return Response.json({
      step: 'ok',
      total: epData.total,
      count: epData.items?.length,
      first: epData.items?.[0]?.name,
    })
  } catch (e: unknown) {
    return Response.json({ step: 'exception', error: String(e) })
  }
}
