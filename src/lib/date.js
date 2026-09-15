export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/** Local-time YYYY-MM-DD. Never use toISOString() — it shifts to UTC and can land on the wrong day. */
export function dateKey(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function parseKey(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(d, n) {
  const out = new Date(d)
  out.setDate(out.getDate() + n)
  return out
}

/** Sunday of the week containing `d` — the routine table starts on Sunday. */
export function startOfWeek(d) {
  return addDays(d, -d.getDay())
}

export function daysBetween(aKey, bKey) {
  const a = parseKey(aKey)
  const b = parseKey(bKey)
  return Math.round((b - a) / 86400000)
}

export function formatLong(d) {
  return d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })
}

export function formatShort(d) {
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function isToday(d) {
  return dateKey(d) === dateKey(new Date())
}
