import Image from 'next/image'
import { POSTS } from '@/content/posts'

export default function Blog() {
  return (
    <section id="blog" className="section-border">
      <div className="blog-header">
        <h2 className="blog-title">深度沉淀<span>.</span></h2>
        <a href="#" className="view-all">VIEW ALL</a>
      </div>
      <div className="blog-grid">
        {POSTS.map((post) => (
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
            </div>
            <div className="article-meta">{post.date} · {post.location}</div>
            <h3 className="article-title-text">{post.title}</h3>
            <p className="article-excerpt">{post.excerpt}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
