#!/usr/bin/env node
/**
 * 新建文章脚本
 * 用法：node scripts/new-post.mjs "文章标题" --category 旅居
 * 或：  npm run new:post -- "文章标题" --category 思考
 */

import fs from 'fs'
import path from 'path'

const args = process.argv.slice(2)
const titleArg = args.find((a) => !a.startsWith('--'))
const categoryIdx = args.indexOf('--category')
const category = categoryIdx !== -1 ? args[categoryIdx + 1] : '思考'
const draftFlag = args.includes('--draft')

if (!titleArg) {
  console.error('请提供文章标题，例如：npm run new:post -- "我的新文章" --category 旅居')
  process.exit(1)
}

// 生成 slug：取标题拼音首字母或直接用时间戳
const today = new Date().toISOString().slice(0, 10)
const slug = titleArg
  .toLowerCase()
  .replace(/[^\w一-龥\s-]/g, '')
  .trim()
  .replace(/[\s_]+/g, '-')
  .slice(0, 50) || `post-${Date.now()}`

const BLOG_DIR = path.join(process.cwd(), 'content/blog')
const categoryDir = path.join(BLOG_DIR, category)

if (!fs.existsSync(categoryDir)) {
  fs.mkdirSync(categoryDir, { recursive: true })
}

const filename = `${slug}.md`
const filepath = path.join(categoryDir, filename)

if (fs.existsSync(filepath)) {
  console.error(`文件已存在：${filepath}`)
  process.exit(1)
}

const template = `---
title: '${titleArg}'
slug: '${slug}'
publishedAt: '${today}'
category: '${category}'
location: ''
excerpt: ''
image: '/images/hiking.png'
imageAlt: ''
${draftFlag ? "draft: true" : ""}
---

在这里写正文…
`

fs.writeFileSync(filepath, template.replace(/\n{3,}/g, '\n\n'))
console.log(`✅ 新文章已创建：content/blog/${category}/${filename}`)
console.log(`   slug: ${slug}`)
console.log(`   发布后访问：/blog/${slug}`)
