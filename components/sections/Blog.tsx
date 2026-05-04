'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Post, PostCategory } from '@/types'

const TABS: Array<'ALL' | PostCategory> = ['ALL', 'LIVING', 'WEB3', 'AI', 'ESSAYS']

interface Props {
  posts: Post[]
}

export default function Blog({ posts }: Props) {
  const [active, setActive] = useState<'ALL' | PostCategory>('ALL')

  const filtered =
    active === 'ALL' ? posts : posts.filter((p) => p.category === active)

  return (
    <section id="blog" className="section-border">
      <div className="blog-header">
        <h2 className="blog-title">深度沉淀<span>.</span></h2>
        <a href="#" className="view-all">VIEW ALL</a>
      </div>

      {/* 分类 Tab */}
      <div className="blog-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`blog-tab${active === tab ? ' active' : ''}`}
            onClick={() => setActive(tab)}
          >
            {tab}
            {tab !== 'ALL' && (
              <span className="blog-tab-count">
                {posts.filter((p) => p.category === tab).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 文章网格 */}
      {filtered.length === 0 ? (
        <div className="blog-empty">该分类暂无文章，即将发布…</div>
      ) : (
        <div className="blog-grid">
          {filtered.map((post) => (
            <a key={post.id} href={post.href} className="article-card">
              <div className="article-img">
                <div className="article-img-inner">
                  <Image
                    src={post.image}
                    className="article-illus"
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {post.category && (
                  <span className="article-category-badge">{post.category}</span>
                )}
              </div>
              <div className="article-meta">{post.date} · {post.location}</div>
              <h3 className="article-title-text">{post.title}</h3>
              <p className="article-excerpt">{post.excerpt}</p>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}
