'use client'

import type { City } from '@/types'

interface Props {
  city: City
}

export default function CityCard({ city }: Props) {
  return (
    <div className="city-card" id="cityCard">
      <div className="city-card-head">
        <div className="city-card-where">
          <span>{city.region}</span>
          <span className="city-status">
            <span className="city-status-dot" />
            <span>{city.statusText}</span>
          </span>
        </div>
        <div className="city-name">{city.name}</div>
        <div className="city-coords">{city.coords}</div>
      </div>
      <div className="city-card-body">
        <p className="city-desc">{city.desc}</p>
        <div className="city-articles">
          <div className="city-article-label">✦ 旅居攻略</div>
          <div>
            {city.articles.length === 0 ? (
              <div style={{ fontSize: '13px', color: 'var(--fg-muted)', padding: '14px 0' }}>
                暂无攻略文章，即将发布…
              </div>
            ) : (
              city.articles.map((article, i) => (
                <a key={i} href="#" className="city-article-link">
                  <span>{article.title}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <span className="city-tag">{article.tag}</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="city-card-hint">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        拖动地球旋转，点击标记切换城市
      </div>
    </div>
  )
}
