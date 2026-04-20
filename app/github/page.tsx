import fs from "fs";
import path from "path";
import Link from "next/link";

export const revalidate = 3600;

interface Repo { name: string; description: string; html_url: string; language: string; stargazers_count: number; updated_at: string; }
interface GitHubData { username: string; name: string; bio: string; followers: number; public_repos: number; repos: Repo[]; contributions_last_30: number; }

const langColors: Record<string, string> = {
  TypeScript: "bg-blue-400", JavaScript: "bg-yellow-400", Python: "bg-green-400",
  Rust: "bg-orange-500", Go: "bg-cyan-400", CSS: "bg-pink-400", HTML: "bg-red-400",
};

export default function GitHubPage() {
  let data: GitHubData | null = null;
  try {
    const filePath = path.join(process.cwd(), "public/data/github.json");
    data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch { /* no data yet */ }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">🔨 我在做什么</h1>
        <p className="text-sm text-stone-400 mt-1">GitHub 活动记录</p>
      </div>

      {!data && (
        <div className="rounded-2xl bg-white border border-orange-100 p-8 text-center text-stone-400">
          <p className="text-4xl mb-3">⏳</p>
          <p>数据还未生成，部署后将在首次自动运行后显示</p>
          <Link href="https://github.com/the-wanderingsun" target="_blank"
            className="mt-4 inline-block text-sm text-orange-500 hover:underline">
            直接访问 GitHub →
          </Link>
        </div>
      )}

      {data && (
        <>
          {/* Profile card */}
          <div className="rounded-2xl bg-white border border-orange-100 p-6 flex items-center gap-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-2xl shrink-0">☀️</div>
            <div className="flex-1">
              <div className="font-semibold text-stone-800">{data.name ?? data.username}</div>
              <div className="text-sm text-stone-500 mt-0.5">{data.bio}</div>
              <div className="flex gap-4 mt-2 text-xs text-stone-400">
                <span>👥 {data.followers} followers</span>
                <span>📦 {data.public_repos} repos</span>
                {data.contributions_last_30 > 0 && (
                  <span>🔥 近30天 {data.contributions_last_30} contributions</span>
                )}
              </div>
            </div>
            <a href={`https://github.com/${data.username}`} target="_blank" rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 rounded-full border border-orange-200 text-orange-500 hover:bg-orange-50 transition-colors shrink-0">
              GitHub →
            </a>
          </div>

          {/* Repos */}
          <section>
            <h2 className="text-base font-semibold text-stone-600 mb-3">近期项目</h2>
            <div className="space-y-3">
              {data.repos?.slice(0, 6).map((r) => (
                <a key={r.name} href={r.html_url} target="_blank" rel="noopener noreferrer"
                  className="block rounded-2xl bg-white border border-orange-100 p-4 hover:border-orange-300 hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-stone-800">{r.name}</span>
                    {r.stargazers_count > 0 && (
                      <span className="text-xs text-stone-400">⭐ {r.stargazers_count}</span>
                    )}
                  </div>
                  {r.description && (
                    <p className="text-sm text-stone-500 mt-1">{r.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    {r.language && (
                      <span className="flex items-center gap-1 text-xs text-stone-400">
                        <span className={`w-2 h-2 rounded-full ${langColors[r.language] ?? "bg-stone-400"}`} />
                        {r.language}
                      </span>
                    )}
                    <span className="text-xs text-stone-300">
                      更新于 {new Date(r.updated_at).toLocaleDateString("zh-CN")}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
