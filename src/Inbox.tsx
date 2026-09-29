import { useEffect, useRef, useState } from 'react'

export interface Msg { id: string; date: string; title: string; body: string; image?: string; link?: { label: string; url: string } }
const READ_KEY = 'ieee-read-msgs'
const safe = (u: string) => /^(https?:\/\/|\/|#)/.test(u)
const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
const loadRead = (): string[] => { try { return JSON.parse(localStorage.getItem(READ_KEY) || '[]') } catch { return [] } }

export default function Inbox() {
  const [msgs, setMsgs] = useState<Msg[]>([]); const [read, setRead] = useState<string[]>(loadRead)
  const [open, setOpen] = useState(false); const [cur, setCur] = useState<string | null>(null)
  const ref = useRef<HTMLDialogElement>(null)
  const detail = msgs.find(m => m.id === cur)
  const unread = msgs.filter(m => !read.includes(m.id)).length

  useEffect(() => {
    fetch('/announcements.json', { cache: 'no-cache' }).then(r => r.json())
      .then((d: Msg[]) => setMsgs([...d].sort((a, b) => b.date.localeCompare(a.date)))).catch(() => {})
  }, [])
  useEffect(() => { // deep link from a notification: /#msg=<id>
    const h = () => { const m = location.hash.match(/^#msg=(.+)$/); if (m) { setCur(decodeURIComponent(m[1])); setOpen(true) } }
    h(); addEventListener('hashchange', h); return () => removeEventListener('hashchange', h)
  }, [])
  useEffect(() => { const d = ref.current; if (!d) return
    if (open && !d.open) d.showModal(); if (!open && d.open) d.close() }, [open])
  useEffect(() => {
    if (open && detail && !read.includes(detail.id)) {
      const n = [...read, detail.id]; setRead(n); try { localStorage.setItem(READ_KEY, JSON.stringify(n)) } catch {}
    }
  }, [open, detail, read])

  return <>
    <button className="bell" onClick={() => { setCur(null); setOpen(true) }} aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0" /></svg>
      {unread > 0 && <b>{unread}</b>}</button>
    <dialog ref={ref} className="inbox" aria-labelledby="inbox-t"
      onClose={() => { setOpen(false); setCur(null); if (location.hash.startsWith('#msg=')) history.replaceState(null, '', location.pathname) }}>
      <header>{detail && <button onClick={() => setCur(null)}>‹ Back</button>}
        <h2 id="inbox-t">{detail ? 'Message' : 'Notifications'}</h2>
        <button onClick={() => setOpen(false)} aria-label="Close">✕</button></header>
      <div className="body">
        {detail ? <article className="msg">
          {detail.image && <img src={detail.image} alt="" onError={e => (e.currentTarget.style.display = 'none')} />}
          <time>{fmt(detail.date)}</time><h3>{detail.title}</h3>
          {detail.body.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
          {detail.link && safe(detail.link.url) && <a className="btn" href={detail.link.url} target="_blank" rel="noopener noreferrer">{detail.link.label}</a>}
        </article> : msgs.length === 0 ? <p className="muted">No messages yet.</p> :
          <ul>{msgs.map(m => <li key={m.id}><button className={read.includes(m.id) ? '' : 'unread'} onClick={() => setCur(m.id)}>
            <strong>{m.title}</strong><small>{fmt(m.date)}</small><span>{m.body.split('\n')[0].slice(0, 90)}</span></button></li>)}</ul>}
      </div></dialog>
  </>
}
