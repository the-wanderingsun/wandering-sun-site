#!/usr/bin/env node
// 聚合三类日报数据 → public/data/digest.json
// 1. 加密市场行情（surf CLI）
// 2. AI 圈推文（surf social-user-posts，取关注列表高互动推文）
// 3. 自定义新闻 RSS

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ── 配置：关注的 X 账号 ────────────────────────────────
const TWITTER_HANDLES = [
  "karpathy", "sama", "ylecun", "op7418", "dotey",
  "0xCheshire", "zarazhangrui", "steipete", "emollick",
];

// ── 配置：加密行情关注币种 ─────────────────────────────
const COINS = ["BTC", "ETH", "SOL", "BNB"];

// ── 配置：RSS 新闻源 ──────────────────────────────────
const RSS_SOURCES = [
  { name: "少数派", url: "https://sspai.com/feed" },
  { name: "机器之心", url: "https://www.jiqizhixin.com/rss" },
  { name: "阮一峰周刊", url: "https://www.ruanyifeng.com/blog/atom.xml" },
  { name: "The Block", url: "https://www.theblock.co/rss.xml" },
  { name: "Decrypt", url: "https://decrypt.co/feed" },
  { name: "Ben's Bites", url: "https://bensbites.beehiiv.com/feed" },
];

const SURF_BIN = process.env.SURF_BIN || `${process.env.HOME}/.local/bin/surf`;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

// ── 工具函数 ──────────────────────────────────────────

function runSurf(args) {
  try {
    const result = execSync(`${SURF_BIN} ${args} -o json 2>/dev/null`, {
      encoding: "utf-8",
      timeout: 30000,
    });
    const parsed = JSON.parse(result);
    return parsed?.body?.data ?? parsed?.data ?? parsed;
  } catch (e) {
    console.warn(`surf ${args} failed:`, e.message.slice(0, 100));
    return null;
  }
}

async function fetchRSS(source) {
  try {
    const Parser = require("rss-parser");
    const parser = new Parser({ timeout: 10000 });
    const feed = await parser.parseURL(source.url);
    const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000); // 48h
    return feed.items
      .filter((item) => !item.isoDate || new Date(item.isoDate) >= cutoff)
      .slice(0, 5)
      .map((item) => ({
        title: item.title?.replace(/<[^>]+>/g, "").trim(),
        link: item.link,
        source: source.name,
        pubDate: item.isoDate,
      }));
  } catch (e) {
    console.warn(`RSS ${source.name} failed:`, e.message.slice(0, 80));
    return [];
  }
}

// ── 抓取市场行情（CryptoCompare，无需 key）────────────
async function fetchMarket() {
  const https = require("https");
  return new Promise((resolve) => {
    const url = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,SOL,BNB&tsyms=USD";
    const req = https.get(url, { timeout: 15000 }, (res) => {
      let raw = "";
      res.on("data", (c) => raw += c);
      res.on("end", () => {
        try {
          const json = JSON.parse(raw);
          const raw2 = json?.RAW;
          if (!raw2) { console.warn("Market API unexpected:", JSON.stringify(json).slice(0, 100)); return resolve([]); }
          const result = ["BTC", "ETH", "SOL", "BNB"].map((symbol) => {
            const d = raw2[symbol]?.USD;
            if (!d) return null;
            return { symbol, price: d.PRICE, change_24h: d.CHANGEPCT24HOUR };
          }).filter(Boolean);
          resolve(result);
        } catch (e) { console.warn("Market parse failed:", e.message); resolve([]); }
      });
    });
    req.on("error", (e) => { console.warn("Market fetch failed:", e.message); resolve([]); });
    req.on("timeout", () => { req.destroy(); console.warn("Market fetch timeout"); resolve([]); });
  });
}

