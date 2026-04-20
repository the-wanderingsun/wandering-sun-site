import fs from "fs";
import path from "path";
import Link from "next/link";

export const revalidate = 3600;

interface Tweet { username: string; name: string; text: string; text_zh?: string; url: string; likes: number; retweets: number; replies: number; views: number; time: number; }
interface MarketItem { symbol: string; price: number; change_24h: number; }
interface NewsItem { title: string; link: string; source: string; pubDate: string; }
interface DigestData { date: string; ai_tweets: Tweet[]; market: MarketItem[]; news: NewsItem[]; ai_digest?: string; ai_digest_date?: string; }

function timeAgo(ts: number) {
  const diff = Math.floor((Date.now() / 1000 - ts) / 3600);
  if (diff < 1) return "刚刚";
  if (diff < 24) return `${diff}小时前`;
  return `${Math.floor(diff / 24)}天前`;
}

export default function DailyPage() {
  let data: DigestData | null = null;
  try {
    const filePath = path.join(process.cwd(), "public/data/digest.json");
    data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch { /* no data yet */ }

  return (
    <div className="space-y-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">📰 每日日报</h1>
          <p className="text-sm text-stone-400 mt-1">
            {data?.date ?? "数据每天 11:00（北京时间）自动更新"}
          </p>
        </div>
        <Link href="/daily/archive"
          className="text-sm text-orange-500 hover:underline shrink-0 mt-1">
          往期日报 →
        </Link>
      </div>

      {!data && (
        <div className="rounded-2xl bg-white border border-orange-100 p-8 text-center text-stone-400">
          <p className="text-4xl mb-3">⏳</p>
          <p>数据还未生成，部署后将在首次自动运行后显示</p>
        </div>
      )}

      {data && (
        <>
          {/* Market */}
          {data.market?.length > 0 && (
            <section>
              <h2 className="text-base font-semibold text-stone-600 mb-3">📈 市场行情</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {data.market.map((m) => (
                  <div key={m.symbol} className="rounded-xl bg-white border border-orange-100 p-4 text-center shadow-sm">
                    <div className="text-xs text-stone-400 mb-1">{m.symbol}</div>
                    <div className="font-semibold text-stone-800">${m.price?.toLocaleString()}</div>
                    <div className={`text-xs mt-1 font-medium ${m.change_24h >= 0 ? "text-emerald-500" : "text-red-400"}`}>
                      {m.change_24h >= 0 ? "▲" : "▼"} {Math.abs(m.change_24h).toFixed(2)}%
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* AI Digest (follow-builders 生成) */}
          {data.ai_digest ? (
            <section>
              <h2 className="text-base font-semibold text-stone-600 mb-3">🤖 AI 圈日报</h2>
              <div className="rounded-2xl bg-white border border-orange-100 p-6 prose prose-stone prose-sm max-w-none
                prose-headings:text-stone-700 prose-headings:font-semibold
                prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline
                prose-hr:border-orange-100 prose-strong:text-stone-700">
                {data.ai_digest.split("\n").map((line, i) => {
                  if (line.startsWith("# ")) return <h1 key={i} className="text-lg font-bold text-stone-800 mb-2">{line.slice(2)}</h1>;
                  if (line.startsWith("## ")) return <h2 key={i} className="text-base font-semibold text-stone-600 mt-6 mb-2">{line.slice(3)}</h2>;
                  if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold text-stone-700 mt-4 mb-1">{line.slice(2, -2)}</p>;
                  if (line.startsWith("- ")) return <p key={i} className="text-sm text-stone-600 pl-3 border-l-2 border-orange-100 my-1">{line.slice(2)}</p>;
                  if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) return <p key={i} className="text-xs text-stone-400 italic my-1">{line.slice(1, -1)}</p>;
                  if (line.startsWith("https://") || line.startsWith("http://")) return <a key={i} href={line} target="_blank" rel="noopener noreferrer" className="block text-xs text-orange-400 hover:underline truncate my-1">{line}</a>;
                  if (line === "---") return <hr key={i} className="border-orange-100 my-4" />;
                  if (line.trim() === "") return <div key={i} className="h-1" />;
                  return <p key={i} className="text-sm text-stone-600 leading-relaxed">{line}</p>;
                })}
              </div>
            </section>
          ) : data.ai_tweets?.length > 0 && (
            <section>
              <h2 className="text-base font-semibold text-stone-600 mb-3">🤖 AI 圈精选</h2>
              <div className="space-y-3">
                {data.ai_tweets.slice(0, 10).map((t, i) => (
                  <a key={i} href={t.url} target="_blank" rel="noopener noreferrer"
                    className="block rounded-2xl bg-white border border-orange-100 p-4 hover:border-orange-300 hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-stone-700">@{t.username}</span>
                      <span className="text-xs text-stone-400">{timeAgo(t.time)}</span>
                    </div>
                    <p className="text-sm text-stone-600 line-clamp-3 leading-relaxed">{t.text_zh || t.text}</p>
                    {t.text_zh && <p className="text-xs text-stone-400 line-clamp-2 mt-1 leading-relaxed">{t.text}</p>}
                    <div className="flex gap-4 mt-3 text-xs text-stone-400">
                      <span>👍 {t.likes?.toLocaleString()}</span>
                      <span>🔁 {t.retweets?.toLocaleString()}</span>
                      <span>💬 {t.replies?.toLocaleString()}</span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* News */}
          {data.news?.length > 0 && (
            <section>
              <h2 className="text-base font-semibold text-stone-600 mb-3">🌐 精选资讯</h2>
              <div className="space-y-2">
                {data.news.map((n, i) => (
                  <a key={i} href={n.link} target="_blank" rel="noopener noreferrer"
                    className="flex items-start gap-3 rounded-xl bg-white border border-orange-100 p-4 hover:border-orange-300 transition-all">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-400 whitespace-nowrap mt-0.5 shrink-0">{n.source}</span>
                    <span className="text-sm text-stone-700 leading-relaxed">{n.title}</span>
                  </a>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
