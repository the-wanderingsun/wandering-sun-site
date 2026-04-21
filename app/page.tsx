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

const sections = [
  { href: "/daily", emoji: "📰", title: "每日日报", desc: "AI 圈动态 · 市场行情 · 精选资讯，每天自动更新" },
  { href: "/blog", emoji: "✍️", title: "博客", desc: "记录思考、观察与随笔" },
  { href: "/github", emoji: "🔨", title: "我在做什么", desc: "GitHub 贡献记录与近期项目" },
  { href: "/links", emoji: "🔖", title: "我的推荐", desc: "值得分享的网站、工具与内容" },
  { href: "/podcast", emoji: "🎙️", title: "播客", desc: "Coming Soon" },
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
    <div className="space-y-10">
      {/* Hero */}
      <section className="pt-6 space-y-4">
        <div className="text-5xl">☀️</div>
        <h1 className="text-3xl font-bold text-stone-800 tracking-tight">太阳在世界游荡</h1>
        <p className="text-stone-400 text-sm">原名：梅子林</p>

        {/* 打字机效果 */}
        <Typewriter texts={typewriterLines} />

        {/* Social links */}
        <div className="flex flex-wrap gap-3 pt-2">
          {socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-orange-100 text-sm text-stone-600 hover:border-orange-300 hover:text-orange-600 transition-all hover:-translate-y-0.5 hover:shadow-sm shadow-sm"
            >
              <span>{s.emoji}</span>
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Now 模块 */}
      {now && (
        <section className="rounded-2xl bg-white border border-orange-100 p-5 space-y-3">
          <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider">现在</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm text-stone-600">
              <span className="text-base">🎵</span>
              <span className="text-stone-400 w-8 shrink-0">在听</span>
              <span className="font-medium text-stone-700">{now.listening}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-stone-600">
              <span className="text-base">📖</span>
              <span className="text-stone-400 w-8 shrink-0">在读</span>
              <span className="font-medium text-stone-700">{now.reading}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-stone-600">
              <span className="text-base">📍</span>
              <span className="text-stone-400 w-8 shrink-0">在</span>
              <span className="font-medium text-stone-700">{now.location}</span>
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="border-t border-orange-100" />

      {/* Navigation cards */}
      <section className="grid gap-3">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-orange-100 hover:border-orange-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="text-2xl">{s.emoji}</span>
            <div className="flex-1">
              <div className="font-semibold text-stone-800 group-hover:text-orange-600 transition-colors text-sm">
                {s.title}
              </div>
              <div className="text-xs text-stone-400 mt-0.5">{s.desc}</div>
            </div>
            <span className="text-stone-300 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all">→</span>
          </Link>
        ))}
      </section>

      {/* 随机格言 */}
      <RandomQuote quotes={quotes} />
    </div>
  );
}
