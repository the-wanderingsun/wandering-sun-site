export default function PodcastPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">🎙️ 播客</h1>
        <p className="text-sm text-stone-400 mt-1">敬请期待</p>
      </div>
      <div className="rounded-2xl bg-white border border-orange-100 p-12 text-center space-y-3">
        <p className="text-5xl">🎙️</p>
        <p className="text-lg font-medium text-stone-700">Coming Soon</p>
        <p className="text-sm text-stone-400">播客还在筹备中，有想法或合作可以在 Twitter 找到我</p>
        <a
          href="https://x.com/MiraLiu66"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 px-5 py-2 rounded-full bg-orange-50 border border-orange-200 text-sm text-orange-500 hover:bg-orange-100 transition-colors"
        >
          去 Twitter 聊聊 →
        </a>
      </div>
    </div>
  );
}
