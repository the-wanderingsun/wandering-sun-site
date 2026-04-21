"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "首页", icon: "☀️" },
  { href: "/blog", label: "博客", icon: "✍️" },
  { href: "/daily", label: "每日日报", icon: "📰" },
  { href: "/links", label: "我的推荐", icon: "🔖" },
  { href: "/github", label: "GitHub", icon: "🛠️" },
  { href: "/podcast", label: "播客", icon: "🎙️" },
];

export default function Nav() {
  const path = usePathname();
  return (
    <>
      {/* 侧边栏（桌面端） */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-52 flex-col bg-[#fdf8f3] border-r border-orange-100 z-20 py-8 px-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-10 group">
          <span className="text-xl">☀️</span>
          <span className="text-sm font-semibold text-stone-700 group-hover:text-orange-500 transition-colors leading-tight">
            太阳在世界游荡
          </span>
        </Link>

        {/* 导航链接 */}
        <nav className="flex flex-col gap-1 flex-1">
          {links.map((l) => {
            const active = l.href === "/" ? path === "/" : path.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  active
                    ? "bg-orange-50 text-orange-500 font-medium"
                    : "text-stone-500 hover:bg-stone-100 hover:text-stone-800"
                }`}
              >
                <span className="text-base">{l.icon}</span>
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* 底部 */}
        <p className="text-xs text-stone-300 mt-4">© {new Date().getFullYear()} 梅子林</p>
      </aside>

      {/* 顶部导航栏（移动端） */}
      <nav className="md:hidden sticky top-0 z-20 bg-[#fdf8f3]/90 backdrop-blur border-b border-orange-100">
        <div className="flex items-center justify-between px-4 h-13">
          <Link href="/" className="font-semibold text-sm text-stone-700">☀️ 太阳在世界游荡</Link>
          <div className="flex gap-4 overflow-x-auto">
            {links.map((l) => {
              const active = l.href === "/" ? path === "/" : path.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-xs whitespace-nowrap py-1 transition-colors ${
                    active ? "text-orange-500 font-medium" : "text-stone-500"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
