import * as cheerio from 'cheerio'

export function resolveLargestImg(html, baseUrl) {
  const $ = cheerio.load(html)
  let best = null
  let bestArea = 0

  $('img[width][height]').each((_, el) => {
    const src = $(el).attr('src')
    const w = parseInt($(el).attr('width'), 10)
    const h = parseInt($(el).attr('height'), 10)
    if (!src || isNaN(w) || isNaN(h)) return
    const area = w * h
    if (area > bestArea) {
      bestArea = area
      best = src
    }
  })

  if (!best) return null
  try {
    return new URL(best, baseUrl).href
  } catch {
    return null
  }
}
