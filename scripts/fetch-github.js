#!/usr/bin/env node
// 抓取 GitHub 数据 → public/data/github.json

const fs = require("fs");
const path = require("path");

const USERNAME = process.env.GITHUB_USERNAME || "the-wanderingsun";
const TOKEN = process.env.GITHUB_TOKEN || "";

const headers = {
  "User-Agent": "wandering-sun-site",
  Accept: "application/vnd.github+json",
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

async function fetchJSON(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${url}`);
  return res.json();
}

async function main() {
  console.log(`Fetching GitHub data for @${USERNAME}...`);

  const [user, repos] = await Promise.all([
    fetchJSON(`https://api.github.com/users/${USERNAME}`),
    fetchJSON(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=10`),
  ]);

  // 贡献数（近30天，用 contributions API 免登录版本）
  let contributions_last_30 = 0;
  try {
    const contribRes = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`
    );
    if (contribRes.ok) {
      const contribData = await contribRes.json();
      const allDays = contribData.contributions ?? [];
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 30);
      contributions_last_30 = allDays
        .filter((d) => new Date(d.date) >= cutoff)
        .reduce((sum, d) => sum + d.count, 0);
    }
  } catch (e) {
    console.warn("Contribution API failed:", e.message);
  }

  const data = {
    username: USERNAME,
    name: user.name,
    bio: user.bio,
    followers: user.followers,
    public_repos: user.public_repos,
    avatar_url: user.avatar_url,
    contributions_last_30,
    repos: repos
      .filter((r) => !r.fork)
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        description: r.description,
        html_url: r.html_url,
        language: r.language,
        stargazers_count: r.stargazers_count,
        updated_at: r.updated_at,
      })),
    updated_at: new Date().toISOString(),
  };

  const outPath = path.join(__dirname, "../public/data/github.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`✓ GitHub data saved → public/data/github.json`);
}

main().catch((e) => { console.error(e); process.exit(1); });
