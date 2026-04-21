import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600;

function getPost(slug: string) {
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { title: slug, date: "", tags: [], content: raw };
  const fm: Record<string, string> = {};
  match[1].split("\n").forEach((line) => {
    const [k, ...v] = line.split(": ");
    if (k) fm[k.trim()] = v.join(": ").trim().replace(/^["']|["']$/g, "");
  });
  return {
    title: fm.title ?? slug,
    date: fm.date ?? "",
    summary: fm.summary ?? "",
    tags: fm.tags ? fm.tags.split(",").map((t) => t.trim()) : [],
    content: match[2].trim(),
  };
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ slug: f.replace(/\.md$/, "") }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  // 简单的 Markdown 渲染（段落、标题、粗体、链接）
  const renderContent = (md: string) => {
    return md.split("\n\n").map((block, i) => {
      if (block.startsWith("### ")) return <h3 key={i} className="text-base font-semibold text-stone-700 mt-6 mb-2">{block.slice(4)}</h3>;
      if (block.startsWith("## ")) return <h2 key={i} className="text-lg font-semibold text-stone-800 mt-8 mb-3">{block.slice(3)}</h2>;
      if (block.startsWith("# ")) return <h1 key={i} className="text-xl font-bold text-stone-800 mt-8 mb-3">{block.slice(2)}</h1>;
      if (block.startsWith("- ") || block.startsWith("* ")) {
        const items = block.split("\n").filter(l => l.startsWith("- ") || l.startsWith("* "));
        return <ul key={i} className="list-disc pl-5 space-y-1 my-3">{items.map((item, j) => <li key={j} className="text-stone-600 text-sm leading-relaxed">{item.slice(2)}</li>)}</ul>;
      }
      if (block.startsWith("> ")) return <blockquote key={i} className="border-l-4 border-orange-200 pl-4 my-4 text-stone-500 italic text-sm">{block.slice(2)}</blockquote>;
      return <p key={i} className="text-stone-600 text-sm leading-relaxed my-3">{block}</p>;
    });
  };

  return (
    <div className="space-y-8">
      {/* 返回 */}
      <Link href="/blog" className="text-sm text-orange-500 hover:underline inline-flex items-center gap-1">
        ← 所有文章
      </Link>

      {/* 文章头部 */}
      <div>
        <h1 className="text-2xl font-bold text-stone-800 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-3 mt-3 flex-wrap">
          {post.date && <span className="text-sm text-stone-400">{post.date}</span>}
          {post.tags?.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-400">{tag}</span>
          ))}
        </div>
        {post.summary && <p className="text-stone-500 mt-3 text-sm leading-relaxed">{post.summary}</p>}
      </div>

      {/* 分割线 */}
      <hr className="border-orange-100" />

      {/* 文章正文 */}
      <article className="min-h-40">
        {renderContent(post.content)}
      </article>
    </div>
  );
}
