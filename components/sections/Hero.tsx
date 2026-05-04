import Image from 'next/image'

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg-text">NOMAD</div>

      <div className="hero-avatar-wrap">
        <Image
          src="/images/avatar.png"
          className="hero-avatar"
          alt="avatar"
          width={280}
          height={280}
          priority
        />
        <div className="hero-avatar-tag">6 countries · 2857 days</div>
      </div>

      <div className="hero-label">✦ &nbsp; GLOBAL NOMAD SPIRIT · 数字游民生活志</div>
      <h1 className="hero-heading">
        太阳在
        <em>世界游荡</em>
      </h1>
      <div className="hero-bottom">
        <p className="hero-desc">
          Web3 营销人 · 数字游民 · AI 探索者。<br />
          在流动中工作，在创作里认识自己。
        </p>
        <div className="hero-meta">
          <div className="hero-meta-item">
            <span className="hero-meta-label">小红书</span>
            <a className="hero-meta-value" href="https://www.xiaohongshu.com/user/profile/6347e7140000000018028cab" target="_blank" rel="noopener noreferrer">太阳在世界游荡</a>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">PODCAST</span>
            <a className="hero-meta-value" href="https://www.xiaoyuzhoufm.com/podcast/69f2139e0e78214ab607ed4c" target="_blank" rel="noopener noreferrer">小宇宙</a>
          </div>
        </div>
      </div>
      <div className="hero-scroll-hint">SCROLL</div>
    </section>
  )
}
