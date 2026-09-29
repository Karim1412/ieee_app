import { useEffect, useRef, useState } from 'react'
import { NEXT_EVENT, CHAPTERS, EVENTS, OFFICERS, ABOUT_IEEE, ABOUT_SB, SOCIALS, EventItem, Chapter, REGISTRATION_URL, CONTACT_EMAIL, AWARDS, UPCOMING, INTERNATIONAL } from './data/content'
import { useCountdown } from './hooks/useCountdown'
import { useInstall } from './hooks/useInstall'
import { enablePush } from './push'
import Inbox from './Inbox'
import ChapterModal from './ChapterModal'

function Img({ src, alt, fallback, ...p }: { src: string; alt: string; fallback: string } & React.ImgHTMLAttributes<HTMLImageElement>) {
  const [bad, setBad] = useState(false)
  return bad ? <div className="ph" role="img" aria-label={alt}>{fallback}</div>
    : <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setBad(true)} {...p} />
}
function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null); const [on, setOn] = useState(false)
  useEffect(() => { const o = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), o.disconnect()), { threshold: .15 })
    ref.current && o.observe(ref.current); return () => o.disconnect() }, [])
  return <div ref={ref} className={`reveal ${on ? 'in' : ''} ${className}`}>{children}</div>
}
const Head = ({ kicker, title }: { kicker: string; title: string }) =>
  <header className="head"><span className="kicker">{kicker}</span><h2>{title}</h2></header>

function Countdown() {
  const t = useCountdown(NEXT_EVENT.date)
  if (t.done) return <p className="here">{NEXT_EVENT.name.toUpperCase()} IS HERE</p>
  return <div className="count" role="timer" aria-label={`Time until ${NEXT_EVENT.name}`}>
    {(['days','hours','minutes','seconds'] as const).map(k => <div key={k}><b key={t[k]} className="tick">{String(t[k]).padStart(2,'0')}</b><span>{k}</span></div>)}</div>
}
function Lightbox({ photos, index, onClose }: { photos: string[]; index: number; onClose: () => void }) {
  const [i, setI] = useState(index); const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => { ref.current?.showModal() }, [])
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') setI(x => (x+1)%photos.length); if (e.key === 'ArrowLeft') setI(x => (x-1+photos.length)%photos.length) }
    addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [photos.length])
  return <dialog ref={ref} className="lb" onClose={onClose} aria-label="Photo gallery">
    <button className="x" onClick={onClose} aria-label="Close">✕</button>
    <img src={photos[i]} alt={`Photo ${i+1} of ${photos.length}`} />
    <div className="lbnav"><button onClick={() => setI((i-1+photos.length)%photos.length)} aria-label="Previous">‹</button>
      <span>{i+1} / {photos.length}</span><button onClick={() => setI((i+1)%photos.length)} aria-label="Next">›</button></div></dialog>
}
function EventCard({ e }: { e: EventItem }) {
  const [open, setOpen] = useState<number | null>(null)
  return <article className="event"><h3>{e.name}</h3><time>{e.date}</time><p>{e.description}</p>
    {e.photos.length === 0 ? <div className="ph wide">TODO: add photos in /public/images/events/{e.id}/</div> :
      <div className="strip">{e.photos.map((p, i) => <button key={p} onClick={() => setOpen(i)} aria-label={`Open photo ${i+1} of ${e.name}`}>
        <Img src={p} alt={`${e.name} photo ${i+1}`} fallback="Photo" width={240} height={180} /></button>)}</div>}
    {open !== null && <Lightbox photos={e.photos} index={open} onClose={() => setOpen(null)} />}</article>
}
function IOSGuide({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null); useEffect(() => { ref.current?.showModal() }, [])
  return <dialog ref={ref} className="sheet" onClose={onClose} aria-labelledby="ios-t">
    <h3 id="ios-t">Take IEEE EPI SB with you</h3>
    <ol><li><span>1</span>Tap the <b>Share</b> button <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15V3M8 7l4-4 4 4M5 12v8h14v-8"/></svg> in Safari</li>
      <li><span>2</span>Choose <b>Add to Home Screen</b></li><li><span>3</span>Tap <b>Add</b></li></ol>
    <button className="btn" onClick={onClose}>Got it</button></dialog>
}
function InstallCTA({ inst, compact }: { inst: ReturnType<typeof useInstall>; compact?: boolean }) {
  if (inst.installed) return compact ? null : <p className="ok">✓ IEEE EPI SB is installed.</p>
  if (!inst.canInstall) return compact ? null : <p className="muted">To install, open this page in Chrome (Android) or Safari (iPhone), then use the browser menu → “Install app” / “Add to Home Screen”.</p>
  return <button className={compact ? 'btn ghost' : 'btn'} onClick={inst.install}>{inst.isIOS ? 'Add to Home Screen' : 'Install IEEE EPI SB'}</button>
}

