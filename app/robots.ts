import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*',                 allow: '/', disallow: ['/api/', '/_next/'] },
      // 标准搜索引擎
      { userAgent: 'Googlebot',         allow: '/' },
      { userAgent: 'Googlebot-Image',   allow: '/' },
      { userAgent: 'Bingbot',           allow: '/' },
      { userAgent: 'Baiduspider',       allow: '/' },
      // AI / LLM 爬虫（明确允许）
      { userAgent: 'GPTBot',            allow: '/' },  // OpenAI ChatGPT
      { userAgent: 'ChatGPT-User',      allow: '/' },
      { userAgent: 'OAI-SearchBot',     allow: '/' },
      { userAgent: 'Claude-Web',        allow: '/' },  // Anthropic Claude
      { userAgent: 'ClaudeBot',         allow: '/' },
      { userAgent: 'anthropic-ai',      allow: '/' },
      { userAgent: 'PerplexityBot',     allow: '/' },  // Perplexity
      { userAgent: 'Perplexity-User',   allow: '/' },
      { userAgent: 'cohere-ai',         allow: '/' },  // Cohere
      { userAgent: 'Google-Extended',   allow: '/' },  // Gemini 训练数据
      { userAgent: 'meta-externalagent',allow: '/' },  // Meta AI
      { userAgent: 'Applebot-Extended', allow: '/' },  // Apple Intelligence
      { userAgent: 'YouBot',            allow: '/' },  // You.com
      { userAgent: 'CCBot',             allow: '/' },  // Common Crawl
      { userAgent: 'Bytespider',        allow: '/' },  // ByteDance
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
