import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 1   },
    { url: `${SITE_URL}/#blog`,   lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_URL}/#podcast`,lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE_URL}/#footprints`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/#flash`,  lastModified: new Date(), changeFrequency: 'daily',   priority: 0.7 },
  ]
}
