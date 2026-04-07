const PLAYWRIGHT_TIMEOUT_MS = 6_000

export async function resolvePlaywright(url) {
  if (process.env.ENABLE_PLAYWRIGHT === 'false') return null

  let browser
  try {
    const { chromium } = await import('playwright-core')
    browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: PLAYWRIGHT_TIMEOUT_MS })

    const ogImage = await page
      .$eval('meta[property="og:image"]', el => el.getAttribute('content'))
      .catch(() => null)
    if (ogImage) return ogImage

    return page.evaluate(() => {
      let best = null
      let bestArea = 0
      for (const img of document.querySelectorAll('img')) {
        const area = img.naturalWidth * img.naturalHeight
        if (area > bestArea && img.src) {
          bestArea = area
          best = img.src
        }
      }
      return best
    })
  } catch {
    return null
  } finally {
    await browser?.close()
  }
}
