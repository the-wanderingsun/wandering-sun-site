import Link from "next/link";

const socials = [
  { label: "Twitter / X", href: "https://x.com/MiraLiu66", emoji: "🐦" },
  { label: "小红书", href: "https://www.xiaohongshu.com/user/profile/6347e7140000000018028cab", emoji: "📕" },
  { label: "GitHub", href: "https://github.com/the-wanderingsun", emoji: "🐙" },
];

const sections = [
  { href: "/daily", emoji: "📰", title: "每日日报", desc: "AI 圈动态 · 市场行情 · 精选资讯，每天自动更新" },
  { href: "/github", emoji: "🔨", title: "我在做什么", desc: "GitHub 贡献记录与近期项目" },
  { href: "/podcast", emoji: "🎙️", title: "播客", desc: "Coming Soon" },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="pt-6 space-y-4">
        <div className="text-5xl">☀️</div>
        <h1 className="text-3xl font-bold text-stone-800 tracking-tight">太阳在世界游荡</h1>
        <p className="text-stone-500 text-sm">原名：梅子林</p>
        <div className="space-y-1.5 text-stone-600 text-base leading-relaxed">
          <p>💁‍♀️ 土木转行 Web3</p>
          <p>▶️ Web3 运营 · 分享可复制的转型经验</p>
          <p>🤖 研究 AI · 真实记录用 AI 的过程</p>
          <p>📍 数字游民 · 探索更多生活的可能性</p>
        </div>
        {/* Social links */}
        <div className="flex flex-wrap gap-3 pt-2">
          {socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-orange-100 text-sm text-stone-600 hover:border-orange-300 hover:text-orange-600 transition-colors shadow-sm"
            >
              <span>{s.emoji}</span>
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-orange-100" />

      {/* Navigation cards */}
      <section className="grid gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-orange-100 hover:border-orange-300 hover:shadow-md transition-all"
          >
            <span className="text-3xl">{s.emoji}</span>
            <div className="flex-1">
              <div className="font-semibold text-stone-800 group-hover:text-orange-600 transition-colors">
                {s.title}
              </div>
              <div className="text-sm text-stone-400 mt-0.5">{s.desc}</div>
            </div>
            <span className="text-stone-300 group-hover:text-orange-400 transition-colors">→</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
