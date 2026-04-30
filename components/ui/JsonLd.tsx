/**
 * JSON-LD Structured Data
 * GEO（生成式引擎优化）核心：让 AI 搜索引擎（Perplexity、ChatGPT、Gemini）
 * 精确理解网站主体身份、内容类型和语义关系。
 */

import { SITE_URL } from '@/lib/constants'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: '太阳在世界游荡',
  alternateName: ['WANDERING SUN', 'Wandering Sun', '太阳'],
  url: SITE_URL,
  image: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/uploads/avatar.png`,
    width: 280,
    height: 280,
  },
  description:
    'Web3 营销人、数字游民、AI 探索者。走过 6 个国家超过 2857 天游牧生活，在清迈、东京、新加坡、吉隆坡、加德满都等地远程工作。',
  jobTitle: ['Web3 Marketing', 'Digital Nomad', 'AI Explorer'],
  knowsAbout: [
    'Web3', 'Blockchain', 'AI', 'Digital Nomad Life', 'Remote Work',
    'Content Creation', 'Podcast', 'Southeast Asia Travel',
    '数字游民', '远程工作', '区块链营销', '人工智能',
  ],
  sameAs: [
    'https://t.me/Wandering_sun',
  ],
  homeLocation: {
    '@type': 'Place',
    name: '游牧中 · In Transit',
  },
  nationality: {
    '@type': 'Country',
    name: 'China',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: '太阳在世界游荡 · WANDERING SUN',
  description:
    '数字游民个人网站。记录 Web3、AI、旅居生活的创作与思考，包含足迹地图、深度文章、播客和闪念随笔。',
  inLanguage: ['zh-CN', 'en'],
  author: { '@id': `${SITE_URL}/#person` },
  publisher: { '@id': `${SITE_URL}/#person` },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

const webpageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: '太阳在世界游荡 · WANDERING SUN',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#person` },
  description:
    'Web3 营销人、数字游民、AI 探索者的个人网站。足迹横跨 6 国，在流动中工作，在创作里认识自己。',
  inLanguage: 'zh-CN',
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首页', item: SITE_URL },
    ],
  },
}

const podcastSchema = {
  '@context': 'https://schema.org',
  '@type': 'PodcastSeries',
  name: '太阳在世界游荡 Podcast',
  description: '记录数字游民生活的播客节目，聊远程工作、旅居选城、Web3 和 AI 探索。',
  url: `${SITE_URL}/#podcast`,
  author: { '@id': `${SITE_URL}/#person` },
  inLanguage: 'zh-CN',
  genre: ['Technology', 'Travel', 'Business', 'Digital Nomad'],
  webFeed: 'https://www.xiaoyuzhoufm.com',
}

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastSchema) }}
      />
    </>
  )
}
