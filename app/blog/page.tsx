import fs from "fs";
import path from "path";
import Link from "next/link";

export const revalidate = 3600;

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags?: string[];
  color?: string;
  readingTime?: number;
}

const CARD_COLORS = [
  "bg-orange-400", "bg-amber-400", "bg-rose-400",
  "bg-teal-400", "bg-violet-400", "bg-sky-400",
];

function getPosts(): PostMeta[] {
  const dir = path.join(process.cwd(), "content/blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, f), "utf-8");
      const meta = parseFrontmatter(raw);
      const content = raw.replace(/^---[\s\S]*?---/, "").trim();
      const wordCount = content.replace(/\s+/g, "").length;
      const readingTime = Math.max(1, Math.ceil(wordCount / 300));
      return { slug, ...meta, readingTime };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { title: "无标题", date: "", summary: "", tags: [] };
  const fm: Record<string, string> = {};
  match[1].split("\n").forEach((line) => {
    const [k, ...v] = line.split(": ");
    if (k) fm[k.trim()] = v.join(": ").trim().replace(/^["']|["']$/g, "");
  });
  return {
    title: fm.title ?? "无标题",
    date: fm.date ?? "",
    summary: fm.summary ?? "",
    tags: fm.tags ? fm.tags.split(",").map((t) => t.trim()) : [],
  };
}

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">✍️ 博客</h1>
        <p className="text-sm text-stone-400 mt-1">记录思考、观察与随笔</p>
      </div>

      {posts.length === 0 && (
        <div className="rounded-2xl bg-white border border-orange-100 p-10 text-center text-stone-400">
          <p className="text-4xl mb-3">📝</p>
          <p>还没有文章，快来写第一篇吧</p>
          <p className="text-xs mt-2 text-stone-300">在 content/blog/ 目录下创建 .md 文件</p>
        </div>
      )}

      <div className="space-y-3">
        {posts.map((post, idx) => {
          const color = post.color ?? CARD_COLORS[idx % CARD_COLORS.length];
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex rounded-2xl bg-white border border-orange-100 hover:border-orange-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
            >
              {/* 左侧色条 */}
              <div className={`w-1 shrink-0 ${color} opacity-70 group-hover:opacity-100 transition-opacity`} />
              <div className="flex-1 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-stone-800 text-base leading-snug group-hover:text-orange-600 transition-colors">{post.title}</h2>
                    {post.summary && (
                      <p className="text-sm text-stone-500 mt-1 line-clamp-2 leading-relaxed">{post.summary}</p>
                    )}
                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      {post.tags?.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-400">{tag}</span>
                      ))}
                      <span className="text-xs text-stone-300">约 {post.readingTime} 分钟</span>
                    </div>
                  </div>
                  {post.date && (
                    <span className="text-xs text-stone-400 whitespace-nowrap shrink-0 mt-0.5">{post.date}</span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
