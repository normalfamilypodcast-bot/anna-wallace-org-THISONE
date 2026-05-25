import type { MetadataRoute } from 'next'
import { getSiteDetails } from '@/lib/contact-source'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { canonicalUrl } = await getSiteDetails()

  // Define all static routes with their priorities and change frequencies
  const routes = [
    {
      path: '',
      priority: 1.0,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/work-with-anna',
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/podcast',
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/resources',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/contact',
      priority: 0.6,
      changeFrequency: 'yearly' as const,
    },
    {
      path: '/cookies',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
    {
      path: '/privacy',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
  ]

  return routes.map((route) => ({
    url: `${canonicalUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
