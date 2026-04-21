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
}

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
      return { slug, ...meta };
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
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-2xl bg-white border border-orange-100 p-5 hover:border-orange-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-stone-800 text-base leading-snug">{post.title}</h2>
                {post.summary && (
                  <p className="text-sm text-stone-500 mt-1 line-clamp-2 leading-relaxed">{post.summary}</p>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {post.date && (
                <span className="text-xs text-stone-400 whitespace-nowrap shrink-0 mt-0.5">{post.date}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
