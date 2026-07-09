'use client'

import { useEffect, useRef } from 'react'
import type { TripDay } from '@/lib/tripData'
import { REGION_COLORS } from '@/lib/tripData'

interface Props {
  days: TripDay[]
  activeDay: number | null
  onSelectDay: (day: number) => void
}

export default function RouteMap({ days, activeDay, onSelectDay }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)
  const markersRef = useRef<unknown[]>([])

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Dynamic import to avoid SSR
    import('leaflet').then((L) => {
      // Fix default marker icons
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(mapRef.current!, {
        center: [36, 100],
        zoom: 4,
        zoomControl: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map)

      // Draw route polyline
      const routePoints = days.map((d) => [d.lat, d.lng] as [number, number])
      L.polyline(routePoints, {
        color: '#f97316',
        weight: 2.5,
        opacity: 0.6,
        dashArray: '6 4',
      }).addTo(map)

      // Add markers for each stop
      days.forEach((day, idx) => {
        const color = REGION_COLORS[day.region]
        const isActive = activeDay === idx

        const icon = L.divIcon({
          className: '',
          html: `<div style="
            width:${isActive ? 18 : 12}px;
            height:${isActive ? 18 : 12}px;
            background:${color};
            border:2.5px solid white;
            border-radius:50%;
            box-shadow:0 1px 4px rgba(0,0,0,0.35);
            cursor:pointer;
          "></div>`,
          iconSize: [isActive ? 18 : 12, isActive ? 18 : 12],
          iconAnchor: [isActive ? 9 : 6, isActive ? 9 : 6],
        })

        const popupContent = `
          <div style="min-width:160px;font-family:system-ui,sans-serif">
            <div style="font-weight:700;font-size:14px;margin-bottom:4px">${day.cities.join(' · ')}</div>
            <div style="font-size:11px;color:#888;margin-bottom:6px">${day.date} · Day ${day.day}</div>
            ${day.landmarks.slice(0, 3).map(l =>
              `<div style="font-size:12px;margin-bottom:2px">${l.type} ${l.name}</div>`
            ).join('')}
          </div>
        `

        const marker = L.marker([day.lat, day.lng], { icon })
          .addTo(map)
          .bindPopup(popupContent, { maxWidth: 200 })
          .on('click', () => onSelectDay(idx))

        markersRef.current.push(marker)
      })

      mapInstanceRef.current = map
    })

    return () => {
      if (mapInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(mapInstanceRef.current as any).remove()
        mapInstanceRef.current = null
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Pan to active day
  useEffect(() => {
    if (mapInstanceRef.current == null || activeDay === null) return
    import('leaflet').then((L) => {
      const day = days[activeDay]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(mapInstanceRef.current as any).setView([day.lat, day.lng], 7, { animate: true })
      const marker = markersRef.current[activeDay]
      if (marker) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(marker as any).openPopup()
      }
      void L
    })
  }, [activeDay, days])

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </>
  )
}
