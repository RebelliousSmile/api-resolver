import { fetch } from 'undici'

const TIMEOUT_MS = 8_000
const MAX_REDIRECTIONS = 5

export async function fetchHtml(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; api-resolver/1.0)',
        Accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
      },
      redirect: 'follow',
      maxRedirections: MAX_REDIRECTIONS,
    })

    if (!response.ok) {
      return { html: null }
    }

    const html = await response.text()
    return { html }
  } catch (err) {
    if (err.name === 'AbortError') {
      throw Object.assign(new Error('fetch_timeout'), { code: 'FETCH_TIMEOUT' })
    }
    throw err
  } finally {
    clearTimeout(timer)
  }
}
