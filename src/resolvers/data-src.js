import * as cheerio from 'cheerio'

export function resolveDataSrc(html, baseUrl) {
  const $ = cheerio.load(html)
  const src = $('img[data-src]').first().attr('data-src')
  if (!src) return null
  try {
    return new URL(src, baseUrl).href
  } catch {
    return null
  }
}
