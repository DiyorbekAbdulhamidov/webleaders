/**
 * Portfolio rasmlarini WebP ga o'giradi (1600px gacha kichraytirib) va
 * WebP haqiqatan kichikroq chiqqan hollarda asl PNG'ni o'chiradi.
 *
 * Ishlatish:  node scripts/to-webp.js
 *
 * Asl PNG'lar git tarixida saqlanadi — kerak bo'lsa `git checkout <commit> -- public/projects`
 * bilan qaytariladi.
 */
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const DIRS = ['public/projects', 'public/discounts']
const MAX_W = 1600
const QUALITY = 82

;(async () => {
  let before = 0
  let after = 0
  let converted = 0
  const kept = []

  for (const dir of DIRS) {
    if (!fs.existsSync(dir)) continue

    for (const file of fs.readdirSync(dir)) {
      if (!/\.png$/i.test(file)) continue

      const src = path.join(dir, file)
      const dst = path.join(dir, file.replace(/\.png$/i, '.webp'))

      const meta = await sharp(src).metadata()
      const pipeline = sharp(src)
      if (meta.width > MAX_W) pipeline.resize({ width: MAX_W, withoutEnlargement: true })
      await pipeline.webp({ quality: QUALITY, effort: 6 }).toFile(dst)

      const pngSize = fs.statSync(src).size
      const webpSize = fs.statSync(dst).size

      // WebP foyda bermasa — uni tashlab, PNG'ni qoldiramiz
      if (webpSize >= pngSize) {
        fs.unlinkSync(dst)
        kept.push(file)
        before += pngSize
        after += pngSize
        continue
      }

      fs.unlinkSync(src)
      before += pngSize
      after += webpSize
      converted++
      console.log(`${file} -> ${path.basename(dst)}  ${Math.round(pngSize / 1024)}KB -> ${Math.round(webpSize / 1024)}KB`)
    }
  }

  if (kept.length) console.log(`\nPNG qoldirildi (WebP kattaroq chiqdi): ${kept.join(', ')}`)
  console.log(`\nJAMI ${converted} fayl o'girildi: ${(before / 1048576).toFixed(2)}MB -> ${(after / 1048576).toFixed(2)}MB`)
})()
