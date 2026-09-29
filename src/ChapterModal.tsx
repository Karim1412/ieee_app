import { useEffect, useRef, useState } from 'react'
import type { Chapter } from './data/content'

// picks white or dark text depending on the chapter color
const ink = (hex: string) => { const n = parseInt(hex.slice(1), 16); return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 > 150 ? '#0A2540' : '#fff' }
const css = (o: Record<string, string | number>) => o as unknown as React.CSSProperties
function Photo({ src, alt, fb }: { src: string; alt: string; fb: string }) {
  const [bad, setBad] = useState(false)
  return bad ? <div className="ph" role="img" aria-label={alt}>{fb}</div> : <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} />
}
export default function ChapterModal({ c, onClose }: { c: Chapter; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => { ref.current?.showModal() }, [])
  return <dialog ref={ref} className="cm" style={css({ '--c': c.color, '--ink': ink(c.color) })} onClose={onClose}
    onClick={e => { if (e.target === ref.current) ref.current?.close() }} aria-labelledby="cm-t">
    <div className="cm-in">
      <header className="cm-head">
        <span className="cm-wm" aria-hidden>{c.name}</span>
        <button className="cm-x" onClick={() => ref.current?.close()} aria-label="Close">✕</button>
        <div className="cm-logo"><Photo src={c.logo} alt={`${c.name} logo`} fb={c.name} /></div>
        <div><small>{c.full}</small><h2 id="cm-t">{c.name}</h2><p>{c.description}</p></div>
      </header>
      <div className="cm-body">
        <section><h3>Fields of interest</h3>
          <ol className="cm-int">{c.interests.map((t, i) => <li key={t} style={css({ '--i': i })}>{t}</li>)}</ol></section>
        <section><h3>Board</h3>
          <div className="cm-board">{c.board.map((m, i) => <figure key={m.role} style={css({ '--i': i })}>
            <Photo src={m.photo} alt={`${m.name}, ${m.role}`} fb={m.role} />
            <figcaption><b>{m.name}</b><span>{m.role}</span></figcaption></figure>)}</div></section>
      </div></div></dialog>
}