function PolandFlag() {
  return <svg className="flag" viewBox="0 0 32 20" role="img" aria-label="Flag of Poland"><rect width="32" height="10" fill="#fff" /><rect y="10" width="32" height="10" fill="#DC143C" /></svg>
}
function Awards() {
  return <section id="awards" className="awards"><Head kicker="2026" title="Our awards of 2026" />
    <div className="rail">{AWARDS.map(w => <Reveal key={w.title} className="award"><figure>
      <div className="aph"><Img src={w.photo} alt={w.title} fallback="Photo" width={280} height={350} /><span className="rank" data-r={w.rank}>{w.rank}</span></div>
      <figcaption>{w.title}</figcaption></figure></Reveal>)}</div></section>
}
function Upcoming() {
  return <section id="upcoming" className="upcoming"><Head kicker="Save the date" title="Upcoming national events" />
    <div className="ugrid">{UPCOMING.map(u => <Reveal key={u.title} className="ucard"><article>
      <div className="uph"><Img src={u.photo} alt={`${u.title} event`} fallback={u.title} width={640} height={360} /></div>
      <div className="ub"><time>{u.date}</time><h3>{u.title}</h3><p>{u.description}</p></div></article></Reveal>)}</div></section>
}
function International() {
  const [open, setOpen] = useState<number | null>(null)
  return <section id="international" className="intl"><Reveal>
    <span className="kicker">Beyond borders</span>
    <h2 className="ih"><PolandFlag />{INTERNATIONAL.heading}</h2>
    <h3>{INTERNATIONAL.title}</h3><time>{INTERNATIONAL.date}</time><p className="lead">{INTERNATIONAL.description}</p></Reveal>
    <div className="strip">{INTERNATIONAL.photos.map((p, i) => <button key={p} onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1} from Kraków`}>
      <Img src={p} alt={`R8 SYP Kraków photo ${i + 1}`} fallback="Photo" width={240} height={180} /></button>)}</div>
    {open !== null && <Lightbox photos={INTERNATIONAL.photos} index={open} onClose={() => setOpen(null)} />}</section>
}
function InstallPopup({ inst, onClose }: { inst: ReturnType<typeof useInstall>; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null); useEffect(() => { ref.current?.showModal() }, [])
  return <dialog ref={ref} className="pop" onClose={onClose} aria-labelledby="pop-t">
    <Img src="/images/branding/epi-sb-logo.png" alt="IEEE EPI SB" fallback="EPI SB" width={72} height={72} loading="eager" />
    <h3 id="pop-t">Install IEEE EPI SB</h3>
    <p>Keep the app on your phone for instant access to events, chapters and registration, even offline.</p>
    <button className="btn" onClick={() => { ref.current?.close(); inst.install() }}>{inst.isIOS ? 'Show me how' : 'Install the app'}</button>
    <button className="btn ghost" onClick={() => ref.current?.close()}>Not now</button></dialog>
}
function NotifyCTA({ inst }: { inst: ReturnType<typeof useInstall> }) {
  const has = typeof Notification !== 'undefined'
  const [perm, setPerm] = useState(has ? Notification.permission : 'denied')
  if (!inst.installed || !has) return null
  if (perm === 'granted') return <p className="ok">✓ Notifications are on.</p>
  if (perm !== 'default') return null
  return <button className="btn" onClick={async () => { await enablePush(); setPerm(Notification.permission) }}>Enable notifications</button>
}
const NKEY = 'ieee-notify-dismissed', NCOOLDOWN = 1000 * 60 * 60 * 24 * 7
function NotifyPopup({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null); useEffect(() => { ref.current?.showModal() }, [])
  return <dialog ref={ref} className="pop" onClose={onClose} aria-labelledby="np-t">
    <Img src="/images/branding/epi-sb-logo.png" alt="IEEE EPI SB" fallback="EPI SB" width={72} height={72} loading="eager" />
    <h3 id="np-t">Stay in the loop</h3>
    <p>Get notified about IEEE Day, new events and registrations.</p>
    <button className="btn" onClick={() => { ref.current?.close(); enablePush() }}>Enable notifications</button>
    <button className="btn ghost" onClick={() => ref.current?.close()}>Not now</button></dialog>
}
function Chapters() {
  const [sel, setSel] = useState<Chapter | null>(null)
  return <section id="chapters"><Head kicker="03" title="Our 5 chapters" />
    <div className="chapters">{CHAPTERS.map(c => <Reveal key={c.id}>
      <article className="chapter" style={{ ['--c' as string]: c.color } as React.CSSProperties} role="button" tabIndex={0} aria-haspopup="dialog"
        aria-label={`${c.name}: open board and fields of interest`} onClick={() => setSel(c)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(c) } }}>
        <Img src={c.logo} alt={`${c.name} chapter logo`} fallback={c.name} width={72} height={72} />
        <div><h3>{c.name}</h3><small>{c.full}</small><p>{c.description}</p><p className="mission"><b>Mission:</b> {c.mission}</p>
          <span className="more">Board and interests →</span></div></article></Reveal>)}</div>
    {sel && <ChapterModal c={sel} onClose={() => setSel(null)} />}</section>
}
const NAV = [['home','Home'],['about','Explore'],['chapters','Chapters'],['events','Events'],['team','Team'],['register','Join']]
function ScrollBar() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const f = () => { const h = document.documentElement; ref.current?.style.setProperty('--p', String(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight))) }
    addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [])
  return <div className="progress" ref={ref} aria-hidden />
}
function Marquee() {
  const words = [...CHAPTERS.map(c => c.name), ...EVENTS.map(e => e.name)]
  return <div className="marquee" aria-hidden><div>{[...words, ...words, ...words, ...words].map((w, i) => <span key={i}>{w}<i /></span>)}</div></div>
}
function Register() {
  return <section id="register" className="register"><Reveal>
    <span className="kicker">Registration</span>
    <h2>Become part of<br />IEEE EPI SB.</h2>
    <p>Join a community of students who build, compete and lead. It takes two minutes.</p>
    <a className="join" href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer">
      <span>Open the registration form</span><i aria-hidden>→</i></a>
    <small>Opens Google Forms in a new tab</small></Reveal></section>
}
function Contact() {
  const [st, setSt] = useState<'idle'|'sending'|'ok'|'err'>('idle'); const [draft, setDraft] = useState({ name: '', message: '' })
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f = e.currentTarget; const d = Object.fromEntries(new FormData(f)); setSt('sending')
    try { const r = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...d, _subject: 'IEEE EPI SB app: new message', _template: 'table' }) })
      if (!r.ok) throw new Error(); setSt('ok'); f.reset() } catch { setSt('err') }
  }
  return <section id="contact"><Reveal><Head kicker="06" title="Get in touch" />
    <form className="form" onSubmit={submit}>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hp" aria-hidden />
      <label><span>Name</span><input name="name" required autoComplete="name" onChange={e => setDraft(d => ({ ...d, name: e.target.value }))} /></label>
      <label><span>Email</span><input name="email" type="email" required autoComplete="email" /></label>
      <label><span>Message</span><textarea name="message" required rows={5} onChange={e => setDraft(d => ({ ...d, message: e.target.value }))} /></label>
      <button className="btn" disabled={st === 'sending'}>{st === 'sending' ? 'Sending…' : 'Send message'}</button>
      <p role="status" aria-live="polite" className={`fs ${st}`}>
        {st === 'ok' && '✓ Message sent. We’ll get back to you soon.'}
        {st === 'err' && <>Couldn’t send right now. <a href={`mailto:${CONTACT_EMAIL}?subject=IEEE%20EPI%20SB&body=${encodeURIComponent(draft.message)}`}>Send it by email instead</a>.</>}</p>
    </form></Reveal></section>
}

export default function App() {
  const inst = useInstall(); const [active, setActive] = useState('home'); const [popup, setPopup] = useState(false); const [npopup, setNpopup] = useState(false)
  useEffect(() => { const t = setTimeout(() => inst.autoSuggest && setPopup(true), 1800); return () => clearTimeout(t) }, [inst.autoSuggest])
  useEffect(() => {
    if (!inst.installed || typeof Notification === 'undefined' || Notification.permission !== 'default') return
    try { if (Date.now() - Number(localStorage.getItem(NKEY) || 0) < NCOOLDOWN) return } catch {}
    const t = setTimeout(() => setNpopup(true), 2000); return () => clearTimeout(t)
  }, [inst.installed])
  useEffect(() => { const o = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    NAV.forEach(([id]) => { const el = document.getElementById(id); el && o.observe(el) }); return () => o.disconnect() }, [])
  return <>
    <ScrollBar />
    <Inbox />
    <main>
      <section id="home" className="hero">
        <div className="logos"><Img src="/images/branding/ieee-logo.png" alt="IEEE" fallback="IEEE" width={120} height={48} loading="eager" /><span className="sep" aria-hidden /><Img src="/images/branding/epi-sb-logo.png" alt="IEEE EPI Student Branch" fallback="EPI SB" width={120} height={48} loading="eager" /></div>
        <svg className="circuit" viewBox="0 0 400 700" preserveAspectRatio="xMaxYMid slice" aria-hidden fill="none">
          <path d="M400 80H300l-40 40v120h-80l-30 30v90H60" /><path d="M400 300H340l-30 30v150h-90l-40 40v100" /><path d="M400 560H280l-30-30" />
          <circle cx="60" cy="360" r="5" /><circle cx="180" cy="570" r="5" /><circle cx="250" cy="530" r="5" /></svg>
        <h1 aria-label="IEEE EPI SB"><span style={{ ['--d' as string]: '.1s' }}>IEEE</span><span style={{ ['--d' as string]: '.25s' }}>EPI SB</span></h1>
        <p className="tag">Explore. Connect. Create.</p>
        <div className="next"><span className="kicker">Next event</span><h2>{NEXT_EVENT.name}</h2>
          <p>{NEXT_EVENT.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}</p><Countdown /></div>
        <div className="cta"><a className="btn" href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer">Register now</a><a className="btn ghost" href="#about">Explore</a><InstallCTA inst={inst} compact /></div>
      </section>
      <Marquee />
      <Register />
      <section id="about"><Reveal><div className="aboutlogo"><Img src="/images/branding/ieee-logo.png" alt="IEEE logo" fallback="IEEE" width={160} height={56} /></div><Head kicker="01" title={ABOUT_IEEE.title} /><p className="lead">{ABOUT_IEEE.text}</p>
        <ul className="pts">{ABOUT_IEEE.points.map(p => <li key={p}>{p}</li>)}</ul></Reveal>
        <Reveal className="alt"><div className="aboutlogo"><Img src="/images/branding/epi-sb-logo.png" alt="IEEE EPI Student Branch logo" fallback="EPI SB" width={160} height={56} /></div><Head kicker="02" title={ABOUT_SB.title} /><p className="lead">{ABOUT_SB.text}</p></Reveal></section>
      <Chapters />
      <Upcoming />
      <section id="events"><Head kicker="04" title="Our events" />{EVENTS.map(e => <Reveal key={e.id}><EventCard e={e} /></Reveal>)}</section>
      <Awards />
      <International />
      <section id="team"><Head kicker="05" title="Meet the officers" />
        <div className="officers">{OFFICERS.map(o => <Reveal key={o.role}><article className="officer">
          <Img src={o.photo} alt={`${o.name}, ${o.role}`} fallback={o.role[0]} width={300} height={375} />
          <h3>{o.name}</h3><p>{o.role}</p>{o.bio && <small>{o.bio}</small>}</article></Reveal>)}</div></section>
      <Contact />
      <section className="install"><h2>Keep IEEE EPI SB in your pocket</h2><p>Install the app for instant access, even offline.</p><InstallCTA inst={inst} /><NotifyCTA inst={inst} /></section>
      <footer><p>© IEEE EPI Student Branch</p><div>{SOCIALS.map(s => <a key={s.label} href={s.url} rel="noopener">{s.label}</a>)}</div></footer>
    </main>
    <nav className="bar" aria-label="Main">{NAV.map(([id, l]) =>
      <a key={id} href={`#${id}`} aria-current={active === id ? 'page' : undefined}>{l}</a>)}</nav>
    {popup && !inst.installed && <InstallPopup inst={inst} onClose={() => { setPopup(false); inst.dismiss() }} />}
    {npopup && <NotifyPopup onClose={() => { setNpopup(false); try { localStorage.setItem(NKEY, String(Date.now())) } catch {} }} />}
    {inst.showIOS && <IOSGuide onClose={inst.closeIOS} />}
  </>
}
