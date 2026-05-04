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

/** Markdown → HTML（支持标题/粗体/列表/表格/引用/分隔线） */
function renderMarkdown(md: string): string {
  // 1. 内联样式处理（先做，避免块处理时干扰）
  function inlineProcess(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>')
  }

  // 2. 表格处理：连续的 | 行视为一个表格块
  function processTable(lines: string[]): string {
    const rows = lines.filter((l) => !l.match(/^\|[\s\-|:]+\|?\s*$/))
    const cells = (row: string) =>
      row
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map((c) => c.trim())
    const [head, ...body] = rows
    const thCells = cells(head)
      .map((c) => `<th>${inlineProcess(c)}</th>`)
      .join('')
    const bodyRows = body
      .map(
        (r) =>
          `<tr>${cells(r)
            .map((c) => `<td>${inlineProcess(c)}</td>`)
            .join('')}</tr>`
      )
      .join('\n')
    return `<table><thead><tr>${thCells}</tr></thead><tbody>${bodyRows}</tbody></table>`
  }

  // 3. 按行处理
  const lines = md.split('\n')
  const output: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // 表格块（以 | 开头）
    if (line.trim().startsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i])
        i++
      }
      output.push(processTable(tableLines))
      continue
    }

    // 无序列表块
    if (/^[\-\*] /.test(line.trim())) {
      const listItems: string[] = []
      while (i < lines.length && /^[\-\*] /.test(lines[i].trim())) {
        listItems.push(
          `<li>${inlineProcess(lines[i].trim().replace(/^[\-\*] /, ''))}</li>`
        )
        i++
      }
      output.push(`<ul>${listItems.join('')}</ul>`)
      continue
    }

    // 有序列表块
    if (/^\d+\. /.test(line.trim())) {
      const listItems: string[] = []
      while (i < lines.length && /^\d+\. /.test(lines[i].trim())) {
        listItems.push(
          `<li>${inlineProcess(lines[i].trim().replace(/^\d+\. /, ''))}</li>`
        )
        i++
      }
      output.push(`<ol>${listItems.join('')}</ol>`)
      continue
    }

    // 水平线
    if (/^---+$/.test(line.trim())) {
      output.push('<hr>')
      i++
      continue
    }

    // 标题
    if (/^# /.test(line)) {
      output.push(`<h1>${inlineProcess(line.replace(/^# /, ''))}</h1>`)
      i++
      continue
    }
    if (/^## /.test(line)) {
      output.push(`<h2>${inlineProcess(line.replace(/^## /, ''))}</h2>`)
      i++
      continue
    }
    if (/^### /.test(line)) {
      output.push(`<h3>${inlineProcess(line.replace(/^### /, ''))}</h3>`)
      i++
      continue
    }

    // 引用块
    if (/^> /.test(line)) {
      output.push(`<blockquote>${inlineProcess(line.replace(/^> /, ''))}</blockquote>`)
      i++
      continue
    }

    // ⚠️ 警告块（以 ⚠️ 开头）
    if (line.trim().startsWith('⚠️')) {
      output.push(`<p class="bp-warning">${inlineProcess(line.trim())}</p>`)
      i++
      continue
    }

    // 空行 → 段落分隔
    if (line.trim() === '') {
      i++
      continue
    }

    // 普通段落：收集连续非空行
    const paraLines: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('|') &&
      !/^[#>]/.test(lines[i]) &&
      !/^[\-\*] /.test(lines[i].trim()) &&
      !/^\d+\. /.test(lines[i].trim()) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i])
      i++
    }
    if (paraLines.length) {
      output.push(`<p>${inlineProcess(paraLines.join('<br>'))}</p>`)
    }
  }

  return output.join('\n')
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
