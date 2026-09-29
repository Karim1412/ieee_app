import { ONESIGNAL_APP_ID } from './data/content'
declare global { interface Window { OneSignalDeferred?: Array<(os: any) => void> } }

window.OneSignalDeferred = window.OneSignalDeferred || []
if (!ONESIGNAL_APP_ID.startsWith('YOUR_')) {
  window.OneSignalDeferred.push(async (OneSignal) => {
    await OneSignal.init({ appId: ONESIGNAL_APP_ID, serviceWorkerPath: 'sw.js', serviceWorkerParam: { scope: '/' } })
  })
}
export const enablePush = () => new Promise<void>((resolve) => {
  window.OneSignalDeferred = window.OneSignalDeferred || []
  window.OneSignalDeferred.push(async (OS) => { try { await OS.Notifications.requestPermission() } finally { resolve() } })
})
