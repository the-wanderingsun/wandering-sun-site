'use client'

import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { dark, toggle } = useTheme()

  return (
    <button
      className="nav-mode"
      onClick={toggle}
      title="切换模式"
      aria-label="切换深色/浅色模式"
    >
      {dark ? '☀' : '☽'}
    </button>
  )
}
