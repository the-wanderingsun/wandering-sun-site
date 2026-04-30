import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { POSTS } from '@/content/posts'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return POSTS.filter((p) => p.content).map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const post = POSTS.find((p) => p.id === id)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

/** 极简 Markdown → HTML（不引入额外依赖） */
function renderMarkdown(md: string): string {
  return md
    // 水平线
    .replace(/^---$/gm, '<hr>')
    // 标题
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    // 粗体
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // 斜体 / 引用块
    .replace(/^\*(.+)\*$/gm, '<em>$1</em>')
    // 引用块 >
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // 段落（两个换行 → <p>）
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim()
      if (!trimmed) return ''
      if (/^<(h[1-6]|hr|blockquote|ul|ol|li)/.test(trimmed)) return trimmed
      return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`
    })
    .join('\n')
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params
  const post = POSTS.find((p) => p.id === id)
  if (!post || !post.content) notFound()

  const html = renderMarkdown(post.content)

  return (
    <main className="blog-post-page">
      {/* 顶部返回导航 */}
      <div className="bp-nav">
        <Link href="/#blog" className="bp-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          返回
        </Link>
      </div>

      {/* 封面图 */}
      <div className="bp-cover">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          priority
          sizes="100vw"
          className="bp-cover-img"
        />
        <div className="bp-cover-overlay" />
      </div>

      {/* 文章头部 */}
      <div className="bp-header">
        <div className="bp-meta">{post.date} · {post.location}</div>
        <h1 className="bp-title">{post.title}</h1>
        <p className="bp-excerpt">{post.excerpt}</p>
      </div>

      {/* 正文 */}
      <article
        className="bp-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  )
}
