'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import Link from 'next/link'
import { tripData, REGION_COLORS, REGION_LABELS } from '@/lib/tripData'

const RouteMap = dynamic(() => import('@/components/RouteMap'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#f8f7f4', color: '#999', fontSize: 14,
    }}>
      地图加载中…
    </div>
  ),
})

export default function RoadtripPage() {
  const [activeDay, setActiveDay] = useState<number | null>(0)

  const active = activeDay !== null ? tripData[activeDay] : null

  const regions = Array.from(new Set(tripData.map(d => d.region)))

  return (
    <div className="rt-page">
      {/* Header */}
      <div className="rt-header">
        <Link href="/" className="rt-back">← 返回</Link>
        <div>
          <h1 className="rt-title">40天环游中国 · 自驾路书</h1>
          <p className="rt-subtitle">2025年8月25日 — 10月3日 · 平潭出发 · 青神收尾</p>
        </div>
        <div className="rt-stats">
          <span>🗓 40天</span>
          <span>🏙 30+城市</span>
          <span>🚗 约12,000km</span>
          <span>🗺 9省区</span>
        </div>
      </div>

      {/* Legend */}
      <div className="rt-legend">
        {regions.map(r => (
          <span key={r} className="rt-legend-item">
            <span className="rt-legend-dot" style={{ background: REGION_COLORS[r] }} />
            {REGION_LABELS[r]}
          </span>
        ))}
      </div>

      {/* Main layout: map + sidebar */}
      <div className="rt-body">
        {/* Map */}
        <div className="rt-map">
          <RouteMap
            days={tripData}
            activeDay={activeDay}
            onSelectDay={setActiveDay}
          />
        </div>

        {/* Sidebar */}
        <div className="rt-sidebar">
          {/* Active day detail */}
          {active && (
            <div className="rt-detail" style={{ borderLeftColor: REGION_COLORS[active.region] }}>
              <div className="rt-detail-date">{active.date} · Day {active.day}</div>
              <div className="rt-detail-city">{active.cities.join(' · ')}</div>
              <div className="rt-detail-transport">{active.transport}</div>
              <div className="rt-detail-landmarks">
                {active.landmarks.map((l, i) => (
                  <div key={i} className="rt-landmark">
                    <span className="rt-landmark-icon">{l.type}</span>
                    <div>
                      <div className="rt-landmark-name">{l.name}</div>
                      <div className="rt-landmark-desc">{l.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Day list */}
          <div className="rt-daylist">
            {tripData.map((day, idx) => (
              <button
                key={idx}
                className={`rt-day-btn${activeDay === idx ? ' active' : ''}`}
                style={{
                  borderLeftColor: REGION_COLORS[day.region],
                  background: activeDay === idx ? `${REGION_COLORS[day.region]}15` : undefined,
                }}
                onClick={() => setActiveDay(idx)}
              >
                <span className="rt-day-date">{day.date}</span>
                <span className="rt-day-city">{day.cities.join(' · ')}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
