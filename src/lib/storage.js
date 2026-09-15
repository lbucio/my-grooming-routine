import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Web Storage backend.
 *
 * NOTE: this defaults to localStorage, not sessionStorage. sessionStorage is
 * wiped the moment the Safari tab closes, and iOS discards background tabs
 * aggressively — so every check you made this morning, and every outdoor day
 * you flagged for next week, would be gone by evening. A routine tracker that
 * forgets overnight can't do its job.
 *
 * Flip this one constant to 'session' if you want the original behaviour;
 * everything else in the app goes through this module.
 */
const BACKEND = 'local' // 'local' | 'session'

const PREFIX = 'mgr:'

function backing() {
  try {
    const s = BACKEND === 'session' ? window.sessionStorage : window.localStorage
    const probe = `${PREFIX}__probe__`
    s.setItem(probe, '1')
    s.removeItem(probe)
    return s
  } catch {
    return null // Safari private mode, storage disabled, etc.
  }
}

const store = typeof window === 'undefined' ? null : backing()
const memory = new Map() // fallback so the app still works for the current page view

export function read(key, fallback) {
  const k = PREFIX + key
  try {
    const raw = store ? store.getItem(k) : memory.get(k)
    if (raw == null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function write(key, value) {
  const k = PREFIX + key
  const raw = JSON.stringify(value)
  try {
    if (store) store.setItem(k, raw)
    else memory.set(k, raw)
  } catch {
    memory.set(k, raw) // quota exceeded — keep going in memory
  }
}

/** useState that persists under `key`. */
export function useStored(key, initial) {
  const [value, setValue] = useState(() => read(key, initial))
  const keyRef = useRef(key)

  useEffect(() => {
    if (keyRef.current !== key) {
      keyRef.current = key
      setValue(read(key, initial))
    }
  }, [key]) // eslint-disable-line react-hooks/exhaustive-deps

  const set = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next
        write(keyRef.current, resolved)
        return resolved
      })
    },
    []
  )

  return [value, set]
}

export function clearAll() {
  try {
    if (!store) {
      memory.clear()
      return
    }
    const doomed = []
    for (let i = 0; i < store.length; i++) {
      const k = store.key(i)
      if (k && k.startsWith(PREFIX)) doomed.push(k)
    }
    doomed.forEach((k) => store.removeItem(k))
  } catch {
    memory.clear()
  }
}

export const STORAGE_BACKEND = BACKEND
