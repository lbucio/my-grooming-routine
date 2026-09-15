import IMAGES from '../data/productImages.json'
import { PRODUCTS } from '../data/products.js'

// Each category gets its own tint, so a shelf of fallback tiles still reads as
// grouped rather than as a wall of identical grey squares.
const TINT = {
  'Face — cleanse': 'cleanse',
  'Face — treat': 'treat',
  'Face — moisturize': 'moisturize',
  'Face — protect': 'protect',
  Body: 'body',
  Hair: 'hair',
  Teeth: 'teeth'
}

const BASE = import.meta.env.BASE_URL || './'

export default function Thumb({ productId, size = 'sm' }) {
  const p = PRODUCTS[productId]
  if (!p) return null

  const file = IMAGES[productId]
  const tint = TINT[p.group] || 'treat'

  return (
    <span className={`thumb thumb--${size} thumb--${tint}`} aria-hidden="true">
      {file ? (
        <img src={`${BASE}products/${file}`} alt="" loading="lazy" decoding="async" />
      ) : (
        <span className="thumb__code">{p.code || p.name.slice(0, 2).toUpperCase()}</span>
      )}
    </span>
  )
}
