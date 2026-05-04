import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getAllSlugs, getPostBySlug } from '@/lib/posts'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ id: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const post = await getPostBySlug(id)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params
  const post = await getPostBySlug(id)
  if (!post) notFound()

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

      {/* 正文（remark 渲染的 HTML） */}
      <article
        className="bp-body"
        dangerouslySetInnerHTML={{ __html: post.htmlContent }}
      />
    </main>
  )
}
