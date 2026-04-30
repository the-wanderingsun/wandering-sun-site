# CLAUDE.md — WANDERING SUN 项目记忆

> 此文件是 Claude Code 的项目记忆，每次开启新对话时自动载入。
> **每次完成任务后必须同步此文件和 README.md，保持与代码状态一致。**

---

## 项目概览

**网站名**: 太阳在世界游荡 · WANDERING SUN  
**域名**: wanderingsun.xyz  
**定位**: 数字游民个人网站 — Web3 营销人 · 数字游民 · AI 探索者  
**部署**: Vercel（连接 GitHub，push 自动部署）

---

## 技术栈（当前版本）

| 层 | 选型 | 版本 |
|---|---|---|
| 框架 | Next.js App Router | **16.2.4** |
| 语言 | TypeScript | 5.x strict |
| 构建 | **Turbopack** | `--turbopack`（dev + build 均开启）|
| 样式 | 纯 CSS Variables | 无 Tailwind |
| 3D 地球 | globe.gl + Three.js | 2.x + 0.184+ |
| 字体 | Bebas Neue · Noto Sans SC · Space Grotesk | Google Fonts |
| 托管 | Vercel | vercel.json → framework: nextjs |

---

## 目录结构（完整）

```
wandering-sun-site/
├── .claude/
│   ├── agents/frontend-developer.md
│   └── commands/generate-tests.md
├── app/
│   ├── globals.css          # 全站 CSS（CSS 变量 + 所有样式）
│   ├── layout.tsx           # 根布局（字体、ThemeProvider、Cursor）
│   ├── page.tsx             # 首页（组装所有 section）
│   ├── robots.ts            # → /robots.txt
│   └── sitemap.ts           # → /sitemap.xml
├── components/
│   ├── sections/            # 页面区块（按职责隔离）
│   │   ├── Hero.tsx         # Server Component
│   │   ├── Nav.tsx          # 'use client'（时钟 + 主题切换）
│   │   ├── Blog.tsx         # Server Component
│   │   ├── Flash.tsx        # Server Component
│   │   ├── Footer.tsx       # Server Component
│   │   ├── Footprints/
│   │   │   ├── index.tsx    # 'use client'（activeCity state）
│   │   │   ├── GlobeClient.tsx  # 'use client' + dynamic(ssr:false)
│   │   │   └── CityCard.tsx # 'use client'
│   │   └── Podcast/
│   │       ├── index.tsx    # Server Component
│   │       └── Player.tsx   # 'use client'（播放器状态）
│   └── ui/                  # 全局可复用 UI
│       ├── Cursor.tsx       # 'use client'
│       ├── JsonLd.tsx       # Server（结构化数据）
│       ├── ThemeProvider.tsx # 'use client'（Context）
│       └── ThemeToggle.tsx  # 'use client'
├── content/                 # 站点内容数据
│   ├── cities.ts
│   ├── episodes.ts
│   ├── flash.ts
│   └── posts.ts
├── lib/
│   └── constants.ts         # SITE_URL / SITE_NAME / TWITTER_HANDLE 等
├── public/
│   ├── images/              # avatar.png / hiking.png / working.png
│   ├── icon.svg
│   ├── llms.txt             # llms.txt 标准
│   ├── llms-full.txt        # 全量内容
│   └── manifest.json
├── types/
│   └── index.ts             # City / Post / Episode / FlashCard
├── CLAUDE.md                # 本文件
├── README.md
├── .gitignore               # 含 .next/ node_modules/ .env* 等
├── next.config.ts
├── package.json
├── tsconfig.json
└── vercel.json
```

---

## npm scripts

```bash
npm run dev    # next dev --turbopack   （Turbopack 热更新）
npm run build  # next build --turbopack （Turbopack 生产构建）
npm start      # next start
npm run lint   # next lint
```

---

## 主题系统

**使用 `data-theme` 属性，不使用 Tailwind 的 `dark:` 类。**

```css
:root[data-theme="dark"]  { --bg: #050505; --fg: #FDFDFD; ... }
:root[data-theme="light"] { --bg: #FDFDFD; --fg: #050505; ... }
```

- `ThemeProvider` (`components/ui/`) 写 `data-theme` 到 `document.documentElement`
- 偏好存 `localStorage`，key: `ws-theme`，默认 `dark`
- 切换后调 `window.updateGlobeTheme?.()` 通知地球背景同步

---

