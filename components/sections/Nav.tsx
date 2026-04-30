'use client'

import { useEffect, useState } from 'react'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function Nav() {
  const [time, setTime] = useState('--:--')

  useEffect(() => {
    function updateClock() {
      const now = new Date()
      const h = String(now.getHours()).padStart(2, '0')
      const m = String(now.getMinutes()).padStart(2, '0')
      setTime(`${h}:${m}`)
    }
    updateClock()
    const id = setInterval(updateClock, 10000)
    return () => clearInterval(id)
  }, [])

  return (
    <nav>
      <a className="nav-logo" href="#">WANDERING SUN.</a>
      <span className="nav-clock">
        <span className="nav-clock-dot" />
        <span>{time}</span>
      </span>
      <div className="nav-links">
        <a href="#footprints">足迹</a>
        <a href="#blog">沉淀</a>
        <a href="#podcast">声音</a>
        <a href="#flash">闪念</a>
      </div>
      <ThemeToggle />
      <a href="#footer" className="nav-cta">CONNECT</a>
    </nav>
  )
}
