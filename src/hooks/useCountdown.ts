import { useEffect, useState } from 'react'
export function useCountdown(target: Date) {
  const calc = () => { const d = Math.max(0, target.getTime() - Date.now()), s = Math.floor(d/1000)
    return { days: Math.floor(s/86400), hours: Math.floor(s%86400/3600), minutes: Math.floor(s%3600/60), seconds: s%60, done: d === 0 } }
  const [t, setT] = useState(calc)
  useEffect(() => { const i = setInterval(() => setT(calc()), 1000); return () => clearInterval(i) }, [target])
  return t
}
