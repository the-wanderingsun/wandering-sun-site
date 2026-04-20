"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "首页" },
  { href: "/daily", label: "每日日报" },
  { href: "/github", label: "GitHub" },
  { href: "/podcast", label: "播客" },
];

export default function Nav() {
  const path = usePathname();
  return (
    <nav className="sticky top-0 z-10 bg-[#fdf8f3]/80 backdrop-blur border-b border-orange-100">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-stone-700 hover:text-orange-500 transition-colors">
          ☀️ 太阳在世界游荡
        </Link>
        <div className="flex gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${
                path === l.href
                  ? "text-orange-500 font-medium"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
