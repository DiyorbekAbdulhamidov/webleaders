/**
 * Kodda ko'rsatilgan har bir rasm public/ ichida haqiqatan bor-yo'qligini tekshiradi.
 * Ishlatish:  node scripts/check-images.js
 */
const fs = require('fs')
const path = require('path')

const ROOTS = ['src', 'data']
const exts = /\.(png|jpe?g|webp|avif|svg|gif|mp4)$/i

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

const refs = new Map() // asset path -> [source files]
for (const root of ROOTS) {
  if (!fs.existsSync(root)) continue
  for (const file of walk(root)) {
    if (!/\.(tsx?|jsx?|json)$/.test(file)) continue
    const src = fs.readFileSync(file, 'utf8')
    for (const m of src.matchAll(/["'`](\/[^"'`\s]*?\.(?:png|jpe?g|webp|avif|svg|gif|mp4))["'`]/gi)) {
      const asset = m[1]
      if (!refs.has(asset)) refs.set(asset, [])
      refs.get(asset).push(file)
    }
  }
}

let missing = 0
for (const [asset, sources] of [...refs].sort()) {
  const onDisk = path.join('public', decodeURIComponent(asset))
  if (!fs.existsSync(onDisk)) {
    missing++
    console.error(`YO'Q: ${asset}  <-  ${[...new Set(sources)].join(', ')}`)
  }
}

console.log(`\n${refs.size} ta rasm havolasi tekshirildi, ${missing} tasi topilmadi.`)
if (missing) process.exitCode = 1

// public/ ichidagi hech qayerda ishlatilmagan fayllar
const used = new Set([...refs.keys()].map(a => decodeURIComponent(a)))
// Bular kodda emas, brauzer/metadata orqali so'raladi — "ishlatilmagan" deb sanalmasin
const extraKnown = new Set([
  '/favicon.ico', '/favicon-96x96.png', '/apple-touch-icon.png',
  '/og-image.png', '/logo.png', '/web-app-manifest-192x192.png', '/web-app-manifest-512x512.png'
])
const unused = []
for (const file of walk('public')) {
  const rel = '/' + path.relative('public', file).split(path.sep).join('/')
  if (!exts.test(rel)) continue
  if (used.has(rel) || extraKnown.has(rel)) continue
  unused.push({ rel, kb: Math.round(fs.statSync(file).size / 1024) })
}
if (unused.length) {
  console.log('\npublic/ ichida kodda ishlatilmayotgan fayllar:')
  for (const u of unused.sort((a, b) => b.kb - a.kb)) console.log(`  ${u.kb} KB  ${u.rel}`)
}
