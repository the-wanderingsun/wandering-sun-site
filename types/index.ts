export interface City {
  id: string
  name: string
  region: string
  lat: number
  lon: number
  type: 'current' | 'lived' | 'visited'
  statusText: string
  coords: string
  desc: string
  articles: CityArticle[]
}

export interface CityArticle {
  title: string
  tag: string
  href?: string   // 有值时可跳转，无值时显示"即将发布"
}

export type PostCategory = '旅居' | 'Web3' | 'AI' | '思考'

export interface Post {
  id: string
  date: string
  location: string
  image: string
  imageAlt: string
  title: string
  excerpt: string
  href: string
  category?: PostCategory
  content?: string   // Markdown 正文（可选，有值时启用全文页）
}

export interface Episode {
  num: string
  title: string
  date: string
  duration: string
  durationSec: number
}

export interface FlashCard {
  id: string
  tag: string
  body: string
  date: string
  accent?: boolean
  wide?: boolean
}
