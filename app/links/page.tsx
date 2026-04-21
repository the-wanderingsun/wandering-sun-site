import fs from "fs";
import path from "path";

export const revalidate = 3600;

interface LinkItem { name: string; url: string; desc: string; emoji: string; }
interface LinkCategory { category: string; items: LinkItem[]; }

function getLinks(): LinkCategory[] {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/links.json"), "utf-8"));
  } catch { return []; }
}

export default function LinksPage() {
  const categories = getLinks();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">🔖 我的推荐</h1>
        <p className="text-sm text-stone-400 mt-1">值得分享的网站、工具与内容 — 都是我自己在用或读的</p>
      </div>

      {categories.map((cat) => (
        <section key={cat.category} className="space-y-3">
          <h2 className="text-xs font-semibold text-orange-400 uppercase tracking-widest">{cat.category}</h2>
          <div className="space-y-2">
            {cat.items.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-4 rounded-2xl bg-white border border-orange-100 hover:border-orange-300 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="text-2xl shrink-0 mt-0.5">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-stone-800 group-hover:text-orange-600 transition-colors text-sm">
                    {item.name}
                  </div>
                  <div className="text-xs text-stone-400 mt-1 leading-relaxed">{item.desc}</div>
                </div>
                <span className="text-stone-300 group-hover:text-orange-400 shrink-0 mt-1 group-hover:translate-x-0.5 transition-all">↗</span>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
