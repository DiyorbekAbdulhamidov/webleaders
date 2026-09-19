/**
 * to-webp.js ishlatilgandan keyin kod ichidagi /projects/*.png va /discounts/*.png
 * havolalarini haqiqatan mavjud .webp fayllarga almashtiradi.
 *
 * Ishlatish:  node scripts/fix-image-refs.js
 */
const fs = require('fs')

const FILES = ['src/data/projects.ts', 'src/app/ramadan/page.tsx', 'data/portfolio.json']

const have = new Set()
for (const dir of ['projects', 'discounts']) {
  const p = 'public/' + dir
  if (!fs.existsSync(p)) continue
  for (const f of fs.readdirSync(p)) {
    if (f.endsWith('.webp')) have.add('/' + dir + '/' + f)
  }
}

for (const file of FILES) {
  if (!fs.existsSync(file)) continue
  const before = fs.readFileSync(file, 'utf8')
  const after = before.replace(
    /(\/(?:projects|discounts)\/[^'"`)\s]+?)\.png/g,
    (match, base) => (have.has(base + '.webp') ? base + '.webp' : match)
  )
  if (after !== before) {
    fs.writeFileSync(file, after)
    console.log('yangilandi:', file)
  } else {
    console.log("o'zgarmadi:", file)
  }
}
