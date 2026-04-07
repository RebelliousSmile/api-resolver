import * as cheerio from 'cheerio'

const IMAGE_KEY_RE = /image|photo|thumbnail|cover|banner/i
const IMAGE_URL_RE = /^https?:\/\/.+\.(jpe?g|png|webp|gif|svg|avif)(\?.*)?$/i

export function resolveNextData(html) {
  const $ = cheerio.load(html)
  const raw = $('#__NEXT_DATA__').html()
  if (!raw) return null
  try {
    return findImage(JSON.parse(raw))
  } catch {
    return null
  }
}

function findImage(obj, depth = 0) {
  if (depth > 6 || !obj || typeof obj !== 'object') return null
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string' && IMAGE_KEY_RE.test(key) && IMAGE_URL_RE.test(value)) {
      return value
    }
    if (value && typeof value === 'object') {
      const found = findImage(value, depth + 1)
      if (found) return found
    }
  }
  return null
}
