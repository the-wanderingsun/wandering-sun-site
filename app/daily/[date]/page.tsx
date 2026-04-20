import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 86400;

interface Tweet { username: string; name: string; text: string; url: string; likes: number; retweets: number; replies: number; views: number; time: number; }
interface MarketItem { symbol: string; price: number; change_24h: number; }
interface NewsItem { title: string; link: string; source: string; pubDate: string; }
interface DigestData { date: string; dateKey: string; ai_tweets: Tweet[]; market: MarketItem[]; news: NewsItem[]; }

function timeAgo(ts: number) {
  const diff = Math.floor((Date.now() / 1000 - ts) / 3600);
  if (diff < 1) return "刚刚";
  if (diff < 24) return `${diff}小时前`;
  return `${Math.floor(diff / 24)}天前`;
}

export async function generateStaticParams() {
  try {
    const indexPath = path.join(process.cwd(), "public/data/archive/index.json");
    const dates: string[] = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
    return dates.map((date) => ({ date }));
  } catch {
    return [];
  }
}

export default function DateDigestPage({ params }: { params: { date: string } }) {
  let data: DigestData | null = null;
  try {
    const filePath = path.join(process.cwd(), `public/data/archive/digest-${params.date}.json`);
    data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    notFound();
  }

  return (
    <div className="space-y-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">📰 {data!.date}</h1>
          <p className="text-sm text-stone-400 mt-1">历史日报</p>
        </div>
        <Link href="/daily/archive" className="text-sm text-orange-500 hover:underline shrink-0">
          ← 往期列表
        </Link>
      </div>

      {/* Market */}
      {data!.market?.length > 0 && (
        <section>
          <h2 className="text-base font-semibold text-stone-600 mb-3">📈 市场行情</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {data!.market.map((m) => (
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

      {/* AI Tweets */}
      {data!.ai_tweets?.length > 0 && (
        <section>
          <h2 className="text-base font-semibold text-stone-600 mb-3">🤖 AI 圈精选</h2>
          <div className="space-y-3">
            {data!.ai_tweets.slice(0, 10).map((t, i) => (
              <a key={i} href={t.url} target="_blank" rel="noopener noreferrer"
                className="block rounded-2xl bg-white border border-orange-100 p-4 hover:border-orange-300 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-stone-700">@{t.username}</span>
                  <span className="text-xs text-stone-400">{timeAgo(t.time)}</span>
                </div>
                <p className="text-sm text-stone-600 line-clamp-3 leading-relaxed">{t.text}</p>
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
      {data!.news?.length > 0 && (
        <section>
          <h2 className="text-base font-semibold text-stone-600 mb-3">🌐 精选资讯</h2>
          <div className="space-y-2">
            {data!.news.map((n, i) => (
              <a key={i} href={n.link} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-xl bg-white border border-orange-100 p-4 hover:border-orange-300 transition-all">
                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-400 whitespace-nowrap mt-0.5 shrink-0">{n.source}</span>
                <span className="text-sm text-stone-700 leading-relaxed">{n.title}</span>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