// ── 翻译推文（Claude API）────────────────────────────
async function translateTweets(tweets) {
  if (!ANTHROPIC_API_KEY || tweets.length === 0) return tweets;
  try {
    const Anthropic = require("@anthropic-ai/sdk");
    const client = new Anthropic.default({ apiKey: ANTHROPIC_API_KEY });

    const input = tweets.map((t, i) => `[${i}] @${t.username}: ${t.text}`).join("\n\n");

    const msg = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 4096,
      messages: [{
        role: "user",
        content: `将以下推文翻译并压缩总结为中文，每条控制在80字以内，保留关键信息和技术术语。输出格式严格为JSON数组，每个元素只有一个字段 "zh"，顺序与输入一致。

${input}

输出示例：[{"zh":"翻译内容"},{"zh":"翻译内容"}]
只输出JSON，不要其他文字。`
      }]
    });

    const json = JSON.parse(msg.content[0].text.trim());
    return tweets.map((t, i) => ({
      ...t,
      text_zh: json[i]?.zh ?? "",
    }));
  } catch (e) {
    console.warn("Translation failed:", e.message.slice(0, 100));
    return tweets;
  }
}

// ── 抓取推文 ──────────────────────────────────────────
function fetchTweets() {
  const cutoff = Math.floor(Date.now() / 1000) - 86400;
  const all = [];
  for (const handle of TWITTER_HANDLES) {
    const data = runSurf(`social-user-posts --handle ${handle} --limit 20 --filter original`);
    if (!Array.isArray(data)) continue;
    for (const t of data) {
      if ((t.created_at ?? 0) < cutoff) continue;
      all.push({
        username: t.author?.handle ?? handle,
        name: t.author?.name ?? handle,
        text: t.text,
        url: t.url,
        time: t.created_at,
        likes: t.stats?.likes ?? 0,
        retweets: t.stats?.reposts ?? 0,
        replies: t.stats?.replies ?? 0,
        views: t.stats?.views ?? 0,
      });
    }
  }
  // 按互动量排序，取前 15 条
  return all
    .sort((a, b) => (b.likes + b.retweets * 2) - (a.likes + a.retweets * 2))
    .slice(0, 15);
}

// ── 主函数 ────────────────────────────────────────────
async function main() {
  console.log("Fetching digest data...");

  const [market, newsArrays] = await Promise.all([
    fetchMarket(),
    Promise.all(RSS_SOURCES.map(fetchRSS)),
  ]);

  const tweetsRaw = fetchTweets();
  const tweets = await translateTweets(tweetsRaw);
  const news = newsArrays.flat().sort((a, b) => {
    const ta = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const tb = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return tb - ta;
  }).slice(0, 20);

  // 今天的日期字符串，用于存档文件名
  const todayKey = new Date()
    .toLocaleDateString("sv-SE", { timeZone: "Asia/Shanghai" }); // "2026-04-20"

  const digest = {
    date: new Date().toLocaleDateString("zh-CN", {
      year: "numeric", month: "long", day: "numeric",
      timeZone: "Asia/Shanghai",
    }),
    dateKey: todayKey,
    updated_at: new Date().toISOString(),
    market,
    ai_tweets: tweets,
    news,
  };

  const dataDir = path.join(__dirname, "../public/data");
  fs.mkdirSync(dataDir, { recursive: true });

  // 1. 覆盖最新快照（供首页 /daily 直接读取）
  fs.writeFileSync(path.join(dataDir, "digest.json"), JSON.stringify(digest, null, 2));

  // 2. 存档当日数据（供历史页面读取）
  const archiveDir = path.join(dataDir, "archive");
  fs.mkdirSync(archiveDir, { recursive: true });
  fs.writeFileSync(path.join(archiveDir, `digest-${todayKey}.json`), JSON.stringify(digest, null, 2));

  // 3. 更新日期索引文件（供归档列表页读取）
  const indexPath = path.join(archiveDir, "index.json");
  let index = [];
  try { index = JSON.parse(fs.readFileSync(indexPath, "utf-8")); } catch { /* 首次运行 */ }
  if (!index.includes(todayKey)) {
    index = [todayKey, ...index].sort((a, b) => b.localeCompare(a)); // 最新日期在前
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
  }

  console.log(`✓ Digest saved → public/data/digest.json`);
  console.log(`✓ Archive saved → public/data/archive/digest-${todayKey}.json`);
  console.log(`  Market: ${market.length} coins`);
  console.log(`  Tweets: ${tweets.length}`);
  console.log(`  News: ${news.length}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
