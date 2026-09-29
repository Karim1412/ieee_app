import { useEffect, useState, useCallback } from 'react'
type BIP = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }> }
const KEY = 'ieee-install-dismissed', COOLDOWN = 1000*60*60*24*14
const standalone = () => matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone === true
export function useInstall() {
  const [evt, setEvt] = useState<BIP | null>(null)
  const [installed, setInstalled] = useState(standalone())
  const [showIOS, setShowIOS] = useState(false)
  const ua = navigator.userAgent
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  useEffect(() => {
    const onBip = (e: Event) => { e.preventDefault(); setEvt(e as BIP) }
    const onInst = () => { setInstalled(true); setEvt(null) }
    addEventListener('beforeinstallprompt', onBip); addEventListener('appinstalled', onInst)
    return () => { removeEventListener('beforeinstallprompt', onBip); removeEventListener('appinstalled', onInst) }
  }, [])
  const recentlyDismissed = () => { try { return Date.now() - Number(localStorage.getItem(KEY) || 0) < COOLDOWN } catch { return false } }
  const dismiss = () => { try { localStorage.setItem(KEY, String(Date.now())) } catch {} }
  const install = useCallback(async () => {   // must be called from a user gesture
    if (evt) { await evt.prompt(); const { outcome } = await evt.userChoice; if (outcome === 'dismissed') dismiss(); setEvt(null) }
    else if (isIOS) setShowIOS(true)
  }, [evt, isIOS])
  const canInstall = !installed && (!!evt || isIOS)
  return { installed, canInstall, install, isIOS, showIOS, closeIOS: () => { setShowIOS(false); dismiss() },
    autoSuggest: canInstall && !recentlyDismissed(), dismiss }
}
