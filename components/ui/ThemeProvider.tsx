'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface ThemeCtx {
  dark: boolean
  toggle: () => void
}

const ThemeContext = createContext<ThemeCtx>({ dark: true, toggle: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('ws-theme')
    const isDark = saved ? saved === 'dark' : true
    setDark(isDark)
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    const theme = next ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('ws-theme', theme)
    // Notify globe to update its background
    window.updateGlobeTheme?.()
  }

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
