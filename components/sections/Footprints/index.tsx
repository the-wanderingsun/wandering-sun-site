'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import type { City } from '@/types'
import { CITIES } from '@/content/cities'
import CityCard from './CityCard'

// Globe must be dynamically imported with ssr:false (WebGL + window access)
const GlobeClient = dynamic(() => import('./GlobeClient'), { ssr: false })

export default function Footprints() {
  const [activeCity, setActiveCity] = useState<City>(CITIES[0])

  return (
    <section id="footprints">
      <div className="fp-body">
        {/* Left: globe */}
        <div className="fp-left">
          <GlobeClient cities={CITIES} onCitySelect={setActiveCity} />
          <div className="globe-legend fp-legend">
            <div className="legend-item">
              <div className="legend-dot" style={{ background: '#00eeff', boxShadow: '0 0 6px #00eeff' }} />
              当前
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ background: '#4488ff', boxShadow: '0 0 5px #4488ff' }} />
              旅居
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ background: '#334466' }} />
              路过
            </div>
          </div>
        </div>

        {/* Right: title + city card */}
        <div className="fp-right">
          <div className="fp-header">
            <h2 className="section-title" style={{ margin: 0 }}>FOOTPRINTS.</h2>
            <p className="section-sub" style={{ margin: '10px 0 0' }}>点击地球标记，查看旅居点评</p>
          </div>
          <CityCard city={activeCity} />
        </div>
      </div>
    </section>
  )
}
