import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import Cursor from '@/components/ui/Cursor'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, TWITTER_HANDLE } from '@/lib/constants'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#050505' },
    { media: '(prefers-color-scheme: light)', color: '#FDFDFD' },
  ],
  colorScheme: 'dark light',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · WANDERING SUN`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    '数字游民', 'digital nomad', 'Web3', 'AI', '远程工作', '旅居',
    '清迈', '东京', '新加坡', '个人网站', '播客', 'wandering sun',
    '太阳在世界游荡', 'nomad life', 'remote work', 'travel', 'blockchain',
  ],
  authors: [{ name: '太阳在世界游荡', url: SITE_URL }],
  creator: '太阳在世界游荡',
  publisher: '太阳在世界游荡',
  category: 'lifestyle',
  alternates: {
    canonical: '/',
    languages: { 'zh-CN': '/', 'x-default': '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '太阳在世界游荡 — Web3 营销人 · 数字游民 · AI 探索者',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
    creator: TWITTER_HANDLE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '64x64', type: 'image/x-icon' },
      { url: '/icon.svg',    sizes: 'any',   type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple:    '/icon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+SC:wght@300;400;700;900&family=Space+Grotesk:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <Cursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
