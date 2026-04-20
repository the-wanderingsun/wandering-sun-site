import fs from "fs";
import path from "path";
import Link from "next/link";

export const revalidate = 3600;

export default function ArchivePage() {
  let dates: string[] = [];
  try {
    const indexPath = path.join(process.cwd(), "public/data/archive/index.json");
    dates = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
  } catch { /* no archive yet */ }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">🗂️ 往期日报</h1>
          <p className="text-sm text-stone-400 mt-1">共 {dates.length} 期</p>
        </div>
        <Link href="/daily" className="text-sm text-orange-500 hover:underline">
          ← 今日日报
        </Link>
      </div>

      {dates.length === 0 && (
        <div className="rounded-2xl bg-white border border-orange-100 p-8 text-center text-stone-400">
          <p className="text-4xl mb-3">📭</p>
          <p>还没有历史记录，部署后每天自动积累</p>
        </div>
      )}

      {dates.length > 0 && (
        <div className="space-y-2">
          {dates.map((date) => {
            const d = new Date(date);
            const label = d.toLocaleDateString("zh-CN", {
              year: "numeric", month: "long", day: "numeric",
            });
            const weekday = d.toLocaleDateString("zh-CN", { weekday: "long" });
            return (
              <Link
                key={date}
                href={`/daily/${date}`}
                className="flex items-center justify-between px-5 py-4 rounded-xl bg-white border border-orange-100 hover:border-orange-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📰</span>
                  <div>
                    <div className="text-sm font-medium text-stone-700">{label}</div>
                    <div className="text-xs text-stone-400">{weekday}</div>
                  </div>
                </div>
                <span className="text-stone-300 text-sm">→</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
