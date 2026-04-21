import fs from "fs";
import path from "path";
import Link from "next/link";
import Typewriter from "@/components/Typewriter";
import RandomQuote from "@/components/RandomQuote";

const socials = [
  { label: "Twitter / X", href: "https://x.com/MiraLiu66", emoji: "🐦" },
  { label: "小红书", href: "https://www.xiaohongshu.com/user/profile/6347e7140000000018028cab", emoji: "📕" },
  { label: "GitHub", href: "https://github.com/the-wanderingsun", emoji: "🐙" },
];

const typewriterLines = [
  "💁‍♀️ 土木转行 Web3",
  "▶️ Web3 运营 · 分享可复制的转型经验",
  "🤖 研究 AI · 真实记录用 AI 的过程",
  "📍 数字游民 · 探索更多生活的可能性",
];

function getNow() {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/now.json"), "utf-8"));
  } catch { return null; }
}

function getQuotes(): string[] {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/quotes.json"), "utf-8"));
  } catch { return []; }
}

export default function Home() {
  const now = getNow();
  const quotes = getQuotes();

  return (
    <div className="py-4 space-y-3">

      {/* ── Bento Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 auto-rows-auto">

        {/* Hero 大卡 — 占左侧 3 列，桌面端跨 2 行 */}
        <div className="md:col-span-3 md:row-span-2 rounded-3xl bg-white border border-orange-100 p-7 flex flex-col justify-between min-h-64">
          <div className="space-y-4">
            <div className="text-4xl">☀️</div>
            <div>
              <h1 className="text-2xl font-bold text-stone-800 tracking-tight">太阳在世界游荡</h1>
              <p className="text-xs text-stone-400 mt-1">原名：梅子林</p>
            </div>
            <Typewriter texts={typewriterLines} />
          </div>
          {/* Social links */}
          <div className="flex flex-wrap gap-2 pt-6">
            {socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-xs text-stone-600 hover:border-orange-300 hover:text-orange-600 transition-all hover:-translate-y-0.5"
              >
                <span>{s.emoji}</span>
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Now 卡 — 右侧上半 */}
        {now && (
          <div className="md:col-span-2 rounded-3xl bg-white border border-orange-100 p-5 space-y-3">
            <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest">现在</p>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 text-sm">
                <span>🎵</span>
                <div>
                  <p className="text-xs text-stone-400">在听</p>
                  <p className="text-stone-700 text-xs font-medium leading-snug mt-0.5">{now.listening}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-sm">
                <span>📖</span>
                <div>
                  <p className="text-xs text-stone-400">在读</p>
                  <p className="text-stone-700 text-xs font-medium leading-snug mt-0.5">{now.reading}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-sm">
                <span>📍</span>
                <div>
                  <p className="text-xs text-stone-400">在</p>
                  <p className="text-stone-700 text-xs font-medium mt-0.5">{now.location}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 每日日报卡 — 右侧下半 */}
        <Link
          href="/daily"
          className="md:col-span-2 group rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 p-5 flex flex-col justify-between hover:border-orange-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-h-32"
        >
          <div>
            <span className="text-2xl">📰</span>
            <h2 className="font-semibold text-stone-800 mt-2 group-hover:text-orange-600 transition-colors">每日日报</h2>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed">AI 圈动态 · 市场行情 · 精选资讯</p>
          </div>
          <span className="text-orange-300 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all text-sm self-end">→</span>
        </Link>

        {/* 博客卡 */}
        <Link
          href="/blog"
          className="md:col-span-2 group rounded-3xl bg-white border border-orange-100 p-5 flex flex-col justify-between hover:border-orange-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-h-32"
        >
          <div>
            <span className="text-2xl">✍️</span>
            <h2 className="font-semibold text-stone-800 mt-2 group-hover:text-orange-600 transition-colors">博客</h2>
            <p className="text-xs text-stone-400 mt-1">记录思考、观察与随笔</p>
          </div>
          <span className="text-orange-300 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all text-sm self-end">→</span>
        </Link>

        {/* GitHub 卡 */}
        <Link
          href="/github"
          className="md:col-span-2 group rounded-3xl bg-white border border-orange-100 p-5 flex flex-col justify-between hover:border-orange-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-h-28"
        >
          <div>
            <span className="text-2xl">🛠️</span>
            <h2 className="font-semibold text-stone-800 mt-2 group-hover:text-orange-600 transition-colors">我在做什么</h2>
            <p className="text-xs text-stone-400 mt-1">GitHub 贡献与近期项目</p>
          </div>
          <span className="text-orange-300 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all text-sm self-end">→</span>
        </Link>

        {/* 推荐卡 */}
        <Link
          href="/links"
          className="md:col-span-2 group rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-100 p-5 flex flex-col justify-between hover:border-orange-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-h-28"
        >
          <div>
            <span className="text-2xl">🔖</span>
            <h2 className="font-semibold text-stone-800 mt-2 group-hover:text-orange-600 transition-colors">我的推荐</h2>
            <p className="text-xs text-stone-400 mt-1">值得分享的网站与工具</p>
          </div>
          <span className="text-orange-300 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all text-sm self-end">→</span>
        </Link>

        {/* 格言卡 — 跨 1 列，占满剩余 */}
        <div className="md:col-span-1 rounded-3xl bg-stone-50 border border-stone-100 p-5 flex items-center justify-center min-h-28">
          <RandomQuote quotes={quotes} />
        </div>

        {/* 播客卡 */}
        <Link
          href="/podcast"
          className="md:col-span-2 group rounded-3xl bg-white border border-dashed border-orange-200 p-5 flex flex-col justify-between hover:border-orange-300 hover:-translate-y-0.5 transition-all duration-200 min-h-28 opacity-60 hover:opacity-100"
        >
          <div>
            <span className="text-2xl">🎙️</span>
            <h2 className="font-semibold text-stone-600 mt-2">播客</h2>
            <p className="text-xs text-stone-400 mt-1">Coming Soon</p>
          </div>
        </Link>

      </div>
    </div>
  );
}
