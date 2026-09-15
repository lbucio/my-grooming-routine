#!/usr/bin/env node
/**
 * Download product thumbnails and register them with the app.
 *
 * This has to run on your own machine — the environment the app was built in
 * blocks outbound requests to Olive Young.
 *
 *   node scripts/fetch-product-images.mjs --list
 *       Print every product id, with a ready-made Olive Young search URL for
 *       the ones that still have no image.
 *
 *   node scripts/fetch-product-images.mjs <productId> <imageUrl>
 *       Download one image, save it to public/products/, and register it.
 *
 *   node scripts/fetch-product-images.mjs --all
 *       Download everything listed in scripts/product-image-sources.json.
 *
 * Paste the URL of the product photo itself (right-click the image on the
 * product page and copy the image address), not the product page URL.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(root, 'public', 'products')
const REGISTRY = join(root, 'src', 'data', 'productImages.json')
const SOURCES = join(root, 'scripts', 'product-image-sources.json')

const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif' }

const readJson = (p, fallback) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : fallback)
const writeJson = (p, v) => writeFileSync(p, JSON.stringify(v, null, 2) + '\n')

async function productIds() {
  const src = readFileSync(join(root, 'src', 'data', 'products.js'), 'utf8')
  const { PRODUCTS } = await import(join(root, 'src', 'data', 'products.js'))
  void src
  return PRODUCTS
}

async function download(id, url) {
  const res = await fetch(url, {
    headers: {
      // Olive Young serves images only to requests that look like a browser
      // arriving from its own pages.
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36',
      Referer: 'https://www.oliveyoung.co.kr/',
      Accept: 'image/avif,image/webp,image/png,image/jpeg,*/*'
    }
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`)

  const type = (res.headers.get('content-type') || '').split(';')[0].trim()
  const ext = EXT[type]
  if (!ext) throw new Error(`not an image (content-type: ${type || 'none'}) — did you copy the page URL instead of the image URL?`)

  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.byteLength < 1024) throw new Error(`suspiciously small (${buf.byteLength} bytes)`)

  mkdirSync(OUT_DIR, { recursive: true })
  const file = `${id}.${ext}`
  writeFileSync(join(OUT_DIR, file), buf)

  const reg = readJson(REGISTRY, {})
  reg[id] = file
  writeJson(REGISTRY, Object.fromEntries(Object.entries(reg).sort()))

  const kb = (buf.byteLength / 1024).toFixed(0)
  console.log(`  ✓ ${id.padEnd(16)} ${file} (${kb} KB)`)
  return file
}

const args = process.argv.slice(2)
const PRODUCTS = await productIds()
const registry = readJson(REGISTRY, {})

if (args[0] === '--list' || args.length === 0) {
  const have = Object.keys(registry).length
  console.log(`\n${have}/${Object.keys(PRODUCTS).length} products have an image.\n`)
  for (const p of Object.values(PRODUCTS)) {
    if (registry[p.id]) {
      console.log(`  ✓ ${p.id.padEnd(16)} ${registry[p.id]}`)
    } else {
      const q = encodeURIComponent(p.korean || `${p.brand || ''} ${p.name}`.trim())
      console.log(`  · ${p.id.padEnd(16)} ${p.name}`)
      console.log(`      https://www.oliveyoung.co.kr/store/search/getSearchMain.do?query=${q}`)
    }
  }
  console.log('\nThen: node scripts/fetch-product-images.mjs <productId> <imageUrl>\n')
  process.exit(0)
}

if (args[0] === '--all') {
  const sources = readJson(SOURCES, {})
  const entries = Object.entries(sources).filter(([, url]) => url)
  if (entries.length === 0) {
    console.error(`No URLs in ${SOURCES}. Fill it in, or pass one product at a time.`)
    process.exit(1)
  }
  let ok = 0
  for (const [id, url] of entries) {
    if (!PRODUCTS[id]) {
      console.error(`  ✗ ${id.padEnd(16)} unknown product id`)
      continue
    }
    try {
      await download(id, url)
      ok++
    } catch (err) {
      console.error(`  ✗ ${id.padEnd(16)} ${err.message}`)
    }
  }
  console.log(`\n${ok}/${entries.length} downloaded. Commit public/products/ and src/data/productImages.json.\n`)
  process.exit(ok === entries.length ? 0 : 1)
}

const [id, url] = args
if (!PRODUCTS[id]) {
  console.error(`Unknown product id "${id}". Run --list to see them all.`)
  process.exit(1)
}
if (!url || !/^https?:\/\//.test(url)) {
  console.error('Pass the image URL as the second argument.')
  process.exit(1)
}
try {
  await download(id, url)
  console.log('\nCommit public/products/ and src/data/productImages.json when you are done.\n')
} catch (err) {
  console.error(`  ✗ ${err.message}`)
  process.exit(1)
}
