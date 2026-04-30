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
}

export interface Post {
  id: string
  date: string
  location: string
  image: string
  imageAlt: string
  title: string
  excerpt: string
  href: string
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
