import { getRecentEpisodes } from '@/lib/podcast-source'
import { getSiteDetails, getPodcastDetails } from '@/lib/contact-source'

export const dynamic = 'force-dynamic'

export async function GET() {
  const [episodes, siteDetails, podcastDetails] = await Promise.all([
    getRecentEpisodes(50),
    getSiteDetails(),
    getPodcastDetails(),
  ])

  const siteUrl = siteDetails.canonicalUrl || 'https://annawallace.org'
  const podcastName = podcastDetails.name || 'A Normal Family'
  const podcastImage = 'https://res.cloudinary.com/dhngfy4p6/image/upload/v1776862078/A_Normal_Family_a4esw0.png'

  const items = episodes.map((ep) => {
    const audioUrl = ep.audioUrls?.[0]?.url || ''
    const pubDate = ep.publishedAt
      ? new Date(ep.publishedAt).toUTCString()
      : new Date().toUTCString()

    return `
    <item>
      <title><![CDATA[${ep.title}]]></title>
      <description><![CDATA[${ep.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="false">${ep.id}</guid>
      <itunes:episode>${ep.number}</itunes:episode>
      <itunes:duration>${ep.duration}</itunes:duration>
      ${ep.coverImage ? `<itunes:image href="${ep.coverImage}" />` : ''}
      ${audioUrl ? `<enclosure url="${audioUrl}" type="audio/mpeg" length="0" />` : ''}
    </item>`
  }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${podcastName}</title>
    <link>${siteUrl}/podcast</link>
    <description>True stories about family life. Hosted by Anna Wallace.</description>
    <language>en</language>
    <itunes:author>Anna Wallace</itunes:author>
    <itunes:category text="Society &amp; Culture">
      <itunes:category text="Personal Journals" />
    </itunes:category>
    <itunes:explicit>false</itunes:explicit>
    <itunes:image href="${podcastImage}" />
    <image>
      <url>${podcastImage}</url>
      <title>${podcastName}</title>
      <link>${siteUrl}/podcast</link>
    </image>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
