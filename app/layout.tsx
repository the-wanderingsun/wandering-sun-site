import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "太阳在世界游荡",
  description: "土木转行 Web3 · AI 研究 · 数字游民",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className={`${geist.variable} antialiased`}>
      <body className="min-h-screen bg-[#fdf8f3]">
        <Nav />
        {/* 桌面端：内容区向右偏移侧边栏宽度 */}
        <div className="md:pl-52">
          <main className="max-w-2xl mx-auto px-6 py-10">{children}</main>
          <footer className="max-w-2xl mx-auto px-6 py-8 text-center text-sm text-stone-400">
            © {new Date().getFullYear()} 太阳在世界游荡
          </footer>
        </div>
      </body>
    </html>
  );
}
