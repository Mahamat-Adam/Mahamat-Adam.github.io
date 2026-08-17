import { useCallback, useEffect, useState } from 'react'

export function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    // Keeps native popups and scrollbars in step with the toggle, not just the page.
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      /* storage may be blocked; theme still applies for this visit */
    }
  }, [dark])

  const toggle = useCallback(() => setDark((d) => !d), [])
  return { dark, toggle }
}
