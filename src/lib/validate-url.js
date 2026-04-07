import dns from 'node:dns/promises'
import net from 'node:net'

const PRIVATE_RANGES = [
  /^127\./,
  /^::1$/,
  /^0\.0\.0\.0$/,
  /^169\.254\./,
  /^fe80:/i,
  /^10\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2[0-9]|3[01])\./,
  /^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./,
  /^fc00:/i,
  /^fd[0-9a-f]{2}:/i,
]

function isPrivateIp(ip) {
  return PRIVATE_RANGES.some(r => r.test(ip))
}

export async function validateUrl(urlStr) {
  if (!urlStr) {
    return { valid: false, error: 'source_page is required' }
  }

  let url
  try {
    url = new URL(urlStr)
  } catch {
    return { valid: false, error: 'invalid_url' }
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return { valid: false, error: 'invalid_url' }
  }

  const hostname = url.hostname

  if (net.isIP(hostname)) {
    if (isPrivateIp(hostname)) {
      return { valid: false, error: 'forbidden_url' }
    }
    return { valid: true, url }
  }

  if (hostname === 'localhost') {
    return { valid: false, error: 'forbidden_url' }
  }

  try {
    const addresses = await dns.lookup(hostname, { all: true })
    for (const { address } of addresses) {
      if (isPrivateIp(address)) {
        return { valid: false, error: 'forbidden_url' }
      }
    }
  } catch {
    return { valid: false, error: 'invalid_url' }
  }

  return { valid: true, url }
}
