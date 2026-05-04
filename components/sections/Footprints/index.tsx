'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import type { City } from '@/types'
import { CITIES } from '@/content/cities'
import CityCard from './CityCard'

const GlobeClient = dynamic(() => import('./GlobeClient'), { ssr: false })

const DOT_COLOR: Record<string, string> = {
  current: '#ff5e14',
  lived:   '#f5a623',
  visited: '#7a3a10',
}

export default function Footprints() {
  const [activeCity, setActiveCity] = useState<City>(CITIES[0])

  return (
    <section id="footprints">
      <div className="fp-body">
        {/* Left: globe + city nav */}
        <div className="fp-left">
          <GlobeClient cities={CITIES} onCitySelect={setActiveCity} activeCity={activeCity} />

          {/* 底部城市导航条 */}
          <div className="fp-city-nav">
            {CITIES.map((city) => (
              <button
                key={city.id}
                className={`fp-city-btn${activeCity.id === city.id ? ' active' : ''}`}
                onClick={() => setActiveCity(city)}
              >
                <span
                  className="fp-city-dot-nav"
                  style={{
                    background: DOT_COLOR[city.type],
                    boxShadow: city.type === 'current' ? `0 0 5px ${DOT_COLOR[city.type]}` : 'none',
                  }}
                />
                {city.name}
              </button>
            ))}
          </div>

          {/* 图例 */}
          <div className="globe-legend fp-legend">
            <div className="legend-item">
              <div className="legend-dot" style={{ background: '#ff5e14', boxShadow: '0 0 6px #ff5e14' }} />
              当前
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ background: '#f5a623', boxShadow: '0 0 5px #f5a623' }} />
              旅居
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ background: '#7a3a10' }} />
              路过
            </div>
          </div>
        </div>

        {/* Right: title + city card */}
        <div className="fp-right">
          <div className="fp-header">
            <h2 className="section-title" style={{ margin: 0 }}>FOOTPRINTS.</h2>
            <p className="section-sub" style={{ margin: '10px 0 0' }}>点击城市名或地球标记，查看旅居点评</p>
          </div>
          {/* key 变化时强制重挂载，触发入场动画 */}
          <CityCard key={activeCity.id} city={activeCity} />
        </div>
      </div>
    </section>
  )
}
