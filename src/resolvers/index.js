import { resolveOgImage } from './og-image.js'
import { resolveLargestImg } from './largest-img.js'
import { resolveDataSrc } from './data-src.js'
import { resolveNextData } from './next-data.js'
import { resolvePlaywright } from './playwright.js'

export async function resolveImage(html, url) {
  const sync = [
    () => resolveOgImage(html),
    () => resolveLargestImg(html, url),
    () => resolveDataSrc(html, url),
    () => resolveNextData(html),
  ]

  for (const strategy of sync) {
    const result = strategy()
    if (result) return result
  }

  return resolvePlaywright(url)
}
