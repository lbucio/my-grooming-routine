import { useEffect } from 'react'
import Thumb from './Thumb.jsx'
import { PRODUCTS } from '../data/products.js'

export default function ProductSheet({ productId, onClose }) {
  useEffect(() => {
    if (!productId) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [productId, onClose])

  if (!productId) return null
  const p = PRODUCTS[productId]
  if (!p) return null

  return (
    <>
      <div className="sheet-backdrop" onClick={onClose} />
      <div className="sheet" role="dialog" aria-modal="true" aria-label={p.name}>
        <div className="sheet__grab" />
        <div className="sheet__head">
          <Thumb productId={p.id} size="lg" />
          <div>
            {p.brand && <div className="sheet__brand">{p.brand}</div>}
            <h2 className="sheet__name">{p.name}</h2>
            {p.sub && <div className="sheet__kr">{p.sub}</div>}
            {p.korean && <div className="sheet__kr">{p.korean}</div>}
          </div>
        </div>

        <div className="sheet__label">What it is</div>
        <p className="sheet__text">{p.what}</p>

        <div className="sheet__label">How to use it</div>
        <p className="sheet__text">{p.use}</p>

        {p.notes?.length > 0 && (
          <>
            <div className="sheet__label">Remember</div>
            <ul className="sheet__notes">
              {p.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </>
        )}

        <button className="sheet__close" onClick={onClose}>
          Done
        </button>
      </div>
    </>
  )
}