## CSS 变量表

| 变量 | 用途 |
|---|---|
| `--bg` / `--bg2` / `--bg3` | 页面 / 卡片 / 深层背景 |
| `--fg` / `--fg-dim` / `--fg-muted` | 文字 100% / 50% / 22% |
| `--border` | 分割线 / 边框 |
| `--accent` | 橙色强调 |
| `--accent-blue` | 蓝色状态点 |
| `--nav-bg` | 导航栏模糊背景 |
| `--card-hover` | 卡片悬停背景 |

---

## 地球（GlobeClient）关键实现

- `dynamic(() => import('./GlobeClient'), { ssr: false })` — 避免 SSR 访问 window
- `globe.gl` 通过 `Globe()(domRef.current)` 初始化
- `controls.enableZoom = false` — **禁止滚轮缩放，防止劫持页面滚动**
- 日夜着色器：GLSL ShaderMaterial，uniforms: `dayTexture / nightTexture / sunPosition / globeRotation`
- 太阳位置：天文公式（Julian Date → 赤纬 + GMST），不依赖外部库
- 点击城市标记 → `onCitySelect(city)` 回调 → 父组件更新 CityCard

---

## SEO / GEO / LLM 收录

| 文件 | 内容 |
|---|---|
| `app/layout.tsx` | 完整 Metadata（OG / Twitter / canonical / keywords）|
| `app/sitemap.ts` | 自动生成 sitemap.xml |
| `app/robots.ts` | 允许 15+ AI 爬虫（GPTBot / ClaudeBot / PerplexityBot 等）|
| `components/ui/JsonLd.tsx` | Person + WebSite + WebPage + PodcastSeries Schema.org |
| `public/llms.txt` | llms.txt 标准（AI 爬虫导航）|
| `public/llms-full.txt` | 全量站点内容（供 LLM 直接引用回答）|

---

## 全局常量（lib/constants.ts）

所有模块从 `@/lib/constants` 引入，不要在各文件内重复定义：

```ts
SITE_URL        = 'https://wanderingsun.xyz'
SITE_NAME       = '太阳在世界游荡 · WANDERING SUN'
SITE_DESCRIPTION = '...'
TWITTER_HANDLE  = '@Wandering_sun'
TELEGRAM_URL    = 'https://t.me/Wandering_sun'
```

---

## 编程约定（必须遵守）

1. **不要修改设计**：只改用户明确要求的部分。擅自改动设计会被批评。
2. **CSS 变量优先**：所有颜色用 CSS 变量，不要硬编码颜色值。
3. **Server Component 为默认**：只有 useState/useEffect/window/事件的才加 `'use client'`。
4. **TypeScript strict**：所有 props 必须有类型，不用 `any`（globe.gl 除外）。
5. **globe.gl 必须 dynamic import + ssr:false**：WebGL 无法在服务端运行。
6. **图片路径**：使用 `/images/filename.ext`（`public/images/` 下）。
7. **常量统一**：SITE_URL 等从 `@/lib/constants` 引用。
8. **不使用 Tailwind**：CSS 全部在 `app/globals.css`，使用 CSS 变量系统。
9. **构建验证**：每次修改后运行 `npm run build` 确认 Turbopack 构建通过。
10. **完成后同步文档**：每次任务完成后更新 `CLAUDE.md` 和 `README.md`。

---

## 变更历史（最近）

| 日期 | 变更 |
|---|---|
| 2026-04-30 | 从 index.html 重构为 Next.js 16 + TypeScript 组件化架构 |
| 2026-04-30 | 开启 Turbopack（dev + build `--turbopack`）|
| 2026-04-30 | 目录重构：components → sections/+ui/，data → content/，uploads → images/ |
| 2026-04-30 | 抽取 lib/constants.ts，消除 SITE_URL 重复 |
| 2026-04-30 | SEO/GEO/LLM：完整 metadata + robots.ts + sitemap.ts + JsonLd + llms.txt |
| 2026-04-30 | 安装 pua@pua-skills plugin |
| 2026-04-30 | 修复 hydration mismatch：Player.tsx Math.random() 改为 useEffect 延迟初始化，layout.tsx html/body 加 suppressHydrationWarning |
| 2026-04-30 | 修复 sunPosition() 180° 错误：`(180 - H_)` → `(360 - H_)`，修复中国夜晚显示为白天的 bug；补加 globeRotation 首帧初始化 |
