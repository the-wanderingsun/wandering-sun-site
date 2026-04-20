#!/usr/bin/env node
// 把 follow-builders 生成的 AI 日报内容写入 digest.json
// 用法：node scripts/save-ai-digest.js "日报内容文本"
//   或：cat /tmp/digest.md | node scripts/save-ai-digest.js

const fs = require("fs");
const path = require("path");

async function main() {
  let content = "";

  // 从命令行参数读取，或从 stdin 读取
  if (process.argv[2]) {
    content = process.argv[2];
  } else {
    content = fs.readFileSync("/dev/stdin", "utf-8");
  }

  if (!content.trim()) {
    console.error("❌ 没有收到内容，请提供日报文本");
    process.exit(1);
  }

  const dataDir = path.join(__dirname, "../public/data");
  const digestPath = path.join(dataDir, "digest.json");

  // 读取现有 digest.json
  let digest = {};
  try {
    digest = JSON.parse(fs.readFileSync(digestPath, "utf-8"));
  } catch {
    console.warn("⚠️  digest.json 不存在，将创建新文件");
  }

  // 写入 ai_digest 字段
  const todayKey = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Shanghai" });
  digest.ai_digest = content.trim();
  digest.ai_digest_date = todayKey;

  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(digestPath, JSON.stringify(digest, null, 2));

  // 同步更新存档文件
  const archivePath = path.join(dataDir, `archive/digest-${todayKey}.json`);
  if (fs.existsSync(archivePath)) {
    const archive = JSON.parse(fs.readFileSync(archivePath, "utf-8"));
    archive.ai_digest = content.trim();
    archive.ai_digest_date = todayKey;
    fs.writeFileSync(archivePath, JSON.stringify(archive, null, 2));
    console.log(`✓ 存档已更新 → public/data/archive/digest-${todayKey}.json`);
  }

  console.log("✓ AI 日报已保存 → public/data/digest.json");
}

main().catch((e) => { console.error(e); process.exit(1); });
