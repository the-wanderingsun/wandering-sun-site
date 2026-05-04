'use client'

import { useState } from 'react'
import Image from 'next/image'
import { POSTS } from '@/content/posts'
import type { PostCategory } from '@/types'

const TABS: Array<'全部' | PostCategory> = ['全部', '旅居', 'Web3', 'AI', '思考']

export default function Blog() {
  const [active, setActive] = useState<'全部' | PostCategory>('全部')

  const filtered = active === '全部'
    ? POSTS
    : POSTS.filter((p) => p.category === active)

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
            {tab !== '全部' && (
              <span className="blog-tab-count">
                {POSTS.filter((p) => p.category === tab).length}
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
