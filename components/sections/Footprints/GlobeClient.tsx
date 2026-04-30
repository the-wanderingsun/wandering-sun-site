'use client'

import { useEffect, useRef } from 'react'
import type { City } from '@/types'

// Declare global globe.gl type (loaded via transpilePackages)
declare global {
  interface Window {
    updateGlobeTheme?: () => void
  }
}

interface Props {
  cities: City[]
  onCitySelect: (city: City) => void
}

const colorMap: Record<string, string> = {
  current: '#ff5e14',  // 亮橙 — 与网站 --accent 一致
  lived:   '#f5a623',  // 琥珀橙 — 旅居过的城市
  visited: '#7a3a10',  // 深棕橙 — 路过
}
const sizeMap: Record<string, number> = {
  current: 0.55,
  lived:   0.38,
  visited: 0.25,
}

function sunPosition(date: Date): [number, number] {
  const JD = date.getTime() / 86400000 + 2440587.5
  const n = JD - 2451545.0
  const L = (280.460 + 0.9856474 * n) % 360
  const g = (357.528 + 0.9856003 * n) % 360
  const gR = (g * Math.PI) / 180
  const lambdaR = ((L + 1.915 * Math.sin(gR) + 0.020 * Math.sin(2 * gR)) * Math.PI) / 180
  const epR = (23.439 * Math.PI) / 180
  const dec = (Math.asin(Math.sin(epR) * Math.sin(lambdaR)) * 180) / Math.PI
  const RA = Math.atan2(Math.cos(epR) * Math.sin(lambdaR), Math.cos(lambdaR))
  const GMST = (6.697375 + 0.0657098242 * n) % 24
  const utcH = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600
  const H_ = ((GMST + utcH) * 15 - (RA * 180) / Math.PI + 360) % 360
  let lng = (360 - H_) % 360
  if (lng > 180) lng -= 360
  return [lng, dec]
}

const dayNightVertexShader = `
  varying vec3 vNormal;
  varying vec2 vUv;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`

const dayNightFragmentShader = `
  #define PI 3.141592653589793
  uniform sampler2D dayTexture;
  uniform sampler2D nightTexture;
  uniform vec2 sunPosition;
  uniform vec2 globeRotation;
  varying vec3 vNormal;
  varying vec2 vUv;
  float toRad(in float a) { return a * PI / 180.0; }
  vec3 Polar2Cartesian(in vec2 c) {
    float theta = toRad(90.0 - c.x);
    float phi   = toRad(90.0 - c.y);
    return vec3(sin(phi)*cos(theta), cos(phi), sin(phi)*sin(theta));
  }
  void main() {
    float invLon = toRad(globeRotation.x);
    float invLat = -toRad(globeRotation.y);
    mat3 rotX = mat3(1,0,0, 0,cos(invLat),-sin(invLat), 0,sin(invLat),cos(invLat));
    mat3 rotY = mat3(cos(invLon),0,sin(invLon), 0,1,0, -sin(invLon),0,cos(invLon));
    vec3 sunDir = rotX * rotY * Polar2Cartesian(sunPosition);
    float intensity = dot(normalize(vNormal), normalize(sunDir));
    vec4 dayColor   = texture2D(dayTexture,   vUv);
    vec4 nightColor = texture2D(nightTexture, vUv);
    gl_FragColor = mix(nightColor, dayColor, smoothstep(-0.1, 0.1, intensity));
  }`

