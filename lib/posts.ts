/**
 * 文章读取工具
 * 自动扫描 content/blog/ 下所有 .md 文件，无需手动 import
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import type { Post, PostCategory } from '@/types'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

/** 递归获取目录下所有 .md 文件路径 */
function getMdFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return getMdFiles(fullPath)
    if (entry.name.endsWith('.md')) return [fullPath]
    return []
  })
}

/** 把 publishedAt 转成展示用的月份字符串，如 "FEB 2026" */
function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  return `${month} ${d.getFullYear()}`
}

interface RawFrontmatter {
  slug: string
  title: string
  publishedAt: string
  category: PostCategory
  location?: string
  excerpt?: string
  image?: string
  imageAlt?: string
  draft?: boolean
}

/** 读取单篇文章（含渲染好的 HTML 正文） */
export async function getPostBySlug(
  slug: string
): Promise<(Post & { htmlContent: string }) | null> {
  const files = getMdFiles(BLOG_DIR)

  const file = files.find((f) => {
    const { data } = matter(fs.readFileSync(f, 'utf-8'))
    return (data as RawFrontmatter).slug === slug
  })
  if (!file) return null

  const raw = fs.readFileSync(file, 'utf-8')
  const { data, content } = matter(raw)
  const fm = data as RawFrontmatter

  const processed = await remark()
    .use(remarkHtml, { sanitize: false })
    .process(content)

  return {
    id: fm.slug,
    date: formatDate(fm.publishedAt),
    location: fm.location ?? '',
    image: fm.image ?? '/images/hiking.png',
    imageAlt: fm.imageAlt ?? '',
    title: fm.title,
    excerpt: fm.excerpt ?? '',
    href: `/blog/${fm.slug}`,
    category: fm.category,
    content,
    htmlContent: processed.toString(),
  }
}

/** 获取所有文章列表（不含正文，用于首页 Blog 组件） */
export function getAllPosts(): Post[] {
  const files = getMdFiles(BLOG_DIR)

  const posts = files
    .map((file) => {
      const raw = fs.readFileSync(file, 'utf-8')
      const { data } = matter(raw)
      const fm = data as RawFrontmatter
      if (fm.draft) return null

      return {
        id: fm.slug,
        date: formatDate(fm.publishedAt),
        location: fm.location ?? '',
        image: fm.image ?? '/images/hiking.png',
        imageAlt: fm.imageAlt ?? '',
        title: fm.title,
        excerpt: fm.excerpt ?? '',
        href: `/blog/${fm.slug}`,
        category: fm.category,
        publishedAt: fm.publishedAt, // 临时保留用于排序
      }
    })
    .filter(Boolean) as (Post & { publishedAt: string })[]

  // 按发布时间降序
  posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  // 去掉 publishedAt，不暴露给外部
  return posts.map(({ publishedAt: _, ...rest }) => rest)
}

/** 获取所有 slug（用于 generateStaticParams） */
export function getAllSlugs(): string[] {
  const files = getMdFiles(BLOG_DIR)
  return files
    .map((f) => {
      const { data } = matter(fs.readFileSync(f, 'utf-8'))
      const fm = data as RawFrontmatter
      return fm.draft ? null : fm.slug
    })
    .filter(Boolean) as string[]
}
