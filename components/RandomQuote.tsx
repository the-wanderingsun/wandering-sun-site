"use client";
import { useEffect, useState } from "react";

export default function RandomQuote({ quotes }: { quotes: string[] }) {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    if (quotes.length > 0) {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }
  }, [quotes]);

  if (!quote) return null;

  return (
    <p className="text-xs text-stone-300 italic text-center leading-relaxed pt-4">
      「{quote}」
    </p>
  );
}
