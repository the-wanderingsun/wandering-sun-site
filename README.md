# 太阳在世界游荡 · WANDERING SUN

> Web3 营销人 · 数字游民 · AI 探索者  
> 在流动中工作，在创作里认识自己。

**线上地址**: [wanderingsun.xyz](https://wanderingsun.xyz)

---

## 技术栈

| 层 | 选型 | 版本 |
|----|------|------|
| 框架 | Next.js (App Router) | 16.2.4 |
| 语言 | TypeScript | 5.x |
| 构建 | **Turbopack** | 内置（`--turbopack`）|
| 样式 | 纯 CSS Variables | 无 Tailwind |
| 3D 地球 | globe.gl + Three.js | 2.x + 0.184+ |
| 部署 | Vercel | 自动（push 触发）|

---

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（Turbopack）
npm run dev
# → http://localhost:3000

# 生产构建（Turbopack）
npm run build

# 生产预览
npm start
```

---

## 目录结构

```
wandering-sun-site/
├── app/                      # Next.js App Router
│   ├── globals.css           # 全站 CSS（CSS 变量系统）
│   ├── layout.tsx            # 根布局（字体 / ThemeProvider / Cursor）
│   ├── page.tsx              # 首页
│   ├── robots.ts             # → /robots.txt（含 AI 爬虫规则）
│   └── sitemap.ts            # → /sitemap.xml
│
├── components/
│   ├── sections/             # 页面区块组件
│   │   ├── Hero.tsx
│   │   ├── Nav.tsx
│   │   ├── Blog.tsx
│   │   ├── Flash.tsx
│   │   ├── Footer.tsx
│   │   ├── Footprints/       # 地球 globe.gl + 城市卡片
│   │   │   ├── index.tsx     # 区块入口（'use client'，管理 activeCity state）
│   │   │   ├── GlobeClient.tsx  # 地球渲染（dynamic ssr:false）
│   │   │   └── CityCard.tsx  # 城市信息卡片
│   │   └── Podcast/          # 播客
│   │       ├── index.tsx     # 区块入口（Server Component）
│   │       └── Player.tsx    # 播放器（'use client'）
│   └── ui/                   # 全局可复用 UI
│       ├── Cursor.tsx        # 自定义鼠标（'use client'）
│       ├── JsonLd.tsx        # 结构化数据（SEO / GEO）
│       ├── ThemeProvider.tsx # 主题 Context（'use client'）
│       └── ThemeToggle.tsx   # 主题切换按钮
│
├── content/                  # 站点内容数据（TypeScript）
│   ├── cities.ts             # 足迹城市
│   ├── episodes.ts           # 播客单集
│   ├── flash.ts              # 闪念卡片
│   └── posts.ts              # 博客文章
│
├── lib/                      # 工具 / 全局常量
│   └── constants.ts          # SITE_URL、SITE_NAME 等
│
├── public/
│   ├── images/               # 图片资源
│   ├── icon.svg
│   ├── llms.txt              # AI 爬虫索引（llms.txt 标准）
│   ├── llms-full.txt         # 全量内容（供 LLM 直接索引）
│   └── manifest.json         # PWA manifest
│
├── types/
│   └── index.ts              # TypeScript 接口（City / Post / Episode / FlashCard）
│
├── CLAUDE.md                 # Claude Code 项目记忆（每次完成后同步）
└── README.md                 # 本文件（每次完成后同步）
```

---

## 页面区块

| 区块 | ID | 说明 |
|------|----|------|
| HERO | `#hero` | 个人介绍 + 头像 |
| FOOTPRINTS | `#footprints` | globe.gl 交互地球 + 城市卡片（日夜着色器）|
| 沉淀 | `#blog` | 深度博客文章 |
| VOICE | `#podcast` | 播客列表 + 播放器 |
| FLASH | `#flash` | 闪念随笔卡片 |
| FOOTER | `#footer` | 联系方式 + 社交链接 |

---

## 主题系统

- 使用 `data-theme` 属性（`dark` / `light`），**不用 Tailwind dark:**
- CSS 变量定义在 `app/globals.css`
- 偏好存入 `localStorage`（key: `ws-theme`）
- 切换主题后通过 `window.updateGlobeTheme?.()` 通知地球更新背景

---

## SEO / GEO / LLM

| 文件 | 作用 |
|------|------|
| `app/layout.tsx` | 完整 Metadata（OG / Twitter Card / canonical）|
| `app/sitemap.ts` | 自动生成 sitemap.xml |
| `app/robots.ts` | 明确允许 15+ AI 爬虫（GPTBot / ClaudeBot / PerplexityBot 等）|
| `components/ui/JsonLd.tsx` | 4 种 Schema.org（Person / WebSite / WebPage / PodcastSeries）|
| `public/llms.txt` | llms.txt 标准，AI 爬虫索引 |
| `public/llms-full.txt` | 全量站点内容，供 LLM 直接引用 |

---

## 数据更新

直接编辑 `content/` 目录下对应 TypeScript 文件，push 后 Vercel 自动重建。

---

## 部署

推送到 GitHub，Vercel 自动构建并部署。

---

## Agent 记忆

见 [CLAUDE.md](./CLAUDE.md) — 供 Claude Code 每次会话时载入。
