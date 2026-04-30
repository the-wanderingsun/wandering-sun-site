import { EPISODES, FEATURED_EPISODE } from '@/content/episodes'
import Player from './Player'

export default function Podcast() {
  return (
    <section id="podcast" className="section-border">
      <div className="section-header">
        <h2 className="section-title">VOICE.</h2>
        <p className="section-sub">声音是另一种旅行 · LISTENING AS TRAVELING</p>
      </div>
      <div className="podcast-body">
        <Player episode={FEATURED_EPISODE} />
        <div className="podcast-episodes">
          <div style={{ fontSize: '10px', letterSpacing: '.2em', color: 'var(--fg-muted)', textTransform: 'uppercase', marginBottom: '16px' }}>
            最新单集
          </div>
          {EPISODES.map((ep) => (
            <div key={ep.num} className="ep-item">
              <div className="ep-num">{ep.num}</div>
              <div className="ep-info">
                <div className="ep-title">{ep.title}</div>
                <div className="ep-meta">{ep.date} · {Math.round(ep.durationSec / 60)}min</div>
              </div>
              <div className="ep-duration">{ep.duration}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
