import * as cheerio from 'cheerio'

export function resolveOgImage(html) {
  const $ = cheerio.load(html)
  return (
    $('meta[property="og:image"]').attr('content') ||
    $('meta[name="og:image"]').attr('content') ||
    $('meta[property="twitter:image"]').attr('content') ||
    $('meta[name="twitter:image"]').attr('content') ||
    null
  )
}