export default function GlobeClient({ cities, onCitySelect }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapRef.current) return

    const wrap = wrapRef.current
    const W = wrap.getBoundingClientRect().width || 480
    const H = wrap.getBoundingClientRect().height || 480

    // Dynamic import of globe.gl (client-only)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let globeInstance: any = null
    let animTimer: ReturnType<typeof setTimeout> | null = null
    let resizeObserver: ResizeObserver | null = null

    import('globe.gl').then((globeMod) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Globe = (globeMod as any).default ?? globeMod
      // Also need THREE for the shader material
      import('three').then((THREE) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const globe = (Globe as any)()(wrap)
          .width(W).height(H)
          .globeImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg')
          .backgroundImageUrl('')
          .backgroundColor('rgba(0,0,0,0)')
          .pointsData(cities)
          .pointLat('lat').pointLng('lon')
          .pointColor((d: City) => colorMap[d.type])
          .pointRadius((d: City) => sizeMap[d.type])
          .pointAltitude((d: City) => d.type === 'current' ? 0.08 : 0.04)
          .pointResolution(16)
          .pointLabel((d: City) =>
            `<div style="font-family:monospace;font-size:12px;
              background:rgba(20,10,5,0.88);border:1px solid rgba(255,94,20,0.5);
              border-radius:6px;padding:6px 10px;color:#f5c8a0;line-height:1.5;">
              <strong style="color:#ff5e14">${d.name}</strong><br>
              <span style="opacity:0.75">${d.region}</span>
            </div>`)
          .onPointClick((d: City) => {
            onCitySelect(d)
            globe.pointOfView({ lat: d.lat, lng: d.lon, altitude: 1.8 }, 800)
          })
          .atmosphereColor('#ff7030')
          .atmosphereAltitude(0.15)

        globeInstance = globe

        const controls = globe.controls()
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.6
        controls.enableDamping = true
        controls.enableZoom = false
        globe.pointOfView({ lat: 20, lng: 100, altitude: 2.2 })

        // Day/night shader
        let dayNightMaterial: InstanceType<typeof THREE.ShaderMaterial> | null = null

        Promise.all([
          new THREE.TextureLoader().loadAsync('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg'),
          new THREE.TextureLoader().loadAsync('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg'),
        ]).then(([dayTex, nightTex]) => {
          dayNightMaterial = new THREE.ShaderMaterial({
            uniforms: {
              dayTexture: { value: dayTex },
              nightTexture: { value: nightTex },
              sunPosition: { value: new THREE.Vector2() },
              globeRotation: { value: new THREE.Vector2() },
            },
            vertexShader: dayNightVertexShader,
            fragmentShader: dayNightFragmentShader,
          })

          globe.globeMaterial(dayNightMaterial)

          // 初始化 globeRotation（避免 shader 首帧使用默认 (0,0)）
          const initPov = globe.pointOfView() as { lat: number; lng: number; altitude: number }
          dayNightMaterial.uniforms.globeRotation.value.set(initPov.lng, initPov.lat)

          // 每帧同步地球旋转角度到 shader（自动旋转 + 用户拖拽都覆盖）
          // onZoom 只在用户缩放/平移时触发，无法追踪 autoRotate，改用 controls.change
          const onControlsChange = () => {
            if (!dayNightMaterial) return
            const pov = globe.pointOfView() as { lat: number; lng: number; altitude: number }
            dayNightMaterial.uniforms.globeRotation.value.set(pov.lng, pov.lat)
          }
          globe.controls().addEventListener('change', onControlsChange)

          // 实时更新太阳位置（每秒），确保黑夜/白天随真实时间变化
          function animateSun() {
            if (dayNightMaterial) {
              const [sLng, sLat] = sunPosition(new Date())
              dayNightMaterial.uniforms.sunPosition.value.set(sLng, sLat)
            }
            animTimer = setTimeout(animateSun, 1000)
          }
          animateSun()
        })

        // Match globe background to current theme
        function applyGlobeBg() {
          const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
          globe.backgroundColor(isDark ? 'rgba(5,5,5,1)' : 'rgba(253,253,253,1)')
        }
        applyGlobeBg()
        window.updateGlobeTheme = applyGlobeBg

        // Resize
        resizeObserver = new ResizeObserver(() => {
          const rect = wrap.getBoundingClientRect()
          globe.width(Math.round(rect.width)).height(Math.round(rect.height))
        })
        resizeObserver.observe(wrap)
      })
    })

    return () => {
      if (animTimer) clearTimeout(animTimer)
      if (resizeObserver) resizeObserver.disconnect()
      window.updateGlobeTheme = undefined
    }
  }, [cities, onCitySelect])

  return <div ref={wrapRef} id="globe-canvas-wrap" />
}
