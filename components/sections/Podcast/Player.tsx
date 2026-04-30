'use client'

import { useEffect, useRef, useState } from 'react'
import type { Episode } from '@/types'

interface Props {
  episode: Episode
}

const BARS = 52

export default function Player({ episode }: Props) {
  const [playing, setPlaying] = useState(false)
  const [podPct, setPodPct] = useState(0.36)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  // SSR 用固定高度 50 占位，客户端 mount 后替换为随机高度
  // 保证 server/client 首次渲染一致，避免 hydration mismatch
  const [heights, setHeights] = useState<number[]>(() => Array(BARS).fill(50))

  useEffect(() => {
    setHeights(Array.from({ length: BARS }, () => 20 + Math.random() * 80))
  }, [])

  const totalSec = episode.durationSec
  const curSec = Math.round(totalSec * podPct)
  const curM = String(Math.floor(curSec / 60)).padStart(2, '0')
  const curS = String(curSec % 60).padStart(2, '0')

  function togglePlay() {
    if (playing) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setPlaying(false)
    } else {
      setPlaying(true)
      intervalRef.current = setInterval(() => {
        setPodPct((prev) => {
          const next = Math.min(1, prev + 1 / totalSec)
          if (next >= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current)
            setPlaying(false)
          }
          return next
        })
      }, 1000)
    }
  }

  function seekPod(sec: number) {
    setPodPct((prev) => Math.max(0, Math.min(1, prev + sec / totalSec)))
  }

  function handleWaveClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    setPodPct((e.clientX - rect.left) / rect.width)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="podcast-player">
      <div className="podcast-ep-num">EP. {episode.num}</div>
      <h3 className="podcast-ep-title">{episode.title}</h3>
      <p className="podcast-ep-desc">
        走进清迈最著名的共享办公空间，和来自不同国家的数字游民聊了聊：自由的代价是什么，他们又在寻找什么。
      </p>
      <div className="podcast-waveform" onClick={handleWaveClick}>
        {heights.map((h, i) => (
          <div
            key={i}
            className={`wave-bar${i / BARS < podPct ? ' played' : ''}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="podcast-progress">
        <span>{curM}:{curS}</span>
        <span>{episode.duration}</span>
      </div>
      <div className="podcast-controls">
        <button className="pod-btn" onClick={() => seekPod(-15)} aria-label="后退15秒">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
          </svg>
        </button>
        <button
          className={`pod-btn pod-btn-play${playing ? ' playing' : ''}`}
          onClick={togglePlay}
          aria-label={playing ? '暂停' : '播放'}
        >
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>
        <button className="pod-btn" onClick={() => seekPod(15)} aria-label="前进15秒">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-.49-3.51" />
          </svg>
        </button>
        <div style={{ fontSize: '12px', color: 'var(--fg-dim)', marginLeft: '8px', letterSpacing: '.04em' }}>
          小宇宙 · Apple Podcasts
        </div>
      </div>
    </div>
  )
}
