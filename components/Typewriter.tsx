"use client";
import { useEffect, useState } from "react";

export default function Typewriter({ texts }: { texts: string[] }) {
  const [displayed, setDisplayed] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const current = texts[lineIdx];
    if (charIdx < current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 40);
      return () => clearTimeout(t);
    }
    // 当前行打完，等一下再换行
    if (lineIdx < texts.length - 1) {
      const t = setTimeout(() => {
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, 600);
      return () => clearTimeout(t);
    }
    setDone(true);
  }, [charIdx, lineIdx, texts, done]);

  useEffect(() => {
    const current = texts[lineIdx];
    setDisplayed(current?.slice(0, charIdx) ?? "");
  }, [charIdx, lineIdx, texts]);

  const completedLines = texts.slice(0, lineIdx);
  const currentLine = displayed;

  return (
    <div className="space-y-1.5 text-stone-600 text-base leading-relaxed">
      {completedLines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
      <p>
        {currentLine}
        {!done && <span className="animate-pulse text-orange-400">|</span>}
      </p>
    </div>
  );
}
